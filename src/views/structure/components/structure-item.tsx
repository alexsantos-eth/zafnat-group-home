import Heading from "@/layout/components/heading";

interface StructureItemProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

const StructureItem: React.FC<StructureItemProps> = ({ title, description, imageSrc }) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 scale-110 overflow-hidden z-0"
        style={{
          boxShadow: "0 -50px 100px rgba(0,0,0,.3), inset 0 100px 100px rgba(0,0,0,0.15)",
        }}
      >
        <div className=" relative -top-20 rounded-2xl overflow-hidden w-full h-full">
          <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-xl" />
        </div>

        <div
          className="absolute inset-0 bg-black/40 pointer-events-none"
          style={{ boxShadow: "inset 0 100px 100px rgba(0,0,0,0.6), inset 300px 0px 100px rgba(0,0,0,0.5)" }}
        />
      </div>

      {/* STATIC TITLE (always visible) */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <h3 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] text-center">
          {title}
        </h3>
      </div>

      {/* CONTENT (only visible on hover) */}
      <div className="panel-content relative z-20 opacity-0 translate-y-3 px-10 max-w-lg">
        <Heading
          titleSize="max-w-xs sm:max-w-md text-3xl sm:text-4xl lg:text-5xl"
          title={title}
          textShadow="0 4px 20px rgba(0,0,0,1)"
          description={description}
        />
      </div>
    </div>
  );
};

export default StructureItem;
