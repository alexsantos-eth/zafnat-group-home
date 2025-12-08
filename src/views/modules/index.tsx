"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

import { Timeline } from "@/components/ui/timeline";
import Heading from "@/layout/components/heading";

gsap.registerPlugin(ScrollTrigger);

export default function ModulesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const imageCardRef = useRef<HTMLDivElement>(null);

  // ==========================
  // ANIMACIONES
  // ==========================
  useGSAP(() => {
    // ANIMACIÓN DEL CONTENEDOR (fondo/heading)
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

    // APARICIÓN DEL TIMELINE
    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          once: true,
        },
        ease: "power3.out",
      }
    );
  });

  // ==========================
  // RENDER
  // ==========================
  return (
    <section
      id="modules"
      className="relative h-[140vh] w-full flex flex-row items-start justify-between z-3 top-[-80px] pt-20 pb-32"
    >
      {/* BACKGROUND */}
      <div
        className="absolute top-0 bg-about brightness-80 left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{ boxShadow: "0 -50px 100px rgba(0,0,0,.3)" }}
      />

      {/* CONTENEDOR PRINCIPAL */}
      <div ref={containerRef} className="w-full relative h-full">
        <div className="absolute z-1 w-full px-6 sm:px-12 lg:px-28 flex flex-col items-start gap-14">
          {/* HEADER */}
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[600px] pt-12">
            <Heading
              title="InnoVAgro"
              delay={100}
              titleSize="max-w-3xs sm:max-w-[710px] text-7xl"
              description="Nuestro pilar fundamental. Monitorea, planifica y gestiona tu finca con datos en tiempo real, inteligencia artificial y herramientas diseñadas para productores y agroempresas."
            />
          </div>

          {/* TIMELINE */}
          <div ref={timelineRef} className="relative z-2">
            <Timeline
              data={[
                {
                  title: "Análisis de Terreno y Recursos",
                  content: (
                    <p className="font-normal text-md text-gray-300">
                      Diagnóstico inteligente del suelo y clima.
                    </p>
                  ),
                },
                {
                  title: "Planificación Productiva",
                  content: (
                    <p className="font-normal text-md text-gray-300">
                      Estrategias agrícolas personalizadas.
                    </p>
                  ),
                },
                {
                  title: "Gestión de Operaciones",
                  content: (
                    <p className="font-normal text-md text-gray-300">
                      Control total de maquinaria, insumos y personal.
                    </p>
                  ),
                },
                {
                  title: "Trazabilidad y Certificaciones",
                  content: (
                    <p className="font-normal text-lg text-gray-300">
                      Cumpla normas internacionales con facilidad.
                    </p>
                  ),
                },
                {
                  title: "Comercialización Inteligente",
                  content: (
                    <p className="font-normal text-lg text-gray-300">
                      Datos de mercado, precios y oportunidades en tiempo real.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* IMAGEN STICKY A LA DERECHA */}
        <div className="sticky top-24 flex justify-end px-12 sm:px-50 w-full z-3">
          <div
            ref={imageCardRef}
            className="w-[50%] max-w-md  rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <img
              src="/images/modules/innovagro.png"
              alt="module-image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
