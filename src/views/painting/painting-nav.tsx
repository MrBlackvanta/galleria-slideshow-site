import { BackIcon, NextIcon } from "@/components/icons";
import { paintings, type Painting } from "@/data";
import Link from "next/link";
import type { ComponentType, CSSProperties, SVGProps } from "react";

type StepProps = {
  painting: Painting | undefined;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

function Step({ painting, label, icon: Icon }: StepProps) {
  const glyph = <Icon className="h-4 w-auto md:h-6" />;

  if (!painting) {
    return (
      <span aria-hidden="true" className="text-ink/15 block p-1">
        {glyph}
      </span>
    );
  }

  return (
    <Link
      href={`/${painting.slug}`}
      className="hover:text-ink/50 block p-1 transition-colors"
    >
      {glyph}
      <span className="sr-only">
        {label} painting: {painting.name}
      </span>
    </Link>
  );
}

export default function PaintingNav({ index }: { index: number }) {
  const { name, artist } = paintings[index];
  const progress = {
    "--progress": `${((index + 1) / paintings.length) * 100}%`,
  } as CSSProperties;

  return (
    <nav
      aria-label="Collection"
      className="before:bg-rule relative before:absolute before:inset-x-0 before:top-0 before:h-px"
    >
      <div
        aria-hidden="true"
        style={progress}
        className="bg-ink absolute top-0 left-0 h-px w-(--progress)"
      />
      <div className="max-w-shell mx-auto flex h-18 items-center justify-between px-6 md:h-24 md:px-10">
        <div>
          <p className="sr-only">
            Painting {index + 1} of {paintings.length}
          </p>
          <p className="text-h3 md:text-h3-md">{name}</p>
          <p className="text-caption md:text-caption-md text-ink/75 mt-2">
            {artist}
          </p>
        </div>
        <div className="-mr-1 flex items-center md:gap-2">
          <Step
            painting={paintings[index - 1]}
            label="Previous"
            icon={BackIcon}
          />
          <Step painting={paintings[index + 1]} label="Next" icon={NextIcon} />
        </div>
      </div>
    </nav>
  );
}
