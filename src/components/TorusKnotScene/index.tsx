import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import * as THREE from "three";

// Component for the Torus Knot
function TorusKnot() {
  const groupRef = useRef<THREE.Group>(null);

  // Default controls (we'll add Leva later if needed)
  const [controls] = useState({
    radius: 200,
    tube: 200,
    radialSegments: 30, // Reducido de 600 para mayor distancia entre segmentos
    tubularSegments: 10,
    p: 5,
    q: 3,
    asParticles: true,
    rotate: false,
  });

  // Create pentagon geometry for each particle
  const pentagonGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const sides = 5;
    const radius = 1;

    for (let i = 0; i <= sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    return new THREE.ShapeGeometry(shape);
  }, []);

  // Get positions from torus knot geometry
  const positions = useMemo(() => {
    const torusKnot = new THREE.TorusKnotGeometry(
      controls.radius,
      controls.tube,
      Math.round(controls.radialSegments),
      Math.round(controls.tubularSegments),
      Math.round(controls.p),
      Math.round(controls.q)
    );

    const positionAttribute = torusKnot.attributes.position;
    const positionsArray: THREE.Vector3[] = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      positionsArray.push(
        new THREE.Vector3(
          positionAttribute.getX(i),
          positionAttribute.getY(i),
          positionAttribute.getZ(i)
        )
      );
    }

    return positionsArray;
  }, [
    controls.radius,
    controls.tube,
    controls.radialSegments,
    controls.tubularSegments,
    controls.p,
    controls.q,
  ]);

  // Rotation animation
  useFrame((_state, delta) => {
    if (groupRef.current && controls.rotate) {
      groupRef.current.rotation.y += delta;
    }
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, index) => (
        <mesh key={index} position={pos} geometry={pentagonGeometry}>
          <meshBasicMaterial color="#66b99d" side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene Component
export default function TorusKnotScene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [-30, 40, 50],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[0x000000]} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* The Torus Knot */}
        <TorusKnot />

        {/* Camera Controls */}
        <OrbitControls target={[10, 0, 0]} enableDamping dampingFactor={0.05} />

        {/* Stats (FPS counter) */}
        <Stats />
      </Canvas>
    </div>
  );
}
