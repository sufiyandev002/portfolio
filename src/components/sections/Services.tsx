"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Website development",
        number: "01",
        index: 0,
        techs: [
            "Angular Website Development",
            "Node.js Website Development",
            "Vue.js Website Development",
            "Laravel Website Development",
            "React Website Development",
            "WordPress Website Development",
        ],
        image: "/assets/services/website-development-service.webp",
    },
    {
        title: "Frame works",
        number: "02",
        index: 1,
        techs: [
            "Laravel",
            "React.js",
            "Node.js",
            "CodeIgniter",
            "Tailwind CSS",
            "Bootstrap",
        ],
        image: "/assets/services/frameworks.webp",
    },
    {
        title: "CRM system",
        number: "03",
        index: 2,
        techs: [
            "Custom CRM Architecture",
            "Salesforce Integration",
            "HubSpot Setup",
            "Automated Workflows",
            "Data Migration Strategy",
            "Customer Portals",
        ],
        image: "/assets/services/crm-systems.webp",
    },
    {
        title: "E-commerce",
        number: "04",
        index: 3,
        techs: [
            "Wordpress Custom Themes",
            "WooCommerce Scaling",
            "Headless E-commerce",
            "Payment Gateway Integration",
            "Inventory Management",
            "Cart Optimization",
        ],
        image: "/assets/services/ecommerce.webp",
    },
    {
        title: "AI Solutions",
        number: "05",
        index: 4,
        techs: [
            "LLM Integration",
            "Vector Databases Setup",
            "Predictive Analytics",
            "Custom AI Agent Development",
            "NLP Pipelines",
            "ML Model Deployment",
        ],
        image: "/assets/services/ai-solutions.webp",
    },
];

// Scale lines: nth bar is bright, rest are dim — based on service index (0-based)
const ScaleLines = ({ serviceIndex, isExpanded }: { serviceIndex: number; isExpanded: boolean }) => {
    const totalBars = 8;
    // How many bars are "lit" = serviceIndex + 1 (service 01 = 1 lit, 02 = 2 lit, etc.)
    const litCount = serviceIndex + 1;

    return (
        <div className="flex items-end gap-[5px] ml-5">
            {[...Array(totalBars)].map((_, i) => {
                const isLit = i < litCount;
                return (
                    <div
                        key={i}
                        className="w-[2px] rounded-full transition-all duration-500 ease-out"
                        style={{
                            height: isLit ? "14px" : "8px",
                            background: isLit
                                ? isExpanded
                                    ? "#00ff87"
                                    : "rgba(255,255,255,0.9)"
                                : "rgba(255,255,255,0.15)",
                            boxShadow: isLit && isExpanded ? "0 0 6px #00ff87" : "none",
                            transitionDelay: `${i * 30}ms`,
                        }}
                    />
                );
            })}
        </div>
    );
};

export default function Services() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading fade up
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 88%",
                    },
                }
            );

            // Each row fades up on scroll
            rowRefs.current.forEach((row, i) => {
                if (!row) return;
                gsap.fromTo(
                    row,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        delay: i * 0.05,
                        scrollTrigger: {
                            trigger: row,
                            start: "top 88%",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="bg-[#080808] w-full lg:pb-48 border-t border-white/[0.02]"
        >
            <div className="max-w-[1800px] mx-auto px-6 lg:px-16">

                {/* Heading */}
                <div ref={headingRef} style={{ opacity: 0 }}>
                    <h2
                        className="font-display font-medium text-white mb-20 uppercase tracking-tighter"
                        style={{ fontSize: "clamp(4rem, 12vw, 8rem)", lineHeight: 1 }}
                    >
                        Services
                    </h2>
                </div>

                {/* Accordion */}
                <div className="border-t border-white/10">
                    {services.map((service, index) => {
                        const isExpanded = expandedIndex === index;

                        return (
                            <div
                                key={index}
                                ref={el => { rowRefs.current[index] = el; }}
                                className="border-b border-white/10 group"
                                style={{ opacity: 0 }}
                            >
                                {/* Header Row */}
                                <div
                                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                                    className="flex items-center justify-between py-8 md:py-10 cursor-pointer select-none"
                                >
                                    <div className="flex items-center gap-6 md:gap-8">
                                        <ArrowDownRight
                                            size={28}
                                            className="text-white flex-shrink-0"
                                            style={{
                                                transform: isExpanded ? "rotate(-90deg)" : "rotate(0deg)",
                                                color: isExpanded ? "#00ff87" : undefined,
                                                transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1), color 0.3s ease",
                                            }}
                                        />
                                        <h3
                                            className="font-display font-medium transition-colors duration-300"
                                            style={{
                                                fontSize: "clamp(1.6rem, 4vw, 3rem)",
                                                color: isExpanded ? "#ffffff" : "rgba(255,255,255,0.75)",
                                            }}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Number + Scale Lines */}
                                    <div className="flex items-center">
                                        <span
                                            className="font-mono text-xl transition-colors duration-300"
                                            style={{ color: isExpanded ? "#00ff87" : "rgba(255,255,255,0.5)" }}
                                        >
                                            {service.number}
                                        </span>
                                        <div className="hidden sm:block">
                                            <ScaleLines serviceIndex={index} isExpanded={isExpanded} />
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <div
                                    className="grid transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                                    style={{ gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="flex flex-col lg:flex-row justify-between pt-4 pb-14 gap-12 lg:gap-24 pl-14 md:pl-16">

                                            {/* Left: Tech Grid + CTA */}
                                            <div className="w-full lg:w-1/2 flex flex-col justify-between">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12 lg:mb-0">
                                                    {service.techs.map((tech, i) => (
                                                        <div key={i} className="flex items-start gap-3 group/tech cursor-default">
                                                            <span
                                                                className="text-[10px] mt-[6px] transition-colors duration-200 group-hover/tech:text-[#00ff87]"
                                                                style={{ color: "rgba(255,255,255,0.3)" }}
                                                            >
                                                                ○
                                                            </span>
                                                            <span
                                                                className="font-body text-base transition-colors duration-200 group-hover/tech:text-white"
                                                                style={{ color: "rgba(255,255,255,0.5)" }}
                                                            >
                                                                {tech}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex items-center gap-4 mt-8">
                                                    <button aria-label={`View details for ${service.title}`} className="bg-white hover:bg-[#00ff87] text-black px-8 py-4 rounded-full font-display text-sm font-bold tracking-widest transition-colors duration-300 cursor-pointer">
                                                        VIEW SERVICE DETAILS
                                                    </button>
                                                    <button aria-label={`Explore ${service.title} service`} className="bg-white hover:bg-[#00ff87] text-black w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer group/btn">
                                                        <ArrowUpRight size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Right: Image */}
                                            <div className="w-full lg:w-1/2 h-48 sm:h-50 sm:w-full lg:h-[400px] relative overflow-hidden shadow-2xl rounded-2xl">
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover transition-transform duration-1000 ease-out"
                                                    style={{ transform: isExpanded ? "scale(1)" : "scale(1.08)" }}
                                                />
                                                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}