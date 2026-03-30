"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazySpline from "@/components/LazySpline";

gsap.registerPlugin(ScrollTrigger);

export default function BestThing() {
    const sectionRef = useRef<HTMLElement>(null);
    const splitRef1 = useRef<HTMLDivElement>(null);
    const splitRef2 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slide in from the left
            gsap.fromTo(
                splitRef1.current,
                { opacity: 0, x: -80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    },
                }
            );

            // Slide in from the right
            gsap.fromTo(
                splitRef2.current,
                { opacity: 0, x: 80 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1.4,
                    ease: "power4.out",
                    delay: 0.4, // Staggered slightly
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 50%",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="best-part"
            className="relative bg-[#080808] w-full min-h-screen overflow-hidden border-t border-white/[0.02]"
        >
            {/* Spline Background */}
            <div className="absolute inset-0 flex items-center justify-center z-0 opacity-90 md:opacity-100">
                <LazySpline scene="https://prod.spline.design/jAWRob53o02yzJPj/scene.splinecode" />
            </div>

            {/* Top Left Area */}
            <div 
                ref={splitRef1} 
                className="absolute top-24 left-6 md:top-32 md:left-24 z-10 pointer-events-none"
                style={{ opacity: 0 }}
            >
                <h2 
                    className="font-display font-medium text-white tracking-[-0.03em] mb-2 md:mb-4"
                    style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
                >
                    Best part?
                </h2>
                <p className="font-body text-[#00ff87] text-2xl md:text-4xl tracking-wide font-medium">
                    I don't smoke.
                </p>
            </div>

            {/* Bottom Right Area */}
            <div 
                ref={splitRef2} 
                className="absolute bottom-24 right-6 md:bottom-32 md:right-24 z-10 text-right pointer-events-none"
                style={{ opacity: 0 }}
            >
                <p className="font-body text-gray-400 text-lg md:text-xl max-w-xs md:max-w-md ml-auto leading-relaxed">
                    Keep your lungs clean, your focus sharp, and your code bug-free.
                    <br />
                    <span className="text-white font-medium mt-3 block text-xl">
                        Take a deep breath and keep building.
                    </span>
                </p>
            </div>

            {/* Gradient fades to seamlessly blend */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#080808] to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080808] to-transparent z-10 pointer-events-none" />
            {/* Shield to hide Spline branding - matching background color */}
            <div className="absolute bottom-0 right-0 w-[180px] h-[60px] bg-[#080808] z-30 pointer-events-none" />
        </section>
    );
}
