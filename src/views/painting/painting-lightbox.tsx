"use client";

import { ViewImageIcon } from "@/components/icons";
import type { StaticImageData } from "next/image";
import { useRef, useState, type CSSProperties } from "react";

type PaintingLightboxProps = {
  name: string;
  image: StaticImageData;
};

export default function PaintingLightbox({
  name,
  image,
}: PaintingLightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [requested, setRequested] = useState(false);

  return (
    <>
      <button
        type="button"
        onPointerEnter={() => setRequested(true)}
        onFocus={() => setRequested(true)}
        onClick={() => dialog.current?.showModal()}
        className="text-overlay bg-ink/75 text-page hover:bg-ink absolute top-4 left-4 flex h-10 w-38 items-center gap-3.5 pl-4 uppercase transition-colors focus-visible:-outline-offset-2 md:top-auto md:bottom-4"
      >
        <ViewImageIcon />
        View image
      </button>
      <dialog
        ref={dialog}
        aria-label={name}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("img")) {
            return;
          }
          dialog.current?.close();
        }}
        className="v-lightbox text-page backdrop:bg-ink/85 h-dvh max-h-none w-full max-w-none overflow-auto overscroll-contain bg-transparent p-6 open:flex open:items-center open:justify-center"
      >
        <div className="flex flex-col items-end">
          <button
            type="button"
            className="text-close hover:text-page/50 -my-1 py-1 uppercase transition-colors"
          >
            Close
          </button>
          <img
            src={image.src}
            width={image.width}
            height={image.height}
            alt={`${name}, full size`}
            loading={requested ? "eager" : "lazy"}
            style={{ "--ratio": image.width / image.height } as CSSProperties}
            className="mt-8 max-w-[min(100%,calc((100dvh-7.5rem)*var(--ratio)))] md:mt-10"
          />
        </div>
      </dialog>
    </>
  );
}
