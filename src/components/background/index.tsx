import { useEffect, useRef, type JSX } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const frameCount = 1049;

const currentFrame = (index: number): string =>
  `/frames/frame_${String(index + 1).padStart(4, "0")}.webp`;

export default function ScrollImageSequence(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext("2d");
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

    // Pre-carga de imágenes
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const firstImage = images[0];
    firstImage.onload = () => {
      context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
    };

    const render = () => {
      const frame = images[imageSeq.frame];
      if (frame && frame.complete) {
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
        scrub: 0.5,
      },
    });

    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
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
        }}
      />
    </div>
  );
}
