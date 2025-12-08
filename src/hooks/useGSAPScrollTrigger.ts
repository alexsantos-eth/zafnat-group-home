import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseGSAPScrollTriggerOptions {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  animation?: gsap.TweenVars;
}

export const useGSAPScrollTrigger = (options: UseGSAPScrollTriggerOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const {
      trigger = element,
      start = 'top bottom',
      end = 'bottom top',
      scrub = true,
      pin = false,
      markers = false,
      onEnter,
      onLeave,
      animation
    } = options;

    let scrollTrigger: ScrollTrigger | undefined;

    if (animation) {
      gsap.fromTo(element, animation.from || {}, {
        ...animation,
        scrollTrigger: {
          trigger,
          start,
          end,
          scrub,
          pin,
          markers,
          onEnter,
          onLeave,
        }
      });
    } else {
      scrollTrigger = ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        pin,
        markers,
        onEnter,
        onLeave,
      });
    }

    return () => {
      scrollTrigger?.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === element) st.kill();
      });
    };
  }, [options]);

  return ref;
};
