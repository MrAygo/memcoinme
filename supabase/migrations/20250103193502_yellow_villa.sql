/*
  # Add landing pages table

  1. New Tables
    - `landing_pages`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (jsonb)
      - `published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Security
    - Enable RLS on `landing_pages` table
    - Add policies for CRUD operations
*/

-- Create landing pages table
CREATE TABLE IF NOT EXISTS landing_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own landing pages"
  ON landing_pages
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create landing pages"
  ON landing_pages
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own landing pages"
  ON landing_pages
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own landing pages"
  ON landing_pages
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER landing_pages_updated_at
  BEFORE UPDATE ON landing_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();