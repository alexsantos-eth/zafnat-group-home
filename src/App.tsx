import Home from "./views/home";
import SplashCursor from "./components/SplashCursor";
import TorusKnotScene from "./components/bgscene";
import Navbar from "./layout/navbar";
import GradualBlurMemo from "./components/GradualBlur";
import AboutPage from "./views/about";
import StructurePage from "./views/structure";
import ModulesPage from "./views/modules";
import ImpactPage from "./views/impact";
import WorldPage from "./views/world";

export default function App() {
  return (
    <div className="relative w-full overflow-hidden snap-y snap-mandatory">
      <Navbar />
      <TorusKnotScene />
      <SplashCursor />
      <Home />
      <AboutPage />
      <StructurePage />
      <ModulesPage />
      <ImpactPage />
      <WorldPage />
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
