export default function ImgWithFallback({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  sizes,
  loading = "lazy",
  decoding = "async",
}) {
  if (!src) return <div className={["bg-black/[0.04]", className].join(" ")} />;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      sizes={sizes}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      className={[
        "object-cover",
        fill ? "absolute inset-0 h-full w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}