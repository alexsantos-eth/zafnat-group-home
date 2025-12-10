import { lazy, Suspense, useEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { useGSAP } from "@gsap/react";

const LazyParticleBackground = lazy(() => import("@/fx/particles"));

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ParticleBackground = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    setDocumentHeight(document.body.scrollHeight);
  }, []);

  useGSAP(() => {
    if (particlesRef.current) {
      gsap.fromTo(
        particlesRef.current,
        { opacity: 0 },
        { opacity: 0.4, duration: 10, ease: "back.inOut" }
      );
    }
  });

  return (
    <>
      {
        <div
          ref={particlesRef}
          style={{
            height: documentHeight + "px",
          }}
          className=" absolute top-0 z-0 w-full opacity-0"
        >
          <Suspense fallback={null}>
            <LazyParticleBackground
              particleColors={["#706b6b7a"]}
              particleCount={800}
              particleSpread={4}
              speed={0.06}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={true}
              disableRotation={true}
              particleHoverFactor={1}
            />
          </Suspense>
        </div>
      }
    </>
  );
};

export const GradientBackground = () => {
  const [documentHeight, setDocumentHeight] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      y: "-10%",
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  useEffect(() => {
    setDocumentHeight(document.body.scrollHeight);
  }, []);

  return (
    <div
      ref={bgRef}
      style={{ height: documentHeight + "px" }}
      className="fixed top-0 w-full z-0 pointer-events-none bg-transition"
    />
  );
};

export default ParticleBackground;
