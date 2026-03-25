"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface GlitchTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlitchText({ text, className, style }: GlitchTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = "!<>-_\\/[]{}—=+*^?#@$%&";
    let interval: NodeJS.Timeout;
    let iteration = 0;

    const glitch = () => {
      iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        el.innerText = text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (iteration >= text.length) {
          clearInterval(interval);
          el.innerText = text;
        }

        iteration += 0.5;
      }, 40);
    };

    // Run once on mount after delay
    const timeout = setTimeout(glitch, 800);

    // Run on hover
    el.addEventListener("mouseenter", glitch);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      el.removeEventListener("mouseenter", glitch);
    };
  }, [text]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        fontFamily: "var(--font-mono)",
        ...style,
      }}
    >
      {text}
    </span>
  );
}