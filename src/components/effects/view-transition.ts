const COMMIT_BUDGET = 1000;
const PAINT_BUDGET = 400;

let release: (() => void) | null = null;

function available() {
  return (
    "startViewTransition" in document &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function after(wait: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, wait);
  });
}

function heroesDecoded() {
  const images = document.querySelectorAll<HTMLImageElement>(
    "main img:not([loading='lazy'])",
  );

  return Promise.all([...images].map((image) => image.decode().catch(() => {})));
}

function run(navigate: () => void, advancing: boolean) {
  release?.();
  release = null;

  if (!available()) {
    navigate();
    return;
  }

  const root = document.documentElement;

  if (advancing) root.dataset.advancing = "";

  const transition = document.startViewTransition(() => {
    navigate();

    return new Promise<void>((resolve) => {
      release = resolve;
      setTimeout(resolve, COMMIT_BUDGET);
    });
  });

  transition.ready.catch(() => {});
  transition.finished.finally(() => {
    delete root.dataset.advancing;
  });
}

export function transitionTo(navigate: () => void) {
  run(navigate, false);
}

export function advanceTo(navigate: () => void) {
  run(navigate, true);
}

export async function finishTransition() {
  const pending = release;

  if (!pending) return;

  release = null;
  await Promise.race([heroesDecoded(), after(PAINT_BUDGET)]);
  pending();
}
