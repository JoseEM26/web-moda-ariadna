"use client";

import { useRef, useMemo, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface ThreeDCanvasProps {
  className?: string;
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function PurseModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        mousePosition.x * 0.3,
        delta * 2
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        mousePosition.y * 0.2,
        delta * 2
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.5, 1.8, 1]} />
          <meshStandardMaterial
            color="#FFB5C5"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.3, 0.51]}>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshStandardMaterial
            color="#FF69B4"
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 8, 24, Math.PI]} />
          <meshStandardMaterial
            color="#DCD0FF"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>

        <group position={[-0.6, 0.6, 0.52]}>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.15, 0.08]} />
            <meshStandardMaterial color="#FF69B4" roughness={0.4} />
          </mesh>
          <mesh rotation={[0, 0, -Math.PI / 4]}>
            <boxGeometry args={[0.4, 0.15, 0.08]} />
            <meshStandardMaterial color="#FF69B4" roughness={0.4} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#C71585" roughness={0.3} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function Sparkles() {
  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }, (_, idx) => {
      const seed1 = idx * 4 + 1;
      const seed2 = idx * 4 + 2;
      const seed3 = idx * 4 + 3;
      const seed4 = idx * 4 + 4;
      return {
        id: idx,
        position: [
          (seededRandom(seed1) - 0.5) * 5,
          (seededRandom(seed2) - 0.5) * 5,
          (seededRandom(seed3) - 0.5) * 3,
        ] as [number, number, number],
        scale: seededRandom(seed4) * 0.5 + 0.2,
      };
    });
  }, []);

  return (
    <>
      {sparkles.map((sparkle) => (
        <mesh key={sparkle.id} position={sparkle.position}>
          <octahedronGeometry args={[sparkle.scale * 0.08, 0]} />
          <meshBasicMaterial color="#FF69B4" transparent opacity={0.7} />
        </mesh>
      ))}
    </>
  );
}

function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-3, 2, 2]} intensity={0.5} color="#E6E6FA" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#FFB5C5" />

      <PurseModel mousePosition={mousePosition} />
      <Sparkles />

      <Environment preset="studio" />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-rose-blush/30 border-t-hot-pink rounded-full animate-spin" />
    </div>
  );
}

export default function ThreeDCanvas({ className = "" }: ThreeDCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient] = useState(() => typeof window !== "undefined");

  const handleMouseMove = (event: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    }
  };

  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    gl.setClearColor(0x000000, 0);
    gl.setPixelRatio(window.devicePixelRatio);
  };

  if (!isClient) {
    return (
      <div className={`relative w-full h-full min-h-[300px] md:min-h-[400px] ${className}`}>
        <LoadingFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] md:min-h-[400px] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute top-4 left-4 w-3 h-3 bg-hot-pink rounded-full animate-sparkle opacity-60" />
      <div className="absolute top-12 right-8 w-2 h-2 bg-soft-lavender rounded-full animate-sparkle opacity-40" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-8 left-12 w-2 h-2 bg-rose-blush rounded-full animate-sparkle opacity-50" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-16 right-4 w-4 h-4 bg-lavender-dream rounded-full animate-sparkle opacity-30" style={{ animationDelay: "1.5s" }} />

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", failIfMajorPerformanceCaveat: false }}
          style={{ background: "transparent" }}
          onCreated={handleCreated}
        >
          <Scene mousePosition={mousePosition} />
        </Canvas>
      </Suspense>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream-white/80 to-transparent pointer-events-none" />
    </div>
  );
}
