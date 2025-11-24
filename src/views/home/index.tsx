import ModelViewer from "@/components/ModelViewer";
import Heading from "@/layout/components/heading";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 800;
  const height = typeof window !== "undefined" ? window.innerHeight : 600;
  const minBound = Math.max(Math.min(width, height), 550);
  const modelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!containerRef.current) return;

    // Animación de parallax con scroll usando GSAP
    gsap.to(containerRef.current, {
      y: 100,
      x: 100, // Movimiento hacia abajo (parallax)
      scale: 0.9, // Escala final
      opacity: 0, // Opacidad final
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Suaviza la animación con el scroll
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ transformOrigin: "center top" }}>
      <div
        ref={modelRef}
        className="absolute w-max h-max top-0 -right-50 lg:right-30"
      >
        <ModelViewer
          modelXOffset={0}
          modelYOffset={-15000}
          width={minBound}
          height={minBound * 1.2}
          fadeIn
          autoFrame
          defaultZoom={35}
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

      <div className="w-full h-[90vh] flex flex-row py-6 px-12 sm:px-28 justify-start items-center relative z-1">
        <div className="flex flex-col gap-4 relative z-2 w-2xs sm:w-auto sm:max-w-md">
          <Heading
            title="De la tierra al futuro"
            description="Conectamos la agricultura con la innovación. Tecnología, Sostenibilidad, Precisión."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
