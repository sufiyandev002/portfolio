"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardList, Layers, Code2, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function StepCard({ step, active, isMobile }: { step: any; active: boolean; isMobile: boolean }) {
    const Icon = step.icon;

    return (
        <div
            className="absolute"
            style={{
                top: isMobile ? step.mobilePosition.top : step.position.top,
                left: isMobile ? step.mobilePosition.left : step.position.left,
                transform: "translate(-50%, -50%)",
                zIndex: 20,
                transition: "all 0.6s ease",
                filter: active ? "none" : "grayscale(1) brightness(0.3)",
            }}
        >
            <div className={`how-card-container ${active ? "active" : ""}`}>

                {/* Tooltip */}
                <div className="how-tooltip">
                    <div style={{
                        background: "#13141a",
                        border: `1px solid ${step.color}30`,
                        borderRadius: "14px",
                        padding: "14px",
                        width: "210px",
                        boxShadow: `0 0 30px ${step.color}15, inset 3px 3px 6px rgba(0,0,0,0.3), 6px 6px 20px rgba(0,0,0,0.5)`,
                    }}>
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
                            <div style={{
                                width: "38px", height: "38px", borderRadius: "10px",
                                border: `1px solid ${step.color}60`, background: `${step.color}15`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, boxShadow: `0 0 14px ${step.color}30`,
                            }}>
                                <Icon size={18} color={step.color} />
                            </div>
                            <div>
                                <div style={{ fontSize: "14px", fontWeight: 700, color: step.color }}>
                                    {step.title}
                                </div>
                                <div style={{ fontSize: "10px", color: "rgba(255, 255, 255, 1)", letterSpacing: "0.12em", fontFamily: "monospace" }}>
                                    PHASE {step.number}
                                </div>
                            </div>
                        </div>
                        <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 1)", lineHeight: 1.6, margin: 0 }}>
                            {step.description}
                        </p>
                    </div>
                </div>

                {/* Layered icon */}
                <div
                    className="how-layer-icon"
                    style={{
                        boxShadow: active ? `0 0 30px ${step.color}40` : "none",
                        transition: "box-shadow 0.6s ease",
                        borderRadius: "14px",
                    }}
                >
                    <span style={{ borderColor: `${step.color}20` }} />
                    <span style={{ borderColor: `${step.color}40` }} />
                    <span style={{ borderColor: `${step.color}60` }} />
                    <span style={{ borderColor: `${step.color}80` }} />
                    <span style={{
                        background: active ? `${step.color}18` : "rgba(255,255,255,0.03)",
                        borderColor: active ? step.color : "rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: active ? `0 0 20px ${step.color}50, inset 0 0 10px ${step.color}10` : "none",
                        transition: "all 0.6s ease",
                    }}>
                        <Icon size={24} color={active ? step.color : "rgba(255,255,255,0.2)"} />
                    </span>
                </div>

                {/* Label */}
                <div className="how-icon-label" style={{ color: step.color }}>
                    {step.title}
                </div>
            </div>
        </div>
    );
}

