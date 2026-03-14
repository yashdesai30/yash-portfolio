export type ProjectTag = "All" | "AI" | "Full Stack" | "DevOps" | "Testing";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  tags: ProjectTag[];
  impact: string;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "ai-doc-review",
    title: "AI-Powered Document Review Platform",
    description: "Agentic AI service for enterprise document analysis with hyperlinked citations and MFE architecture.",
    longDescription: "Led the development of an agentic AI service for enterprise document analysis. Implemented features that provide hyperlinked citations directly into primary sources alongside async risk analysis. Employed a Microfrontend (MFE) architecture to allow rapid scaling and independent deployment. Delivered 40+ features during tenure at Thomson Reuters.",
    tech: ["ReactJS", "Java", "SpringBoot", "Azure", "Kubernetes", "MFE"],
    tags: ["All", "AI", "Full Stack"],
    impact: "30% reduction in processing time, improved due diligence accuracy",
  },
  {
    id: "isheet-modernization",
    title: "iSheet Platform Modernization",
    description: "End-to-end modernization of a legacy enterprise platform laying foundation for future scalability.",
    longDescription: "Spearheaded the complete end-to-end modernization of the legacy iSheet enterprise platform containing over 120+ complex work items. Re-architected critical components which drastically improved system performance and paved a path for high concurrency.",
    tech: ["Java", "SpringBoot", "Python", "Redis", "SQL"],
    tags: ["All", "Full Stack", "DevOps"],
    impact: "25% performance boost, 120+ work items delivered",
  },
  {
    id: "integration-framework",
    title: "Integration Testing Framework",
    description: "Comprehensive integration testing infrastructure from near-zero coverage to production-grade quality gates.",
    longDescription: "Designed and implemented a comprehensive integration testing infrastructure. Successfully elevated the team's automated testing culture by instituting robust checks in CI/CD pipelines, preventing bugs from reaching staging environments.",
    tech: ["Java", "SpringBoot", "Docker", "DevOps", "Testing Tools"],
    tags: ["All", "Testing", "DevOps"],
    impact: "Test coverage 4% → 75%, 40% reduction in production incidents",
  },
];
