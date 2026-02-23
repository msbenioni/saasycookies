-- Clean up conflicting RLS policies
-- The issue is multiple policies targeting 'public' role that conflict with 'anon' policies

-- Step 1: Drop the conflicting policies
drop policy if exists "Allow public inserts" on public.client_intakes;
drop policy if exists "Public insert" on public.client_intakes;

-- Step 2: Keep only the clean policies
-- These should already exist, but let's make sure they're correct
drop policy if exists "Allow anonymous inserts" on public.client_intakes;
drop policy if exists "Allow authenticated inserts" on public.client_intakes;
drop policy if exists "Service role full access" on public.client_intakes;

-- Step 3: Recreate clean policies
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

create policy "Service role full access"
on public.client_intakes
for all
to service_role
using (true)
with check (true);

-- Step 4: Verify the final policies
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

-- Step 5: Reload PostgREST schema cache
notify pgrst, 'reload schema';

-- Step 6: Test the fix
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
        'Policy Fix Test', 
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
        '{"test": "policy_fix"}'
    );
    
    raise notice '✅ Policy fix successful! RLS is working correctly.';
    
exception when others then
    raise notice '❌ Policy fix failed: %', sqlerrm;
end $$;

-- Step 7: Check if test record was created
select id, created_at, full_name, email 
from public.client_intakes 
where form_payload ->> 'test' = 'policy_fix'
order by created_at desc limit 1;

-- Step 8: Clean up test data
delete from public.client_intakes where form_payload ->> 'test' = 'policy_fix';
