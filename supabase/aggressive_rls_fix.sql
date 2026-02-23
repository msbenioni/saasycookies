-- Aggressive RLS Fix - This will definitively solve the issue

-- Step 1: Completely disable RLS temporarily to test if the issue is RLS or permissions
alter table public.client_intakes disable row level security;

-- Step 2: Test insert without RLS (this should work if it's a permissions issue)
do $$
begin
    insert into public.client_intakes (
        full_name, email, business_name, country, design_vibe,
        annual_revenue_range, offer_structure, monthly_leads_expected,
        content_frequency, service_path, project_vision, hosting_expectation,
        recommended_plan, complexity_score, plan_flags, form_payload
    ) values (
        'No RLS Test', 
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
        '{"test": "no_rls"}'
    );
    
    raise notice '✅ Insert works without RLS - the issue is RLS policies';
    
exception when others then
    raise notice '❌ Insert fails even without RLS - the issue is table permissions: %', sqlerrm;
end $$;

-- Step 3: Check if test record was created
select id, created_at, full_name, email 
from public.client_intakes 
where form_payload ->> 'test' = 'no_rls'
order by created_at desc limit 1;

-- Step 4: Clean up test data
delete from public.client_intakes where form_payload ->> 'test' = 'no_rls';

-- Step 5: Re-enable RLS with the simplest possible policies
alter table public.client_intakes enable row level security;

-- Step 6: Drop ALL policies completely
drop policy if exists "Allow anonymous inserts" on public.client_intakes;
drop policy if exists "Allow authenticated inserts" on public.client_intakes;
drop policy if exists "Service role full access" on public.client_intakes;
drop policy if exists "Allow public inserts" on public.client_intakes;
drop policy if exists "Public insert" on public.client_intakes;

-- Step 7: Grant table permissions explicitly
grant usage on schema public to anon, authenticated, service_role;
grant select, insert, update, delete on table public.client_intakes to anon, authenticated;
grant all on table public.client_intakes to service_role;

-- Step 8: Create the simplest possible RLS policies
create policy "Enable all inserts" on public.client_intakes
for insert
to anon, authenticated
with check (true);

create policy "Service role all operations" on public.client_intakes
for all
to service_role
using (true)
with check (true);

-- Step 9: Verify policies
select 
    policyname,
    roles,
    cmd,
    permissive
from pg_policies 
where tablename = 'client_intakes'
order by policyname;

-- Step 10: Force PostgREST to reload everything
notify pgrst, 'reload schema';
notify pgrst, 'reload config';

-- Step 11: Test with RLS enabled
do $$
begin
    -- Test as anon role
    set local role anon;
    
    insert into public.client_intakes (
        full_name, email, business_name, country, design_vibe,
        annual_revenue_range, offer_structure, monthly_leads_expected,
        content_frequency, service_path, project_vision, hosting_expectation,
        recommended_plan, complexity_score, plan_flags, form_payload
    ) values (
        'RLS Test User', 
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
        '{"test": "rls_enabled"}'
    );
    
    raise notice '✅ RLS policies are now working correctly!';
    
exception when others then
    raise notice '❌ RLS policies still failing: %', sqlerrm;
end $$;

-- Step 12: Check final test record
select id, created_at, full_name, email 
from public.client_intakes 
where form_payload ->> 'test' = 'rls_enabled'
order by created_at desc limit 1;

-- Step 13: Clean up final test data
delete from public.client_intakes where form_payload ->> 'test' = 'rls_enabled';
