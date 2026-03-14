"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { type Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onOpenModal, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for tracking mouse position over the card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse values with a spring so it feels physical and fluid
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform the mouse position into 3D rotation angles
  // Max tilt is 10 degrees. The math creates a natural holographic tilt.
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  // Translate a glowing light behind the card based on mouse position
  const shineX = useTransform(smoothX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(smoothY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    // Get mouse position relative to the center of the card
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    // Normalize values between -0.5 and 0.5
    const xPct = (clientX / width) - 0.5;
    const yPct = (clientY / height) - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Return to default flat state gently
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
      // Apply the 3D transforms
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-[500px] rounded-2xl cursor-pointer perspective-1000 ${
        isHovered ? "z-10" : "z-0"
      }`}
      onClick={() => onOpenModal(project)}
    >
      {/* The Physical Glass Card */}
      <div 
        className="absolute inset-0 rounded-2xl bg-surface/80 border border-border overflow-hidden transition-colors duration-300 pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Dynamic Highlight Gradient (The "Shiny Foil" effect) */}
        <motion.div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0"
          style={{ 
            background: "radial-gradient(circle at center, rgba(79,142,247,0.15) 0%, transparent 60%)",
            left: shineX,
            top: shineY,
            transform: "translate(-50%, -50%)",
            opacity: isHovered ? 1 : 0 
          }}
        />

        <div className="flex flex-col h-full p-8 relative z-10">
          
          <div className="flex justify-between items-start mb-6">
            <div 
              className="w-12 h-12 rounded-xl bg-bg border border-border flex items-center justify-center text-accent-primary shadow-[0_4px_20px_-5px_rgba(79,142,247,0.3)]"
              style={{ transform: "translateZ(30px)" }} // Pop out in 3D
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            
            <div 
              className="flex gap-3 pointer-events-auto"
              // Pop slightly less to maintain depth hierarchy
              style={{ transform: "translateZ(20px)" }}
            >
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full bg-bg/50 border border-border border-transparent hover:border-accent-primary text-text-secondary hover:text-accent-primary transition-colors backdrop-blur-md"
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
                  className="p-2 rounded-full bg-bg/50 border border-border border-transparent hover:border-accent-primary text-text-secondary hover:text-accent-primary transition-colors backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div 
            className="flex-grow flex flex-col justify-center"
            style={{ transform: "translateZ(40px)" }} // Pop out the most
          >
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
              {project.description}
            </p>
          </div>

          <div style={{ transform: "translateZ(20px)" }}>
            <div className="text-sm font-medium text-accent-secondary flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-accent-secondary shadow-[0_0_8px_rgba(123,97,255,0.8)]" />
              {project.impact}
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
              {project.tech.slice(0, 4).map((tech) => (
                <Badge key={tech} variant="outline" className="bg-bg/50 backdrop-blur-sm border-border">
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
      </div>
    </motion.div>
  );
}
