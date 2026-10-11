import { SiteHeader } from "@/components/layout";
import { openGraphBase, paintings } from "@/data";
import {
  PaintingFigure,
  PaintingNav,
  PaintingPlaque,
  PaintingStory,
} from "@/views/painting";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

type PaintingPageProps = { params: Promise<{ slug: string }> };

function excerpt(text: string, limit = 155) {
  if (text.length <= limit) return text;
  return `${text.slice(0, text.lastIndexOf(" ", limit))}…`;
}

export function generateStaticParams() {
  return paintings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PaintingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const painting = paintings.find((entry) => entry.slug === slug);

  if (!painting) return {};

  const title = `${painting.name} by ${painting.artist}`;
  const description = excerpt(painting.description);

  return {
    title,
    description,
    alternates: { canonical: `/${slug}` },
    openGraph: { ...openGraphBase, title, description, url: `/${slug}` },
  };
}

export default async function PaintingPage({ params }: PaintingPageProps) {
  const { slug } = await params;
  const index = paintings.findIndex((entry) => entry.slug === slug);

  if (index < 0) notFound();

  const painting = paintings[index];

  return (
    <>
      <SiteHeader>
        <Link
          href="/"
          className="text-action md:text-action-md text-muted hover:text-ink uppercase transition-colors"
        >
          Stop slideshow
        </Link>
      </SiteHeader>
      <main className="max-w-shell wide:pt-25 mx-auto w-full grow px-6 pt-6 pb-16 md:px-10 md:pt-10 md:pb-14">
        <article className="wide:max-w-none wide:gap-x-102.5 wide:pb-16 relative md:mx-auto md:grid md:max-w-214 md:grid-cols-[475px_1fr] md:gap-y-16">
          <PaintingFigure painting={painting} />
          <PaintingPlaque painting={painting} />
          <PaintingStory painting={painting} />
        </article>
      </main>
      <PaintingNav index={index} />
    </>
  );
}
