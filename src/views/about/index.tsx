import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Heading from "@/layout/components/heading";

import AboutUserItem from "./components/about-user-item";
import MetaBalls from "@/components/MetaBalls";

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
      y: 100,
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
              delay: 1,
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
              delay: 1.5,
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
    <div className="relative h-auto w-full flex flex-row items-start justify-between z-2">
      {/* BACKGROUND */}
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-hue-rotate-30 scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.3)",
        }}
      />

      <div
        className="relative z-1 w-full px-12 sm:px-28 py-32 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
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

        <div
          ref={imageRef}
          className="relative not-last:flex items-start h-[330px] justify-center"
        >
          <div className="absolute w-full h-full top-0 z-0 opacity-50">
            <MetaBalls
              color="#eeb200"
              cursorBallSize={2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction={true}
              enableTransparency
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
          </div>

          <div
            ref={cardsRef}
            className="relative z-2 w-full flex flex-col gap-4 items-center"
          >
            <div className="flex flex-row gap-4 items-start">
              <AboutUserItem
                name="Juan Pérez"
                position="Director General"
                team="Equipo Ejecutivo"
                className="w-max"
              />

              <AboutUserItem
                name="María González"
                position="Gerente de Operaciones"
                team="Equipo de Operaciones"
                className="w-max"
              />
            </div>

            <AboutUserItem
              name="Carlos Rodríguez"
              position="Director de Tecnología"
              team="Equipo de Innovación"
              className="w-max"
            />
          </div>

          <img
            src="/images/about/hero.png"
            alt="About Hero"
            className="rounded-xl w-full absolute bottom-0 right-0 h-auto z-1"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
