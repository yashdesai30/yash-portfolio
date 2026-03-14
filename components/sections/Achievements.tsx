"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { achievements } from "@/data/achievements";

// Simple counter hook for the stat animations
function useCounter(target: number, duration: number = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    const calculatedStep = Math.max(Math.floor(end / (totalMiliseconds / incrementTime)), 1);

    const timer = setInterval(() => {
      start += calculatedStep;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, isInView]);

  return { count, ref };
}

interface StatItemProps {
  end: number;
  suffix: string;
  label: string;
}

function StatItem({ end, suffix, label }: StatItemProps) {
  const { count, ref } = useCounter(end, 2);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 md:p-6 text-center space-y-2">
      <div className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary">
        {count}
        {suffix}
      </div>
      <div className="text-xs md:text-base font-medium text-text-secondary uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function Achievements() {
  const stats = [
    { end: 4, suffix: "+", label: "Years Experience" },
    { end: 40, suffix: "+", label: "Features Delivered" },
    { end: 50, suffix: "+", label: "Bugs Resolved" },
    { end: 1, suffix: "", label: "Hackathon Won" },
  ];

  return (
    <SectionWrapper
      id="achievements"
      title="Recognitions & Impact"
      subtitle="Awards and milestones from my professional and community involvement."
    >
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Achievement Cards — full width grid, no 3D trophy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="p-5 md:p-6 h-full flex flex-col hover:border-accent-primary/50 transition-colors group bg-surface/80 backdrop-blur-md">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-bg border border-border flex items-center justify-center mb-4 text-accent-primary group-hover:scale-110 group-hover:bg-accent-primary/10 transition-all duration-300 shadow-sm">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2 text-text-primary tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="p-2 border-border/50 bg-bg">
            <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-y-0 divide-border">
              {stats.map((stat, i) => (
                <div key={i} className={`${i < 2 ? 'border-b-0' : ''} md:border-b-0`}>
                  <StatItem {...stat} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
