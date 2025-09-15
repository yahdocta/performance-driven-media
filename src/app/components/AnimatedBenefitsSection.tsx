"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock3, BarChart3, BadgeDollarSign } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

type Benefit = {
    title: string;
    description: string;
    icon: string;
};

type AnimatedBenefitsSectionProps = {
    benefits: Benefit[];
};

export default function AnimatedBenefitsSection({ benefits }: AnimatedBenefitsSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const benefitRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            benefitRefs.current.forEach((ref, index) => {
                if (ref) {
                    gsap.fromTo(
                        ref,
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: index * 0.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: ref,
                                start: "top 85%",
                                end: "bottom 30%",
                                scrub: true,
                            },
                        }
                    );
                }
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="space-y-12 mb-8">
            {benefits.map((benefit, idx) => (
                <div
                    key={idx}
                    ref={el => benefitRefs.current[idx] = el}
                    className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 relative`}
                >
                    <div className="flex-1">
                        <div className="flex items-center mb-6">
                            {benefit.icon === 'clock' && <Clock3 size={48} strokeWidth={1.5} className="text-white mr-4" />}
                            {benefit.icon === 'chart' && <BarChart3 size={48} strokeWidth={1.5} className="text-white mr-4" />}
                            {benefit.icon === 'lightning' && <BadgeDollarSign size={48} strokeWidth={1.5} className="text-white mr-4" />}
                            <h3 className="text-3xl font-bold text-white">{benefit.title}</h3>
                        </div>
                        <p className="text-xl text-red-100 leading-relaxed">
                            {benefit.description}
                        </p>
                    </div>

                    <div className="flex-1 relative">
                        {/* Custom performance images */}
                        {benefit.icon === 'clock' ? (
                            // Engagement image
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <img
                                    src="/images/engagement.png"
                                    alt="Engagement"
                                    className="w-24 h-24 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ) : benefit.icon === 'chart' ? (
                            // Icon Performance image
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <img
                                    src="/images/icon performance.png"
                                    alt="Performance"
                                    className="w-24 h-24 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        ) : (
                            // Racecar image
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <img
                                    src="/images/racecar.png"
                                    alt="Racecar"
                                    className="w-24 h-24 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                                />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
