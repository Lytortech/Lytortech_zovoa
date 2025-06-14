
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ThreeDModelProps {
  modelUrl?: string;
  autoRotate?: boolean;
  className?: string;
}

const RotatingBox = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3B82F6" />
    </mesh>
  );
};

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return <primitive ref={meshRef} object={scene} scale={[0.5, 0.5, 0.5]} />;
};

const ThreeDModel: React.FC<ThreeDModelProps> = ({ 
  modelUrl, 
  autoRotate = true, 
  className = "w-full h-64" 
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 3] }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight
          position={[0, 5, 5]}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        {modelUrl ? (
          <Model url={modelUrl} />
        ) : (
          <RotatingBox />
        )}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>
    </div>
  );
};

export default ThreeDModel;
