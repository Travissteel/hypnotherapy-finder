import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create a Supabase client with service role for server-side operations
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export const STORAGE_BUCKETS = {
  CLAIM_DOCUMENTS: 'claim-documents',
  PRACTITIONER_PHOTOS: 'practitioner-photos',
} as const;

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Buffer,
  contentType?: string
): Promise<{ url: string; path: string } | { error: string }> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        contentType: contentType,
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { error: error.message };
    }

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path,
    };
  } catch (error: any) {
    console.error('Upload exception:', error);
    return { error: error.message };
  }
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ success: boolean } | { error: string }> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Delete error:', error);
      return { error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Delete exception:', error);
    return { error: error.message };
  }
}

/**
 * Get public URL for a file
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * List files in a directory
 */
export async function listFiles(
  bucket: string,
  path: string = ''
): Promise<{ files: any[] } | { error: string }> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .list(path);

    if (error) {
      console.error('List error:', error);
      return { error: error.message };
    }

    return { files: data };
  } catch (error: any) {
    console.error('List exception:', error);
    return { error: error.message };
  }
}

/**
 * Generate a unique file path for claim documents
 */
export function generateClaimDocumentPath(
  claimId: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `claims/${claimId}/${timestamp}_${sanitizedFileName}`;
}

/**
 * Generate a unique file path for practitioner photos
 */
export function generatePractitionerPhotoPath(
  practitionerId: string,
  fileName: string
): string {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `practitioners/${practitionerId}/${timestamp}_${sanitizedFileName}`;
}
