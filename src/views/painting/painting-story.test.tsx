import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingStory from "./painting-story";

const painting = paintings[0];

describe("PaintingStory", () => {
  it("keeps the year readable while it paints as a watermark", () => {
    const { container } = render(<PaintingStory painting={painting} />);

    expect(
      container.querySelector(`[data-watermark="${painting.year}"]`),
    ).toBeInTheDocument();
    expect(screen.getByText(`Painted in ${painting.year}`)).toBeInTheDocument();
  });

  it("credits the source without handing it the opener", () => {
    render(<PaintingStory painting={painting} />);

    const link = screen.getByRole("link", { name: "Go to source" });

    expect(link).toHaveAttribute("href", painting.source);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByText(painting.description)).toBeInTheDocument();
  });
});
