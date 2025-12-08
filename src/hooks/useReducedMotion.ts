import { useEffect, useState } from 'react';

/**
 * Hook para detectar preferencia de movimiento reducido del usuario
 * Útil para desactivar animaciones pesadas si el usuario tiene motion sickness
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencia del sistema
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    // Inicializar
    updatePreference();

    // Escuchar cambios
    mediaQuery.addEventListener('change', updatePreference);

    return () => {
      mediaQuery.removeEventListener('change', updatePreference);
    };
  }, []);

  return prefersReducedMotion;
};
