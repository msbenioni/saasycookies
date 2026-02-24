import { motion } from "framer-motion";
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

// Constants for shared tab layout
export const TAB_LAYOUT_CONSTANTS = {
  NAV_OFFSET: 88,
  STACK_PX: 30,
  TAB_CLEARANCE_PX: 26,
  FOOTER_HEIGHT: 80,
  FOOTER_GAP_PX: 10,
};

// Shared tab component
export function TabLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-t-xl rounded-b-md border border-white/15 bg-[#0f172a]/95 px-4 py-2 text-sm font-semibold text-zinc-200 shadow-[0_10px_25px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <span>{children}</span>
      <span className="h-2 w-2 rounded-full bg-emerald-300" />
    </div>
  );
}

// Shared folder card component
export function FolderCard({ id, tab, children, className = "" }) {
  return (
    <section
      id={id}
      className={`relative w-[min(1100px,92vw)] origin-top rounded-2xl border border-white/10 bg-[#0b1020]/90 backdrop-blur-md shadow-[0_18px_55px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="absolute -top-5 left-6 z-20">
        <TabLabel>{tab}</TabLabel>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

      <div className="px-6 pt-7 pb-8 md:px-10">{children}</div>

      <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/10 to-transparent" />
    </section>
  );
}

// Sticky folder card component with scroll animations
export function StickyFolderCard({ id, tab, index, total, progress, footerHeight, children }) {
  const isLast = index === total - 1;
  const targetScale = 1 - (total - index - 1) * 0.045;
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  const opacity = useTransform(progress, [rangeStart - 0.05, rangeStart, rangeEnd], [0, 1, 1]);

  return (
    <div
      className={[
        "sticky flex justify-center",
        isLast ? "items-end" : "items-start",
      ].join(" ")}
      style={{
        top: TAB_LAYOUT_CONSTANTS.NAV_OFFSET,
        height: `calc(100vh - ${TAB_LAYOUT_CONSTANTS.NAV_OFFSET + footerHeight + TAB_LAYOUT_CONSTANTS.FOOTER_GAP_PX}px)`,
        paddingBottom: isLast ? `${TAB_LAYOUT_CONSTANTS.FOOTER_GAP_PX}px` : undefined,
      }}
    >
      <motion.section
        id={id}
        style={{
          scale,
          opacity,
          y: isLast ? 0 : TAB_LAYOUT_CONSTANTS.TAB_CLEARANCE_PX + (index * TAB_LAYOUT_CONSTANTS.STACK_PX),
          zIndex: total - index,
        }}
        className="relative w-[min(1100px,92vw)] origin-top rounded-2xl border border-white/10 bg-[#0b1020]/90 backdrop-blur-md shadow-[0_18px_55px_rgba(0,0,0,0.45)]"
      >
        <div className="absolute -top-5 left-6 z-20">
          <TabLabel>{tab}</TabLabel>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

        <div className="px-6 pt-7 pb-8 md:px-10">{children}</div>

        <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/10 to-transparent" />
      </motion.section>
    </div>
  );
}

// Hook for scroll progress
export function useScrollProgress() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${TAB_LAYOUT_CONSTANTS.NAV_OFFSET}px`, "end end"],
  });

  return { containerRef, scrollYProgress };
}

// Shared background pattern
export function BackgroundPattern({ children }) {
  return (
    <div className="relative">
      <div
        className="absolute inset-0 opacity-40 animate-glow-pulse"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.1) 0%, transparent 50%)",
        }}
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.03%22/%3E%3C/svg%3E')]" />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
