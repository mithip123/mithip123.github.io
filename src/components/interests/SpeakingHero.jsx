import { useState } from "react";
import GlassCard from "../ui/GlassCard";
import Carousel from "../ui/Carousel";
import { Mic } from "lucide-react";

export default function SpeakingHero({ speaking }) {
  const sp = speaking || {};
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <GlassCard className="p-5 sm:p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-stretch">
        <div className="md:col-span-2 flex items-center justify-center rounded-2xl bg-transparent">
          {sp.image && !imgFailed ? (
            <img
              src={sp.image}
              alt={sp.title || "Public speaking"}
              width="640"
              height="640"
              className="max-h-[320px] w-full max-w-full object-contain"
              loading="lazy"
              decoding="async"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="w-full aspect-square rounded-2xl bg-black/[0.04]" />
          )}
        </div>

        <div className="md:col-span-3 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-black/65" />
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {sp.title || "Public Speaking"}
                </h2>
              </div>
              <p className="mt-2 text-sm text-black/60 leading-relaxed">
                {sp.description ||
                  "Talks, workshops, and panels I’ve enjoyed being a part of. I like breaking down complex ideas into crisp, practical stories."}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <Carousel
              ariaLabel="public speaking videos"
              items={sp.youtube || []}
              renderItem={(v, i) => (
                <div
                  key={v.embedUrl || i}
                  className={[
                    "min-w-[195px] sm:min-w-[240px] lg:min-w-[270px]",
                    "rounded-2xl border border-black/10 bg-white/55 overflow-hidden",
                    "transition hover:-translate-y-[2px] hover:scale-[1.01] hover:bg-white/70",
                  ].join(" ")}
                >
                  <div className="aspect-video bg-black/[0.04]">
                    {v.embedUrl ? (
                      <iframe
                        title={v.title || `Video ${i + 1}`}
                        src={v.embedUrl}
                        className="h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : null}
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-semibold text-black/80 line-clamp-1">
                      {v.title || "YouTube video"}
                    </div>
                    <div className="mt-1 text-xs text-black/50">Embedded from YouTube</div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}