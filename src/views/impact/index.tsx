const ImpactPage = () => {
  return (
    <div className="h-dvh w-full relative top-40">
      <div className="bg-about absolute w-full h-full pointer-events-none -rotate-5 sm:-rotate-10 scale-130" />

      <div className="relative flex flex-row px-8 top-30 gap-8">
        <div className="flex flex-col gap-4 w-full z-1 relative max-w-2xl">
          <h2 className="text-white text-5xl sm:text-6xl font-bold">
            De la Innovación a la Productividad
          </h2>

          <p className="text-gray-300 text-md sm:text-lg max-w-xl">
            Los productores que implementan InnoVAgro han logrado:
          </p>

          <p className="text-gray-400 text-sm sm:text-md max-w-xl">
            Desde el suelo hasta la cadena global de valor, InnoVAgro transforma
            cada etapa del proceso productivo.
          </p>
        </div>

        <div className="relative top-10">
          <ul className="flex flex-col gap-4">
            <li className="text-white">
              ● Incrementar su productividad hasta un 30 %.
            </li>
            <li className="text-white">
              ● Reducir el desperdicio de recursos y fertilizantes.
            </li>
            <li className="text-white">
              ● Acceder a certificaciones internacionales.
            </li>
            <li className="text-white">
              ● Mejorar la trazabilidad y transparencia en sus exportaciones.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImpactPage;
