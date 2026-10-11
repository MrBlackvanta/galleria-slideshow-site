import type { Painting } from "@/data";

export default function PaintingPlaque({ painting }: { painting: Painting }) {
  const { name, artist, portrait } = painting;

  return (
    <div className="wide:left-118.75 wide:right-auto wide:h-140 wide:w-111 relative mt-13.5 md:absolute md:inset-x-0 md:top-0 md:z-10 md:mt-0 md:flex md:flex-col">
      <div className="bg-page wide:self-start wide:-ml-16 absolute bottom-full left-0 w-70 max-w-full p-6 md:static md:w-111 md:self-end md:p-0 md:pb-16 md:pl-16">
        <h1 className="text-h1 md:text-h1-md">{name}</h1>
        <p className="text-byline text-muted mt-2 md:mt-6">{artist}</p>
      </div>
      <img
        src={portrait.src}
        width={portrait.width}
        height={portrait.height}
        alt={`Portrait of ${artist}`}
        loading="lazy"
        className="wide:absolute wide:-bottom-16 wide:left-0 wide:ml-7.5 ml-4 size-16 md:ml-126.25 md:size-32 md:self-start"
      />
    </div>
  );
}
