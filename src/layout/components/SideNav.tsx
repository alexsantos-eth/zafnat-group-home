import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface NavItem {
  id: string;
  hash: string;
}

const navItems: NavItem[] = [
  { id: "about", hash: "#about" },
  { id: "structure", hash: "#structure" },
  { id: "modules", hash: "#modules" },
  { id: "world", hash: "#world" },
  { id: "contact", hash: "#contact" },
];

const SideNav = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dotsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const orbitsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.hash)
      );

      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentIndex = 0;
      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (scrollPosition >= sectionTop) {
            currentIndex = index;
          }
        }
      });

      setActiveIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dotsRef.current.forEach((dot, index) => {
      if (!dot) return;

      const distance = Math.abs(index - activeIndex);
      let opacity = 1;
      let scale = 1;

      if (distance === 0) {
        opacity = 1;
        scale = 1;
      } else if (distance <= 1) {
        opacity = 0.8;
        scale = 0.9;
      } else {
        opacity = 0.3;
        scale = 0.7;
      }

      gsap.to(dot, {
        opacity,
        scale,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    // Animar las órbitas - primero ocultar todas, luego mostrar la activa
    orbitsRef.current.forEach((orbit, index) => {
      if (!orbit) return;

      if (index === activeIndex) {
        // Primero asegurarse de que está oculta
        gsap.set(orbit, { scale: 0, opacity: 0 });
        // Luego animarla para aparecer
        gsap.to(orbit, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: true, // Sobrescribir cualquier animación previa
        });
      } else {
        // Ocultar inmediatamente las demás
        gsap.to(orbit, {
          scale: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          overwrite: true, // Sobrescribir cualquier animación previa
        });
      }
    });
  }, [activeIndex]);

  const handleClick = (index: number, hash: string) => {
    setActiveIndex(index);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed right-28 top-1/2 -translate-y-1/2 z-4 flex flex-col gap-6"
      aria-label="Navegación lateral"
    >
      {navItems.map((item, index) => (
        <a
          key={item.id}
          ref={(el) => {
            dotsRef.current[index] = el;
          }}
          href={item.hash}
          onClick={(e) => {
            e.preventDefault();
            handleClick(index, item.hash);
          }}
          className="relative w-3 h-3 flex items-center justify-center cursor-pointer transition-transform"
          aria-label={`Ir a ${item.id}`}
          style={{ transformOrigin: "center" }}
        >
          <div
            ref={(el) => {
              orbitsRef.current[index] = el;
            }}
            className="absolute w-8 h-8 border-2 border-white rounded-full pointer-events-none"
            style={{
              opacity: 0,
              transform: "scale(0)",
            }}
          />

          <div className="w-full h-full bg-white rounded-full" />
        </a>
      ))}
    </nav>
  );
};

export default SideNav;
