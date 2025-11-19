import ModelViewer from "@/components/ModelViewer";
import { useScroll } from "@/hooks/useScroll";
import { GridBackground } from "@/layout/components/background";
import Heading from "@/layout/components/heading";

const Home: React.FC = () => {
  const scrollValue = useScroll();
  const width = window.innerWidth;
  const height = window.innerHeight;

  return (
    <>
      <div
        style={{
          transform: `translateY(${scrollValue * -1}px)`,
        }}
        className="bg-home w-full h-screen fixed top-0 flex flex-row p-6 justify-start items-center"
      >
        <GridBackground />

        <div className="flex flex-col gap-10 relative z-2 max-w-md">
          <Heading
            title="De la tierra al futuro"
            description="Conectamos la agricultura con la innovación. Tecnología, Sostenibilidad, Precisión."
          />

          <button className="border font-[Geist] border-white text-white overflow-hidden rounded-lg w-max px-6 py-2 cursor-pointer">
            Experiencia inmersiva
          </button>
        </div>
      </div>

      <div className="fixed w-max h-max top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
        <ModelViewer
          width={width}
          height={height}
          fadeIn
          defaultZoom={0.7}
          enableManualRotation={false}
          enableManualZoom={false}
          autoRotate
          defaultRotationY={1}
          autoRotateSpeed={0.03}
          defaultRotationX={50}
          showScreenshotButton={false}
          url="/models/pineapple/scene.glb"
        />
      </div>
    </>
  );
};

export default Home;
