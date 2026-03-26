"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      gsap.set(dot, {
        x: mouseX,
        y: mouseY,
      });
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(ring, {
        x: ringX,
        y: ringY,
      });

      requestAnimationFrame(animateRing);
    };

    animateRing();

    const onMouseEnterLink = () => {
      gsap.to(ring, {
        scale: 1.8,
        borderColor: "#00ff87",
        backgroundColor: "rgba(0, 255, 135, 0.08)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(ring, {
        scale: 1,
        borderColor: "#00ff87",
        backgroundColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.1 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.1 });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const interactables = document.querySelectorAll("a, button, [data-cursor]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#00ff87",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          border: "1px solid #00ff87",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  );
}