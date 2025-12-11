import ModelViewer from "@/components/modelViewer";
import TextGradient from "@/fx/textgradient";
import { VIEW_CLASSNAME } from "@/lib/styles";
import { cn } from "@/lib/utils";

const HomeView = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-contain z-0"
      >
        <source src="/images/home/background.mp4" type="video/mp4" />
      </video>

      <div
        className={cn(
          `flex justify-center relative z-1 h-full w-full bg-linear-to-r from-black/80 to-black/30 items-center ${VIEW_CLASSNAME}`
        )}
      >
        <div className="w-full max-w-7xl relative">
          <div className="flex flex-col gap-4 sm:gap-6 max-w-[400px] sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <div className="flex flex-col items-start gap-0 sm:gap-2">
              <h1 className="text-white font-bold text-[1.8em] sm:text-4xl md:text-5xl lg:text-7xl text-shadow-lg">
                Transformamos la
              </h1>
              <TextGradient
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={10}
                showBorder={false}
              >
                <h1 className="font-bold text-[1.8em] sm:text-4xl md:text-5xl lg:text-7xl ">
                  agroindustria
                </h1>
              </TextGradient>

              <h1 className="text-white font-bold text-[1.8em] sm:text-4xl md:text-5xl lg:text-7xl  text-shadow-lg">
                con innovación.
              </h1>
            </div>

            <div>
              <p className="text-white leading-7 sm:leading-8 md:leading-8 lg:leading-10 font-medium text-md md:text-xl lg:text-2xl opacity-80 text-shadow-lg">
                Soluciones integrales que mejoran la vida de productores,
                fortalecen comunidades rurales y conectan la agroindustria con
                el futuro.
              </p>
            </div>
          </div>

          <div className="absolute top-0 -right-10">
            <ModelViewer
              scrollRotate
              modelXOffset={0}
              modelYOffset={0}
              width={window.innerWidth * 0.5}
              height={400}
              fadeIn
              autoFrame
              defaultZoom={0.8}
              maxZoomDistance={10000}
              enableManualRotation={false}
              enableManualZoom={false}
              autoRotateSpeed={0.05}
              defaultRotationY={20}
              defaultRotationX={30}
              showScreenshotButton={false}
              url="/models/dron/scene.glb"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
