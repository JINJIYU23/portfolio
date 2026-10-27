import { useEffect, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

interface CountUpProps {
  /** Final value. */
  to: number;
  /** Start counting when this flips to true. */
  active: boolean;
  /** Digits after the decimal point. */
  decimals?: number;
  /** Minimum integer width, left-padded with zeros ("03"). */
  pad?: number;
  duration?: number;
  /** Start value. Defaults to 0, or `to - 60` for year-like numbers so they don't spin from zero. */
  from?: number;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Animates a number from `from` to `to` once `active` becomes true. Honors reduced motion. */
export default function CountUp({ to, active, decimals = 0, pad = 0, duration = 1400, from }: CountUpProps) {
  const reduce = useReducedMotion();
  const start = from ?? (to >= 1000 ? Math.max(0, to - 60) : 0);
  const [value, setValue] = useState(start);

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      setValue(start + (to - start) * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce, to, start, duration]);

  const [int, frac] = value.toFixed(decimals).split(".");
  const text = (pad ? int.padStart(pad, "0") : int) + (frac ? `.${frac}` : "");
  return <>{text}</>;
}

/** Splits text on numbers and animates each one. "2021.03" becomes two counters, keeping the leading zero in "03". */
export function CountUpText({ text, active }: { text: string; active: boolean }) {
  const parts = text.split(/(\d+(?:\.\d+)?)/);
  return (
    <>
      {parts.map((part, i) => {
        if (i % 2 === 0) return part;
        const [intPart, fracPart] = part.split(".");
        return (
          <CountUp
            key={i}
            to={Number(part)}
            decimals={fracPart ? fracPart.length : 0}
            pad={intPart.startsWith("0") ? intPart.length : 0}
            active={active}
          />
        );
      })}
    </>
  );
}
