import useUpdateImageScroll from "./hooks";

const Background: React.FC = () => {
  const { canvasRef } = useUpdateImageScroll();

  return (
    <div className="h-[800dvh]">
      <canvas
        ref={canvasRef}
        className="w-dvw h-dvh fixed top-0 left-0 object-cover"
        width={1920}
        height={1080}
      />
    </div>
  );
};

export default Background;
