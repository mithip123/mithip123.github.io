import HoverSurface from "./HoverSurface";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";

export default function SectionCard({ icon, title, right, children }) {
  return (
    <HoverSurface>
      <GlassCard className="p-6 sm:p-8">
        <SectionTitle icon={icon} title={title} right={right} />
        <div className="mt-4">{children}</div>
      </GlassCard>
    </HoverSurface>
  );
}