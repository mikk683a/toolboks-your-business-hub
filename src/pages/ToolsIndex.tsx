import { Link } from "react-router-dom";
import Seo, { breadcrumbJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { TOOLS, toolPath } from "@/lib/tools";

const ToolsIndex = () => (
  <PageShell>
    <Seo
      title="Gratis værktøjer til servicefirmaer | Toolboks"
      description="Tre gratis regnemaskiner: beregn din timepris, din dækningsgrad og hvad din admin-tid koster. Uden login. Del resultatet med et link."
      path="/vaerktoej"
      jsonLd={[breadcrumbJsonLd([{ name: "Forside", path: "/" }, { name: "Værktøjer", path: "/vaerktoej" }])]}
    />
    <Container>
      <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Værktøjer" }]} />
      <PageHeader
        eyebrow="Gratis værktøjer"
        h1="Regn på din forretning"
        intro="Tre enkle regnemaskiner til dig, der driver en lille virksomhed. Du skal ikke logge ind. Resultatet opdateres, mens du taster, og du kan dele det med et link."
      />
      <div className="grid gap-4">
        {TOOLS.map((t) => (
          <Link
            key={t.slug}
            to={toolPath(t.slug)}
            className="block bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2">{t.name}</h2>
            <p className="text-muted-foreground">{t.teaser}</p>
          </Link>
        ))}
      </div>
      <section className="mt-12 space-y-3 text-foreground leading-relaxed">
        <h2 className="text-2xl font-bold">Sådan bruger du værktøjerne</h2>
        <p>
          Hvert værktøj har eksempeltal i felterne. Ret dem til dine egne tal, og resultatet opdateres med det samme.
          Du kan kopiere linket til dit resultat og sende det til din revisor, din partner eller en kollega.
        </p>
        <p>
          Værktøjerne er til at få overblik. De erstatter ikke dit regnskab, og de kender ikke dine konkurrenter eller
          din lokale prisstigning. Brug dem som et godt udgangspunkt, når du skal prissætte og planlægge.
        </p>
      </section>
      <SignupCta />
    </Container>
  </PageShell>
);

export default ToolsIndex;
