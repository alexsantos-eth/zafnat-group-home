import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

// Component for the Torus Knot
function TorusKnot() {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0, y: 0 }); // Store base rotation
  const lastMouseMove = useRef(Date.now()); // Track last mouse movement
  const wasIdle = useRef(false); // Track if we were in idle mode

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

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update last mouse move time
      lastMouseMove.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  // Initialize instances and base rotation
  useEffect(() => {
    if (!instancedMeshRef.current) return;

    // Capture initial rotation as base
    baseRotation.current.x = instancedMeshRef.current.rotation.x;
    baseRotation.current.y = instancedMeshRef.current.rotation.y;

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

    // Check if mouse is idle (no movement for 1 second)
    const timeSinceLastMove = Date.now() - lastMouseMove.current;
    const isMouseIdle = timeSinceLastMove > 1000;

    if (isMouseIdle) {
      if (!wasIdle.current) {
        // Just mark that we're now idle, don't change position
        wasIdle.current = true;
      }

      // Simply increment the current rotation continuously
      // This rotates around Y axis slowly
      targetPosition.current.x += delta * 0.004;
    } else {
      wasIdle.current = false;

      // Follow mouse
      const lerpFactor = 0.03;
      const targetRotationY = mousePosition.current.x * -Math.PI * 0.05;
      const targetRotationX = mousePosition.current.y * Math.PI * 0.05;

      targetPosition.current.x +=
        (targetRotationY - targetPosition.current.x) * lerpFactor;
      targetPosition.current.y +=
        (targetRotationX - targetPosition.current.y) * lerpFactor;
    }

    // Add to base rotation instead of replacing
    instancedMeshRef.current.rotation.y =
      baseRotation.current.y + targetPosition.current.x;
    instancedMeshRef.current.rotation.x =
      baseRotation.current.x + targetPosition.current.y;

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;

    // Auto-rotate is disabled since we're controlling rotation with mouse
    // if (controls.rotate) {
    //   instancedMeshRef.current.rotation.y -= delta * 0.01;
    // }
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
        opacity={0.03}
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
            focusDistance={0.05}
            focalLength={0.5}
            bokehScale={10}
            height={200}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
