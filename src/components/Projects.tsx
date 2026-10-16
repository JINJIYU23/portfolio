import { useState } from "react";
import projectItems from "../data/project.ts";
import type { ProjectItem } from "../types/projectType.ts";
import Detail from "./Detail.tsx";
import Reveal from "./Reveal.tsx";
import SpotlightCard from "./SpotlightCard.tsx";
import SectionLayout from "../layout/SectionLayout";

// Work: horizontal accordion. One card open, the rest folded to vertical strips; hover/focus/tap opens a strip.
// Spotlight (cursor-follow glow) is kept on every panel.
export default function Projects() {
  const [open, setOpen] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <>
      <SectionLayout id="projects" eyebrow="Work" title="Things I've" accent="built.">
        <Reveal>
          <ul className="acc" role="list">
            {projectItems.map((item: ProjectItem, i) => {
              const isOpen = open === i;
              const num = String(i + 1).padStart(2, "0");
              return (
                <li
                  key={item.title}
                  className="acc__item"
                  data-open={isOpen || undefined}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                >
                  <SpotlightCard className="acc__panel" spotlightColor={item.bgColor}>
                    <button
                      type="button"
                      className="acc__strip"
                      aria-expanded={isOpen}
                      aria-controls={`acc-body-${i}`}
                      onClick={() => setOpen(i)}
                      tabIndex={isOpen ? -1 : 0}
                    >
                      <span className="acc__num">{num}</span>
                      <span className="acc__strip-title">{item.title}</span>
                      <img className="acc__strip-logo" src={item.logo} alt="" width={32} height={32} loading="lazy" />
                    </button>

                    <div className="acc__body" id={`acc-body-${i}`} aria-hidden={!isOpen}>
                      <div className="acc__text">
                        <p className="acc__meta">
                          <span className="acc__num">{num}</span>
                          <span className="acc__tag">{item.tech[0]} · {item.tech.length} tech</span>
                        </p>
                        <h3 className="acc__title">{item.title}</h3>
                        <p className="acc__desc">{item.info ?? item.description}</p>
                        {item.infoDetail && (
                          <ul className="acc__features">
                            {item.infoDetail.slice(0, 3).map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        )}
                        <ul className="pgrid__tech acc__tech" aria-label="사용 기술">
                          {item.tech.map((tech) => (
                            <li key={tech}>{tech}</li>
                          ))}
                        </ul>
                        <div className="pgrid__actions acc__actions">
                          <button
                            type="button"
                            className="cta-outline"
                            onClick={() => setSelectedProject(item)}
                            tabIndex={isOpen ? 0 : -1}
                          >
                            케이스 스터디 열기
                          </button>
                          <a className="link-plain" href={item.github} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                            GitHub ↗
                          </a>
                          <a className="link-plain" href={item.url} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                            사이트 ↗
                          </a>
                        </div>
                      </div>
                      <figure className="acc__art" style={{ "--art": item.textColor } as React.CSSProperties}>
                        <img src={item.logo} alt="" width={160} height={160} loading="lazy" />
                      </figure>
                    </div>
                  </SpotlightCard>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </SectionLayout>

      <Detail project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}
