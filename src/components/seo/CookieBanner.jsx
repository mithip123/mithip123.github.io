import { useEffect, useState } from "react";
import GlassCard from "../ui/GlassCard";
import { getConsent, setConsent } from "./consent";

export default function CookieBanner({ onDecision }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = getConsent();
    setShow(!c); // show only if not decided yet
  }, []);

  if (!show) return null;

  const accept = () => {
    setConsent("accepted");
    setShow(false);
    onDecision?.("accepted");
  };

  const reject = () => {
    setConsent("rejected");
    setShow(false);
    onDecision?.("rejected");
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-[200] md:inset-x-6">
      <GlassCard className="p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-black/70">
            I use cookies, mainly google analytics, to understand traffic and improve the site.
            You can accept or reject.
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={reject}
              className="rounded-2xl border border-black/10 bg-white/60 px-4 py-2 text-sm font-semibold text-black/70 hover:bg-white/80"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={accept}
              className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
            >
              Accept
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}