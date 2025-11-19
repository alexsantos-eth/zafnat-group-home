import { cn } from "@/lib/utils";

interface HeadingProps {
  title?: string;
  description?: string;
  titleSize?: string;
  descriptionSize?: string;
}

const Heading = ({
  title,
  description,
  titleSize = "text-7xl",
  descriptionSize = "text-lg",
}: HeadingProps) => {
  return (
    <>
      <h1 className={cn("text-white font-bold", titleSize)}>{title}</h1>
      {(description?.length ?? 0) > 0 && (
        <p className={cn("text-gray-200 font-medium", descriptionSize)}>
          {description}
        </p>
      )}
    </>
  );
};

export default Heading;
