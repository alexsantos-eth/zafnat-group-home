import React, { useEffect, useState } from "react";
import useOnScreen from "../hooks/useOnScreen";

type Loader = () => Promise<{ default: React.ComponentType<any> }>;

type Props = {
  loader: Loader;
  fallback?: React.ReactNode;
  rootMargin?: string;
  className?: string;
  componentProps?: Record<string, any>;
};

const LazySection: React.FC<Props> = ({
  loader,
  fallback = null,
  rootMargin = "200px",
  className,
  componentProps,
}) => {
  const { ref, isIntersecting } = useOnScreen<HTMLElement>({ rootMargin });
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(
    null
  );

  useEffect(() => {
    if (isIntersecting && !Component) {
      let mounted = true;
      
      // Usar requestIdleCallback para no bloquear el hilo principal
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          loader().then((mod) => {
            if (mounted) setComponent(() => mod.default);
          });
        }, { timeout: 500 });
      } else {
        loader().then((mod) => {
          if (mounted) setComponent(() => mod.default);
        });
      }
      
      return () => {
        mounted = false;
      };
    }
  }, [isIntersecting, loader, Component]);

  return (
    <div 
      ref={ref as any} 
      className={`${className} animate-on-scroll`}
      data-scroll
    >
      {Component ? <Component {...componentProps} /> : fallback}
    </div>
  );
};

export default LazySection;
