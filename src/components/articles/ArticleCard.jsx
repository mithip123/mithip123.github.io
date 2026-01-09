import { ExternalLink, Heart } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import ImgWithFallback from "../ui/ImgWithFallback";

export default function ArticleCard({ article }) {
    const a = article || {};
    const href = a.url || "#";

    return (
        <a
            href={href}
            target={a.url ? "_blank" : undefined}
            rel={a.url ? "noreferrer" : undefined}
            className="block h-full group"
        >
            <GlassCard className="h-full overflow-hidden transition duration-200 ease-out hover:bg-white/55 hover:-translate-y-[7px] hover:scale-[1.01] hover:shadow-[0_22px_50px_-22px_rgba(99,102,241,0.35)]">
                {/* Media */}
                <div className="relative aspect-[16/9] bg-black/[0.04] overflow-hidden">
                    <ImgWithFallback
                        src={a.image}
                        alt={a.title}
                        width={1200}
                        height={675}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="text-xs text-black/45">{a.platform}</div>

                    <div className="mt-1 text-base font-semibold leading-snug line-clamp-2">
                        {a.title || "Title missing (refresh JSON)"}
                    </div>

                    <div className="mt-2 text-sm text-black/60 line-clamp-3">
                        {a.preview || "Preview missing (refresh JSON)."}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 text-sm text-black/50 transition group-hover:text-[#6366F1]">
                            <Heart className="h-4 w-4" />
                            {a.likes ?? 0}
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm text-black/45 transition group-hover:text-[#6366F1]">
                            Open <ExternalLink className="h-4 w-4" />
                        </div>
                    </div>
                </div>
            </GlassCard>
        </a>
    );
}