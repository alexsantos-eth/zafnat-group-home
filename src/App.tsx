import Layout from "./layout";
import ParticleBackground, {
  GradientBackground,
} from "./layout/components/background";
import AboutPage from "./views/about";
import Home from "./views/home";

const App: React.FC = () => {
  return (
    <Layout>
      <GradientBackground />
      <ParticleBackground />
      <ParticleBackground disableHover />

      <Home />
      <AboutPage />
      <div className="w-full h-[22.5vh] sm:h-[11.5vh] md:h-[8vh]" />
      <AboutPage />

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
