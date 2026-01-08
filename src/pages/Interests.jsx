import { useMemo } from "react";
import booksData from "../content/interests/books.json";
import moviesData from "../content/interests/movies.json";
import speakingData from "../content/interests/speaking.json";
import PageContainer from "../components/layout/PageContainer";
import GlassCard from "../components/ui/GlassCard";
import { HeartHandshake, Spade, Dumbbell, BookOpen, Film, Drama } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import Carousel from "../components/ui/Carousel";
import MediaCard from "../components/ui/MediaCard";
import SpeakingHero from "../components/interests/SpeakingHero";
import InterestTile from "../components/interests/InterestTile";
import useSEO from "../components/seo/useSEO";

const quickInterests = [
  {
    title: "Poker",
    icon: Spade,
    text: "I picked up poker in my final year of college and was instantly drawn to how it blends probability, mathematics, and the art of bluffing. I play purely for the love of the game and still hope to see a royal flush at the table someday.",
  },
  {
    title: "Sports",
    icon: Dumbbell,
    text: "I represented my district cricket team during school and still enjoy playing the sport occasionally, even if I no longer follow it closely. More recently, I’ve taken up badminton and am learning table tennis, and I’m fairly comfortable with pool and snooker.",
  },
  {
    title: "Volunteering",
    icon: HeartHandshake,
    text: "I began volunteering as part of the NSS in college, where I discovered how much I enjoy teaching and giving back. That interest led me to volunteer with an NGO in Bangalore, an experience that I found deeply fulfilling.",
  },
  {
    title: "Dramatics",
    icon: Drama,
    text: "I stumbled into dramatics in my second year of college - starting quite literally as a tree on stage - but quickly fell in love with acting and performance. Dramatics ties closely to my love for public speaking, storytelling, and owning the stage.",
  },
];

export default function Interests() {
  const books = useMemo(() => booksData || [], []);
  const movies = useMemo(() => moviesData || [], []);
  const speaking = speakingData || {};

  useSEO({
    title: "Interests - Mithilesh Pinjarkar",
    description:
      "Interests and pursuits of Mithilesh Pinjarkar outside of work, including public speaking, books, movies, sports, volunteering, and creative pursuits.",
    path: "/interests/",
  });

  // Preload speaking hero image (if present) to reduce perceived slowness / flicker
  // (safe on GitHub Pages, and does not change layout)
  if (typeof document !== "undefined" && speaking?.image) {
    const id = "preload-speaking-hero";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "preload";
      link.as = "image";
      link.href = speaking.image;
      document.head.appendChild(link);
    }
  }

  return (
    <PageContainer id="interests">
      <div className="space-y-6">
        {/* Page title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Interests</h1>
          <p className="mt-1 text-sm text-black/55">A few things I enjoy outside of work.</p>
        </div>

        {/* HERO: Public Speaking */}
        <SpeakingHero speaking={speaking} />

        {/* Interest cards (2x2 grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {quickInterests.map((it) => (
            <InterestTile key={it.title} title={it.title} icon={it.icon} text={it.text} />
          ))}
        </div>

        {/* Books */}
        <GlassCard className="p-5 sm:p-6">
          <SectionHeader icon={BookOpen} title="Some books I’ve read" subtitle="A rotating shelf of favorites." />

          <div className="mt-4">
            <Carousel
              ariaLabel="books"
              items={books}
              renderItem={(b, i) => (
                <MediaCard
                  key={b.url || `${b.title}-${i}`}
                  item={b}
                  subtitleKey="author"
                  className="min-w-[130px] sm:min-w-[190px] lg:min-w-[210px]"
                />
              )}
            />
          </div>
        </GlassCard>

        {/* Movies & TV */}
        <GlassCard className="p-5 sm:p-6">
          <SectionHeader icon={Film} title="My top movies & TV shows" subtitle="A few that I keep recommending." />

          <div className="mt-4">
            <Carousel
              ariaLabel="movies and tv shows"
              items={movies}
              renderItem={(m, i) => (
                <MediaCard
                  key={m.url || `${m.title}-${i}`}
                  item={m}
                  subtitleKey="platform"
                  className="min-w-[150px] sm:min-w-[210px] lg:min-w-[210px]"
                />
              )}
            />
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
}