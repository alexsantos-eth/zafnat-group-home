import DotGrid from "@/components/DotGrid";
import Particles from "@/components/Particles";

interface ParticleBackgroundProps {
  disableHover?: boolean;
}
const ParticleBackground = ({ disableHover }: ParticleBackgroundProps) => {
  return (
    <Particles
      particleColors={["#ffffff", "#ffffff"]}
      particleCount={100}
      particleSpread={10}
      speed={0.2}
      particleBaseSize={300}
      moveParticlesOnHover={!disableHover}
      alphaParticles={true}
      disableRotation={true}
    />
  );
};

interface GridBackgroundProps {
  style?: React.CSSProperties;
}
export const GridBackground = ({
  style = {
    position: "fixed",
    opacity: 0.6,
    left: 0,
  },
}: GridBackgroundProps) => {
  return (
    <DotGrid
      baseColor="#505050"
      activeColor="#ffffff"
      dotSize={8}
      gap={20}
      style={style}
    />
  );
};

export default ParticleBackground;
