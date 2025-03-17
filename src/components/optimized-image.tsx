// src/components/OptimizedImage.tsx
import Image from "next/image";
import { getOptimalImageSize } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes = "100vw",
  quality = 85,
}: OptimizedImageProps) {
  // Automatycznie obliczaj optymalny rozmiar na podstawie urządzenia
  const optimizedWidth = getOptimalImageSize(width);
  const optimizedHeight = fill
    ? undefined
    : Math.round((height / width) * optimizedWidth);

  // Domyślne sizesy dla różnych breakpointów, jeśli nie podano
  const defaultSizes =
    sizes === "100vw" && !fill
      ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      : sizes;

  // Obsługa różnych typów ścieżek obrazów
  const imageSrc = src.startsWith("/api/placeholder")
    ? src
    : src.startsWith("http")
    ? src
    : src.startsWith("/")
    ? src
    : `/${src}`;

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : optimizedWidth}
      height={optimizedHeight}
      className={className}
      priority={priority}
      fill={fill}
      sizes={defaultSizes}
      quality={quality}
      loading={priority ? "eager" : "lazy"}
    />
  );
}
