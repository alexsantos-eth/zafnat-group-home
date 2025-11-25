import SplashCursor from "@/components/SplashCursor";
import GradualBlurMemo from "../components/GradualBlur";
import Navbar from "./components/navbar";
import SideNav from "./components/SideNav";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <GradualBlurMemo
        target="page"
        position="top"
        height="10rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={0} // Z 100
      />
      {/* Z 101 */}
      <Navbar />
      <SideNav />
      {children}

      <SplashCursor />
      <GradualBlurMemo
        target="page"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        zIndex={0} // Z 100
      />
    </>
  );
};

export default Layout;
