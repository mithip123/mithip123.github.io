export default function GlassCard({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-3xl border border-white/70 bg-white/45 backdrop-blur-xl",
        "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.22)]",
        "transition",
        "hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}