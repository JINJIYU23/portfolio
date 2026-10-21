import type { ProjectItem } from "../types/projectType";
import SpotlightCard from "./SpotlightCard";

interface Props {
  item: ProjectItem;
  onOpen: (item: ProjectItem) => void;
}

// Hallmark · card: work 항목은 회사·직무 라벨과 "담당 업무 보기", project 항목은 "케이스 스터디 열기"
export default function ProjectCard({ item, onOpen }: Props) {
  const Icon = item.icon;
  const isWork = item.kind === "work";

  return (
    <li className="pgrid__item">
      <SpotlightCard className="pgrid__card" spotlightColor={item.bgColor}>
        <div className="pgrid__head">
          {item.logo ? (
            <img className="pgrid__thumb" src={item.logo} alt="" width={56} height={56} loading="lazy" />
          ) : (
            <span
              className="pgrid__thumb pgrid__thumb--icon"
              style={{ color: item.textColor }}
              aria-hidden="true"
            >
              <Icon size={28} />
            </span>
          )}
          {isWork && item.company && (
            <p className="pgrid__eyebrow">
              {item.company}
              {item.date && <span className="pgrid__eyebrow-date">{item.date}</span>}
            </p>
          )}
          <h3 className="pgrid__title">{item.title}</h3>
          <p className="pgrid__desc">{item.description}</p>
        </div>
        <ul className="pgrid__tech" aria-label="사용 기술">
          {item.tech.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="pgrid__actions">
          <button type="button" className="cta-outline" onClick={() => onOpen(item)}>
            {isWork ? "담당 업무 보기" : "케이스 스터디 열기"}
          </button>
          {item.url && (
            <a className="link-plain" href={item.url} target="_blank" rel="noopener noreferrer">
              사이트 ↗
            </a>
          )}
        </div>
      </SpotlightCard>
    </li>
  );
}
