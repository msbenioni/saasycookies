-- Database Inspection SQL for SaaSy Cookies
-- Use these queries to check table structure and RLS policies

-- =====================================================
-- 1. Check All Tables and Their Columns
-- =====================================================

-- List all tables in the public schema
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Get detailed column information for client_intakes table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length,
    ordinal_position
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'client_intakes'
ORDER BY ordinal_position;

-- Check if all expected columns exist in client_intakes
SELECT 
    column_name,
    data_type,
    is_nullable,
    CASE 
        WHEN is_nullable = 'NO' THEN 'REQUIRED'
        ELSE 'OPTIONAL'
    END as requirement_status
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name = 'client_intakes'
    AND column_name IN (
        'full_name', 'email', 'phone', 'business_name', 'country',
        'current_url', 'industry', 'business_description', 'primary_growth_goal',
        'success_metric', 'annual_revenue_range', 'offer_structure',
        'monthly_leads_expected', 'content_frequency', 'service_path',
        'project_vision', 'hosting_expectation', 'brand_colors',
        'preferred_fonts', 'inspiration_websites', 'design_vibe',
        'project_types', 'required_capabilities', 'primary_users',
        'desired_user_action', 'current_stack', 'integrations_needed',
        'auth_requirements', 'security_requirements', 'technical_requirements',
        'content_readiness', 'brand_readiness', 'timeline', 'constraints_and_risks',
        'recommended_plan', 'complexity_score', 'plan_flags', 'plan_reasoning',
        'build_prompt', 'form_payload', 'user_agent', 'referrer'
    )
ORDER BY 
    CASE 
        WHEN column_name IN ('full_name', 'email', 'business_name', 'country', 'design_vibe') THEN 1
        WHEN column_name IN ('annual_revenue_range', 'offer_structure', 'monthly_leads_expected', 'content_frequency', 'service_path', 'project_vision', 'hosting_expectation') THEN 2
        ELSE 3
    END,
    column_name;

-- =====================================================
-- 2. Check RLS (Row Level Security) Policies
-- =====================================================

-- Check if RLS is enabled on client_intakes table
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename = 'client_intakes';

-- Get all RLS policies for client_intakes table
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'client_intakes';

-- Get detailed RLS policy definitions
SELECT 
    nsp.nspname as schema_name,
    c.relname as table_name,
    p.policyname,
    p.permissive,
    p.roles,
    p.cmd,
    pg_get_expr(p.qual, p.policyrel) as using_expression,
    pg_get_expr(p.with_check, p.policyrel) as check_expression
FROM pg_policies p
JOIN pg_class c ON c.oid = p.policyrel
JOIN pg_namespace nsp ON nsp.oid = c.relnamespace
WHERE c.relname = 'client_intakes';

-- =====================================================
-- 3. Check Current User and Permissions
-- =====================================================

-- Get current user
SELECT current_user;

-- Check what roles the current user has
SELECT 
    rolname,
    rolsuper,
    rolcreaterole,
    rolcreatedb,
    rolcanlogin,
    rolreplication,
    rolbypassrls,
    rolpassword,
    rolvaliduntil
FROM pg_roles 
WHERE rolname = current_user;

-- Check table permissions for current user
SELECT 
    table_name,
    privilege_type,
    is_grantable
FROM information_schema.role_table_grants 
WHERE grantee = current_user
    AND table_name = 'client_intakes';

-- =====================================================
-- 4. Test Data Insert (Debug)
-- =====================================================

-- Try to insert a test record with minimal required fields
-- This will help identify which specific field is causing the RLS violation
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
    '{"test": "data"}'
);

-- If the above works, try adding more fields one by one to identify the problematic field

-- =====================================================
-- 5. Check Recent Errors (if available)
-- =====================================================

-- Check PostgreSQL logs for recent RLS violations (if you have access)
-- Note: This might require superuser access
SELECT 
    log_time,
    user_name,
    database_name,
    process_id,
    connection_from,
    session_id,
    session_line_num,
    command_tag,
    session_start_time,
    virtual_transaction_id,
    transaction_id,
    error_severity,
    sql_state_code,
    message,
    detail,
    hint,
    internal_query,
    internal_query_pos,
    context,
    query,
    query_pos,
    location,
    application_name
FROM pg_log 
WHERE message LIKE '%row-level security policy%'
    AND log_time > NOW() - INTERVAL '1 hour'
ORDER BY log_time DESC
LIMIT 10;

-- =====================================================
-- 6. Check Supabase Auth Context
-- =====================================================

-- Check if there's an authenticated user context
-- This helps debug if the RLS policy expects an authenticated user
SELECT 
    auth.uid(),
    auth.email(),
    auth.role(),
    auth.jwt();

-- =====================================================
-- 7. Alternative: Disable RLS Temporarily for Testing
-- =====================================================

-- TEMPORARILY disable RLS on client_intakes table (FOR TESTING ONLY)
-- WARNING: This removes security - re-enable immediately after testing
ALTER TABLE client_intakes DISABLE ROW LEVEL SECURITY;

-- Test insert with RLS disabled
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
    'Test User RLS Disabled',
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
    '{"test": "data"}'
);

-- Re-enable RLS immediately after testing
ALTER TABLE client_intakes ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 8. Create/Update RLS Policy (if needed)
-- =====================================================

-- Example: Create a simple RLS policy that allows all inserts
-- Use this if the current policy is too restrictive
CREATE POLICY "Allow all inserts" ON client_intakes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Or create a more specific policy
CREATE POLICY "Client intakes insert policy" ON client_intakes
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        full_name IS NOT NULL AND
        email IS NOT NULL AND
        business_name IS NOT NULL AND
        country IS NOT NULL AND
        design_vibe IS NOT NULL
    );

-- =====================================================
-- 9. Drop Existing Policies (if needed)
-- =====================================================

-- Drop all existing policies on client_intakes table
-- Use this if policies are conflicting or outdated
DROP POLICY IF EXISTS "policy_name_1" ON client_intakes;
DROP POLICY IF EXISTS "policy_name_2" ON client_intakes;
-- Add more DROP POLICY statements as needed

-- Or drop all policies at once (use with caution)
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    FOR policy_record IN 
        SELECT policyname FROM pg_policies WHERE tablename = 'client_intakes'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON client_intakes', policy_record.policyname);
    END LOOP;
END $$;
