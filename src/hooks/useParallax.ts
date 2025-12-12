import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParallaxOptions {
  speed?: number;
  direction?: "up" | "down";
  scale?: boolean;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.5, direction = "up", scale = false } = options;
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current as HTMLElement;
    const child = element?.firstElementChild as HTMLElement;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const windowHeight = window.innerHeight;

      const elementInView =
        scrolled + windowHeight > elementTop &&
        scrolled < elementTop + elementHeight;

      if (elementInView) {
        const parallaxValue =
          (scrolled - elementTop + windowHeight) *
          speed *
          (direction === "up" ? -1 : 1);

        const transforms: string[] = [`translateY(${parallaxValue}px)`];

        if (scale) {
          const scaleValue = 1 + Math.abs(parallaxValue) / 1000;
          transforms.push(`scale(${Math.min(scaleValue, 1.2)})`);
        }

        gsap.to(child, {
          transform: transforms.join(" "),
          duration: 0,
          ease: "none",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, direction, scale]);

  return elementRef;
};
