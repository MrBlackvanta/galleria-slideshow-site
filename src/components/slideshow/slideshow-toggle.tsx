"use client";

import Link from "next/link";
import {
  endSlideshow,
  startSlideshow,
  useSlideshowRunning,
} from "./slideshow-session";

const cta =
  "text-action md:text-action-md text-muted hover:text-ink uppercase transition-colors";

export default function SlideshowToggle() {
  const running = useSlideshowRunning();

  if (!running) {
    return (
      <button type="button" onClick={startSlideshow} className={cta}>
        Start slideshow
      </button>
    );
  }

  return (
    <Link href="/" onClick={endSlideshow} className={cta}>
      Stop slideshow
    </Link>
  );
}
