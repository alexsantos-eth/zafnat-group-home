import Home from "./views/home";
import SplashCursor from "./components/SplashCursor";
import TorusKnotScene from "./components/bgscene";
import Navbar from "./layout/navbar";
import GradualBlurMemo from "./components/GradualBlur";
import AboutPage from "./views/about";

export default function App() {
  return (
    <div className="relative w-full overflow-hidden">
      <Navbar />
      <div
        className="w-full h-dvh bg-[url(/images/noise.png)] bg-repeat fixed top-0 left-0 z-1000 mix-blend-multiply pointer-events-none"
        style={{ backgroundSize: "120px 120px" }}
      />

      <TorusKnotScene />
      <SplashCursor />
      <Home />
      <AboutPage />
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
    </div>
  );
}
