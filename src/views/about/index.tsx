import ShapeBlur from "../../components/ShapeBlur";

const AboutPage = () => {
  return (
    <div className="h-dvh w-full relative">
      <div className="bg-about w-full h-full pointer-events-none -rotate-5 sm:-rotate-10 scale-130" />

      <div className="flex flex-col gap-4 items-start w-full z-1 px-8 absolute top-[50%] translate-y-[-40dvh] sm:translate-y-[-80%] left-0">
        <h2 className="text-white text-5xl sm:text-6xl font-bold">
          ¿Quiénes Somos?
        </h2>

        <p className="text-gray-300 text-md sm:text-lg max-w-xl">
          Zafnat Group Es un grupo empresarial internacional con operaciones en
          Guatemala, República Dominicana, Estados Unidos e Italia.
        </p>
      </div>

      <div className="h-full w-2xl absolute top-[20%] sm:top-0 -right-30 sm:-right-30 pointer-events-none z-0">
        <div className="relative w-full h-full">
          <ShapeBlur
            variation={0}
            pixelRatioProp={window.devicePixelRatio || 1}
            shapeSize={0.9}
            roundness={0.2}
            borderSize={0.5}
            circleSize={0.3}
            circleEdge={1}
          />
        </div>

        <img
          src="/images/about/hero.jpg"
          className="absolute top-70 sm:top-[32.5%] right-48 w-lg rounded-4xl"
        />
      </div>
    </div>
  );
};

export default AboutPage;
