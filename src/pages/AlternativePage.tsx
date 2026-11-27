import { Link, useParams } from "react-router-dom";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, FaqList, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { ALTERNATIVES, CHECKED, alternativePath, getAlternative } from "@/lib/alternatives";
import NotFound from "./NotFound";

const AlternativePage = ({ slug: slugProp }: { slug?: string }) => {
  const params = useParams();
  const alt = getAlternative(slugProp ?? params.slug);
  if (!alt) return <NotFound />;
  const path = alternativePath(alt.slug);
  const others = ALTERNATIVES.filter((a) => a.slug !== alt.slug);

  return (
    <PageShell>
      <Seo
        title={alt.title}
        description={alt.description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: alt.h1, path },
          ]),
          faqJsonLd(alt.faq),
        ]}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: alt.h1 }]} />
        <PageHeader eyebrow={`Toolboks og ${alt.name}`} h1={alt.h1} intro={alt.intro} />

        <section aria-labelledby="compare-heading">
          <h2 id="compare-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-5">
            Toolboks og {alt.name} side om side
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
            <table className="w-full text-left text-sm md:text-base">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="p-4 font-semibold text-muted-foreground w-1/5"><span className="sr-only">Emne</span></th>
                  <th scope="col" className="p-4 font-semibold text-foreground">{alt.name}</th>
                  <th scope="col" className="p-4 font-semibold text-primary">Toolboks</th>
                </tr>
              </thead>
              <tbody>
                {alt.rows.map((r) => (
                  <tr key={r.label} className="border-b border-border last:border-0 align-top">
                    <th scope="row" className="p-4 font-semibold text-foreground">{r.label}</th>
                    <td className="p-4 text-muted-foreground">{r.them}</td>
                    <td className="p-4 text-foreground">{r.us}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Oplysningerne om {alt.name} er fra{" "}
            <a href={alt.source.url} rel="nofollow noopener" target="_blank" className="underline underline-offset-4">
              {alt.source.label}
            </a>{" "}
            den {CHECKED}. Priser og vilkår kan have ændret sig siden.
          </p>
        </section>

        <section className="mt-14 grid gap-4 md:grid-cols-2" aria-label="Hvem passer hvad til">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">Vælg {alt.name}, hvis</h2>
            <p className="text-muted-foreground leading-relaxed">{alt.suitsThem}</p>
          </div>
          <div className="bg-card border border-primary/40 rounded-2xl p-6 shadow-card">
            <h2 className="text-lg font-semibold text-foreground mb-2">Vælg Toolboks, hvis</h2>
            <p className="text-muted-foreground leading-relaxed">{alt.suitsUs}</p>
          </div>
        </section>

        <FaqList faq={alt.faq} />
        <SignupCta heading={`Prøv Toolboks ved siden af ${alt.name}`} />

        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground mb-4">Andre sammenligninger</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((a) => (
              <li key={a.slug}>
                <Link
                  to={alternativePath(a.slug)}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {a.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
};

export default AlternativePage;
