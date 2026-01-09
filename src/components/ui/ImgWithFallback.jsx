export default function ImgWithFallback({
  src,
  srcSet,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  alt = "",
  className = "",
  fill = false,
  width,
  height,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  style,
}) {
  if (!src) {
    return <div className={["bg-black/[0.04]", className].join(" ")} />;
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchpriority={fetchPriority}
      width={width}
      height={height}
      referrerPolicy="no-referrer"
      style={style}
      className={[
        fill ? "absolute inset-0 h-full w-full object-cover" : "object-cover",
        className,
      ].join(" ")}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}