export default function HowIWork() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const steps = useMemo(() => [
        {
            title: "Planning",
            description: "Defining project goals, wireframing, and creating a solid roadmap.",
            icon: ClipboardList,
            color: "#00ff87",
            number: "01",
            position: { top: "65%", left: "10%" },
            mobilePosition: { top: "20%", left: "50%" },
            activateAt: 0.0,
            mobileActivateAt: 0.05,
        },
        {
            title: "Architecture",
            description: "Defining project goals, wireframing, and creating a solid roadmap.",
            icon: Layers,
            color: "#60efff",
            number: "02",
            position: { top: "40%", left: "30%" },
            mobilePosition: { top: "40%", left: "50%" },
            activateAt: 0.26,
            mobileActivateAt: 0.30,
        },
        {
            title: "Development",
            description: "Bringing designs to life with clean, efficient, and modern code.",
            icon: Code2,
            color: "#60efff",
            number: "03",
            position: { top: "60%", left: "65%" },
            mobilePosition: { top: "60%", left: "50%" },
            activateAt: 0.69,
            mobileActivateAt: 0.55,
        },
        {
            title: "Deployment",
            description: "Launching to production with continuous monitoring and updates.",
            icon: Rocket,
            color: "#00ff87",
            number: "04",
            position: { top: "75%", left: "90%" },
            mobilePosition: { top: "80%", left: "50%" },
            activateAt: 0.98,
            mobileActivateAt: 0.80,
        },
    ], []);

    const svgStops = useMemo(() => isMobile ? [
        { cx: 250, cy: 150 },
        { cx: 250, cy: 450 },
        { cx: 250, cy: 750 },
        { cx: 250, cy: 1050 },
    ] : [
        { cx: -280, cy: 610 },
        { cx: 100, cy: 400 },
        { cx: 800, cy: 600 },
        { cx: 1300, cy: 750 },
    ], [isMobile]);

    // Geometric Circuit Path - Manhattan with 45-deg chamfers
    const PATH = useMemo(() => {
        if (isMobile) {
            return `
                M 250,100
                L 250,225
                L 200,275 L 200,325 L 250,375
                L 250,525
                L 300,575 L 300,625 L 250,675
                L 250,825
                L 200,875 L 200,925 L 250,975
                L 250,1150
            `.replace(/\s+/g, " ").trim();
        }
        return `
            M -280,650 
            L -140,650 
            L -30,650 L 20,600 L 20,450 L 70,400 L 180,400
            L 350,400 L 400,450 L 400,550 L 450,600 L 740,600
            L 900,600 L 950,650 L 950,700 L 1000,750 L 1300,750
        `.replace(/\s+/g, " ").trim();
    }, [isMobile]);

    const containerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const dotRef = useRef<SVGCircleElement>(null);
    const dotGlowRef = useRef<SVGCircleElement>(null);
    const activeRef = useRef<boolean[]>([false, false, false, false]);
    const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false]);

    useEffect(() => {
        const path = pathRef.current;
        const dot = dotRef.current;
        const dotGlow = dotGlowRef.current;
        const container = containerRef.current;
        const sticky = stickyRef.current;
        if (!path || !dot || !dotGlow || !container || !sticky) return;

        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.set([dot, dotGlow], { opacity: 0 });

        const st = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "+=300%",
            pin: sticky,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const p = self.progress;

                path.style.strokeDashoffset = String(length * (1 - p));

                if (p > 0.01) {
                    const pt = path.getPointAtLength(Math.min(p * length, length - 0.1));
                    dot.setAttribute("cx", String(pt.x));
                    dot.setAttribute("cy", String(pt.y));
                    dotGlow.setAttribute("cx", String(pt.x));
                    dotGlow.setAttribute("cy", String(pt.y));
                    dot.style.opacity = "1";
                    dotGlow.style.opacity = "1";
                } else {
                    dot.style.opacity = "0";
                    dotGlow.style.opacity = "0";
                }

                const next = steps.map((s: any) => p >= (isMobile ? s.mobileActivateAt : s.activateAt));
                const changed = next.some((v, i) => v !== activeRef.current[i]);
                if (changed) {
                    activeRef.current = next;
                    setActiveSteps([...next]);
                }
            },
        });

        return () => { st.kill(); };
    }, [steps]);

    return (
        <>
            <style>{`
                .how-card-container { position: relative; cursor: pointer; }

                .how-tooltip {
                    position: absolute;
                    bottom: calc(100% + 14px);
                    left: 50%;
                    transform: translateX(-50%);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s ease, bottom 0.3s ease;
                    z-index: 999;
                }
                .how-card-container.active .how-tooltip {
                    opacity: 1;
                    bottom: calc(100% + 20px);
                    pointer-events: auto;
                }

                .how-layer-icon {
                    position: relative;
                    width: 60px;
                    height: 60px;
                    transition: transform 0.35s ease;
                }
                .how-card-container.active .how-layer-icon {
                    transform: rotate(-35deg) skew(20deg);
                }
                .how-layer-icon span {
                    position: absolute;
                    inset: 0;
                    border: 1px solid;
                    border-radius: 14px;
                    transition: all 0.3s ease;
                }
                .how-card-container.active .how-layer-icon span:nth-child(1) { opacity: 0.2; }
                .how-card-container.active .how-layer-icon span:nth-child(2) { opacity: 0.4; transform: translate(5px,-5px); }
                .how-card-container.active .how-layer-icon span:nth-child(3) { opacity: 0.6; transform: translate(10px,-10px); }
                .how-card-container.active .how-layer-icon span:nth-child(4) { opacity: 0.8; transform: translate(15px,-15px); }
                .how-card-container.active .how-layer-icon span:nth-child(5) { opacity: 1;   transform: translate(20px,-20px); }

                .how-icon-label {
                    position: absolute;
                    left: 50%;
                    bottom: -4px;
                    transform: translateX(-50%);
                    opacity: 0;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.2em;
                    white-space: nowrap;
                    // font-family: monospace;
                    transition: bottom 0.3s ease, opacity 0.3s ease;
                    pointer-events: none;
                }
                .how-card-container.active .how-icon-label {
                    bottom: -26px;
                    opacity: 1;
                }

                @keyframes dotPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.6; }
                }
                .path-dot { animation: dotPulse 1.5s ease-in-out infinite; }
            `}</style>

            <div
                ref={containerRef}
                className="relative w-full bg-[#080808] border-t border-white/[0.02]"
                id="how-i-work"
            >
                <div
                    ref={stickyRef}
                    className="relative w-full h-screen overflow-hidden"
                >
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                        <span
                            className="font-display font-black text-white uppercase tracking-tighter leading-none"
                            style={{ fontSize: "clamp(5rem, 18vw, 16rem)", opacity: 0.3 }}
                        >
                            WORKFLOW
                        </span>
                    </div>

                    {/* SVG */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 10 }}
                        viewBox={isMobile ? "0 0 500 1200" : "-300 0 1600 1000"}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient id="howLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00ff87" />
                                <stop offset="100%" stopColor="#60efff" />
                            </linearGradient>
                            <filter id="howDotGlow" x="-100%" y="-100%" width="300%" height="300%">
                                <feGaussianBlur stdDeviation="5" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Faint guide */}
                        <path
                            d={PATH}
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="1"
                            strokeDasharray="6 8"
                        />

                        {/* Animated line */}
                        <path
                            ref={pathRef}
                            d={PATH}
                            fill="none"
                            stroke="url(#howLineGrad)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            opacity="0.8"
                        />

                        {/* Glow halo */}
                        <circle
                            ref={dotGlowRef}
                            r="14"
                            fill="rgba(0,255,135,0.12)"
                            cx={svgStops[0].cx}
                            cy={svgStops[0].cy}
                        />

                        {/* Core dot */}
                        <circle
                            ref={dotRef}
                            className="path-dot"
                            r="5"
                            fill="#00ff87"
                            filter="url(#howDotGlow)"
                            cx={svgStops[0].cx}
                            cy={svgStops[0].cy}
                        />
                    </svg>

                    {/* Cards */}
                    <div className="absolute inset-0" style={{ zIndex: 20 }}>
                        {steps.map((step, i) => (
                            <StepCard key={step.title} step={step} active={activeSteps[i]} isMobile={isMobile} />
                        ))}
                    </div>

                    {/* Fades */}
                    <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-30"
                        style={{ background: "linear-gradient(to bottom, #080808, transparent)" }} />
                    <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-30"
                        style={{ background: "linear-gradient(to top, #080808, transparent)" }} />
                </div>
            </div>
        </>
    );
}