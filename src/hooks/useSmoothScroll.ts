import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "./useReducedMotion";
import { setLenis } from "../lib/scrollStore";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling via Lenis, driven by GSAP's ticker so ScrollTrigger pins stay in sync.
 * Disabled when the OS asks for reduced motion.
 */
export default function useSmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ autoRaf: false, anchors: true, lerp: 0.1 });
    const onTick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    // ScrollTrigger only refreshes itself on load/resize. Web fonts and lazy images below the fold change the
    // page height after that, which would leave every pin start/end (and the Contact anchor target) stale.
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    document.fonts?.ready.then(refresh);
    const ro = new ResizeObserver(refresh);
    ro.observe(document.body);

    return () => {
      setLenis(null);
      ro.disconnect();
      cancelAnimationFrame(raf);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduce]);
}
