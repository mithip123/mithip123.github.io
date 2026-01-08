export default function Pill({ left, right, className = "" }) {
  return (
    <div
      className={[
        "inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-2 text-sm",
        className,
      ].join(" ")}
    >
      {left ? <span className="text-black/45 text-xs">{left}</span> : null}
      {left && right ? <span className="h-1 w-1 rounded-full bg-black/25" /> : null}
      {right ? <span className="font-semibold text-black/75">{right}</span> : null}
    </div>
  );
}