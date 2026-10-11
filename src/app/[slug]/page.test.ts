import { paintings } from "@/data";
import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";

describe("painting route", () => {
  it("prerenders one page per painting", () => {
    expect(generateStaticParams()).toEqual(
      paintings.map(({ slug }) => ({ slug })),
    );
  });

  it("gives every painting its own title, excerpt and canonical", async () => {
    const painting = paintings[0];
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: painting.slug }),
    });

    expect(metadata.title).toBe(`${painting.name} by ${painting.artist}`);
    expect(metadata.alternates?.canonical).toBe(`/${painting.slug}`);
    expect(metadata.description).toMatch(/…$/);
    expect(metadata.description!.length).toBeLessThanOrEqual(160);
    expect(painting.description).toContain(
      metadata.description!.replace("…", ""),
    );
  });

  it("describes every painting differently", async () => {
    const descriptions = await Promise.all(
      paintings.map(async ({ slug }) => {
        const { description } = await generateMetadata({
          params: Promise.resolve({ slug }),
        });
        return description;
      }),
    );

    expect(new Set(descriptions).size).toBe(paintings.length);
  });
});
