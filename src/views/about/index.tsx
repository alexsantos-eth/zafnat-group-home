import ShapeBlur from "../../components/ShapeBlur";

const AboutPage = () => {
  return (
    <div className="h-[150dvh] w-full relative snap-center">
      <div className="bg-about absolute w-full h-full pointer-events-none -rotate-5 sm:-rotate-10 scale-130" />

      <div className="flex flex-col gap-4 items-start w-full z-1 px-8 absolute top-[50%] translate-y-[-75dvh] sm:-translate-y-full left-0">
        <h2 className="text-white text-5xl sm:text-6xl font-bold">
          ¿Quiénes Somos?
        </h2>

        <p className="text-gray-300 text-md sm:text-lg max-w-xl">
          Zafnat Group Es un grupo empresarial internacional con operaciones en
          Guatemala, República Dominicana, Estados Unidos e Italia.
        </p>

        <p className="text-gray-400 text-sm sm:text-md max-w-xl">
          Nacimos de la experiencia directa en la producción agrícola y del
          compromiso de elevar la productividad del campo a través de la
          innovación tecnológica, el desarrollo humano y la infraestructura
          sostenible.
        </p>
      </div>

      <div className="h-[600px] w-2xl absolute top-[50%] sm:top-[50%] translate-y-[-50%] sm:translate-y-[-70%] -right-30 sm:-right-30 pointer-events-none z-0">
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
          src="/images/about/hero.png"
          className="absolute top-0 sm:top-[5%] right-40 w-lg rounded-4xl"
        />
      </div>
    </div>
  );
};

export default AboutPage;
