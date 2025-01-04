/*
  # Add deployment fields to landing_pages table
  
  1. Changes
    - Add deploy_url column to store the deployed site URL
    - Add deploy_error column to store deployment error messages
    - Add deploy_id column to store Netlify deployment ID
*/

ALTER TABLE landing_pages
ADD COLUMN IF NOT EXISTS deploy_url text,
ADD COLUMN IF NOT EXISTS deploy_error text,
ADD COLUMN IF NOT EXISTS deploy_id text;