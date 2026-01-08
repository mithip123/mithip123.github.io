import Pill from "../ui/Pill";

export default function PortfolioHeader() {
    const chips = [
        { k: "Focus", v: "Product thinking" },
        { k: "Output", v: "Userflows • IA • Metrics" },
        { k: "Craft", v: "Visual polish + UX" },
    ];

    return (
        <div className="rounded-3xl border border-white/70 bg-white/40 backdrop-blur-xl shadow-[0_12px_40px_-26px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="px-5 py-5 sm:px-8 sm:py-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-black/60">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Exploring, learning and building
                </div>

                <div className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-black/85">
                    My Portfolio - Work I built outside my day job
                </div>

                <div className="mt-2 text-sm sm:text-base text-black/60 leading-relaxed max-w-3xl">
                    Selected case studies and personal builds - each one focused on clarity, crisp
                    UX, and outcomes.
                </div>
            </div>

            <div className="h-px bg-black/10" />

            <div className="px-5 py-4 sm:px-7 sm:py-5">
                <div className="flex flex-wrap gap-2">
                    {chips.map((x) => (
                        <Pill key={x.k} left={x.k} right={x.v} />
                    ))}
                </div>
            </div>
        </div>
    );
}