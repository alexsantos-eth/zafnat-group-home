import { useRef } from "react";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, useGSAP);

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  readyForAnimations?: boolean;
};

export default function BlurText({
  text = "",
  delay = 200,
  className = "",
  style,
  animateBy = "words",
  direction = "top",
  threshold = 0.05,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.25,
  readyForAnimations = true,
}: BlurTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const triggered = useRef(false);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (!readyForAnimations) return;
      if (triggered.current) return;

      const el = ref.current;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggered.current = true;
            observer.unobserve(el);
            animateGSAP();
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(el);

      return () => observer.disconnect();
    },
    { dependencies: [readyForAnimations] }
  );

  const animateGSAP = () => {
    if (!ref.current) return;

    const split = new SplitText(ref.current, {
      type: animateBy === "words" ? "words" : "chars",
    });

    const targets = animateBy === "words" ? split.words : split.chars;

    gsap.set(targets, {
      opacity: 0,
      filter: "blur(6px)",
      y: direction === "top" ? -25 : 25,
    });

    const tl = gsap.timeline({
      onComplete: onAnimationComplete,
    });

    tl.to(targets, {
      opacity: 0.7,
      filter: "blur(1px)",
      y: direction === "top" ? 3 : -3,
      duration: stepDuration,
      stagger: delay / 1000,
      ease: "power2.out",
    }).to(targets, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: stepDuration,
      ease: "power2.out",
    });
  };

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        ...style,
      }}
    >
      {text}
    </p>
  );
}
