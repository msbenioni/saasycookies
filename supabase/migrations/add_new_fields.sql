-- Migration: Add new fields to client_intakes table
-- This adds the missing fields without recreating the table

-- Add country field if it doesn't exist
ALTER TABLE client_intakes 
ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'OTHER';

-- Add current_url field if it doesn't exist
ALTER TABLE client_intakes 
ADD COLUMN IF NOT EXISTS current_url TEXT;

-- Add design & brand fields
ALTER TABLE client_intakes 
ADD COLUMN IF NOT EXISTS brand_colors TEXT,
ADD COLUMN IF NOT EXISTS preferred_fonts TEXT,
ADD COLUMN IF NOT EXISTS inspiration_websites TEXT,
ADD COLUMN IF NOT EXISTS design_vibe TEXT NOT NULL DEFAULT '';

-- Add comment for country field
COMMENT ON COLUMN client_intakes.country IS 'User country for currency determination (NZ, AU, OTHER)';
COMMENT ON COLUMN client_intakes.current_url IS 'User current website URL (if they have one)';
COMMENT ON COLUMN client_intakes.brand_colors IS 'Hex codes for brand colors';
COMMENT ON COLUMN client_intakes.preferred_fonts IS 'Preferred typography/fonts';
COMMENT ON COLUMN client_intakes.inspiration_websites IS '3 websites they like + why';
COMMENT ON COLUMN client_intakes.design_vibe IS 'How they want website to look/feel (MANDATORY)';

-- Create index for country for better search performance
CREATE INDEX IF NOT EXISTS idx_client_intakes_country ON client_intakes(country);
