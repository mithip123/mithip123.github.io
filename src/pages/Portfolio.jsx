import PageContainer from "../components/layout/PageContainer";
import PortfolioCard from "../components/portfolio/PortfolioCard";
import PortfolioModal from "../components/portfolio/PortfolioModal";
import PortfolioHeader from "../components/portfolio/PortfolioHeader";
import { portfolioItems } from "../content/portfolio/items";
import usePortfolioModal from "../hooks/usePortfolioModal";
import useSEO from "../components/seo/useSEO";

export default function Portfolio() {
  const { active, openItem, close } = usePortfolioModal();

  useSEO({
    title: "Portfolio - Mithilesh Pinjarkar",
    description: "Product portfolio and case studies by Mithilesh Pinjarkar, showcasing product thinking, UX decisions, information architecture, and outcome-driven execution.",
    path: "/portfolio/"
  });

  return (
    <PageContainer id="portfolio">
      <div className="space-y-6">
        <PortfolioHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {portfolioItems.map((item) => (
            <PortfolioCard key={item.id} item={item} onOpen={openItem} />
          ))}
        </div>

        <PortfolioModal active={active} onClose={close} />
      </div>
    </PageContainer>
  );
}