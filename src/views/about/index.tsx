import LiquidEther from "@/components/LiquidEther";
import Heading from "@/layout/components/heading";

const AboutPage = () => {
  return (
    <div className="h-[85vh] w-full sticky top-0 flex flex-row items-center justify-between overflow-hidden">
      <div className="bg-about absolute w-full h-full pointer-events-none" />

      <div className="flex flex-col gap-12 relative z-1 items-start max-w-2xl pl-6">
        <div className="flex flex-col gap-4">
          <Heading
            titleSize="text-6xl"
            title="¿Quiénes Somos?"
            description="Zafnat Group Es un grupo empresarial internacional con operaciones en Guatemala, República Dominicana, Estados Unidos e Italia."
          />
        </div>

        <p className="text-gray-300 w-md text-md p-6 border border-white rounded-2xl leading-8">
          Con experiencia agrícola, impulsamos la productividad mediante
          tecnología, desarrollo humano e infraestructura sostenible.
        </p>
      </div>

      <div className="w-[400px] h-full relative flex flex-row items-center z-1">
        <LiquidEther
          colors={["#FFD700", "#FFD700", "#FFD700"]}
          mouseForce={20}
          cursorSize={40}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={0}
          autoRampDuration={0.6}
        />

        <img
          src="/images/about/hero.png"
          className="absolute right-40 rounded-4xl min-w-[450px]"
        />
      </div>
    </div>
  );
};

export default AboutPage;
