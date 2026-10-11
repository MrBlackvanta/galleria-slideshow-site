import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound, { metadata } from "./not-found";

describe("NotFound", () => {
  it("names the problem and links back to the gallery", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Nothing hangs here" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to the gallery" }),
    ).toHaveAttribute("href", "/");
  });

  it("renders the 404 watermark as generated content hidden from assistive tech", () => {
    const { container } = render(<NotFound />);

    const watermark = container.querySelector("[data-watermark]");

    expect(watermark).toHaveAttribute("data-watermark", "404");
    expect(watermark).toHaveAttribute("aria-hidden", "true");
    expect(watermark).toBeEmptyDOMElement();
  });

  it("carries its own title and description", () => {
    expect(metadata.title).toBe("Page not found");
    expect(metadata.description).toMatch(/does not match any painting/);
  });
});
