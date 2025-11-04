import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import VariableProximity from "../../components/VariableProximity";

const Home: React.FC = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);
  const [blurValue, setBlurValue] = useState(1);

  const containerRef: React.RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        duration: 1.2,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.3,
      });

      gsap.from([subtitle1Ref.current, subtitle2Ref.current], {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.8,
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const blur = normalizedDistance * 3;

      setBlurValue(blur);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="bg-home h-dvh w-full">
      <div
        className="w-full h-dvh bg-[url(/images/noise.png)] bg-repeat fixed top-0 left-0 z-1000 mix-blend-multiply pointer-events-none"
        style={{ backgroundSize: "120px 120px" }}
      />

      <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-row items-center justify-center">
        <div className="absolute top-[50%] left-[50%] transform-[translate(-50%,-40%)]">
          <img
            src="/images/home/hero.png"
            className="h-xl w-xl transition-all duration-200"
            style={{
              filter: `blur(${blurValue}px)`,
            }}
          />
        </div>

        <div className="flex flex-col gap-2 items-center z-1 px-8 py-20">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label="De la Tierra al Futuro"
              className={
                "variable-proximity-demo text-white text-7xl font-medium uppercase"
              }
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={containerRef as React.RefObject<HTMLElement>}
              radius={100}
              falloff="linear"
            />
          </div>

          <div className="flex flex-row items-center gap-3">
            <p ref={subtitle1Ref} className="text-gray-200 font-light text-lg">
              Conectamos la agricultura con la innovación.
            </p>
            <p ref={subtitle2Ref} className="text-gray-200 font-light">
              Tecnología | Sostenibilidad | Precisión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
