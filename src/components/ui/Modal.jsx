import { useEffect } from "react";
import { X } from "lucide-react";
import GlassCard from "./GlassCard";

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-16 w-[92%] max-w-lg">
        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm text-black/50">Contact</div>
              <div className="text-xl font-semibold">{title}</div>
            </div>
            <button
              onClick={onClose}
              className="rounded-2xl border border-black/10 bg-white/60 p-2 text-black/60 hover:text-black hover:bg-white/80"
              aria-label="Close"
              type="button"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </GlassCard>
      </div>
    </div>
  );
}