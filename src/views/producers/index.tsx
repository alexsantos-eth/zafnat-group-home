import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useImagePreload } from '@/hooks/useImagePreload';
import Heading from "@/layout/components/heading";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

const ProducersPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);


  const services = [
    {
      category: 'Tecnología',
      title: 'Diagnóstico Digital',
      description: 'Análisis de suelo, clima y cultivos mediante IA y sensores IoT.',
      features: ['Análisis de suelo', 'Monitoreo climático', 'Predicción de cosechas'],
      icon: '🌱',
      color: 'from-emerald-500 to-green-600',
      image: '/images/producers/diagnostico.png',
    },
    {
      category: 'Capacitación',
      title: 'Formación Técnica',
      description: 'Programas especializados en agricultura de precisión y sostenibilidad.',
      features: ['Agricultura 4.0', 'Certificaciones', 'Talleres prácticos'],
      icon: '📚',
      color: 'from-blue-500 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    },
    {
      category: 'Comercialización',
      title: 'Acceso a Mercados',
      description: 'Conectamos productores con compradores y plataformas digitales.',
      features: ['Exportación', 'E-commerce agrícola', 'Networking'],
      icon: '🌐',
      color: 'from-purple-500 to-indigo-600',
      image: '/images/producers/acceso.png',
    },
    {
      category: 'Financiero',
      title: 'Financiamiento',
      description: 'Asesoría para acceder a créditos y fondos de inversión.',
      features: ['Crédito agrícola', 'Subsidios', 'Capital de riesgo'],
      icon: '💰',
      color: 'from-amber-500 to-orange-600',
      image: '/images/producers/financiamiento.png',
    },
  ];

  useImagePreload(services.map(service => service.image));

  useGSAP(
    (context) => {

      const cards = cardsRef.current.filter(Boolean);

      ScrollTrigger.refresh();

      // Animación de cada card
      cards.forEach((card) => {
        context.add(() => {
          gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 60%",
                toggleActions: "play reverse play reverse",
                scrub: true,
              },
            });
        });
      });

      // Parallax del contenedor
      context.add(() => {
        gsap.to(containerRef.current, {
          y: 40,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      });

      context.add(() => {
        gsap.to(bgRef.current, {
          y: 200, // parallax suave y elegante
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });



    },
    { scope: containerRef, dependencies: [cardsRef, bgRef] }
  );


  return (
    <div id="producers" ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center py-20 sm:py-24 lg:py-32 top-[-120px] overflow-hidden">
      <div
        ref={bgRef}
        className="absolute top-0 left-0 w-full h-full scale-150 -skew-y-3 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/producers/bg.png')",
        }}
      />
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gray-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full relative top-0 h-full">
        <div className="z-1 w-full px-6 sm:px-12 lg:px-28 flex flex-col items-start justify-between gap-12 sm:gap-14 lg:gap-18">
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-[500px] pt-20">
            <Heading
              title="Productores"
              delay={100}
              titleSize="max-w-3xs sm:max-w-[710px] text-7xl"
              description=" Herramientas digitales y apoyo técnico para agricultores modernos. Optimiza tu producción con tecnología de punta."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                ref={(el) => {el ? (cardsRef.current[index] = el) : null}}
                className="group relative bg-black/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="eager"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60 group-hover:opacity-40 transition-opacity duration-300`} />
                </div>

                <div className="relative z-10 p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="flex-1">
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-semibold text-white/80 mb-3">
                        {service.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 group-hover:text-emerald-300 transition-colors">
                        {service.title}
                      </h3>
                    </div>
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-3xl sm:text-4xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      {service.icon}
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4 sm:mb-5">
                    {service.description}
                  </p>

                  <div className="space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                        <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full blur-3xl group-hover:opacity-25 transition-all duration-300`}></div>
                </div>
              </div>
            ))}
          </div>


          <div className="w-full relative bg-gradient-to-r from-emerald-900/60 to-green-900/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-14 border border-emerald-500/40 overflow-hidden mt-4 sm:mt-6 lg:mt-8">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 flex  flex-col text-center lg:text-left gap-8 items-start">

                  <div className="flex flex-col gap-5">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                      ¿Listo para transformar tu producción?
                    </h3>
                    <p className="text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg leading-relaxed">
                      Próximamente podrás unirte a <span className="text-emerald-300 font-semibold">cientos de productores que optimizan sus cultivos</span> con soluciones basadas en datos, inteligencia artificial y trazabilidad agrícola.
                    </p>
                  </div>


                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                    <button onClick={() => {
                      gsap.to(window, { duration: 1, scrollTo: "#contact", ease: "power2.inOut" });
                    }} className="group relative bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/60 hover:scale-105 text-sm sm:text-base">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Contactar Ahora
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="relative w-full">
                    <div className="flex bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex  flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center text-xl">✓</div>
                          <span className="text-white text-sm">Diagnóstico 100% gratis</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-xl">✓</div>
                          <span className="text-white text-sm">Sin compromiso inicial</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center text-xl">✓</div>
                          <span className="text-white text-sm">Respuesta en 24h</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducersPage;
