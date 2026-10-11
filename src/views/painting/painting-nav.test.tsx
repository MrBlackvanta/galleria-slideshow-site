import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingNav from "./painting-nav";

const last = paintings.length - 1;

describe("PaintingNav", () => {
  it("names the painting the visitor is standing in front of", () => {
    render(<PaintingNav index={3} />);

    expect(screen.getByText(paintings[3].name)).toBeInTheDocument();
    expect(screen.getByText(paintings[3].artist)).toBeInTheDocument();
    expect(screen.getByText("Painting 4 of 15")).toBeInTheDocument();
  });

  it("walks the collection in both directions", () => {
    render(<PaintingNav index={3} />);

    expect(
      screen.getByRole("link", { name: /^Previous painting/ }),
    ).toHaveAttribute("href", `/${paintings[2].slug}`);
    expect(
      screen.getByRole("link", { name: /^Next painting/ }),
    ).toHaveAttribute("href", `/${paintings[4].slug}`);
  });

  it("offers no link past either end of the collection", () => {
    const { unmount } = render(<PaintingNav index={0} />);

    expect(screen.queryByRole("link", { name: /^Previous/ })).toBeNull();
    expect(screen.getByRole("link", { name: /^Next/ })).toBeInTheDocument();

    unmount();
    render(<PaintingNav index={last} />);

    expect(screen.getByRole("link", { name: /^Previous/ })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^Next/ })).toBeNull();
  });

  it("fills the progress rule by position in the collection", () => {
    render(<PaintingNav index={last} />);

    const nav = screen.getByRole("navigation", { name: "Collection" });

    expect(nav.querySelector("[aria-hidden]")).toHaveStyle({
      "--progress": "100%",
    });
  });
});
