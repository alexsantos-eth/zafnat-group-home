import ParticleBackground from "@/layout/components/background";
import Heading from "@/layout/components/heading";

const StructurePage = () => {
  return (
    <div className="min-h-vh w-full sticky -top-100">
      <div className="bg-blue absolute w-full h-full pointer-events-none" />

      <div className="absolute top-0 w-full h-full z-2">
        <ParticleBackground />
      </div>

      <div className="relative z-1 py-30 px-6 flex flex-col gap-20">
        <div>
          <Heading
            title="Nuestra Estructura"
            titleSize="text-6xl"
            description="Tres pilares, un mismo propósito"
          />
        </div>

        <div className="w-full flex justify-start">
          <div className="flex flex-col gap-18 w-max">
            <div className="flex flex-row items-center justify-start gap-14 w-full">
              <div className="w-md flex flex-col gap-4">
                <Heading
                  title="InnoVagro"
                  titleSize="text-3xl"
                  descriptionSize="text-md"
                  description="Agricultura de precisión y yrazabilidad Digital. Plataforma que optimiza la comercialización agrícola usando inteligencia artificial."
                />
              </div>

              <div className="flex h-[200px] min-w-lg overflow-hidden rounded-3xl justify-center">
                <img
                  src="/images/structure/hero_1.png"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-14 w-full pl-10">
              <div className="w-md flex flex-col gap-4">
                <Heading
                  title="Panea"
                  titleSize="text-3xl"
                  descriptionSize="text-md"
                  description="Formación y cooperación científica internacional. Conectamos expertos, universidades y productores para promover el conocimiento agroindustrial"
                />
              </div>

              <div className="flex h-[200px] min-w-lg overflow-hidden rounded-3xl justify-center">
                <img
                  src="/images/structure/hero_2.png"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-start gap-14 w-full">
              <div className="w-md flex flex-col gap-4">
                <Heading
                  title="Goshen"
                  titleSize="text-3xl"
                  descriptionSize="text-md"
                  description="Infraestructura y Bienes Raíces Agroindustriales. Creamos espacios sostenibles y productivos que impulsan el desarrollo rural y humano."
                />
              </div>

              <div className="flex h-[200px] min-w-lg overflow-hidden rounded-3xl justify-center">
                <img
                  src="/images/structure/hero_3.png"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructurePage;
