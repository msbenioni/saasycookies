import { designTokens } from './src/design-tokens.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          primary: designTokens.colors.brand.primary,
          'primary-light': designTokens.colors.brand.primaryLight,
          'primary-dark': designTokens.colors.brand.primaryDark,
          secondary: designTokens.colors.brand.secondary,
          highlight: designTokens.colors.brand.highlight,
        },
        // Background
        background: designTokens.colors.background.main,
        // Text
        text: {
          primary: designTokens.colors.text.primary,
          secondary: designTokens.colors.text.secondary,
        },
        // UI
        ui: designTokens.colors.ui,
        // Accent
        accent: designTokens.colors.accent,
        // Status
        status: designTokens.colors.status,
      },
      fontFamily: {
        heading: designTokens.typography.fonts.heading,
        body: designTokens.typography.fonts.body,
        mono: designTokens.typography.fonts.mono,
      },
      fontSize: designTokens.typography.sizes,
      fontWeight: designTokens.typography.weights,
      lineHeight: designTokens.typography.lineHeights,
      letterSpacing: designTokens.typography.letterSpacing,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borders.radius,
      boxShadow: designTokens.shadows,
      transitionDuration: designTokens.transitions.duration,
      transitionTimingFunction: designTokens.transitions.easing,
      screens: designTokens.breakpoints,
      zIndex: designTokens.zIndex,
    },
  },
  plugins: [],
};
