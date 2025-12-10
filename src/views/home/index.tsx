import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import VariableProximity from "../../components/VariableProximity";

const Home: React.FC = () => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);

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

  return (
    <div className="bg-home h-[130dvh] w-full relative">
      <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-row items-center justify-center">
        <div className="absolute top-[50%] left-[50%] md:transform-[translate(-50%,-20%)]">
          <img
            src="/images/home/hero.png"
            className="w-[120dvw] sm:w-[45dvw] max-w-dvw"
          />
        </div>

        <div className="flex flex-col gap-2 items-center z-1  translate-y-[-20dvh] sm:translate-y-[-30dvh] px-8">
          <div ref={containerRef} style={{ position: "relative" }}>
            <VariableProximity
              label="De la tierra al futuro"
              className={
                "variable-proximity-demo text-white text-6xl sm:text-8xl font-medium"
              }
              fromFontVariationSettings="'wght' 700, 'opsz' 9"
              toFontVariationSettings="'wght' 2000, 'opsz' 40"
              containerRef={containerRef as React.RefObject<HTMLElement>}
              radius={100}
              falloff="linear"
            />
          </div>

          <div className="flex flex-row items-center gap-3">
            <p ref={subtitle1Ref} className="text-gray-200 font-light text-lg">
              Conectamos la agricultura con la innovación. Tecnología,
              Sostenibilidad, Precisión.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
