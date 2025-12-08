import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 3500; // Duración total de la carga

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      // Curva de progreso suave con easeOutCubic
      const easeProgress = rawProgress < 100 
        ? rawProgress - (Math.pow(1 - rawProgress / 100, 3) * rawProgress)
        : 100;

      setProgress(easeProgress);

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Esperar a que window.load se complete
        if (document.readyState === 'complete') {
          setTimeout(() => {
            onLoadComplete();
          }, 300);
        } else {
          window.addEventListener('load', () => {
            setTimeout(() => {
              onLoadComplete();
            }, 300);
          }, { once: true });
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${
        "opacity-100"
      }`}
    >
      {/* Logo SVG */}
      <div className="mb-16 animate-pulse">
        <svg
          width="300"
          height="100"
          viewBox="0 0 300 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* Icono inspirado en Pioneer */}
          <path
            d="M30 20 L50 20 L60 40 L50 60 L30 60 L20 40 Z"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
          />
          <circle cx="40" cy="35" r="3" fill="currentColor" />
          <circle cx="40" cy="45" r="3" fill="currentColor" />
          <path
            d="M35 40 Q40 38 45 40"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          
          {/* Texto ZAFNAT GROUP INTERNATIONAL */}
          <text
            x="75"
            y="35"
            fill="currentColor"
            fontSize="16"
            fontWeight="bold"
            fontFamily="Arial, sans-serif"
            letterSpacing="2"
          >
            ZAFNAT
          </text>
          <text
            x="75"
            y="55"
            fill="currentColor"
            fontSize="12"
            fontFamily="Arial, sans-serif"
            letterSpacing="3"
            opacity="0.8"
          >
            GROUP INTERNATIONAL
          </text>
        </svg>
      </div>

      {/* Barra de progreso */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Porcentaje y texto */}
      <div className="mt-8 text-center">
        <div className="text-4xl font-bold text-white mb-2">
          {Math.floor(Math.min(progress, 100))}%
        </div>
        <div className="text-sm text-gray-400 tracking-wider">
          Loading your experience.
        </div>
      </div>

      {/* Partículas decorativas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
