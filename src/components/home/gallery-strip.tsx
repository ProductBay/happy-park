import { MediaFrame } from "@/components/shared/media-frame";

const gallery = [
  "/images/happy-park/experiences/play.png",
  "/images/happy-park/experiences/celebrate.png",
  "/images/happy-park/experiences/family.png",
  "/images/happy-park/experiences/eat.png",
];

export function GalleryStrip() {
  return (
    <section className="overflow-hidden bg-[var(--hp-ink)] py-5">
      <div className="flex gap-3 overflow-hidden px-3 sm:px-5">
        {gallery.map((src, index) => (
          <MediaFrame
            key={src}
            src={src}
            alt={`Happy-Park experience ${index + 1}`}
            className="h-[260px] min-w-[78vw] rounded-[28px] sm:min-w-[420px] lg:h-[340px] lg:min-w-[520px]"
          />
        ))}
      </div>
    </section>
  );
}


