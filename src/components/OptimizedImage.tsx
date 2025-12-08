import type { ImgHTMLAttributes} from 'react';
import { useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  blurDataURL?: string;
}

/**
 * Componente de imagen optimizado con lazy loading y placeholder blur
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  blurDataURL,
  className = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder borroso */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        />
      )}
      
      {/* Imagen principal */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
