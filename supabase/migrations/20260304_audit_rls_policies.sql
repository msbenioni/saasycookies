-- Migration: Enable RLS and add minimal policies for audit tables

ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_sessions ENABLE ROW LEVEL SECURITY;

-- Deny public access (no policies created for anon by default)
REVOKE ALL ON TABLE audit_requests FROM anon, authenticated;
REVOKE ALL ON TABLE audit_sessions FROM anon, authenticated;

-- Service role retains access implicitly. Add explicit comment to document intent.
COMMENT ON TABLE audit_requests IS 'RLS enabled: service role access only.';
COMMENT ON TABLE audit_sessions IS 'RLS enabled: service role access only.';
