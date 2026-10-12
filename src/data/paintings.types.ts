import type { StaticImageData } from "next/image";

export type Painting = {
  slug: string;
  name: string;
  artist: string;
  year: number;
  description: string;
  source: string;
  thumbnail: StaticImageData;
  heroSmall: StaticImageData;
  heroLarge: StaticImageData;
  heroLarge2x: StaticImageData;
  gallery: StaticImageData;
  portrait: StaticImageData;
};
