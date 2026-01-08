import { X } from "lucide-react";

export default function ModalShell({ open, onClose, title, subtitle, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120]">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-10 w-[94%] max-w-5xl">
        <div className="rounded-3xl border border-white/70 bg-white/55 backdrop-blur-xl shadow-[0_24px_70px_-34px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-black/10 bg-white/40">
            <div className="min-w-0">
              <div className="text-xs text-black/55">{subtitle}</div>
              <div className="text-lg sm:text-xl font-semibold text-black/85 truncate">
                {title}
              </div>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 rounded-2xl border border-black/10 bg-white/70 p-2 text-black/60 hover:text-black hover:bg-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 sm:p-5">{children}</div>
        </div>
      </div>
    </div>
  );
}