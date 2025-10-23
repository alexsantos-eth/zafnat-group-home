import { useEffect, useRef } from "react";

const FRAMES_COUNT = 1049;
const useUpdateImageScroll = () => {
  const imageRef: React.RefObject<HTMLImageElement | null> = useRef(null);

  useEffect(() => {
    const documentScroll = document.documentElement.scrollHeight;
    let windowHeight = window.innerHeight;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const currentScrolll = documentScroll - windowHeight;
      const scrollFraction = scrollTop / currentScrolll;
      const currentFrame = Math.max(
        1,
        Math.floor(FRAMES_COUNT * scrollFraction)
      );

      if (imageRef.current) {
        if (currentFrame === FRAMES_COUNT) {
          window.scrollTo(0, 0);
        }

        imageRef.current.src = `/frames/frame_${currentFrame
          .toString()
          .padStart(4, "0")}.webp`;
      }
    };

    window.addEventListener("resize", () => {
      windowHeight = window.innerHeight;
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { imageRef };
};

export default useUpdateImageScroll;
