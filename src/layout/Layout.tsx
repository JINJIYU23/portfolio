import { useEffect, useRef, useState, type CSSProperties } from "react";
import Jeongjoo from "../assets/images/jeongjoo.png";
import Aurora from "../components/Aurora";
import TextType from "../components/TextType";
import Main from "../components/Main";
import Nav from "../components/Nav";

const GREETINGS = ["Hello, World!", "안녕하세요! 프론트엔드 개발자 정지유입니다."];

// Hallmark · hero: centred atmospheric marquee (genre-allowed) · canvas = WebGL aurora + HP3 cursor spotlight · typed display line
export default function Layout() {
  const heroRef = useRef<HTMLElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
            <img
              className="hero__mascot hm-reveal"
              style={{ "--i": 0 } as CSSProperties}
              src={Jeongjoo}
              alt="정지유의 마스코트 정주"
              width={480}
              height={533}
              fetchPriority="high"
            />
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
