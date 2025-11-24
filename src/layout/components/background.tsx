import { lazy, Suspense, useEffect, useRef, useState } from "react";

import DotGrid from "@/components/DotGrid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

interface ParticleBackgroundProps {
  disableHover?: boolean;
}
const LazyParticleBackground = lazy(() => import("@/components/Particles"));

gsap.registerPlugin(ScrollTrigger);

const ParticleBackground = ({ disableHover }: ParticleBackgroundProps) => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showParticles && particlesRef.current) {
      gsap.fromTo(
        particlesRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 10, ease: "power1.out" }
      );
    }
  }, [showParticles]);

  return (
    <>
      {showParticles && (
        <div
          ref={particlesRef}
          className="h-[200vh] absolute top-0 z-0 w-full pointer-events-none opacity-0"
        >
          <Suspense fallback={null}>
            <LazyParticleBackground
              particleColors={["#ffffff", "#ffffff"]}
              particleCount={300}
              particleSpread={10}
              speed={0.2}
              particleBaseSize={300}
              moveParticlesOnHover={!disableHover}
              alphaParticles={true}
              disableRotation={true}
              particleHoverFactor={0.2}
            />
          </Suspense>
        </div>
      )}
    </>
  );
};

export const GradientBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      y: "-75%",
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <div
      ref={bgRef}
      className="h-[350vh] fixed top-0 w-full z-0 pointer-events-none bg-transition"
    />
  );
};

interface GridBackgroundProps {
  style?: React.CSSProperties;
}
export const GridBackground = ({
  style = {
    position: "fixed",
    opacity: 0.6,
    left: 0,
  },
}: GridBackgroundProps) => {
  return (
    <DotGrid
      baseColor="#505050"
      activeColor="#ffffff"
      dotSize={8}
      gap={20}
      style={style}
    />
  );
};

export default ParticleBackground;
