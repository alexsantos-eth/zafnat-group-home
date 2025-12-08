import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const usePerformanceOptimization = () => {
  useGSAP(() => {
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    gsap.ticker.lagSmoothing(500, 33);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
      gsap.globalTimeline.timeScale(0);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        gsap.globalTimeline.pause();
      } else {
        gsap.globalTimeline.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
