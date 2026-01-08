export default function RichDescription({ description }) {
  if (!description) return null;

  if (typeof description === "string") {
    return (
      <div className="text-sm text-black/70 leading-relaxed">{description}</div>
    );
  }

  const sections = Array.isArray(description)
    ? description
    : Array.isArray(description.sections)
      ? description.sections
      : [];

  if (!sections.length) return null;

  return (
    <div className="space-y-3">
      {sections.map((s, idx) => (
        <div key={idx}>
          {s.heading ? (
            <div className="text-sm font-semibold text-black/75">{s.heading}</div>
          ) : null}

          {Array.isArray(s.bullets) && s.bullets.length ? (
            <ul className="mt-1 list-disc pl-5 space-y-1 text-sm text-black/65">
              {s.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}