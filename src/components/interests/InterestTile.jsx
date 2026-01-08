import GlassCard from "../ui/GlassCard";

export default function InterestTile({ title, icon: Icon, text }) {
  return (
    <GlassCard className="p-5 sm:p-6 hover:-translate-y-[2px] hover:scale-[1.01] transition duration-200 ease-out">
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="h-5 w-5 text-black/65" /> : null}
        <div className="text-base font-semibold">{title}</div>
      </div>
      <p className="mt-3 text-sm text-black/60 leading-relaxed">{text}</p>
    </GlassCard>
  );
}