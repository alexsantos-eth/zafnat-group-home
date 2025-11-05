const AboutPage = () => {
  return (
    <div className="h-dvh w-full relative">
      <div className="bg-about w-full h-full pointer-events-none -rotate-5 sm:-rotate-10 scale-130" />
      <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-row items-center justify-center">
        <div className="flex flex-col gap-4 items-start w-full z-1 px-8">
          <h2 className="text-white text-5xl sm:text-6xl font-bold">
            ¿Quiénes Somos?
          </h2>

          <p className="text-white text-lg max-w-xl">
            Zafnat Group Es un grupo empresarial internacional con operaciones
            en Guatemala, República Dominicana, Estados Unidos e Italia.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
