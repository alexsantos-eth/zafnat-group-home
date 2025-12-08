"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import StructureItem from "./components/structure-item";

gsap.registerPlugin(ScrollTrigger);

const StructurePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  // ---------------------------------
  // HEADER SCROLL ANIMATION
  // ---------------------------------
  useGSAP(
    (context) => {
      if (!containerRef.current) return;

      context.add(() => {
        gsap.to(containerRef.current, {
          x: 80,
          y: 100,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: containerRef }
  );

  // ---------------------------------
  // EXPANDING PANELS ON HOVER
  // ---------------------------------
  useGSAP(() => {
    const panels = Array.from(panelsRef.current?.querySelectorAll(".panel") ?? []);
    const hitAreas = Array.from(panelsRef.current?.querySelectorAll(".panel-hit") ?? []);

    if (!panels.length || !hitAreas.length) return;

    // Valores por defecto
    panels.forEach((panel) => {
      const content = panel.querySelector(".panel-content");
      gsap.set(panel, { flexGrow: 1, flexBasis: 0 });
      gsap.set(content, { opacity: 0, y: 20 });
    });

    hitAreas.forEach((hitArea, index) => {
      const panel = panels[index];
      const content = panel.querySelector(".panel-content");

      hitArea.addEventListener("mouseenter", () => {
        gsap.to(panels, {
          flexGrow: 0.6,
          duration: 0.5,
          ease: "power3.out",
        });

        // Panel seleccionado se expande
        gsap.to(panel, {
          flexGrow: 2,
          duration: 0.5,
          ease: "power3.out",
        });

        // Mostrar contenido
        gsap.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        });
      });

      hitArea.addEventListener("mouseleave", () => {
        gsap.to(panels, { flexGrow: 1, duration: 0.5 });
        gsap.to(content, { opacity: 0, y: 20, duration: 0.4 });
      });
    });
  });

  return (
    <div id="structure" className="relative w-full min-h-screen flex flex-col">
      <div ref={containerRef} className="relative z-10 px-12 sm:px-28 pt-35 pb-16">
        <h2 className="text-white font-bold text-4xl sm:text-6xl lg:text-7xl leading-tight mb-4">
          Nuestra Estructura
        </h2>
        <p className="text-gray-200 font-medium text-lg">
          Tres pilares, un mismo propósito.
        </p>
      </div>

      {/* PANELS */}
      <div
        ref={panelsRef}
        className="flex flex-row w-full h-[75vh] overflow-hidden relative "
      >
        <div className="panel relative flex items-center justify-center overflow-hidden  cursor-pointer">
          <div className="panel-hit absolute inset-0 z-50"></div>
          <StructureItem
            title="InnoVagro"
            description="Soluciones tecnológicas aplicadas al agro: IA, sensores, automatización y sistemas de monitoreo."
            imageSrc="/images/structure/innovagro.png"
          />
        </div>

        <div className="panel relative flex items-center justify-center overflow-hidden cursor-pointer">
          <div className="panel-hit absolute inset-0 z-50"></div>
          <StructureItem
            title="Panea"
            description="Desarrollo de eventos académicos, congresos y simposios internacionales para fortalecer la formación de productores y empresas agrícolas."
            imageSrc="/images/structure/hero_2.png"
          />
        </div>

        <div className="panel relative flex items-center justify-center overflow-hidden cursor-pointer">
          <div className="panel-hit absolute inset-0 z-50"></div>
          <StructureItem
            title="Goshen"
            description="A través de Goshen, Zafnat promueve proyectos agrícolas e industriales que integran innovación, sostenibilidad y desarrollo humano."
            imageSrc="/images/structure/goshen.png"
          />
        </div>
      </div>
    </div>
  );
};

export default StructurePage;
