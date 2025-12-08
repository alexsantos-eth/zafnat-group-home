import Heading from "@/layout/components/heading";
import { useRef, memo, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Model as TractorModel } from "@/components/TractorModel";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface HomeProps {
  readyForAnimations?: boolean;
  onModelLoaded?: () => void;
}

const HomeComponent: React.FC<HomeProps> = ({ readyForAnimations, onModelLoaded }) => {
  const width = typeof window !== "undefined" ? window.innerWidth : 800;
  const height = typeof window !== "undefined" ? window.innerHeight : 600;
  const minBound = Math.max(Math.min(width, height), 550);
  const modelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tl = useRef<any>(null);

  useGSAP(()=>{
     if (modelRef.current) {
      gsap.set(
        modelRef.current,
        {
          opacity: 0,
        }
      )}

      if (headingRef.current) {
      gsap.set(
        headingRef.current,
        {
          opacity: 0,
          y: 20,
        }
      )}

    if(!readyForAnimations) return;
    
    if (modelRef.current) {
      gsap.fromTo(
        modelRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
          ease: "power1.out",
        }
      );
    }

    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power1.out",
        }
      );
    }
  }, {dependencies: [modelRef, headingRef, readyForAnimations]})


  useGSAP(()=>{
    if(!readyForAnimations) return;

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.current.to(containerRef.current, {
      y: 120,
      scale: 0.9,
      opacity: 0.2,
      ease: "none",
    });

    if (modelRef.current) {
      tl.current.to(
        modelRef.current,
        {
          y: -100,
          x: 150,
          rotateY: 90,
          scale: 0.7,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }

    if (overlayRef.current) {
      tl.current.to(
        overlayRef.current,
        {
          opacity: 0.8,
          ease: "none",
        },
        0
      );
    }
  })
  return (
    <div id="home" ref={containerRef} className="relative" style={{ transformOrigin: "center top" }}>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-0 pointer-events-none opacity-0"
      />

      <div
        ref={modelRef}
        className="absolute w-max h-max top-0 right-0 lg:right-10 z-1"
        style={{ perspective: "1200px", width: minBound * 1.2, height: minBound * 1.2 }}
      >
        <Canvas
          camera={{ position: [25, 15, 25], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[10, 15, 10]} intensity={2} castShadow />
            <directionalLight position={[-10, 5, -5]} intensity={0.5} />
            <pointLight position={[0, 10, 0]} intensity={1} />
            <Environment preset="sunset" />
            
            <TractorModel 
              onLoaded={onModelLoaded}
              position={[0, -3, 0]}
              rotation={[0, Math.PI / 4, 0]}
            />
            
            <OrbitControls
              enablePan={false}
              enableRotate={true}
              enableZoom={false}
              autoRotate={true}
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="w-full min-h-screen flex flex-row py-6 px-6 sm:px-12 lg:px-28 justify-start items-center relative z-2">
        <div ref={headingRef} className="flex flex-col gap-4 sm:gap-6 relative z-3 w-full max-w-2xl">
          <Heading
            readyForAnimations={readyForAnimations}
            title="Del campo al Futuro"
            titleSize="text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
            description="Conectamos la agricultura con la innovación real. Soluciones de automatizacion para que tu finca produzca más gastando menos."
          />
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-2 sm:mt-4">
     
            
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimización: memoizar para evitar re-renders innecesarios
const Home = memo(HomeComponent);
export default Home;
