-- Migration: Create audit_requests and audit_sessions tables + private template bucket

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Audit payment requests
CREATE TABLE IF NOT EXISTS audit_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  company_name TEXT,
  full_name TEXT,
  template_path TEXT,
  status TEXT NOT NULL DEFAULT 'created',
  source TEXT,
  stripe_checkout_session_id TEXT,
  stripe_payment_intent_id TEXT,
  audit_paid_at TIMESTAMPTZ,
  audit_due_at TIMESTAMPTZ,
  summary_outline TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_requests_email ON audit_requests(email);
CREATE INDEX IF NOT EXISTS idx_audit_requests_status ON audit_requests(status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_audit_requests_checkout_session ON audit_requests(stripe_checkout_session_id);

-- Audit session wizard data
CREATE TABLE IF NOT EXISTS audit_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  progress INTEGER NOT NULL DEFAULT 0,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  resume_token TEXT NOT NULL,
  audit_request_id UUID REFERENCES audit_requests(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_sessions_email ON audit_sessions(email);
CREATE INDEX IF NOT EXISTS idx_audit_sessions_status ON audit_sessions(status);
CREATE INDEX IF NOT EXISTS idx_audit_sessions_request_id ON audit_sessions(audit_request_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_audit_sessions_resume_token ON audit_sessions(resume_token);

-- Private bucket for paid audit templates
INSERT INTO storage.buckets (id, name, public)
VALUES ('audit-templates', 'audit-templates', false)
ON CONFLICT (id) DO NOTHING;
