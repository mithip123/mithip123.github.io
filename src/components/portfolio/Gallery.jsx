import { useState } from "react";

export default function Gallery({ images, initialIndex = 0 }) {
  const [idx, setIdx] = useState(initialIndex);
  const current = images[idx];

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-black/10 bg-white/55 overflow-hidden">
        <div className="relative aspect-[16/9] bg-white">
          <img
            src={current.src}
            alt={current.alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        {(current.caption || current.note) && (
          <div className="px-4 py-3 border-t border-black/10">
            {current.caption && (
              <div className="text-sm font-semibold text-black/80">
                {current.caption}
              </div>
            )}
            {current.note && (
              <div className="mt-1 text-sm text-black/60 leading-relaxed">
                {current.note}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((im, i) => (
          <button
            key={im.src}
            type="button"
            onClick={() => setIdx(i)}
            className={[
              "shrink-0 rounded-2xl border bg-white/55 overflow-hidden",
              "hover:bg-white/80 transition",
              i === idx ? "border-black/30" : "border-black/10",
            ].join(" ")}
            aria-label={`Open ${im.alt}`}
            title={im.caption || im.alt}
          >
            <div className="h-16 w-28 sm:h-20 sm:w-36">
              <img
                src={im.src}
                alt={im.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}