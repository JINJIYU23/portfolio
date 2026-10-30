import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import useReducedMotion from "../hooks/useReducedMotion";
import "../styles/IdCard.css";

interface IdCardProps {
  imageSrc: string;
  altText: string;
  name: string;
  role: string;
  id: string;
  /** Lines shown on the back of the card. */
  checklist: string[];
}

const swing = { stiffness: 90, damping: 14, mass: 1.2 };
const clamp = (v: number, lim = 1) => Math.max(-lim, Math.min(lim, v));

/**
 * Employee badge hanging from a lanyard that continues the hero thread. The strap is always there;
 * the card drops down it once you've scrolled the strap top up to the top third of the screen, then swings on landing.
 * (In-view alone fires too early on tall screens, where About already peeks in on load.)
 * Then it swings toward the cursor, tilts with scroll velocity, and flips on hover (pointer devices)
 * or tap / Enter to reveal the checklist.
 */
export default function IdCard({ imageSrc, altText, name, role, id, checklist }: IdCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);
  const [hovering, setHovering] = useState(false);
  // Becomes true once (and stays) when the strap top rises past 30% of the viewport.
  const [dropped, setDropped] = useState(reduce);

  // Cursor offset from the card centre, -1..1
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  // Scroll velocity, -1..1
  const sv = useMotionValue(0);
  const sx = useSpring(mx, swing);
  const sy = useSpring(my, swing);
  const ss = useSpring(sv, { stiffness: 70, damping: 12, mass: 1 });
  const rotateZ = useTransform(sx, [-1, 1], [-9, 9]); // pendulum swing around the strap
  const leanX = useTransform(sy, [-1, 1], [6, -6]); // lean toward the cursor
  const scrollX = useTransform(ss, [-1, 1], [-14, 14]); // perspective tilt while scrolling
  const rotateX = useTransform(() => leanX.get() + scrollX.get());

  // Scroll → tilt. Decays back to 0 when scrolling stops.
  useEffect(() => {
    if (reduce) return;
    let last = window.scrollY;
    let timer = 0;
    const onScroll = () => {
      const y = window.scrollY;
      sv.set(clamp((y - last) / 40));
      last = y;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => sv.set(0), 90);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timer);
    };
  }, [reduce, sv]);

  useEffect(() => {
    if (dropped) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      if (el.getBoundingClientRect().top <= window.innerHeight * 0.3) {
        setDropped(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [dropped]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width * 1.2)));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height * 1.2)));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const showBack = flipped || hovering;

  // Landing kick: nudge the pendulum so the card swings once after it drops.
  const onLanded = () => {
    if (reduce) return;
    mx.set(0.9);
    window.setTimeout(() => mx.set(0), 160);
  };

  return (
    <div className="idcard" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="idcard__hang" style={reduce ? undefined : { rotateZ }}>
        {/* Tension: the strap whips down and overshoots, then the card falls on a heavy, under-damped spring. */}
        <motion.span
          className="idcard__strap"
          aria-hidden="true"
          initial={reduce ? false : { scaleY: 0 }}
          animate={reduce ? { scaleY: 1 } : { scaleY: dropped ? [0, 1.12, 0.97, 1] : 0 }}
          transition={{ duration: 0.55, times: [0, 0.5, 0.8, 1], ease: [0.2, 0.9, 0.2, 1] }}
        />

        <motion.div
          className="idcard__drop"
          initial={reduce ? false : { y: -420, opacity: 0 }}
          animate={dropped ? { y: 0, opacity: 1 } : { y: -420, opacity: 0 }}
          transition={{ type: "spring", stiffness: 58, damping: 7.5, mass: 1.4, delay: 0.3 }}
          onAnimationComplete={() => dropped && onLanded()}
        >
          <span className="idcard__clip" aria-hidden="true" />

          <motion.button
            type="button"
            className="idcard__card"
            style={reduce ? undefined : { rotateX }}
            onClick={() => setFlipped((f) => !f)}
            onMouseEnter={(e) => {
              // Hover-flip only for real pointers; touch goes through click.
              if (window.matchMedia("(hover: hover)").matches && e.buttons === 0) setHovering(true);
            }}
            onMouseLeave={() => setHovering(false)}
            aria-pressed={flipped}
            aria-label={showBack ? "사원증 앞면 보기" : "사원증 뒷면 보기"}
          >
            <motion.div
              className="idcard__faces"
              animate={{ rotateY: showBack ? 180 : 0 }}
              transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 170, damping: 20 }}
            >
              <div className="idcard__face idcard__front" aria-hidden={showBack}>
                <span className="idcard__hole" aria-hidden="true" />
                <p className="idcard__label">DEVELOPER ID</p>
                <img className="idcard__photo" src={imageSrc} alt={altText} width={300} height={300} />
                <p className="idcard__name">{name}</p>
                <p className="idcard__role">{role}</p>
                <span className="idcard__barcode" aria-hidden="true" />
                <p className="idcard__id">{id}</p>
              </div>
              <div className="idcard__face idcard__back" aria-hidden={!showBack}>
                <span className="idcard__hole" aria-hidden="true" />
                <p className="idcard__label">WHAT I AM</p>
                <ul className="idcard__list">
                  {checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="idcard__sign" aria-hidden="true">
                  {name}
                </p>
              </div>
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
