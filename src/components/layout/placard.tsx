import type { ReactNode } from "react";

type PlacardProps = {
  code?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export default function Placard({
  code,
  title,
  description,
  children,
}: PlacardProps) {
  return (
    <main className="max-w-shell mx-auto flex min-h-dvh flex-col items-center justify-center px-6 pb-10 text-center md:px-10">
      <div className="relative">
        {code ? (
          <p
            aria-hidden="true"
            data-watermark={code}
            className="v-watermark text-year md:text-year-md text-wash pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
          />
        ) : null}
        <h1 className="text-h1 md:text-h1-md relative">{title}</h1>
      </div>
      <p className="text-body mt-6 max-w-md text-pretty md:mt-10">
        {description}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {children}
      </div>
    </main>
  );
}
