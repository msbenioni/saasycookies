// src/utils/scrollToSection.js

export function scrollToDeckSection({
  containerEl,
  index,
  total,
  behavior = "smooth",
}) {
  if (!containerEl || total <= 0 || index < 0) return;

  const maxIndex = Math.max(1, total - 1);
  const clampedIndex = Math.min(total - 1, index);

  // Map section index to 0..1 over transitions
  const t = clampedIndex / maxIndex;

  const rect = containerEl.getBoundingClientRect();
  const startY = window.scrollY + rect.top;
  const endY = startY + containerEl.offsetHeight - window.innerHeight;

  const y = startY + (endY - startY) * t;

  window.scrollTo({ top: y, behavior });
}
