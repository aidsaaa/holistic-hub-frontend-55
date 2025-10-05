-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.app_role AS ENUM ('student', 'faculty', 'admin', 'government');
CREATE TYPE public.activity_category AS ENUM ('conferences', 'certifications', 'club_activities', 'internships', 'community_service', 'competitions');
CREATE TYPE public.submission_status AS ENUM ('pending', 'approved', 'rejected', 'under_review');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  roll_number TEXT,
  program TEXT,
  year TEXT,
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create activities table for student submissions
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category activity_category NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_date DATE NOT NULL,
  location TEXT,
  organization TEXT,
  duration TEXT,
  rank TEXT,
  participants TEXT,
  skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create submissions table for faculty approval
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  activity_id UUID NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status submission_status NOT NULL DEFAULT 'pending',
  files TEXT[] DEFAULT '{}',
  max_marks INTEGER NOT NULL DEFAULT 100,
  suggested_points INTEGER,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create approvals table
CREATE TABLE public.approvals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status submission_status NOT NULL,
  marks INTEGER,
  feedback TEXT NOT NULL,
  digital_signature TEXT,
  blockchain_hash TEXT,
  approved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create verification_data table for AI validation
CREATE TABLE public.verification_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
  plagiarism_risk INTEGER DEFAULT 0,
  ai_content_risk INTEGER DEFAULT 0,
  document_authenticity INTEGER DEFAULT 100,
  cross_reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolios table
CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pdf_url TEXT,
  web_url TEXT,
  blockchain_verified BOOLEAN DEFAULT false,
  blockchain_hash TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for user_roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for activities
CREATE POLICY "Students can view own activities"
  ON public.activities FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id OR 
    public.has_role(auth.uid(), 'faculty') OR 
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'government')
  );

CREATE POLICY "Students can create own activities"
  ON public.activities FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own activities"
  ON public.activities FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Students can delete own activities"
  ON public.activities FOR DELETE
  TO authenticated
  USING (auth.uid() = student_id);

-- RLS Policies for submissions
CREATE POLICY "Students and faculty can view submissions"
  ON public.submissions FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id OR 
    public.has_role(auth.uid(), 'faculty') OR 
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'government')
  );

CREATE POLICY "Students can create submissions"
  ON public.submissions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own submissions"
  ON public.submissions FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id);

-- RLS Policies for approvals
CREATE POLICY "Users can view relevant approvals"
  ON public.approvals FOR SELECT
  TO authenticated
  USING (
    auth.uid() = faculty_id OR 
    auth.uid() IN (SELECT student_id FROM public.submissions WHERE id = submission_id) OR
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'government')
  );

CREATE POLICY "Faculty can create approvals"
  ON public.approvals FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'faculty') OR 
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for verification_data
CREATE POLICY "Users can view verification data"
  ON public.verification_data FOR SELECT
  TO authenticated
  USING (
    auth.uid() IN (SELECT student_id FROM public.submissions WHERE id = submission_id) OR
    public.has_role(auth.uid(), 'faculty') OR 
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "System can insert verification data"
  ON public.verification_data FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for portfolios
CREATE POLICY "Students can view own portfolio"
  ON public.portfolios FOR SELECT
  TO authenticated
  USING (
    auth.uid() = student_id OR 
    public.has_role(auth.uid(), 'faculty') OR 
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'government')
  );

CREATE POLICY "Students can create own portfolio"
  ON public.portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Students can update own portfolio"
  ON public.portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = student_id);

-- Create function to handle new user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', new.email)
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_activities_updated_at
  BEFORE UPDATE ON public.activities
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
  BEFORE UPDATE ON public.portfolios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();