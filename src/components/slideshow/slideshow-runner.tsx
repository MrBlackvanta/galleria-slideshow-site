"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  endSlideshow,
  startSlideshow,
  useSlideshowRunning,
} from "./slideshow-session";

const SLIDE_DURATION = 6000;
const HEARTBEAT = 250;

export default function SlideshowRunner({ nextSlug }: { nextSlug?: string }) {
  const router = useRouter();
  const running = useSlideshowRunning();

  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("slideshow")) return;

    startSlideshow();
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    if (!running) return;

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
  }, [running, nextSlug, router]);

  return null;
}
