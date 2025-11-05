import { useEffect, useMemo, useRef, useState } from "react";

import * as THREE from "three";

import { useFrame } from "@react-three/fiber";
import type { TorusKnotProps } from "./types";

const TorusKnot: React.FC<TorusKnotProps> = ({ particleColor = "#66b99d" }) => {
  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const baseRotation = useRef({ x: 0, y: 0 });
  const lastMouseMove = useRef(Date.now());
  const wasIdle = useRef(false);

  const [controls] = useState({
    radius: 200,
    tube: 200,
    radialSegments: 40,
    tubularSegments: 10,
    p: 5,
    q: 3,
    asParticles: true,
    rotate: true,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      lastMouseMove.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  useEffect(() => {
    if (!instancedMeshRef.current) return;

    baseRotation.current.x = instancedMeshRef.current.rotation.x;
    baseRotation.current.y = instancedMeshRef.current.rotation.y;

    const tempMatrix = new THREE.Matrix4();
    positions.forEach((position, i) => {
      tempMatrix.setPosition(position);
      instancedMeshRef.current!.setMatrixAt(i, tempMatrix);
    });
    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useFrame((_state, delta) => {
    if (!instancedMeshRef.current) return;

    const timeSinceLastMove = Date.now() - lastMouseMove.current;
    const isMouseIdle = timeSinceLastMove > 1000;

    if (isMouseIdle) {
      if (!wasIdle.current) {
        wasIdle.current = true;
      }

      targetPosition.current.x += delta * 0.05;
    } else {
      wasIdle.current = false;

      const lerpFactor = 0.03;
      const targetRotationY = mousePosition.current.x * -Math.PI * 0.05;
      const targetRotationX = mousePosition.current.y * Math.PI * 0.05;

      targetPosition.current.x +=
        (targetRotationY - targetPosition.current.x) * lerpFactor;
      targetPosition.current.y +=
        (targetRotationX - targetPosition.current.y) * lerpFactor;
    }

    instancedMeshRef.current.rotation.y =
      baseRotation.current.y + targetPosition.current.x;
    instancedMeshRef.current.rotation.x =
      baseRotation.current.x + targetPosition.current.y;

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[pentagonGeometry, undefined, positions.length]}
    >
      <meshBasicMaterial
        color={particleColor}
        side={THREE.DoubleSide}
        transparent
        opacity={0.03}
      />
    </instancedMesh>
  );
};

export default TorusKnot;
