export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  right,
  variant = "section", // "section" | "page"
}) {
  const isPage = variant === "page";

  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-5 w-5 text-black/65" /> : null}

          {isPage ? (
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {title}
            </h1>
          ) : (
            <h2 className="text-lg sm:text-xl font-semibold tracking-tight">
              {title}
            </h2>
          )}
        </div>

        {subtitle ? (
          <p className={isPage ? "mt-1 text-sm text-black/55" : "mt-1 text-sm text-black/55"}>
            {subtitle}
          </p>
        ) : null}
      </div>

      {right}
    </div>
  );
}