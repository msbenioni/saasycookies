-- SaaSy Cookies Client Intakes Table
-- This table tracks all project submissions and their lifecycle

CREATE TABLE IF NOT EXISTS client_intakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Client Information
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT NOT NULL,
  current_url TEXT,
  industry TEXT,
  
  -- Business Details
  business_description TEXT,
  primary_growth_goal TEXT,
  success_metric TEXT,
  
  -- Qualification Data (Stage 1)
  annual_revenue_range TEXT NOT NULL, -- pre-revenue, under-50k, 50k-150k, 150k-500k, 500k-plus
  offer_structure TEXT NOT NULL, -- single-service, multiple-services, course-digital-product, membership-community, high-ticket-funnel, unsure
  monthly_leads_expected TEXT NOT NULL, -- under-20, 20-100, 100-500, 500-plus
  content_frequency TEXT NOT NULL, -- rare-updates, monthly-updates, weekly-updates, ongoing-marketing
  service_path TEXT NOT NULL, -- managed, custom
  project_vision TEXT NOT NULL,
  hosting_expectation TEXT NOT NULL, -- managed-hosting, owner-access, full-control
  
  -- Project Details
  project_types TEXT[], -- Array of project types
  required_capabilities TEXT[], -- Array of required capabilities
  
  -- Technical Requirements (Stage 2 - optional)
  primary_users TEXT,
  desired_user_action TEXT,
  current_stack TEXT,
  integrations_needed TEXT,
  auth_requirements TEXT,
  security_requirements TEXT,
  technical_requirements TEXT,
  
  -- Assets & Timeline
  content_readiness TEXT,
  brand_readiness TEXT,
  brand_colors TEXT,
  timeline TEXT,
  constraints_and_risks TEXT,
  
  -- Plan Recommendation
  recommended_plan TEXT NOT NULL, -- starter, growth, authority, custom
  complexity_score INTEGER NOT NULL CHECK (complexity_score >= 0 AND complexity_score <= 10),
  plan_flags JSONB NOT NULL, -- { requiresAuth, requiresPayments, requiresMemberPortal, requiresAutomation, leadVolume, funnelComplexity, revenueStage, offerComplexity }
  plan_reasoning TEXT[], -- Array of reasoning strings
  
  -- Build Information
  build_prompt TEXT,
  form_payload JSONB NOT NULL, -- Complete form submission data
  
  -- Status & Workflow
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'confirmed', 'building', 'launched', 'active', 'cancelled')),
  accepted_plan BOOLEAN DEFAULT FALSE,
  
  -- Trial & Billing
  trial_start_date TIMESTAMP WITH TIME ZONE,
  trial_end_date TIMESTAMP WITH TIME ZONE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  
  -- Discounts & Offers
  launch_offer_requested BOOLEAN DEFAULT FALSE,
  pacific_market_discount BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  user_agent TEXT,
  ip_address TEXT,
  referrer TEXT
);

-- Create indexes for performance
CREATE INDEX idx_client_intakes_email ON client_intakes(email);
CREATE INDEX idx_client_intakes_status ON client_intakes(status);
CREATE INDEX idx_client_intakes_created_at ON client_intakes(created_at);
CREATE INDEX idx_client_intakes_recommended_plan ON client_intakes(recommended_plan);
CREATE INDEX idx_client_intakes_business_name ON client_intakes(business_name);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_client_intakes_updated_at 
    BEFORE UPDATE ON client_intakes 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own submissions (if we add user auth later)
-- For now, only service role can access (admin access)
CREATE POLICY "Service role can access all client intakes" ON client_intakes
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Comments for documentation
COMMENT ON TABLE client_intakes IS 'Tracks all client project submissions from qualification through launch';
COMMENT ON COLUMN client_intakes.annual_revenue_range IS 'Client revenue stage for plan recommendation';
COMMENT ON COLUMN client_intakes.offer_structure IS 'Type of offer/client business model';
COMMENT ON COLUMN client_intakes.monthly_leads_expected IS 'Expected monthly lead volume for complexity scoring';
COMMENT ON COLUMN client_intakes.content_frequency IS 'How often client needs content updates';
COMMENT ON COLUMN client_intakes.service_path IS 'Managed infrastructure vs custom AI/SaaS build';
COMMENT ON COLUMN client_intakes.recommended_plan IS 'Automated plan recommendation: starter, growth, authority, or custom';
COMMENT ON COLUMN client_intakes.complexity_score IS '0-10 score from automated complexity algorithm';
COMMENT ON COLUMN client_intakes.plan_flags IS 'JSON object with build complexity flags';
COMMENT ON COLUMN client_intakes.status IS 'Workflow status: new -> confirmed -> building -> launched -> active';
COMMENT ON COLUMN client_intakes.trial_start_date IS 'Start of 30-day build phase';
COMMENT ON COLUMN client_intakes.trial_end_date IS 'End of trial period, billing begins';
