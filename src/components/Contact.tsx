import { useRef, useState } from "react";
import Nayo from "../assets/images/nayo.png";
import SectionLayout from "../layout/SectionLayout";
import Reveal from "./Reveal";

type CopyState = "idle" | "copied" | "error";

// Contact: full-height statement title, then the list. A single highlight band slides to whichever row is hovered.
export default function Contact() {
  const email = "dhkswksla22@gmail.com";
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<number | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [band, setBand] = useState<{ top: number; height: number } | null>(null);

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
    <SectionLayout
      id="contact"
      eyebrow="Contact"
      title="Let's build something"
      accent="together."
      className="section--contact"
    >
      <Reveal className="contact">
        <ul className="contact__list" ref={listRef} onMouseLeave={() => setBand(null)}>
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
      </Reveal>
    </SectionLayout>
  );
}
