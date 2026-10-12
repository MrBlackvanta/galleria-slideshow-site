import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SlideshowExit from "./slideshow-exit";
import { isSlideshowRunning, startSlideshow } from "./slideshow-session";

beforeEach(() => {
  sessionStorage.clear();
});

describe("SlideshowExit", () => {
  it("ends a running slideshow once the visitor is back in the gallery", () => {
    startSlideshow();

    render(<SlideshowExit />);

    expect(isSlideshowRunning()).toBe(false);
  });

  it("costs nothing when no slideshow was running", () => {
    render(<SlideshowExit />);

    expect(isSlideshowRunning()).toBe(false);
  });
});
