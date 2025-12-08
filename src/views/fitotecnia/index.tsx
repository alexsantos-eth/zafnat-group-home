import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Heading from '@/layout/components/heading';
import { useImagePreload } from '@/hooks/useImagePreload';

gsap.registerPlugin(ScrollTrigger);

const FitotecniaPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cropsRef = useRef<HTMLDivElement[]>([]);
  const bgRef = useRef<HTMLDivElement>(null);

  const crops = [
    {
      category: 'Hortalizas',
      items: ['Tomate', 'Lechuga', 'Zanahoria', 'Pimiento', 'Cebolla'],
      icon: '🥬',
      color: 'from-green-600/20 to-emerald-600/20',
      borderColor: 'border-green-400/30',
      image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&h=400&fit=crop',
    },
    {
      category: 'Frutales',
      items: ['Aguacate', 'Cítricos', 'Mango', 'Papaya', 'Piña'],
      icon: '🍊',
      color: 'from-orange-600/20 to-yellow-600/20',
      borderColor: 'border-orange-400/30',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop',
    },
    {
      category: 'Granos Básicos',
      items: ['Maíz', 'Frijol', 'Arroz', 'Trigo', 'Sorgo'],
      icon: '🌽',
      color: 'from-amber-600/20 to-yellow-700/20',
      borderColor: 'border-amber-400/30',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    },
    {
      category: 'Industriales',
      items: ['Café', 'Cacao', 'Caña de Azúcar', 'Palma Africana', 'Algodón'],
      icon: '☕',
      color: 'from-brown-600/20 to-stone-600/20',
      borderColor: 'border-amber-600/30',
      image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&h=400&fit=crop',
    },
  ];

  useImagePreload(crops.map(crop => crop.image));

  useGSAP((context) => {
    const cropsElements = cropsRef.current.filter(Boolean);

    // Animación de cada crop
    cropsElements.forEach((crop) => {
      context.add(() => {
        gsap.fromTo(
          crop,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: crop,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    // Parallax vertical de contenedor
    context.add(() => {
      gsap.to(containerRef.current, {
        y: 40,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.3,
        },
      });
    });

    // Parallax horizontal del fondo
    context.add(() => {
      gsap.to(bgRef.current, {
        x: 200, // mueve de izquierda a derecha
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6,
        },
      });
    });
  }, { scope: containerRef, dependencies: [cropsRef, bgRef] });

  return (
    <div id="fitotecnia" className="relative w-full min-h-screen flex items-center justify-center pt-10 pb-40 z-2">
      <div
        className="absolute top-0 left-0 w-full h-full scale-110 skew-y-3 z-0 pointer-events-none bg-gradient-to-br from-lime-900/30 to-green-950/40"

      />

      <div ref={containerRef} className="relative z-1 w-full px-6 sm:px-12 lg:px-28">
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
          <div className="flex flex-col gap-4 sm:gap-6 max-w-3xl">
            <Heading
              title="Fitotecnia"
              titleSize="text-4xl sm:text-6xl lg:text-8xl"
              description="Cultivos tecnificados con monitoreo en tiempo real, análisis predictivo y optimización de recursos para máxima productividad."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {crops.map((crop, index) => (
              <div
                key={index}
                ref={(el) => { if (el) cropsRef.current[index] = el; }}
                className={`group relative rounded-2xl border ${crop.borderColor} hover:scale-105 transition-all duration-500 overflow-hidden`}
              >
                <div className="absolute inset-0">
                  <img
                    src={crop.image}
                    alt={crop.category}
                    loading="eager"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${crop.color} backdrop-blur-md`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="relative z-1 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-5xl">{crop.icon}</span>
                    <h3 className="text-3xl font-bold text-white">{crop.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {crop.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-white border border-white/20 hover:bg-white/20 transition-all"
                      >
                        {item}
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

export default FitotecniaPage;
