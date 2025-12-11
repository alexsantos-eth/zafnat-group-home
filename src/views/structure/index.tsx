import Card from "@/components/card";
import View, { ViewContent } from "@/components/view";

const StructureView: React.FC = () => {
  return (
    <View className="py-40 bg-blue">
      <ViewContent className="flex flex-col gap-20">
        <div className="flex gap-6 relative">
          <div className="w-1 bg-[#4079ff] rounded-full relative" />

          <div className="flex h-full flex-col gap-8 relative z-2">
            <div className="w-full max-w-2xl flex flex-col gap-6">
              <h1 className="text-white font-bold text-5xl sm:text-6xl">
                Nuestras divisiones{" "}
                <span className="text-blue-500">estratégicas</span>
              </h1>

              <p className="text-gray-200 font-medium text-sm sm:text-base lg:text-lg">
                Tres divisiones que unen innovación, fortalecimiento humano y
                gestión territorial para implementar proyectos agrícolas de alto
                impacto.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <Card
            title="InnovAgro"
            description="Agricultura de precisión e innovación agrícola"
            bgImageUrl="/images/structure/hero_1.png"
            backContent={
              <div className="flex flex-col gap-6 p-6 overflow-scroll h-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    App de Agricultura de Precisión
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Esta aplicación tiene como objetivo facilitar el análisis,
                    la trazabilidad, la gestión y la comercialización,
                    combinando apoyo técnico presencial con inteligencia
                    artificial.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Seguro de protección Rural
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Con un enfoque en riesgos asociados al cambio climático y
                    pandemias, este producto respalda a los productores frente a
                    pérdidas imprevistas.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Depto. de normas y certificaciones
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Contribuye a que pequeños y medianos productores cumplan con
                    estándares nacionales e internacionales, mejorando sus
                    precios de venta y oportunidades de exportación.
                  </p>
                </div>
              </div>
            }
          />

          <Card
            title="Panea"
            description="Capacitación continua y eventos científico personales"
            bgImageUrl="/images/structure/hero_2.png"
            backContent={
              <div className="flex flex-col gap-6 p-6 overflow-scroll h-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Base de datos científicos
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Crear una base de datos de científicos, profesionales y
                    universidades para organizar simposios y ofertas académicas
                    a solicitud de cooperaciones internacionales a ONGs.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Alianzas internacionales
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Establecer alianzas con las cuatro ferias internacionales
                    más importantes (Estados Unidos, España, Alemania, China)
                    para facilitar la participación de productores.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Eventos de lanzamiento
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Organizar eventos de lanzamiento de productos o
                    capacitaciones, manejando desde la logística y diseño hasta
                    la convocatoria y contenido científico.
                  </p>
                </div>
              </div>
            }
          />

          <Card
            title="Goshen"
            description="Bienes raíces, infraestructura y desarrollo internacional"
            bgImageUrl="/images/structure/hero_3.png"
            backContent={
              <div className="flex flex-col gap-6 p-6 overflow-scroll h-full">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Excelencia en la producción
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Demostramos nuestra excelencia productiva a través de fincas
                    propias, donde aplicamos nuestra tecnología y corregimos
                    continuamente nuestros procesos operativos, con el propósito
                    de generar aprendizajes que beneficien directamente a los
                    productores.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Desarrollo humano
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Invertimos en mejorar la calidad de vida de nuestros
                    colaboradores en las zonas de producción, brindándoles
                    acceso a vivienda digna, educación, salud, alimentación de
                    calidad y espacios para el esparcimiento.
                  </p>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <h3 className="text-white font-semibold text-sm">
                    Tecnología
                  </h3>
                  <p className="text-gray-200 text-sm">
                    La inversión contempla la adquisición de maquinaria
                    agrícola, drones y otras tecnologías que optimicen nuestros
                    procesos de producción.
                  </p>
                </div>
              </div>
            }
          />
        </div>
      </ViewContent>
    </View>
  );
};

export default StructureView;
