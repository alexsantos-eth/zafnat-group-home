import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionTransitionProps {
  children: React.ReactNode;
  id: string;
  backgroundColor?: string;
  skewAngle?: number;
  parallaxIntensity?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  backgroundColor = "transparent",
  skewAngle = -3,
  parallaxIntensity = 100,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      tl.to(
        backgroundRef.current,
        {
          y: parallaxIntensity,
          ease: "none",
        },
        0
      );

      tl.to(
        contentRef.current,
        {
          y: parallaxIntensity * 0.5,
          opacity: 0.3,
          ease: "none",
        },
        0
      );
    },
    { dependencies: [parallaxIntensity], scope: containerRef }
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ transformOrigin: "center top" }}
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full scale-110 z-0 pointer-events-none"
        style={{
          backgroundColor,
          transform: `skewY(${skewAngle}deg)`,
          boxShadow: "0 -50px 100px rgba(0,0,0,.4)",
        }}
      />

      <div ref={contentRef} className="relative z-1 w-full">
        {children}
      </div>
    </div>
  );
};

export default SectionTransition;
