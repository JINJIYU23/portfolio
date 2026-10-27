import { useState } from "react";
import projectItems from "../data/project.ts";
import type { ProjectItem } from "../types/projectType.ts";
import Detail from "./Detail.tsx";
import ProjectCard from "./ProjectCard.tsx";
import SectionLayout from "../layout/SectionLayout";

// Work: horizontal accordion. One card open, the rest folded to vertical strips; hover/focus/tap opens a strip.
// Spotlight (cursor-follow glow) is kept on every panel.
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  return (
    <>
      <SectionLayout
        id="projects"
        title="Projects"
        lede="교육 과정과 개인적으로 진행한 팀·개인 프로젝트입니다."
      >
        <ul
          className="pgrid"
          style={{ listStyle: "none", margin: 0, padding: 0 }}
        >
          {projectItems.map((item: ProjectItem) => (
            <ProjectCard
              key={item.title}
              item={item}
              onOpen={setSelectedProject}
            />
          ))}
        </ul>
      </SectionLayout>

      <Detail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
