import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Layout from "./layout";
import Home from "./views/home";
import AboutPage from "./views/about";
import ParticleBackground from "./layout/components/background";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    gsap.to(bgRef.current, {
      y: "-75%",
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  return (
    <Layout>
      <div
        ref={bgRef}
        className="h-[350vh] fixed top-0 w-full z-0 pointer-events-none bg-transition"
      />

      <div className="h-[200vh] absolute top-0 z-0 w-full pointer-events-none">
        <ParticleBackground />
      </div>

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
