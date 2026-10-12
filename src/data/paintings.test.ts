import { describe, expect, it } from "vitest";
import { findPainting, paintings } from "./paintings";

describe("paintings", () => {
  it("holds the whole collection with unique kebab-case slugs", () => {
    const slugs = paintings.map((painting) => painting.slug);

    expect(paintings).toHaveLength(15);
    expect(new Set(slugs).size).toBe(15);
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z]+(-[a-z]+)*$/));
  });

  it("carries six images and a source for every painting", () => {
    paintings.forEach((painting) => {
      expect(painting.source).toMatch(/^https:\/\/en\.wikipedia\.org\//);
      [
        painting.thumbnail,
        painting.heroSmall,
        painting.heroLarge,
        painting.heroLarge2x,
        painting.gallery,
        painting.portrait,
      ].forEach((image) => {
        expect(image.src).toContain(".webp");
        expect(image.width).toBeGreaterThan(1);
      });
    });
  });

  it("pairs every desktop hero with a true 2x twin", () => {
    paintings.forEach(({ heroLarge, heroLarge2x }) => {
      expect(heroLarge2x.width).toBe(heroLarge.width * 2);
      expect(heroLarge2x.height).toBe(heroLarge.height * 2);
    });
  });

  it("ships thumbnails at one common width so the grid can vary only height", () => {
    const widths = new Set(
      paintings.map((painting) => painting.thumbnail.width),
    );

    expect([...widths]).toEqual([327]);
  });

  it("spells each artist the same way on every card", () => {
    const spellings = new Map<string, Set<string>>();

    paintings.forEach(({ artist }) => {
      const key = artist.toLowerCase();
      spellings.set(key, (spellings.get(key) ?? new Set()).add(artist));
    });

    spellings.forEach((variants) => expect([...variants]).toHaveLength(1));
  });

  it("finds a painting by slug and nothing by a stray one", () => {
    expect(findPainting("mona-lisa")?.name).toBe("Mona Lisa");
    expect(findPainting("not-a-painting")).toBeUndefined();
  });
});
