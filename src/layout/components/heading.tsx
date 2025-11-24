import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import BlurText from "@/components/BlurText";

interface HeadingProps {
  title?: string;
  description?: string;
  titleSize?: string;
  delay?: number;
  descriptionSize?: string;
}

const Heading = ({
  title,
  description,
  titleSize = "text-5xl sm:text-7xl",
  delay,
  descriptionSize = "text-lg",
}: HeadingProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const elements = [titleRef.current, descriptionRef.current].filter(Boolean);

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, [title, description]);

  return (
    <>
      <BlurText
        text={title}
        delay={50}
        animateBy="letters"
        direction="top"
        className={cn("text-white mb-0 sm:mb-8 font-bold", titleSize)}
      />

      {(description?.length ?? 0) > 0 && (
        <BlurText
          text={description}
          delay={delay ?? 300}
          animateBy="words"
          direction="top"
          className={cn("text-gray-200 font-medium", descriptionSize)}
        />
      )}
    </>
  );
};

export default Heading;
