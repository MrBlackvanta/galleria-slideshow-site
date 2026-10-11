import type { Painting } from "@/data";

export default function PaintingStory({ painting }: { painting: Painting }) {
  const { year, description, source } = painting;

  return (
    <div className="wide:col-span-1 wide:pt-29 relative -mt-5 pt-18.5 md:col-span-2 md:mt-0">
      <p
        data-watermark={year}
        className="v-watermark text-year md:text-year-md text-wash wide:right-0 wide:left-auto wide:w-auto pointer-events-none absolute top-0 left-0 w-full text-right select-none md:w-119"
      >
        <span className="sr-only">Painted in {year}</span>
      </p>
      <div className="wide:mx-0 wide:max-w-87.5 md:mx-auto md:max-w-114">
        <p className="text-body text-muted">{description}</p>
        <a
          href={source}
          target="_blank"
          rel="noopener noreferrer"
          className="text-action text-muted hover:text-ink wide:absolute wide:top-140 wide:left-0 wide:mt-0 mt-10 inline-block uppercase transition-colors"
        >
          Go to source
        </a>
      </div>
    </div>
  );
}
