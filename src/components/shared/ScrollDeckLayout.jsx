import { BackgroundPattern, SideTabRail, StickyFolderCard, useScrollProgress, TAB_LAYOUT_CONSTANTS, useActiveSection } from "./TabLayout";

export function ScrollDeckLayout({ sections, topOffset = 120 }) {
  const { containerRef, scrollYProgress } = useScrollProgress();
  const activeId = useActiveSection(sections.map((s) => s.id));

  return (
    <BackgroundPattern>
      <SideTabRail items={sections} activeId={activeId} topOffset={topOffset} />

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
            >
              {section.content}
            </StickyFolderCard>
          ))}
        </div>
      </div>
    </BackgroundPattern>
  );
}
