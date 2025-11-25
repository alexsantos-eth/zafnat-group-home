import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import { Timeline } from "@/components/ui/timeline";
import Heading from "@/layout/components/heading";
import ModelViewer from "@/components/ModelViewer";

const ModulesPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const width = typeof window !== "undefined" ? window.innerWidth : 800;

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

  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!timelineRef.current) return;

    const element = timelineRef.current;

    // Configurar estado inicial
    gsap.set(element, {
      opacity: 0,
      y: 30,
    });

    // Crear IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar cuando el elemento es visible
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1,
              ease: "power2.out",
            });
            // Dejar de observar después de la animación
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.4, // Activar cuando el 20% del elemento sea visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative h-[125vh] pb-14 w-full flex flex-row items-start justify-between z-3 top-24 py-32">
        {/* BACKGROUND */}
        <div
          className="absolute top-0 bg-about brightness-80 left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
          style={{
            boxShadow: "0 -50px 100px rgba(0,0,0,.3)",
          }}
        />

        <div ref={containerRef} className="w-full relative top-0 h-full">
          <div className="absolute z-1 w-full px-12 sm:px-28 flex flex-col items-start justify-between gap-18">
            <div className="flex flex-col gap-12 items-start">
              <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[450px]">
                <Heading
                  title="InnoVAgro"
                  delay={100}
                  titleSize="max-w-3xs sm:max-w-[710px] text-7xl"
                  description="Plataforma de agricultura de precisión que combina datos, IA para transformar la producción de alimentos."
                />
              </div>
            </div>

            <div ref={timelineRef}>
              <Timeline
                data={[
                  {
                    title: "Análisis de Terreno y Recursos",
                    content: (
                      <div>
                        <p className="font-normal text-md text-gray-300">
                          Diagnóstico inteligente del suelo y clima.
                        </p>
                      </div>
                    ),
                  },
                  {
                    title: "Planificación Productiva",
                    content: (
                      <div>
                        <p className="font-normal text-md text-gray-300">
                          Estrategias agrícolas personalizadas.
                        </p>
                      </div>
                    ),
                  },
                  {
                    title: "Gestión de Operaciones",
                    content: (
                      <div>
                        <p className="font-normal text-md text-gray-300">
                          Control total de maquinaria, insumos y personal.
                        </p>
                      </div>
                    ),
                  },
                  {
                    title: "Trazabilidad y Certificaciones",
                    content: (
                      <div>
                        <p className="font-normal text-lg text-gray-300">
                          Cumpla normas internacionales con facilidad.
                        </p>
                      </div>
                    ),
                  },
                  {
                    title: "Comercialización Inteligente",
                    content: (
                      <div>
                        <p className="font-normal text-lg text-gray-300">
                          Datos de mercado, precios y oportunidades en tiempo
                          real.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          </div>

          <div className="sticky flex justify-end px-12 sm:px-28 h-max top-20 z-3 w-full">
            <ModelViewer
              scrollRotate
              modelXOffset={0}
              modelYOffset={0}
              width={width * 0.5}
              height={400}
              fadeIn
              autoFrame
              defaultZoom={0.8}
              maxZoomDistance={10000}
              enableManualRotation={false}
              enableManualZoom={false}
              autoRotateSpeed={0.05}
              defaultRotationY={30}
              defaultRotationX={100}
              showScreenshotButton={false}
              url="/models/dron/scene.glb"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulesPage;
