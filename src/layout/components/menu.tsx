import { useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollToPlugin);

interface MenuProps {
  open: boolean;
  onDismiss: () => void;
}

const Menu: React.FC<MenuProps> = ({ open, onDismiss }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  // --------- ANIMACIONES CON useGSAP ----------
  useGSAP(
    (context) => {
      const backdrop = backdropRef.current;
      const links = linksRef.current?.querySelectorAll("a") || [];
      const social = socialRef.current;

      if (open) {
        // BACKDROP
        context.add(() => {
          gsap.to(backdrop, {
            backdropFilter: "blur(120px)",
            duration: 1.2,
            ease: "power3.out",
          });
        });

        // LINKS
        context.add(() => {
          gsap.set(links, { opacity: 0, y: 30 });
          gsap.to(links, {
            opacity: 1,
            y: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        // SOCIAL
        context.add(() => {
          gsap.set(social, { opacity: 0, y: 30 });
          gsap.to(social, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2,
          });
        });
      } else {
        // REVERSE
        context.add(() => {
          gsap.to(backdrop, {
            backdropFilter: "blur(0px)",
            duration: 0.4,
            ease: "power2.in",
          });
        });

        context.add(() => {
          gsap.to(links, {
            opacity: 0,
            y: -20,
            duration: 0.25,
            stagger: 0.03,
            ease: "power2.in",
          });
        });

        context.add(() => {
          gsap.to(social, {
            opacity: 0,
            y: -20,
            duration: 0.25,
            ease: "power2.in",
          });
        });
      }
    },
    { dependencies: [open] }
  );

  // --------- SOFT SCROLL NAVIGATION ----------
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href")?.replace("#", "");

    if (!target) return;

    const section = document.getElementById(target);
    if (!section) return;

    onDismiss();

    gsap.to(window, {
      scrollTo: section,
      duration: 1.2,
      ease: "power3.inOut",
    });
  };

  return (
    <div
      className={cn(
        "w-full h-dvh fixed top-0 left-0 z-101 px-10 flex flex-col items-start justify-center gap-10 pt-20",
        !open && "pointer-events-none"
      )}
    >
      <div
        ref={backdropRef}
        className="w-full h-full absolute top-0 left-0"
        style={{ backdropFilter: "blur(0px)" }}
      />

      {/* -------- LINKS EN GRID (FILAS) -------- */}
      <div ref={linksRef} className="relative z-10 grid grid-cols-2 gap-10">
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
            onClick={handleSmoothScroll}
            className="group text-white text-3xl font-bold uppercase opacity-0 transition-all hover:text-emerald-400"
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
