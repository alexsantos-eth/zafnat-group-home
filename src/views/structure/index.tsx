import CircularGallery from "@/components/CircularGallery";

const StructurePage = () => {
  return (
    <div className="h-[70dvh] w-full relative -top-20 snap-center">
      <div className="bg-blue absolute w-full h-full pointer-events-none -rotate-5 sm:-rotate-10 scale-130" />

      <div className="relative -top-100 h-dvh">
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
          items={[
            {
              image: "/images/structure/hero_1.png",
              text: "InnoVAgro",
            },
            {
              image: "/images/structure/hero_2.png",
              text: "Panea",
            },
            {
              image: "/images/structure/hero_3.png",
              text: "Goshen",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default StructurePage;
