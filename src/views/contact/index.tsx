import { useEffect, useRef } from "react";
import Heading from "@/layout/components/heading";

import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const ContactPage: React.FC = () => {
  const [result, setResult] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "143aecec-f49a-474c-a22a-1dade7b77fd4");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(
      data.success
        ? "Mensaje enviado correctamente"
        : "Error al enviar el mensaje"
    );
  };

  useEffect(() => {
    const elements = [formRef.current, imageRef.current].filter(Boolean);
    if (elements.length === 0) return;

    // Configurar estado inicial
    gsap.set(elements, {
      opacity: 0,
      y: 30,
    });

    // Crear IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar cuando el elemento es visible
            gsap.to(entry.target, {
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

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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
    <div
      id="contact"
      className="relative w-full flex flex-col lg:flex-row items-start justify-between z-3 pt-100 sm:pt-100 lg:pt-100 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28"
    >
      {/* BACKGROUND */}
      <div
        className="absolute top-0 sm:top-0 lg:top-0 backdrop-brightness- left-0 w-full scale-120 sm:scale-110 -skew-0 z-0 pointer-events-none"
      />

      <div
        className="relative w-full flex flex-col lg:flex-row gap-10 sm:gap-12 md:gap-14 lg:gap-16 z-2"
        ref={containerRef}
      >
        <div className="flex flex-col gap-6 sm:gap-8 w-full max-w-xl">
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[400px]">
            <Heading
              titleSize="max-w-3xs sm:max-w-md text-3xl sm:text-4xl lg:text-5xl"
              title="Contacto"
              delay={100}
              description="¿Listo para digitalizar tu finca y mejorar tu producción? Nuestro equipo te ayudará a implementar InnoVAgro paso a paso."
            />
          </div>

          <div ref={imageRef} className="w-full flex">
            <img
              src="/images/contact/hero.png"
              alt="Contacto"
              className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] h-auto"
            />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          ref={formRef}
          className="flex flex-col gap-6 sm:gap-8 w-full max-w-xl"
        >
          <div className="flex flex-col gap-4">
            <label htmlFor="name" className="text-white font-medium text-md">
              Nombre completo
            </label>
            <input
              type="text"
              className="text-white border rounded-lg py-3 px-4 border-white"
              name="name"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-white font-medium text-md">
              Correo electrónico
            </label>
            <input
              type="email"
              className="text-white border rounded-lg py-3 px-4 border-white"
              name="email"
              required
            />
          </div>

          <div className="flex flex-col gap-4">
            <label htmlFor="message" className="text-white font-medium text-md">
              Tu mensaje
            </label>
            <textarea
              className="text-white border rounded-lg py-3 px-4 border-white"
              name="message"
              required
            />
          </div>

          <button
            type="submit"
            className="border cursor-pointer bg-white text-gray-600 rounded-lg w-full py-2"
          >
            Enviar mensaje
          </button>

          {result && <p className="text-white font-medium text-md">{result}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
