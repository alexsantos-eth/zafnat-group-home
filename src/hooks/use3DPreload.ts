import { useEffect, useRef, useState } from 'react';

interface Use3DPreloadOptions {
  modelUrls: string[];
  priority?: 'high' | 'low';
}

/**
 * Hook para precargar modelos 3D en background
 */
export const use3DPreload = ({ modelUrls, priority = 'low' }: Use3DPreloadOptions) => {
  const [loadedModels, setLoadedModels] = useState<Set<string>>(new Set());
  const loadingRef = useRef(false);

  useEffect(() => {
    if (loadingRef.current || !modelUrls.length) return;
    loadingRef.current = true;

    const preloadModel = async (url: string) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          await response.blob();
          setLoadedModels(prev => new Set(prev).add(url));
          console.log(`✅ Model preloaded: ${url}`);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to preload model: ${url}`, error);
      }
    };

    const preloadAll = async () => {
      if (priority === 'low') {
        // Precargar uno por uno para no bloquear
        for (const url of modelUrls) {
          await new Promise(resolve => setTimeout(resolve, 500));
          await preloadModel(url);
        }
      } else {
        // Precargar en paralelo
        await Promise.allSettled(modelUrls.map(preloadModel));
      }
    };

    // Iniciar precarga después del montaje inicial
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        preloadAll();
      }, { timeout: 3000 });
    } else {
      setTimeout(preloadAll, 2000);
    }

    return () => {
      loadingRef.current = false;
    };
  }, [modelUrls, priority]);

  return { loadedModels, isComplete: loadedModels.size === modelUrls.length };
};
