import { coverage, fieldError, fmtKr, fmtPct, parseNumber, priceForCoverage } from "@/lib/calculators";
import { CopyLinkButton, Field, ResultRow, ToolLayout, useUrlState, Warning } from "./shared";

const DaekningsgradTool = () => {
  const [v, set] = useUrlState({ pris: "10000", variable: "6000", faste: "60000", maal: "50" });
  const errors = {
    pris: fieldError(v.pris, { gt: 0 }),
    variable: fieldError(v.variable, { min: 0 }),
    faste: fieldError(v.faste, { min: 0, required: false }),
    maal:
      fieldError(v.maal, { required: false }) ??
      (v.maal.trim() !== "" && ((parseNumber(v.maal) ?? 0) < 0 || (parseNumber(v.maal) ?? 0) >= 100)
        ? "Dækningsgraden skal være mellem 0 og 99,9 procent. 100 procent kan ikke nås, når der er omkostninger."
        : null),
  };
  const faste = parseNumber(v.faste);
  const result = errors.pris || errors.variable ? null : coverage({
    price: parseNumber(v.pris) ?? NaN,
    variableCosts: parseNumber(v.variable) ?? NaN,
    fixedCosts: errors.faste ? null : faste,
  });
  const target = errors.maal ? null : parseNumber(v.maal);
  const neededPrice =
    target !== null ? priceForCoverage(parseNumber(v.variable) ?? NaN, target) : null;

  return (
    <ToolLayout
      slug="daekningsgrad"
      intro="Hvor meget af prisen bliver tilbage, når materialer og andre omkostninger på jobbet er betalt? Tast tallene ind og se dækningsgraden med det samme."
      explanation={
        <>
          <h2 className="text-2xl font-bold">Sådan regner vi</h2>
          <p>
            <strong>Dækningsbidrag</strong> er salgsprisen minus de variable omkostninger. Det er det beløb, jobbet
            bidrager med til at betale dine faste omkostninger og give overskud.
          </p>
          <p>
            <strong>Dækningsgrad</strong> er dækningsbidraget som procent af salgsprisen. Formlen er (salgspris minus
            variable omkostninger) divideret med salgspris.
          </p>
          <p>
            Hvis du også taster dine faste omkostninger, kan du se <strong>break-even</strong>. Det er den omsætning pr.
            måned, hvor dækningsbidraget lige præcis dækker de faste omkostninger. Brug salgspris uden moms.
          </p>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Field
            id="pris"
            label="Salgspris uden moms"
            unit="kr"
            error={errors.pris}
            value={v.pris}
            onChange={(x) => set("pris", x)}
          />
          <Field
            id="variable"
            label="Variable omkostninger på jobbet"
            unit="kr"
            hint="Materialer, underleverandører, leje af maskiner og løn til dem, der udfører jobbet."
            error={errors.variable}
            value={v.variable}
            onChange={(x) => set("variable", x)}
          />
          <Field
            id="faste"
            label="Faste omkostninger pr. måned (valgfri)"
            unit="kr / md."
            hint="Bruges til at regne break-even."
            error={errors.faste}
            value={v.faste}
            onChange={(x) => set("faste", x)}
          />
          <Field
            id="maal"
            label="Ønsket dækningsgrad (valgfri)"
            unit="%"
            hint="Bruges til at regne den pris, der skal til."
            error={errors.maal}
            value={v.maal}
            onChange={(x) => set("maal", x)}
          />
        </div>
        <div aria-live="polite">
          <h2 className="text-lg font-semibold text-foreground mb-3">Resultat</h2>
          {result ? (
            <>
              <ResultRow big label="Dækningsgrad" value={fmtPct(result.ratioPct)} />
              <ResultRow label="Dækningsbidrag" value={fmtKr(result.contribution)} />
              {result.breakEvenRevenue !== null && (
                <ResultRow label="Break-even omsætning pr. måned" value={fmtKr(result.breakEvenRevenue)} />
              )}
              {neededPrice !== null && (
                <ResultRow
                  label={`Pris for ${fmtPct(target as number)} dækningsgrad`}
                  value={fmtKr(neededPrice)}
                />
              )}
              {result.ratioPct < 0 && (
                <Warning>
                  Advarsel: Jobbet giver underskud. De variable omkostninger er højere end salgsprisen, så hvert salg
                  koster dig penge, før de faste omkostninger er regnet med.
                </Warning>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">Ret felterne til venstre, så vises dækningsgraden her.</p>
          )}
          <div className="mt-6">
            <CopyLinkButton />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default DaekningsgradTool;
