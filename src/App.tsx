import { useState, useEffect, lazy, Suspense } from "react";
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
import ProducersPage from "./views/producers";
import CooperationPage from "./views/cooperation";
import FitotecniaPage from "./views/fitotecnia";
import ZootecniaPage from "./views/zootecnia";
import LoadingScreen from "./components/LoadingScreen";
import { usePerformanceOptimization } from "./hooks/usePerformanceOptimization";

const WorldPage = lazy(() => import("./views/world"));

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [modelsLoaded, setModelsLoaded] = useState({total: 1, loaded: 0})
   const [loadingScreenComplete, setLoadingScreenComplete] = useState(false);
  
  usePerformanceOptimization();

  useEffect(()=>{
    console.log(modelsLoaded, loadingScreenComplete)

    if(modelsLoaded.total <= modelsLoaded.loaded && loadingScreenComplete){
      console.log("ya es falso")
      setIsLoading(false);
    }
  },[modelsLoaded, loadingScreenComplete])


  const handleLoadingComplete = () => {
    setLoadingScreenComplete(true)
    console.log(loadingScreenComplete);
  };


  const handleModelLoaded = (modelo: any) => () => {
    let actualModels = modelsLoaded
    actualModels.loaded +=1
    setModelsLoaded(actualModels)
    console.log(actualModels);
    console.log(`Modelo ${modelo} cargado.`);
  };

  return (
    <>
      
      {isLoading && (
        <LoadingScreen onLoadComplete={handleLoadingComplete} />
      )}

      
      <Layout>
        <GradientBackground />
        <ParticleBackground />
        <Home readyForAnimations={!isLoading} onModelLoaded={handleModelLoaded('tractor')}/>
        <AboutPage />
        <StructurePage />
        <ModulesPage />
        <ProducersPage />
        <CooperationPage />
        <FitotecniaPage />
        <ZootecniaPage />

        <Suspense fallback={<div style={{ height: '100vh' }} />}>
          <WorldPage />
        </Suspense>

        
        <ContactPage />
        

        
        

        
        
        
        <Footer />

        
      </Layout>
    </>
  );
};

export default App;
