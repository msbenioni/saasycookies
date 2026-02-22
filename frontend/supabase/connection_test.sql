-- Quick connection test to verify RLS policies and permissions

-- Step 1: Check if RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'client_intakes';

-- Step 2: Check current policies
SELECT policyname, roles, cmd, permissive FROM pg_policies WHERE tablename = 'client_intakes';

-- Step 3: Check table privileges
SELECT 
    grantee,
    table_catalog,
    table_schema,
    table_name,
    privilege_type,
    is_grantable
FROM information_schema.role_table_grants 
WHERE table_name = 'client_intakes' 
AND grantee IN ('anon', 'authenticated', 'service_role')
ORDER BY grantee, privilege_type;

-- Step 4: Test a simple insert (this should work with anon role)
-- This will tell us if the anon role has the right permissions
DO $$
BEGIN
    -- Reset any existing session
    RESET ROLE;
    
    -- Try to insert as anon (this simulates what the frontend does)
    SET LOCAL ROLE anon;
    
    INSERT INTO client_intakes (
        full_name, email, business_name, country, design_vibe,
        annual_revenue_range, offer_structure, monthly_leads_expected,
        content_frequency, service_path, project_vision, hosting_expectation,
        recommended_plan, complexity_score, plan_flags, form_payload
    ) VALUES (
        'Connection Test User', 
        'test@example.com', 
        'Test Business', 
        'NZ',
        'Modern design',
        'pre-revenue', 
        'single-service', 
        'under-20',
        'rare-updates', 
        'managed', 
        'Test vision', 
        'managed-hosting',
        'starter', 
        1, 
        '{"test": true}',
        '{"test": "connection_test"}'
    );
    
    RAISE NOTICE '✅ Anon insert successful - RLS policies are working';
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '❌ Anon insert failed: %', SQLERRM;
END $$;

-- Step 5: Check if the test record was created
SELECT id, created_at, full_name, email FROM client_intakes 
WHERE form_payload ->> 'test' = 'connection_test'
ORDER BY created_at DESC LIMIT 1;

-- Step 6: Clean up test data if it was created
DELETE FROM client_intakes WHERE form_payload ->> 'test' = 'connection_test';
