import { useRef, useState } from "react";

import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import Menu from "./menu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = (open: boolean) => () => setOpenMenu(open);

  return (
    <>
      <Menu open={openMenu} onDismiss={handleMenuToggle(false)} />
      <div
        className={cn(
          "fixed top-0 left-0 w-full z-101 h-24 px-12 flex justify-center",
          "bg-black/30 backdrop-blur-md shadow-lg"
        )}
      >
        <div className="flex justify-start w-full max-w-7xl flex-row items-center">
          <div
            ref={progressRef}
            className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-emerald-400 via-blue-400 to-purple-400 transition-all duration-300"
            style={{ width: "0%" }}
          />

          {!openMenu && (
            <button
              onClick={handleMenuToggle(true)}
              className="group cursor-pointer h-20 w-10 sm:w-16 flex items-center justify-start hover:scale-110 transition-transform duration-300"
            >
              <MenuIcon className="text-white h-6 w-6 transition-colors" />
            </button>
          )}

          {openMenu && (
            <button
              onClick={handleMenuToggle(false)}
              className="group cursor-pointer h-20 w-10 sm:w-16 flex items-center justify-start hover:scale-110 transition-transform duration-300"
            >
              <XIcon className="text-white h-6 w-6 transition-colors" />
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
      </div>
    </>
  );
};

export default Navbar;
