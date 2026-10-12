"use client";

import { useEffect } from "react";
import { endSlideshow } from "./slideshow-session";

export default function SlideshowExit() {
  useEffect(endSlideshow, []);

  return null;
}
