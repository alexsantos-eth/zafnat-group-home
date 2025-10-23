import { useEffect, useRef } from "react";

const FRAMES_COUNT = 1049;

const useUpdateImageScroll = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frameRequest = useRef<number | null>(null);
  const currentFrame = useRef<number>(0);
  const isDrawing = useRef<boolean>(false);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", {
      alpha: false, // Mejor rendimiento si no necesitas transparencia
      desynchronized: true, // Permite renderizado asíncrono
    });

    if (images.current.length === 0) {
      images.current = new Array(FRAMES_COUNT);
    }

    const preloadImages = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i.toString().padStart(4, "0")}.webp`;
        images.current[i - 1] = img;
      }
    };

    preloadImages(1, 20); // Precarga más frames iniciales
    setTimeout(() => preloadImages(21, FRAMES_COUNT), 100);

    const drawFrame = (index: number) => {
      if (isDrawing.current || index === currentFrame.current) return;
      
      const img = images.current[index];
      if (img && img.complete && ctx && canvas) {
        isDrawing.current = true;
        
        // Usar imageSmoothingEnabled para mejor calidad
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        currentFrame.current = index;
        isDrawing.current = false;
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = docHeight - windowHeight;
      const scrollFraction = scrollTop / maxScroll;
      const frameIndex = Math.min(
        FRAMES_COUNT - 1,
        Math.floor(scrollFraction * FRAMES_COUNT)
      );

      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
      frameRequest.current = requestAnimationFrame(() => drawFrame(frameIndex));

      if (frameIndex === FRAMES_COUNT - 1) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => (windowHeight = window.innerHeight),
      { passive: true }
    );

    images.current[0].onload = () => drawFrame(0);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameRequest.current) cancelAnimationFrame(frameRequest.current);
    };
  }, []);

  return { canvasRef };
};

export default useUpdateImageScroll;
