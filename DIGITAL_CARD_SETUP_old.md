# Digital Business Card Service Setup

## Routes

- `/tools/digital-card` - create card + start Stripe trial checkout
- `/tools/digital-card/success` - webhook-confirmed activation page
- `/tools/digital-card/cancel` - canceled checkout page
- `/card/:slug` - public card page with status gating
- `/edit/:token` - private edit page (no login)

## Netlify Functions

- `create-checkout-session` - creates draft card (or resumes card) and returns Stripe Checkout URL
- `stripe-webhook` - updates card lifecycle status from Stripe events
- `get-card-by-slug` - public lookup by slug
- `get-card-by-token` - edit lookup by token
- `update-card-by-token` - secure token-based update endpoint
- `get-card-status` - status polling for success page
- `sign-upload` - signed upload URL for Supabase storage image uploads

## Required Environment Variables

Set these in Netlify site settings:

- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID` (monthly $3.99 price)
- `STRIPE_WEBHOOK_SECRET`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PUBLIC_SITE_URL` (for Stripe success/cancel URLs)

Set this in frontend env (CRA):

- `REACT_APP_SUPABASE_URL`

## Stripe Events to Forward to Webhook

Webhook endpoint:

- `https://<your-site-domain>/.netlify/functions/stripe-webhook`

Enable events:

- `checkout.session.completed`
- `invoice.payment_succeeded`
- `invoice.payment_failed`
- `customer.subscription.deleted`

## Status Lifecycle

- `draft` -> card created, checkout not completed
- `trialing` -> Stripe checkout completed and trial active
- `active` -> first successful paid invoice
- `paused` -> payment failed or subscription canceled

## Supabase Storage

Create bucket:

- `digital-card-assets`

Recommended for MVP:

- Public bucket
- One image per card
- Restrict accepted formats to jpeg/png/webp in frontend

## Local verification checklist

1. Open `/tools/digital-card` and submit card details.
2. Confirm Stripe Checkout opens.
3. Complete test checkout.
4. Verify `/tools/digital-card/success` moves from pending to active/trialing.
5. Open `/card/:slug` and verify card renders.
6. Open `/edit/:token` and verify updates save.
7. Cancel subscription or fail payment in Stripe test mode and verify public page shows paused state.
