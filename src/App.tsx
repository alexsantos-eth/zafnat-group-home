import Layout from "./layout";
import ParticleBackground, {
  GradientBackground,
} from "./layout/components/background";
import Footer from "./layout/components/footer";
import AboutPage from "./views/about";
import ContactPage from "./views/contact";
import Home from "./views/home";
import ModulesPage from "./views/modules";
import StructurePage from "./views/structure";
import WorldPage from "./views/world";

const App: React.FC = () => {
  return (
    <Layout>
      <GradientBackground />
      <ParticleBackground disableHover />

      <Home />
      <AboutPage />
      <StructurePage />
      <ModulesPage />
      <WorldPage />
      <ContactPage />
      <Footer />

      <div className="absolute top-0 w-full h-full z-3">
        <ParticleBackground />
      </div>
    </Layout>
  );
};

export default App;
