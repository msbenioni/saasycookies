import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";

// Constants for shared tab layout
export const TAB_LAYOUT_CONSTANTS = {
  NAV_OFFSET: 88, // py-4 = 16px top + bottom, but header is fixed so we need full height
  STACK_PX: 30,
  TAB_CLEARANCE_PX: 26,
  FOOTER_HEIGHT: 80, // py-2 = 8px top + bottom, but fixed footer
  FOOTER_GAP_PX: 10,
};

// Hook for active section tracking
export function useActiveSection(sectionIds, options = {}) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] ?? "");

  useEffect(() => {
    if (!sectionIds?.length) return;

    const {
      root = null,
      // This makes "active" switch when a section crosses around the upper-middle of the viewport
      rootMargin = "-35% 0px -55% 0px",
      threshold = 0.01,
    } = options;

    const observer = new IntersectionObserver((entries) => {
      // pick the entry that is intersecting and most visible
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));

      if (visible[0]?.target?.id) {
        setActiveId(visible[0].target.id);
      }
    }, { root, rootMargin, threshold });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, options]);

  return activeId;
}

// Fixed left sidebar tab rail
export function SideTabRail({ items, activeId, topOffset = 120 }) {
  return (
    <div
      className="fixed left-6 z-50 flex flex-col gap-3"
      style={{ top: topOffset }}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <a key={item.id} href={`#${item.id}`} className="pointer-events-auto">
            <div
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition",
                isActive
                  ? "border-emerald-400/40 bg-[#0f172a]/95 text-white"
                  : "border-white/15 bg-[#0f172a]/80 text-zinc-200 hover:border-white/25",
              ].join(" ")}
            >
              <span>{item.tab}</span>
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-emerald-300" : "bg-white/25",
                ].join(" ")}
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}

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

// Clean sticky folder card (no stacking)
export function StickyFolderCard({
  id,
  index,
  total,
  progress,
  footerHeight,
  children,
}) {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const scale = useTransform(progress, [rangeStart, rangeEnd], [0.985, 1]);
  const opacity = useTransform(
    progress,
    [rangeStart - 0.05, rangeStart, rangeEnd],
    [0, 1, 1]
  );

  const viewportHeight = `calc(100vh - ${
    TAB_LAYOUT_CONSTANTS.NAV_OFFSET +
    footerHeight +
    TAB_LAYOUT_CONSTANTS.FOOTER_GAP_PX
  }px)`;

  // Later sections should render ABOVE earlier ones (so they cover them)
  const zIndex = 10 + index; // keep below SideTabRail (z-50)

  return (
    <div
      className="sticky top-0 w-full"
      style={{
        top: TAB_LAYOUT_CONSTANTS.NAV_OFFSET,
        height: viewportHeight,
        zIndex,
      }}
    >
      {/* This is the "screen" that hides anything behind */}
      <div className="absolute inset-0 bg-[#070a14]/95 backdrop-blur-md" />

      {/* Optional: subtle vignette / glow so it feels premium */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, rgba(124,58,237,0.10) 0%, transparent 55%), radial-gradient(circle at 70% 60%, rgba(6,182,212,0.08) 0%, transparent 55%)",
        }}
      />

      {/* Content layer */}
      <div className="relative h-full flex items-center justify-center">
        <motion.section
          id={id}
          style={{ scale, opacity }}
          className="relative w-[min(1100px,92vw)] rounded-2xl border border-white/10 bg-[#0b1020]/92 backdrop-blur-md shadow-[0_18px_55px_rgba(0,0,0,0.45)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />

          <div className="px-6 py-10 md:px-10">{children}</div>

          <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/10 to-transparent" />
        </motion.section>
      </div>
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
