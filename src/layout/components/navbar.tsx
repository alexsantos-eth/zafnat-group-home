import { MenuIcon, XIcon } from "lucide-react";
import Menu from "./menu";
import { useState } from "react";
import { cn } from "@/lib/utils";
const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuToggle = (open: boolean) => () => setOpenMenu(open);

  return (
    <>
      <Menu open={openMenu} onDismiss={handleMenuToggle(false)} />
      <div
        className={cn(
          "fixed top-0 left-0 w-full flex justify-start flex-row items-center z-101 h-24 py-2 px-8"
        )}
      >
        {!openMenu && (
          <button
            onClick={handleMenuToggle(true)}
            className="cursor-pointer h-20 w-20 flex items-center justify-center"
          >
            <MenuIcon className="text-white h-6 w-6" />
          </button>
        )}

        {openMenu && (
          <button
            onClick={handleMenuToggle(false)}
            className="cursor-pointer h-20 w-20 flex items-center justify-center"
          >
            <XIcon className="text-white h-6 w-6" />
          </button>
        )}

        <div>
          <img src="/images/logo.png" alt="Logo" className="h-8" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
