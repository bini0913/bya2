-- Boriyad Youth Academy — Admissions applications

-- Application status enum
CREATE TYPE application_status AS ENUM (
  'pending',
  'approved',
  'rejected',
  'contacted'
);

-- Applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id TEXT UNIQUE NOT NULL,
  student_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  dob DATE NOT NULL,
  grade TEXT NOT NULL,
  previous_school TEXT,
  parent_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  documents JSONB NOT NULL DEFAULT '{"general":[],"report_cards":[],"birth_certificate":[]}'::jsonb,
  status application_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX applications_status_idx ON public.applications (status);
CREATE INDEX applications_created_at_idx ON public.applications (created_at DESC);
CREATE INDEX applications_reference_id_idx ON public.applications (reference_id);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Public can insert applications (admission form)
CREATE POLICY "Anyone can submit application"
  ON public.applications FOR INSERT
  WITH CHECK (true);

-- No public read (admin uses service role or authenticated admin)

-- Sequence for reference IDs per year
CREATE TABLE IF NOT EXISTS public.application_reference_seq (
  year INT PRIMARY KEY,
  last_number INT NOT NULL DEFAULT 0
);

-- Storage bucket (run in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('applications-documents', 'applications-documents', false);

-- Storage policies (apply after bucket exists)
-- CREATE POLICY "Public upload admission docs"
--   ON storage.objects FOR INSERT
--   TO anon, authenticated
--   WITH CHECK (bucket_id = 'applications-documents');

-- CREATE POLICY "Admins read admission docs"
--   ON storage.objects FOR SELECT
--   TO authenticated
--   USING (bucket_id = 'applications-documents');

-- Admin profiles: ensure admissions admins have role = 'admin' in profiles
CREATE POLICY "Admins can read applications"
  ON public.applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update applications"
  ON public.applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete applications"
  ON public.applications FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RPC: generate next reference id
CREATE OR REPLACE FUNCTION public.next_application_reference()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  y INT := EXTRACT(YEAR FROM NOW())::INT;
  n INT;
BEGIN
  INSERT INTO public.application_reference_seq (year, last_number)
  VALUES (y, 1)
  ON CONFLICT (year) DO UPDATE
  SET last_number = application_reference_seq.last_number + 1
  RETURNING last_number INTO n;

  RETURN 'BYA-' || y::TEXT || '-' || LPAD(n::TEXT, 4, '0');
END;
$$;

GRANT EXECUTE ON FUNCTION public.next_application_reference() TO anon, authenticated;
