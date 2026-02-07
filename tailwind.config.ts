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
        neon: designTokens.colors.neon,
        // Status
        status: designTokens.colors.status,
      },
      fontFamily: {
        heading: designTokens.typography.fontFamily.heading,
        body: designTokens.typography.fontFamily.body,
        mono: designTokens.typography.fontFamily.mono,
      },
      fontSize: designTokens.typography.fontSize,
      fontWeight: designTokens.typography.fontWeight,
      lineHeight: designTokens.typography.lineHeight,
      letterSpacing: designTokens.typography.letterSpacing,
      spacing: designTokens.spacing,
      borderRadius: designTokens.borders.radius,
      boxShadow: designTokens.shadows,
      transitionDuration: designTokens.transitions.duration,
      transitionTimingFunction: designTokens.transitions.timing,
      screens: designTokens.breakpoints,
      zIndex: designTokens.zIndex,
    },
  },
  plugins: [],
};
