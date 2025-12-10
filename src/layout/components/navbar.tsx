import { MenuIcon, XIcon } from "lucide-react";
import Menu from "./menu";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (open: boolean) => () => setOpenMenu(open);

  useGSAP(
    (context) => {
      const updateProgress = () => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const docHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        setScrolled(scrollTop > 50);

        if (progressRef.current) {
          context.add(() =>
            gsap.to(progressRef.current, {
              width: `${scrollPercent}%`,
              duration: 0.1,
              ease: "none",
            })
          );
        }
      };

      window.addEventListener("scroll", updateProgress);
      return () => window.removeEventListener("scroll", updateProgress);
    },
    { scope: progressRef }
  );

  return (
    <>
      <Menu open={openMenu} onDismiss={handleMenuToggle(false)} />
      <div
        className={cn(
          "fixed top-0 left-0 w-full flex justify-start flex-row items-center z-101 h-24 py-2 px-4 sm:px-8 transition-all duration-500",
          scrolled ? "bg-black/30 backdrop-blur-md shadow-lg" : ""
        )}
      >
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-emerald-400 via-blue-400 to-purple-400 transition-all duration-300"
          style={{ width: "0%" }}
        />

        {!openMenu && (
          <button
            onClick={handleMenuToggle(true)}
            className="group cursor-pointer h-20 w-20 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <MenuIcon className="text-white h-6 w-6 group-hover:text-emerald-400 transition-colors" />
          </button>
        )}

        {openMenu && (
          <button
            onClick={handleMenuToggle(false)}
            className="group cursor-pointer h-20 w-20 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          >
            <XIcon className="text-white h-6 w-6 group-hover:text-red-400 transition-colors" />
          </button>
        )}

        <a href="#home" className="group">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="h-6 sm:h-8 group-hover:scale-110 transition-transform duration-300"
          />
        </a>
      </div>
    </>
  );
};

export default Navbar;
