import Heading from "@/layout/components/heading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!imageRef.current || !cardsRef.current) return;

    const image = imageRef.current;
    const cards = cardsRef.current.querySelectorAll(".card-item");

    // Estado inicial
    gsap.set(image, { opacity: 0, y: -50 });
    gsap.set(cards, { opacity: 0, y: -30 });

    // Observer para la imagen
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(image, {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1.5,
              ease: "power2.out",
            });
            imageObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observer para las cards
    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              delay: 2,
              ease: "power2.out",
            });
            cardsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    imageObserver.observe(image);
    if (cardsRef.current) cardsObserver.observe(cardsRef.current);

    return () => {
      imageObserver.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative lg:h-[90vh] h-[120vh] sm:h-[130vh] w-full flex flex-row items-start justify-between">
      {/* BACKGROUND */}
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-hue-rotate-30 scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow:
            "0 -50px 100px rgba(0,0,0,.6), inset 0 100px 100px rgba(0,0,0,0.6)",
        }}
      />

      <div
        className="relative z-1 w-full px-12 sm:px-28 py-6 sm:py-16 lg:py-36 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
        ref={containerRef}
      >
        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-md min-w-2xs sm:min-w-md">
            <Heading
              titleSize="max-w-3xs sm:max-w-md text-5xl"
              title="¿Quiénes Somos?"
              delay={100}
              description="Zafnat Group Es un grupo empresarial internacional con operaciones en Guatemala, República Dominicana, Estados Unidos e Italia."
            />
          </div>

          <p
            ref={textRef}
            className="text-gray-300/80 w-full sm:w-sm text-sm p-6 border border-white/80 rounded-2xl leading-6"
          >
            Con experiencia agrícola, impulsamos la productividad mediante
            tecnología, desarrollo humano e infraestructura sostenible.
          </p>
        </div>

        <div className="flex items-start justify-center w-full lg:w-auto h-[30vh] lg:h-auto">
          <img
            ref={imageRef}
            src="/images/about/hero.png"
            alt="About Hero"
            className="rounded-xl w-md absolute -bottom-70 lg:-bottom-10 h-auto z-0"
          />

          {/* Card 1 */}
          <div
            ref={cardsRef}
            className="relative z-1 w-full grid grid-cols-[1fr_1fr] lg:grid-cols-[auto_auto] gap-6 top-0 lg:-top-20"
          >
            <div className="card-item border border-white rounded-xl px-4 py-4 w-full">
              <h3 className="text-white text-lg font-semibold mb-2">
                Juan Pérez
              </h3>
              <p className="text-gray-300 text-sm mb-1">Director General</p>
              <p className="text-gray-400 text-xs">Equipo Ejecutivo</p>
            </div>

            {/* Card 2 */}
            <div className="card-item border border-white rounded-xl px-4 py-4 w-full">
              <h3 className="text-white text-lg font-semibold mb-2">
                María González
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                Gerente de Operaciones
              </p>
              <p className="text-gray-400 text-xs">Equipo de Operaciones</p>
            </div>

            {/* Card 3 */}
            <div className="w-full col-span-2 flex justify-center">
              <div className="card-item border border-white rounded-xl px-4 py-4 w-full max-w-[200px]">
                <h3 className="text-white text-lg font-semibold mb-2">
                  Carlos Rodríguez
                </h3>
                <p className="text-gray-300 text-sm mb-1">
                  Director de Tecnología
                </p>
                <p className="text-gray-400 text-xs">Equipo de Innovación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
