"use client";

import { useState, useRef } from "react";
import { useScroll } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { StackedProjectCard } from "@/components/ui/StackedProjectCard";
import { projects, type Project } from "@/data/projects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // The main container that determines how long the pinning area lasts
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects; // Show all projects, no filtering

  // Track the overall scroll progress of the entire Projects section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="A selection of the most impactful solutions I've built."
    >
      {/* 
        This wrapper creates the scrolling area. 
        We use a relative container without hidden overflow so the sticky positioning works. 
      */}
      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto pb-32 mt-0">
        {filteredProjects.map((project, i) => {
          // Calculate when this specific card should start scaling down
          const targetScale = 1 - ( (filteredProjects.length - i) * 0.05 );
          return (
            <StackedProjectCard 
              key={project.id} 
              i={i}
              project={project} 
              progress={scrollYProgress}
              // The range determines over what portion of the scroll this card's animation happens
              range={[i * (1 / filteredProjects.length), 1]}
              targetScale={targetScale}
              onOpenModal={setSelectedProject}
            />
          );
        })}
      </div>

      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6 mt-4">
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Overview</h4>
              <p className="text-text-secondary text-base leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-2">Impact</h4>
              <div className="p-3 rounded-lg bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-medium">
                {selectedProject.impact}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-text-primary mb-3">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <Badge key={tech} variant="default">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  );
}
