import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Geometry, Base, Subtraction } from '@react-three/csg';
import * as THREE from 'three';

interface ProceduralTractorProps {
  position?: [number, number, number];
  scale?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  color?: string;
}

export default function ProceduralTractor({ 
  position = [0, 0, 0], 
  scale = 1,
  autoRotate = false,
  autoRotateSpeed = 0.5,
  color = "#2d5016"
}: ProceduralTractorProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += autoRotateSpeed * delta;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Chasis principal */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 3]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Cabina con ventanas usando CSG */}
      <Geometry computeVertexNormals>
        <Base position={[0, 1.3, -0.5]} castShadow>
          <boxGeometry args={[1.6, 1.2, 1.5]} />
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
        </Base>
        {/* Ventanas laterales */}
        <Subtraction position={[0.85, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 1]} />
        </Subtraction>
        <Subtraction position={[-0.85, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 1]} />
        </Subtraction>
        {/* Ventana frontal */}
        <Subtraction position={[0, 0, 0.8]}>
          <boxGeometry args={[1.2, 0.8, 0.2]} />
        </Subtraction>
      </Geometry>

      {/* Cristales con efecto transparente */}
      <mesh position={[0.85, 1.3, -0.5]} castShadow>
        <boxGeometry args={[0.05, 0.8, 1]} />
        <meshPhysicalMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[-0.85, 1.3, -0.5]} castShadow>
        <boxGeometry args={[0.05, 0.8, 1]} />
        <meshPhysicalMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[0, 1.3, 0.25]} castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshPhysicalMaterial 
          color="#87ceeb" 
          transparent 
          opacity={0.3} 
          metalness={0.9}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Techo */}
      <mesh position={[0, 2, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.1, 1.5]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Motor/Capó */}
      <mesh position={[0, 0.9, 1.3]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.7, 1.4]} />
        <meshStandardMaterial color="#c41e3a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Rejilla del motor */}
      <mesh position={[0, 0.9, 2.05]} castShadow>
        <boxGeometry args={[1.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Escape vertical */}
      <mesh position={[0.7, 1.8, 0.5]} castShadow rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 1.5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.7, 2.55, 0.5]} castShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Ruedas traseras (grandes) */}
      <group position={[-1.1, 0, -0.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.45, 32]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* Detalles de llanta */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            position={[
              0,
              Math.cos((angle * Math.PI) / 180) * 0.7,
              Math.sin((angle * Math.PI) / 180) * 0.7
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <boxGeometry args={[0.5, 0.1, 0.15]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        ))}
      </group>
      
      <group position={[1.1, 0, -0.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.9, 0.9, 0.4, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.45, 32]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* Detalles de llanta */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <mesh
            key={i}
            position={[
              0,
              Math.cos((angle * Math.PI) / 180) * 0.7,
              Math.sin((angle * Math.PI) / 180) * 0.7
            ]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <boxGeometry args={[0.5, 0.1, 0.15]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
        ))}
      </group>

      {/* Ruedas delanteras (pequeñas) */}
      <group position={[-0.9, -0.2, 1.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.35, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.5} />
        </mesh>
      </group>
      <group position={[0.9, -0.2, 1.5]}>
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.35, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.9} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
          <meshStandardMaterial color="#4a4a4a" metalness={0.6} roughness={0.5} />
        </mesh>
      </group>

      {/* Guardabarros traseros */}
      <mesh position={[-1.1, 0.7, -0.5]} castShadow rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.1, 0.6, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[1.1, 0.7, -0.5]} castShadow rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.6, 1.2]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Luces delanteras */}
      <mesh position={[-0.5, 1.1, 2.08]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight position={[-0.5, 1.1, 2.2]} color="#ffff00" intensity={0.3} distance={5} />
      
      <mesh position={[0.5, 1.1, 2.08]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial 
          color="#ffff00" 
          emissive="#ffff00" 
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <pointLight position={[0.5, 1.1, 2.2]} color="#ffff00" intensity={0.3} distance={5} />

      {/* Luces superiores de advertencia */}
      <mesh position={[-0.3, 2.1, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial 
          color="#ff6600" 
          emissive="#ff6600" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.3, 2.1, -0.5]} castShadow>
        <boxGeometry args={[0.2, 0.1, 0.4]} />
        <meshStandardMaterial 
          color="#ff6600" 
          emissive="#ff6600" 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Enganche trasero */}
      <mesh position={[0, 0.3, -1.8]} castShadow>
        <boxGeometry args={[1, 0.15, 0.3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.3, -2]} castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Espejos retrovisores */}
      <group position={[-0.9, 1.6, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.15, 0, 0]} rotation={[0, -0.3, 0]} castShadow>
          <boxGeometry args={[0.25, 0.2, 0.05]} />
          <meshPhysicalMaterial color="#87ceeb" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      <group position={[0.9, 1.6, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.15, 0, 0]} rotation={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[0.25, 0.2, 0.05]} />
          <meshPhysicalMaterial color="#87ceeb" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}
