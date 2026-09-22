import SectionLayout from "../layout/SectionLayout";

interface Props {
  date: string;
  title: string;
  tag: string;
  details: string[];
}

// Hallmark · experience: date rail (tabular, muted) beside each entry. Body-level label, not a section eyebrow.
const ExperienceItem = ({ date, title, tag, details }: Props) => (
  <li className="xp__item">
    <p className="xp__date">{date}</p>
    <div>
      <h3 className="xp__title">
        {title}
        <span className="xp__tag">{tag}</span>
      </h3>
      <ul className="xp__list">
        {details.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  </li>
);

export default function Experience() {
  return (
    <SectionLayout id="experience" title="Education / Experience">
      <ol className="xp">
        <ExperienceItem
          date="2021.03 – 2025.02"
          title="삼육대학교"
          tag="인공지능융합학부"
          details={["졸업", "학점 4.03 / 4.5"]}
        />
        <ExperienceItem
          date="2023.04 – 2023.12"
          title="멋쟁이 사자처럼"
          tag="동아리"
          details={[
            "프론트엔드 수료",
            "프로그래밍 교육 이수 및 대학 연합 해커톤 참가",
          ]}
        />
        <ExperienceItem
          date="2024.01.23 – 2024.02.19"
          title="K-move 필리핀 해외연수"
          tag="해외 연수"
          details={[
            "프레젠테이션·토론 등 실습 중심 영어 수업",
            "비즈니스 영어(이메일, 회의 표현) 및 발음·억양 교정",
            "필리핀 문화 체험 및 문화 교류 활동",
            "매일 2시간 현지인 대화로 실전 회화 능력 강화",
          ]}
        />
        <ExperienceItem
          date="2025.02.29 – 2025.08.04"
          title="프로그래머스 프론트엔드 데브코스"
          tag="교육 이수"
          details={[
            "TypeScript, JavaScript, React, Vue.js, Next.js 등 주요 프론트엔드 기술을 체계적으로 학습",
            "기획부터 디자인, 개발, 배포까지 전 과정을 경험한 팀 프로젝트 3회 수행",
            "Github 기반 코드 리뷰로 팀원과 의견을 나누고 코드 품질 향상",
            "피어 리뷰를 통한 협업 역량과 커뮤니케이션 능력 강화",
            "프론트엔드 스터디 참여로 기술 이해도와 실력 향상",
          ]}
        />
      </ol>
    </SectionLayout>
  );
}
