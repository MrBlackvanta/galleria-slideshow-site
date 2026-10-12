import { HERO_MEDIA, type HeroSources } from "@/data";

export default function warmHero({ small, large, large2x }: HeroSources) {
  const wide = window.matchMedia(HERO_MEDIA).matches;
  const warming = new Image();

  warming.src = wide
    ? window.devicePixelRatio > 1
      ? large2x
      : large
    : small;
}
