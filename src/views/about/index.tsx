import Heading from "@/layout/components/heading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Animación de parallax con scroll usando GSAP
    gsap.to(containerRef.current, {
      x: 100, // Movimiento hacia abajo (parallax)
      scale: 0.9, // Escala final
      opacity: 0, // Opacidad final
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // Suaviza la animación con el scroll
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    if (!textRef.current) return;

    const element = textRef.current;

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
        threshold: 0.2, // Activar cuando el 20% del elemento sea visible
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative h-[85vh] w-full flex flex-row items-center justify-between">
      {/* BACKGROUND */}
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-hue-rotate-30 scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow:
            "0 -50px 100px rgba(0,0,0,.6), inset 0 100px 100px rgba(0,0,0,0.6)",
        }}
      />

      <div
        className="flex flex-col gap-12 relative z-1 items-start px-12 sm:px-28"
        ref={containerRef}
      >
        <div className="flex flex-col gap-4 relative z-2 max-w-2xs sm:max-w-md min-w-2xs sm:min-w-md">
          <Heading
            titleSize="max-w-3xs sm:max-w-md text-5xl"
            title="¿Quiénes Somos?"
            delay={100}
            description="Zafnat Group Es un grupo empresarial internacional con operaciones en Guatemala, República Dominicana, Estados Unidos e Italia."
          />
        </div>

        <p
          ref={textRef}
          className="text-gray-300 w-full sm:w-sm text-sm p-6 border border-white rounded-2xl leading-6"
        >
          Con experiencia agrícola, impulsamos la productividad mediante
          tecnología, desarrollo humano e infraestructura sostenible.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
