"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function ToketzCore() {
  const groupRef = useRef<Group>(null);
  const nodeRef = useRef<Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.18;
      groupRef.current.rotation.x = Math.sin(time * 0.42) * 0.12;
    }
    if (nodeRef.current) {
      nodeRef.current.position.y = Math.sin(time * 1.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.35} floatIntensity={0.45}>
        <mesh ref={nodeRef} scale={1.55}>
          <icosahedronGeometry args={[1.25, 5]} />
          <MeshDistortMaterial
            color="#d7fff4"
            emissive="#16e7a4"
            emissiveIntensity={0.28}
            metalness={0.42}
            roughness={0.22}
            distort={0.23}
            speed={1.4}
          />
        </mesh>
      </Float>
      <mesh rotation={[0.9, 0.2, 0.7]}>
        <torusGeometry args={[2.25, 0.012, 16, 220]} />
        <meshBasicMaterial color="#74ffe0" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[1.25, -0.35, -0.5]}>
        <torusGeometry args={[2.75, 0.008, 16, 220]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.26} />
      </mesh>
      <mesh rotation={[0.35, 1.2, 0.2]}>
        <torusGeometry args={[3.15, 0.006, 16, 220]} />
        <meshBasicMaterial color="#21b8ff" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function PremiumScene() {
  return (
    <div className="premiumScene" aria-hidden="true">
      <Canvas dpr={[1, 1.75]} gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6.4]} fov={42} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 5, 6]} intensity={2.4} />
        <pointLight position={[-4, -2, 3]} color="#1fffc0" intensity={1.9} />
        <pointLight position={[3, -3, 4]} color="#3fb9ff" intensity={1.1} />
        <ToketzCore />
      </Canvas>
    </div>
  );
}
