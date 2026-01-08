import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { Mail, ExternalLink, Download } from "lucide-react";
import GlassCard from "./components/ui/GlassCard";
import Modal from "./components/ui/Modal";
import {
  PRIMARY_EMAIL,
  ALT_EMAIL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  TWITTER_URL,
  MEDIUM_URL,
  navItems,
  stats,
  skills,
  tools,
  languages,
} from "./content/siteConfig";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import SiteFooter from "./components/layout/SiteFooter";
import AnalyticsRouteTracker from "./components/seo/AnalyticsRouteTracker";
import { loadGA } from "./components/seo/loadGA";

const ProfilePage = lazy(() => import("./pages/Profile"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Interests = lazy(() => import("./pages/Interests"));
const Articles = lazy(() => import("./pages/Articles"));

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const GA_ID = import.meta.env.VITE_GA_ID;

  useEffect(() => {
    if (GA_ID) loadGA(GA_ID);
  }, [GA_ID]);

  const headerMemojiSrc = "/avatar.png";

  return (
    <div className="min-h-screen text-black bg-[radial-gradient(1000px_520px_at_18%_12%,rgba(15,23,42,0.06),transparent_50%), radial-gradient(900px_520px_at_82%_18%,rgba(15,23,42,0.04),transparent_55%),linear-gradient(to_bottom,#fff,#fff)] bg-fixed">
      <div className="mx-auto max-w-6xl px-2 py-2 pb-24 md:pb-8">
        <div className="hidden md:block sticky top-2 z-50">
          <GlassCard className="px-4 py-2.5 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-black text-white grid place-items-center overflow-hidden">
                  <img
                    src={headerMemojiSrc}
                    alt="Memoji"
                    width="40"
                    height="40"
                    decoding="async"
                    fetchpriority="high"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.textContent = "M";
                      e.currentTarget.parentElement.classList.add("font-semibold");
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="leading-tight">
                  <div className="text-sm font-semibold">Mithilesh Pinjarkar</div>
                  <div className="text-xs text-black/50">Senior Product Manager</div>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((i) => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    end={i.to === "/"}
                    className={({ isActive }) =>
                      [
                        "text-sm transition",
                        isActive
                          ? "font-semibold text-black"
                          : "font-medium text-black/45 hover:text-black/70",
                      ].join(" ")
                    }
                  >
                    {i.label}
                  </NavLink>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <button
                  className="md:hidden rounded-2xl border border-black/10 bg-white/60 px-3 py-2 text-black/60 hover:bg-white/80 hover:text-black"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Open menu"
                >
                  ☰
                </button>

                <a
                  href="/Mithilesh-Pinjarkar-Resume.pdf"
                  download
                  title="Download resume (PDF)"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-black/60 cursor-pointer transition hover:text-[#6366F1]"
                >
                  <Download className="h-4 w-4" />
                  Download resume
                </a>

                <button
                  onClick={() => setContactOpen(true)}
                  className="cursor-pointer rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90 hover:shadow-[0_16px_45px_-26px_rgba(0,0,0,0.45)] hover:-translate-y-[1px]"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {mobileOpen && (
              <div className="mt-3 md:hidden border-t border-black/10 pt-3">
                <div className="grid grid-cols-2 gap-3">
                  {navItems.map((i) => (
                    <NavLink
                      key={i.to}
                      to={i.to}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        [
                          "rounded-2xl border border-black/10 bg-white/55 px-4 py-2 text-sm",
                          isActive ? "text-black" : "text-black/70 hover:text-black",
                        ].join(" ")
                      }
                      end={i.to === "/"}
                    >
                      {i.label}
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      setContactOpen(true);
                    }}
                    className="col-span-2 rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            )}
            <div className="absolute inset-x-4 bottom-0 h-px bg-black/5" />
          </GlassCard>
        </div>

        <Suspense
          fallback={
            <div className="py-10">
              <GlassCard className="p-6">
                <div className="text-sm font-medium text-black/60">Loading…</div>
              </GlassCard>
            </div>
          }
        >
          <AnalyticsRouteTracker />
          <Routes>
            <Route
              path="/"
              element={
                <ProfilePage
                  stats={stats}
                  skills={skills}
                  tools={tools}
                  languages={languages}
                  INSTAGRAM_URL={INSTAGRAM_URL}
                  LINKEDIN_URL={LINKEDIN_URL}
                  TWITTER_URL={TWITTER_URL}
                  MEDIUM_URL={MEDIUM_URL}
                  contactOpen={contactOpen}
                  setContactOpen={setContactOpen}
                />
              }
            />
            <Route path="/articles" element={<Articles />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>

        <SiteFooter />
        <MobileBottomNav onContact={() => setContactOpen(true)} />
      </div>

      <Modal open={contactOpen} onClose={() => setContactOpen(false)} title="Reach out">
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 bg-white/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4" /> Primary email
            </div>
            <div className="mt-1 text-sm text-black/70">{PRIMARY_EMAIL}</div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4" /> Alternative email
            </div>
            <div className="mt-1 text-sm text-black/70">{ALT_EMAIL}</div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/55 p-4 text-sm text-black/70 leading-relaxed">
            Prefer LinkedIn? Feel free to message me there - I’m quick to respond.
            <div className="mt-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
              >
                Message on LinkedIn <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}