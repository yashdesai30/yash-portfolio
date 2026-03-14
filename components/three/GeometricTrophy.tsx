"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

function TrophyCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Slow rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        {/* An Octahedron gives a nice diamond/gem/trophy feel */}
        <octahedronGeometry args={[1.5, 0]} />
        <meshPhysicalMaterial
          color="#ffc107" // Gold
          emissive="#b8860b" // Darker gold emissive
          emissiveIntensity={0.2}
          roughness={0.1}
          metalness={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>

      {/* Outer decorative ring to make it look highly engineered */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
      </mesh>

    </Float>
  );
}

export function GeometricTrophy() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <PresentationControls
          global={false} // Spin globally or by dragging the model
          cursor={true} // Whether to toggle cursor style on drag
          snap={true} // Snap-back to center (can also be a spring config)
          speed={1} // Speed factor
          zoom={1} // Zoom factor when half the polar-max is reached
          rotation={[0, 0, 0]} // Default rotation
          polar={[-Math.PI / 4, Math.PI / 4]} // Vertical limits
          azimuth={[-Math.PI / 4, Math.PI / 4]} // Horizontal limits
        >
          <TrophyCore />
        </PresentationControls>

        <Environment preset="city" />
        
        {/* Sharp drop shadow beneath the floating trophy */}
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.4}
          scale={10}
          blur={1.5}
          far={4}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
