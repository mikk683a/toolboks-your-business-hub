import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, FaqList, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { FEATURE_BLURBS } from "@/lib/features";
import { TRADES, getTrade, tradePath } from "@/lib/trades";
import NotFound from "./NotFound";

const TradePage = ({ slug: slugProp }: { slug?: string }) => {
  const params = useParams();
  const trade = getTrade(slugProp ?? params.slug);
  if (!trade) return <NotFound />;
  const path = tradePath(trade.slug);
  const others = TRADES.filter((t) => t.slug !== trade.slug);

  return (
    <PageShell>
      <Seo
        title={trade.title}
        description={trade.description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: "Brancher", path: "/brancher" },
            { name: trade.name, path },
          ]),
          faqJsonLd(trade.faq),
        ]}
      />
      <Container>
        <Breadcrumbs
          items={[{ name: "Forside", to: "/" }, { name: "Brancher", to: "/brancher" }, { name: trade.name }]}
        />
        <PageHeader eyebrow={trade.name} h1={trade.h1} intro={trade.intro} />

        <section aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-5">
            {trade.problemsHeading}
          </h2>
          <ul className="space-y-3">
            {trade.problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground">
                <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-5">
            Det får du i Toolboks
          </h2>
          <div className="grid gap-4">
            {trade.features.map((f) => {
              const blurb = FEATURE_BLURBS[f.key];
              return (
                <div key={f.key} className="bg-card border border-border rounded-2xl p-6 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Check className="w-5 h-5 text-accent" />
                    {blurb.href ? (
                      <Link to={blurb.href} className="hover:underline underline-offset-4">
                        {blurb.name}
                      </Link>
                    ) : (
                      blurb.name
                    )}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{f.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        <FaqList faq={trade.faq} />
        <SignupCta />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground mb-4">Andre brancher</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  to={tradePath(t.slug)}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
};

export default TradePage;
