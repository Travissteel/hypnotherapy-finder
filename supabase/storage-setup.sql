-- ============================================
-- SUPABASE STORAGE SETUP
-- ============================================
-- Run this in Supabase SQL Editor to create storage buckets

-- Create claim-documents bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('claim-documents', 'claim-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create practitioner-photos bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('practitioner-photos', 'practitioner-photos', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES FOR CLAIM DOCUMENTS
-- ============================================

-- Allow authenticated users to upload claim documents for their own claims
CREATE POLICY "Users can upload claim documents for their claims"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'claim-documents' AND
  (storage.foldername(name))[1] = 'claims' AND
  (
    -- User owns the claim
    auth.uid() IN (
      SELECT user_id FROM public.claims
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);

-- Allow users to view their own claim documents
CREATE POLICY "Users can view their own claim documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'claim-documents' AND
  (
    -- User owns the claim
    auth.uid() IN (
      SELECT user_id FROM public.claims
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);

-- Allow users to delete their own claim documents
CREATE POLICY "Users can delete their own claim documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'claim-documents' AND
  (
    -- User owns the claim
    auth.uid() IN (
      SELECT user_id FROM public.claims
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);

-- ============================================
-- STORAGE POLICIES FOR PRACTITIONER PHOTOS
-- ============================================

-- Anyone can view practitioner photos (public bucket)
CREATE POLICY "Anyone can view practitioner photos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'practitioner-photos');

-- Only practitioners or admins can upload photos
CREATE POLICY "Practitioners can upload their own photos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'practitioner-photos' AND
  (storage.foldername(name))[1] = 'practitioners' AND
  (
    -- User owns the practitioner profile
    auth.uid() IN (
      SELECT claimed_by FROM public.practitioners
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);

-- Only practitioners or admins can update/delete photos
CREATE POLICY "Practitioners can update their own photos"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'practitioner-photos' AND
  (
    -- User owns the practitioner profile
    auth.uid() IN (
      SELECT claimed_by FROM public.practitioners
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);

CREATE POLICY "Practitioners can delete their own photos"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'practitioner-photos' AND
  (
    -- User owns the practitioner profile
    auth.uid() IN (
      SELECT claimed_by FROM public.practitioners
      WHERE id::text = (storage.foldername(name))[2]
    )
    OR
    -- User is admin
    auth.uid() IN (
      SELECT id FROM public.user_profiles WHERE is_admin = true
    )
  )
);
