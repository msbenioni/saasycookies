/**
 * Design Tokens - Single Source of Truth for SaaSy Cookies
 * 
 * This file contains all design constants used throughout the application.
 * Always import from here instead of hardcoding values.
 * 
 * Brand Identity: Dark theme with neon accents
 */

// ============================================
// COLORS
// ============================================

export const colors = {
  // Brand Colors - Dark theme with neon accents
  brand: {
    primary: '#9e83ff',           // Light purple - main brand color
    primaryLight: '#b388ff',      // Neon lilac
    primaryDark: '#4337a5',       // Deep purple
    secondary: '#6e40c9',         // Terminal purple
    secondaryLight: '#6affd8',    // Neon mint
    highlight: '#ff6ad5',         // Neon pink
    warm: '#f0883e',              // Orange accent
  },

  // Background Colors - Dark theme
  background: {
    main: '#0c0c43',              // Deep blue background
    card: '#161b22',              // Dark card background
    elevated: '#21262d',         // Dark elevated surfaces
    input: '#21262d',             // Input backgrounds
    gradient: {
      deepBlue: '#0c0c43',       // Deep blue
      royalBlue: '#2a247a',      // Royal blue
      purple: '#4337a5',         // Purple
      lightPurple: '#9e83ff',    // Light purple
    },
  },

  // Text Colors - Light on dark
  text: {
    primary: '#ffffff',          // White - main text
    secondary: 'rgba(255, 255, 255, 0.85)',        // Secondary text
    tertiary: 'rgba(255, 255, 255, 0.7)',         // Muted text
    white: '#ffffff',
    light: '#c9d1d9',            // Light gray
    dark: '#161b22',             // Dark text (for light backgrounds)
  },

  // UI Colors
  ui: {
    border: '#30363d',           // Dark borders
    borderLight: '#d0d7de',      // Light borders (for light cards)
    borderDark: '#21262d',       // Dark borders
    divider: '#30363d',          // Dividers
    surface: '#161b22',          // Surfaces
    surfaceHover: '#30363d',     // Hover surfaces
    glass: {
      dark: 'rgba(10, 10, 35, 0.35)',      // Glass dark
      light: 'rgba(255, 255, 255, 0.10)',   // Glass light
    },
  },

  // Neon Accent Colors
  neon: {
    mint: '#6affd8',             // Neon mint green
    lilac: '#b388ff',            // Neon lilac purple
    pink: '#ff6ad5',             // Neon pink
    gradient: 'linear-gradient(90deg, #6affd8 0%, #b388ff 50%, #ff6ad5 100%)',
    glow: '0 0 16px 2px #b388ff, 0 0 32px 4px #6affd8, 0 0 32px 8px #ff6ad5',
  },

  // Button Colors
  button: {
    primary: '#4337a5',          // Brand primary
    primaryHover: '#5447b5',     // Lighter purple
    secondary: '#21262d',       // Dark secondary
    secondaryHover: '#30363d',    // Dark hover
    ghost: 'transparent',        // Ghost button
    ghostHover: '#30363d',       // Ghost hover
  },

  // Status Colors
  status: {
    success: '#3fb950',          // Green
    successLight: 'rgba(63, 185, 80, 0.2)',
    warning: '#f0883e',          // Orange
    warningLight: 'rgba(240, 136, 62, 0.2)',
    error: '#f85149',            // Red
    errorLight: 'rgba(248, 81, 73, 0.2)',
    info: '#9e83ff',             // Purple
    infoLight: 'rgba(158, 131, 255, 0.2)',
  },

  // Terminal Colors
  terminal: {
    red: '#ff5f56',
    orange: '#ffbd2e',
    green: '#27c93f',
    purple: '#6e40c9',
    text: '#8b949e',
    output: '#c9d1d9',
    success: '#3fb950',
  },

  // Invoice Colors (mapped from brand)
  invoice: {
    primary: '#9e83ff',
    secondary: '#4337a5',
    accent: '#6affd8',
    success: '#3fb950',
    warning: '#f0883e',
    error: '#f85149',
    text: '#ffffff',
    muted: 'rgba(255, 255, 255, 0.7)',
  },
} as const;

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  fontFamily: {
    heading: "'Cal Sans', 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    body: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
    mono: "'Consolas', 'Monaco', 'Courier New', monospace",
  },

  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
} as const;

// ============================================
// SPACING
// ============================================

