import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useReducedMotion from "./useReducedMotion";

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
    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [reduce]);
}
