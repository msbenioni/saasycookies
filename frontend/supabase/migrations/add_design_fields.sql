-- Migration: Add Design & Brand Fields to client_intakes
-- This migration adds the missing design fields to the client_intakes table

-- Add new design and brand fields
ALTER TABLE client_intakes 
ADD COLUMN IF NOT EXISTS brand_colors TEXT,
ADD COLUMN IF NOT EXISTS preferred_fonts TEXT,
ADD COLUMN IF NOT EXISTS inspiration_websites TEXT,
ADD COLUMN IF NOT EXISTS design_vibe TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS country TEXT NOT NULL DEFAULT 'OTHER';

-- Remove the old ip_address field if it exists (no longer used)
ALTER TABLE client_intakes 
DROP COLUMN IF EXISTS ip_address;

-- Update comments
COMMENT ON COLUMN client_intakes.brand_colors IS 'Hex codes for brand colors';
COMMENT ON COLUMN client_intakes.preferred_fonts IS 'Preferred typography/fonts';
COMMENT ON COLUMN client_intakes.inspiration_websites IS '3 websites they like + why';
COMMENT ON COLUMN client_intakes.design_vibe IS 'How they want website to look/feel (MANDATORY)';
COMMENT ON COLUMN client_intakes.country IS 'User country for currency determination (NZ, AU, OTHER)';

-- Create index for design_vibe and country for better search performance
CREATE INDEX IF NOT EXISTS idx_client_intakes_design_vibe ON client_intakes(design_vibe);
CREATE INDEX IF NOT EXISTS idx_client_intakes_country ON client_intakes(country);
