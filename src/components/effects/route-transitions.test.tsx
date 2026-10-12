import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RouteTransitions from "./route-transitions";

const { finishTransition, push, transitionTo } = vi.hoisted(() => ({
  finishTransition: vi.fn(),
  push: vi.fn(),
  transitionTo: vi.fn((navigate: () => void) => navigate()),
}));

let pathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => ({ push }),
}));

vi.mock("./view-transition", () => ({ finishTransition, transitionTo }));

function Gallery() {
  return (
    <>
      <RouteTransitions />
      <a href="/mona-lisa" onClick={(event) => event.preventDefault()}>
        Mona Lisa
      </a>
      <a
        href="/the-swing?slideshow=true"
        onClick={(event) => event.preventDefault()}
      >
        Start slideshow
      </a>
      <a href="/" onClick={(event) => event.preventDefault()}>
        Home
      </a>
      <a
        href="https://en.wikipedia.org/"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.preventDefault()}
      >
        Go to source
      </a>
    </>
  );
}

function click(name: string, options: MouseEventInit = {}) {
  screen.getByRole("link", { name }).dispatchEvent(
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      button: 0,
      ...options,
    }),
  );
}

beforeEach(() => {
  pathname = "/";
  window.history.replaceState(null, "", "/");
});

describe("RouteTransitions", () => {
  it("takes a click on a painting away from the browser", () => {
    render(<Gallery />);

    click("Mona Lisa");

    expect(transitionTo).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith("/mona-lisa");
  });

  it("carries the slideshow hand-over flag across", () => {
    render(<Gallery />);

    click("Start slideshow");

    expect(push).toHaveBeenCalledWith("/the-swing?slideshow=true");
  });

  it("leaves an outbound link to the browser", () => {
    render(<Gallery />);

    click("Go to source");

    expect(transitionTo).not.toHaveBeenCalled();
  });

  it("leaves a click that opens a new tab alone", () => {
    render(<Gallery />);

    click("Mona Lisa", { ctrlKey: true });
    click("Mona Lisa", { metaKey: true });
    click("Mona Lisa", { shiftKey: true });
    click("Mona Lisa", { button: 1 });

    expect(transitionTo).not.toHaveBeenCalled();
  });

  it("leaves a link back to the page we are already on alone", () => {
    render(<Gallery />);

    click("Home");

    expect(transitionTo).not.toHaveBeenCalled();
  });

  it("releases the held frame once the next painting has rendered", () => {
    const view = render(<Gallery />);
    finishTransition.mockClear();

    pathname = "/mona-lisa";
    view.rerender(<Gallery />);

    expect(finishTransition).toHaveBeenCalledOnce();
  });
});
