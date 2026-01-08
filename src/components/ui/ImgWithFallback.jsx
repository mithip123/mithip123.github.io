export default function ImgWithFallback({ src, alt, className = "" }) {
  if (!src) return <div className={["bg-black/[0.04]", className].join(" ")} />;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      className={["object-cover", className].join(" ")}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}