import { useMemo } from "react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/ui/SectionHeader";
import ArticleCard from "../components/articles/ArticleCard";
import articlesData from "../content/articles/articles.json";
import useSEO from "../components/seo/useSEO";

export default function Articles() {
    useSEO({
        title: "Articles - Mithilesh Pinjarkar",
        description:
            "Articles by Mithilesh Pinjarkar on product management, entrepreneurship, interview and resume prep",
        path: "/articles/",
    });

    const articles = useMemo(() => articlesData || [], []);

    return (
        <PageContainer id="articles">
            <div className="space-y-6">
                <SectionHeader variant="page" title="Articles" subtitle="Some articles that I wrote..." />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {articles.map((a) => (
                        <ArticleCard key={a.url || a.title} article={a} />
                    ))}
                </div>
            </div>
        </PageContainer>
    );
}