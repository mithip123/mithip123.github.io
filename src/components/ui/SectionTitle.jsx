export default function SectionTitle({ icon: Icon, title, right }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-black" />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      {right}
    </div>
  );
}