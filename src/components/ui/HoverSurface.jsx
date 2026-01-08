export default function HoverSurface({ className = "", children }) {
  return (
    <div
      className={[
        "transition-transform hover:-translate-y-[1px]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}