import { useState } from "react";
import workItems from "../data/work";
import type { ProjectItem } from "../types/projectType";
import SectionLayout from "../layout/SectionLayout";
import Detail from "./Detail";
import ProjectCard from "./ProjectCard";

// 실무 제품 섹션. 교육 프로젝트와 분리해 회사에서 담당한 제품과 업무 범위를 보여준다.
export default function Work() {
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  return (
    <>
      <SectionLayout
        id="work"
        title="Work"
        lede="바이언스에서 연구개발 프론트엔드 개발자로 담당한 제품입니다. 모듈 단위로 기획·설계·개발을 맡았습니다."
      >
        <ul className="pgrid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {workItems.map((item) => (
            <ProjectCard key={item.title} item={item} onOpen={setSelected} />
          ))}
        </ul>
      </SectionLayout>

      <Detail project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
