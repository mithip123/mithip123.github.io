import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionRow({ title, subtitle, left, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-black/10 bg-white/55">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group w-full px-4 py-4 text-left flex items-start justify-between gap-3 hover:bg-white/70 rounded-2xl transition cursor-pointer"
      >
        <div className="flex items-start gap-3">
          {left}
          <div>
            <div className="font-semibold text-black/80">{title}</div>
            {subtitle ? (
              <div className="text-black/55 text-sm">{subtitle}</div>
            ) : null}
          </div>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-black/40 transition-transform ${
            open ? "rotate-180 text-black/60" : "group-hover:text-black/60"
          }`}
        />
      </button>

      {open ? <div className="px-4 pb-4">{children}</div> : null}
    </div>
  );
}