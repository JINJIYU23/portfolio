import { useEffect, useRef, type CSSProperties } from "react";
import Jeongjoo from "../assets/images/jeongjoo.png";
import Aurora from "../components/Aurora";
import TextType from "../components/TextType";
import Main from "../components/Main";
import Nav from "../components/Nav";
import useReducedMotion from "../hooks/useReducedMotion";

const GREETINGS = ["Hello, World!", "안녕하세요! 프론트엔드 개발자 정지유입니다."];

// Hero: centred atmospheric marquee · WebGL aurora + cursor spotlight · typed display line.
// Scroll: ghost wordmark (0.45×) and mascot (0.18×) parallax; a lanyard thread grows from the mascot's feet toward About.
export default function Layout() {
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduceMotion) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.offsetHeight;
      const y = Math.min(window.scrollY, h);
      el.style.setProperty("--scroll", `${y}px`);
      el.style.setProperty("--progress", `${Math.min(1, y / (h * 0.6))}`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.removeProperty("--scroll");
      el.style.removeProperty("--progress");
    };
  }, [reduceMotion]);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <>
      <div className="hm-canvas" aria-hidden="true" />
      <div className="hm-grain" aria-hidden="true" />
      <div className="hm-page" id="top">
        <Nav />

        <header className="hero" ref={heroRef} onMouseMove={handleMove}>
          <div className="hero__aurora" aria-hidden="true">
            {!reduceMotion && (
              <Aurora
                colorStops={["#fc5185", "#3fc1c9", "#364f6b"]}
                blend={0.5}
                amplitude={0.5}
                speed={0.8}
              />
            )}
          </div>
          <div className="hero__spotlight" aria-hidden="true" />

          <div className="hm-wrap hero__inner">
            <p className="eyebrow hero__eyebrow hm-reveal" style={{ "--i": 0 } as CSSProperties}>
              Frontend Developer · Portfolio
            </p>
            <div className="hero__stage">
              <span className="hero__ghost hm-reveal" aria-hidden="true">
                JIYU
              </span>
              <img
                className="hero__mascot hm-reveal"
                style={{ "--i": 0 } as CSSProperties}
                src={Jeongjoo}
                alt="정지유의 마스코트 정주"
                width={480}
                height={533}
                fetchPriority="high"
              />
              <span className="hero__thread" aria-hidden="true" />
            </div>
            <h1 className="hero__title hm-reveal" style={{ "--i": 1 } as CSSProperties}>
              {reduceMotion ? (
                GREETINGS[1]
              ) : (
                <TextType
                  as="span"
                  text={GREETINGS}
                  typingSpeed={90}
                  deletingSpeed={35}
                  pauseDuration={2600}
                  textColors={["var(--color-bloom-2)", "var(--color-ink)"]}
                  showCursor
                  cursorCharacter="|"
                />
              )}
            </h1>
            <div className="hero__actions hm-reveal" style={{ "--i": 3 } as CSSProperties}>
              <a className="cta-fill" href="#projects">
                프로젝트 보기 ↓
              </a>
              <a
                className="cta-outline"
                href="https://github.com/JINJIYU23"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </header>

        <Main />
      </div>
    </>
  );
}
