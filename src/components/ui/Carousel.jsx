import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Carousel({ items = [], renderItem, ariaLabel = "carousel" }) {
  const ref = useRef(null);
  const [canScroll, setCanScroll] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const scrollBy = (dir) => {
    const el = ref.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.85) * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const overflow = el.scrollWidth > el.clientWidth + 2;
      setCanScroll(overflow);

      if (!overflow) {
        setAtStart(true);
        setAtEnd(true);
        return;
      }

      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };

    update();
    window.addEventListener("resize", update);
    el.addEventListener("scroll", update, { passive: true });

    return () => {
      window.removeEventListener("resize", update);
      el.removeEventListener("scroll", update);
    };
  }, [items.length]);

  return (
    <div className="relative">
      {canScroll && !atStart && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} left`}
          onClick={() => scrollBy(-1)}
          className={[
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "rounded-2xl border border-black/10 bg-white/70 backdrop-blur",
            "px-2.5 py-2 shadow-sm",
            "hover:bg-white hover:-translate-y-1/2 hover:scale-[1.02] transition",
          ].join(" ")}
        >
          <ChevronLeft className="h-4 w-4 text-black/60" />
        </button>
      )}

      {canScroll && !atEnd && (
        <button
          type="button"
          aria-label={`Scroll ${ariaLabel} right`}
          onClick={() => scrollBy(1)}
          className={[
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "rounded-2xl border border-black/10 bg-white/70 backdrop-blur",
            "px-2.5 py-2 shadow-sm",
            "hover:bg-white hover:-translate-y-1/2 hover:scale-[1.02] transition",
          ].join(" ")}
        >
          <ChevronRight className="h-4 w-4 text-black/60" />
        </button>
      )}

      <div
        ref={ref}
        role="region"
        aria-label={ariaLabel}
        className={[
          "flex gap-4 overflow-x-auto scroll-smooth",
          "pb-2 pt-1 px-1",
          "[scrollbar-width:none] [-ms-overflow-style:none]",
        ].join(" ")}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>
        {items.map(renderItem)}
      </div>
    </div>
  );
}