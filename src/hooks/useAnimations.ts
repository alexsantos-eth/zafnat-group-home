import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useStaggerAnimation = (dependencies: any[] = []) => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const elements = elementsRef.current.filter(Boolean);
    
    if (elements.length === 0) return;

    elements.forEach((element, index) => {
      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        elements.forEach((element) => {
          if (trigger.trigger === element) {
            trigger.kill();
          }
        });
      });
    };
  }, dependencies);

  const setRef = (index: number) => (el: HTMLElement | null) => {
    elementsRef.current[index] = el;
  };

  return { setRef };
};

export const useFadeInUp = (delay: number = 0, dependencies: any[] = []) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, dependencies);

  return ref;
};

export const useParallaxScroll = (intensity: number = 100, dependencies: any[] = []) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.to(element, {
      y: intensity,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, dependencies);

  return ref;
};
