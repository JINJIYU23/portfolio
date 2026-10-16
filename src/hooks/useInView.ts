import { useEffect, useRef, useState, type RefObject } from "react";

/** Becomes true once the element enters the viewport, then stays true. */
export default function useInView<T extends HTMLElement>(
  threshold = 0.2
): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
