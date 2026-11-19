import useActiveSection from "../hooks/useActiveSection";
import { scrollToContact } from "../lib/scrollStore";

const LINKS = [
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
];
const IDS = LINKS.map((l) => l.id).concat("contact");

// Floating pill nav. Scroll spy: the link for the section in view gets the filled state.
export default function Nav() {
  const active = useActiveSection(IDS);
  return (
    <nav className="nav-pill" aria-label="주요 메뉴">
      <a className="nav-pill__wordmark" href="#top">
        JIYU
      </a>
      <ul className="nav-pill__links">
        {LINKS.map((l) => (
          <li key={l.id}>
            <a href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <a
        className="nav-pill__cta"
        href="#contact"
        aria-current={active === "contact" ? "true" : undefined}
        onClick={(e) => {
          // Land past the pinned title transition. stopPropagation keeps Lenis's own window-level anchor
          // handler from re-targeting the section top afterwards.
          if (scrollToContact()) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        Contact
      </a>
    </nav>
  );
}
