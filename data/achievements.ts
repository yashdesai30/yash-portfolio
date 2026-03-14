import { Trophy, Heart, type LucideIcon } from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const achievements: Achievement[] = [
  {
    id: "tr-hackathon-2024",
    title: "Thomson Reuters Global AI Hackathon 2024 — Winner",
    description: "Won global AI innovation competition building an advanced LLM-powered solution against engineering teams worldwide.",
    icon: Trophy,
  },
  {
    id: "volunteering-mitali",
    title: "Volunteering — Mitali Primary School, Anand",
    description: "Organized wall painting, STEM model building, bicycle assembly, and interactive games to enhance student learning and overall well-being.",
    icon: Heart,
  },
];
