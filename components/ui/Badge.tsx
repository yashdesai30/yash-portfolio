import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "accent";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  
  const variants = {
    default: "bg-border text-text-primary hover:bg-border/80",
    outline: "text-text-secondary border border-border",
    accent: "bg-accent-primary/10 text-accent-primary border border-accent-primary/20",
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
