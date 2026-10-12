const KEY = "galleria.slideshow";

export function startSlideshow() {
  sessionStorage.setItem(KEY, "running");
}

export function endSlideshow() {
  sessionStorage.removeItem(KEY);
}

export function isSlideshowRunning() {
  return sessionStorage.getItem(KEY) !== null;
}
