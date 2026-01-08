import HoverSurface from "./HoverSurface";
import GlassCard from "./GlassCard";
import SectionTitle from "./SectionTitle";

export default function SidebarCard({ icon, title, children }) {
  return (
    <HoverSurface>
      <GlassCard className="p-6 sm:p-8">
        <SectionTitle icon={icon} title={title} />
        <div className="mt-4">{children}</div>
      </GlassCard>
    </HoverSurface>
  );
}