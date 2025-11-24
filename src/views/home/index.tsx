import ModelViewer from "@/components/ModelViewer";
import Heading from "@/layout/components/heading";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Home: React.FC = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 800;
  const height = typeof window !== "undefined" ? window.innerHeight : 600;
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modelRef.current) {
      gsap.fromTo(
        modelRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          delay: 1.5,
          ease: "power2.inOut",
        }
      );
    }
  }, []);

  return (
    <>
      <div ref={modelRef} className="absolute w-max h-max top-0 right-30 z-0">
        <ModelViewer
          modelXOffset={0}
          modelYOffset={-15000}
          width={height}
          height={height * 1.2}
          fadeIn
          autoFrame
          defaultZoom={30}
          maxZoomDistance={10000}
          enableManualRotation={false}
          enableManualZoom={false}
          autoRotate
          autoRotateSpeed={0.05}
          defaultRotationY={0}
          defaultRotationX={0}
          showScreenshotButton={false}
          url="/models/pineapple/scene.glb"
        />
      </div>

      <div className="w-full h-screen flex flex-row py-6 px-12 sm:px-28 justify-start items-center relative z-1">
        <div className="flex flex-col gap-4 relative z-2 w-2xs sm:w-auto sm:max-w-md">
          <Heading
            title="De la tierra al futuro"
            description="Conectamos la agricultura con la innovación. Tecnología, Sostenibilidad, Precisión."
          />
        </div>
      </div>
    </>
  );
};

export default Home;
