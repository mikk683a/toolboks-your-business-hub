import { Link } from "react-router-dom";
import Seo, { breadcrumbJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { TRADES, tradePath } from "@/lib/trades";

const TradesIndex = () => (
  <PageShell>
    <Seo
      title="Brancher | Administration til håndværkere og servicefirmaer | Toolboks"
      description="Toolboks er lavet til små servicevirksomheder, der kører ud til kunder. Se hvordan det hjælper træfældere, gartnere, malere, tømrere, murere og flere."
      path="/brancher"
      jsonLd={[breadcrumbJsonLd([{ name: "Forside", path: "/" }, { name: "Brancher", path: "/brancher" }])]}
    />
    <Container>
      <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Brancher" }]} />
      <PageHeader
        eyebrow="Brancher"
        h1="Toolboks til din type virksomhed"
        intro="Toolboks er til virksomheder med 1 til 20 medarbejdere, der kører ud til kunderne. Vælg din branche og se, hvad der kan gøre hverdagen lettere."
      />
      <div className="grid sm:grid-cols-2 gap-4">
        {TRADES.map((t) => (
          <Link
            key={t.slug}
            to={tradePath(t.slug)}
            className="block bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.name}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.intro}</p>
            <span className="inline-block mt-4 text-primary font-medium text-sm">
              Læs mere om Toolboks til {t.audience}
            </span>
          </Link>
        ))}
      </div>
      <section className="mt-14">
        <h2 className="text-2xl font-bold text-foreground mb-3">Driver du en anden type virksomhed?</h2>
        <p className="text-muted-foreground">
          Toolboks passer til de fleste, der kører ud til kunder og skal sende tilbud, planlægge jobs og sende
          fakturaer. Opret en gratis konto og se, om det passer til dig.
        </p>
      </section>
      <SignupCta />
    </Container>
  </PageShell>
);

export default TradesIndex;
