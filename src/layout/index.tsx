import GradualBlurMemo from "../components/GradualBlur";
import SplashCursor from "../components/SplashCursor";
import Navbar from "./components/navbar";

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
        zIndex={0}
      />
      <Navbar />
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
      />
    </>
  );
};

export default Layout;
