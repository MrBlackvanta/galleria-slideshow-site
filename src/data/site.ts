import type { Metadata } from "next";

export const SITE_URL =
  "https://galleria-slideshow-site.abdelrhman-ahmed8881.workers.dev";

export const SITE_NAME = "galleria";

export const SITE_TITLE = `${SITE_NAME} | Fifteen masterpieces, one slideshow`;

export const SITE_DESCRIPTION =
  "Browse fifteen paintings from Van Gogh to Vermeer, read the story behind each one, and view every canvas full-screen in the slideshow.";

export const openGraphBase = {
  siteName: SITE_NAME,
  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "The galleria wordmark beside a grid of painting thumbnails.",
    },
  ],
} satisfies Metadata["openGraph"];
