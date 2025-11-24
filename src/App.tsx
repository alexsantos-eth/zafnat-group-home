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

      <div className="relative z-1 snap-y snap-mandatory">
        <div className="panel snap-center">
          <Home />
        </div>
        <div className="panel snap-center">
          <AboutPage />
        </div>
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
