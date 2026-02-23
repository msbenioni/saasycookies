-- Definitive RLS Fix for client_intakes table
-- This recreates the policies cleanly to ensure they work with the new key format

-- Step 1: Ensure RLS is enabled
alter table public.client_intakes enable row level security;

-- Step 2: Drop all existing policies (clean slate)
drop policy if exists "Allow anonymous inserts" on public.client_intakes;
drop policy if exists "Allow authenticated inserts" on public.client_intakes;
drop policy if exists "Service role full access" on public.client_intakes;
drop policy if exists "Service role can access all client intakes" on public.client_intakes;

-- Step 3: Re-grant table permissions (defensive)
grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on table public.client_intakes to anon, authenticated;
grant all on table public.client_intakes to service_role;

-- Step 4: Create simple, permissive INSERT policies
create policy "Allow anonymous inserts"
on public.client_intakes
for insert
to anon
with check (true);

create policy "Allow authenticated inserts"
on public.client_intakes
for insert
to authenticated
with check (true);

-- Step 5: Service role gets full access
create policy "Service role full access"
on public.client_intakes
for all
to service_role
using (true)
with check (true);

-- Step 6: Verify policies are created
select 
    policyname,
    roles,
    cmd,
    permissive,
    case 
        when with_check is not null then 'Has WITH_CHECK'
        else 'No WITH_CHECK'
    end as check_condition
from pg_policies 
where tablename = 'client_intakes'
order by policyname;

-- Step 7: Reload PostgREST schema cache
notify pgrst, 'reload schema';

-- Step 8: Test the policies (this should work)
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
        '{"test": "rls_fix"}'
    );
    
    raise notice '✅ RLS policies are working correctly!';
    
exception when others then
    raise notice '❌ RLS policies still failing: %', sqlerrm;
end $$;

-- Step 9: Check if test record was created
select id, created_at, full_name, email 
from public.client_intakes 
where form_payload ->> 'test' = 'rls_fix'
order by created_at desc limit 1;

-- Step 10: Clean up test data
delete from public.client_intakes where form_payload ->> 'test' = 'rls_fix';
