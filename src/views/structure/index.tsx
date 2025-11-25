import Heading from "@/layout/components/heading";
import StructureItem from "./components/structure-item";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";

const StructurePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: 100,
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative h-[50vh] pb-14 w-full flex flex-row items-start justify-between z-2 top-12"
      >
        {/* BACKGROUND */}
        <div
          className="absolute bg-orange top-0 left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
          style={{
            boxShadow:
              "0 -50px 100px rgba(0,0,0,.6), inset 0 100px 100px rgba(0,0,0,0.6)",
          }}
        />

        <div className="relative z-1 w-full px-12 sm:px-28 py-6 sm:py-16 lg:py-36 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="flex flex-col gap-12 items-start">
            <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[390px]">
              <Heading
                titleSize="max-w-3xs sm:max-w-[710px] text-7xl"
                title="Nuestra    Estructura"
                delay={100}
                description="Tres pilares, un mismo propósito."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative top-15 z-3">
        <StructureItem
          title="InnoVagro"
          description="Agricultura de precisión y trazabilidad Digital. Plataforma que optimiza la comercialización agrícola usando inteligencia artificial."
          imageSrc="/images/structure/hero_1.png"
        />

        <StructureItem
          title="Panea"
          description="Formación y cooperación científica internacional. Conectamos expertos, universidades y productores para promover el conocimiento agroindustrial."
          imageSrc="/images/structure/hero_2.png"
        />

        <StructureItem
          title="Goshen"
          description=" Infraestructura y bienes raíces a groindustriales. Creamos espacios sostenibles y productivos que impulsan el desarrollo rural y humano."
          imageSrc="/images/structure/hero_3.png"
        />
      </div>
    </>
  );
};

export default StructurePage;
