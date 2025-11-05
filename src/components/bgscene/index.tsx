import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

import TorusKnot from "../particles";
import type { TorusKnotSceneProps } from "./types";

const CameraController: React.FC = () => {
  const { camera } = useThree();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Ajusta estos valores según el efecto deseado
    const scrollFactor = scrollY.current * 0.1;

    // Mueve la cámara en Z (alejándose o acercándose)
    camera.position.z = 350 - scrollFactor * 0.3;

    // Mueve la cámara en Y (arriba/abajo)
    camera.position.y = scrollFactor * 0.2;

    // Opcional: mueve la cámara en X para crear un efecto parallax
    camera.position.x = -50 + scrollFactor * 0.1;
  });

  return null;
};

const TorusKnotScene: React.FC<TorusKnotSceneProps> = ({ particleColor }) => {
  return (
    <div className="w-dvw h-dvh fixed top-0 left-0 pointer-events-none z-1">
      <Canvas
        camera={{
          position: [-50, 0, 350],
          fov: 70,
          near: 0.1,
          far: 600,
        }}
        gl={{ antialias: true }}
        className="relative pointer-events-none z-0"
      >
        <CameraController />
        <TorusKnot particleColor={particleColor} />

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
};

export default TorusKnotScene;
