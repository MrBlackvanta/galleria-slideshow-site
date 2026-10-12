import { act, render, type RenderResult } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SlideshowRunner from "./slideshow-runner";

const { replace } = vi.hoisted(() => ({ replace: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ replace }) }));

const SLIDE_DURATION = 6000;

let standing: RenderResult | null = null;

function arrive(path: string, nextSlug?: string) {
  standing?.unmount();
  window.history.replaceState(null, "", path);
  standing = render(<SlideshowRunner nextSlug={nextSlug} />);
}

function linger(duration = SLIDE_DURATION) {
  act(() => void vi.advanceTimersByTime(duration));
}

beforeEach(() => {
  vi.useFakeTimers();
  sessionStorage.clear();
  standing = null;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("SlideshowRunner", () => {
  it("moves to the next painting six seconds after the gallery hands it over", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");

    linger(SLIDE_DURATION - 1);
    expect(replace).not.toHaveBeenCalled();

    linger(1);
    expect(replace).toHaveBeenCalledWith("/mona-lisa");
  });

  it("takes the hand-over flag back out of the address bar", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");

    expect(window.location.pathname).toBe("/the-swing");
    expect(window.location.search).toBe("");
  });

  it("leaves a painting opened on its own standing still", () => {
    arrive("/the-swing", "mona-lisa");

    linger(SLIDE_DURATION * 3);

    expect(replace).not.toHaveBeenCalled();
  });

  it("keeps running when the visitor steps ahead by hand", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");
    arrive("/mona-lisa", "guernica");

    linger();

    expect(replace).toHaveBeenCalledWith("/guernica");
  });

  it("ends the slideshow at the last painting and does not wrap", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");
    arrive("/mona-lisa");

    linger();
    expect(replace).not.toHaveBeenCalled();

    arrive("/guernica", "the-swing");

    linger();
    expect(replace).not.toHaveBeenCalled();
  });

  it("waits while the full size image is open, then starts the six seconds over", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");

    const lightbox = document.createElement("dialog");
    document.body.append(lightbox);
    lightbox.showModal();

    linger(SLIDE_DURATION * 3);
    expect(replace).not.toHaveBeenCalled();

    lightbox.close();

    linger(SLIDE_DURATION - 500);
    expect(replace).not.toHaveBeenCalled();

    linger(500);
    expect(replace).toHaveBeenCalledWith("/mona-lisa");

    lightbox.remove();
  });

  it("waits while the tab sits in the background, then starts the six seconds over", () => {
    arrive("/the-swing?slideshow=true", "mona-lisa");
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });

    linger(SLIDE_DURATION * 3);
    expect(replace).not.toHaveBeenCalled();

    Reflect.deleteProperty(document, "hidden");

    linger(SLIDE_DURATION - 500);
    expect(replace).not.toHaveBeenCalled();

    linger(500);
    expect(replace).toHaveBeenCalledWith("/mona-lisa");
  });
});
