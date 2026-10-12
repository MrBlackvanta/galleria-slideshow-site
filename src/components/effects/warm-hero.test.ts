import { HERO_MEDIA } from "@/data";
import { installMatchMedia } from "@/test/media";
import { beforeEach, describe, expect, it, vi } from "vitest";
import warmHero from "./warm-hero";

const hero = {
  small: "/hero-small.webp",
  large: "/hero-large.webp",
  large2x: "/hero-large@2x.webp",
};

let requested: string[] = [];

beforeEach(() => {
  requested = [];

  vi.stubGlobal(
    "Image",
    class {
      set src(value: string) {
        requested.push(value);
      }
    },
  );
});

describe("warmHero", () => {
  it("fetches the narrow crop on a phone", () => {
    warmHero(hero);

    expect(requested).toEqual([hero.small]);
  });

  it("fetches the wide crop once the layout has two columns", () => {
    installMatchMedia([HERO_MEDIA]);
    vi.stubGlobal("devicePixelRatio", 1);

    warmHero(hero);

    expect(requested).toEqual([hero.large]);
  });

  it("fetches the dense crop on a retina display", () => {
    installMatchMedia([HERO_MEDIA]);
    vi.stubGlobal("devicePixelRatio", 2);

    warmHero(hero);

    expect(requested).toEqual([hero.large2x]);
  });
});
