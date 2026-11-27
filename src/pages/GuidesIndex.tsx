import { Link } from "react-router-dom";
import Seo, { breadcrumbJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { GUIDES, guidePath } from "@/lib/guides";

const GuidesIndex = () => (
  <PageShell>
    <Seo
      title="Guider til håndværkere og servicefirmaer | Toolboks"
      description="Korte guider om timepris, registrering af arbejdstid og priser på tagpap. Skrevet til små firmaer, der kører ud til kunden. Med kilder."
      path="/guider"
      jsonLd={[breadcrumbJsonLd([{ name: "Forside", path: "/" }, { name: "Guider", path: "/guider" }])]}
    />
    <Container>
      <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Guider" }]} />
      <PageHeader
        eyebrow="Guider"
        h1="Guider til dig, der driver et lille firma"
        intro="Korte svar på det, ejere af små håndværks- og servicefirmaer spørger om. Hver guide har kilder og et link til et gratis værktøj, du kan regne videre i."
      />
      <div className="grid gap-4">
        {GUIDES.map((g) => (
          <Link
            key={g.slug}
            to={guidePath(g.slug)}
            className="block bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow"
          >
            <h2 className="text-xl font-semibold text-foreground mb-2">{g.name}</h2>
            <p className="text-muted-foreground">{g.teaser}</p>
          </Link>
        ))}
      </div>
      <SignupCta />
    </Container>
  </PageShell>
);

export default GuidesIndex;
