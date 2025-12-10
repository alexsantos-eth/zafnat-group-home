import { Timeline } from "@/components/ui/timeline";

const ModulesPage = () => {
  return (
    <div className="h-max w-full relative">
      <div className="bg-home absolute w-full h-full pointer-events-none -rotate-5 sm:-rotate-5 scale-130" />

      <div className="flex flex-row relative -top-40">
        <div className="relative top-40 flex flex-col gap-4 items-start w-full z-1 px-8">
          <h2 className="text-white text-5xl sm:text-6xl font-bold">
            InnoVAgro
          </h2>

          <p className="text-gray-300 text-md sm:text-lg max-w-xl">
            La Plataforma que Conecta el Campo con la Ciencia
          </p>

          <p className="text-gray-400 text-sm sm:text-md max-w-xl">
            InnoVAgro es una plataforma integral de Agricultura de Precisión que
            combina datos, inteligencia artificial y trazabilidad para
            transformar la forma en que producimos alimentos.
          </p>
        </div>

        <Timeline
          data={[
            {
              title: "Análisis de Terreno y Recursos",
              content: (
                <div>
                  <p className="mb-8 font-normal text-lg text-gray-300">
                    Diagnóstico inteligente del suelo y clima.
                  </p>
                </div>
              ),
            },
            {
              title: "Planificación Productiva",
              content: (
                <div>
                  <p className="mb-8 font-normal text-lg text-gray-300">
                    Estrategias agrícolas personalizadas.
                  </p>
                </div>
              ),
            },
            {
              title: "Gestión de Operaciones",
              content: (
                <div>
                  <p className="mb-8 font-normal text-lg text-gray-300">
                    Control total de maquinaria, insumos y personal.
                  </p>
                </div>
              ),
            },
            {
              title: "Trazabilidad y Certificaciones",
              content: (
                <div>
                  <p className="mb-8 font-normal text-lg text-gray-300">
                    Cumpla normas internacionales con facilidad.
                  </p>
                </div>
              ),
            },
            {
              title: "Comercialización Inteligente",
              content: (
                <div>
                  <p className="mb-8 font-normal text-lg text-gray-300">
                    Datos de mercado, precios y oportunidades en tiempo real.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ModulesPage;
