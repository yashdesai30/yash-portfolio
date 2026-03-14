export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  type: "full-time" | "intern";
  highlights: string[];
  tech: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "tr-se",
    company: "Thomson Reuters",
    role: "Software Engineer",
    period: "Apr 2024 – Present",
    type: "full-time",
    highlights: [
      "Led MFE architecture and agentic AI services, delivering 40+ major features for document analysis and platform scalability",
      "Built document review workflows including hyperlinked citations and async risk analysis, improving due diligence accuracy",
      "Reduced processing time by 30% through asynchronous risk analysis pipelines",
      "Resolved 50+ critical bugs improving system stability and reliability",
    ],
    tech: ["ReactJS", "Java", "SpringBoot", "Azure", "Kubernetes", "MFE", "Microservices"],
  },
  {
    id: "tr-ase",
    company: "Thomson Reuters",
    role: "Associate Software Engineer",
    period: "Aug 2022 – Mar 2024",
    type: "full-time",
    highlights: [
      "Completed iSheet modernization with 120+ work items, increasing system performance by 25%",
      "Boosted integration test coverage from 4% to 75%, reducing production issues by 40%",
      "Delivered background job processing (encryption, decryption, migration)",
      "Developed robust template management systems",
    ],
    tech: ["Java", "SpringBoot", "Python", "Redis", "SQL", "Azure Service Bus", "Docker"],
  },
  {
    id: "tr-intern",
    company: "Thomson Reuters",
    role: "Technology Intern",
    period: "Jan 2022 – Jul 2022",
    type: "intern",
    highlights: [
      "Removed 200+ deprecated methods improving system efficiency",
      "Enhanced formula validation and search functionalities used by 1000+ clients",
      "Added advanced expression query features for data manipulation",
    ],
    tech: ["Java", "JavaScript", "SQL"],
  },
];
