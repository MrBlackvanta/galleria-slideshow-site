import { installMatchMedia } from "@/test/media";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";

type Flight = {
  committed: boolean;
  finish: () => void;
};

let transitions: typeof import("./view-transition");
let flights: Flight[] = [];
let navigate: Mock<() => void>;

function stubViewTransitions() {
  flights = [];

  document.startViewTransition = ((update: () => Promise<void>) => {
    const flight: Flight = { committed: false, finish: () => {} };
    const done = update();

    done.then(() => {
      flight.committed = true;
    });
    flights.push(flight);

    return {
      ready: Promise.resolve(),
      updateCallbackDone: done,
      finished: new Promise<void>((resolve) => {
        flight.finish = () => resolve();
      }),
      skipTransition() {},
    };
  }) as typeof document.startViewTransition;
}

beforeEach(async () => {
  vi.resetModules();
  navigate = vi.fn<() => void>();
  transitions = await import("./view-transition");
});

afterEach(() => {
  Reflect.deleteProperty(document, "startViewTransition");
  Reflect.deleteProperty(document.documentElement.dataset, "advancing");
});

describe("transitionTo", () => {
  it("navigates on the spot where the browser cannot cross-fade", () => {
    transitions.transitionTo(navigate);

    expect(navigate).toHaveBeenCalledOnce();
  });

  it("navigates on the spot for a visitor who asked for less motion", () => {
    stubViewTransitions();
    installMatchMedia(["(prefers-reduced-motion: reduce)"]);

    transitions.transitionTo(navigate);

    expect(navigate).toHaveBeenCalledOnce();
    expect(flights).toHaveLength(0);
  });

  it("holds the outgoing frame until the arriving page says it is painted", async () => {
    stubViewTransitions();

    transitions.transitionTo(navigate);
    await Promise.resolve();

    expect(navigate).toHaveBeenCalledOnce();
    expect(flights[0].committed).toBe(false);

    await transitions.finishTransition();
    await Promise.resolve();

    expect(flights[0].committed).toBe(true);
  });

  it("lets the frame go when the navigation never arrives", async () => {
    vi.useFakeTimers();
    stubViewTransitions();

    transitions.transitionTo(navigate);
    await vi.advanceTimersByTimeAsync(1000);

    expect(flights[0].committed).toBe(true);

    vi.useRealTimers();
  });

  it("releases a stranded frame when a second navigation starts", async () => {
    stubViewTransitions();

    transitions.transitionTo(navigate);
    transitions.transitionTo(navigate);
    await Promise.resolve();

    expect(flights[0].committed).toBe(true);
    expect(flights[1].committed).toBe(false);
  });
});

describe("advanceTo", () => {
  it("marks the document so the slideshow dissolves more slowly", async () => {
    stubViewTransitions();

    transitions.advanceTo(navigate);
    expect(document.documentElement.dataset.advancing).toBe("");

    flights[0].finish();
    await Promise.resolve();
    await Promise.resolve();

    expect(document.documentElement.dataset.advancing).toBeUndefined();
  });

  it("leaves the document unmarked when a visitor clicks through", () => {
    stubViewTransitions();

    transitions.transitionTo(navigate);

    expect(document.documentElement.dataset.advancing).toBeUndefined();
  });
});
