import { useId, useState } from "react";
import SectionLayout from "../layout/SectionLayout";
import Reveal from "./Reveal";
import Claude from "../assets/images/claude.svg";
import D3 from "../assets/images/d3.svg";
import Figma from "../assets/images/figma.svg";
import Git from "../assets/images/git.svg";
import Github from "../assets/images/github.svg";
import Js from "../assets/images/js.svg";
import Next from "../assets/images/next.svg";
import Onnx from "../assets/images/onnx.svg";
import OpenSeadragon from "../assets/images/openseadragon.svg";
import ReactImg from "../assets/images/react.svg";
import Supabase from "../assets/images/supabase.svg";
import Tailwind from "../assets/images/tailwind.svg";
import Tanstack from "../assets/images/tanstack.svg";
import Ts from "../assets/images/ts.svg";
import Vega from "../assets/images/vega.svg";
import Vite from "../assets/images/vite.svg";
import Vitest from "../assets/images/vitest.svg";
import WebGL from "../assets/images/webgl.svg";
import Zustand from "../assets/images/zustand.png";

type Group = "lang" | "front" | "data" | "back" | "tool";

interface Cell {
  symbol: string;
  name: string;
  src: string;
  group: Group;
  /** 1-based grid position in the 7×3 table. */
  col: number;
  row: number;
}

const GROUPS: { id: Group | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lang", label: "Languages" },
  { id: "front", label: "Frontend" },
  { id: "data", label: "Data / AI" },
  { id: "back", label: "Backend" },
  { id: "tool", label: "Tools" },
];

// Periodic-table layout: languages on the left edge, frontend across the top, tools along the middle row,
// backend on the right, and the Data / AI row (visualisation, deep zoom, in-browser inference) along the bottom.
const ELEMENTS: Cell[] = [
  { symbol: "Js", name: "JavaScript", src: Js, group: "lang", col: 1, row: 1 },
  { symbol: "Ts", name: "TypeScript", src: Ts, group: "lang", col: 1, row: 2 },
  { symbol: "Re", name: "React", src: ReactImg, group: "front", col: 2, row: 1 },
  { symbol: "Nx", name: "Next.js", src: Next, group: "front", col: 3, row: 1 },
  { symbol: "Tw", name: "Tailwind CSS", src: Tailwind, group: "front", col: 4, row: 1 },
  { symbol: "Vi", name: "Vite", src: Vite, group: "front", col: 5, row: 1 },
  { symbol: "Zu", name: "Zustand", src: Zustand, group: "front", col: 6, row: 1 },
  { symbol: "Tq", name: "TanStack Query", src: Tanstack, group: "front", col: 7, row: 1 },
  { symbol: "Sb", name: "Supabase", src: Supabase, group: "back", col: 7, row: 2 },
  { symbol: "Gi", name: "Git", src: Git, group: "tool", col: 2, row: 2 },
  { symbol: "Gh", name: "GitHub", src: Github, group: "tool", col: 3, row: 2 },
  { symbol: "Fg", name: "Figma", src: Figma, group: "tool", col: 4, row: 2 },
  { symbol: "Cc", name: "Claude Code", src: Claude, group: "tool", col: 5, row: 2 },
  { symbol: "Vt", name: "Vitest", src: Vitest, group: "tool", col: 6, row: 2 },
  { symbol: "D3", name: "D3", src: D3, group: "data", col: 2, row: 3 },
  { symbol: "Vg", name: "Vega-Lite", src: Vega, group: "data", col: 3, row: 3 },
  { symbol: "Os", name: "OpenSeadragon", src: OpenSeadragon, group: "data", col: 4, row: 3 },
  { symbol: "On", name: "ONNX Runtime", src: Onnx, group: "data", col: 5, row: 3 },
  { symbol: "Gl", name: "WebGL", src: WebGL, group: "data", col: 6, row: 3 },
];

const GROUP_LABEL: Record<Group, string> = {
  lang: "Language",
  front: "Frontend",
  data: "Data / AI",
  back: "Backend / BaaS",
  tool: "Tool",
};

// Hallmark · skills: periodic table. Hover/focus a cell → large logo in the side panel. Group filter dims the rest.
export default function Skills() {
  const [filter, setFilter] = useState<Group | "all">("all");
  const [active, setActive] = useState<Cell>(ELEMENTS[2]);
  const panelId = useId();

  return (
    <SectionLayout id="skills" eyebrow="Skills" title="The periodic table of my" accent="stack." tight>
      <Reveal>
      <div className="filter" role="group" aria-label="기술 분류 필터">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            type="button"
            className="filter__btn"
            aria-pressed={filter === g.id}
            onClick={() => setFilter(g.id)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="ptable">
        <ol className="ptable__grid" aria-describedby={panelId}>
          {ELEMENTS.map((el, i) => {
            const dim = filter !== "all" && el.group !== filter;
            return (
              <li
                key={el.symbol}
                className="ptable__cell"
                data-group={el.group}
                data-dim={dim || undefined}
                data-active={active.symbol === el.symbol || undefined}
                style={{ gridColumn: el.col, gridRow: el.row }}
              >
                <button
                  type="button"
                  className="ptable__btn"
                  onMouseEnter={() => setActive(el)}
                  onFocus={() => setActive(el)}
                  onClick={() => setActive(el)}
                  aria-label={el.name}
                >
                  <span className="ptable__num" aria-hidden="true">{i + 1}</span>
                  <span className="ptable__sym" aria-hidden="true">{el.symbol}</span>
                  <span className="ptable__name" aria-hidden="true">{el.name}</span>
                </button>
              </li>
            );
          })}
        </ol>

        <aside className="ptable__panel" id={panelId} aria-live="polite" data-group={active.group}>
          <img key={active.symbol} src={active.src} alt="" width={120} height={120} loading="lazy" />
          <p className="ptable__panel-sym" aria-hidden="true">{active.symbol}</p>
          <h3 className="ptable__panel-name">{active.name}</h3>
          <p className="ptable__panel-group">{GROUP_LABEL[active.group]}</p>
        </aside>
      </div>
      </Reveal>
    </SectionLayout>
  );
}
