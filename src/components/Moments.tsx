import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuGraduationCap, LuRocket, LuUsers, LuCode, LuLayers, LuArrowRight } from "react-icons/lu";
import SectionLayout from "../layout/SectionLayout";
import useInView from "../hooks/useInView";
import useReducedMotion from "../hooks/useReducedMotion";
import CountUp from "./CountUp";

gsap.registerPlugin(ScrollTrigger);

interface Moment {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  note: string;
  icon: ReactNode;
  /** Glow colour on icon hover. */
  glow: string;
}

// Numbers come from the rest of the page (학점, 프로젝트 수, 팀 프로젝트, 데브코스 기간, 기술 스택).
const MOMENTS: Moment[] = [
  { value: 4.03, decimals: 2, suffix: " / 4.5", label: "학부 학점", note: "삼육대학교 인공지능융합학부", icon: <LuGraduationCap />, glow: "oklch(80% 0.14 85)" },
  { value: 5, suffix: "", label: "배포한 프로젝트", note: "티태 · SomePick · TouchBase · Emoji · 고양이 테스트", icon: <LuRocket />, glow: "var(--color-accent)" },
  { value: 3, suffix: "", label: "팀 프로젝트", note: "기획부터 배포까지 전 과정 경험", icon: <LuUsers />, glow: "var(--color-bloom-2)" },
  { value: 6, suffix: "개월", label: "데브코스 수료", note: "프로그래머스 프론트엔드 데브코스", icon: <LuCode />, glow: "oklch(78% 0.14 145)" },
  { value: 13, suffix: "", label: "다루는 기술", note: "주기율표의 원소 수", icon: <LuLayers />, glow: "oklch(78% 0.12 300)" },
];

function MomentCard({ m }: { m: Moment }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.4);
  return (
    <li className="mo__card" ref={ref} style={{ "--glow": m.glow } as React.CSSProperties}>
      <span className="mo__icon" aria-hidden="true">
        {m.icon}
      </span>
      <p className="mo__num">
        <CountUp to={m.value} decimals={m.decimals ?? 0} active={inView} from={0} />
        {m.suffix && <span className="mo__suffix">{m.suffix}</span>}
      </p>
      <p className="mo__label">{m.label}</p>
      <p className="mo__note">{m.note}</p>
    </li>
  );
}

// Proud moments: the section pins and vertical scroll drives the cards sideways (GSAP ScrollTrigger).
// Falls back to a native horizontal scroller on narrow screens or with reduced motion.
export default function Moments() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || reduce) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 56rem)", () => {
      const distance = () => track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, [reduce]);

  return (
    <SectionLayout id="moments" eyebrow="Achievements" title="Proud" accent="moments." className="section--moments">
      <div className="mo" ref={sectionRef}>
        <ul className="mo__track" ref={trackRef}>
          {MOMENTS.map((m) => (
            <MomentCard key={m.label} m={m} />
          ))}
          <li className="mo__card mo__card--end">
            <p className="mo__end">
              and <em>counting.</em>
            </p>
            <a className="mo__arrow" href="#contact" aria-label="Contact로 이동">
              <LuArrowRight />
            </a>
          </li>
        </ul>
      </div>
    </SectionLayout>
  );
}
