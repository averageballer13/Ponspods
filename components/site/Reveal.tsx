"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Scroll-triggered entrance. Mirrors the Pons motion language:
 * blur + lift resolving over ~0.8s, staggered by index.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        filter: shown ? "blur(0px)" : "blur(8px)",
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .75s cubic-bezier(.22,1,.36,1) ${delay}ms, filter .75s ease ${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * Word-by-word blur reveal for headlines.
 * Use a newline inside `text` to force a line break.
 */
export function RevealWords({
  text,
  className = "",
  delay = 0,
  step = 55,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const tokens = text
    .split(/(\n)/)
    .flatMap((chunk) => (chunk === "\n" ? ["\n"] : chunk.split(" ").filter(Boolean)));
  let wordIndex = 0;
  return (
    <span className={className}>
      {tokens.map((t, i) => {
        if (t === "\n") return <br key={`br-${i}`} />;
        const d = delay + wordIndex * step;
        wordIndex += 1;
        return (
          <span
            key={`${t}-${i}`}
            className="animate-word-reveal mr-[0.26em] inline-block"
            style={{ animationDelay: `${d}ms` }}
          >
            {t}
          </span>
        );
      })}
    </span>
  );
}
