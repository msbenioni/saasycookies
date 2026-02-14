# SaaSy Cookies

A modern web application featuring free and premium business tools built with React, Tailwind CSS, and Netlify serverless functions.

## Features

### Free Tools
- **Invoice Generator** (`/tools/invoice-generator`) - Create and download professional PDF invoices
- **QR Code Generator** (`/tools/qr-generator`) - Generate and download QR codes for any text or URL

### Premium Tools
- **Digital Business Card** (`/tools/digital-card`) - Create and manage a digital business card with Stripe subscription
  - Public card page (`/card/:slug`)
  - Private editing (`/edit/:token`)
  - 30-day free trial, then $3.99/month
  - Image upload support via Supabase Storage
  - VCF contact download and QR code sharing

### Other Pages
- **Home** (`/`) - Landing page with tool overview
- **Contact** (`/contact`) - Contact form
- **Request Quote** (`/services/websites`) - Website development quote request
- **Privacy** (`/privacy`) - Privacy policy
- **Terms** (`/terms`) - Terms of service

## Tech Stack

- **Frontend**: React 19, React Router, Tailwind CSS, Lucide React
- **Backend**: Netlify Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe (Checkout Sessions, Webhooks)
- **Storage**: Supabase Storage (for digital card assets)
- **Deployment**: Netlify
- **Email**: Resend (via Netlify functions)

## Getting Started

### Prerequisites
- Node.js 18+
- Netlify account
- Supabase account
- Stripe account

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Set up environment variables (see `.env.example` below)
4. Start the development server:
   ```bash
   npm start
   ```

### Environment Variables

Create a `.env` file in the root:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
REACT_APP_SUPABASE_URL=https://your-project.supabase.co

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=re_...

# Google Analytics (optional)
REACT_APP_GA_MEASUREMENT_ID=G-...
```

## Deployment

### Netlify

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Required Netlify Environment Variables

All variables from the `.env` file above should be added to Netlify, except:
- `REACT_APP_SUPABASE_URL` (frontend-only)
- `REACT_APP_GA_MEASUREMENT_ID` (frontend-only)

### Stripe Webhook Setup

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-site.netlify.app/.netlify/functions/stripe-webhook`
3. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.deleted`
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL script from `supabase/digital_cards.sql`
3. Create storage bucket: `digital-card-assets` (public)
4. Add environment variables

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   ├── constants/          # Shared constants and styles
│   ├── layouts/            # Layout components
│   ├── pages/              # Page components
│   │   ├── products/       # Tool pages
│   │   └── seo/            # SEO pages
│   ├── utils/              # Utility functions
│   └── App.js              # Main app and routing
├── netlify/
│   └── functions/          # Serverless functions
├── supabase/               # Database schemas
└── package.json
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## License

Private © SaaSy Cookies
