-- Add additional columns to profiles table for user data
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS saved_states text[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trips jsonb DEFAULT '[]';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS recent_activities jsonb DEFAULT '[]';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS preferences jsonb DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address jsonb DEFAULT '{}';

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_saved_states ON public.profiles USING GIN(saved_states);
CREATE INDEX IF NOT EXISTS idx_profiles_trips ON public.profiles USING GIN(trips);