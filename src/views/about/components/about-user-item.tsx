

interface AboutUserItemProps {
  name: string;
  position: string;
  team?: string;
  className?: string;
  image?: string;
}
const AboutUserItem: React.FC<AboutUserItemProps> = ({
  name,
  position,
  className,
  image,
}) => {
  return (
    <div className={`card-item 
    bg-white/5 
    backdrop-blur-sm
    p-5 rounded-xl 
    border border-white/10 
    shadow-xl 
    hover:border-yellow-400/40 hover:shadow-yellow-400/20 
    transition-all duration-300 
    flex flex-col items-center gap-2
    ${className}`}>
      <img src={image} alt={name} className="w-28 h-28 rounded-full object-cover border border-yellow-400/30"/>

      <h3 className="text-white font-semibold text-sm text-center">{name}</h3>
      <p className="text-gray-300 text-xs text-center">{position}</p>
    </div>
  );
};

export default AboutUserItem;
