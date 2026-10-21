import type { IconType } from "react-icons";
interface Task {
  name: string | null;
  details: string[];
}

interface Role {
  title: string;
  tasks: Task[];
}

interface Result {
  title: string;
  img: string;
}

export interface ProjectItem {
  /** "work": 실무 제품 · "project": 개인/팀 프로젝트. 카드 라벨과 상세 모달 항목명이 달라진다. */
  kind: "work" | "project";
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
  icon: IconType;
  date: string;
  tech: string[];
  /** 로고 이미지가 없으면 icon을 썸네일로 사용 */
  logo?: string;
  github?: string;
  url?: string;
  /** 실무 항목 전용 */
  company?: string;
  position?: string;
  info?: string;
  infoDetail?: string[];
  role?: Role[];
  /** 실무 항목 전용: 정량적·구조적 성과 요약 */
  highlights?: string[];
  review?: string[];
  result?: Result[];
}
