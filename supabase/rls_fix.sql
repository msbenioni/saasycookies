-- RLS Policy Fix for client_intakes table
-- The current policy only allows service_role, but we need to allow anon/authenticated users

-- =====================================================
-- Current Issue Analysis
-- =====================================================

-- Current policy only allows service_role:
-- "Service role can access all client intakes"
-- roles: {public}
-- qual: ((auth.jwt() ->> 'role'::text) = 'service_role'::text)

-- But the user is:
-- database_user: "postgres"
-- auth_uid: null
-- auth_email: null  
-- auth_role: null

-- This means the user is NOT authenticated as service_role, so RLS blocks the insert

-- =====================================================
-- SOLUTION: Create Proper RLS Policies
-- =====================================================

-- 1. First, drop the current restrictive policy
DROP POLICY IF EXISTS "Service role can access all client intakes" ON client_intakes;

-- 2. Create policies that allow anonymous users to insert data
-- This is needed for the initial form submission before authentication

-- Policy for anonymous users to insert data
CREATE POLICY "Allow anonymous inserts" ON client_intakes
    FOR INSERT
    TO anon
    WITH CHECK (
        -- Basic validation for required fields
        full_name IS NOT NULL AND
        email IS NOT NULL AND
        business_name IS NOT NULL AND
        country IS NOT NULL AND
        design_vibe IS NOT NULL AND
        annual_revenue_range IS NOT NULL AND
        offer_structure IS NOT NULL AND
        monthly_leads_expected IS NOT NULL AND
        content_frequency IS NOT NULL AND
        service_path IS NOT NULL AND
        project_vision IS NOT NULL AND
        hosting_expectation IS NOT NULL AND
        recommended_plan IS NOT NULL AND
        complexity_score IS NOT NULL AND
        plan_flags IS NOT NULL AND
        form_payload IS NOT NULL
    );

-- Policy for authenticated users to insert data
CREATE POLICY "Allow authenticated inserts" ON client_intakes
    FOR INSERT
    TO authenticated
    WITH CHECK (
        -- Same validation as anonymous users
        full_name IS NOT NULL AND
        email IS NOT NULL AND
        business_name IS NOT NULL AND
        country IS NOT NULL AND
        design_vibe IS NOT NULL AND
        annual_revenue_range IS NOT NULL AND
        offer_structure IS NOT NULL AND
        monthly_leads_expected IS NOT NULL AND
        content_frequency IS NOT NULL AND
        service_path IS NOT NULL AND
        project_vision IS NOT NULL AND
        hosting_expectation IS NOT NULL AND
        recommended_plan IS NOT NULL AND
        complexity_score IS NOT NULL AND
        plan_flags IS NOT NULL AND
        form_payload IS NOT NULL
    );

-- Policy for service role (full access)
CREATE POLICY "Service role full access" ON client_intakes
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Policy for users to view their own data (if needed later)
CREATE POLICY "Users can view own data" ON client_intakes
    FOR SELECT
    TO authenticated
    USING (auth.uid()::text = (form_payload ->> 'email')::text);

-- =====================================================
-- Alternative: Simple Permissive Policy (if validation not needed in RLS)
-- =====================================================

-- If you prefer simpler policies, use these instead:

-- DROP POLICY "Allow anonymous inserts" ON client_intakes;
-- DROP POLICY "Allow authenticated inserts" ON client_intakes;
-- DROP POLICY "Service role full access" ON client_intakes;
-- DROP POLICY "Users can view own data" ON client_intakes;

-- Simple policy that allows all inserts
-- CREATE POLICY "Allow all inserts" ON client_intakes
--     FOR INSERT
--     TO anon, authenticated
--     WITH CHECK (true);

-- Simple policy for service role
-- CREATE POLICY "Service role all operations" ON client_intakes
--     FOR ALL
--     TO service_role
--     USING (true)
--     WITH CHECK (true);

-- =====================================================
-- Verify the Fix
-- =====================================================

-- Check current policies after the fix
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    CASE 
        WHEN with_check IS NULL THEN 'No check condition'
        ELSE 'Has check condition'
    END as check_condition
FROM pg_policies 
WHERE tablename = 'client_intakes'
ORDER BY policyname;

-- Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'client_intakes';

-- =====================================================
-- Test the Fix
-- =====================================================

-- Test insert with anon user (this should work now)
-- Note: This might fail in the SQL editor but should work from the app
INSERT INTO client_intakes (
    full_name,
    email,
    business_name,
    country,
    design_vibe,
    annual_revenue_range,
    offer_structure,
    monthly_leads_expected,
    content_frequency,
    service_path,
    project_vision,
    hosting_expectation,
    recommended_plan,
    complexity_score,
    plan_flags,
    form_payload
) VALUES (
    'Test User',
    'test@example.com',
    'Test Business',
    'NZ',
    'Modern and clean design',
    'pre-revenue',
    'single-service',
    'under-20',
    'rare-updates',
    'managed',
    'Test project vision',
    'managed-hosting',
    'starter',
    2,
    '{"requiresAuth": false, "requiresPayments": false, "requiresMemberPortal": false, "requiresAutomation": false}',
    '{"test": "data", "source": "rls_fix_test"}'
);

-- Clean up test data
-- DELETE FROM client_intakes WHERE form_payload ->> 'source' = 'rls_fix_test';
