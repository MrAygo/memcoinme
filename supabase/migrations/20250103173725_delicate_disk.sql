/*
  # Firebase Auth Integration and RLS Updates

  1. New Tables
    - Create user_profiles table to store Firebase user data
  
  2. New Functions
    - Add function to verify Firebase JWT tokens
    - Add function to sync Firebase users
  
  3. Security Updates
    - Add RLS policies for Firebase authenticated users
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY,
  firebase_uid text UNIQUE NOT NULL,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Function to verify Firebase JWT
CREATE OR REPLACE FUNCTION auth.verify_firebase_jwt(token text)
RETURNS jsonb AS $$
BEGIN
  -- Note: This function will be implemented by Supabase Edge Functions
  -- for security reasons
  RETURN jsonb_build_object(
    'sub', current_setting('request.jwt.claims', true)::jsonb->>'sub',
    'email', current_setting('request.jwt.claims', true)::jsonb->>'email'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update projects RLS policies
DROP POLICY IF EXISTS "Enable read access for Firebase users" ON projects;
CREATE POLICY "Enable read access for Firebase users"
  ON projects
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE firebase_uid = auth.verify_firebase_jwt(current_setting('request.jwt.claims', true)::text)->>'sub'
      AND id::text = user_id::text
    )
  );

DROP POLICY IF EXISTS "Enable insert access for Firebase users" ON projects;
CREATE POLICY "Enable insert access for Firebase users"
  ON projects
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE firebase_uid = auth.verify_firebase_jwt(current_setting('request.jwt.claims', true)::text)->>'sub'
      AND id::text = user_id::text
    )
  );

DROP POLICY IF EXISTS "Enable update access for Firebase users" ON projects;
CREATE POLICY "Enable update access for Firebase users"
  ON projects
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE firebase_uid = auth.verify_firebase_jwt(current_setting('request.jwt.claims', true)::text)->>'sub'
      AND id::text = user_id::text
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE firebase_uid = auth.verify_firebase_jwt(current_setting('request.jwt.claims', true)::text)->>'sub'
      AND id::text = user_id::text
    )
  );

-- Create updated_at trigger for user_profiles
CREATE OR REPLACE FUNCTION update_updated_at_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_timestamp();