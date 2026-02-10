# SaaSy Cookies - Product Studio Website PRD

## Original Problem Statement
Build a product studio website for SaaSy Cookies (parent company) showcasing multiple products/tools and SEO landing pages that funnel to SenseAI and Pacific Market. Includes fully functional Invoice Generator and QR Code Generator tools.

## Architecture
- **Frontend**: React (CRA) + React Router + Tailwind CSS + shadcn/ui components
- **Backend**: FastAPI (minimal, not used for this project)
- **Styling**: Dark "Dark Matter" theme - Outfit + Manrope fonts, glassmorphism cards, neon accents
- **Tools**: jsPDF for invoice PDF generation, qrcode.react for QR code generation

## User Personas
- SaaS founders exploring AI journaling (SenseAI)
- Pacific Island creators/businesses seeking visibility (Pacific Market)
- Small business owners needing free invoice/QR tools
- Developers interested in utility tools

## Core Requirements (Static)
- Multi-page marketing site with internal navigation
- SEO landing pages for SenseAI and Pacific Market
- Fully functional client-side Invoice Generator with PDF export
- Fully functional client-side QR Code Generator with PNG download
- Responsive design with mobile menu
- Legal pages (Contact, Privacy, Terms)

## What's Been Implemented (Jan 2026)
- [x] Main layout with fixed header navigation + compact footer
- [x] Homepage: Hero, What We Build, Featured Products, Free Tools, Coming Soon sections
- [x] SenseAI SEO page: Problem, Shift, Use Cases, Founder POV, CTA
- [x] Pacific Market SEO page: Gap, Vision, Tech as Enabler, Founder Story, CTA
- [x] Invoice Generator: Full form with line items, tax, live preview, PDF download
- [x] QR Code Generator: Text input, size/color options, live preview, PNG download, copy to clipboard
- [x] Contact page with message form
- [x] Privacy Policy page
- [x] Terms of Service page
- [x] Responsive mobile menu
- [x] All routes working without 404s
- [x] 100% test pass rate

## Prioritized Backlog
### P0 (Critical) - None remaining
### P1 (High)
- Add actual external product links when SenseAI/Pacific Market apps are live
- SEO meta tags (title, OG tags, JSON-LD structured data)
- Analytics integration (e.g., Plausible or similar privacy-respecting)

### P2 (Medium)
- Blog/content section for SEO
- Newsletter signup/email capture
- Additional tools (Contract templates, Expense tracker)
- Animations/micro-interactions enhancement (scroll-triggered)

### P3 (Low)
- Dark/light theme toggle
- Multi-language support
- Accessibility audit (WCAG 2.1 AA)

## Next Tasks
1. Add SEO meta tags and structured data to all pages
2. Connect contact form to a backend email service
3. Add more business tools as mentioned in "Coming Soon"
