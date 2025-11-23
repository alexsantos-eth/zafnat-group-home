import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MenuProps {
  open: boolean;
  onDismiss: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onDismiss }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (backdropRef.current) {
      if (open) {
        gsap.to(backdropRef.current, {
          backdropFilter: "blur(150px)",
          duration: 2.3,
          ease: "back.out",
        });
      } else {
        // Cancelar cualquier animación en progreso
        gsap.killTweensOf(backdropRef.current);

        gsap.to(backdropRef.current, {
          backdropFilter: "blur(0px)",
          duration: 0.9,
          ease: "power2.in",
        });
      }
    }

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll("a");

      if (open) {
        // Primero asegurar que están en su estado inicial
        gsap.set(links, { opacity: 0, y: 30 });

        // Luego animar
        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        });
      } else {
        // Cancelar cualquier animación en progreso
        gsap.killTweensOf(links);

        gsap.to(links, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in",
        });
      }
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        onDismiss();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onDismiss]);

  return (
    <div
      className={cn(
        "w-full h-dvh fixed top-0 left-0 z-101 px-28 flex items-center justify-start",
        !open ? "pointer-events-none" : ""
      )}
    >
      <div
        ref={backdropRef}
        className="w-full h-full transparent absolute top-0 z-1 left-0 pointer-events-none"
        style={{ backdropFilter: "blur(0px)" }}
      />

      <div ref={linksRef} className="relative z-2 flex flex-col gap-16">
        <a
          href="#about"
          className="text-white text-6xl font-bold opacity-0 uppercase"
        >
          Nosotros
        </a>

        <a
          href="#about"
          className="text-white text-6xl font-bold opacity-0 uppercase"
        >
          Estructura
        </a>

        <a
          href="#about"
          className="text-white text-6xl font-bold opacity-0 uppercase"
        >
          Innovagro
        </a>

        <a
          href="#about"
          className="text-white text-6xl font-bold opacity-0 uppercase"
        >
          Alianzas
        </a>
      </div>
    </div>
  );
};

export default Menu;
