import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nayo from "../assets/images/nayo.png";
import SectionLayout from "../layout/SectionLayout";
import useReducedMotion from "../hooks/useReducedMotion";
import { setContactEnd } from "../lib/scrollStore";

gsap.registerPlugin(ScrollTrigger);

type CopyState = "idle" | "copied" | "error";

/**
 * Contact. The stage pins for 1.5 viewports of scroll: it opens on "So far / and counting." (the hand-off from the
 * sections above), then that line lifts away (20–40%), "Let's build something together." rises in after it (45–70%) and the
 * contact list follows (55–80%); the rest of the pin holds the finished state. Nav's Contact link lands at the end of the pin.
 * Reduced motion: no pin, only the finished state.
 */
export default function Contact() {
  const email = "dhkswksla22@gmail.com";
  const reduce = useReducedMotion();
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);
  const [band, setBand] = useState<{ top: number; height: number } | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const aRef = useRef<HTMLDivElement>(null);
  const bRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (reduce) return;
    const stage = stageRef.current;
    const a = aRef.current;
    const b = bRef.current;
    const body = bodyRef.current;
    if (!stage || !a || !b || !body) return;

    const ctx = gsap.context(() => {
      gsap.set(b, { opacity: 0, y: 40 });
      gsap.set(body, { opacity: 0, y: 24 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1, // eases toward the scroll position over ~1s instead of snapping to it
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => setContactEnd(self.end),
        },
      });
      // Timeline duration 1 == pin progress 0..1. Sequential, not a crossfade: A has fully left (20–40%) before
      // B rises in (45–70%), then the list follows (55–80%), so the two titles never sit on top of each other.
      tl.to(a, { opacity: 0, y: -40, duration: 0.2, ease: "power1.in" }, 0.2)
        .to(b, { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" }, 0.45)
        .to(body, { opacity: 1, y: 0, duration: 0.25, ease: "power1.out" }, 0.55)
        .to({}, { duration: 0.2 }, 0.8);
      if (tl.scrollTrigger) setContactEnd(tl.scrollTrigger.end);
    }, stage);

    return () => {
      ctx.revert();
      setContactEnd(null);
    };
  }, [reduce]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setState("idle"), 2500);
  };

  const moveBand = (e: React.MouseEvent<HTMLLIElement>) => {
    const row = e.currentTarget;
    setBand({ top: row.offsetTop, height: row.offsetHeight });
  };

  const hint =
    state === "copied" ? "✓ 복사됨" : state === "error" ? "복사 실패. 직접 입력해 주세요" : "클릭해서 복사";

  return (
    <SectionLayout id="contact" className="section--contact">
      <div className="contact-stage" ref={stageRef}>
        <header className="head-hang contact-head">
          {!reduce && (
            <div className="contact-head__a" ref={aRef} aria-hidden="true">
              <p className="eyebrow">So far</p>
              <p className="contact-head__title">
                and <em className="head-accent">counting.</em>
              </p>
            </div>
          )}
          <div className="contact-head__b" ref={bRef}>
            <p className="eyebrow">Next · Your team?</p>
            <h2>
              Let's build
              <br />
              something <em className="head-accent">together.</em>
            </h2>
            <p className="head-lede">다음 줄은 함께 쓰고 싶어요.</p>
          </div>
        </header>

        <div className="contact" ref={bodyRef}>
          <ul className="contact__list" onMouseLeave={() => setBand(null)}>
            <span
              className="contact__band"
              aria-hidden="true"
              style={band ? { top: band.top, height: band.height, opacity: 1 } : undefined}
            />
            <li className="contact__row" onMouseEnter={moveBand}>
              <span className="contact__label">Email</span>
              <span className="copy-wrap" data-state={state === "idle" ? undefined : state}>
                <button type="button" className="copy-btn" onClick={handleCopyEmail}>
                  {email}
                </button>
                <span className="copy-btn__hint" aria-live="polite">
                  {hint}
                </span>
              </span>
            </li>
            <li className="contact__row" onMouseEnter={moveBand}>
              <span className="contact__label">Phone</span>
              <a className="contact__value" href="tel:01030137923">
                010-3013-7923
              </a>
            </li>
            <li className="contact__row" onMouseEnter={moveBand}>
              <span className="contact__label">GitHub</span>
              <a
                className="contact__value"
                href="https://github.com/JINJIYU23"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/JINJIYU23
              </a>
            </li>
            <li className="contact__row" onMouseEnter={moveBand}>
              <span className="contact__label">Notion</span>
              <a
                className="contact__value"
                href="https://flint-megaraptor-562.notion.site/1480d2b6eed180b9a46ded03bd59370d?pvs=74"
                target="_blank"
                rel="noopener noreferrer"
              >
                포트폴리오 바로가기
              </a>
            </li>
          </ul>
          <figure className="contact__figure">
            <img src={Nayo} alt="마스코트 나요" width={569} height={560} loading="lazy" />
          </figure>
        </div>
      </div>
    </SectionLayout>
  );
}
