import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type MediaFrameProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function MediaFrame({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
}: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-[var(--hp-cream)]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className={cn(
          "object-cover transition-transform duration-700",
          imageClassName
        )}
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}
