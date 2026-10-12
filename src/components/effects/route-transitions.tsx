"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { finishTransition, transitionTo } from "./view-transition";

function sameDocumentHref(link: HTMLAnchorElement) {
  if (link.target || link.hasAttribute("download")) return null;

  const destination = new URL(link.href);

  if (destination.origin !== window.location.origin) return null;

  const here = window.location;
  if (
    destination.pathname === here.pathname &&
    destination.search === here.search
  ) {
    return null;
  }

  return `${destination.pathname}${destination.search}`;
}

export default function RouteTransitions() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    finishTransition();
  }, [pathname]);

  useEffect(() => {
    function claim(event: MouseEvent) {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (!(event.target instanceof Element)) return;

      const link = event.target.closest("a");
      if (!link) return;

      const href = sameDocumentHref(link);
      if (!href) return;

      event.preventDefault();
      transitionTo(() => router.push(href));
    }

    document.addEventListener("click", claim, true);

    return () => {
      document.removeEventListener("click", claim, true);
    };
  }, [router]);

  return null;
}
