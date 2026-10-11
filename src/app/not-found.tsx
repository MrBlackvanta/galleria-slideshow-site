import { Placard } from "@/components/layout";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "That address does not match any painting in the collection. Return to the gallery to browse all fifteen.",
};

export default function NotFound() {
  return (
    <Placard
      code="404"
      title="Nothing hangs here"
      description="That address doesn’t match any painting in the collection. All fifteen are still on the walls."
    >
      <Link
        href="/"
        className="text-action md:text-action-md text-muted hover:text-ink uppercase underline underline-offset-4 transition-colors"
      >
        Back to the gallery
      </Link>
    </Placard>
  );
}
