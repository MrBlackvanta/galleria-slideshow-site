import type { Painting } from "@/data";
import Link from "next/link";
import type { CSSProperties } from "react";

const ROW_GAP = 40;

type PaintingCardProps = {
  painting: Painting;
  columns: { two: number; three: number; four: number };
  priority: boolean;
};

export default function PaintingCard({
  painting,
  columns,
  priority,
}: PaintingCardProps) {
  const { slug, name, artist, thumbnail } = painting;

  const placement = {
    "--column-two": columns.two,
    "--column-three": columns.three,
    "--column-four": columns.four,
    "--row-span": thumbnail.height + ROW_GAP,
  } as CSSProperties;

  return (
    <li className="v-masonry md:self-start" style={placement}>
      <Link
        href={`/${slug}`}
        className="before:bg-ink/0 hover:before:bg-ink/20 focus-visible:before:bg-ink/20 relative block overflow-hidden before:absolute before:inset-0 before:transition-colors"
      >
        <img
          src={thumbnail.src}
          width={thumbnail.width}
          height={thumbnail.height}
          style={{ height: `${thumbnail.height / 16}rem` }}
          alt=""
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="w-full object-cover"
        />
        <div className="v-caption absolute inset-x-0 bottom-0 flex flex-col justify-end px-8 pb-8">
          <h2 className="text-h2 text-page">{name}</h2>
          <p className="text-caption-md text-page/75 mt-1.5">{artist}</p>
        </div>
      </Link>
    </li>
  );
}
