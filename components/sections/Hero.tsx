"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";

// Three.js galaxy — desktop only
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  { ssr: false }
);

// Lightweight CSS animated background for mobile
function MobileHeroBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Primary center glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(79,142,247,0.22) 0%, transparent 70%)" }}
      />
      {/* Purple accent orb */}
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.35, 0.15], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-[20%] right-[-5%] w-[280px] h-[280px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.22) 0%, transparent 70%)" }}
      />
      {/* Bottom left accent */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(79,142,247,0.18) 0%, transparent 70%)" }}
      />
      {/* Floating sparkle dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            top: `${8 + (i * 13) % 82}%`,
            left: `${5 + (i * 19) % 88}%`,
            background: i % 2 === 0 ? "rgba(79,142,247,0.8)" : "rgba(123,97,255,0.8)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
          transition={{
            duration: 2.5 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(79,142,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

const roles = [
  "Software Engineer",
  "Full Stack Developer",
  "AI Platform Builder",
  "Microservices Architect",
];

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    const targetText = roles[currentRoleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(
          isDeleting
            ? targetText.substring(0, currentText.length - 1)
            : targetText.substring(0, currentText.length + 1)
        );
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const textPointerEvents = useTransform(
    scrollYProgress,
    (latest) => (latest > 0.3 ? "none" : "auto")
  ) as unknown as "auto" | "none";

  return (
    <section ref={containerRef} id="hero" className="relative w-full h-[200vh] bg-bg">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background: CSS orbs on mobile, Three.js galaxy on desktop */}
        {mounted && (
          isMobile ? <MobileHeroBg /> : <HeroScene scrollProgress={scrollYProgress} />
        )}

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col items-start justify-center text-left">
          <motion.div
            style={{
              opacity: textOpacity,
              scale: textScale,
              y: textY,
              pointerEvents: textPointerEvents,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4 max-w-3xl"
          >
            <div className="space-y-1">
              <h2 className="text-accent-primary font-mono tracking-wider font-semibold text-sm sm:text-base">
                Hi, my name is
              </h2>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-text-primary">
                Yash Desai.
              </h1>
              <div className="h-10 sm:h-14 flex items-center">
                <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-text-secondary">
                  I am a <span className="text-text-primary">{currentText}</span>
                  <span className="animate-pulse inline-block w-[3px] h-6 sm:h-8 md:h-10 bg-accent-primary ml-1 translate-y-1" />
                </h3>
              </div>
            </div>

            <p className="text-base sm:text-lg text-text-secondary max-w-2xl leading-relaxed">
              Building scalable microservices and AI-powered platforms at Thomson Reuters.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a href="#projects">
                <Button size="lg" className="w-full sm:w-auto">View My Work</Button>
              </a>
              <a href="/YashDesai_Resume.pdf" download>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">Download Resume</Button>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="p-2 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-text-secondary">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
