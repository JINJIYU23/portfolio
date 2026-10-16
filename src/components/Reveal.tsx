import { type CSSProperties, type ElementType, type ReactNode } from "react";
import useInView from "../hooks/useInView";

interface RevealProps {
  as?: ElementType;
  className?: string;
  /** Stagger index; each step delays by 80 ms. */
  index?: number;
  threshold?: number;
  children: ReactNode;
  style?: CSSProperties;
}

/** Fades and lifts its content in the first time it scrolls into view. Pure CSS transition, see `.rv` in effects.css. */
export default function Reveal({ as: Tag = "div", className = "", index = 0, threshold = 0.15, children, style }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>(threshold);
  return (
    <Tag
      ref={ref}
      className={`rv${inView ? " is-in" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--rv-i": index, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
