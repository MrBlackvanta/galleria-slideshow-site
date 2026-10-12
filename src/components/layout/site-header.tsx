import { Wordmark } from "@/components/icons";
import Link from "next/link";
import type { ReactNode } from "react";

export default function SiteHeader({ children }: { children: ReactNode }) {
  return (
    <header className="max-w-shell after:bg-rule relative mx-auto flex w-full items-center justify-between px-6 py-6 after:absolute after:inset-x-0 after:bottom-0 after:h-px md:px-10 md:py-7 lg:py-10 lg:after:inset-x-10">
      <Link href="/" className="hover:text-ink/50 transition-colors">
        <Wordmark className="h-8 w-auto lg:h-12" />
        <span className="sr-only">galleria home</span>
      </Link>
      {children}
    </header>
  );
}
