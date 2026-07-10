-- Supabase Storage Setup for Portfolio Notes Uploads
-- Run this script in the SQL Editor of your Supabase Dashboard to create the bucket and set up policies.

-- 2. Create the learning-resources-pdfs bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'learning-resources-pdfs',
  'learning-resources-pdfs',
  true,
  52428800, -- 50MB file size limit
  ARRAY['application/pdf', 'application/zip', 'application/x-zip-compressed', 'application/octet-stream']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies for "learning-resources-pdfs" bucket

-- Policy A: Allow anyone to view/download notes
CREATE POLICY "Public Read Access for learning-resources-pdfs"
ON storage.objects FOR SELECT
USING (bucket_id = 'learning-resources-pdfs');

-- Policy B: Allow logged-in admin (authenticated users) to upload new notes
CREATE POLICY "Authenticated Insert Access for learning-resources-pdfs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'learning-resources-pdfs');

-- Policy C: Allow logged-in admin to update their uploaded notes
CREATE POLICY "Authenticated Update Access for learning-resources-pdfs"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'learning-resources-pdfs')
WITH CHECK (bucket_id = 'learning-resources-pdfs');

-- Policy D: Allow logged-in admin to delete notes
CREATE POLICY "Authenticated Delete Access for learning-resources-pdfs"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'learning-resources-pdfs');
