"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: "Laravel / PHP", level: 95, color: "#FF2D20" },
    { name: "Python / FastAPI", level: 85, color: "#3776AB" },
    { name: "AI / ML Systems", level: 80, color: "#00ff87" },
    { name: "Next.js / React", level: 78, color: "#60efff" },
    { name: "MySQL / Qdrant", level: 85, color: "#005C84" },
    { name: "Docker / DevOps", level: 70, color: "#2496ED" },
];

const facts = [
    { label: "Role", value: "Full Stack Developer" },
    { label: "Company", value: "ITmate — Owner" },
    { label: "Location", value: "Lahore, Pakistan" },
    { label: "Experience", value: "3+ Years" },
    { label: "Flagship", value: "Recrify ATS" },
    { label: "Status", value: "Available for work" },
];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const factsRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section entrance
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                { opacity: 0, x: -60, rotateY: 15 },
                {
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Facts stagger
            gsap.fromTo(
                ".fact-item",
                { opacity: 0, x: -20 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: factsRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Skill bars
            gsap.fromTo(
                ".skill-item",
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 80%",
                    },
                }
            );

            // Skill bar fill animation
            gsap.fromTo(
                ".skill-bar-fill",
                { width: "0%" },
                {
                    width: (i, el) => el.getAttribute("data-width") + "%",
                    duration: 1.2,
                    ease: "power3.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 75%",
                    },
                }
            );

            // 3D scroll transition — section enters from below with depth
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 100, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 90%",
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
            {/* Background grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#00ff87 1px, transparent 1px), 
                            linear-gradient(90deg, #00ff87 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Accent line top */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #00ff87, transparent)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
                {/* Section label */}
                <div ref={headingRef} className="mb-20 opacity-0">
                    <span
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "#00ff87" }}
                    >
                        01 — About
                    </span>
                    <h2
                        className="font-display font-bold mt-3"
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            color: "#ededed",
                            lineHeight: 1,
                        }}
                    >
                        The Dev Behind
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #00ff87, #60efff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            The Code
                        </span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left — Visual card */}
                    <div ref={imageRef} className="opacity-0">
                        <div
                            className="relative"
                            style={{
                                border: "1px solid #1a1a1a",
                                padding: "40px",
                                background: "#0f0f0f",
                            }}
                        >
                            {/* Corner accents */}
                            <div
                                className="absolute top-0 left-0 w-6 h-6"
                                style={{
                                    borderTop: "2px solid #00ff87",
                                    borderLeft: "2px solid #00ff87",
                                }}
                            />
                            <div
                                className="absolute top-0 right-0 w-6 h-6"
                                style={{
                                    borderTop: "2px solid #00ff87",
                                    borderRight: "2px solid #00ff87",
                                }}
                            />
                            <div
                                className="absolute bottom-0 left-0 w-6 h-6"
                                style={{
                                    borderBottom: "2px solid #00ff87",
                                    borderLeft: "2px solid #00ff87",
                                }}
                            />
                            <div
                                className="absolute bottom-0 right-0 w-6 h-6"
                                style={{
                                    borderBottom: "2px solid #00ff87",
                                    borderRight: "2px solid #00ff87",
                                }}
                            />

                            {/* Code block style intro */}
                            <div className="font-mono text-sm mb-8" style={{ color: "#6b7280" }}>
                                <span style={{ color: "#60efff" }}>const</span>{" "}
                                <span style={{ color: "#00ff87" }}>developer</span>{" "}
                                <span style={{ color: "#ededed" }}>=</span>{" "}
                                <span style={{ color: "#60efff" }}>{`{`}</span>
                            </div>

                            <div ref={factsRef} className="space-y-4 mb-8">
                                {facts.map((fact, i) => (
                                    <div
                                        key={i}
                                        className="fact-item opacity-0 flex items-center justify-between font-mono text-sm"
                                        style={{
                                            paddingBottom: "12px",
                                            borderBottom: "1px solid #1a1a1a",
                                        }}
                                    >
                                        <span style={{ color: "#6b7280" }}>{fact.label}:</span>
                                        <span style={{ color: "#ededed" }}>
                                            &quot;{fact.value}&quot;
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="font-mono text-sm" style={{ color: "#60efff" }}>
                                {`}`}
                            </div>
                        </div>
                    </div>

                    {/* Right — Skills */}
                    <div ref={skillsRef}>
                        <p
                            className="font-body leading-relaxed mb-12"
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
                                        style={{ color: "#6b7280" }}
                                    >
                                        <span style={{ color: "#ededed" }}>{skill.name}</span>
                                        <span>{skill.level}%</span>
                                    </div>
                                    <div
                                        style={{
                                            height: "2px",
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
                                                boxShadow: `0 0 8px ${skill.color}40`,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Philosophy quote */}
                        <div
                            className="mt-16 p-6"
                            style={{
                                background: "rgba(0,255,135,0.02)",
                                border: "1px solid rgba(0,255,135,0.1)",
                            }}
                        >
                            <p
                                className="font-display text-lg leading-relaxed"
                                style={{ color: "#ededed" }}
                            >
                                &ldquo;Clean code is not written by following a set of rules.
                                Clean code is written by someone who{" "}
                                <span style={{ color: "#00ff87" }}>cares about the craft.</span>
                                &rdquo;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}