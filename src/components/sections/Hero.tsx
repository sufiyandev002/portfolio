"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import dynamic from "next/dynamic";
import Image from "next/image";
import GlitchText from "@/components/hero/GlitchText";
import MouseOrbs from "@/components/hero/MouseOrbs";

const GridFloor = dynamic(
    () => import("@/components/three/GridFloor"),
    { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const name1Ref = useRef<HTMLDivElement>(null);
    const name2Ref = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.4 });

            tl.fromTo(
                name1Ref.current,
                { opacity: 0, y: 100, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
            )
                .fromTo(
                    imageRef.current,
                    { opacity: 0, scale: 0.8, y: 50 },
                    { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" },
                    "-=0.8"
                )
                .fromTo(
                    name2Ref.current,
                    { opacity: 0, x: -100, filter: "blur(10px)" },
                    { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power4.out" },
                    "-=1"
                )
                .fromTo(
                    scrollRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: "power2.out" },
                    "-=0.2"
                );

            // Cinematic scroll exit
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            })
                .to(".hero-content", { y: -100, opacity: 0, ease: "none" })
                .to(overlayRef.current, { opacity: 1, ease: "none" }, 0)
                .to(sectionRef.current, { scale: 0.9, ease: "none" }, 0);

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            style={{ transformOrigin: "center top", background: "#080808" }}
        >
            {/* Grid floor 3D background */}
            <div className="absolute inset-0 z-0 w-full h-full">
                <GridFloor />
            </div>

            {/* Mouse orbs */}
            <MouseOrbs />

            {/* Scanline texture */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                    backgroundSize: "100% 4px",
                }}
            />

            {/* Bottom gradient fade */}
            <div
                className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "40%",
                    background:
                        "linear-gradient(to top, #080808 0%, transparent 100%)",
                }}
            />

            {/* Top gradient fade */}
            <div
                className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
                style={{
                    height: "20%",
                    background:
                        "linear-gradient(to bottom, #080808 0%, transparent 100%)",
                }}
            />

            {/* Side fades */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to right, #080808 0%, transparent 20%, transparent 80%, #080808 100%)",
                }}
            />

            {/* Scroll exit overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 z-20 pointer-events-none"
                style={{ background: "#080808", opacity: 0 }}
            />

            {/* Main content - Layered Names & Image */}
            <div className="hero-content absolute inset-0 z-30 pointer-events-none">

                {/* SUFIYAN - Background Layer (Backmost) */}
                <div
                    ref={name1Ref}
                    className="absolute opacity-0 select-none pointer-events-none flex items-center justify-center w-full"
                    style={{
                        zIndex: 1,
                        top: "25%",
                        left: "0",
                    }}
                >
                    <h1
                        className="font-display font-black leading-none tracking-tighter w-full text-center"
                        style={{
                            fontSize: "clamp(6rem, 22vw, 22rem)",
                            color: "#ffffff",
                            textShadow: "0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(255,255,255,0.2)",
                            opacity: 0.9,
                            letterSpacing: "-0.05em"
                        }}
                    >
                        SUFIYAN
                    </h1>
                </div>

                {/* User Image Layer (Middle) */}
                <div
                    ref={imageRef}
                    className="absolute inset-0 opacity-0 pointer-events-none flex items-center justify-center"
                    style={{ zIndex: 2 }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src="/assets/images/sufi.webp"
                            alt="Sufiyan Mirza"
                            fill
                            className="object-contain object-center brightness-[1.2] contrast-[1.1]"
                            priority
                        />
                    </div>
                </div>

                {/* MIRZA - Foreground Layer (Uppermost) */}
                <div
                    ref={name2Ref}
                    className="absolute opacity-0 select-none pointer-events-none flex items-center justify-center w-full"
                    style={{
                        zIndex: 3,
                        bottom: "8%",
                        left: "0",
                    }}
                >
                    <h2
                        className="font-display font-black leading-none tracking-tighter w-full text-center"
                        style={{
                            fontSize: "clamp(5rem, 16vw, 16rem)",
                            color: "#ededed",
                            WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                            background: "linear-gradient(135deg, #00ff87 30%, #60efff 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            filter: "drop-shadow(0 0 50px rgba(0,255,135,0.4))"
                        }}
                    >
                        MIRZA
                    </h2>
                </div>

            </div>

            {/* Scroll indicator */}
            <div
                ref={scrollRef}
                className="absolute opacity-0"
                style={{
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 50
                }}
            >
                <div className="flex flex-col items-center gap-2">
                    <div
                        style={{
                            width: "1px",
                            height: "40px",
                            background: "linear-gradient(to bottom, #00ff87, transparent)",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}