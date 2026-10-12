import type { Painting } from "./paintings.types";

export const HERO_MEDIA = "(min-width: 48rem)";
export const BELOW_HERO_MEDIA = `not all and ${HERO_MEDIA}`;

export type HeroSources = {
  small: string;
  large: string;
  large2x: string;
};

export function heroSources({
  heroSmall,
  heroLarge,
  heroLarge2x,
}: Painting): HeroSources {
  return {
    small: heroSmall.src,
    large: heroLarge.src,
    large2x: heroLarge2x.src,
  };
}
