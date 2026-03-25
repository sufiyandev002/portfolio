"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Stack", href: "#stack" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const navRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
            logoRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        )
            .fromTo(
                ".nav-link",
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out",
                    stagger: 0.08,
                },
                "-=0.4"
            )
            .fromTo(
                ctaRef.current,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );

        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        gsap.to(e.currentTarget, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            color: "#6b7280",
        });
    };

    return (
        <>
            <div
                className="fixed z-50 left-0 right-0 top-0"
                style={{
                    padding: scrolled ? "12px 16px" : "0px",
                    transition: "padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    ref={navRef}
                    style={{
                        borderRadius: scrolled ? "16px" : "0px",
                        background: scrolled
                            ? "rgba(12, 12, 12, 0.75)"
                            : "transparent",
                        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                        WebkitBackdropFilter: scrolled
                            ? "blur(24px) saturate(180%)"
                            : "none",
                        border: scrolled
                            ? "1px solid rgba(255, 255, 255, 0.06)"
                            : "1px solid transparent",
                        boxShadow: scrolled
                            ? "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)"
                            : "none",
                        padding: scrolled ? "14px 28px" : "28px 0",
                        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <div
                        className="max-w-7xl mx-auto flex items-center justify-between"
                        style={{
                            padding: scrolled ? "0" : "0 24px",
                            transition: "padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        {/* FIXED LOGO */}
                        <div ref={logoRef} className="opacity-0">
                            <a
                                href="/"
                                className="font-display font-bold text-xl tracking-tight"
                                style={{ color: "#ededed" }}
                            >
                                SM
                                <span style={{ color: "#00ff87" }}>.</span>
                            </a>
                        </div>

                        {/* FIXED LINKS */}
                        <div className="hidden md:flex items-center gap-8">
                            {links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="nav-link opacity-0 relative font-mono text-xs tracking-widest uppercase group"
                                    style={{ color: "#6b7280" }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.color = "#ededed";
                                    }}
                                >
                                    {link.label}
                                    <span
                                        className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                                        style={{ background: "#00ff87" }}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* FIXED CTA */}
                        <div ref={ctaRef} className="opacity-0 hidden md:block">
                            <a
                                href="#contact"
                                className="font-mono text-xs tracking-widest uppercase"
                                style={{
                                    padding: "10px 24px",
                                    border: "1px solid rgba(0,255,135,0.3)",
                                    color: "#00ff87",
                                    borderRadius: "4px",
                                    transition: "all 0.3s ease",
                                    display: "inline-block",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.background =
                                        "rgba(0,255,135,0.08)";
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        "#00ff87";
                                    (e.currentTarget as HTMLElement).style.boxShadow =
                                        "0 0 20px rgba(0,255,135,0.15)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.background =
                                        "transparent";
                                    (e.currentTarget as HTMLElement).style.borderColor =
                                        "rgba(0,255,135,0.3)";
                                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                                }}
                            >
                                Hire Me
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                            style={{ cursor: "none", background: "none", border: "none" }}
                        >
                            <span style={{
                                width: "24px", height: "1px", background: "#ededed",
                                transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none"
                            }} />
                            <span style={{
                                width: "24px", height: "1px", background: "#ededed",
                                opacity: menuOpen ? 0 : 1
                            }} />
                            <span style={{
                                width: "24px", height: "1px", background: "#ededed",
                                transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none"
                            }} />
                        </button>
                    </div>
                </div>
            </div>

            {/* FIXED MOBILE MENU */}
            <div
                className="fixed inset-0 z-40 md:hidden flex flex-col justify-center items-center gap-10"
                style={{
                    background: "#080808",
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "all" : "none",
                    transition: "opacity 0.4s ease",
                }}
            >
                {links.map((link, i) => (
                    <a
                        key={i}
                        href={link.href}
                        className="font-display font-bold"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 3.5rem)",
                            color: "#ededed",
                        }}
                        onClick={() => setMenuOpen(false)}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#00ff87";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#ededed";
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </>
    );
}