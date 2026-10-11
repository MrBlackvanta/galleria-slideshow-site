import { SiteHeader } from "@/components/layout";
import { paintings } from "@/data";
import { PaintingGrid } from "@/views/home";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <SiteHeader>
        <Link
          href={`/${paintings[0].slug}?slideshow=true`}
          className="text-action md:text-action-md text-muted hover:text-ink uppercase transition-colors"
        >
          Start slideshow
        </Link>
      </SiteHeader>
      <main className="max-w-shell mx-auto w-full grow px-6 pt-6 pb-12 md:px-10 md:pt-10 md:pb-16">
        <h1 className="sr-only">galleria</h1>
        <PaintingGrid />
      </main>
    </>
  );
}
