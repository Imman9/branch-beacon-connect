
-- First create the app_role enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'branch_admin', 'member', 'guest');

-- Create user_roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role public.app_role NOT NULL,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles if not already enabled
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" 
  ON public.user_roles FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own roles" ON public.user_roles;
CREATE POLICY "Users can insert their own roles" 
  ON public.user_roles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create a table for Bible notes
CREATE TABLE public.bible_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bible_version TEXT NOT NULL DEFAULT 'NIV',
  book TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse INTEGER NOT NULL,
  note_content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for Bible notes
ALTER TABLE public.bible_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bible notes" 
  ON public.bible_notes 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own bible notes" 
  ON public.bible_notes 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bible notes" 
  ON public.bible_notes 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bible notes" 
  ON public.bible_notes 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create a function to check if user is the first in their branch
CREATE OR REPLACE FUNCTION public.is_first_user_in_branch(branch_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 
    FROM public.profiles 
    WHERE profiles.branch_id = is_first_user_in_branch.branch_id
  );
END;
$$;

-- Update the handle_new_user function to assign branch_admin to first user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  user_branch_id UUID;
  user_role TEXT;
BEGIN
  -- Get branch_id from user metadata
  user_branch_id := (NEW.raw_user_meta_data->>'branch_id')::UUID;
  
  -- Determine role: branch_admin if first user in branch, otherwise member
  IF public.is_first_user_in_branch(user_branch_id) THEN
    user_role := 'branch_admin';
  ELSE
    user_role := 'member';
  END IF;
  
  -- Insert into profiles
  INSERT INTO public.profiles (id, first_name, last_name, branch_id, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    user_branch_id,
    user_role
  );
  
  -- Insert role into user_roles table
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, user_role::public.app_role);
  
  RETURN NEW;
END;
$$;

-- Create tables for branch content management
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.sermons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT,
  video_url TEXT,
  sermon_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.media_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'audio')),
  media_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  max_members INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- RLS policies for events
CREATE POLICY "Users can view events in their branch" 
  ON public.events FOR SELECT 
  USING (branch_id IN (SELECT branch_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Branch admins can manage events" 
  ON public.events FOR ALL 
  USING (
    branch_id IN (
      SELECT p.branch_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'branch_admin')
    )
  );

-- RLS policies for sermons
CREATE POLICY "Users can view sermons in their branch" 
  ON public.sermons FOR SELECT 
  USING (branch_id IN (SELECT branch_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Branch admins can manage sermons" 
  ON public.sermons FOR ALL 
  USING (
    branch_id IN (
      SELECT p.branch_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'branch_admin')
    )
  );

-- RLS policies for media
CREATE POLICY "Users can view media in their branch" 
  ON public.media_content FOR SELECT 
  USING (branch_id IN (SELECT branch_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Branch admins can manage media" 
  ON public.media_content FOR ALL 
  USING (
    branch_id IN (
      SELECT p.branch_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'branch_admin')
    )
  );

-- RLS policies for announcements
CREATE POLICY "Users can view announcements in their branch" 
  ON public.announcements FOR SELECT 
  USING (branch_id IN (SELECT branch_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Branch admins can manage announcements" 
  ON public.announcements FOR ALL 
  USING (
    branch_id IN (
      SELECT p.branch_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'branch_admin')
    )
  );

-- RLS policies for groups
CREATE POLICY "Users can view groups in their branch" 
  ON public.groups FOR SELECT 
  USING (branch_id IN (SELECT branch_id FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Branch admins can manage groups" 
  ON public.groups FOR ALL 
  USING (
    branch_id IN (
      SELECT p.branch_id 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role IN ('admin', 'branch_admin')
    )
  );
