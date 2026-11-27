import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import Seo, { breadcrumbJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ROOF_TOOL, ROOF_TOOL_LIVE, toolPath } from "@/lib/tools";
import { APP_PUBLIC_KEY } from "@/lib/site";

// Calls the public roof-public edge function in the app's Supabase project.
// It answers { enabled } on GET and is off until the Dataforsyningen token is set.
export const ROOF_ENDPOINT = "https://saybnismxzpjkahlymnm.supabase.co/functions/v1/roof-public";

interface RoofResult {
  address: string;
  image: string | null;
  width: number;
  height: number;
  outline: [number, number][] | null;
  planArea: number | null;
  roofArea: number | null;
  pitch: number | null;
  flat: boolean | null;
}

const nf = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 });
const headers = { apikey: APP_PUBLIC_KEY, "Content-Type": "application/json" };

const MaalDitTagTool = () => {
  const path = toolPath(ROOF_TOOL.slug);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<RoofResult | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(ROOF_ENDPOINT, { headers: { apikey: APP_PUBLIC_KEY } })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((j) => alive && setEnabled(j?.enabled === true))
      .catch(() => alive && setEnabled(false));
    return () => {
      alive = false;
    };
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch(ROOF_ENDPOINT, { method: "POST", headers, body: JSON.stringify({ address }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) setError(typeof j?.error === "string" ? j.error : "Målingen fejlede. Prøv igen.");
      else setResult(j as RoofResult);
    } catch {
      setError("Vi kunne ikke få forbindelse. Prøv igen om lidt.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <Seo
        title={ROOF_TOOL.title}
        description={ROOF_TOOL.description}
        path={path}
        noindex={!ROOF_TOOL_LIVE}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: "Værktøjer", path: "/vaerktoej" },
            { name: ROOF_TOOL.name, path },
          ]),
        ]}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Værktøjer", to: "/vaerktoej" }, { name: ROOF_TOOL.name }]} />
        <PageHeader
          eyebrow="Gratis værktøj"
          h1={ROOF_TOOL.h1}
          intro="Skriv en adresse, så finder vi taget i Danmarks Højdemodel og viser det på luftfoto med areal og hældning. Gratis og uden login."
        />

        <div className="bg-card border border-border rounded-3xl shadow-card p-6 md:p-8">
          {enabled === false ? (
            <div className="space-y-3" data-testid="roof-off">
              <h2 className="text-xl font-semibold text-foreground">Værktøjet åbner snart</h2>
              <p className="text-muted-foreground">
                Tagmåling fra luftfoto findes allerede i Toolboks til tagdækkere. Den gratis udgave her åbner snart.
              </p>
              <Link to="/brancher/tag" className="underline underline-offset-4 text-foreground">
                Se Toolboks til tagdækkere
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <label htmlFor="roof-address" className="block font-semibold text-foreground">
                Adresse
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="roof-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Vejnavn 12, 8000 Aarhus C"
                  autoComplete="street-address"
                  className="flex-1 min-h-[48px] rounded-xl border border-border bg-background px-4 text-foreground"
                  maxLength={200}
                  required
                />
                <Button type="submit" variant="hero" size="lg" disabled={busy || enabled !== true}>
                  {busy ? "Måler taget ..." : "Mål taget"}
                </Button>
              </div>
              {busy && <p className="text-sm text-muted-foreground">Vi henter luftfoto og højdedata. Det tager op til 20 sekunder.</p>}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </form>
          )}

          {result && (
            <div className="mt-8 grid md:grid-cols-2 gap-6 items-start" data-testid="roof-result">
              {result.image ? (
                <svg
                  viewBox={`0 0 ${result.width} ${result.height}`}
                  className="w-full rounded-2xl border border-border"
                  role="img"
                  aria-label={`Luftfoto af ${result.address} med tagets omrids`}
                >
                  <image href={result.image} width={result.width} height={result.height} />
                  {result.outline && (
                    <polygon
                      points={result.outline.map((p) => p.join(",")).join(" ")}
                      fill="rgba(250, 204, 21, 0.25)"
                      stroke="#facc15"
                      strokeWidth={Math.max(2, result.width / 250)}
                    />
                  )}
                </svg>
              ) : (
                <p className="text-muted-foreground">Luftfotoet kunne ikke hentes lige nu.</p>
              )}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{result.address}</p>
                {result.roofArea !== null ? (
                  <>
                    <p className="text-4xl font-bold text-foreground">ca. {nf.format(result.roofArea)} m²</p>
                    <p className="text-foreground">Tagflade med hældning</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>Set ovenfra: ca. {nf.format(result.planArea ?? 0)} m²</li>
                      <li>{result.flat ? "Fladt tag" : `Hældning: ca. ${result.pitch} grader`}</li>
                    </ul>
                  </>
                ) : (
                  <p className="text-foreground">
                    Vi kunne ikke finde taget automatisk. Det sker ved tæt bebyggelse eller store træer over taget.
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Målingen er et overslag. Mål altid efter, før du giver en fast pris. Luftfoto og højdemodel: Klimadatastyrelsen via Dataforsyningen.
                </p>
              </div>
            </div>
          )}
        </div>

        <section className="mt-12 space-y-4 text-foreground leading-relaxed">
          <h2 className="text-2xl font-bold">Sådan måler vi</h2>
          <p>
            Danmarks Højdemodel viser, hvor højt alt står over terrænet. Vi finder bygningen ved adressen, tegner tagets omrids
            og regner arealet ud fra hældningen i hvert punkt. Derfor er tagfladen større end huset set ovenfra, når taget hælder.
          </p>
          <p>
            Vil du vide, hvad et nyt paptag koster pr. m², så læs{" "}
            <Link to="/guider/tagpap-pris-pr-m2" className="underline underline-offset-4">
              guiden om tagpap
            </Link>
            .
          </p>
        </section>

        <SignupCta heading="Få tagmålingen direkte i dine tilbud" />
      </Container>
    </PageShell>
  );
};

export default MaalDitTagTool;
