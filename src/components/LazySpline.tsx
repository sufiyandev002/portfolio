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
                // Invisible placeholder to hold the container structure while waiting
                <div className="absolute inset-0 bg-transparent" />
            )}
        </div>
    );
}
