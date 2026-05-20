"use client";

import { useRef, useEffect, useState } from "react";

type Tag = "div" | "section" | "aside" | "p";

interface Props {
  children: React.ReactNode;
  as?: Tag;
  stagger?: boolean;
  delay?: number;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export default function AnimateIn({
  children,
  as: Tag = "div",
  stagger = false,
  delay,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${stagger ? "stagger-in" : "animate-in"} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? ({ "--animate-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
