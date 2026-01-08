import { useState } from "react";
import { Instagram, Linkedin, Twitter, BookOpen, GraduationCap, Briefcase, Users, Trophy, User, Sparkles, Languages as LanguagesIcon } from "lucide-react";
import GlassCard from "../components/ui/GlassCard";
import experienceData from "../content/profile/experience.json";
import educationData from "../content/profile/education.json";
import porData from "../content/profile/por.json";
import awardsData from "../content/profile/awards.json";
import HoverSurface from "../components/ui/HoverSurface";
import Pill from "../components/ui/Pill";
import SectionTitle from "../components/ui/SectionTitle";
import ViewAllButton from "../components/ui/ViewAllButton";
import IconLink from "../components/ui/IconLink";
import AccordionRow from "../components/ui/AccordionRow";
import SidebarCard from "../components/ui/SidebarCard";
import SectionCard from "../components/ui/SectionCard";
import RichDescription from "../components/ui/RichDescription";
import formatDuration from "../utils/formatDuration";
import useSEO from "../components/seo/useSEO";

export default function ProfilePage({
  stats,
  skills,
  tools,
  languages,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  TWITTER_URL,
  MEDIUM_URL,
}) {
  const experience = Array.isArray(experienceData) ? experienceData : experienceData.items || [];
  const education = Array.isArray(educationData) ? educationData : educationData.items || [];
  const por = Array.isArray(porData) ? porData : porData.items || [];
  const awards = Array.isArray(awardsData) ? awardsData : awardsData.items || [];

  const [expAll, setExpAll] = useState(false);
  const [eduAll, setEduAll] = useState(false);
  const [porAll, setPorAll] = useState(false);
  const [awardsAll, setAwardsAll] = useState(false);

  const expVisible = expAll ? experience : experience.slice(0, 3);
  const eduVisible = eduAll ? education : education.slice(0, 3);
  const porVisible = porAll ? por : por.slice(0, 3);
  const awardsVisible = awardsAll ? awards : awards.slice(0, 3);

  const RESUME_URL = "/Mithilesh-Pinjarkar-Resume.pdf";

  useSEO({
    title: "Mithilesh Pinjarkar - Senior Product Manager",
    description: "Mithilesh Pinjarkar is a Senior Product Manager with 5+ years of experience building and scaling B2B SaaS and EdTech products. Expertise across product strategy, discovery, execution, and measurable outcomes.",
    path: "/"
  });

  return (
    <div className="min-h-screen text-black">
      {/* ✅ Match Articles/Interests page padding, so Profile aligns everywhere */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" id="profile">
          {/* Left / Main column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Profile Card */}
            <HoverSurface>
              <GlassCard className="p-5 sm:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-black/60">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Looking for new roles
                    </div>

                    <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                      I’m Mithilesh.
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-black/60 leading-relaxed max-w-xl">
                      I build scalable products, ship experiments fast, and turn ambiguous problems into crisp UX + measurable outcomes.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <IconLink href={INSTAGRAM_URL} label="Instagram" icon={Instagram} />
                      <IconLink href={LINKEDIN_URL} label="LinkedIn" icon={Linkedin} />
                      <IconLink href={TWITTER_URL} label="Twitter / X" icon={Twitter} />
                      <IconLink href={MEDIUM_URL} label="Medium" icon={BookOpen} />
                    </div>
                  </div>

                  <div className="shrink-0">
                    <div className="relative h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44">
                      <div className="absolute inset-0 rounded-full overflow-hidden border border-white bg-white shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)]">
                        <img
                          src="/avatar-photo.png"
                          alt="Mithilesh photo"
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                  {(stats || []).map((s, idx) => (
                    <div key={`${s.label}-${idx}`}
                      className="rounded-2xl border border-black/10 bg-white/55 px-3 py-2.5 sm:px-4 sm:py-3 hover:bg-white/80 hover:-translate-y-[1px] transition"
                    >
                      <div className="text-base sm:text-lg font-semibold text-black/75">{s.value}</div>
                      <div className="text-xs text-black/45 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </HoverSurface>

            {/* About (mobile only) */}
            <div className="lg:hidden">
              <HoverSurface>
                <GlassCard className="p-6 sm:p-8" id="about">
                  <SectionTitle icon={User} title="About" />
                  <p className="mt-2 text-sm text-black/60 leading-relaxed">
                    Senior Product Manager with 5+ years of experience building and scaling B2B SaaS and EdTech products. I work across the full product lifecycle - from discovery and strategy to execution, launch, and iteration on products.
                  </p>
                  <p className="mt-2 text-sm text-black/60 leading-relaxed">
                    My experience spans platform products, LMS integrations, AI-powered features, and monetization models, with a strong focus on solving complex user problems while driving measurable business outcomes.
                  </p>

                  <a
                    href={RESUME_URL}
                    download
                    title="Download resume (PDF)"
                    className="mt-4 inline-flex items-center justify-center rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90"
                  >
                    Download resume
                  </a>
                </GlassCard>
              </HoverSurface>
            </div>

            {/* Experience */}
            <SectionCard icon={Briefcase} title="Experience">
              <div className="mt-4 space-y-3">
                {expVisible.map((x, idx) => (
                  <AccordionRow
                    key={x.id || idx}
                    title={
                      <div className="text-sm font-semibold text-black/85 leading-snug">
                        {x.positionTitle}
                      </div>
                    }
                    subtitle={
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-black/65">
                          <img
                            src={x.companyLogo}
                            alt={`${x.companyName} logo`}
                            className="h-4 w-4 object-contain"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                          <span>{x.companyName}</span>
                        </div>

                        <div className="text-xs text-black/50">
                          {formatDuration(x.duration)}
                          <span className="mx-1">·</span>
                          {x.location}
                          <span className="mx-1">·</span>
                          {x.type}
                        </div>
                      </div>
                    }
                    left={null}
                  >
                    {Array.isArray(x.description) && x.description.length > 0 ? (
                      <div className="pt-1 space-y-3">
                        {x.description.map((section, i) => (
                          <div key={i}>
                            <div className="text-sm font-medium text-black/75">
                              {section.heading}
                            </div>
                            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-black/70">
                              {(section.bullets || []).map((bullet, j) => (
                                <li key={j}>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </AccordionRow>
                ))}
              </div>

              {experience.length > 3 ? (
                <div className="mt-4 flex justify-end">
                  <ViewAllButton expanded={expAll} onClick={() => setExpAll((v) => !v)} />
                </div>
              ) : null}
            </SectionCard>

            {/* Education */}
            <SectionCard icon={GraduationCap} title="Education">
              <div className="space-y-4">
                {eduVisible.map((e, idx) => (
                  <div
                    key={e.id || idx}
                    className="rounded-2xl border border-black/10 bg-white/55 p-4 hover:bg-white/80 transition"
                  >
                    <div className="text-sm font-semibold text-black/85 leading-snug">
                      {e.degreeName}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-black/65">
                      <img
                        src={e.logo || "/iit-kgp.png"}
                        alt={`${e.institutionName} logo`}
                        className="h-4 w-4 object-contain"
                        onError={(ev) => {
                          ev.currentTarget.style.display = "none";
                        }}
                      />
                      <span>{e.institutionName}</span>
                    </div>

                    <div className="mt-2 text-xs text-black/50">
                      {formatDuration(e.duration)}
                      <span className="mx-1">·</span>
                      {e.location}
                      <span className="mx-1">·</span>
                      {e.score}
                    </div>
                  </div>
                ))}
              </div>

              {education.length > 3 ? (
                <div className="mt-4 flex justify-end">
                  <ViewAllButton expanded={eduAll} onClick={() => setEduAll((v) => !v)} />
                </div>
              ) : null}
            </SectionCard>

            {/* Positions of Responsibility */}
            <SectionCard icon={Users} title="Positions of Responsibility">
              <div className="mt-4 space-y-3">
                {porVisible.map((p, idx) => (
                  <AccordionRow
                    key={p.id || idx}
                    title={
                      <div className="text-sm font-semibold text-black/85 leading-snug">
                        {p.positionTitle}
                      </div>
                    }
                    subtitle={
                      <div className="mt-1 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-black/65">
                          <img
                            src={p.logo}
                            alt={`${p.institutionName} logo`}
                            className="h-4 w-4 object-contain"
                            onError={(e) => (e.currentTarget.style.display = "none")}
                          />
                          <span>{p.institutionName}</span>
                        </div>

                        <div className="text-xs text-black/50">
                          {formatDuration(p.duration)}
                          <span className="mx-1">·</span>
                          {p.location}
                          <span className="mx-1">·</span>
                          {p.type}
                        </div>
                      </div>
                    }
                    left={null}
                  >
                    <RichDescription description={p.description} />
                  </AccordionRow>
                ))}
              </div>

              {por.length > 3 ? (
                <div className="mt-4 flex justify-end">
                  <ViewAllButton expanded={porAll} onClick={() => setPorAll((v) => !v)} />
                </div>
              ) : null}
            </SectionCard>

            {/* Awards */}
            <SectionCard icon={Trophy} title="Awards & Achievements">
              <div className="mt-4 space-y-3">
                {awardsVisible.map((a, idx) => (
                  <div
                    key={a.id || idx}
                    className="rounded-2xl border border-black/10 bg-white/55 p-4 hover:bg-white/80 transition"
                  >
                    <div className="text-sm font-semibold text-black/85 leading-snug">
                      {a.title}
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-sm text-black/65">
                      <img
                        src={a.logo}
                        alt={`${a.issuer} logo`}
                        className="h-4 w-4 object-contain"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <span>{a.issuer}</span>
                    </div>

                    <div className="mt-2 text-xs text-black/50">
                      {a.year}
                      <span className="mx-1">·</span>
                      {a.location}
                    </div>
                  </div>
                ))}
              </div>

              {awards.length > 3 ? (
                <div className="mt-4 flex justify-end">
                  <ViewAllButton
                    expanded={awardsAll}
                    onClick={() => setAwardsAll((v) => !v)}
                  />
                </div>
              ) : null}
            </SectionCard>
          </div>

          {/* Right / Sidebar */}
          <div className="space-y-5">
            {/* About (desktop only) */}
            <div className="hidden lg:block">
              <div className="hidden lg:block">
                <SidebarCard icon={User} title="About">
                  <div className="space-y-2 text-sm text-black/60 leading-relaxed">
                    <p>
                      Senior Product Manager with 5+ years of experience building and scaling B2B SaaS and
                      EdTech products. I work across the full product lifecycle - from discovery and strategy
                      to execution, launch, and iteration on products.
                    </p>
                    <p>
                      My experience spans platform products, LMS integrations, AI-powered features, and
                      monetization models, with a strong focus on solving complex user problems while
                      driving measurable business outcomes.
                    </p>
                  </div>
                </SidebarCard>
              </div>
            </div>

            {/* Skills */}
            <SidebarCard icon={Sparkles} title="Skills">
              <div className="flex flex-wrap gap-2">
                {(skills || []).map((t) => (
                  <Pill key={t} right={t} />
                ))}
              </div>
            </SidebarCard>

            {/* Tools */}
            <SidebarCard icon={Briefcase} title="Tools">
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {(tools || []).map((t) => (
                  <div key={t.name} className="flex items-center gap-2 min-h-[22px]">
                    <img
                      src={t.img}
                      alt={`${t.name} icon`}
                      className="h-4 w-4 shrink-0"
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                    <span className="text-sm font-medium text-black/75 leading-none">
                      {t.name}
                    </span>
                  </div>
                ))}
              </div>
            </SidebarCard>

            {/* Languages */}
            <SidebarCard icon={LanguagesIcon} title="Languages">
              <div className="space-y-5">
                {(languages || []).map((l) => (
                  <div key={l.name} className="grid grid-cols-[1fr_auto] items-center">
                    <div className="text-sm font-medium text-black/75">{l.name}</div>
                    <div className="text-sm text-black/50">{l.level}</div>
                  </div>
                ))}
              </div>
            </SidebarCard>
          </div>
        </div>
      </div>
    </div >
  );
}