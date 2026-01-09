export default function ImgWithFallback({
  src,
  srcSet,
  sizes,
  alt = "",
  className = "",
  fill = false,
  width,
  height,
  loading = "lazy",
  decoding = "async",
}) {
  if (!src) return <div className={["bg-black/[0.04]", className].join(" ")} />;

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
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