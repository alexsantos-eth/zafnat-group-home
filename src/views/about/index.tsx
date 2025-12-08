"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import Heading from "@/layout/components/heading";
import MetaBalls from "@/components/MetaBalls";
import AboutUserItem from "./components/about-user-item";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (context) => {
      const container = containerRef.current;
      const text = textRef.current;
      const image = imageRef.current;
      const cards = cardsRef.current?.querySelectorAll(".card-item");

      if (!container || !text || !image || !cards) return;

      /** ------------------------------
       * 1) Scroll anim para el container
       * ------------------------------*/
      context.add(() => {
        gsap.to(container, {
          y: 100,
          x: 60,
          scale: 0.94,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      /** ------------------------------
       * 2) Fade-up del texto cuando entra
       * ------------------------------*/
      context.add(() => {
        gsap.from(text, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            once: true,
          },
        });
      });

      /** ------------------------------
       * 3) Imagen entrando desde arriba
       * ------------------------------*/
      context.add(() => {
        gsap.from(image, {
          opacity: 0,
          y: -50,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: image,
            start: "top 80%",
            once: true,
          },
        });
      });




      context.add(() => {

        if (cards.length !== 3) {
          console.warn("Este efecto está diseñado para exactamente 3 cards.");
          return;
        }

        // Posiciones predefinidas

        const positions = [
          { x: -200, scale: 0.9, zIndex: 2 },  // izquierda
          { x: 0, scale: 1.3, zIndex: 3 },     // centro
          { x: 200, scale: 0.9, zIndex: 2 },   // derecha
        ];

        let centerIndex = 0;

        cards.forEach((card, i) => {
          const pos = positions[(i - centerIndex + 3) % 3];
          gsap.set(card, {
            position: "absolute",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: pos.x,
            scale: pos.scale,
            zIndex: pos.zIndex,
            opacity: 0,
          });
        });

        // Fade-in cuando aparecen
        gsap.to(cards, {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // Función que actualiza las posiciones según el centro actual
        function updatePositions(cards:any) {
          cards.forEach((card:any, i:any) => {
            const pos = positions[(i - centerIndex + 3) % 3];

            gsap.to(card, {
              x: pos.x,
              scale: pos.scale,
              zIndex: pos.zIndex,
              duration: 1.1,
              ease: "power3.inOut",
            });
          });
        }

        // Animación cíclica
        const interval = setInterval(() => {
          centerIndex = (centerIndex + 1) % 3;
          updatePositions(cards);
        }, 2500);

        // Limpieza
        return () => clearInterval(interval);
      });

    },
    { scope: containerRef });

  return (
    <div
      id="about"
      className="relative h-auto w-full flex flex-row items-start justify-between z-2"
    >
      <div
        className="absolute top-0 left-0 w-full h-full backdrop-hue-rotate-30 scale-120 sm:scale-110 -skew-6 z-0 pointer-events-none"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.3)",
        }}
      />

      <div
        ref={containerRef}
        className="relative z-1 w-full px-6 sm:px-12 lg:px-28 py-16 sm:py-24 lg:py-32 flex flex-col lg:flex-row items-start lg:items-center justify-start gap-16 sm:gap-20 lg:gap-30"
      >
        {/* TEXT AREA */}
        <div ref={textRef} className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-3 sm:gap-4 relative z-2 max-w-full sm:max-w-md min-w-2xs sm:min-w-md">
            <Heading
              titleSize="max-w-3xs sm:max-w-md text-3xl sm:text-4xl lg:text-5xl"
              title="¿Quiénes Somos?"
              delay={100}
              description="Zafnat Group Es un grupo empresarial internacional con operaciones en Guatemala, República Dominicana, Estados Unidos e Italia."
            />
          </div>


          <div className=" w-full flex flex-col gap-3 sm:w-sm text-xs sm:text-sm p-4 sm:p-6 border border-white/80 rounded-xl sm:rounded-2xl leading-5 sm:leading-6 ">
            <p
              className="text-gray-200 text-s"
            >
              Nuestra trayectoria
            </p>
            <p
              className="text-gray-300/80 text-justify"
            >
              Nace de la experiencia directa en la producción agrícola y del compromiso de impulsar la productividad del campo mediante la innovación tecnológica, el desarrollo humano y la implementación de infraestructura sostenible.
            </p>
          </div>



          <div className=" w-full flex flex-col gap-3 sm:w-sm text-xs sm:text-sm p-4 sm:p-6 border border-white/80 rounded-xl sm:rounded-2xl leading-5 sm:leading-6 ">
            <p
              className="text-gray-200 text-s"
            >
              Nuestra misión
            </p>
            <p
              className="text-gray-300/80 text-justify"
            >
              Elevar la productividad y sostenibilidad del sector agrícola mediante soluciones innovadoras, desarrollo humano y tecnología de vanguardia, generando valor para nuestros clientes, comunidades y colaboradores en los países donde operamos.
            </p>
          </div>
          
          
        </div>

        {/* IMAGE + CARDS */}
        <div
          ref={imageRef}
          className="relative flex items-start h-[250px] sm:h-[300px] lg:h-[500x] justify-center w-full lg:w-auto z-0"
        >
          <div className="absolute w-full h-full top-[-140px] z-0 opacity-100">
            <MetaBalls
              color="#eeb200"
              cursorBallSize={2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction={false}
              enableTransparency
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
          </div>

          <div className="relative w-[500px] h-[500px]">
            {/* Fija el layout */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div ref={cardsRef} className="relative z-2 w-full flex flex-col gap-4 items-center [&>*]:w-40">

                <AboutUserItem
                  name="Juan Pérez"
                  image="/images/about/placeholder_team.jpg"
                  position="Director General"
                  className="card-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <AboutUserItem
                  name="María González"
                  image="/images/about/placeholder_team.jpg"
                  position="Gerente de Operaciones"
                  className="card-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                <AboutUserItem
                  name="Carlos Rodríguez"
                  image="/images/about/placeholder_team.jpg"
                  position="Director de Tecnología"
                  className="card-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />

              </div>
            </div>
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
