import { Terminal, Database, Cloud, Code2, type LucideIcon } from "lucide-react";

export interface SkillItem {
  name: string;
  level: "Expert" | "Proficient" | "Familiar";
}

export interface SkillCategory {
  category: string;
  icon: LucideIcon;
  skills: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    icon: Code2,
    skills: [
      { name: "Java", level: "Expert" },
      { name: "JavaScript", level: "Expert" },
      { name: "Python", level: "Proficient" },
      { name: "TypeScript", level: "Proficient" },
    ],
  },
  {
    category: "Frameworks",
    icon: Terminal,
    skills: [
      { name: "SpringBoot", level: "Expert" },
      { name: "ReactJS", level: "Expert" },
      { name: "Django", level: "Proficient" },
      { name: "Firebase", level: "Familiar" },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Microservices", level: "Expert" },
      { name: "Azure", level: "Proficient" },
      { name: "Kubernetes", level: "Proficient" },
      { name: "Docker", level: "Proficient" },
      { name: "Azure Service Bus", level: "Proficient" },
    ],
  },
  {
    category: "Databases & Tools",
    icon: Database,
    skills: [
      { name: "API Design", level: "Expert" },
      { name: "Git", level: "Expert" },
      { name: "Redis", level: "Proficient" },
      { name: "SQL", level: "Proficient" },
      { name: "Celery", level: "Familiar" },
      { name: "Datadog", level: "Familiar" },
    ],
  },
];
