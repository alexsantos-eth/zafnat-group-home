import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Component for the Torus Knot
function TorusKnot() {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);

  // Default controls (we'll add Leva later if needed)
  const [controls] = useState({
    radius: 200,
    tube: 200,
    radialSegments: 40, // Reducido de 600 para mayor distancia entre segmentos
    tubularSegments: 10,
    p: 5,
    q: 3,
    asParticles: true,
    rotate: true,
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

  // Initialize instances
  useEffect(() => {
    if (!instancedMeshRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    positions.forEach((position, i) => {
      tempMatrix.setPosition(position);
      instancedMeshRef.current!.setMatrixAt(i, tempMatrix);
    });
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  // Rotation animation
  useFrame((_state, delta) => {
    if (!instancedMeshRef.current) return;

    const tempMatrix = new THREE.Matrix4();
    const rotation = new THREE.Euler();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);

    positions.forEach((pos, i) => {
      // Get current matrix
      instancedMeshRef.current!.getMatrixAt(i, tempMatrix);
      tempMatrix.decompose(position, new THREE.Quaternion(), scale);

      // Update rotation
      rotation.z += delta * 0.1;

      // Set new matrix with rotation
      tempMatrix.compose(
        pos,
        new THREE.Quaternion().setFromEuler(rotation),
        scale
      );
      instancedMeshRef.current!.setMatrixAt(i, tempMatrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;

    // Rotate entire mesh if enabled
    if (controls.rotate) {
      instancedMeshRef.current.rotation.y -= delta * 0.01;
    }
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[pentagonGeometry, undefined, positions.length]}
    >
      <meshBasicMaterial
        color="#66b99d"
        side={THREE.DoubleSide}
        transparent
        opacity={0.1}
      />
    </instancedMesh>
  );
}

// Main Scene Component
export default function TorusKnotScene() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [-150, 0, 350],
          fov: 50,
          near: 0.1,
          far: 600,
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={[0x000000]} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* The Torus Knot */}
        <TorusKnot />

        {/* Stats (FPS counter) */}
        <Stats />

        {/* Post-processing: Depth of Field blur effect */}
        <EffectComposer multisampling={0}>
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.5}
            bokehScale={4}
            height={240}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
