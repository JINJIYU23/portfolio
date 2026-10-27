import type { ReactNode } from "react";
import Reveal from "../components/Reveal";

interface SectionLayoutProps {
  id?: string;
  /** Small monospace label above the title, e.g. "ABOUT". */
  eyebrow?: string;
  /** Bold display part of the title. */
  title?: string;
  /** Italic serif tail of the title, e.g. "built." */
  accent?: string;
  lede?: string;
  tight?: boolean;
  /** Left-align the header instead of centring it. */
  align?: "center" | "start";
  className?: string;
  children: ReactNode;
}

// Section head: mono eyebrow · bold display title · italic serif accent. Header lifts in on scroll.
export default function SectionLayout({
  id,
  eyebrow,
  title,
  accent,
  lede,
  tight,
  align = "center",
  className = "",
  children,
}: SectionLayoutProps) {
  return (
    <section
      id={id}
      className={`section hm-wrap${tight ? " section--tight" : ""}${className ? ` ${className}` : ""}`}
    >
      {title && (
        <Reveal as="header" className={`head-hang${align === "start" ? " head-hang--start" : ""}`}>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2>
            {title}
            {accent && (
              <>
                {" "}
                <em className="head-accent">{accent}</em>
              </>
            )}
          </h2>
          {lede && <p className="head-lede">{lede}</p>}
        </Reveal>
      )}
      {children}
    </section>
  );
}
