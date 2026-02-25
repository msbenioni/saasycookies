// Product Logo Constants
export const PRODUCT_LOGOS = {
  SENSEAI: {
    src: '/senseai_logo.webp',
    alt: 'SenseAI Logo',
    sizes: {
      NAV: 'w-8 h-8',
      HERO: 'w-16 h-16 md:w-20 md:h-20',
      CARD: 'w-12 h-12',
      FOOTER: 'w-6 h-6',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32'
    },
    classes: {
      BASE: 'object-contain',
      NAV: 'w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity rounded-lg',
      HERO: 'w-16 h-16 md:w-20 md:h-20 object-contain animate-float-slow rounded-xl',
      CARD: 'w-12 h-12 object-contain group-hover:scale-110 transition-transform rounded-lg',
      FOOTER: 'w-6 h-6 object-contain rounded-md',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32 object-contain opacity-20 animate-float rounded-2xl'
    }
  },
  PACIFIC_MARKET: {
    src: '/pacific_market_logo.webp',
    alt: 'Pacific Market Logo',
    sizes: {
      NAV: 'w-8 h-8',
      HERO: 'w-16 h-16 md:w-20 md:h-20',
      CARD: 'w-12 h-12',
      FOOTER: 'w-6 h-6',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32'
    },
    classes: {
      BASE: 'object-contain',
      NAV: 'w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity rounded-lg',
      HERO: 'w-16 h-16 md:w-20 md:h-20 object-contain animate-float-slow rounded-xl',
      CARD: 'w-12 h-12 object-contain group-hover:scale-110 transition-transform rounded-lg',
      FOOTER: 'w-6 h-6 object-contain rounded-md',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32 object-contain opacity-20 animate-float rounded-2xl'
    }
  },
  SAASY_COOKIES: {
    src: '/saasy_cookies_logo.webp',
    alt: 'SaaSy Cookies Logo',
    sizes: {
      NAV: 'w-8 h-8',
      HERO: 'w-16 h-16 md:w-20 md:h-20',
      CARD: 'w-12 h-12',
      FOOTER: 'w-6 h-6',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32'
    },
    classes: {
      BASE: 'object-contain',
      NAV: 'w-8 h-8 object-contain opacity-80 hover:opacity-100 transition-opacity rounded-lg',
      HERO: 'w-16 h-16 md:w-20 md:h-20 object-contain animate-float-slow rounded-xl',
      CARD: 'w-12 h-12 object-contain group-hover:scale-110 transition-transform rounded-lg',
      FOOTER: 'w-6 h-6 object-contain rounded-md',
      FLOATING: 'w-24 h-24 md:w-32 md:h-32 object-contain opacity-20 animate-float rounded-2xl'
    }
  }
};

// Animated Background Logos for Hero Sections
export const BACKGROUND_LOGOS = [
  {
    product: 'SENSEAI',
    position: 'top-20 left-10',
    animation: 'animate-float-slow',
    opacity: 'opacity-10'
  },
  {
    product: 'PACIFIC_MARKET',
    position: 'bottom-20 right-10',
    animation: 'animate-float-reverse',
    opacity: 'opacity-10'
  },
  {
    product: 'SENSEAI',
    position: 'top-40 right-20',
    animation: 'animate-float-medium',
    opacity: 'opacity-5'
  },
  {
    product: 'PACIFIC_MARKET',
    position: 'bottom-40 left-20',
    animation: 'animate-float-reverse-slow',
    opacity: 'opacity-5'
  }
];
