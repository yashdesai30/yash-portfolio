"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function SectionWrapper({ id, children, className, title, subtitle }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-12 md:py-20 w-full", className)}>
      <div className="container mx-auto px-4 md:px-6">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12 sm:mb-16"
          >
            <div className="space-y-2">
              {title && (
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="max-w-[700px] text-text-secondary md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
