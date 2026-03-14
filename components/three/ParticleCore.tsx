"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { type MotionValue } from "framer-motion";
import * as THREE from "three";

interface ParticleCoreProps {
  scrollProgress: MotionValue<number>;
}

export function ParticleCore({ scrollProgress }: ParticleCoreProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Detect mobile to aggressively reduce particle count for performance
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use 1200 particles on mobile, 3500 on desktop
  const particleCount = isMobile ? 1200 : 3500;
  // Make particles slightly larger on mobile to compensate for lower count
  const particleSize = isMobile ? 0.045 : 0.03;
  
  // Generate a galaxy-like spiral structure
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color("#4F8EF7"); // Primary blue
    const color2 = new THREE.Color("#7B61FF"); // Secondary purple

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      const radius = Math.random() * 3;
      const spinAngle = radius * 3;
      const branchAngle = ((i % 3) * Math.PI * 2) / 3;
      
      const scatter = Math.pow(Math.random(), 3) * 0.5;
      const randomX = Math.cos(Math.random() * Math.PI * 2) * scatter;
      const randomY = Math.sin(Math.random() * Math.PI * 2) * scatter;
      const randomZ = Math.cos(Math.random() * Math.PI * 2) * scatter;

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      pos[i3 + 1] = (Math.random() - 0.5) * 0.5 + randomY;
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
      
      const mixedColor = color1.clone().lerp(color2, radius / 3);
      
      const hsl = { h: 0, s: 0, l: 0 };
      mixedColor.getHSL(hsl);
      mixedColor.setHSL(hsl.h, hsl.s, Math.min(hsl.l + Math.random() * 0.2, 1));

      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    
    return { positions: pos, colors: col };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const progress = scrollProgress.get();
    const time = state.clock.getElapsedTime();

    // Simplify rotation math slightly
    pointsRef.current.rotation.y = time * 0.1 + progress * 3.14;
    pointsRef.current.rotation.x = time * 0.05 + progress * 0.78;
    
    const scale = 1 + progress * 1.5; 
    pointsRef.current.scale.setScalar(scale);
    
    pointsRef.current.position.z = progress * 2; 
    pointsRef.current.position.y = Math.sin(time * 0.5) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          args={[positions, 3]}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          args={[colors, 3]}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={particleSize} 
        vertexColors 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
}
