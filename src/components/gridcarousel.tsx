import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GridCarouselProps {
  images: string[];
  className?: string;
}

const GridCarousel = ({ images, className }: GridCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const duplicatedImages = [...images];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let animationId: number;
    let position = 0;
    const itemWidth = carousel.scrollWidth - carousel.scrollWidth / 2;

    const animate = () => {
      position -= 0.2;

      if (Math.abs(position) >= itemWidth) {
        position = 0;
      }

      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className={cn("overflow-hidden relative h-full", className)}>
      <div
        ref={carouselRef}
        className="grid grid-cols-[50%_50%_50%_50%_50%_50%] grid-rows-2 gap-0 w-fit h-full auto-rows-[0]"
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="w-full h-full overflow-hidden">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridCarousel;
