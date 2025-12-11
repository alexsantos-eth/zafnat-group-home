/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

interface CardProps {
  title?: string;
  description?: string;
  backContent?: React.ReactNode;
  bgImageUrl?: string;
}
const Card: React.FC<CardProps> = ({
  title,
  description,
  backContent,
  bgImageUrl,
}) => {
  return (
    <div className="w-full h-[450px] cursor-pointer group">
      <div
        style={{
          // @ts-ignore
          cornerShape: "squircle",
          background: bgImageUrl ? `url(${bgImageUrl})` : undefined,
          backgroundSize: "cover",
        }}
        className={
          "w-full h-full rounded-4xl relative transition-all duration-2250 bg-cover p-20 transform-3d group-hover:transform-[rotateY(0.5turn)]"
        }
      >
        <div
          style={{
            // @ts-ignore
            cornerShape: "squircle",
          }}
          className="absolute rounded-4xl bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end bottom-0 inset-0 p-8 transform-3d backface-hidden"
        >
          <h3 className="transform-[translateZ(3rem)] text-3xl text-white">
            {title}
          </h3>
          <p className="transform-[translateZ(2rem)] text-white">
            {description}
          </p>
        </div>

        <div
          style={{
            // @ts-ignore
            cornerShape: "squircle",
          }}
          className="absolute inset-0 transform-3d rounded-4xl backface-hidden transform-[rotateY(0.5turn)] bg-[#041211]"
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default Card;
