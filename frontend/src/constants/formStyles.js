export const INPUT_CLASS = "w-full bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 rounded-md transition-all outline-none";

export const SELECT_CLASS = "w-full bg-zinc-950/50 border border-zinc-800 px-4 py-3 text-white focus:outline-none focus:ring-2 rounded-md transition-all outline-none";

export const CHECKBOX_LABEL_CLASS = "flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-sm text-zinc-300 cursor-pointer hover:bg-zinc-950/70 transition-colors";

export const CHECKBOX_INPUT_CLASS = "h-4 w-4 rounded border-zinc-600 bg-zinc-950/50 focus:ring-2 cursor-pointer";

export const BADGE_CLASS = "inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-950/50 border border-zinc-800 text-xs font-medium";

export const MESSAGE_BOX_CLASS = "mb-8 rounded-md border border-zinc-800 bg-zinc-950/50 p-5 flex items-start gap-3";

export const PREVIEW_CONTAINER_CLASS = "rounded-xl bg-white text-gray-900 p-6 sm:p-8 md:p-10 shadow-2xl sticky top-24 min-w-[320px] sm:min-w-[640px]";

export const QR_PREVIEW_CONTAINER_CLASS = "rounded-2xl bg-zinc-900/40 border border-white/5 p-6 sm:p-8 md:p-12 flex flex-col items-center gap-6 sticky top-24 min-w-[320px] sm:min-w-[400px]";

export const PAGE_HEADER_CLASS = "max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-16 md:py-24";

export const PAGE_HEADER_ICON_CLASS = "w-10 h-10 rounded-lg flex items-center justify-center";

export const PAGE_HEADER_TITLE_CLASS = "font-heading text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight";

export const PAGE_HEADER_DESC_CLASS = "text-zinc-500 mb-12 ml-[52px] text-sm sm:text-base";

export const SECTION_CLASS = "space-y-6";

export const SECTION_TITLE_CLASS = "font-heading text-lg sm:text-xl font-semibold";

export const FORM_GRID_CLASS = "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6";

export const FOCUS_COLORS = {
  purple: "focus:ring-purple-500/30 focus:border-purple-500",
  pink: "focus:ring-pink-500/30 focus:border-pink-500",
  emerald: "focus:ring-emerald-400/30 focus:border-emerald-400",
};

export const TEXT_COLORS = {
  purple: "text-purple-500",
  pink: "text-pink-500",
  emerald: "text-emerald-400",
};

export const BG_COLORS = {
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  emerald: "bg-emerald-400",
};

export const ICON_BG_COLORS = {
  purple: "bg-purple-500/10 border-purple-500/20",
  pink: "bg-pink-500/10 border-pink-500/20",
  emerald: "bg-emerald-400/10 border-emerald-400/20",
};

// Section title styles for consistency across pages
export const SECTION_TITLE_STYLES = {
  // Main section titles (h2)
  main: "font-heading text-4xl md:text-5xl font-bold tracking-tight text-white mb-6",
  
  // Subsection titles (h3) 
  subsection: "font-heading text-2xl font-semibold text-white mb-2",
  
  // Card titles (h3)
  card: "font-heading text-xl font-semibold text-white mb-2",
  
  // Small section titles
  small: "font-heading text-3xl md:text-4xl font-bold tracking-tight text-white mb-4",
};

// Section label styles (small uppercase text above titles)
export const SECTION_LABEL_STYLES = {
  // Standard section labels
  default: "text-xs font-medium text-zinc-500 uppercase tracking-widest",
  
  // Primary colored labels
  primary: "text-xs font-medium text-brand-primary uppercase tracking-widest",
  
  // Emerald colored labels
  emerald: "text-xs font-medium text-emerald-400 uppercase tracking-widest",
};

// Card styles for consistency across pages
export const CARD_STYLES = {
  // Base card style with premium ring instead of border
  base: "group block relative overflow-hidden rounded-2xl bg-zinc-900/60 ring-1 ring-white/10 hover:ring-brand-primary/40 transition-all duration-500",
  
  // Hover overlay effect
  overlay: "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",
  
  // Card padding
  padding: "relative p-8 md:p-10",
  
  // Icon container
  iconContainer: "w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center shrink-0",
  
  // Card content layout
  contentLayout: "flex items-start gap-5",
  
  // Alternative layout for service cards
  serviceLayout: "relative p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6",
  
  // Category card layout
  categoryLayout: "relative p-6 flex flex-col gap-4",
};

// Section description styles
export const SECTION_DESCRIPTION_STYLES = "text-zinc-200 text-lg max-w-2xl mb-16 leading-relaxed";
