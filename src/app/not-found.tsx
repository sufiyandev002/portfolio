"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".not-found-content > *",
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={containerRef}
            className="bg-[#080808] min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative"
        >
            {/* Radial glow background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,135,0.06) 0%, transparent 70%)",
                }}
            />

            <div className="not-found-content flex flex-col items-center text-center z-10">
                {/* Glitchy 404 */}
                <span
                    className="font-display text-white font-bold select-none"
                    style={{
                        fontSize: "clamp(8rem, 25vw, 18rem)",
                        lineHeight: 1,
                        letterSpacing: "-0.05em",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                    }}
                >
                    404
                </span>

                {/* Label */}
                <p className="font-body text-[#00ff87] text-sm uppercase tracking-[0.3em] mb-6 -mt-4">
                    Page not found
                </p>

                {/* Message */}
                <h1 className="font-display text-white text-3xl md:text-5xl font-medium max-w-xl leading-tight mb-4">
                    You wandered off the map.
                </h1>
                <p className="font-body text-gray-500 text-base md:text-lg max-w-md mb-12">
                    The page you are looking for does not exist or has been moved. Let&apos;s get you back.
                </p>

                {/* CTA Button */}
                <Link
                    href="/"
                    aria-label="Go back to the homepage"
                    className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-display text-sm font-bold tracking-widest hover:bg-[#00ff87] transition-colors duration-300"
                >
                    BACK TO HOME
                    <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </main>
    );
}
