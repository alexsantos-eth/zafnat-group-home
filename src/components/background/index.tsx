import useUpdateImageScroll from "./hooks";

const Background: React.FC = () => {
  const { imageRef } = useUpdateImageScroll();

  return (
    <div className="h-[800dvh]">
      <img
        ref={imageRef}
        className="w-dvw h-dvh object-cover fixed"
        src="/frames/frame_0001.webp"
        alt="Background"
      />
    </div>
  );
};

export default Background;
