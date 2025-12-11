import Layout from "./layout";
import Footer from "./layout/components/footer";
import AboutView from "./views/about";
import HomeView from "./views/home";
import StructureView from "./views/structure";

export default function App() {
  return (
    <Layout>
      <HomeView />
      <AboutView />
      <StructureView />
      <Footer />
    </Layout>
  );
}
