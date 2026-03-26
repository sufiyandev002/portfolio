"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";
import {
    Building2,
    Bot,
    Database,
    Zap,
    MapPin,
    MessageSquare,
    GraduationCap,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const timelineItems = [
    {
        text: "I'm a Full Stack Developer from Lahore, Pakistan who builds things at the intersection of clean backend architecture, intelligent AI systems, and pixel-perfect interfaces.",
        isParagraph: true,
    },
    {
        text: "By day I architect Laravel backends and Python microservices. By night I obsess over UI micro-interactions and matching algorithm precision.",
        isParagraph: true,
    },
    { icon: Building2, text: "Owner at ITmate" },
    { icon: Bot, text: "Building Recrify — an AI-powered ATS" },
    { icon: Database, text: "Exploring Vector DBs, NLP pipelines & XGBoost tuning" },
    { icon: Zap, text: "Obsessed with performance, clean code & smooth UX" },
    { icon: MapPin, text: "Based in Lahore, Pakistan" },
    { icon: MessageSquare, text: "Ask me about Laravel · FastAPI · AI Integration · WordPress" },
    { icon: GraduationCap, text: "Bachelors in Computer Science with Silver Medal." },
];

function GlassCard({ icon, text }: { icon: React.ElementType; text: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        gsap.to(card, {
            rotateY: dx * 12,
            rotateX: -dy * 12,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 800,
        });
        // Shine position
        const shine = card.querySelector(".card-shine") as HTMLElement;
        if (shine) {
            shine.style.background = `radial-gradient(circle at ${((e.clientX - rect.left) / rect.width) * 100}% ${((e.clientY - rect.top) / rect.height) * 100}%, rgba(255,255,255,0.08) 0%, transparent 70%)`;
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            transformPerspective: 800,
        });
        const shine = card.querySelector(".card-shine") as HTMLElement;
        if (shine) shine.style.background = "transparent";
    };

    const Icon = icon;

    return (
        <div
            ref={cardRef}
            className="relative flex items-center gap-4 p-5 rounded-2xl cursor-default"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
                transformStyle: "preserve-3d",
                willChange: "transform",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Shine overlay */}
            <div
                className="card-shine absolute inset-0 rounded-2xl pointer-events-none"
                style={{ transition: "background 0.1s ease" }}
            />

            {/* Top edge highlight */}
            <div
                className="absolute top-0 left-4 right-4 h-px rounded-full pointer-events-none"
                style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)" }}
            />

            <div
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                    background: "rgba(0,255,135,0.08)",
                    border: "1px solid rgba(0,255,135,0.2)",
                    boxShadow: "0 0 20px rgba(0,255,135,0.1)",
                }}
            >
                <Icon size={18} color="#00ff87" />
            </div>

            <span
                className="font-mono text-sm leading-snug"
                style={{ color: "rgba(255,255,255,0.8)" }}
            >
                {text}
            </span>
        </div>
    );
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const splineContainerRef = useRef<HTMLDivElement>(null);
    const splineLabelRef = useRef<HTMLDivElement>(null);
    const splineBottomRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                    },
                }
            );

            gsap.fromTo(
                splineContainerRef.current,
                { opacity: 0, scale: 0.97 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: splineContainerRef.current,
                        start: "top 85%",
                    },
                }
            );

            gsap.fromTo(
                splineLabelRef.current,
                { opacity: 0, x: -30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: splineContainerRef.current,
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                splineBottomRef.current,
                { opacity: 0, x: 30 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: splineContainerRef.current,
                        start: "top 75%",
                    },
                }
            );

            if (timelineRef.current && lineRef.current && dotRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0, transformOrigin: "top center" },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: "top 60%",
                            end: "bottom 80%",
                            scrub: 0.8,
                        },
                    }
                );

                gsap.to(dotRef.current, {
                    top: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 0.5,
                    },
                });

                // Paragraph items
                gsap.utils.toArray<HTMLElement>(".timeline-para").forEach((item) => {
                    gsap.fromTo(
                        item,
                        { opacity: 0, y: 40 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 82%",
                            },
                        }
                    );
                });

                // Card items — 3D flip reveal
                gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((item, i) => {
                    gsap.fromTo(
                        item,
                        {
                            opacity: 0,
                            y: 60,
                            rotateX: 25,
                            transformPerspective: 800,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.85,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="relative bg-[#080808] overflow-hidden pt-32 pb-32"
        >
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 pb-3">

                {/* Big white heading */}
                <div ref={headingRef} className="mb-16 opacity-0">
                    <h2
                        className="font-display font-medium text-center leading-none uppercase tracking-tighter"
                        style={{ fontSize: "clamp(4.5rem, 12vw, 10rem)", color: "#ffffff" }}
                    >
                        About Me
                    </h2>
                </div>

                {/* Timeline Section */}
                <div ref={timelineRef} className="relative pb-16">

                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2">
                        <div
                            ref={lineRef}
                            className="absolute inset-0 w-full"
                            style={{
                                background: "linear-gradient(to bottom, #00ff87, #60efff)",
                                transform: "scaleY(0)",
                                transformOrigin: "top center",
                            }}
                        />
                        <div
                            ref={dotRef}
                            className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                            style={{
                                top: "0%",
                                background: "#00ff87",
                                boxShadow: "0 0 12px #00ff87, 0 0 30px rgba(0,255,135,0.5)",
                            }}
                        />
                    </div>

                    <div className="relative z-10 space-y-20 md:space-y-28">
                        {timelineItems.map((item, i) => {
                            const isEven = i % 2 === 0;
                            const Icon = !item.isParagraph ? item.icon as React.ElementType : null;

                            return (
                                <div
                                    key={i}
                                    className={`flex w-full ${isEven ? "md:justify-start" : "md:justify-end"}`}
                                >
                                    <div
                                        className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:pr-12" : "md:pl-12"}`}
                                    >
                                        {item.isParagraph ? (
                                            <div className="timeline-para" style={{ opacity: 0 }}>
                                                <p
                                                    className="font-body text-lg md:text-xl leading-relaxed"
                                                    style={{ color: "rgba(255,255,255,1)" }}
                                                >
                                                    {item.text}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="timeline-card" style={{ opacity: 0 }}>
                                                <GlassCard icon={Icon!} text={item.text} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Full-width Spline with heading overlay */}
                <div
                    ref={splineContainerRef}
                    className="relative w-full opacity-0 rounded-2xl overflow-hidden mb-32"
                    style={{ height: "100vh", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                    {/* Top-left label */}
                    <div
                        ref={splineLabelRef}
                        className="absolute top-8 left-8 z-20 opacity-0 pointer-events-none"
                    >
                        <p
                            className="font-mono text-xs tracking-widest uppercase mb-2"
                            style={{ color: "#00ff87" }}
                        >
                            — The Dev Behind
                        </p>
                        <h3
                            className="font-display font-medium leading-none tracking-tighter"
                            style={{
                                fontSize: "clamp(2rem, 5vw, 4rem)",
                                color: "#ffffff",
                                textShadow: "0 0 40px rgba(0,0,0,0.8)",
                            }}
                        >
                            The Code.
                        </h3>
                    </div>

                    {/* Bottom-right label */}
                    <div
                        ref={splineBottomRef}
                        className="absolute bottom-12 right-8 z-20 opacity-0 pointer-events-none text-right"
                    >
                        <h3
                            className="font-display font-medium leading-none tracking-tighter mb-2"
                            style={{
                                fontSize: "clamp(1.2rem, 3vw, 2.2rem)",
                                color: "#ffffff",
                                textShadow: "0 0 40px rgba(0,0,0,0.8)",
                            }}
                        >
                            Full Stack · AI · Design
                        </h3>
                        <p
                            className="font-mono text-xs tracking-widest uppercase"
                            style={{ color: "#60efff" }}
                        >
                            Laravel · FastAPI · Next.js —
                        </p>
                    </div>

                    <div
                        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                        style={{
                            height: "30%",
                            background: "linear-gradient(to top, #080808 0%, transparent 100%)",
                        }}
                    />

                    <Spline scene="https://prod.spline.design/vNIcF0wIQsRTS-V2/scene.splinecode" />
                </div>
            </div>
        </section>
    );
}