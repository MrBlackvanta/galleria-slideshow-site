"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  endSlideshow,
  isSlideshowRunning,
  startSlideshow,
} from "./slideshow-session";

const SLIDE_DURATION = 6000;
const HEARTBEAT = 250;

export default function SlideshowRunner({ nextSlug }: { nextSlug?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("slideshow")) {
      startSlideshow();
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (!isSlideshowRunning()) return;

    if (!nextSlug) {
      endSlideshow();
      return;
    }

    let deadline = Date.now() + SLIDE_DURATION;

    const timer = setInterval(() => {
      if (document.hidden || document.querySelector("dialog[open]")) {
        deadline = Date.now() + SLIDE_DURATION;
        return;
      }

      if (Date.now() >= deadline) router.replace(`/${nextSlug}`);
    }, HEARTBEAT);

    return () => clearInterval(timer);
  }, [nextSlug, router]);

  return null;
}
