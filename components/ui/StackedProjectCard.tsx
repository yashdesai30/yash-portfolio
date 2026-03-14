"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { type Project } from "@/data/projects";

interface StackedProjectCardProps {
  project: Project;
  i: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
  onOpenModal: (project: Project) => void;
}

export function StackedProjectCard({ 
  project, 
  i, 
  progress, 
  range, 
  targetScale,
  onOpenModal 
}: StackedProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  
  // Calculate a slight top offset so each card stacks slightly lower than the one behind it
  const topOffset = `calc(4vh + ${i * 35}px)`;

  return (
    <div ref={containerRef} className="h-[90vh] flex items-center justify-center sticky top-0 px-3 sm:px-4 py-4 sm:py-8">
      <motion.div 
        style={{ 
          scale, 
          top: topOffset,
          willChange: "transform"
        }}
        className="relative flex flex-col md:flex-row w-full max-w-5xl rounded-3xl bg-surface border border-border overflow-hidden shadow-2xl origin-top cursor-pointer"
        onClick={() => onOpenModal(project)}
      >
        
        {/* Left Side: Content */}
        <div className="w-full md:w-1/2 p-5 sm:p-8 md:p-12 flex flex-col justify-between z-10 bg-surface/90 md:backdrop-blur-md">
          
          <div>
            <div className="flex justify-between items-start mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-bg border border-border flex items-center justify-center text-accent-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              
              <div className="flex gap-3">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-bg/50 border border-border border-transparent hover:border-accent-primary text-text-secondary hover:text-accent-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-full bg-bg/50 border border-border border-transparent hover:border-accent-primary text-text-secondary hover:text-accent-primary transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mb-3 sm:mb-4">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
              {project.description}
            </p>
          </div>

          <div>
            <div className="text-sm font-medium text-accent-secondary flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-secondary" />
              {project.impact}
            </div>

            <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-border/50">
              {project.tech.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="bg-bg/50 font-mono text-xs">
                  {tech}
                </Badge>
              ))}
              {project.tech.length > 4 && (
                <span className="text-xs text-text-muted self-center ml-2">
                  +{project.tech.length - 4} more
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Custom Project Graphic - visible on all screens but shorter on mobile */}
        <div className="relative w-full h-48 sm:h-56 md:w-1/2 md:h-auto overflow-hidden bg-bg border-t md:border-t-0 md:border-l border-border">
           <ProjectGraphic projectId={project.id} />
        </div>

      </motion.div>
    </div>
  );
}

// --- Custom Abstract Graphics for Each Project ---

function ProjectGraphic({ projectId }: { projectId: string }) {
  // Renders a unique, beautiful abstract visual for each project based on its theme.
  
  if (projectId === "ai-doc-review") {
    // Neural Network / AI Brain theme
    return (
      <div className="w-full h-full relative bg-gradient-to-br from-bg via-[#0a1128] to-bg flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[150%] h-[150%] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(79,142,247,0.4) 0%, transparent 60%)" }}
        />
        <div className="relative w-48 h-48 md:w-64 md:h-64">
           {/* Abstract Nodes */}
           {[...Array(3)].map((_, i) => (
             <motion.div
               key={i}
               animate={{ 
                 y: [0, -10, 0], 
                 x: [0, i % 2 === 0 ? 5 : -5, 0],
               }}
               transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
               className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border border-accent-primary/40 bg-accent-primary/10 flex items-center justify-center"
               style={{
                 top: `${25 + (i * 20)}%`,
                 left: `${25 + (i % 2) * 30}%`,
               }}
             >
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(79,142,247,1)]" />
             </motion.div>
           ))}
           {/* Connection Lines (Simplified on mobile) */}
           <svg className="absolute inset-0 w-full h-full opacity-20 stroke-accent-primary" viewBox="0 0 100 100">
              <path d="M30 30 L70 50 L40 80 Z" fill="none" strokeWidth="0.5" />
           </svg>
        </div>
      </div>
    );
  }

  if (projectId === "isheet-modernization") {
    // Data flow / Platform Modernization theme
    return (
      <div className="w-full h-full relative bg-gradient-to-tr from-bg via-surface to-bg flex items-center justify-center overflow-hidden">
         <div className="flex flex-col gap-4 w-3/4 max-w-sm transform -skew-x-12 rotate-[-5deg]">
            {[...Array(4)].map((_, i) => (
               <motion.div 
                 key={i}
                 initial={{ x: "100%", opacity: 0 }}
                 whileInView={{ x: "0%", opacity: 1 }}
                 transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                 className="w-full h-12 rounded-lg bg-surface/80 border border-border backdrop-blur-sm relative overflow-hidden"
               >
                 <motion.div 
                   animate={{ x: ["-100%", "200%"] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                   className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent-secondary/30 to-transparent"
                 />
               </motion.div>
            ))}
         </div>
      </div>
    );
  }

  if (projectId === "integration-framework") {
    // Testing / Shield / Robustness theme
    return (
      <div className="w-full h-full relative bg-gradient-to-b from-bg to-[#121820] flex items-center justify-center overflow-hidden">
        <div className="relative flex items-center justify-center w-48 h-48 md:w-64 md:h-64">
           {/* Outer Ring */}
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             className="absolute inset-4 md:inset-0 rounded-full border-2 border-dashed border-accent-secondary/20"
           />
           {/* Center Core */}
           <motion.div 
             animate={{ scale: [1, 1.03, 1] }}
             transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             className="relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-2xl rotate-45 bg-gradient-to-tr from-accent-secondary to-accent-primary flex items-center justify-center shadow-[0_0_20px_rgba(123,97,255,0.4)]"
           >
             <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-white/20 -rotate-45" />
           </motion.div>
        </div>
      </div>
    );
  }

  // Default / Hackathon (Trophy / Star theme)
  return (
    <div className="w-full h-full relative bg-gradient-to-bl from-[#2a1a08] via-bg to-bg flex items-center justify-center overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px]"
      />
      <div className="relative">
         <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-32 h-40 bg-gradient-to-b from-yellow-400/20 to-transparent border-t-2 border-l border-r border-yellow-500/50 rounded-t-sm flex items-center justify-center backdrop-blur-sm"
         >
            <div className="w-16 h-16 border-2 border-yellow-500/80 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-400 rounded-full shadow-[0_0_20px_rgba(250,204,21,1)]" />
            </div>
         </motion.div>
         {/* Base */}
         <div className="w-40 h-8 bg-surface border-t border-yellow-500/30 -ml-4 mt-2 rounded-t-lg" />
      </div>
    </div>
  );
}
