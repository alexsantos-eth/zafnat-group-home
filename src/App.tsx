import Layout from "./layout";
import Footer from "./layout/components/footer";
import AboutView from "./views/about";
import HomeView from "./views/home";

export default function App() {
  return (
    <Layout>
      <HomeView />
      <AboutView />
      <Footer />
    </Layout>
  );
}
