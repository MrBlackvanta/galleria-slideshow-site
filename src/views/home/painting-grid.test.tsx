import { paintings } from "@/data";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PaintingGrid from "./painting-grid";

const ROW_GAP = 40;

function columnTotals(property: string) {
  const totals = new Map<string, number>();

  screen.getAllByRole("listitem").forEach((item) => {
    const column = item.style.getPropertyValue(property);
    const span = Number(item.style.getPropertyValue("--row-span"));
    totals.set(column, (totals.get(column) ?? 0) + span);
  });

  return totals;
}

describe("PaintingGrid", () => {
  it("lists every painting in collection order", () => {
    render(<PaintingGrid />);

    const links = screen.getAllByRole("link");

    expect(links.map((link) => link.getAttribute("href"))).toEqual(
      paintings.map((painting) => `/${painting.slug}`),
    );
  });

  it("balances the two- and four-column grids to a flush bottom edge", () => {
    render(<PaintingGrid />);

    [
      ["--column-two", 2],
      ["--column-four", 4],
    ].forEach(([property, count]) => {
      const totals = columnTotals(property as string);

      expect(totals.size).toBe(count);
      expect(new Set(totals.values()).size).toBe(1);
    });
  });

  it("keeps the three-column grid inside a two-gap stagger", () => {
    render(<PaintingGrid />);

    const totals = [...columnTotals("--column-three").values()];

    expect(totals).toHaveLength(3);
    expect(Math.max(...totals) - Math.min(...totals)).toBeLessThanOrEqual(
      ROW_GAP * 3,
    );
  });

  it("eager-loads only the paintings that open the four-column grid", () => {
    render(<PaintingGrid />);

    const eager = screen
      .getAllByRole("listitem")
      .map((item) => item.querySelector("img")?.getAttribute("loading"))
      .filter((loading) => loading === "eager");

    expect(eager).toHaveLength(4);
  });
});
