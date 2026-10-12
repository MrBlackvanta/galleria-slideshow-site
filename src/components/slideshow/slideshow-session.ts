import { useSyncExternalStore } from "react";

const KEY = "galleria.slideshow";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  for (const listener of listeners) listener();
}

function serverSnapshot() {
  return false;
}

export function isSlideshowRunning() {
  return sessionStorage.getItem(KEY) !== null;
}

export function useSlideshowRunning() {
  return useSyncExternalStore(subscribe, isSlideshowRunning, serverSnapshot);
}

export function startSlideshow() {
  if (isSlideshowRunning()) return;

  sessionStorage.setItem(KEY, "running");
  notify();
}

export function endSlideshow() {
  if (!isSlideshowRunning()) return;

  sessionStorage.removeItem(KEY);
  notify();
}
