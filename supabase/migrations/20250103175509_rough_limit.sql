/*
  # Fix user profiles and authentication

  1. Changes
    - Add RLS policies for user_profiles table
    - Add public access for unauthenticated users
    - Fix user profiles synchronization
*/

-- Add RLS policies for user_profiles
CREATE POLICY "Allow public read access"
  ON public.user_profiles
  FOR SELECT
  TO public;

CREATE POLICY "Allow authenticated users to update their own profile"
  ON public.user_profiles
  FOR UPDATE
  TO authenticated
  USING (id::text = auth.uid()::text)
  WITH CHECK (id::text = auth.uid()::text);

CREATE POLICY "Allow authenticated users to insert their own profile"
  ON public.user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (id::text = auth.uid()::text);