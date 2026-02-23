// Logo Constants
export const LOGO_SIZES = {
  NAVIGATION: 'w-16 h-16',  // 64x64px
  FOOTER: 'w-16 h-16',      // 64x64px - same as navigation
  MOBILE: 'w-16 h-16',      // 64x64px - same as navigation
};

export const LOGO_CLASSES = {
  BASE: 'object-contain group-hover:opacity-80 transition-opacity',
  NAVIGATION: `${LOGO_SIZES.NAVIGATION} object-contain group-hover:opacity-80 transition-opacity`,
  FOOTER: `${LOGO_SIZES.FOOTER} object-contain`,
  MOBILE: `${LOGO_SIZES.MOBILE} object-contain group-hover:opacity-80 transition-opacity`,
};
