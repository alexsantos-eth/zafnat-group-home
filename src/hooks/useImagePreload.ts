import { useEffect } from 'react';

/**
 * Hook para precargar imágenes críticas durante idle time
 */
export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    if (!imageUrls.length) return;

    const preloadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
      });
    };

    const preloadAll = async () => {
      try {
        await Promise.all(imageUrls.map(preloadImage));
        console.log('✅ Images preloaded');
      } catch (error) {
        console.warn('⚠️ Image preload failed:', error);
      }
    };

    // Usar requestIdleCallback si está disponible, sino setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadAll();
      }, { timeout: 2000 });
    } else {
      setTimeout(preloadAll, 1000);
    }
  }, [imageUrls]);
};
