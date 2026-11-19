import type Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Tiny module-level store so the nav can hand off to Lenis and land past the Contact header transition.
let lenis: Lenis | null = null;
let contactEnd: number | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

/** Scroll position (px) where the Contact header has fully switched to its "Let's build…" state. */
export const setContactEnd = (y: number | null) => {
  contactEnd = y;
};

/**
 * Scrolls to the end of the Contact pin so the visitor arrives at the finished title, not the "and counting." lead-in.
 * Returns false when there is nothing to do (reduced motion: no Lenis, no pin) and the plain anchor jump should run.
 */
export function scrollToContact(): boolean {
  if (!lenis || contactEnd === null) return false;
  // Re-measure first (lazy images may have shifted the page), then correct any drift once we arrive.
  ScrollTrigger.refresh();
  const l = lenis;
  l.scrollTo(contactEnd as number, {
    onComplete: () => {
      ScrollTrigger.refresh();
      if (contactEnd !== null && Math.abs(window.scrollY - contactEnd) > 2) l.scrollTo(contactEnd, { immediate: true });
    },
  });
  return true;
}
