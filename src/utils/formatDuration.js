export default function formatDuration(d) {
  if (!d) return "";
  if (typeof d === "string") return d;
  if (typeof d === "object") {
    const from = d.from || "";
    const to = d.to || "";
    return [from, to].filter(Boolean).join(" to ");
  }
  return String(d);
}