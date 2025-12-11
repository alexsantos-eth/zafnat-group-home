import React from "react";

const Card = () => {
  return (
    <div className="w-48 cursor-pointer group">
      <div className="text-center relative transition-all duration-2250 bg-[rgb(127,204,240)] p-20 transform-3d group-hover:transform-[rotateY(0.5turn)]">
        <div className="absolute inset-0 p-8 transform-3d backface-hidden">
          <h3 className="transform-[translateZ(5rem)] text-3xl">Hey</h3>
          <p className="transform-[translateZ(2rem)]">Hover me :)</p>
        </div>
        <div className="absolute inset-0 p-8 transform-3d backface-hidden transform-[rotateY(0.5turn)] bg-[#009bff]">
          <p className="transform-[translateZ(3rem)]">
            Cool description so you can read it too my friend
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
