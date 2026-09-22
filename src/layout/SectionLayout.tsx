import type { ReactNode } from "react";

interface SectionLayoutProps {
  id?: string;
  title?: string;
  lede?: string;
  tight?: boolean;
  children: ReactNode;
}

// Hallmark · section head: S2 Hanging — heading floats in negative space, no rule, no eyebrow
export default function SectionLayout({ id, title, lede, tight, children }: SectionLayoutProps) {
  return (
    <section id={id} className={`section hm-wrap${tight ? " section--tight" : ""}`}>
      {title && (
        <header className="head-hang">
          <h2>{title}</h2>
          {lede && <p>{lede}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
