import { cn } from "@/lib/utils";

interface AboutUserItemProps {
  name: string;
  position: string;
  team: string;
  className?: string;
}
const AboutUserItem: React.FC<AboutUserItemProps> = ({
  name,
  position,
  className,
}) => {
  return (
    <div
      className={cn(
        "px-4 py-4 w-full bg-white/20 rounded-2xl backdrop-blur-3xl card-item",
        className
      )}
    >
      <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
      <p className="text-gray-300 text-sm mb-1">{position}</p>
    </div>
  );
};

export default AboutUserItem;
