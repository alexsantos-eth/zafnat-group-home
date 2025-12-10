import { useEffect, useState } from "react";

import gsap from "gsap";

import { useGSAP } from "@gsap/react";

const navItems = [
  { id: "home", hash: "#home", name: "Inicio" },
  { id: "about", hash: "#about", name: "Sobre nosotros" },
  { id: "structure", hash: "#structure", name: "Estructura" },
  { id: "modules", hash: "#modules", name: "InnoVAgro" },
  { id: "producers", hash: "#producers", name: "Productores" },
  { id: "cooperation", hash: "#cooperation", name: "Cooperación" },
  { id: "fitotecnia", hash: "#fitotecnia", name: "Fitotecnia" },
  { id: "zootecnia", hash: "#zootecnia", name: "Zootecnia" },
  { id: "contact", hash: "#contact", name: "Contáctanos" },
];

interface SideNavProps {
  isReady: boolean;
}

const SideNav: React.FC<SideNavProps> = ({ isReady }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.hash) as HTMLElement)
      .filter(Boolean);

    let animationFrame: number;

    const updateActive = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const middle = scrollTop + window.innerHeight / 5;

      let newIndex = 0;
      sections.forEach((section, i) => {
        if (middle >= section.offsetTop) newIndex = i;
      });

      setActiveIndex(newIndex);

      animationFrame = requestAnimationFrame(updateActive);
    };

    animationFrame = requestAnimationFrame(updateActive);

    return () => cancelAnimationFrame(animationFrame);
  }, [isReady]);

  useGSAP(
    () => {
      navItems.forEach((_, i) => {
        const dot = document.getElementById(`side-dot-${i}`);
        const orbit = document.getElementById(`side-orbit-${i}`);
        const label = document.getElementById(`side-label-${i}`);
        if (!dot || !orbit || !label) return;

        const dist = Math.abs(i - activeIndex);

        gsap.to(dot, {
          opacity: dist === 0 ? 1 : dist <= 1 ? 0.8 : 0.3,
          scale: dist === 0 ? 1 : dist <= 1 ? 0.9 : 0.7,
          duration: 0.4,
        });
        gsap.to(orbit, {
          scale: i === activeIndex ? 1 : 0,
          opacity: i === activeIndex ? 1 : 0,
          duration: 0.35,
        });
        gsap.to(label, {
          opacity: i === activeIndex ? 1 : 0,
          x: i === activeIndex ? 0 : 20,
          display: i === activeIndex ? "block" : "none",
          duration: i === activeIndex ? 0.4 : 0.3,
        });
      });
    },
    { dependencies: [activeIndex] }
  );

  const handleClick = (hash: string) => {
    const target = document.querySelector(hash);
    if (!target) return;
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false },
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <nav className="hidden lg:flex fixed right-6 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-4 flex-col gap-4 lg:gap-6">
      {navItems.map((item, i) => (
        <a
          key={item.id}
          id={`side-dot-${i}`}
          href={item.hash}
          onClick={(e) => {
            e.preventDefault();
            handleClick(item.hash);
          }}
          className="relative flex items-center cursor-pointer"
          style={{ transformOrigin: "center" }}
        >
          <span
            id={`side-label-${i}`}
            className="absolute right-8 text-white text-sm font-medium pointer-events-none opacity-0"
            style={{
              display: "none",
              transform: "translateX(20px)",
              whiteSpace: "nowrap",
            }}
          >
            {item.name.toUpperCase()}
          </span>
          <div className="relative flex items-center justify-center w-3 h-3">
            <div
              id={`side-orbit-${i}`}
              className="absolute w-8 h-8 border-2 border-white rounded-full pointer-events-none"
              style={{ opacity: 0, transform: "scale(0)" }}
            />
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </a>
      ))}
    </nav>
  );
};

export default SideNav;
