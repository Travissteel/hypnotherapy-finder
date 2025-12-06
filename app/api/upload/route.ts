import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server';
import {
  uploadFile,
  STORAGE_BUCKETS,
  generateClaimDocumentPath,
  generatePractitionerPhotoPath,
} from '@/lib/supabase/storage';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createRouteHandlerClient();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'claim-document' or 'practitioner-photo'
    const resourceId = formData.get('resourceId') as string; // claimId or practitionerId

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!type || !resourceId) {
      return NextResponse.json(
        { error: 'Missing type or resourceId' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPG, PNG, WEBP, PDF, DOC, DOCX' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB' },
        { status: 400 }
      );
    }

    // Convert File to Buffer for upload
    const buffer = Buffer.from(await file.arrayBuffer());

    // Determine bucket and path based on type
    let bucket: string;
    let path: string;

    if (type === 'claim-document') {
      bucket = STORAGE_BUCKETS.CLAIM_DOCUMENTS;
      path = generateClaimDocumentPath(resourceId, file.name);

      // Verify user owns the claim or is admin
      const { data: claim } = await supabase
        .from('claims')
        .select('user_id')
        .eq('id', resourceId)
        .single();

      if (!claim) {
        return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (claim.user_id !== session.user.id && !profile?.is_admin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else if (type === 'practitioner-photo') {
      bucket = STORAGE_BUCKETS.PRACTITIONER_PHOTOS;
      path = generatePractitionerPhotoPath(resourceId, file.name);

      // Verify user owns the practitioner listing or is admin
      const { data: practitioner } = await supabase
        .from('practitioners')
        .select('claimed_by')
        .eq('id', resourceId)
        .single();

      if (!practitioner) {
        return NextResponse.json(
          { error: 'Practitioner not found' },
          { status: 404 }
        );
      }

      const { data: profile } = await supabase
        .from('user_profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      if (practitioner.claimed_by !== session.user.id && !profile?.is_admin) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    // Upload file
    const result = await uploadFile(bucket, path, buffer, file.type);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // If it's a claim document, update the claim with the document URL
    if (type === 'claim-document') {
      const { data: claim } = await supabase
        .from('claims')
        .select('document_urls')
        .eq('id', resourceId)
        .single();

      const existingUrls = claim?.document_urls || [];
      const updatedUrls = [...existingUrls, result.url];

      await supabase
        .from('claims')
        .update({ document_urls: updatedUrls })
        .eq('id', resourceId);
    }

    // If it's a practitioner photo, update the practitioner with the photo URL
    if (type === 'practitioner-photo') {
      await supabase
        .from('practitioners')
        .update({ profile_photo_url: result.url })
        .eq('id', resourceId);
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload file' },
      { status: 500 }
    );
  }
}