export const spacing = {
  0: '0',
  1: '0.25rem',     // 4px
  2: '0.5rem',      // 8px
  3: '0.75rem',     // 12px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  8: '2rem',        // 32px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
  40: '10rem',      // 160px
  48: '12rem',      // 192px
  56: '14rem',      // 224px
  64: '16rem',      // 256px
} as const;

// ============================================
// BORDERS & RADIUS
// ============================================

export const borders = {
  radius: {
    none: '0',
    sm: '0.125rem',   // 2px
    md: '0.375rem',    // 6px
    DEFAULT: '0.5rem', // 8px
    lg: '0.75rem',     // 12px
    xl: '1rem',        // 16px
    '2xl': '1.25rem',  // 20px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
    glass: '1.25rem',  // Glass card radius
  },
  width: {
    none: '0',
    thin: '1px',
    medium: '2px',
    thick: '4px',
  },
} as const;

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  // Neon glow shadow
  neon: '0 0 16px 2px #b388ff, 0 0 32px 4px #6affd8, 0 0 32px 8px #ff6ad5',
  // Glass inner shadow
  glassInner: 'inset 0 2px 12px 0 rgba(255, 255, 255, 0.07)',
} as const;

// ============================================
// GRADIENTS
// ============================================

export const gradients = {
  // Main brand gradient - neon
  brand: 'linear-gradient(90deg, #6affd8 0%, #b388ff 50%, #ff6ad5 100%)',
  
  // Background gradient - dark theme
  hero: 'linear-gradient(180deg, #0c0c43 0%, #2a247a 15%, #4337a5 30%, #9e83ff 50%, #4337a5 70%, #2a247a 85%, #0c0c43 100%)',
  
  // Scroll gradient for dark theme
  scroll: 'linear-gradient(180deg, #0c0c43 0%, #2a247a 15%, #4337a5 30%, #9e83ff 50%, #4337a5 70%, #2a247a 85%, #0c0c43 100%)',
  
  // Text gradient
  text: 'linear-gradient(to right, #9e83ff, #ff6ad5)',
  
  // Glass overlay
  glass: 'linear-gradient(120deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
} as const;

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  duration: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
    slower: '500ms',
  },
  timing: {
    ease: 'ease',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
  property: {
    all: 'all',
    colors: 'background-color, border-color, color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  },
} as const;

// ============================================
// INVOICE STYLES
// ============================================

export const invoiceStyles = {
  defaults: {
    primaryColor: '#9e83ff',
    fontFamily: 'calibri',
  },
  fontOptions: [
    { value: 'helvetica', label: 'Helvetica (Clean & Modern)' },
    { value: 'times', label: 'Times New Roman (Classic)' },
    { value: 'courier', label: 'Courier (Typewriter Style)' },
    { value: 'calibri', label: 'Calibri (Professional)' },
  ] as const,
  colorOptions: [
    '#9e83ff', // Purple
    '#4337a5', // Deep Purple
    '#6affd8', // Mint
    '#ff6ad5', // Pink
    '#3fb950', // Green
    '#f0883e', // Orange
  ] as const,
} as const;

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;

// ============================================
// BRAND MESSAGING
// ============================================

export const brand = {
  name: 'SaaSy Cookies',
  tagline: 'Building the future, one line at a time.',
  positioning: 'A product studio crafting innovative digital products with style and purpose.',
  
  // Product categories
  categories: {
    personal: {
      title: 'Personal Growth',
      description: 'Reflection, clarity, mental organisation',
      icon: 'Brain',
    },
    business: {
      title: 'Small Business',
      description: 'Simple products that remove admin overwhelm',
      icon: 'Briefcase',
    },
    utility: {
      title: 'Utility Tools',
      description: 'Practical everyday digital helpers',
      icon: 'Wrench',
    },
  },
  
  // Products
  products: {
    senseai: {
      name: 'SenseAI',
      tagline: 'Type It, Say It, Scan It',
      description: 'AI-powered journaling system',
      url: 'https://senseai.co.nz',
    },
    invoice: {
      name: 'Smart Invoice Generator',
      tagline: 'Simple invoice creation for freelancers and sole traders',
      description: 'Create professional invoices in seconds. No signup required.',
    },
  },
} as const;

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert hex color to RGB object
 */
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

/**
 * Convert hex to rgba string with opacity
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
};

// ============================================
// EXPORTS
// ============================================

// Default export for convenience
export const designTokens = {
  colors,
  typography,
  spacing,
  borders,
  shadows,
  gradients,
  transitions,
  invoiceStyles,
  breakpoints,
  zIndex,
  brand,
} as const;

export default designTokens;
