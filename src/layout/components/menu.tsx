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
  const socialRef = useRef<HTMLDivElement>(null);

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

    if (socialRef.current) {
      if (open) {
        gsap.set(socialRef.current, { opacity: 0, y: 30 });
        gsap.to(socialRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.6,
        });
      } else {
        gsap.killTweensOf(socialRef.current);
        gsap.to(socialRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
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
        "w-full h-dvh fixed top-0 left-0 z-101 px-28 flex flex-col items-start justify-center gap-8 pt-16",
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
          onClick={onDismiss}
          className="text-white text-5xl font-bold opacity-0 uppercase"
        >
          Nosotros
        </a>

        <a
          href="#structure"
          onClick={onDismiss}
          className="text-white text-5xl font-bold opacity-0 uppercase"
        >
          Estructura
        </a>

        <a
          href="#modules"
          onClick={onDismiss}
          className="text-white text-5xl font-bold opacity-0 uppercase"
        >
          Innovagro
        </a>

        <a
          href="#world"
          onClick={onDismiss}
          className="text-white text-5xl font-bold opacity-0 uppercase"
        >
          Alianzas
        </a>

        <a
          href="#contact"
          onClick={onDismiss}
          className="text-white text-5xl font-bold opacity-0 uppercase"
        >
          Contacto
        </a>
      </div>

      <div
        ref={socialRef}
        className="relative z-2 flex flex-row items-center gap-0 opacity-0"
      >
        <h3 className="text-md font-light text-white">
          ZAFNAT Group International - Siguenos en
        </h3>
        <div className="flex relative left-2">
          <div className="flex items-center">
            <a
              href="https://www.facebook.com/myzafnat?mibextid=wwXIfr&rdid=NBbFIDXpJpINxFfd&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17PCrNPC53%2F%3Fmibextid%3DwwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-30 h-10 rounded-full gap-2 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Facebook"
            >
              <span className="mr-8 block text-white text-md font-light">
                Facebook
              </span>
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>

          <div className="flex items-center">
            <a
              href="https://www.instagram.com/myzafnat/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-30 h-10 rounded-full gap-2 flex items-center justify-center hover:scale-110 transition-transform duration-300"
              aria-label="Instagram"
            >
              <span className="mr-8 block text-white text-md font-light">
                Instagram
              </span>
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
