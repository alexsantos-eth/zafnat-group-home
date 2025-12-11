/* eslint-disable @typescript-eslint/ban-ts-comment */
import Card from "@/components/card";
import GridCarousel from "@/components/gridcarousel";
import View from "@/components/view";
import { useObserveAnimation } from "@/hooks/useObserveAnimation";

const AboutView = () => {
  const firstInfoRef = useObserveAnimation();
  const titleRef = useObserveAnimation({ preset: "fadeSlideLeft", delay: 0.2 });
  const paragraphRef = useObserveAnimation({
    preset: "fadeSlideLeft",
    delay: 0.4,
  });

  const borderRef = useObserveAnimation({ preset: "scaleIn", delay: 0.5 });

  return (
    <View classNames="py-40 relative flex flex-col gap-14">
      <div className="flex gap-6 relative">
        <div
          className="w-1 bg-[#4079ff] rounded-full relative"
          ref={borderRef as React.RefObject<HTMLDivElement>}
        />

        <div className="flex h-full flex-col gap-8 relative z-2">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            <h1
              className="text-white font-medium text-5xl sm:text-3xl"
              ref={titleRef as React.RefObject<HTMLHeadingElement>}
            >
              ¿Quiénes Somos?
            </h1>

            <div
              className="w-full max-w-3xl flex flex-col gap-6"
              ref={paragraphRef as React.RefObject<HTMLDivElement>}
            >
              <h1 className="text-white font-bold text-5xl sm:text-6xl">
                ¿Cómo <span className="text-green-500">vemos</span> el futuro?
              </h1>

              <p className="text-gray-200 font-medium text-sm sm:text-base lg:text-lg">
                Somos un grupo empresarial internacional que busca consolidarse
                a través de un plan estratégico para brindar apoyo integral al
                productor, desde la concepción de su idea hasta la
                comercialización.
              </p>

              <p className="text-gray-400 font-medium text-sm sm:text-base lg:text-lg">
                Este equipo, con experiencia multidisciplinaria en los sectores
                agropecuario, empresarial y de innovación, está comprometido con
                el desarrollo rural a través de soluciones innovadoras. Su
                objetivo es mejorar el desarrollo humano, promover la
                sostenibilidad y fortalecer la competitividad de la
                agroindustria.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={firstInfoRef as React.RefObject<HTMLDivElement>}
        className="bg-blue-100/30 rounded-4xl px-6 py-6 max-w-2xl z-2 backdrop-blur-md flex flex-col gap-4"
        style={{
          // @ts-ignore
          cornerShape: "squircle",
        }}
      >
        <h3 className="text-white font-medium text-2xl">Nuestra visión</h3>
        <p className="text-white text-md">
          Consolidar un equipo empresarial diversificado con visiones
          multinacionales, que poseen experiencia en diversos ámbitos y una
          estructura de divisiones regionales con enfoques estratégicos.
        </p>
      </div>

      <div className="w-1/2 h-full absolute z-1 top-0 right-0">
        <div className="w-3/4 h-full absolute top-0 left-0 bg-linear-to-r from-black/90 to-transparent z-10" />

        <GridCarousel
          images={[
            "/images/pineapple.jpg",
            "/images/pineapple_3.png",
            "/images/pineapple.jpg",
            "/images/pineapple_3.png",
            "/images/pineapple.jpg",
            "/images/pineapple_3.png",
            "/images/pineapple_2.png",
            "/images/pineapple_4.png",
            "/images/pineapple_2.png",
            "/images/pineapple_4.png",
            "/images/pineapple_2.png",
            "/images/pineapple_4.png",
          ]}
          className="h-full"
        />
      </div>

      <Card />
    </View>
  );
};

export default AboutView;
