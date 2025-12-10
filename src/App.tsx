import Layout from "./layout";
import Footer from "./layout/components/footer";
import HomeView from "./views/home";

export default function App() {
  return (
    <Layout>
      <HomeView />
      <Footer />
    </Layout>
  );
}
