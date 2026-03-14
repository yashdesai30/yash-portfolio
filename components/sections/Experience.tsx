"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { experience } from "@/data/experience";

export function Experience() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOrb1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yOrb2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yOrb3 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={containerRef} className="relative z-20 -mt-[100vh] w-full overflow-hidden pb-24">
      
      {/* Seamless Blending Curtain */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-transparent to-bg z-10 pointer-events-none" />
      <div className="absolute top-[40vh] bottom-0 left-0 w-full bg-bg -z-10" />

      {/* Ambient Parallax Background Orbs — Only on desktop for performance */}
      {mounted && !isMobile && (
        <>
          <motion.div style={{ y: yOrb1 }} className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none -z-5" />
          <motion.div style={{ y: yOrb2 }} className="absolute top-[50%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-secondary/5 blur-[100px] pointer-events-none -z-5" />
          <motion.div style={{ y: yOrb3 }} className="absolute bottom-[-10%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-accent-primary/5 blur-[80px] pointer-events-none -z-5" />
        </>
      )}

      <div className="relative z-10 pt-[30vh]">
        <SectionWrapper
          id="experience"
          title="Where I've Worked"
          subtitle="My professional journey in building scalable systems and AI platforms."
        >
          <div className="relative max-w-4xl mx-auto mt-8 md:mt-16">
            
            {/* Animated Timeline Line — Left on mobile, center on desktop */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary/60 via-accent-secondary/30 to-transparent origin-top md:-translate-x-1/2"
            />

            <div className="space-y-8 md:space-y-20 relative">
              {experience.map((exp, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: isMobile ? 20 : 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.5, delay: isMobile ? 0 : index * 0.08, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    
                    {/* Glowing Timeline Node — shows on both mobile and desktop */}
                    <motion.div 
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.4, delay: isMobile ? 0.1 : index * 0.08 + 0.25 }}
                      style={{ willChange: "transform, opacity" }}
                      className="absolute left-[18px] md:left-1/2 w-3 h-3 mt-5 md:mt-0 rounded-full bg-accent-primary border-[3px] border-bg md:-translate-x-1/2 -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(79,142,247,0.9)]" 
                    />

                    {/* Content Card — offset right of the timeline on mobile */}
                    <div className={`w-full pl-10 md:pl-0 md:w-[calc(50%-2rem)] ${
                      isEven ? "md:mr-auto md:pr-8 lg:pr-12" : "md:ml-auto md:pl-8 lg:pl-12"
                    }`}>
                      
                      <Card className="p-5 md:p-8 hover:border-accent-primary/30 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(79,142,247,0.05)]">
                        <h3 className="text-base md:text-xl font-bold text-text-primary leading-tight">
                          {exp.role}
                        </h3>
                        <h4 className="text-sm md:text-base text-accent-primary font-semibold mt-0.5 mb-0.5">
                          {exp.company}
                        </h4>
                        <span className="text-[10px] md:text-xs text-text-muted font-mono block mb-4 uppercase tracking-wider">
                          {exp.period}
                        </span>

                        {/* Responsibilities — simplified animation on mobile */}
                        <ul className="space-y-2 mb-4 text-left">
                          {exp.highlights.map((item, i) => (
                            <motion.li 
                              key={i} 
                              initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -15 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-20px" }}
                              transition={{ duration: 0.3, delay: isMobile ? 0 : i * 0.07 }}
                              style={!isMobile ? { willChange: "transform, opacity" } : {}}
                              className="text-text-secondary text-xs md:text-sm leading-relaxed flex items-start gap-2 group-hover:text-text-primary/90 transition-colors"
                            >
                              <span className="text-accent-primary flex-shrink-0 mt-0.5">▹</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>

                        {/* Tech Stack — pop-in badges */}
                        <div className="flex flex-wrap gap-1.5 md:gap-2 pt-3 border-t border-border/50">
                          {exp.tech.map((tech, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0.8, opacity: 0 }}
                              whileInView={{ scale: 1, opacity: 1 }}
                              viewport={{ once: true, margin: "-20px" }}
                              transition={{ duration: 0.2, delay: isMobile ? 0 : i * 0.04 }}
                              style={{ willChange: "transform, opacity" }}
                            >
                              <Badge variant="outline" className="bg-surface text-[10px] md:text-xs px-2 py-0.5">
                                {tech}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                      
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>
      </div>
      
      {/* Seamless Blending Gradient to Next Section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
