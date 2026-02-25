import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { scrollToDeckSection } from "../../utils/scrollToSection";

// Media query hook for responsive behavior
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);

    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

// Constants for shared tab layout
export const TAB_LAYOUT_CONSTANTS = {
  NAV_OFFSET: 96, // Updated to match scroll-margin-top for consistent behavior
  STACK_PX: 30,
  TAB_CLEARANCE_PX: 26,
  FOOTER_HEIGHT: 80, // py-2 = 8px top + bottom, but fixed footer
  FOOTER_GAP_PX: 10,
};

// Shared section labels for consistency
export const PACIFIC_SECTION_LABELS = {
  HERO: "Discover Pacific",
  GAP: "Why It Matters",
  VISION: "A Better Way",
  IMPACT: "Your Impact",
  CTA: "Stand With Us",
};

export const SENSEAI_SECTION_LABELS = {
  HERO: "Think Clearly",
  PROBLEM: "Why It's Hard",
  SHIFT: "A Better Way",
  USECASES: "In Practice",
  CTA: "Begin",
};

// Hook for active section tracking from scroll progress
export function useActiveSectionFromProgress(scrollYProgress, sectionIds, total) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] ?? "");

  useEffect(() => {
    if (!scrollYProgress || !sectionIds?.length || !total) return;

    // Subscribe to progress changes
    const unsub = scrollYProgress.on("change", (p) => {
      // Clamp
      const progress = Math.max(0, Math.min(1, p));

      // Convert progress to index
      // Using a tiny epsilon prevents edge flicker at exact boundaries
      const eps = 1e-6;
      const idx = Math.min(total - 1, Math.floor((progress + eps) * total));

      const nextId = sectionIds[idx];
      if (nextId && nextId !== activeId) {
        setActiveId(nextId);
      }
    });

    return () => unsub();
  }, [scrollYProgress, sectionIds.join("|"), total, activeId]);

  return activeId;
}

// Mobile scroll layout component
export function MobileScrollLayout({ sections }) {
  return (
    <BackgroundPattern>
      {/* Normal vertical scroll */}
      <div className="mx-auto w-[min(1100px,92vw)] py-6 flex flex-col gap-6">
        {sections.map((s) => (
          <div
            key={s.id}
            id={s.id}
            className="rounded-2xl border border-white/10 bg-[#0b1020]/92 backdrop-blur-md shadow-[0_18px_55px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            <div className="px-5 py-6">{s.content}</div>
            <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/10 to-transparent" />
          </div>
        ))}
      </div>
    </BackgroundPattern>
  );
}

// Fixed left sidebar tab rail
export function SideTabRail({ items, activeId, topOffset = 120, containerRef }) {
  return (
    <div
      className="hidden md:fixed md:left-6 md:z-50 md:flex md:flex-col md:gap-3"
      style={{ top: topOffset }}
    >
      {items.map((item, idx) => {
        const isActive = item.id === activeId;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();

              // keep URL hash updating (optional but nice)
              window.history.replaceState(null, "", `#${item.id}`);

              scrollToDeckSection({
                containerEl: containerRef?.current,
                index: idx,
                total: items.length,
                behavior: "smooth",
              });
            }}
          >
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
  scrollable = true,
}) {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;
  const isFirstSection = index === 0;
  const isLastSection = index === total - 1;

  const scaleProgress = useTransform(progress, [rangeStart, rangeEnd], [0.985, 1]);
  const opacityProgress = useTransform(
    progress,
    [rangeStart - 0.05, rangeStart, rangeEnd],
    [0, 1, 1]
  );

  const scale = isFirstSection || isLastSection ? 1 : scaleProgress;
  const opacity = isFirstSection || isLastSection ? 1 : opacityProgress;

  const viewportHeight = `calc(100vh - ${
    TAB_LAYOUT_CONSTANTS.NAV_OFFSET +
    footerHeight +
    TAB_LAYOUT_CONSTANTS.FOOTER_GAP_PX
  }px)`;

  // Later sections should render ABOVE earlier ones (so they cover them)
  const zIndex = 10 + index; // keep below SideTabRail (z-50)

  return (
    <div
      id={id}
      className="sticky top-0 w-full"
      style={{
        top: TAB_LAYOUT_CONSTANTS.NAV_OFFSET,
        height: viewportHeight,
        zIndex,
        scrollMarginTop: TAB_LAYOUT_CONSTANTS.NAV_OFFSET,
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
          style={{ scale, opacity }}
          className="relative w-[min(1100px,92vw)] mx-auto h-[calc(100vh-96px-80px-10px)] flex flex-col justify-center py-12 px-6 md:px-10 rounded-[32px] bg-gradient-to-br from-zinc-900 via-zinc-800/95 to-zinc-900/95 border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] backdrop-blur-md overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-transparent to-cyan-400/5 rounded-[32px]" />

          <div className={`relative z-10 flex-1 ${scrollable ? 'overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent' : ''}`}>{children}</div>

          <div className="h-[2px] w-full bg-gradient-to-r from-emerald-400/30 via-cyan-400/10 to-transparent" />
        </motion.section>
      </div>
    </div>
  );
}

// Shared scroll deck layout component
export function ScrollDeckLayout({ sections, topOffset = 120 }) {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // md breakpoint

  // Keep hook order stable across mobile/desktop renders
  const { containerRef, scrollYProgress } = useScrollProgress();
  const ids = sections.map((s) => s.id);
  const activeId = useActiveSectionFromProgress(scrollYProgress, ids, sections.length);

  if (!isDesktop) {
    return <MobileScrollLayout sections={sections} />;
  }

  return (
    <BackgroundPattern>
      <SideTabRail items={sections} activeId={activeId} topOffset={topOffset} containerRef={containerRef} />

      <div className="relative" ref={containerRef}>
        <div className="flex flex-col">
          {sections.map((section, i) => (
            <StickyFolderCard
              key={section.id}
              id={section.id}
              index={i}
              total={sections.length}
              progress={scrollYProgress}
              footerHeight={TAB_LAYOUT_CONSTANTS.FOOTER_HEIGHT}
              scrollable={false}
            >
              {section.content}
            </StickyFolderCard>
          ))}
        </div>
      </div>
    </BackgroundPattern>
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
