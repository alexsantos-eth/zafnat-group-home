import { useEffect, useRef, useState } from "react";

export default function useOnScreen<T extends Element = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
    // Intentionally no dependencies on ref to keep observer stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, isIntersecting } as const;
}
