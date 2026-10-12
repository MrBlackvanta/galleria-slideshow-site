import { BELOW_HERO_MEDIA, HERO_MEDIA, type Painting } from "@/data";
import PaintingLightbox from "./painting-lightbox";

export default function PaintingFigure({ painting }: { painting: Painting }) {
  const { name, heroSmall, heroLarge, heroLarge2x, gallery } = painting;
  const wideSrcSet = `${heroLarge.src} 1x, ${heroLarge2x.src} 2x`;

  return (
    <figure className="relative self-start">
      <link
        rel="preload"
        as="image"
        href={heroSmall.src}
        media={BELOW_HERO_MEDIA}
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={heroLarge.src}
        imageSrcSet={wideSrcSet}
        media={HERO_MEDIA}
        fetchPriority="high"
      />
      <picture>
        <source
          media={HERO_MEDIA}
          srcSet={wideSrcSet}
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
