import { Canvas } from "@react-three/fiber";
import { DepthOfField, EffectComposer } from "@react-three/postprocessing";

import TorusKnot from "../particles";
import type { TorusKnotSceneProps } from "./types";

const TorusKnotScene: React.FC<TorusKnotSceneProps> = ({ particleColor }) => {
  return (
    <div className="w-dvw h-dvh absolute top-0 left-0 pointer-events-none z-0">
      <Canvas
        camera={{
          position: [-50, 0, 350],
          fov: 50,
          near: 0.1,
          far: 600,
        }}
        gl={{ antialias: true }}
        className="relative pointer-events-none z-0"
      >
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
