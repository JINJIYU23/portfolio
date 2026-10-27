import { useEffect, useRef } from "react";
import type { ProjectItem } from "../types/projectType";

// kind에 따라 상세 모달의 항목명이 달라진다.
// work: 서비스 소개 / 핵심 성과 / 담당 업무 · project: 프로젝트 소개 / 역할 / 배운 점 / 페이지별 구현 결과
const LABELS = {
  work: { intro: "서비스 소개", role: "담당 업무", highlights: "핵심 성과" },
  project: { intro: "프로젝트 소개", role: "역할", highlights: "핵심 성과" },
} as const;

// Hallmark · case-study dialog: native <dialog> (focus trap, Esc, ::backdrop for free)
export default function Detail({
  project,
  onClose,
}: {
  project: ProjectItem | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  if (!project) return <dialog ref={ref} className="case" onClose={onClose} />;

  const isWork = project.kind === "work";
  const labels = LABELS[project.kind];
  const Icon = project.icon;

  return (
    <dialog
      ref={ref}
      className="case"
      data-lenis-prevent
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="case__inner">
        <div className="case__top">
          {project.logo ? (
            <img className="pgrid__thumb" src={project.logo} alt="" width={56} height={56} />
          ) : (
            <span
              className="pgrid__thumb pgrid__thumb--icon"
              style={{ color: project.textColor }}
              aria-hidden="true"
            >
              <Icon size={28} />
            </span>
          )}
          <button type="button" className="case__close" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </div>

        <h2 id="case-title" className="case__title">
          {project.title}
        </h2>
        {project.info && <p className="case__lede">{project.info}</p>}

        <dl className="case__meta">
          {isWork && project.company && (
            <>
              <dt>회사</dt>
              <dd>{project.company}</dd>
            </>
          )}
          {isWork && project.position && (
            <>
              <dt>직무</dt>
              <dd>{project.position}</dd>
            </>
          )}
          {project.date && (
            <>
              <dt>기간</dt>
              <dd>{project.date}</dd>
            </>
          )}
          <dt>기술</dt>
          <dd>{project.tech.join(", ")}</dd>
          {project.github && (
            <>
              <dt>GitHub</dt>
              <dd>
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  저장소 열기 ↗
                </a>
              </dd>
            </>
          )}
          {project.url && (
            <>
              <dt>사이트</dt>
              <dd>
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.title} 바로가기 ↗
                </a>
              </dd>
            </>
          )}
        </dl>

        {project.infoDetail && project.infoDetail.length > 0 && (
          <section className="case__section">
            <h3>{labels.intro}</h3>
            <ul>
              {project.infoDetail.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </section>
        )}

        {project.highlights && project.highlights.length > 0 && (
          <section className="case__section">
            <h3>{labels.highlights}</h3>
            <ul>
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {project.role && project.role.length > 0 && (
          <section className="case__section">
            <h3>{labels.role}</h3>
            {project.role.map((roleItem, index) => (
              <div key={roleItem.title} className="case__role">
                <h4>
                  {index + 1}. {roleItem.title}
                </h4>
                <ul>
                  {roleItem.tasks.map((task, taskIndex) =>
                    task.name ? (
                      <li key={task.name}>
                        {task.name}
                        <ul>
                          {task.details.map((detail) => (
                            <li key={detail}>{detail}</li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      task.details.map((detail) => <li key={`${taskIndex}-${detail}`}>{detail}</li>)
                    )
                  )}
                </ul>
              </div>
            ))}
          </section>
        )}

        {project.review && project.review.length > 0 && (
          <section className="case__section">
            <h3>배운 점</h3>
            <ul>
              {project.review.map((review) => (
                <li key={review}>{review}</li>
              ))}
            </ul>
          </section>
        )}

        {project.result && project.result.length > 0 && (
          <section className="case__section">
            <h3>페이지별 구현 결과</h3>
            <ul className="case__shots">
              {project.result.map((shot) => (
                <li key={shot.title}>
                  <figure>
                    <figcaption>{shot.title}</figcaption>
                    <img src={shot.img} alt={`${project.title} · ${shot.title}`} loading="lazy" />
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </dialog>
  );
}
