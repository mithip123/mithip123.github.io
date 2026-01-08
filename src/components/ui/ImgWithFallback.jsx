export default function ImgWithFallback({
  src,
  alt,
  className = "",
  sizes,
  fetchPriority = "low",
}) {
  if (!src) return <div className={["bg-black/[0.04]", className].join(" ")} />;

  return (
    <img
      src={src}
      alt={alt || ""}
      loading="lazy"
      decoding="async"
      fetchpriority={fetchPriority}
      referrerPolicy="no-referrer"
      sizes={sizes}
      className={["object-cover", className].join(" ")}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}