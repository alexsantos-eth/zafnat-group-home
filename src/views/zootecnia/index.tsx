import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Heading from "@/layout/components/heading";
import { useImagePreload } from "@/hooks/useImagePreload";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ZootecniaPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectorsRef = useRef<HTMLDivElement[]>([]);

  const sectors = [
    {
      title: "Ganadería",
      description:
        "Producción bovina de carne y leche con sistemas de pastoreo rotacional y monitoreo GPS.",
      technologies: ["Collar GPS", "Pesaje Automático", "Diagnóstico Reproductivo"],
      icon: "🐄",
      gradient: "from-red-900/30 to-orange-900/30",
      image:
        "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600&h=400&fit=crop",
    },
    {
      title: "Avicultura",
      description:
        "Producción de huevos y carne de pollo con control climático automatizado y bioseguridad.",
      technologies: ["Clima Inteligente", "Alimentación IoT", "Sanidad Digital"],
      icon: "🐔",
      gradient: "from-yellow-900/30 to-amber-900/30",
      image:
        "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&h=400&fit=crop",
    },
    {
      title: "Porcicultura",
      description:
        "Cría tecnificada de cerdos con gestión por etapas y monitoreo de indicadores productivos.",
      technologies: ["Comederos Smart", "Control de Peso", "Ventilación IA"],
      icon: "🐖",
      gradient: "from-pink-900/30 to-rose-900/30",
      image:
        "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop",
    },
    {
      title: "Acuicultura",
      description:
        "Cultivo sostenible de peces y camarones con sistemas recirculantes y análisis de agua.",
      technologies: ["Sensores pH/O₂", "Alimentación Auto", "Recirculación"],
      icon: "🐟",
      gradient: "from-blue-900/30 to-cyan-900/30",
      image:
        "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&h=400&fit=crop",
    },
    {
      title: "Apicultura",
      description:
        "Producción de miel y polinización con colmenas inteligentes y monitoreo remoto.",
      technologies: ["Báscula Digital", "Sensor Temp", "Alerta Enjambre"],
      icon: "🐝",
      gradient: "from-yellow-800/30 to-orange-800/30",
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784422?w=600&h=400&fit=crop",
    },
  ];

  // Preload images
  useImagePreload(sectors.map((s) => s.image));

  useGSAP(
    () => {
      sectorsRef.current.forEach((sector) => {
        gsap.fromTo(
          sector,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power1.out",
            scrollTrigger: {
              trigger: sector,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.to(containerRef.current, {
        y: 40,
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.3,
          markers:true,
        },
      });
    },
    { scope: containerRef, dependencies: [sectorsRef]} // auto-cleanup
  );

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center pt-10 z-2">
      <div
        className="absolute top-0 left-0 w-full h-full scale-110 -skew-y-3 z-0 pointer-events-none bg-gradient-to-tr from-purple-900/30 to-indigo-950/40"
        style={{ boxShadow: "0 -50px 100px rgba(0,0,0,.4)" }}
      />

      <div ref={containerRef} className="relative z-1 w-full px-6 sm:px-12 lg:px-28">
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
          <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl">
            <Heading
              title="Zootecnia"
              titleSize="text-4xl sm:text-6xl lg:text-8xl"
              description="Producción animal tecnificada con bienestar garantizado, trazabilidad completa y gestión inteligente de recursos."
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {sectors.map((sector, index) => (
              <div
                key={index}
                ref={(el) => {el && (sectorsRef.current[index] = el)}}
                className="group relative rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all duration-500 hover:scale-105 overflow-hidden"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0">
                  <img
                    src={sector.image}
                    alt={sector.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className={`absolute inset-0 bg-gradient-to-br ${sector.gradient} backdrop-blur-lg`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-purple-500/10 group-hover:to-pink-500/5 transition-all duration-500" />
                </div>

                <div className="relative z-1 p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {sector.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {sector.description}
                      </p>
                    </div>
                    <span className="text-6xl">{sector.icon}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sector.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white border border-white/20 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZootecniaPage;
