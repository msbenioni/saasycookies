-- Debug function to check what role the browser request is actually using
create or replace function public.debug_request_context()
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'auth_uid', auth.uid(),
    'auth_role', auth.role(),
    'jwt_claims', current_setting('request.jwt.claims', true),
    'request_role', current_setting('request.jwt.claim.role', true)
  );
$$;

-- Grant execute permission to anon and authenticated
grant execute on function public.debug_request_context() to anon, authenticated;
