import type { Painting } from "@/data";

export default function PaintingFigure({ painting }: { painting: Painting }) {
  const { name, heroSmall, heroLarge } = painting;

  return (
    <figure>
      <picture>
        <source
          media="(min-width: 48rem)"
          srcSet={heroLarge.src}
          width={heroLarge.width}
          height={heroLarge.height}
        />
        <img
          src={heroSmall.src}
          width={heroSmall.width}
          height={heroSmall.height}
          alt={name}
          fetchPriority="high"
          className="w-full"
        />
      </picture>
    </figure>
  );
}
