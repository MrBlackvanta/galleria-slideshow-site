import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingPlaque from "./painting-plaque";

const painting = paintings[0];

describe("PaintingPlaque", () => {
  it("makes the painting's name the page heading", () => {
    render(<PaintingPlaque painting={painting} />);

    expect(
      screen.getByRole("heading", { level: 1, name: painting.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(painting.artist)).toBeInTheDocument();
  });

  it("names the artist portrait and lets it load late", () => {
    render(<PaintingPlaque painting={painting} />);

    const portrait = screen.getByRole("img", {
      name: `Portrait of ${painting.artist}`,
    });

    expect(portrait).toHaveAttribute("src", painting.portrait.src);
    expect(portrait).toHaveAttribute("loading", "lazy");
    expect(portrait).toHaveAttribute("width", String(painting.portrait.width));
  });
});
