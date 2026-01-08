import { FileText, Images } from "lucide-react";
import GlassCard from "../ui/GlassCard";

function HoverSurface({ className = "", children }) {
  return (
    <div
      className={["transition-transform hover:-translate-y-[1px]", className].join(" ")}
    >
      {children}
    </div>
  );
}

export default function PortfolioCard({ item, onOpen }) {
  const coverSrc =
    item.id === "site"
      ? "/portfolio-images/glassmorphism.jpg"
      : item.id === "jove"
      ? "/portfolio-images/jove-cover.png"
      : "/portfolio-images/inito-cover.png";

  return (
    <HoverSurface className="h-full">
      <GlassCard className="h-full overflow-hidden">
        {/* Cover */}
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_0%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(900px_420px_at_80%_0%,rgba(16,185,129,0.12),transparent_55%)]" />
          <div className="relative p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/60">
                {item.type === "pdf" ? (
                  <FileText className="h-3.5 w-3.5" />
                ) : (
                  <Images className="h-3.5 w-3.5" />
                )}
                {item.badge}
              </div>
            </div>

            <div className="mt-3 rounded-3xl border border-black/10 bg-white/55 overflow-hidden">
              <div className="aspect-[16/10] bg-white">
                <img
                  src={coverSrc}
                  alt={`${item.title} cover`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/portfolio-images/glassmorphism.jpg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-lg font-semibold text-black/85">{item.title}</div>
          <div className="mt-2 text-sm text-black/60 leading-relaxed">
            {item.summary}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-black/65">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/25 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => onOpen(item)}
              className={[
                "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2",
                "bg-black text-white text-sm font-semibold",
                "hover:bg-black/90 hover:shadow-[0_16px_45px_-26px_rgba(0,0,0,0.45)]",
                "transition",
                "w-full",
              ].join(" ")}
            >
              {item.type === "pdf" ? (
                <>
                  <FileText className="h-4 w-4" /> {item.pdfCta || "Open PDF"}
                </>
              ) : (
                <>
                  <Images className="h-4 w-4" /> Open gallery
                </>
              )}
            </button>
          </div>
        </div>
      </GlassCard>
    </HoverSurface>
  );
}