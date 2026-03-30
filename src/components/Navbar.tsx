"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styled from "styled-components";
import Image from "next/image";
import { User, Code, Layout, Mail, LucideIcon } from "lucide-react";

interface NavLink {
    label: string;
    href: string;
    icon: LucideIcon;
}

const links: NavLink[] = [
    { label: "About", href: "#about", icon: User },
    { label: "Skills", href: "#skills", icon: Layout },
    { label: "Services", href: "#services", icon: Code },
    { label: "Portfolio", href: "#portfolio", icon: Layout },
    { label: "Contact", href: "#cta", icon: Mail },
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
            color: "#ffffffff",
        });
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("http")) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const top = (target as HTMLElement).offsetTop;
            window.scrollTo({
                top: top - 80, // Offset for navbar height
                behavior: "smooth",
            });
        }
    };

    return (
        <>
            <div
                className="fixed z-50 left-0 right-0 top-0"
                style={{
                    padding: scrolled ? "12px 64px" : "0px",
                    transition: "padding 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    ref={navRef}
                    style={{
                        borderRadius: scrolled ? "36px" : "0px",
                        background: scrolled
                            ? "rgba(36, 46, 68, 0.75)"
                            : "transparent",
                        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
                        WebkitBackdropFilter: scrolled
                            ? "blur(24px) saturate(180%)"
                            : "none",
                        border: scrolled
                            ? "1px solid rgba(248, 237, 237, 0.06)"
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
                                className="block"
                            >
                                <Image 
                                    src="/assets/images/sm.webp" 
                                    alt="SM Logo" 
                                    width={140} 
                                    height={40}
                                    className="object-contain"
                                />
                            </a>
                        </div>

                        {/* magnet links with icons */}
                        <div className="hidden md:flex items-center gap-8">
                            {links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    onClick={(e) => scrollToSection(e, link.href)}
                                    className="nav-link opacity-0 flex items-center gap-2 relative group px-2 py-1"
                                    style={{ color: "#ffffff" }}
                                    onMouseMove={handleMouseMove}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.color = "#00ff87";
                                    }}
                                >
                                    <link.icon className="w-4 h-4 pointer-events-none" />
                                    <span className="font-mono text-xs tracking-widest uppercase pointer-events-none">
                                        {link.label}
                                    </span>
                                    
                                    {/* underline effect */}
                                    <span
                                        className="absolute -bottom-1 left-0 h-px w-0 group-hover:w-full transition-all duration-300 pointer-events-none"
                                        style={{ background: "#00ff87" }}
                                    />
                                </a>
                            ))}
                        </div>

                        {/* FIXED CTA */}
                        <div ref={ctaRef} className="opacity-0 hidden md:block">
                            <a 
                                href="https://wa.me/923146536063" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ display: "inline-block", textDecoration: "none" }}
                            >
                                <StyledWrapper>
                                    <button className="button">
                                        <span className="shadow" />
                                        <span className="edge" />
                                        <div className="front">
                                            <span>Hire Me</span>
                                        </div>
                                    </button>
                                </StyledWrapper>
                            </a>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={menuOpen}
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

            {/* PREMIUM MOBILE MENU — full screen overlay */}
            <div
                className="fixed inset-0 z-40 md:hidden"
                style={{
                    background: "#080808",
                    opacity: menuOpen ? 1 : 0,
                    pointerEvents: menuOpen ? "all" : "none",
                    transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)",
                }}
            >
                {/* Radial glow accent */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(0,255,135,0.05) 0%, transparent 70%)",
                    }}
                />

                {/* Top bar inside menu with logo */}
                <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/[0.05]">
                    <span className="font-mono text-xs tracking-[0.3em] text-[#00ff87] uppercase">Menu</span>
                    <span className="font-mono text-xs text-gray-600">{String(links.length).padStart(2, "0")} links</span>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col px-6 pt-8">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            onClick={(e) => {
                                setMenuOpen(false);
                                scrollToSection(e, link.href);
                            }}
                            className="flex items-center justify-between py-6 border-b border-white/[0.06] group"
                            style={{
                                transform: menuOpen ? "translateX(0)" : "translateX(-30px)",
                                opacity: menuOpen ? 1 : 0,
                                transition: `transform 0.5s cubic-bezier(0.4,0,0.2,1) ${i * 80}ms, opacity 0.4s ease ${i * 80}ms`,
                            }}
                        >
                            <div className="flex items-center gap-5">
                                <span
                                    className="font-mono text-xs"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className="font-display font-medium transition-colors duration-200 group-hover:text-[#00ff87]"
                                    style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", color: "#ededed" }}
                                >
                                    {link.label}
                                </span>
                            </div>
                            <link.icon
                                className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ color: "#00ff87" }}
                            />
                        </a>
                    ))}
                </div>

                {/* Bottom hire line */}
                <div className="absolute bottom-12 left-6 right-6 flex items-center justify-between">
                    <span className="font-mono text-xs text-gray-600 tracking-widest uppercase">Available for work</span>
                    <a
                        href="https://wa.me/923146536063"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-[#00ff87] tracking-widest uppercase hover:underline"
                    >
                        Hire Me →
                    </a>
                </div>
            </div>
        </>
    );
}

const StyledWrapper = styled.div`
  .button {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    outline: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Shadow layer */
  .button .shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    transform: translateY(2px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  /* Edge layer */
  .button .edge {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: linear-gradient(
      to left,
      hsl(217, 33%, 16%) 0%,
      hsl(217, 33%, 32%) 8%,
      hsl(217, 33%, 32%) 92%,
      hsl(217, 33%, 16%) 100%
    );
  }

  /* Front layer */
  .button .front {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 24px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: white;
    background: hsl(217, 33%, 17%);
    border-radius: 8px;
    transform: translateY(-4px);
    transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
  }

  /* Hover and active states */
  .button:hover .shadow {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .button:hover .front {
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  .button:active .shadow {
    transform: translateY(1px);
    transition: transform 34ms;
  }

  .button:active .front {
    transform: translateY(-2px);
    transition: transform 34ms;
  }

  /* Disable text selection */
  .button .front span {
    user-select: none;
  }`;