"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function MouseOrbs() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(orb1Ref.current, {
        x: x - 300,
        y: y - 300,
        duration: 1.8,
        ease: "power3.out",
      });

      gsap.to(orb2Ref.current, {
        x: x - 250,
        y: y - 250,
        duration: 2.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {/* Orb 1 — green */}
      <div
        ref={orb1Ref}
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      {/* Orb 2 — cyan */}
      <div
        ref={orb2Ref}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(96,239,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}