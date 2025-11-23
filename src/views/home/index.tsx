import ModelViewer from "@/components/ModelViewer";
import Heading from "@/layout/components/heading";

const Home: React.FC = () => {
  const width = typeof window !== "undefined" ? window.innerWidth : 800;
  const height = typeof window !== "undefined" ? window.innerHeight : 600;

  return (
    <>
      <div className="w-full h-screen flex flex-row p-6 px-28 justify-start items-center relative z-1">
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
          autoRotate={false}
          defaultRotationY={0}
          defaultRotationX={0}
          showScreenshotButton={false}
          url="/models/pineapple/scene.glb"
        />
      </div>
    </>
  );
};

export default Home;
