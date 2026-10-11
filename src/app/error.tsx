"use client";

import { Placard } from "@/components/layout";
import Link from "next/link";

const ACTION =
  "text-action md:text-action-md text-muted hover:text-ink uppercase underline underline-offset-4 transition-colors";

export default function GalleryError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Placard
      title="This wing is closed"
      description="Something went wrong while the gallery was loading. Try again, or start over from the collection."
    >
      <button type="button" onClick={reset} className={ACTION}>
        Try again
      </button>
      <Link href="/" className={ACTION}>
        Back to the gallery
      </Link>
    </Placard>
  );
}
