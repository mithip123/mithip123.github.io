import { ExternalLink } from "lucide-react";
import ImgWithFallback from "./ImgWithFallback";

export default function MediaCard({
    item,
    subtitleKey,
    className = "",
    aspectClass = "aspect-square",
}) {
    const x = item || {};
    const href = x.url || "#";
    const subtitle = subtitleKey ? x[subtitleKey] : "";

    return (
        <a
            href={href}
            target={x.url ? "_blank" : undefined}
            rel={x.url ? "noreferrer" : undefined}
            className={["block group", className].join(" ")}
        >
            <div className="rounded-2xl border border-black/10 bg-white/55 overflow-hidden transition duration-200 ease-out group-hover:-translate-y-[2px] group-hover:scale-[1.01] group-hover:bg-white/70">
                <div className={[aspectClass, "bg-black/[0.04]"].join(" ")}>
                    <ImgWithFallback
                        src={x.image}
                        alt={x.title}
                        className="h-full w-full"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                    />
                </div>

                <div className="p-3">
                    <div className="text-sm font-semibold text-black/80 line-clamp-1">
                        {x.title}
                    </div>

                    {subtitle ? (
                        <div className="mt-1 text-xs text-black/55 line-clamp-1">{subtitle}</div>
                    ) : null}

                    {x.url ? (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs text-black/45 group-hover:text-[#6366F1] transition">
                            Open <ExternalLink className="h-3.5 w-3.5" />
                        </div>
                    ) : null}
                </div>
            </div>
        </a>
    );
}