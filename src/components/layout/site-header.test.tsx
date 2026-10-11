import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SiteHeader from "./site-header";

describe("SiteHeader", () => {
  it("takes the visitor home from the wordmark", () => {
    render(
      <SiteHeader>
        <a href="/starry-night">Start slideshow</a>
      </SiteHeader>,
    );

    expect(screen.getByRole("link", { name: "galleria home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders whatever the route puts beside the wordmark", () => {
    render(
      <SiteHeader>
        <a href="/starry-night">Start slideshow</a>
      </SiteHeader>,
    );

    expect(
      screen.getByRole("link", { name: "Start slideshow" }),
    ).toHaveAttribute("href", "/starry-night");
  });
});
