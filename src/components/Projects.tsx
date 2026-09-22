import { useState } from "react";
import projectItems from "../data/project.ts";
import type { ProjectItem } from "../types/projectType.ts";
import Detail from "./Detail.tsx";
import SpotlightCard from "./SpotlightCard.tsx";
import SectionLayout from "../layout/SectionLayout";

// Hallmark · Portfolio Grid body: 2-column grid, all cards equal size
export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  return (
    <>
      <SectionLayout id="projects" title="Projects">
        <ul className="pgrid" style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {projectItems.map((item: ProjectItem) => (
            <li className="pgrid__item" key={item.title}>
              <SpotlightCard className="pgrid__card" spotlightColor={item.bgColor}>
              <div className="pgrid__head">
                <img
                  className="pgrid__thumb"
                  src={item.logo}
                  alt=""
                  width={56}
                  height={56}
                  loading="lazy"
                />
                <h3 className="pgrid__title">{item.title}</h3>
                <p className="pgrid__desc">{item.description}</p>
              </div>
              <ul className="pgrid__tech" aria-label="사용 기술">
                {item.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="pgrid__actions">
                <button
                  type="button"
                  className="cta-outline"
                  onClick={() => setSelectedProject(item)}
                >
                  케이스 스터디 열기
                </button>
                <a
                  className="link-plain"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  사이트 ↗
                </a>
              </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </SectionLayout>

      <Detail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
