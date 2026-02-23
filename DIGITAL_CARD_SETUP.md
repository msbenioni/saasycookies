# Digital Business Card Service Setup

## Overview

The Digital Business Card service allows users to create a professional digital business card with a 30-day free trial, then $3.99/month subscription. Cards include profile images, contact information, VCF download, and QR code sharing.

## Routes

- `/tools/digital-card` - Create card and start Stripe trial checkout
- `/tools/digital-card/success` - Post-checkout activation page with status polling
- `/tools/digital-card/cancel` - Checkout canceled page
- `/card/:slug` - Public card page with status gating (active/trialing only)
- `/edit/:token` - Private edit page (no login required)

## Netlify Functions

### Core Functions
- `create-checkout-session` - Creates draft card (or resumes existing) and returns Stripe Checkout URL
- `stripe-webhook` - Updates card lifecycle status from Stripe events
- `get-card-by-slug` - Public lookup by slug (includes card ID)
- `get-card-by-token` - Edit lookup by token
- `update-card-by-token` - Secure token-based card updates
- `get-card-status` - Status polling for success page
- `sign-upload` - Signed upload URL for Supabase Storage image uploads

## Database Schema

### Table: `digital_cards`

```sql
create table if not exists digital_cards (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  edit_token text unique not null,
  status text not null default 'draft', -- draft | trialing | active | paused
  card_json jsonb not null default '{}'::jsonb,
  asset_path text, -- profile image path in Supabase Storage
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  trial_ends_at timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### Indexes
- `digital_cards_slug_idx` on `slug`
- `digital_cards_edit_token_idx` on `edit_token`

### RLS Policies
- Public read for card rendering (`select` with `using (true)`)
- Service role only writes (handled by Netlify functions)

## Environment Variables

### Netlify (Backend) Variables
```
STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
STRIPE_PRICE_ID=price_... (monthly $3.99)
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PUBLIC_SITE_URL=https://your-site.netlify.app
```

### Frontend (Create React App) Variables
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
```

## Stripe Configuration

### Product Setup
1. Create product: "Digital Business Card"
2. Create price: $3.99/month with 30-day trial
3. Copy the Price ID to `STRIPE_PRICE_ID`

### Webhook Setup
- Endpoint: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
- Events to enable:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.deleted`

## Supabase Storage

### Bucket Setup
- Name: `digital-card-assets`
- Access: Public (for MVP)
- File types: jpeg, png, webp (restricted in frontend)
- Size limit: Recommended 2MB per file

### Image Handling
- Frontend compresses images before upload
- One image per card (profile picture)
- Public URLs constructed with `REACT_APP_SUPABASE_URL`

## Card Status Lifecycle

1. **draft** - Card created, checkout not completed
2. **trialing** - Stripe checkout completed, 30-day trial active
3. **active** - First successful paid invoice
4. **paused** - Payment failed or subscription canceled

## User Flow

### New Card Creation
1. User fills form at `/tools/digital-card`
2. Draft card created in Supabase
3. Redirected to Stripe Checkout (30-day trial)
4. After payment: redirected to `/tools/digital-card/success`
5. Webhook updates status to `trialing`
6. Success page polls and shows activation

### Public Viewing
- `/card/:slug` renders if status is `trialing` or `active`
- If `paused`, shows resume option
- Includes VCF download and QR code sharing

### Editing
- `/edit/:token` allows editing without login
- Token-based authentication
- Image upload via signed URLs
- Updates save immediately

### Resuming Paused Cards
- Public page shows "Resume Subscription" button
- Creates new checkout session (no trial)
- Immediate payment on resume

## Local Verification Checklist

1. **Environment Setup**
   - [ ] All environment variables set
   - [ ] Supabase SQL script executed
   - [ ] Storage bucket created
   - [ ] Stripe webhook configured

2. **Test Flow**
   - [ ] Open `/tools/digital-card` and submit card details
   - [ ] Confirm Stripe Checkout opens in test mode
   - [ ] Complete test checkout with Stripe test card
   - [ ] Verify `/tools/digital-card/success` shows pending → active/trialing
   - [ ] Open `/card/:slug` and verify card renders correctly
   - [ ] Open `/edit/:token` and verify updates save
   - [ ] Test image upload and profile picture update
   - [ ] Test VCF download and QR code generation
   - [ ] Cancel subscription in Stripe test mode
   - [ ] Verify public page shows paused state with resume option

3. **Error Handling**
   - [ ] Test invalid slugs/tokens show appropriate errors
   - [ ] Test webhook failure scenarios
   - [ ] Test image upload failures

## Security Notes

- All database writes use service role key (backend only)
- Edit tokens are unique and non-guessable
- Stripe signatures verified for webhooks
- Supabase Storage uploads use signed URLs
- RLS enabled on database table

## Troubleshooting

### Common Issues
- **Webhook not firing**: Check Stripe webhook configuration and endpoint URL
- **Card not activating**: Verify webhook events are being received and processed
- **Image upload failing**: Check Supabase bucket permissions and CORS settings
- **Status not updating**: Check Netlify function logs for webhook processing errors

### Debugging
- Check Netlify function logs in dashboard
- Verify Stripe webhook delivery logs
- Check Supabase database directly for card status
- Use browser dev tools to check frontend API calls

## Cost Considerations

- Supabase: Free tier should cover initial usage
- Stripe: No fees until you process payments
- Netlify: Free tier includes sufficient function calls
- Storage: Minimal with single image per card
