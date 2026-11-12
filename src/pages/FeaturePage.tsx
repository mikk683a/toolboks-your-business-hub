import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, FaqList, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { FEATURE_BLURBS, FEATURE_PAGES, featurePath } from "@/lib/features";
import NotFound from "./NotFound";

const FeaturePage = ({ slug }: { slug: string }) => {
  const page = FEATURE_PAGES.find((f) => f.slug === slug);
  if (!page) return <NotFound />;
  const path = featurePath(page.slug);
  const others = FEATURE_PAGES.filter((f) => f.slug !== page.slug);

  return (
    <PageShell>
      <Seo
        title={page.title}
        description={page.description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: "Funktioner", path: "/#features" },
            { name: FEATURE_BLURBS[page.key].name, path },
          ]),
          faqJsonLd(page.faq),
        ]}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Funktioner" }, { name: FEATURE_BLURBS[page.key].name }]} />
        <PageHeader eyebrow="Funktion" h1={page.h1} intro={page.intro} />

        <section aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-5">
            {page.problemHeading}
          </h2>
          <ul className="space-y-3">
            {page.problems.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground">
                <span className="mt-2 w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-5">
            {page.howHeading}
          </h2>
          <div className="grid gap-4">
            {page.how.map((h) => (
              <div key={h.title} className="bg-card border border-border rounded-2xl p-6 shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Check className="w-5 h-5 text-accent" />
                  {h.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </section>

        {page.note && (
          <section className="mt-14 rounded-2xl border border-primary/30 bg-primary/5 p-6">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{page.note.title}</h2>
            {page.note.paragraphs.map((p) => (
              <p key={p} className="text-foreground leading-relaxed mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </section>
        )}

        <FaqList faq={page.faq} />
        <SignupCta />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground mb-4">Flere funktioner</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((f) => (
              <li key={f.slug}>
                <Link
                  to={featurePath(f.slug)}
                  className="inline-block px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {FEATURE_BLURBS[f.key].name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
};

export default FeaturePage;
