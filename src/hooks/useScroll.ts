import { useState, useEffect } from "react";

export const useScroll = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      const totalScrollableHeight = documentHeight - windowHeight;
      const percentage =
        totalScrollableHeight > 0
          ? (scrollTop / totalScrollableHeight) * 100
          : 0;

      setScrollPercentage(Math.min(100, Math.max(0, percentage)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPercentage;
};
