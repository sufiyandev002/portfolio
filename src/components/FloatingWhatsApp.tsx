"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delayed appearance after 2.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isVisible && buttonRef.current) {
            // Initial fade up animation
            gsap.fromTo(
                buttonRef.current,
                { 
                    opacity: 0, 
                    y: 40, 
                    scale: 0.8 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1, 
                    duration: 1.5, 
                    ease: "power4.out" 
                }
            );

            // Continuous gentle floating animation
            gsap.to(buttonRef.current, {
                y: -12,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <a
            ref={buttonRef}
            href="https://wa.me/923091761099"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact on WhatsApp"
            className="fixed bottom-8 right-8 z-[100] group"
        >
            <div 
                className="relative p-4 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 active:scale-95"
                style={{
                    background: "rgba(18, 18, 18, 0.8)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.44)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
            >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{ background: "radial-gradient(circle, rgba(0,255,135,0.2) 0%, transparent 70%)" }}
                />

                <MessageCircle className="w-6 h-6 text-[#ededed] relative z-10 transition-colors duration-300 group-hover:text-[#00ff87]" />
                
                {/* Presence indicator */}
                <span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-[#00ff87] rounded-full border-2 border-[#121212] z-20" />
            </div>

            {/* Tooltip */}
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-[#121212] border border-white/100 text-white text-[10px] font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none whitespace-nowrap">
                WhatsApp Me
            </span>
        </a>
    );
}
