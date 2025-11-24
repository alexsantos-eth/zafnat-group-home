import Layout from "./layout";
import ParticleBackground, {
  GradientBackground,
} from "./layout/components/background";
import AboutPage from "./views/about";
import Home from "./views/home";
import StructurePage from "./views/structure";

const App: React.FC = () => {
  return (
    <Layout>
      <GradientBackground />
      <ParticleBackground disableHover />

      <Home />
      <AboutPage />

      <StructurePage />

      <div className="absolute top-0 w-full h-full z-2">
        <ParticleBackground />
      </div>
      {/*
      <AboutPage />

      <StructurePage />
      <ModulesPage />
      <WorldPage />
      <Footer /> */}
    </Layout>
  );
};

export default App;
