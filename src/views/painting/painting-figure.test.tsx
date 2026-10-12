import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingFigure from "./painting-figure";

const painting = paintings[0];

describe("PaintingFigure", () => {
  it("art-directs the hero and offers both densities", () => {
    const { container } = render(<PaintingFigure painting={painting} />);

    const source = container.querySelector("source");

    expect(source).toHaveAttribute("media", "(min-width: 48rem)");
    expect(source).toHaveAttribute(
      "srcset",
      `${painting.heroLarge.src} 1x, ${painting.heroLarge2x.src} 2x`,
    );
    expect(source).toHaveAttribute("width", String(painting.heroLarge.width));
    expect(source).toHaveAttribute("height", String(painting.heroLarge.height));
  });

  it("falls back to the small crop and claims the LCP priority", () => {
    render(<PaintingFigure painting={painting} />);

    const image = screen.getByRole("img", { name: painting.name });

    expect(image).toHaveAttribute("src", painting.heroSmall.src);
    expect(image).toHaveAttribute("width", String(painting.heroSmall.width));
    expect(image).toHaveAttribute("height", String(painting.heroSmall.height));
    expect(image).toHaveAttribute("fetchpriority", "high");
  });

  it("preloads the crop the viewport will actually use", () => {
    render(<PaintingFigure painting={painting} />);

    const narrow = document.head.querySelector(
      `link[rel="preload"][media="not all and (min-width: 48rem)"]`,
    );
    const wide = document.head.querySelector(
      `link[rel="preload"][media="(min-width: 48rem)"]`,
    );

    expect(narrow).toHaveAttribute("href", painting.heroSmall.src);
    expect(narrow).toHaveAttribute("as", "image");
    expect(narrow).toHaveAttribute("fetchpriority", "high");
    expect(wide).toHaveAttribute(
      "imagesrcset",
      `${painting.heroLarge.src} 1x, ${painting.heroLarge2x.src} 2x`,
    );
  });

  it("preloads exactly what the source element resolves to", () => {
    const { container } = render(<PaintingFigure painting={painting} />);

    const source = container.querySelector("source");
    const wide = document.head.querySelector(
      `link[rel="preload"][as="image"][imagesrcset]`,
    );

    expect(wide?.getAttribute("imagesrcset")).toBe(
      source?.getAttribute("srcset"),
    );
    expect(wide?.getAttribute("media")).toBe(source?.getAttribute("media"));
  });
});
