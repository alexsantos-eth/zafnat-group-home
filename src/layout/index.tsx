// src/layout/Layout.tsx
"use client";

import React, { useRef } from "react";
import { SmoothProvider } from "../context/SmoothContext";
import Navbar from "./components/navbar";
import SideNav from "./components/SideNav";
import GradualBlurMemo from "../components/GradualBlur";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const smootherRef = useRef<any>(null);

  // Crear el ScrollSmoother cuando el DOM esté listo
  useGSAP(() => {
    // Evitar crear dos instancias
    if (smootherRef.current) return;

    // Asegúrate de que los selectores coincidan con tu DOM
    smootherRef.current = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 2,
      effects: true,
      normalizeScroll: true,
      // id para referencia si lo necesitás
    });

    // Asegurar que ScrollTrigger use el scroller creado por ScrollSmoother
    ScrollTrigger.refresh();

    return () => {
      try {
        smootherRef.current?.kill();
        smootherRef.current = null;
      } catch (e) {
        // no-op
      }
    };
  }, []);

  return (
    <SmoothProvider value={smootherRef}>
      <div className="overflow-x-hidden max-w-full">
        <GradualBlurMemo
          target="page"
          position="top"
          height="10rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={0}
        />

        <Navbar />
        <SideNav />

        <div id="smooth-wrapper">
          <div id="smooth-content">{children}</div>
        </div>

        <GradualBlurMemo
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
          zIndex={0}
        />
      </div>
    </SmoothProvider>
  );
};

export default Layout;
