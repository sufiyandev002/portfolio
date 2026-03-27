"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const MagneticArea = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move it 30% of the distance from the center
            gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.8, ease: "power3.out" });
        };

        const handleMouseLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
        };

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
};

export default function Cta() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="cta"
            className="bg-[#080808] w-full min-h-screen flex items-center py-20 border-t border-white/[0.02] overflow-hidden"
        >
            <div className="max-w-[1800px] w-full mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between min-h-[70vh]">
                
                {/* Left Side: Faded Image */}
                <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[800px] overflow-hidden flex-shrink-0">
                    
                    <Image 
                        src="/assets/images/sufi-2.png"
                        alt="Sufiyan"
                        fill
                        className="object-cover object-center"
                    />

                    {/* Seamless Gradient Overlays merging into background #080808 */}
                    <div className="absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-[#080808] to-transparent pointer-events-none" />
                    <div className="absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
                    <div className="absolute left-0 inset-y-0 w-32 md:w-48 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none" />
                    <div className="absolute right-0 inset-y-0 w-32 md:w-48 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none" />
                </div>

                {/* Right Side: Content & Magnetic Button */}
                <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0 pl-0 lg:pl-16 xl:pl-32" style={{ opacity: 0 }}>
                    
                    {/* Top List Area */}
                    <div className="mb-20">
                        <h3 className="font-display text-white text-3xl sm:text-4xl md:text-5xl font-medium mb-2">
                            AI Tools:
                        </h3>
                        {/* Greyed out list items */}
                        <div className="flex flex-col gap-1 text-[#6b7280] font-body text-3xl sm:text-4xl md:text-5xl font-light">
                            <p className="transition-colors hover:text-white cursor-default">Content Writing.</p>
                            <p className="transition-colors hover:text-white cursor-default">Image Generation.</p>
                            <p className="transition-colors hover:text-white cursor-default">Optimization.</p>
                        </div>
                    </div>

                    {/* Bottom CTA Area */}
                    <div>
                        <h2 className="font-display text-white text-3xl sm:text-4xl md:text-5xl leading-[1.2] font-medium max-w-xl mb-12">
                            More Solutions for the Uniqueness of Your Business
                        </h2>

                        <div className="flex items-center gap-4">
                            {/* CTA Pill Button (Magnetic) */}
                            <MagneticArea>
                                <button className="bg-white hover:bg-gray-200 text-black px-8 py-5 rounded-full font-display text-sm font-bold tracking-widest cursor-pointer group">
                                    DISCUSS THE PROJECT
                                </button>
                            </MagneticArea>
                            
                            {/* Circular Arrow Button (Magnetic) */}
                            <MagneticArea>
                                <button className="bg-white hover:bg-[#00ff87] text-black w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 group">
                                    <ArrowRight size={22} className="transition-transform duration-300 group-hover:-rotate-45" />
                                </button>
                            </MagneticArea>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
