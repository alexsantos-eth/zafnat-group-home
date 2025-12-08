import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

const getDefaultSize = (): WindowSize => ({
  width: typeof window !== "undefined" ? window.innerWidth : 1280,
  height: typeof window !== "undefined" ? window.innerHeight : 720,
});

export const useWindowSize = (): WindowSize => {
  const [size, setSize] = useState<WindowSize>(getDefaultSize);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    // Sincronizar tamaño inicial en caso de que el hook se monte después de un cambio.
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

export default useWindowSize;
