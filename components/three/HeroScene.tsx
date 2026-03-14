"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ParticleCore } from "./ParticleCore";
import * as THREE from "three";

interface HeroSceneProps {
  scrollProgress: MotionValue<number>;
}

function SceneControls() {
  const { camera, pointer } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Subtle mouse parallax 
    vec.set(pointer.x * 1, pointer.y * 1, camera.position.z);
    camera.position.lerp(vec, 0.05);
    // Keep camera looking at center
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene({ scrollProgress }: HeroSceneProps) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const opacity = useTransform(scrollProgress, [0.7, 1], [1, 0]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-bg to-surface bg-bg" />
    );
  }

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]} // Clamp to 1x on mobile, max 1.5x on desktop
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }} // Turn off antialias for particles
        aria-label="3D particle galaxy background"
        role="img"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          
          <ParticleCore scrollProgress={scrollProgress} />

          <SceneControls />
          <Preload all />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}
