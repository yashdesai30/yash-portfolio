"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { skillsData } from "@/data/skills";

// Helper for the dot matrix proficiency indicator
const getProficiencyDots = (level: string) => {
  switch (level) {
    case "Expert": return 3;
    case "Proficient": return 2;
    case "Familiar": return 1;
    default: return 1;
  }
};

// The Spotlight Card Component
function SpotlightCard({ group, index }: { group: any; index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-3xl bg-surface border border-border/50 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spotlight Canvas */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(123, 97, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      {/* Border Highlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(123, 97, 255, 0.4),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative h-full p-8 flex flex-col z-10 bg-surface/80 backdrop-blur-sm rounded-3xl m-[1px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-bg/50 border border-border text-accent-secondary shadow-sm">
            <group.icon size={24} />
          </div>
          <h3 className="text-xl font-bold tracking-tight text-text-primary">
             {group.category}
          </h3>
        </div>

        {/* Skills List */}
        <div className="space-y-4 flex-grow">
          {group.skills.map((skill: any) => {
             const dots = getProficiencyDots(skill.level);
             return (
               <div key={skill.name} className="flex items-center justify-between group/skill">
                 <span className="text-text-secondary group-hover/skill:text-text-primary transition-colors font-medium">
                   {skill.name}
                 </span>
                 
                 {/* Dot Matrix Indicator */}
                 <div className="flex gap-1.5 items-center">
                   {[1, 2, 3].map((dotIndex) => (
                     <div 
                       key={dotIndex}
                       className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                         dotIndex <= dots 
                           ? "bg-accent-primary shadow-[0_0_5px_rgba(123,97,255,0.5)]" 
                           : "bg-border"
                       }`}
                     />
                   ))}
                   <span className="ml-2 w-16 text-right text-xs font-mono text-text-muted hidden sm:inline-block">
                     {skill.level}
                   </span>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <SectionWrapper
      id="skills"
      title="Technical Expertise"
      subtitle="The specialized toolkit I rely on to engineer robust, high-performance solutions."
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsData.map((group, index) => (
            <SpotlightCard key={group.category} group={group} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
