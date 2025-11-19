import { MenuIcon } from "lucide-react";
const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full flex flex-row items-center z-101">
      <button className="cursor-pointer h-20 w-16 flex items-center justify-center">
        <MenuIcon className="text-white h-6 w-6" />
      </button>
      <div>
        <img src="/images/logo.png" alt="Logo" className="h-8" />
      </div>
    </div>
  );
};

export default Navbar;
