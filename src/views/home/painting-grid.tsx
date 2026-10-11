import { paintings } from "@/data";
import PaintingCard from "./painting-card";

const TWO_COLUMN = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2];
const THREE_COLUMN = [1, 2, 3, 1, 2, 3, 1, 2, 3, 2, 2, 3, 1, 3, 1];
const FOUR_COLUMN = [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 4, 1, 2, 3, 4];

export default function PaintingGrid() {
  return (
    <ul className="flex flex-col gap-y-6 md:-mb-10 md:grid md:grid-flow-row-dense md:auto-rows-[1px] md:grid-cols-2 md:gap-x-10 md:gap-y-0 lg:grid-cols-3 xl:grid-cols-4">
      {paintings.map((painting, index) => (
        <PaintingCard
          key={painting.slug}
          painting={painting}
          columns={{
            two: TWO_COLUMN[index],
            three: THREE_COLUMN[index],
            four: FOUR_COLUMN[index],
          }}
          priority={index < 4}
        />
      ))}
    </ul>
  );
}
