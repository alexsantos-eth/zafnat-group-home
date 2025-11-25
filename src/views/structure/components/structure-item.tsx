import { CometCard } from "@/components/ui/comet-card";
import Heading from "@/layout/components/heading";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

interface StructureItemProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

gsap.registerPlugin(ScrollTrigger);
const StructureItem: React.FC<StructureItemProps> = ({
  title,
  description,
  imageSrc,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: 100,
      y: 100,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[90vh] w-full flex flex-row items-center justify-between"
    >
      {/* BACKGROUND */}
      <div
        className="absolute top-0 left-0 w-full h-full scale-120 sm:scale-110 -skew-6 z-2 overflow-hidden"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.5)",
        }}
      >
        <CometCard
          rotateDepth={10}
          translateDepth={0}
          className="skew-6 relative -top-20"
        >
          <img
            alt={title}
            src={imageSrc}
            className="w-screen h-screen object-cover rounded-xl"
          />
        </CometCard>

        <div
          className="absolute w-full h-full pointer-events-none top-0 z-3 left-0 bg-black/40"
          style={{
            boxShadow:
              "inset 0 100px 100px rgba(0,0,0,0.6), inset 300px 0px 100px rgba(0,0,0,0.5)",
          }}
        />
      </div>

      <div className="relative z-2 w-full px-12 sm:px-28 pointer-events-none flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
        <div className="flex flex-col gap-12 items-start">
          <div className="flex flex-col gap-4 relative z-2 max-w-full sm:max-w-md min-w-2xs sm:min-w-md">
            <Heading
              titleSize="max-w-xs sm:max-w-md text-5xl"
              title={title}
              textShadow="0 4px 20px rgba(0,0,0,1)"
              delay={100}
              description={description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureItem;
