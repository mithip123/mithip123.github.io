export default function IconLink({ href, label, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className={[
        "group inline-flex items-center justify-center cursor-pointer",
        "h-11 w-11 rounded-2xl border border-black/15 bg-white",
        "text-black/35",
        "hover:border-[#6366F1] hover:text-[#6366F1]",
        "hover:shadow-[0_14px_35px_-22px_rgba(99,102,241,0.35)]",
        "hover:-translate-y-[1px]",
        "transition",
      ].join(" ")}
    >
      <Icon className="h-5 w-5 text-current" />
    </a>
  );
}