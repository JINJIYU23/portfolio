import { useEffect, useRef } from "react";
import SectionLayout from "../layout/SectionLayout";
import useInView from "../hooks/useInView";
import useReducedMotion from "../hooks/useReducedMotion";
import CountUp, { CountUpText } from "./CountUp";

interface Entry {
  year: number;
  date: string;
  title: string;
  tag: string;
  details: string[];
}

const ENTRIES: Entry[] = [
  {
    year: 2021,
    date: "2021.03 – 2025.02",
    title: "삼육대학교",
    tag: "인공지능융합학부",
    details: ["졸업", "학점 4.03 / 4.5"],
  },
  {
    year: 2023,
    date: "2023.04 – 2023.12",
    title: "멋쟁이 사자처럼",
    tag: "동아리",
    details: ["프론트엔드 수료", "프로그래밍 교육 이수 및 대학 연합 해커톤 참가"],
  },
  {
    year: 2024,
    date: "2024.01.23 – 2024.02.19",
    title: "K-move 필리핀 해외연수",
    tag: "해외 연수",
    details: [
      "프레젠테이션·토론 등 실습 중심 영어 수업",
      "비즈니스 영어(이메일, 회의 표현) 및 발음·억양 교정",
      "필리핀 문화 체험 및 문화 교류 활동",
      "매일 2시간 현지인 대화로 실전 회화 능력 강화",
    ],
  },
  {
    year: 2025,
    date: "2025.02.29 – 2025.08.04",
    title: "프로그래머스 프론트엔드 데브코스",
    tag: "교육 이수",
    details: [
      "TypeScript, JavaScript, React, Vue.js, Next.js 등 주요 프론트엔드 기술을 체계적으로 학습",
      "기획부터 디자인, 개발, 배포까지 전 과정을 경험한 팀 프로젝트 3회 수행",
      "Github 기반 코드 리뷰로 팀원과 의견을 나누고 코드 품질 향상",
      "피어 리뷰를 통한 협업 역량과 커뮤니케이션 능력 강화",
      "프론트엔드 스터디 참여로 기술 이해도와 실력 향상",
    ],
  },
  {
    year: 2025,
    date: "2025.09 – 재직중",
    title: "바이언스 (VIENCE)",
    tag: "연구개발 프론트엔드 개발자 · 정규직",
    details: [
      "병리 이미지 AI 분석 플랫폼(VIENCE PATHO VIEWER)의 QC Dashboard, Worksheet, AI Assistant 모듈 단독 기획·설계·개발",
      "onnxruntime-web 브라우저 추론 파이프라인 구축·운영 후 서버 추론 전환 주도",
      "노코드 분석 플랫폼(VIENCE CANVAS)의 Vega-Lite 차트 에디터와 OpenCV.js 이미지 분석 모듈 개발",
      "화면 구조와 API 계약을 직접 설계한 뒤 구현 초안을 Claude Code에 위임하는 방식으로 개발 속도 향상",
    ],
  },
];

// Timeline: centre spine, big year per entry, cards alternate left/right and reveal one by one. Numbers count up.
function TimelineItem({ entry, side }: { entry: Entry; side: "left" | "right" }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.3);
  return (
    <li className={`tl__item tl__item--${side}${inView ? " is-in" : ""}`} ref={ref}>
      <p className="tl__year" aria-hidden="true">
        <CountUp to={entry.year} active={inView} />
      </p>
      <span className="tl__dot" aria-hidden="true" />
      <article className="tl__card">
        <p className="tl__date">
          <CountUpText text={entry.date} active={inView} />
        </p>
        <h3 className="tl__title">
          {entry.title}
          <span className="xp__tag">{entry.tag}</span>
        </h3>
        <ul className="xp__list">
          {entry.details.map((d) => (
            <li key={d}>
              <CountUpText text={d} active={inView} />
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}

// The spine is the lanyard strap continuing down from the hero thread. It is drawn as you scroll:
// its tip tracks a line 60% down the viewport, so it never runs ahead of what you've read.
// --spine (0..1) is set on the section; the ID card in About hangs off its end.
export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el || reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight * 0.6 - r.top) / r.height;
      el.style.setProperty("--spine", `${Math.min(1, Math.max(0, p))}`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      el.style.removeProperty("--spine");
    };
  }, [reduce]);

  return (
    <SectionLayout
      id="experience"
      eyebrow="Experience"
      title="Education &"
      accent="experience."
      className="section--experience"
    >
      <div className="xp-spine" ref={ref} aria-hidden="true" />
      <ol className="tl">
        {ENTRIES.map((e, i) => (
          <TimelineItem key={e.title} entry={e} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </ol>
    </SectionLayout>
  );
}
