import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type AnimationPreset =
  | "fade"
  | "slideLeft"
  | "slideRight"
  | "slideUp"
  | "slideDown"
  | "fadeSlideLeft"
  | "fadeSlideRight"
  | "fadeSlideUp"
  | "fadeSlideDown"
  | "scaleIn"
  | "scaleOut"
  | "fadeScaleIn"
  | "fadeScaleOut";

interface AnimationConfig {
  preset?: AnimationPreset;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  duration?: number;
  ease?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const ANIMATION_PRESETS: Record<
  AnimationPreset,
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  fade: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideLeft: {
    from: { x: -100 },
    to: { x: 0 },
  },
  slideRight: {
    from: { x: 100 },
    to: { x: 0 },
  },
  slideUp: {
    from: { y: -100 },
    to: { y: 0 },
  },
  slideDown: {
    from: { y: 100 },
    to: { y: 0 },
  },
  fadeSlideLeft: {
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0 },
  },
  fadeSlideRight: {
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
  },
  fadeSlideUp: {
    from: { opacity: 0, y: -100 },
    to: { opacity: 1, y: 0 },
  },
  fadeSlideDown: {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0 },
  },
  scaleIn: {
    from: { scale: 0 },
    to: { scale: 1 },
  },
  scaleOut: {
    from: { scale: 1.5 },
    to: { scale: 1 },
  },
  fadeScaleIn: {
    from: { opacity: 0, scale: 0.5 },
    to: { opacity: 1, scale: 1 },
  },
  fadeScaleOut: {
    from: { opacity: 0, scale: 1.5 },
    to: { opacity: 1, scale: 1 },
  },
};

export const useObserveAnimation = (config: AnimationConfig = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasAnimatedRef = useRef(false);

  const {
    preset,
    from: customFrom,
    to: customTo,
    duration = 1,
    ease = "power3.out",
    delay = 0,
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
  } = config;

  // Obtener los valores del preset si existe
  const presetValues = preset ? ANIMATION_PRESETS[preset] : null;

  // Combinar preset con valores personalizados (los personalizados tienen prioridad)
  const from = useMemo(
    () => ({
      ...(presetValues?.from || { opacity: 0, y: 50 }),
      ...customFrom,
    }),
    [presetValues?.from, customFrom]
  );

  const to = useMemo(
    () => ({
      ...(presetValues?.to || { opacity: 1, y: 0 }),
      ...customTo,
    }),
    [presetValues?.to, customTo]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Establecer el estado inicial
    gsap.set(element, from);

    // Crear el Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Si no ha sido animado o triggerOnce es false
            if (!hasAnimatedRef.current || !triggerOnce) {
              gsap.to(entry.target, {
                ...to,
                duration,
                ease,
                delay,
              });
              hasAnimatedRef.current = true;
            }

            // Si triggerOnce es true, desconectar el observer
            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(entry.target);
            }
          } else if (!triggerOnce && hasAnimatedRef.current) {
            // Si triggerOnce es false, volver al estado inicial cuando sale del viewport
            gsap.to(entry.target, {
              ...from,
              duration: duration * 0.5,
              ease,
            });
            hasAnimatedRef.current = false;
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observar el elemento
    observerRef.current.observe(element);

    // Cleanup
    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
        observerRef.current.disconnect();
      }
    };
  }, [from, to, duration, ease, delay, threshold, rootMargin, triggerOnce]);

  return elementRef;
};
