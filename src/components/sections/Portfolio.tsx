"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { title: "Recrify", image: "/assets/portfolio/recrify.webp" },
    { title: "REM", image: "/assets/portfolio/rem.webp" },
    { title: "Realtorsin", image: "/assets/portfolio/realtorsin.webp" },
    { title: "LMS", image: "/assets/portfolio/lms.webp" },
    { title: "Fashion Dream", image: "/assets/portfolio/fashiondreams.webp" },
    { title: "Real Estate", image: "/assets/portfolio/realestate.webp" },
    { title: "Top 7 Consultants", image: "/assets/portfolio/top-7.webp" },
    { title: "Saddi Fashions", image: "/assets/portfolio/saddifash.webp" },
];

// Duplicate for infinite loop
const loopedProjects = [...projects, ...projects, ...projects];

export default function Portfolio() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const sliderTrackRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headerRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                }
            );

            gsap.fromTo(
                contentRef.current,
                { opacity: 0, x: 100 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                    },
                }
            );
        }, sectionRef);

        // Infinite loop animation
        const track = sliderTrackRef.current;
        if (!track) return;

        // Width of one set of original projects
        const totalWidth = track.scrollWidth / 3;

        animRef.current = gsap.to(track, {
            x: `-=${totalWidth}`,
            duration: 25,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
            },
        });

        return () => {
            ctx.revert();
            animRef.current?.kill();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="portfolio"
            className="bg-[#080808] w-full min-h-screen border-t border-white/[0.02] overflow-hidden"
        >
            <div className="max-w-[1800px] mx-auto px-6 lg:px-16 flex flex-col h-full justify-center">

                {/* Header */}
                <div ref={headerRef} className="pt-24 mb-16 md:pt-0 md:mb-24" style={{ opacity: 0 }}>
                    <h2
                        className="font-display font-medium text-white uppercase tracking-[-0.03em]"
                        style={{ fontSize: "clamp(4rem, 12vw, 10rem)", lineHeight: 0.9 }}
                    >
                        Portfolio
                    </h2>
                </div>

                {/* Content Area */}
                <div ref={contentRef} className="flex flex-col xl:flex-row gap-12 xl:gap-24 items-start" style={{ opacity: 0 }}>

                    {/* Left Info Panel */}
                    <div className="w-full xl:w-1/4 pt-2 xl:pt-20 flex-shrink-0">
                        <h3 className="font-display text-white text-xl md:text-2xl font-medium mb-4 md:mb-6">
                            Proud Productions
                        </h3>
                        <div className="flex items-center gap-4 md:gap-6 group cursor-pointer">
                            <span className="font-body text-gray-400 text-sm md:text-base transition-colors duration-300 group-hover:text-white">
                                A journey through development and AI, focused on creating things that matter.
                            </span>
                            <div className="flex items-center">
                                <span className="w-12 md:w-16 h-[1px] bg-gray-600 group-hover:bg-[#00ff87] transition-colors duration-300" />
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-gray-600 group-hover:border-[#00ff87] flex items-center justify-center transition-colors duration-300">
                                    <ArrowRight size={14} className="text-gray-500 group-hover:text-[#00ff87] transition-colors duration-300" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Slider */}
                    <div className="relative w-full xl:w-3/4 overflow-hidden pb-12">

                        {/* Left fade */}
                        <div
                            className="absolute left-0 top-0 bottom-12 w-24 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to right, #080808 0%, transparent 100%)" }}
                        />

                        {/* Right fade */}
                        <div
                            className="absolute right-0 top-0 bottom-12 w-24 z-10 pointer-events-none"
                            style={{ background: "linear-gradient(to left, #080808 0%, transparent 100%)" }}
                        />

                        {/* Track */}
                        <div
                            ref={sliderTrackRef}
                            className="flex gap-4 md:gap-8"
                            style={{ width: "max-content" }}
                        >
                            {loopedProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="relative w-[85vw] sm:w-[400px] md:w-[450px] lg:w-[480px] lg:h-[630px] aspect-square md:aspect-[4/4.5] bg-[#111] overflow-hidden group flex-shrink-0"
                                >
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none"
                                        // style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.15) 0%, rgba(96,239,255,0.1) 100%)" }}
                                    >

                                        <div className="flex items-center gap-3 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                            <span className="font-display text-white text-lg tracking-widest uppercase font-medium">
                                                Explore
                                            </span>
                                            <ArrowRight size={22} style={{ color: "#00ff87" }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}