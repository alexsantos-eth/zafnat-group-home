import Layout from "./layout";
import Footer from "./layout/components/footer";
import AboutPage from "./views/about";
import Home from "./views/home";
import ModulesPage from "./views/modules";
import StructurePage from "./views/structure";
import WorldPage from "./views/world";

const App: React.FC = () => {
  return (
    <Layout>
      <Home />
      <div className="h-screen w-full relative bg-transparent pointer-events-none"></div>

      <AboutPage />

      <StructurePage />
      <ModulesPage />
      <WorldPage />
      <Footer />
    </Layout>
  );
};

export default App;
