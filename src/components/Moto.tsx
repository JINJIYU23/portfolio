import SectionLayout from "../layout/SectionLayout";
import IdCard from "./IdCard";
import Reveal from "./Reveal";
import jjy from "../assets/images/jiyuyuyu.jpeg";

const WHAT_I_AM = [
  "아이디어를 화면에 그려내는 프론트엔드 개발자",
  "사용자를 위한 고민을 끝까지 포기하지 않는 사람",
  "빠른 변화에 민감하게, 유연하게 성장하는 사람",
  "코드 리뷰와 피어 리뷰로 함께 자라는 팀원",
];

// About: lanyard ID card left, Q&A right.
export default function Moto() {
  return (
    <SectionLayout id="about" eyebrow="About" title="Hi, I'm" accent="Jiyu.">
      <div className="about">
        <IdCard
          imageSrc={jjy}
          altText="정지유의 프로필 사진"
          name="정지유"
          role="Frontend Developer"
          id="JIYU · FE · 2025"
          checklist={WHAT_I_AM}
        />
        <Reveal className="about__body" index={1}>
          <h3 className="about__q">
            여러 개발 분야 중 프론트엔드를 선택하게 된 이유는 무엇인가요?
          </h3>
          <p className="about__a">
            학부 시절, 멋쟁이 사자처럼이라는 동아리에서 프론트엔드 분야를 처음
            접하게 되었습니다.{" "}
            <mark>내가 구상한 아이디어를 모니터 화면에 그려내는 개발자</mark>
            라니, 정말 매력적인 분야라고 생각이 들어 프론트엔드를 선택하게
            되었습니다.
          </p>

          <h3 className="about__q">
            앞으로 프론트엔드 개발자로서 어떤 개발자가 되고 싶나요?
          </h3>
          <p className="about__a">
            프론트엔드는 다른 개발 분야보다 더 빠르게 변화하는 기술이라고
            생각합니다. 저 역시도 그런 흐름을 맞춰가고자 끊임없이 공부하고
            도전했습니다. 하지만 그 과정에서 한 가지 변하지 않는 중요한 가치를
            발견했습니다. 바로{" "}
            <mark>‘사용자를 위한 고민을 끝까지 포기하지 않는 마음’</mark>
            입니다. 저는 앞으로 변화에 민감하게 반응하며 유연하게 성장해
            나가되, 이 가치를 소중히 여기는 개발자가 되고 싶습니다.
          </p>
          <blockquote className="about__quote">
            From the idea to the last pixel.
          </blockquote>
        </Reveal>
      </div>
    </SectionLayout>
  );
}
