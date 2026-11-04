import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "motion/react";
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

const DROP_FROM = -720; // starts well above the section, so it slides a long way down the hero thread
const DROP_DELAY = 0.25; // card lets go while the strap is still whipping down
const DROP_DURATION = 1.35;
const CATCH_AT = 0.52; // fraction of DROP_DURATION where the lanyard snaps taut (~0.7s of free fall)
/** Free fall accelerates past the rest point, then the strap yanks it back with decaying bounces. */
const dropKeyframes = [DROP_FROM, 48, -22, 12, -6, 2, 0];
const dropTimes = [0, CATCH_AT, 0.63, 0.74, 0.85, 0.94, 1];
const dropEase = [[0.6, 0, 1, 0.5], "easeOut", "easeIn", "easeOut", "easeIn", "easeOut"] as const;

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
  // True while the card is dropping or hanging. Set when the strap top rises past 30% of the viewport
  // with the card on screen; cleared again if the card leaves the screen before it has landed, so a
  // fast scroll past the section doesn't burn the drop while nobody's looking.
  const [dropped, setDropped] = useState(reduce);
  const [landed, setLanded] = useState(reduce);

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

  // Drop timeline. One set of motion values so the strap stretch, the card's fall and the jolt stay in sync.
  const strapRef = useRef<HTMLSpanElement>(null);
  const strapBase = useMotionValue(reduce ? 1 : 0); // strap whipping down from the hero thread
  const dropY = useMotionValue(reduce ? 0 : DROP_FROM);
  const dropOpacity = useMotionValue(reduce ? 1 : 0);
  const jolt = useMotionValue(0); // clip rattle on the catch, degrees
  const squash = useMotionValue(1); // stretch while falling, compress on the catch
  // Past its rest point the card pulls the strap with it, so the strap bottom stays on the clip.
  const strapScaleY = useTransform(() => {
    const over = Math.max(0, dropY.get());
    const h = strapRef.current?.offsetHeight || 192;
    return strapBase.get() * (1 + over / h);
  });

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
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight * 0.3 && r.bottom > 0) {
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

  // Re-arm: if the card scrolls fully out of view mid-drop, reset so it drops again when it comes back.
  useEffect(() => {
    if (reduce || !dropped || landed) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setDropped(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, dropped, landed]);

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

  // Runs the drop once. Free fall → the strap snaps taut (overshoot, stretch, rattle) → it settles and swings.
  useEffect(() => {
    if (!dropped || reduce) return;
    let cancelled = false;
    const controls = [
      animate(strapBase, [0, 1.12, 0.97, 1], { duration: 0.55, times: [0, 0.5, 0.8, 1], ease: [0.2, 0.9, 0.2, 1] }),
      animate(dropY, dropKeyframes, {
        delay: DROP_DELAY,
        duration: DROP_DURATION,
        times: dropTimes,
        ease: [...dropEase],
        onComplete: () => {
          if (!cancelled) setLanded(true);
        },
      }),
      animate(dropOpacity, [0, 1], { delay: DROP_DELAY, duration: 0.35, ease: "easeIn" }),
      animate(squash, [1, 1.05, 0.91, 1.03, 0.99, 1], {
        delay: DROP_DELAY,
        duration: DROP_DURATION,
        times: [0, CATCH_AT - 0.02, CATCH_AT + 0.04, CATCH_AT + 0.14, CATCH_AT + 0.26, 1],
        ease: ["easeIn", "easeOut", "easeOut", "easeInOut", "easeOut"],
      }),
      animate(jolt, [0, 0, -3, 2.4, -1.4, 0.6, 0], {
        delay: DROP_DELAY,
        duration: DROP_DURATION,
        times: [0, CATCH_AT, CATCH_AT + 0.04, CATCH_AT + 0.1, CATCH_AT + 0.17, CATCH_AT + 0.25, 1],
        ease: "easeOut",
      }),
    ];
    // Pendulum kick at the moment of the catch, so the whole thing swings after the jolt.
    const kick = window.setTimeout(() => {
      mx.set(0.9);
      window.setTimeout(() => mx.set(0), 160);
    }, (DROP_DELAY + CATCH_AT * DROP_DURATION) * 1000);
    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
      window.clearTimeout(kick);
      // Back to the held state for a replay (no-op after unmount).
      strapBase.set(0);
      dropY.set(DROP_FROM);
      dropOpacity.set(0);
      squash.set(1);
      jolt.set(0);
      mx.set(0);
    };
  }, [dropped, reduce, strapBase, dropY, dropOpacity, squash, jolt, mx]);

  return (
    <div className="idcard" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="idcard__hang" style={reduce ? undefined : { rotateZ }}>
        {/* The strap whips down first; once the card overshoots, the strap stretches with it and snaps back. */}
        <motion.span
          ref={strapRef}
          className="idcard__strap"
          aria-hidden="true"
          style={reduce ? undefined : { scaleY: strapScaleY }}
        />

        <motion.div
          className="idcard__drop"
          style={reduce ? undefined : { y: dropY, opacity: dropOpacity, scaleY: squash, rotateZ: jolt }}
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
