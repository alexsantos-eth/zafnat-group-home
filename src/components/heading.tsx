import BlurText from "@/fx/blurtext";
import { cn } from "@/lib/utils";

interface HeadingProps {
  title?: string;
  description?: string;
  titleSize?: string;
  delay?: number;
  descriptionSize?: string;
  textShadow?: string; // e.g. "0 4px 12px rgba(0,0,0,0.45)"
  readyForAnimations?: boolean;
}

const Heading = ({
  title,
  description,
  titleSize = "text-5xl sm:text-6xl",
  delay,
  descriptionSize = "text-sm sm:text-base lg:text-lg",
  textShadow,
  readyForAnimations,
}: HeadingProps) => {
  return (
    <>
      <BlurText
        text={title}
        delay={30}
        animateBy="letters"
        direction="top"
        stepDuration={0.2}
        className={cn("text-white mb-0 sm:mb-4 lg:mb-8 font-bold", titleSize)}
        style={
          textShadow
            ? { textShadow, position: "relative" }
            : { position: "relative" }
        }
        readyForAnimations={readyForAnimations}
      />

      {(description?.length ?? 0) > 0 && (
        <BlurText
          text={description}
          delay={delay ?? 150}
          animateBy="words"
          direction="top"
          stepDuration={0.2}
          className={cn("text-gray-200 font-medium", descriptionSize)}
          style={
            textShadow
              ? { textShadow, position: "relative" }
              : { position: "relative" }
          }
          readyForAnimations={readyForAnimations}
        />
      )}
    </>
  );
};

export default Heading;
