"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const facts = [
    { label: "Name", value: "Sufiyan Mirza" },
    { label: "Role", value: "Full Stack Developer" },
    { label: "Company", value: "ITmate — Owner" },
    { label: "Location", value: "Lahore, Pakistan" },
    { label: "Experience", value: "3+ Years" },
    { label: "Status", value: "Available for work" },
];

const skills = [
    { name: "Laravel / PHP", level: 95, color: "#FF2D20" },
    { name: "Python / FastAPI", level: 85, color: "#3776AB" },
    { name: "AI / ML Systems", level: 80, color: "#00ff87" },
    { name: "Next.js / React", level: 78, color: "#60efff" },
    { name: "MySQL / Qdrant", level: 85, color: "#005C84" },
    { name: "Docker / DevOps", level: 70, color: "#2496ED" },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const heading1Ref = useRef<HTMLDivElement>(null);
    const heading2Ref = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Section label
            gsap.fromTo(
                labelRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: labelRef.current,
                        start: "top 88%",
                    },
                }
            );

            // Heading line 1
            gsap.fromTo(
                heading1Ref.current,
                { opacity: 0, y: 80, skewY: 3 },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: heading1Ref.current,
                        start: "top 88%",
                    },
                }
            );

            // Heading line 2
            gsap.fromTo(
                heading2Ref.current,
                { opacity: 0, y: 80, skewY: 3 },
                {
                    opacity: 1,
                    y: 0,
                    skewY: 0,
                    duration: 1,
                    ease: "power4.out",
                    delay: 0.1,
                    scrollTrigger: {
                        trigger: heading2Ref.current,
                        start: "top 88%",
                    },
                }
            );

            // Card entrance — 3D flip from left
            gsap.fromTo(
                cardRef.current,
                {
                    opacity: 0,
                    x: -80,
                    rotateY: 15,
                    transformPerspective: 1000,
                },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 82%",
                    },
                }
            );

            // Fact items stagger
            gsap.fromTo(
                ".fact-item",
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.07,
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 78%",
                    },
                }
            );

            // Skills entrance
            gsap.fromTo(
                skillsRef.current,
                { opacity: 0, x: 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 82%",
                    },
                }
            );

            // Skill items stagger
            gsap.fromTo(
                ".skill-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 78%",
                    },
                }
            );

            // Skill bar fill
            gsap.fromTo(
                ".skill-bar-fill",
                { width: "0%" },
                {
                    width: (i, el) => el.getAttribute("data-width") + "%",
                    duration: 1.4,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 75%",
                    },
                }
            );

            // Quote
            gsap.fromTo(
                quoteRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: quoteRef.current,
                        start: "top 88%",
                    },
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative py-32 overflow-hidden"
            style={{ background: "#080808" }}
        >
            {/* Top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #00ff87, transparent)",
                }}
            />

            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,255,135,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,255,135,0.03) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">

                {/* Section label */}
                <div ref={labelRef} className="mb-4 opacity-0">
                    <span
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "#00ff87" }}
                    >
                        01 — About
                    </span>
                </div>

                {/* Heading */}
                <div className="mb-20 overflow-hidden">
                    <div ref={heading1Ref} className="opacity-0">
                        <h2
                            className="font-display font-bold leading-[0.95]"
                            style={{
                                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                                color: "#ededed",
                            }}
                        >
                            The Dev Behind
                        </h2>
                    </div>
                    <div ref={heading2Ref} className="opacity-0">
                        <h2
                            className="font-display font-bold leading-[0.95]"
                            style={{
                                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                                background: "linear-gradient(135deg, #00ff87, #60efff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            The Code
                        </h2>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* Left — Code card */}
                    <div ref={cardRef} className="opacity-0">
                        <div
                            style={{
                                background: "#0a0a0a",
                                border: "1px solid #1a1a1a",
                                padding: "40px",
                                position: "relative",
                            }}
                        >
                            {/* Corner accents */}
                            {["top-0 left-0 border-t-2 border-l-2",
                                "top-0 right-0 border-t-2 border-r-2",
                                "bottom-0 left-0 border-b-2 border-l-2",
                                "bottom-0 right-0 border-b-2 border-r-2",
                            ].map((cls, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-5 h-5 ${cls}`}
                                    style={{ borderColor: "#00ff87" }}
                                />
                            ))}

                            {/* Code header */}
                            <div className="font-mono text-sm mb-6">
                                <span style={{ color: "#60efff" }}>const</span>{" "}
                                <span style={{ color: "#00ff87" }}>developer</span>{" "}
                                <span style={{ color: "#ededed" }}>=</span>{" "}
                                <span style={{ color: "#ededed" }}>{"{"}</span>
                            </div>

                            {/* Facts */}
                            <div className="space-y-3 mb-6">
                                {facts.map((fact, i) => (
                                    <div
                                        key={i}
                                        className="fact-item opacity-0 flex items-center justify-between font-mono text-sm"
                                        style={{
                                            paddingBottom: "10px",
                                            borderBottom: "1px solid #1a1a1a",
                                        }}
                                    >
                                        <span style={{ color: "#6b7280" }}>
                                            &nbsp;&nbsp;{fact.label}:
                                        </span>
                                        <span style={{ color: "#ededed" }}>
                                            &quot;{fact.value}&quot;
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="font-mono text-sm" style={{ color: "#ededed" }}>
                                {"};"}
                            </div>
                        </div>
                    </div>

                    {/* Right — Skills */}
                    <div ref={skillsRef} className="opacity-0">

                        <p
                            className="font-body leading-relaxed mb-10"
                            style={{
                                color: "#6b7280",
                                fontSize: "1.05rem",
                                borderLeft: "2px solid rgba(0,255,135,0.3)",
                                paddingLeft: "1.25rem",
                            }}
                        >
                            I specialize in building{" "}
                            <span style={{ color: "#ededed" }}>
                                production-grade systems
                            </span>{" "}
                            that are fast, maintainable, and intelligent. From event-driven
                            Laravel backends to Python AI microservices — I care about the
                            craft at every layer of the stack.
                        </p>

                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <div key={i} className="skill-item opacity-0">
                                    <div
                                        className="flex justify-between mb-2 font-mono text-xs"
                                    >
                                        <span style={{ color: "#ededed" }}>{skill.name}</span>
                                        <span style={{ color: "#6b7280" }}>{skill.level}%</span>
                                    </div>
                                    <div
                                        style={{
                                            height: "1px",
                                            background: "#1a1a1a",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <div
                                            className="skill-bar-fill h-full"
                                            data-width={skill.level}
                                            style={{
                                                width: "0%",
                                                background: `linear-gradient(90deg, ${skill.color}, #60efff)`,
                                                boxShadow: `0 0 8px ${skill.color}60`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quote */}
                        <div
                            ref={quoteRef}
                            className="mt-12 opacity-0"
                            style={{
                                padding: "24px 28px",
                                background: "rgba(0,255,135,0.02)",
                                borderLeft: "2px solid #00ff87",
                            }}
                        >
                            <p
                                className="font-display text-lg leading-relaxed"
                                style={{ color: "#ededed" }}
                            >
                                &ldquo;Clean code is written by someone who{" "}
                                <span style={{ color: "#00ff87" }}>
                                    cares about the craft.
                                </span>
                                &rdquo;
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #60efff, transparent)",
                }}
            />
        </section>
    );
}