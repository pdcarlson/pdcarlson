import Image from "next/image";
import type { ProjectImage } from "@/content/types";

// Wide screenshots run the full width of the page. Phone screenshots sit side
// by side at phone width. Either way the image keeps its own shape.
export function Figures({ images, priority }: { images: ProjectImage[]; priority?: boolean }) {
  const phones = images.filter((image) => image.height > image.width);
  const wide = images.filter((image) => image.width >= image.height);

  return (
    <div className="flex flex-col gap-12 lg:gap-16">
      {phones.length > 0 ? (
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-8">
          {phones.map((image) => (
            <Figure key={image.src} image={image} className="w-[280px] max-w-full" />
          ))}
        </div>
      ) : null}

      {wide.map((image) => (
        <Figure key={image.src} image={image} priority={priority} />
      ))}
    </div>
  );
}

function Figure({
  image,
  className,
  priority,
}: {
  image: ProjectImage;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        className="h-auto w-full border border-frame"
      />
      <figcaption className="mt-4 max-w-[660px] text-caption text-fg-50">{image.alt}</figcaption>
    </figure>
  );
}
