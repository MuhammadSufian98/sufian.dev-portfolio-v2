"use client";
import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  ScrollControls,
  Scroll,
  Environment,
  Float,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useFrame((state) => {
    if (!modelRef.current) return;
    const { x, y } = state.pointer;
    // Smoother, limited rotation so it stays within the "frame"
    modelRef.current.rotation.y = THREE.MathUtils.lerp(
      modelRef.current.rotation.y,
      x * 0.3,
      0.05,
    );
    modelRef.current.rotation.x = THREE.MathUtils.lerp(
      modelRef.current.rotation.x,
      -y * 0.1,
      0.05,
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive
        object={scene}
        ref={modelRef}
        // REDUCED SCALE: 1.2 is usually the "sweet spot" for 640px height
        scale={1.2}
        // CENTERED POSITION: [0, -0.5, 0] keeps it from hitting the top/bottom
        position={[0, -0.5, 0]}
      />
    </Float>
  );
}

export default function ExperiencePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050505] p-4">
      {/* Fixed Container */}
      <div
        className="relative overflow-hidden rounded-xl border border-white/5 bg-gradient-to-b from-zinc-900 to-black shadow-2xl"
        style={{ width: "1240px", height: "640px" }}
      >
        {/* Adjusted Camera: fov 30 and position [0, 0, 6] makes the object appear smaller/further */}
        <Canvas camera={{ position: [0, 0, 6], fov: 30 }}>
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <spotLight position={[5, 5, 5]} intensity={1} />

            <ContactShadows
              position={[0, -1.2, 0]}
              opacity={0.3}
              scale={8}
              blur={2.5}
              far={4}
            />

            <ScrollControls pages={3} damping={0.2}>
              <Model url="/3d/smol_ame_in_an_upcycled_terrarium_hololiveen.glb" />

              <Scroll html className="w-full">
                {/* Content Layer 1 */}
                <section className="h-[640px] flex items-center px-16 pointer-events-none">
                  <div className="max-w-sm">
                    <h1 className="text-6xl font-black text-white leading-[0.9] mb-4">
                      MINI <br /> WORLD
                    </h1>
                    <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                      Scroll to explore the details
                    </p>
                  </div>
                </section>

                {/* Content Layer 2 */}
                <section className="h-[640px] flex items-end justify-center pb-16 pointer-events-none">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full">
                    <p className="text-white text-sm font-medium">
                      Interactive 3D Component
                    </p>
                  </div>
                </section>

                {/* Content Layer 3 */}
                <section className="h-[640px] flex items-center justify-end px-16 pointer-events-none">
                  <div className="text-right">
                    <h2 className="text-4xl font-bold text-white mb-2 italic">
                      1240 x 640
                    </h2>
                    <button className="pointer-events-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-all">
                      View Project
                    </button>
                  </div>
                </section>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
