"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";

interface LazySplineProps {
    scene: string;
}

export default function LazySpline({ scene }: LazySplineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        // Detect mobile screen size (standard tablet/mobile breakpoint)
        const mql = window.matchMedia("(max-width: 767px)");
        const onChange = () => setIsMobile(mql.matches);
        
        // Initial check
        setIsMobile(mql.matches);
        
        mql.addEventListener("change", onChange);
        
        // Intersection observer for lazy loading on desktop
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Once loaded, we keep it loaded to avoid re-rendering/flickering
                    observer.disconnect(); 
                }
            },
            // Load the Spline model when it is 800px away from the viewport (desktop only)
            { rootMargin: "800px" } 
        );

        if (containerRef.current && !mql.matches) {
            observer.observe(containerRef.current);
        }

        return () => {
            mql.removeEventListener("change", onChange);
            observer.disconnect();
        };
    }, []);

    // If it's mobile or we're still determining, we don't render the Spline model.
    // This significantly saves performance and battery on mobile devices.
    if (isMobile === true) {
        return null;
    }

    return (
        <div ref={containerRef} className="w-full h-full relative">
            {isIntersecting ? (
                <Spline scene={scene} />
            ) : (
                // Pulsing skeleton placeholder while the Spline scene hasn't loaded yet
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="w-32 h-32 rounded-full animate-pulse"
                        style={{
                            background: "radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)",
                        }}
                    />
                </div>
            )}
        </div>
    );
}
