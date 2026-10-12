import type { Painting } from "@/data";
import PaintingLightbox from "./painting-lightbox";

export default function PaintingFigure({ painting }: { painting: Painting }) {
  const { name, heroSmall, heroLarge, heroLarge2x, gallery } = painting;

  return (
    <figure className="relative self-start">
      <picture>
        <source
          media="(min-width: 48rem)"
          srcSet={`${heroLarge.src} 1x, ${heroLarge2x.src} 2x`}
          width={heroLarge.width}
          height={heroLarge.height}
        />
        <img
          src={heroSmall.src}
          width={heroSmall.width}
          height={heroSmall.height}
          alt={name}
          fetchPriority="high"
          className="block w-full"
        />
      </picture>
      <PaintingLightbox name={name} image={gallery} />
    </figure>
  );
}
