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
});
