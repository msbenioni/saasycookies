-- Quick RLS Diagnostic for client_intakes table
-- Run these queries in order to identify the issue

-- 1. Check if RLS is enabled
SELECT 
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE tablename = 'client_intakes';

-- 2. List all RLS policies
SELECT 
    policyname,
    permissive,
    roles,
    cmd,
    pg_get_expr(qual, policyrel) as using_condition,
    pg_get_expr(with_check, policyrel) as check_condition
FROM pg_policies 
WHERE tablename = 'client_intakes';

-- 3. Check current user context
SELECT 
    current_user as database_user,
    auth.uid() as auth_uid,
    auth.email() as auth_email,
    auth.role() as auth_role;

-- 4. Check table structure (focus on required fields)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'client_intakes' 
    AND is_nullable = 'NO'
ORDER BY ordinal_position;

-- 5. Test minimal insert (this should work if RLS allows it)
-- Comment this out if it causes errors
/*
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
    'Modern design',
    'pre-revenue',
    'single-service',
    'under-20',
    'rare-updates',
    'managed',
    'Test vision',
    'managed-hosting',
    'starter',
    2,
    '{"requiresAuth": false}',
    '{"test": "data"}'
);
*/
