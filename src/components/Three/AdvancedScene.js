import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Icosahedron, Environment } from '@react-three/drei';
import * as THREE from 'three';

function RotatingMesh() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <Icosahedron args={[1, 4]} />
      <meshStandardMaterial color="cyan" wireframe />
    </mesh>
  );
}

export default function AdvancedScene() {
  return (
    <Canvas className="w-full h-full">
      <PerspectiveCamera makeDefault position={[0, 0, 3]} />
      <OrbitControls autoRotate autoRotateSpeed={2} />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="blue" />
      
      {/* Rotating mesh with animation */}
      <RotatingMesh />
      
      {/* Background */}
      <Environment preset="city" />
    </Canvas>
  );
}
