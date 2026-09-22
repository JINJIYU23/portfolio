import SectionLayout from "../layout/SectionLayout";
import Figma from "../assets/images/figma.png";
import Git from "../assets/images/git.png";
import Github from "../assets/images/github.png";
import Js from "../assets/images/js.png";
import Next from "../assets/images/next.png";
import ReactImg from "../assets/images/react.png";
import Slack from "../assets/images/slack.png";
import Supabase from "../assets/images/supabase.png";
import Tailwind from "../assets/images/tailwind.png";
import Tanstack from "../assets/images/tanstack.png";
import Ts from "../assets/images/ts.png";
import Vite from "../assets/images/vite.png";
import Zustand from "../assets/images/zustand.png";

const skills = [
  { src: Js, alt: "JavaScript" },
  { src: Ts, alt: "TypeScript" },
  { src: ReactImg, alt: "React" },
  { src: Next, alt: "Next.js" },
  { src: Tailwind, alt: "Tailwind CSS" },
  { src: Vite, alt: "Vite" },
  { src: Zustand, alt: "Zustand" },
  { src: Tanstack, alt: "TanStack Query" },
  { src: Supabase, alt: "Supabase" },
  { src: Git, alt: "Git" },
  { src: Github, alt: "GitHub" },
  { src: Figma, alt: "Figma" },
  { src: Slack, alt: "Slack" },
];

// Hallmark · skills: inline chips with visible labels (no hover-only tooltips, no icon-tile grid)
export default function Skills() {
  return (
    <SectionLayout id="skills" title="Skills / Tools" tight>
      <ul className="skills">
        {skills.map((skill) => (
          <li key={skill.alt}>
            <img src={skill.src} alt="" width={24} height={24} loading="lazy" />
            {skill.alt}
          </li>
        ))}
      </ul>
    </SectionLayout>
  );
}
