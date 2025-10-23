import { useEffect, useRef } from "react";

const FRAMES_COUNT = 1049;

const useUpdateImageScroll = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const images = useRef<HTMLImageElement[]>([]);
  const frameRequest = useRef<number | null>(null);

  useEffect(() => {
    let windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const ctx = canvasRef.current?.getContext("2d");

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

    preloadImages(1, 10);
    setTimeout(() => preloadImages(11, FRAMES_COUNT), 100);

    const drawFrame = (index: number) => {
      const img = images.current[index];
      if (img && ctx) {
        ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
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

    window.addEventListener("scroll", handleScroll);
    window.addEventListener(
      "resize",
      () => (windowHeight = window.innerHeight)
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
