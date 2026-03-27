"use client";

import { useEffect, useRef, useState } from "react";
import Spline from "@splinetool/react-spline";

interface LazySplineProps {
    scene: string;
}

export default function LazySpline({ scene }: LazySplineProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Once loaded, we keep it loaded to avoid re-rendering/flickering
                    observer.disconnect(); 
                }
            },
            // Load the Spline model when it is 800px away from the viewport
            { rootMargin: "800px" } 
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

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
