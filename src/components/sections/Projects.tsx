"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        number: "01",
        title: "Recrify ATS",
        subtitle: "AI-Powered Applicant Tracking System",
        description:
            "A multi-service intelligent recruitment platform combining semantic search and ML prediction. Built with Laravel, FastAPI, Sentence-BERT, XGBoost, and Qdrant vector database.",
        tags: ["Laravel", "FastAPI", "Python", "Qdrant", "XGBoost", "Next.js"],
        status: "In Progress",
        color: "#00ff87",
        link: "https://github.com/Sufi-7571",
    },
    {
        number: "02",
        title: "GIGC LMS",
        subtitle: "Learning Management System",
        description:
            "A full-featured academic LMS built for Government Islamia Graduate College. Includes course management, student tracking, assignments, and admin dashboard.",
        tags: ["Laravel 11", "Bootstrap 5", "MySQL", "PHP"],
        status: "Live",
        color: "#60efff",
        link: "https://github.com/Sufi-7571/GIGC-LMS",
    },
    {
        number: "03",
        title: "GIGC Website",
        subtitle: "Institutional WordPress Website",
        description:
            "Production WordPress website for Government Islamia Graduate College Faisalabad. Custom theme, responsive design, and content management system.",
        tags: ["WordPress", "PHP", "CSS", "MySQL"],
        status: "Live",
        color: "#00ff87",
        link: "https://gigcfsd.edu.pk/",
    },
    {
        number: "04",
        title: "Focus Photography",
        subtitle: "Photography Portfolio Website",
        description:
            "A professional photography portfolio website with gallery management, client showcases, and booking system built on WordPress.",
        tags: ["WordPress", "PHP", "JavaScript", "CSS"],
        status: "Live",
        color: "#60efff",
        link: "https://www.focusphotography.ru/",
    },
];

function ProjectCard({
    project,
    index,
}: {
    project: (typeof projects)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(card, {
            rotateX,
            rotateY,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "power3.out",
        });
        setHovered(false);
    };

    return (
        <div
            ref={cardRef}
            className="project-card opacity-0 relative"
            style={{
                transformStyle: "preserve-3d",
                cursor: "none",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setHovered(true)}
            data-cursor
        >
            <div
                style={{
                    background: hovered ? "#0f0f0f" : "#0a0a0a",
                    border: `1px solid ${hovered ? project.color + "40" : "#1a1a1a"}`,
                    padding: "40px",
                    transition: "background 0.3s ease, border 0.3s ease",
                    boxShadow: hovered
                        ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.color}10`
                        : "none",
                }}
            >
                {/* Top row */}
                <div className="flex items-start justify-between mb-6">
                    <span
                        className="font-mono text-xs tracking-widest"
                        style={{ color: project.color }}
                    >
                        {project.number}
                    </span>
                    <span
                        className="font-mono text-xs px-3 py-1"
                        style={{
                            color: project.status === "Live" ? "#00ff87" : "#6b7280",
                            border: `1px solid ${project.status === "Live"
                                ? "rgba(0,255,135,0.3)"
                                : "rgba(107,114,128,0.3)"
                                }`,
                        }}
                    >
                        {project.status}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="font-display font-bold mb-2"
                    style={{
                        fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                        color: "#ededed",
                        lineHeight: 1.1,
                    }}
                >
                    {project.title}
                </h3>
                <p
                    className="font-mono text-xs mb-4"
                    style={{ color: project.color }}
                >
                    {project.subtitle}
                </p>

                {/* Description */}
                <p
                    className="font-body text-sm leading-relaxed mb-8"
                    style={{ color: "#6b7280" }}
                >
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="font-mono text-xs px-3 py-1"
                            style={{
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid #1a1a1a",
                                color: "#6b7280",
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Link */}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase"
                    style={{
                        color: project.color,
                        transition: "gap 0.3s ease",
                    }}
                >
                    View Project
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </a>

                {/* Hover accent line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: "2px",
                        width: hovered ? "100%" : "0%",
                        background: `linear-gradient(90deg, ${project.color}, transparent)`,
                        transition: "width 0.4s ease",
                    }}
                />
            </div>
        </div >
    );
}

export default function Projects() {
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

            // Cards stagger with 3D entrance
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 80, rotateX: 15, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.9,
                    ease: "power4.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: ".projects-grid",
                        start: "top 80%",
                    },
                }
            );

            // Section 3D scroll entrance
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 100 },
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
            id="projects"
            className="relative py-32 overflow-hidden"
            style={{ background: "#080808" }}
        >
            {/* Accent line top */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #60efff, transparent)",
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
                {/* Heading */}
                <div
                    ref={headingRef}
                    className="opacity-0 flex items-end justify-between mb-20 flex-wrap gap-6"
                >
                    <div>
                        <span
                            className="font-mono text-xs tracking-widest uppercase"
                            style={{ color: "#00ff87" }}
                        >
                            02 — Projects
                        </span>
                        <h2
                            className="font-display font-bold mt-3"
                            style={{
                                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                                color: "#ededed",
                                lineHeight: 1,
                            }}
                        >
                            Things I've
                            <br />
                            <span
                                style={{
                                    background: "linear-gradient(135deg, #00ff87, #60efff)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                }}
                            >
                                Built
                            </span>
                        </h2>
                    </div>

                    <a
                        href="https://github.com/Sufi-7571"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-widest uppercase inline-flex items-center gap-2"
                        style={{
                            color: "#6b7280",
                            border: "1px solid #1a1a1a",
                            padding: "12px 24px",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#00ff87";
                            (e.currentTarget as HTMLElement).style.borderColor = "#00ff87";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#6b7280";
                            (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                        }}
                    >
                        View All on GitHub
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Grid */}
                <div className="projects-grid grid md:grid-cols-2 gap-6">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section >
    );
}