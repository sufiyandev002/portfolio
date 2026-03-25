"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import dynamic from "next/dynamic";
import GlitchText from "@/components/hero/GlitchText";
import MouseOrbs from "@/components/hero/MouseOrbs";

const GridFloor = dynamic(
    () => import("@/components/three/GridFloor"),
    { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const line3Ref = useRef<HTMLDivElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            tl.fromTo(
                badgeRef.current,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }
            )
                .fromTo(
                    line1Ref.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
                    "-=0.3"
                )
                .fromTo(
                    line2Ref.current,
                    { opacity: 0, y: 60 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
                    "-=0.6"
                )
                .fromTo(
                    line3Ref.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(
                    subRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
                    "-=0.4"
                )
                .fromTo(
                    statsRef.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(
                    scrollRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: "power2.out" },
                    "-=0.2"
                );

            // Cinematic scroll exit
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            })
                .to(".hero-content", { y: -100, opacity: 0, ease: "none" })
                .to(overlayRef.current, { opacity: 1, ease: "none" }, 0)
                .to(sectionRef.current, { scale: 0.9, ease: "none" }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ transformOrigin: "center top", background: "#080808" }}
        >
            {/* Grid floor 3D background */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <GridFloor />
            </div>

            {/* Mouse orbs */}
            <MouseOrbs />

            {/* Scanline texture */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                    backgroundSize: "100% 4px",
                }}
            />

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "40%",
                    background:
                        "linear-gradient(to top, #080808 0%, transparent 100%)",
                }}
            />

            {/* Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "20%",
                    background:
                        "linear-gradient(to bottom, #080808 0%, transparent 100%)",
                }}
            />

            {/* Side fades */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, #080808 0%, transparent 20%, transparent 80%, #080808 100%)",
                }}
            />

            {/* Scroll exit overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: "#080808", opacity: 0 }}
            />

            {/* Main content */}
            <div className="hero-content relative z-30 w-full max-w-7xl mx-auto px-6 lg:px-16 pt-24">
                <div className="grid lg:grid-cols-[1fr_220px] gap-16 items-center">

                    {/* Left */}
                    <div>

                        {/* Badge */}
                        <div ref={badgeRef} className="mb-10 opacity-0">
                            <span
                                className="inline-flex items-center gap-3 font-mono text-xs tracking-widest uppercase"
                                style={{
                                    padding: "10px 20px",
                                    border: "1px solid rgba(0,255,135,0.2)",
                                    color: "#00ff87",
                                    background: "rgba(0,255,135,0.03)",
                                }}
                            >
                                <span
                                    style={{
                                        width: "6px",
                                        height: "6px",
                                        borderRadius: "50%",
                                        background: "#00ff87",
                                        boxShadow: "0 0 10px #00ff87",
                                        display: "inline-block",
                                    }}
                                />
                                Available for work &nbsp;·&nbsp; Lahore, Pakistan
                            </span>
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <h1
                                className="font-display font-bold leading-[0.92] tracking-[-0.04em]"
                                style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
                            >
                                <div ref={line1Ref} className="overflow-hidden opacity-0">
                                    <GlitchText
                                        text="Sufiyan"
                                        style={{ color: "#ededed", display: "block" }}
                                    />
                                </div>
                                <div ref={line2Ref} className="overflow-hidden opacity-0">
                                    <span
                                        style={{
                                            display: "block",
                                            background:
                                                "linear-gradient(135deg, #00ff87 30%, #60efff 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                        }}
                                    >
                                        Mirza
                                    </span>
                                </div>
                                <div
                                    ref={line3Ref}
                                    className="overflow-hidden opacity-0"
                                    style={{ marginTop: "0.8rem" }}
                                >
                                    <span
                                        className="font-light font-mono"
                                        style={{
                                            fontSize: "clamp(0.9rem, 2vw, 1.8rem)",
                                            color: "#6b7280",
                                            letterSpacing: "0.05em",
                                            display: "block",
                                        }}
                                    >
                                        Full Stack Developer &amp; AI Systems Builder
                                    </span>
                                </div>
                            </h1>
                        </div>

                        {/* Description */}
                        <div ref={subRef} className="mb-10 opacity-0">
                            <p
                                className="font-body leading-relaxed max-w-lg"
                                style={{
                                    color: "#6b7280",
                                    fontSize: "1.05rem",
                                    borderLeft: "2px solid rgba(0,255,135,0.3)",
                                    paddingLeft: "1.25rem",
                                }}
                            >
                                I build{" "}
                                <span style={{ color: "#ededed" }}>
                                    production-grade web systems
                                </span>{" "}
                                — Laravel backends, Python microservices, and AI pipelines
                                that actually ship.{" "}
                                <span
                                    style={{
                                        color: "#00ff87",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    Currently building Recrify.
                                </span>
                            </p>
                        </div>

                        {/* CTA */}
                        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 font-display font-semibold text-sm"
                                style={{
                                    padding: "14px 36px",
                                    background: "#00ff87",
                                    color: "#080808",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = "#60efff";
                                    (e.currentTarget as HTMLElement).style.boxShadow =
                                        "0 0 40px rgba(0,255,135,0.3)";
                                    (e.currentTarget as HTMLElement).style.transform =
                                        "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background = "#00ff87";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                    (e.currentTarget as HTMLElement).style.transform =
                                        "translateY(0)";
                                }}
                            >
                                View My Work
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>

                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 font-display font-medium text-sm"
                                style={{
                                    padding: "14px 36px",
                                    border: "1px solid #1a1a1a",
                                    color: "#ededed",
                                    transition: "all 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "#00ff87";
                                    (e.currentTarget as HTMLElement).style.color = "#00ff87";
                                    (e.currentTarget as HTMLElement).style.transform =
                                        "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                                    (e.currentTarget as HTMLElement).style.color = "#ededed";
                                    (e.currentTarget as HTMLElement).style.transform =
                                        "translateY(0)";
                                }}
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>

                    {/* Right — Stats */}
                    <div ref={statsRef} className="hidden lg:flex flex-col gap-0 opacity-0">
                        {[
                            { number: "3+", label: "Years\nExperience" },
                            { number: "20+", label: "Projects\nDelivered" },
                            { number: "02", label: "AI Systems\nBuilt" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "28px 24px",
                                    borderTop: "1px solid #1a1a1a",
                                    borderLeft: "1px solid #1a1a1a",
                                }}
                            >
                                <div
                                    className="font-display font-bold"
                                    style={{
                                        fontSize: "3rem",
                                        lineHeight: 1,
                                        background: "linear-gradient(135deg, #00ff87, #60efff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {stat.number}
                                </div>
                                <div
                                    className="font-mono text-xs mt-2"
                                    style={{
                                        color: "#6b7280",
                                        whiteSpace: "pre-line",
                                        lineHeight: 1.6,
                                        letterSpacing: "0.05em",
                                    }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                className="absolute opacity-0"
                style={{
                    bottom: "2.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "#6b7280", letterSpacing: "0.2em" }}
                    >
                        Scroll
                    </span>
                    <div
                        style={{
                            width: "1px",
                            height: "60px",
                            background: "linear-gradient(to bottom, #00ff87, transparent)",
                            boxShadow: "0 0 8px rgba(0,255,135,0.5)",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}