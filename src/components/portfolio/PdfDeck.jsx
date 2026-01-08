import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

export default function PdfDeck({ pdfUrl, title }) {
  const [ready, setReady] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [page, setPage] = useState(1);
  const [thumbs, setThumbs] = useState([]); // { page, src }
  const [rendering, setRendering] = useState(false);

  const docRef = useRef(null);
  const canvasRef = useRef(null);

  // Load pdf.js from CDN once
  useEffect(() => {
    let cancelled = false;

    async function loadPdfJs() {
      if (window.pdfjsLib) return true;

      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js";
        s.async = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });

      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

      return true;
    }

    (async () => {
      try {
        await loadPdfJs();
        if (!cancelled) setReady(true);
      } catch {
        if (!cancelled) setReady(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Load document when pdfUrl changes
  useEffect(() => {
    let cancelled = false;

    async function loadDoc() {
      setNumPages(0);
      setThumbs([]);
      setPage(1);
      docRef.current = null;

      if (!ready || !pdfUrl || !window.pdfjsLib) return;

      const loadingTask = window.pdfjsLib.getDocument({
        url: pdfUrl,
        withCredentials: false,
      });

      const doc = await loadingTask.promise;
      if (cancelled) return;

      docRef.current = doc;
      setNumPages(doc.numPages);

      const t = [];
      for (let p = 1; p <= doc.numPages; p += 1) {
        const pg = await doc.getPage(p);
        if (cancelled) return;

        const viewport = pg.getViewport({ scale: 0.22 });
        const c = document.createElement("canvas");
        const ctx = c.getContext("2d", { alpha: false });

        c.width = Math.floor(viewport.width);
        c.height = Math.floor(viewport.height);

        await pg.render({ canvasContext: ctx, viewport }).promise;
        if (cancelled) return;

        t.push({ page: p, src: c.toDataURL("image/jpeg", 0.85) });
      }

      if (!cancelled) setThumbs(t);
    }

    loadDoc();

    return () => {
      cancelled = true;
    };
  }, [ready, pdfUrl]);

  // Render current page
  useEffect(() => {
    let cancelled = false;

    async function renderPage() {
      const doc = docRef.current;
      const canvas = canvasRef.current;
      if (!doc || !canvas) return;

      setRendering(true);

      const pg = await doc.getPage(page);
      if (cancelled) return;

      const parent = canvas.parentElement;
      const maxW = parent?.clientWidth ? parent.clientWidth : 900;
      const baseVp = pg.getViewport({ scale: 1 });
      const scale = Math.min(1.6, maxW / baseVp.width);

      const viewport = pg.getViewport({ scale });
      const ctx = canvas.getContext("2d", { alpha: false });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);

      await pg.render({ canvasContext: ctx, viewport }).promise;
      if (cancelled) return;

      setRendering(false);
    }

    renderPage();

    return () => {
      cancelled = true;
    };
  }, [page, numPages]);

  // Keyboard arrows
  useEffect(() => {
    function onKey(e) {
      if (!numPages) return;
      if (e.key === "ArrowLeft") setPage((p) => Math.max(1, p - 1));
      if (e.key === "ArrowRight") setPage((p) => Math.min(numPages, p + 1));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [numPages]);

  const canPrev = page > 1;
  const canNext = page < numPages;

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-black/10 bg-white/55 overflow-hidden">
        <div className="relative bg-white">
          <div className="relative">
            <div className="max-h-[70vh] overflow-auto">
              <div className="flex justify-center p-3 sm:p-4">
                <canvas
                  ref={canvasRef}
                  className="max-w-full rounded-2xl border border-black/10 bg-white"
                  aria-label={title}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => canPrev && setPage((p) => p - 1)}
              disabled={!canPrev}
              className={[
                "absolute left-3 top-1/2 -translate-y-1/2",
                "rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-2.5 py-2",
                "text-black/70 hover:text-black hover:bg-white transition shadow-sm",
                !canPrev ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => canNext && setPage((p) => p + 1)}
              disabled={!canNext}
              className={[
                "absolute right-3 top-1/2 -translate-y-1/2",
                "rounded-2xl border border-black/10 bg-white/70 backdrop-blur px-2.5 py-2",
                "text-black/70 hover:text-black hover:bg-white transition shadow-sm",
                !canNext ? "opacity-40 cursor-not-allowed" : "",
              ].join(" ")}
              aria-label="Next page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute left-1/2 -translate-x-1/2 bottom-3">
              <div className="rounded-full border border-black/10 bg-white/70 backdrop-blur px-3 py-1 text-xs font-semibold text-black/70">
                {numPages ? `${page}/${numPages}` : "—/—"}
              </div>
            </div>

            {rendering ? (
              <div className="absolute inset-0 bg-white/35 backdrop-blur-[2px] flex items-center justify-center">
                <div className="rounded-2xl border border-black/10 bg-white/70 px-4 py-2 text-sm font-semibold text-black/70">
                  Rendering…
                </div>
              </div>
            ) : null}
          </div>

          {/* Thumbnails (desktop only) */}
          <div className="hidden sm:block border-t border-black/10 bg-white/45">
            <div className="flex gap-3 overflow-x-auto px-4 py-3">
              {(thumbs.length
                ? thumbs
                : Array.from({ length: numPages }, (_, i) => ({ page: i + 1 }))
              ).map((t) => (
                <button
                  key={t.page}
                  type="button"
                  onClick={() => setPage(t.page)}
                  className={[
                    "shrink-0 rounded-2xl border bg-white/55 overflow-hidden",
                    "hover:bg-white/80 transition",
                    t.page === page ? "border-black/30" : "border-black/10",
                  ].join(" ")}
                  aria-label={`Go to page ${t.page}`}
                  title={`Page ${t.page}`}
                >
                  <div className="h-16 w-28 bg-white flex items-center justify-center">
                    {t.src ? (
                      <img
                        src={t.src}
                        alt={`Page ${t.page}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-xs font-semibold text-black/60">
                        {t.page}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90 transition"
        >
          Open in new tab <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}