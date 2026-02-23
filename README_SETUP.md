# SaaSy Cookies - Setup Instructions

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saasy-cookies/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment variables**
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
   
   Required variables:
   ```env
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Start development server**
   ```bash
   npm start
   # or
   yarn start
   ```

The app will be available at `http://localhost:3000`

## Environment Variables

### Required
- `REACT_APP_SUPABASE_URL` - Supabase project URL
- `REACT_APP_SUPABASE_ANON_KEY` - Supabase anonymous key
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

### Optional
- `REACT_APP_STRIPE_SECRET_KEY` - Stripe secret key (server-side)
- `REACT_APP_RESEND_API_KEY` - Resend API key for emails

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   ├── config/              # Site configuration
│   ├── constants/           # Shared constants
│   ├── hooks/               # Custom React hooks
│   ├── layouts/             # Layout components
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Page components
│   ├── utils/               # Utility functions
│   └── App.js              # Main app component
├── public/                  # Static assets
└── package.json           # Dependencies
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Key Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
- ✅ **Analytics Ready** - Plausible/GA4/PostHog support
- ✅ **Error Handling** - Global error boundary
- ✅ **Loading States** - Skeletons and loading components
- ✅ **Toast Notifications** - User feedback system (sonner)
- ✅ **Accessibility** - ARIA labels, keyboard navigation
- ✅ **Performance** - Lazy loading, optimized images

## Analytics Configuration

Configure analytics in `src/config/site.js`:

```javascript
analytics: {
  provider: "plausible", // or "ga4", "posthog"
  ids: {
    plausible: "your-domain.com",
    ga4: "G-XXXXXXXXXX",
    posthog: "phc_XXXXXXXXXX",
  },
}
```

## Deployment

### Netlify (Recommended)
1. Connect repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main

### Vercel
1. Connect repository to Vercel
2. Configure environment variables
3. Deploy automatically

### Manual Build
```bash
npm run build
# Deploy the build/ folder to your hosting provider
```

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify environment variables
   - Check Supabase project settings
   - Ensure CORS is configured

2. **Stripe Integration Issues**
   - Verify Stripe keys are correct
   - Check webhook endpoints
   - Ensure proper domain configuration

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check for missing environment variables
   - Verify all dependencies are installed

### Getting Help

- Check the browser console for errors
- Review network tab for failed requests
- Verify environment variables are set correctly
- Check the README in the parent directory for additional context

## Development Notes

- Uses React Router for navigation
- Tailwind CSS for styling
- Supabase for database
- Stripe for payments
- React Hook Form for form handling
- Radix UI for accessible components

## License

Private project - All rights reserved.
