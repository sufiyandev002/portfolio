"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const stack = [
    {
        category: "Backend",
        color: "#FF2D20",
        items: [
            { name: "Laravel", icon: "⚡" },
            { name: "PHP", icon: "🐘" },
            { name: "Python", icon: "🐍" },
            { name: "FastAPI", icon: "🚀" },
        ],
    },
    {
        category: "AI / ML",
        color: "#00ff87",
        items: [
            { name: "Sentence-BERT", icon: "🧠" },
            { name: "XGBoost", icon: "📊" },
            { name: "Qdrant", icon: "🔍" },
            { name: "NLP", icon: "💬" },
        ],
    },
    {
        category: "Frontend",
        color: "#60efff",
        items: [
            { name: "Next.js", icon: "▲" },
            { name: "React", icon: "⚛️" },
            { name: "Tailwind", icon: "🎨" },
            { name: "TypeScript", icon: "📘" },
        ],
    },
    {
        category: "Database",
        color: "#005C84",
        items: [
            { name: "MySQL", icon: "🗄️" },
            { name: "Qdrant", icon: "🔮" },
            { name: "Redis", icon: "🔴" },
            { name: "SQLite", icon: "📦" },
        ],
    },
    {
        category: "DevOps",
        color: "#2496ED",
        items: [
            { name: "Docker", icon: "🐳" },
            { name: "Git", icon: "🌿" },
            { name: "GitHub", icon: "🐙" },
            { name: "Vercel", icon: "▲" },
        ],
    },
    {
        category: "CMS & Tools",
        color: "#21759B",
        items: [
            { name: "WordPress", icon: "🌐" },
            { name: "VS Code", icon: "💻" },
            { name: "Postman", icon: "📮" },
            { name: "Figma", icon: "🎭" },
        ],
    },
];

export default function Stack() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading
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

            // Z-tunnel entrance — cards fly in from depth
            gsap.fromTo(
                ".stack-category",
                {
                    opacity: 0,
                    z: -200,
                    scale: 0.7,
                    y: 40,
                },
                {
                    opacity: 1,
                    z: 0,
                    scale: 1,
                    y: 0,
                    duration: 0.9,
                    ease: "power4.out",
                    stagger: {
                        amount: 0.8,
                        from: "start",
                    },
                    scrollTrigger: {
                        trigger: ".stack-grid",
                        start: "top 80%",
                    },
                }
            );

            // Individual tech items
            gsap.fromTo(
                ".tech-item",
                { opacity: 0, scale: 0.8, y: 10 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "back.out(1.7)",
                    stagger: 0.04,
                    scrollTrigger: {
                        trigger: ".stack-grid",
                        start: "top 75%",
                    },
                }
            );

            // Section entrance
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 80 },
                {
                    opacity: 1,
                    y: 0,
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
            id="stack"
            className="relative py-32 overflow-hidden"
            style={{ background: "#0a0a0a" }}
        >
            {/* Accent line top */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #00ff87, transparent)",
                }}
            />

            {/* Background dots */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #1a1a1a 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    opacity: 0.4,
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
                {/* Heading */}
                <div ref={headingRef} className="opacity-0 mb-20">
                    <span
                        className="font-mono text-xs tracking-widest uppercase"
                        style={{ color: "#00ff87" }}
                    >
                        03 — Stack
                    </span>
                    <h2
                        className="font-display font-bold mt-3"
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            color: "#ededed",
                            lineHeight: 1,
                        }}
                    >
                        Tech I
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #00ff87, #60efff)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Work With
                        </span>
                    </h2>
                </div>

                {/* Stack grid */}
                <div
                    className="stack-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    style={{ perspective: "1000px" }}
                >
                    {stack.map((category, i) => (
                        <div
                            key={i}
                            className="stack-category opacity-0"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div
                                style={{
                                    background: "#0f0f0f",
                                    border: "1px solid #1a1a1a",
                                    padding: "32px",
                                    height: "100%",
                                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        category.color + "40";
                                    (e.currentTarget as HTMLElement).style.boxShadow =
                                        `0 0 30px ${category.color}08`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        "#1a1a1a";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                }}
                            >
                                {/* Category header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div
                                        style={{
                                            width: "3px",
                                            height: "20px",
                                            background: category.color,
                                            boxShadow: `0 0 8px ${category.color}`,
                                        }}
                                    />
                                    <span
                                        className="font-mono text-xs tracking-widest uppercase"
                                        style={{ color: category.color }}
                                    >
                                        {category.category}
                                    </span>
                                </div>

                                {/* Tech items */}
                                <div className="grid grid-cols-2 gap-3">
                                    {category.items.map((item, j) => (
                                        <div
                                            key={j}
                                            className="tech-item opacity-0"
                                            style={{
                                                padding: "12px 16px",
                                                background: "rgba(255,255,255,0.02)",
                                                border: "1px solid #1a1a1a",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px",
                                                transition: "all 0.2s ease",
                                                cursor: "none",
                                            }}
                                            onMouseEnter={(e) => {
                                                (e.currentTarget as HTMLElement).style.background =
                                                    `${category.color}10`;
                                                (e.currentTarget as HTMLElement).style.borderColor =
                                                    `${category.color}30`;
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.currentTarget as HTMLElement).style.background =
                                                    "rgba(255,255,255,0.02)";
                                                (e.currentTarget as HTMLElement).style.borderColor =
                                                    "#1a1a1a";
                                            }}
                                        >
                                            <span style={{ fontSize: "14px" }}>{item.icon}</span>
                                            <span
                                                className="font-mono text-xs"
                                                style={{ color: "#ededed" }}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="mt-16 text-center">
                    <p
                        className="font-mono text-xs tracking-widest"
                        style={{ color: "#6b7280" }}
                    >
                        Always learning · Always building
                    </p>
                </div>
            </div>
        </section>
    );
}