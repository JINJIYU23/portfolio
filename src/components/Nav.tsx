import useActiveSection from "../hooks/useActiveSection";

const LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "moments", label: "Moments" },
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
      <a className="nav-pill__cta" href="#contact" aria-current={active === "contact" ? "true" : undefined}>
        Contact
      </a>
    </nav>
  );
}
