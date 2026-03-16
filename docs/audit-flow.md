# SaaSy Cookies Audit My Business Flow

## Overview
A paid, multi-step onboarding wizard that collects infrastructure data, autosaves, and allows resume via magic link. No downloadable template; everything is completed online.

## Pages & Routes
- `/services/audit` → `AuditServicePage` (landing + pay)
- `/services/audit/start?checkout_session_id=...` → `AuditStartPage` (wizard)
- `/services/audit/:sessionId?token=...` → `AuditStartPage` (resume)
- `/services/audit/summary?checkout_session_id=...` → `AuditSummaryPage` (results)

## User Flow
1. **Landing page** (`/services/audit`): Enter name, email, company → Pay $10 via Stripe.
2. **Stripe success**: Redirects to `/services/audit/start?checkout_session_id=...`.
3. **Wizard start**: Creates `audit_sessions` row (only if `audit_requests.status = "paid"`). Sends magic resume link email.
4. **Multi-step form**: 6 steps (Business, Tools, Communication, Marketing, Documents, Pain Points). Autosaves after each step.
5. **Finish**: Marks session `completed` and redirects to summary.
6. **Resume**: Users can return via email link (`/services/audit/:sessionId?token=...`).

## Data Model
- `audit_requests`: payment row, Stripe metadata, status (`created` → `checkout_started` → `paid`)
- `audit_sessions`: wizard data (JSONB), progress, status (`in_progress` → `completed`), `resume_token`

## Security
- `resume_token` required to fetch/update a session.
- Session creation enforces paid status.
- One session per `audit_request_id` (reuse if exists).
- Paid gating on Next/Finish actions.

## Key Files
- `src/pages/AuditServicePage.jsx`: Landing + pay form
- `src/pages/AuditStartPage.jsx`: Multi-step wizard with autosave and resume
- `src/pages/AuditSummaryPage.jsx`: One-page audit summary
- `src/utils/auditService.js`: API helpers
- `netlify/functions/create-audit-checkout.js`: Stripe checkout + audit_requests row
- `netlify/functions/create-audit-session.js`: Session creation + email + paid enforcement
- `netlify/functions/update-audit-session.js`: Progress/data/status updates with token check
- `netlify/functions/get-audit-session.js`: Fetch session by token
- `netlify/functions/stripe-webhook.js`: Marks audit_requests paid on payment

## Notes
- No template download; all data is collected online.
- Resume links include a token; token is stored in DB and required for all session ops.
- Email sender: `audit@saasycookies.com`.
- Paid check enforced at session creation and on Next/Finish.
- Progress clamped 0–100; status limited to `in_progress|completed`.
