-- Quick RLS Fix - Run this immediately to fix the form submission issue

-- Step 1: Drop the current restrictive policy
DROP POLICY IF EXISTS "Service role can access all client intakes" ON client_intakes;

-- Step 2: Create a simple policy that allows anonymous users to insert data
CREATE POLICY "Allow anonymous inserts" ON client_intakes
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Step 3: Create a policy for authenticated users
CREATE POLICY "Allow authenticated inserts" ON client_intakes
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Step 4: Keep service role access for admin operations
CREATE POLICY "Service role full access" ON client_intakes
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Step 5: Verify the policies were created
SELECT policyname, roles, cmd FROM pg_policies WHERE tablename = 'client_intakes';

-- Step 6: Test the fix (optional - you can comment this out)
INSERT INTO client_intakes (
    full_name, email, business_name, country, design_vibe,
    annual_revenue_range, offer_structure, monthly_leads_expected,
    content_frequency, service_path, project_vision, hosting_expectation,
    recommended_plan, complexity_score, plan_flags, form_payload
) VALUES (
    'Test User', 'test@example.com', 'Test Business', 'NZ', 'Modern design',
    'pre-revenue', 'single-service', 'under-20', 'rare-updates',
    'managed', 'Test vision', 'managed-hosting', 'starter', 2,
    '{"requiresAuth": false}', '{"test": "rls_fix"}'
);

-- Clean up test data (uncomment if you ran the test above)
-- DELETE FROM client_intakes WHERE form_payload ->> 'test' = 'rls_fix';
