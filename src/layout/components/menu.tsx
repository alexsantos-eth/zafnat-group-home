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
        gsap.set(links, { opacity: 0, y: 30 });

        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out",
          delay: 0.2,
        });
      } else {
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
        "w-full h-dvh fixed top-0 left-0 z-101 px-24 sm:px-28 flex flex-col items-start justify-center gap-8 pt-16",
        !open ? "pointer-events-none" : ""
      )}
    >
      <div
        ref={backdropRef}
        className="w-full h-full transparent absolute top-0 z-1 left-0 pointer-events-none"
        style={{ backdropFilter: "blur(0px)" }}
      />

      {/* -------- LINKS -------- */}
      <div
        ref={linksRef}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10"
      >
        {[
          ["home", "Inicio"],
          ["about", "Nosotros"],
          ["structure", "Estructura"],
          ["modules", "InnovAgro"],
          ["producers", "Productores"],
          ["cooperation", "Cooperación"],
          ["fitotecnia", "Fitotecnia"],
          ["zootecnia", "Zootecnia"],
          ["world", "Alianzas"],
          ["contact", "Contacto"],
        ].map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className="group text-white text-3xl font-bold uppercase opacity-0 hover:text-emerald-400"
          >
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              {label}
            </span>
          </a>
        ))}
      </div>

      {/* -------- SOCIAL -------- */}
      <div ref={socialRef} className="relative z-10 flex gap-3 opacity-0">
        <span className="text-white text-sm">ZAFNAT Group International</span>
        <a href="https://facebook.com" className="text-white hover:opacity-70">
          Facebook
        </a>
        <a href="https://instagram.com" className="text-white hover:opacity-70">
          Instagram
        </a>
      </div>
    </div>
  );
};

export default Menu;
