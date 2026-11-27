import { Link, useParams } from "react-router-dom";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, FaqList, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { GUIDES, GUIDES_UPDATED, GUIDES_UPDATED_ISO, getGuide, guidePath } from "@/lib/guides";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import NotFound from "./NotFound";

const GuidePage = ({ slug: slugProp }: { slug?: string }) => {
  const params = useParams();
  const guide = getGuide(slugProp ?? params.slug);
  if (!guide) return <NotFound />;
  const path = guidePath(guide.slug);
  const others = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <PageShell>
      <Seo
        title={guide.title}
        description={guide.description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: "Guider", path: "/guider" },
            { name: guide.name, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: guide.h1,
            description: guide.description,
            dateModified: GUIDES_UPDATED_ISO,
            inLanguage: "da-DK",
            mainEntityOfPage: absoluteUrl(path),
            author: { "@type": "Organization", name: SITE_NAME },
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
          faqJsonLd(guide.faq),
        ]}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Guider", to: "/guider" }, { name: guide.name }]} />
        <PageHeader eyebrow="Guide" h1={guide.h1} intro={guide.intro} />
        <p className="-mt-4 mb-10 text-sm text-muted-foreground">Opdateret {GUIDES_UPDATED}</p>

        <article className="space-y-10 text-foreground leading-relaxed">
          {guide.sections.map((s) => (
            <section key={s.h2} className="space-y-3">
              <h2 className="text-2xl font-bold">{s.h2}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.bullets && (
                <ul className="list-disc pl-6 space-y-1">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-bold text-foreground mb-4">Brug det i praksis</h2>
          <ul className="flex flex-wrap gap-2">
            {guide.related.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqList faq={guide.faq} />

        <section className="mt-12 text-sm text-muted-foreground space-y-2" aria-labelledby="sources-heading">
          {guide.note && <p className="text-foreground">{guide.note}</p>}
          <h2 id="sources-heading" className="font-semibold text-foreground">Kilder</h2>
          <ul className="list-disc pl-6 space-y-1">
            {guide.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="nofollow noopener" target="_blank" className="underline underline-offset-4">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p>Kilderne er læst den {GUIDES_UPDATED}.</p>
        </section>

        <SignupCta />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground mb-4">Flere guider</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((g) => (
              <li key={g.slug}>
                <Link
                  to={guidePath(g.slug)}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
};

export default GuidePage;
