export default function ViewAllButton({ expanded, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm font-medium text-black/55 hover:text-[#6366F1] transition"
    >
      {expanded ? "View less" : "View all"}
    </button>
  );
}