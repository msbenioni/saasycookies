-- RLS Bypass Test - Temporarily disable RLS to test if the insert works

-- Step 1: Check current RLS status
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'client_intakes';

-- Step 2: Temporarily disable RLS (FOR TESTING ONLY)
ALTER TABLE client_intakes DISABLE ROW LEVEL SECURITY;

-- Step 3: Test the exact insert that's failing
INSERT INTO client_intakes (
    full_name, email, phone, business_name, country, current_url, industry,
    business_description, primary_growth_goal, success_metric,
    annual_revenue_range, offer_structure, monthly_leads_expected,
    content_frequency, service_path, project_vision, hosting_expectation,
    brand_colors, preferred_fonts, inspiration_websites, design_vibe,
    project_types, required_capabilities,
    primary_users, desired_user_action, current_stack, integrations_needed,
    auth_requirements, security_requirements, technical_requirements,
    content_readiness, brand_readiness, timeline, constraints_and_risks,
    recommended_plan, complexity_score, plan_flags, plan_reasoning,
    build_prompt, form_payload, user_agent, referrer
) VALUES (
    'Jasmin Benioni', 
    'pacificmarketltd@gmail.com', 
    '0273220545', 
    'Pacific Market', 
    'NZ', 
    NULL, 
    NULL,
    NULL, 
    NULL, 
    NULL,
    'pre-revenue', 
    'single-service', 
    'under-20',
    'rare-updates', 
    'managed', 
    'Test project vision', 
    'managed-hosting',
    NULL, 
    NULL, 
    NULL,
    NULL, 
    NULL, 
    NULL, 
    NULL, 
    NULL,
    NULL, 
    NULL, 
    NULL, 
    NULL, 
    NULL,
    'starter', 
    2, 
    '{"requiresAuth": false, "requiresPayments": false, "requiresMemberPortal": false, "requiresAutomation": false}',
    '["Test reasoning"]',
    NULL, 
    '{"test": "rls_bypass_test"}', 
    'Mozilla/5.0 (Test)', 
    NULL
);

-- Step 4: Check if the insert worked
SELECT id, created_at, full_name, email FROM client_intakes WHERE form_payload ->> 'test' = 'rls_bypass_test';

-- Step 5: Re-enable RLS immediately after testing
ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;

-- Step 6: Clean up test data
-- DELETE FROM client_intakes WHERE form_payload ->> 'test' = 'rls_bypass_test';

-- Step 7: Check current policies
SELECT policyname, roles, cmd, permissive FROM pg_policies WHERE tablename = 'client_intakes';

-- Step 8: Check if there are any conflicting policies
-- Look for policies that might be blocking inserts
SELECT 
    policyname,
    roles,
    cmd,
    permissive,
    CASE 
        WHEN with_check IS NOT NULL THEN 'Has WITH_CHECK'
        ELSE 'No WITH_CHECK'
    END as has_check
FROM pg_policies 
WHERE tablename = 'client_intakes'
ORDER BY permissive DESC, cmd;
