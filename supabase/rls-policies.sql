-- RLS Policies for practitioners table

-- Enable RLS (should already be enabled, but just in case)
ALTER TABLE practitioners ENABLE ROW LEVEL SECURITY;

-- Policy: Allow authenticated users to INSERT their own practitioner records
CREATE POLICY "Users can create their own practitioner profile"
ON practitioners
FOR INSERT
TO authenticated
WITH CHECK (claimed_by = auth.uid());

-- Policy: Allow users to view all practitioners (for public directory)
CREATE POLICY "Anyone can view practitioners"
ON practitioners
FOR SELECT
TO public
USING (true);

-- Policy: Allow users to UPDATE their own practitioner records
CREATE POLICY "Users can update their own practitioner profile"
ON practitioners
FOR UPDATE
TO authenticated
USING (claimed_by = auth.uid())
WITH CHECK (claimed_by = auth.uid());

-- Policy: Allow users to DELETE their own practitioner records (optional)
CREATE POLICY "Users can delete their own practitioner profile"
ON practitioners
FOR DELETE
TO authenticated
USING (claimed_by = auth.uid());
