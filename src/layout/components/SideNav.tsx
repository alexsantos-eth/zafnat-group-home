import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin, useGSAP);

interface NavItem {
  id: string;
  hash: string;
  name: string;
}

const navItems: NavItem[] = [
  { id: "home", hash: "#home", name: 'Inicio' },
  { id: "about", hash: "#about",  name: 'Sobre nosotros' },
  { id: "structure", hash: "#structure",  name: 'Estructura' },
  { id: "modules", hash: "#modules",  name: 'InnoVAgro' },
  { id: "producers", hash: "#producers",  name: 'Productores' },
  { id: "cooperation", hash: "#cooperation",  name: 'Cooperación' },
  { id: "contact", hash: "#contact",  name: 'Contáctanos' },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dotsRef = useRef<(HTMLAnchorElement)[]>([]);
  const orbitsRef = useRef<(HTMLDivElement)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement)[]>([]);
  const sectionsRef = useRef<HTMLElement[]>([]);

  // Registrar secciones una sola vez
  useGSAP(() => {
    sectionsRef.current = navItems
      .map((i) => document.querySelector(i.hash) as HTMLElement)
      .filter(Boolean);
  }, []);

  // Detectar sección activa al hacer scroll
  useGSAP(() => {
    const updateActiveSection = () => {
      const middle = window.scrollY + window.innerHeight / 2;

      let newIndex = 0;
      sectionsRef.current.forEach((section, i) => {
        if (middle >= section.offsetTop) newIndex = i;
      });

      setActiveIndex(newIndex);
    };

    window.addEventListener("scroll", updateActiveSection);
    updateActiveSection();

    return () => window.removeEventListener("scroll", updateActiveSection);
  }, []);

  // Animación: dots, orbits y labels
  useGSAP(
    () => {
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const dist = Math.abs(i - activeIndex);

        gsap.to(dot, {
          opacity: dist === 0 ? 1 : dist <= 1 ? 0.8 : 0.3,
          scale: dist === 0 ? 1 : dist <= 1 ? 0.9 : 0.7,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      orbitsRef.current.forEach((orbit, i) => {
        if (!orbit) return;

        gsap.to(orbit, {
          scale: i === activeIndex ? 1 : 0,
          opacity: i === activeIndex ? 1 : 0,
          duration: 0.35,
          ease: "power2.out",
          overwrite: true,
        });
      });

      labelsRef.current.forEach((label, i) => {
        if (!label) return;

        if (i === activeIndex) {
          gsap.to(label, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            display: "block",
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          gsap.to(label, {
            opacity: 0,
            x: 20,
            duration: 0.3,
            display: "none",
            ease: "power2.in",
            overwrite: true,
          });
        }
      });
    },
    { dependencies: [activeIndex] }
  );

  // CLICK scroll con GSAP
  const handleClick = (hash: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: hash,
        offsetY: 40,
      },
      ease: "power3.inOut",
    });
  };

  return (
    <nav
      className="hidden lg:flex fixed right-6 lg:right-12 xl:right-16 top-1/2 -translate-y-1/2 z-4 flex flex-col gap-4 lg:gap-6"
      aria-label="Side Navigation"
    >
      {navItems.map((item, i) => (
        <a
          key={item.id}
          href={item.hash}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          onClick={(e) => {
            e.preventDefault();
            handleClick(item.hash);
          }}
          className="relative flex items-center cursor-pointer"
          style={{ transformOrigin: "center" }}
        >

          {/* LABEL (fuera del flujo, no afecta la posición del dot) */}
          <span
            ref={(el) => {if (el) labelsRef.current[i] = el}}
            className="absolute right-8 text-white text-sm font-medium pointer-events-none opacity-0"
            style={{
              display: "none",
              transform: "translateX(20px)",
              whiteSpace: "nowrap",
            }}
          >
            {item.name.toUpperCase()}
          </span>

          {/* CONTENEDOR DEL DOT + ORBIT */}
          <div className="relative flex items-center justify-center w-3 h-3">

            {/* ORBIT (centrada porque está dentro de un contenedor flex centrado) */}
            <div
              ref={(el) => {if (el) orbitsRef.current[i] = el}}
              className="absolute w-8 h-8 border-2 border-white rounded-full pointer-events-none"
              style={{ opacity: 0, transform: "scale(0)" }}
            />

            {/* DOT */}
            <div className="w-3 h-3 bg-white rounded-full" />

          </div>
        </a>
      ))}
    </nav>
  );
};

export default SideNav;
