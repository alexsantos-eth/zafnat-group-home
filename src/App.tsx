import Home from "./views/home";
import SplashCursor from "./components/SplashCursor";
import TorusKnotScene from "./components/bgscene";
import Navbar from "./layout/navbar";
import GradualBlurMemo from "./components/GradualBlur";

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <TorusKnotScene />
      <SplashCursor />
      <Home />
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
