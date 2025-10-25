import { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 2098;

const currentFrame = (index: number): string =>
  `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;

export default function ScrollImageSequence(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d", {
      alpha: false,
      desynchronized: true,
    });
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(); 
    };

    window.addEventListener("resize", handleResize);

    // Pre-carga progresiva: primeros frames inmediatamente, resto en background
    const preloadImages = async () => {
      // Carga inmediata de los primeros 30 frames
      for (let i = 0; i < Math.min(30, frameCount); i++) {
        const img = new Image();
        img.src = currentFrame(i);
        images[i] = img;
      }
      
      // Carga el resto en chunks para no bloquear
      for (let i = 30; i < frameCount; i += 50) {
        await new Promise(resolve => setTimeout(resolve, 50));
        for (let j = i; j < Math.min(i + 50, frameCount); j++) {
          const img = new Image();
          img.src = currentFrame(j);
          images[j] = img;
        }
      }
    };

    preloadImages();

    const firstImage = images[0];
    if (firstImage) {
      firstImage.onload = () => {
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      };
    }

    const render = () => {
      const frame = images[imageSeq.frame];
      if (frame && frame.complete) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frame, 0, 0, canvas.width, canvas.height);
      }
    };

    gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        anticipatePin: 1,
      },
    });

    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} style={{ height: "1800dvh" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100dvh",
          display: "block",
          objectFit: "contain",
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />
    </div>
  );
}
