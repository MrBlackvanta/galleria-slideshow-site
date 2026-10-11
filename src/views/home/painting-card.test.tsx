import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingCard from "./painting-card";

const painting = paintings[0];
const columns = { two: 1, three: 2, four: 3 };

function renderCard() {
  render(
    <ul>
      <PaintingCard painting={painting} columns={columns} priority={false} />
    </ul>,
  );
}

describe("PaintingCard", () => {
  it("names the link by the painting and its artist", () => {
    renderCard();

    const link = screen.getByRole("link", {
      name: `${painting.name} ${painting.artist}`,
    });

    expect(link).toHaveAttribute("href", `/${painting.slug}`);
    expect(
      screen.getByRole("heading", { level: 2, name: painting.name }),
    ).toBeInTheDocument();
  });

  it("leaves the thumbnail out of the accessibility tree", () => {
    renderCard();

    const image = screen.getByRole("listitem").querySelector("img");

    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).toHaveAttribute("width", String(painting.thumbnail.width));
    expect(image).toHaveAttribute("height", String(painting.thumbnail.height));
  });

  it("reserves the thumbnail's own height plus the row gap", () => {
    renderCard();

    const item = screen.getByRole("listitem");

    expect(item.style.getPropertyValue("--row-span")).toBe(
      String(painting.thumbnail.height + 40),
    );
    expect(item.style.getPropertyValue("--column-two")).toBe("1");
    expect(item.style.getPropertyValue("--column-three")).toBe("2");
    expect(item.style.getPropertyValue("--column-four")).toBe("3");
  });
});
