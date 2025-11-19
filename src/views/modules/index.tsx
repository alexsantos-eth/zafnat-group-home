import LightRays from "@/components/LightRays";
import { Timeline } from "@/components/ui/timeline";
import ParticleBackground from "@/layout/components/background";
import Heading from "@/layout/components/heading";

const ModulesPage = () => {
  return (
    <div className="min-h-[220vh] sticky w-full -top-350">
      <div className="absolute top-0 w-full h-full z-4">
        <ParticleBackground />
      </div>

      <div className="absolute top-0 w-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#fff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      <div className="bg-home absolute w-full h-full pointer-events-none" />

      <div className="flex flex-col relative items-center z-3 top-50">
        <div className="relative flex flex-col gap-4 items-start w-max z-1 px-6">
          <div className="flex flex-col gap-4 text-center">
            <Heading
              title="InnoVAgro"
              description="La plataforma que conecta el campo con la ciencia"
            />
          </div>

          <p className="text-gray-300 text-md leading-6 max-w-md text-center">
            Plataforma de agricultura de precisión que combina datos, IA para
            transformar la producción de alimentos.
          </p>
        </div>

        <Timeline
          data={[
            {
              title: "Análisis de Terreno y Recursos",
              content: (
                <div>
                  <p className="font-normal text-md text-gray-300">
                    Diagnóstico inteligente del suelo y clima.
                  </p>
                </div>
              ),
            },
            {
              title: "Planificación Productiva",
              content: (
                <div>
                  <p className="font-normal text-md text-gray-300">
                    Estrategias agrícolas personalizadas.
                  </p>
                </div>
              ),
            },
            {
              title: "Gestión de Operaciones",
              content: (
                <div>
                  <p className="font-normal text-md text-gray-300">
                    Control total de maquinaria, insumos y personal.
                  </p>
                </div>
              ),
            },
            {
              title: "Trazabilidad y Certificaciones",
              content: (
                <div>
                  <p className="font-normal text-lg text-gray-300">
                    Cumpla normas internacionales con facilidad.
                  </p>
                </div>
              ),
            },
            {
              title: "Comercialización Inteligente",
              content: (
                <div>
                  <p className="font-normal text-lg text-gray-300">
                    Datos de mercado, precios y oportunidades en tiempo real.
                  </p>
                </div>
              ),
            },
          ]}
        />

        <div className="pt-20 flex flex-col gap-14">
          <div className="max-w-xl flex flex-col gap-4">
            <Heading
              titleSize="text-4xl"
              title="De la Innovación a la Productividad"
              description="Los productores que implementan InnoVAgro han logrado"
            />
          </div>

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

export default ModulesPage;
