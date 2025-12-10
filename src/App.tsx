import Layout from "./layout";
import Footer from "./layout/components/footer";
import WorldPage from "./views/world";

export default function App() {
  return (
    <Layout>
      <WorldPage />
      <Footer />
    </Layout>
  );
}
