import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImagePreload } from '@/hooks/useImagePreload';

gsap.registerPlugin(ScrollTrigger);

const CooperationPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement[]>([]);

  const partners = [
    { name: 'BID', description: 'Banco Interamericano de Desarrollo', icon: '🏦', image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=600&h=400&fit=crop' },
    { name: 'Banco Mundial', description: 'Financiamiento para proyectos sostenibles', icon: '🌍', image: 'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&h=400&fit=crop' },
    { name: 'FAO', description: 'Organización de las Naciones Unidas para la Alimentación', icon: '🌾', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop' },
    { name: 'IICA', description: 'Instituto Interamericano de Cooperación para la Agricultura', icon: '🤝', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop' },
    { name: 'Unión Europea', description: 'Programas de desarrollo y cooperación técnica', icon: '🇪🇺', image: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=400&fit=crop' },
    { name: 'USAID', description: 'Agencia de los Estados Unidos para el Desarrollo Internacional', icon: '🇺🇸', image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&h=400&fit=crop' },
  ];

  useImagePreload(partners.map(partner => partner.image));

  useEffect(() => {
    if (!containerRef.current) return;


    /*partners.forEach((partner) => {
      gsap.fromTo(
        partner,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: partner,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    if (documentsRef.current) {
      gsap.fromTo(
        documentsRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: documentsRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    gsap.to(containerRef.current, {
      y: 40,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.3,
      },
    });*/
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="cooperation" className="relative w-full min-h-screen flex items-center justify-center pb-40 z-2">
      <div
        className="absolute top-0 left-0 w-full h-full scale-110 skew-y-5 z-0 pointer-events-none"
      />

      <div ref={containerRef} className="relative z-1 w-full px-6 sm:px-12 lg:px-28">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20">
          <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl">
            <h2 className="text-white mb-0 sm:mb-4 lg:mb-8 font-bold text-4xl sm:text-6xl lg:text-8xl leading-tight">
              Cooperación<br />Internacional
            </h2>
            <p className="text-gray-200 font-medium text-sm sm:text-base lg:text-lg">
              Articulando con organismos multilaterales para impulsar el desarrollo agrícola sostenible en América Latina y el Caribe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) partnersRef.current[index] = el;
                }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-lg sm:rounded-xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all duration-500 hover:scale-105"
                style={{ perspective: '1000px' }}
              >
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={partner.image} 
                    alt={partner.name}
                    loading="eager"
                    fetchPriority="high"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute top-3 right-3 text-3xl sm:text-4xl drop-shadow-lg">{partner.icon}</div>
                </div>
                
                <div className="relative z-1 p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CooperationPage;
