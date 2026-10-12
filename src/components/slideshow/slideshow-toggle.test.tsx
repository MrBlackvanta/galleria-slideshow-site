import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { isSlideshowRunning, startSlideshow } from "./slideshow-session";
import SlideshowToggle from "./slideshow-toggle";

beforeEach(() => {
  sessionStorage.clear();
});

describe("SlideshowToggle", () => {
  it("offers to start on a painting the visitor opened on their own", () => {
    render(<SlideshowToggle />);

    expect(
      screen.getByRole("button", { name: "Start slideshow" }),
    ).toBeVisible();
  });

  it("starts the slideshow from the painting on screen", async () => {
    const user = userEvent.setup();

    render(<SlideshowToggle />);
    await user.click(screen.getByRole("button", { name: "Start slideshow" }));

    expect(isSlideshowRunning()).toBe(true);
    expect(
      screen.getByRole("link", { name: "Stop slideshow" }),
    ).toHaveAttribute("href", "/");
  });

  it("offers to stop while a slideshow is running", () => {
    startSlideshow();

    render(<SlideshowToggle />);

    expect(screen.getByRole("link", { name: "Stop slideshow" })).toBeVisible();
  });

  it("ends the slideshow on the way back to the gallery", async () => {
    const user = userEvent.setup();

    startSlideshow();
    render(<SlideshowToggle />);
    await user.click(screen.getByRole("link", { name: "Stop slideshow" }));

    expect(isSlideshowRunning()).toBe(false);
  });
});
