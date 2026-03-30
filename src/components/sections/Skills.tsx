"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazySpline from "@/components/LazySpline";

import {
    SiPhp, SiPython, SiJavascript, SiHtml5, SiCss,
    SiLaravel, SiFastapi, SiNextdotjs, SiTailwindcss, SiBootstrap, SiJquery,
    SiPytorch, SiDatabricks, SiMysql, SiDocker, SiGit, SiWordpress
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
    { name: "PHP", icon: SiPhp, color: "#4F5B93" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss, color: "#1572B6" },

    { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688" },
    { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" }, // White for dark bg
    { name: "TailwindCSS", icon: SiTailwindcss, color: "#38B2AC" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "jQuery", icon: SiJquery, color: "#0769AD" },

    { name: "Sentence-BERT", icon: SiPytorch, color: "#FF6F00" },
    { name: "XGBoost", icon: SiPython, color: "#337AB7" },
    { name: "Qdrant", icon: SiDatabricks, color: "#DC244C" },

    { name: "MySQL", icon: SiMysql, color: "#005C84" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "WordPress", icon: SiWordpress, color: "#21759B" },
];

// Disciplined, mirrored staggered grid layout on the left and right
const positions = [
    // Left side (9 icons)
    { top: 25, left: 10 }, { top: 50, left: 10 }, { top: 75, left: 10 },
    { top: 35, left: 20 }, { top: 60, left: 20 }, { top: 85, left: 20 },
    { top: 15, left: 30 }, { top: 40, left: 30 }, { top: 65, left: 30 },
    
    // Right side (9 icons)
    { top: 15, left: 70 }, { top: 40, left: 70 }, { top: 65, left: 70 },
    { top: 35, left: 80 }, { top: 60, left: 80 }, { top: 85, left: 80 },
    { top: 25, left: 90 }, { top: 50, left: 90 }, { top: 75, left: 90 },
];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro fade and scale when scrolled into view
            gsap.fromTo(
                ".skill-icon-wrapper",
                { opacity: 0, scale: 0 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 0.05,
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    },
                }
            );

            // Endless floating animation for each icon independently
            const icons = gsap.utils.toArray(".skill-icon-wrapper");
            icons.forEach((icon: any) => {
                gsap.to(icon, {
                    y: `random(-20, 20)`,
                    x: `random(-20, 20)`,
                    rotation: `random(-15, 15)`,
                    duration: `random(2.5, 4.5)`,
                    ease: "sine.inOut",
                    repeat: -1,
                    yoyo: true,
                    delay: `random(0, 2)`,
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative bg-[#080808] w-full h-screen min-h-[1000px] overflow-hidden flex items-center justify-center border-t border-white/[0.02]"
        >
            {/* Title / Watermark in the background */}
            <div className="absolute top-1 left-0 right-0 z-10 text-center mb-6 pt-6">
                <h2
                    className="font-display font-medium text-white mb-4 uppercase tracking-tighter"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                    Tech Arsenal
                </h2>
                <p className="font-mono text-xs tracking-widest text-[#00ff87]">
                    — Languages, Frameworks, AI & DevOps —
                </p>
            </div>

            {/* Spline Model (Centered) */}
            <div className="absolute inset-0 flex items-center justify-center z-0">
                <LazySpline scene="https://prod.spline.design/qqSURHfCZ3QFDNca/scene.splinecode" />
            </div>

            {/* Floating Skill Icons */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {skillsData.map((skill, idx) => {
                    const pos = positions[idx % positions.length];
                    const Icon = skill.icon;

                    return (
                        <div
                            key={skill.name}
                            className="skill-icon-wrapper absolute flex flex-col items-center justify-center"
                            style={{
                                top: `${pos.top}%`,
                                left: `${pos.left}%`,
                                transform: "translate(-50%, -50%)"
                            }}
                        >
                            <div
                                className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md transition-transform"
                                style={{
                                    boxShadow: `0 0 25px ${skill.color}80, inset 0 0 10px ${skill.color}40`,
                                }}
                            >
                                <Icon size={28} color={skill.color} className="md:w-8 md:h-8" />
                            </div>
                            {/* <span className="mt-2 font-mono text-[10px] text-gray-400 tracking-wider bg-black/50 px-2 py-0.5 rounded-full">{skill.name}</span> */}
                        </div>
                    );
                })}
            </div>

            {/* Dark gradient fade at bottom to blend into Services section seamlessly */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-20 pointer-events-none" />

            {/* Shield to hide Spline branding - matching background color */}
            <div className="absolute bottom-0 right-0 w-[180px] h-[60px] bg-[#080808] z-30 pointer-events-none" />
        </section>
    );
}
