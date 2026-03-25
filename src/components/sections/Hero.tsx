"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/three/ParticleField"), {
    ssr: false,
});

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const subRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const lineRef1 = useRef<HTMLSpanElement>(null);
    const lineRef2 = useRef<HTMLSpanElement>(null);
    const lineRef3 = useRef<HTMLSpanElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            tl.fromTo(
                badgeRef.current,
                { opacity: 0, x: -30 },
                { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }
            )
                .fromTo(
                    lineRef1.current,
                    { opacity: 0, y: 80, rotateX: 40 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
                    "-=0.3"
                )
                .fromTo(
                    lineRef2.current,
                    { opacity: 0, y: 80, rotateX: 40 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
                    "-=0.7"
                )
                .fromTo(
                    lineRef3.current,
                    { opacity: 0, y: 80, rotateX: 40 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 1, ease: "power4.out" },
                    "-=0.7"
                )
                .fromTo(
                    subRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(
                    ctaRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(
                    statsRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
                    "-=0.5"
                )
                .fromTo(
                    scrollRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: "power2.out" },
                    "-=0.3"
                );

            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                },
                opacity: 0,
                scale: 0.9,
                y: -80,
                ease: "none",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            <div className="absolute inset-0 z-0 w-full h-full">
                <ParticleField />
            </div>

            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px",
                }}
            />

            <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/70 via-transparent to-background/70 pointer-events-none" />

            <div
                className="absolute z-10 pointer-events-none"
                style={{
                    width: "600px",
                    height: "600px",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(0,255,135,0.04) 0%, transparent 70%)",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />

            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-center">

                    <div>
                        <div ref={badgeRef} className="mb-10 opacity-0">
                            <span className="inline-flex items-center gap-3 px-5 py-2.5 text-xs font-mono tracking-widest uppercase"
                                style={{
                                    border: "1px solid rgba(0,255,135,0.2)",
                                    borderRadius: "2px",
                                    background: "rgba(0,255,135,0.03)",
                                    color: "#00ff87",
                                }}>
                                <span style={{
                                    width: "6px",
                                    height: "6px",
                                    borderRadius: "50%",
                                    background: "#00ff87",
                                    boxShadow: "0 0 8px #00ff87",
                                    display: "inline-block",
                                    animation: "pulse 2s infinite",
                                }} />
                                Available for work · Lahore, Pakistan
                            </span>
                        </div>

                        <div className="mb-8" style={{ perspective: "1000px" }}>
                            <h1 className="font-display font-bold leading-[0.95] tracking-[-0.03em]"
                                style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}>
                                <span ref={lineRef1} className="block opacity-0" style={{ color: "#ededed" }}>
                                    Sufiyan
                                </span>
                                <span ref={lineRef2} className="block opacity-0"
                                    style={{
                                        background: "linear-gradient(135deg, #00ff87, #60efff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                    Mirza
                                </span>
                                <span ref={lineRef3} className="block opacity-0 font-light"
                                    style={{
                                        fontSize: "clamp(1.2rem, 3vw, 2.8rem)",
                                        color: "#6b7280",
                                        marginTop: "0.5rem",
                                    }}>
                                    Full Stack Developer & AI Systems Builder
                                </span>
                            </h1>
                        </div>

                        <div ref={subRef} className="mb-10 opacity-0">
                            <p className="font-body leading-relaxed max-w-lg"
                                style={{
                                    color: "#6b7280",
                                    borderLeft: "2px solid rgba(0,255,135,0.3)",
                                    paddingLeft: "1.25rem",
                                }}>
                                I build <span style={{ color: "#ededed" }}>production-grade web systems</span> —
                                Laravel backends, Python microservices, and AI pipelines that actually ship.
                                <span style={{ color: "#00ff87" }}> Currently building Recrify.</span>
                            </p>
                        </div>

                        {/* FIXED CTA */}
                        <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">

                            <a
                                href="#projects"
                                className="group relative overflow-hidden font-display font-semibold text-sm"
                                style={{
                                    padding: "14px 36px",
                                    background: "#00ff87",
                                    color: "#080808",
                                    borderRadius: "2px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                View My Work
                            </a>

                            <a
                                href="#contact"
                                className="font-display font-medium text-sm"
                                style={{
                                    padding: "14px 36px",
                                    border: "1px solid #1a1a1a",
                                    color: "#ededed",
                                    borderRadius: "2px",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                Get In Touch
                            </a>

                        </div>
                    </div>

                    <div ref={statsRef} className="opacity-0 hidden lg:flex flex-col gap-6">
                        {[
                            { number: "3+", label: "Years\nExperience" },
                            { number: "20+", label: "Projects\nDelivered" },
                            { number: "02", label: "AI Systems\nBuilt" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "24px 28px",
                                    borderTop: "1px solid #1a1a1a",
                                    borderLeft: "1px solid #1a1a1a",
                                    minWidth: "140px",
                                }}
                            >
                                <div
                                    className="font-display font-bold"
                                    style={{
                                        fontSize: "2.8rem",
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
                                        lineHeight: 1.5,
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

            <div
                ref={scrollRef}
                className="absolute opacity-0"
                style={{ bottom: "2.5rem", left: "50%", transform: "translateX(-50%)" }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "#00ff87", letterSpacing: "0.2em" }}
                    >
                        Scroll
                    </span>
                    <div
                        style={{
                            width: "1px",
                            height: "70px",
                            background: "linear-gradient(to bottom, #00ff87, transparent)",
                            boxShadow: "0 0 8px rgba(0,255,135,0.8)",
                        }}
                    />
                </div>
            </div>

        </section>
    );
}