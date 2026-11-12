import { coverage, fmtKr, fmtPct, parseNumber, priceForCoverage } from "@/lib/calculators";
import { CopyLinkButton, Field, ResultRow, ToolLayout, useUrlState } from "./shared";

const DaekningsgradTool = () => {
  const [v, set] = useUrlState({ pris: "10000", variable: "6000", faste: "60000", maal: "50" });
  const faste = parseNumber(v.faste);
  const result = coverage({
    price: parseNumber(v.pris) ?? NaN,
    variableCosts: parseNumber(v.variable) ?? NaN,
    fixedCosts: faste,
  });
  const target = parseNumber(v.maal);
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
            value={v.pris}
            onChange={(x) => set("pris", x)}
          />
          <Field
            id="variable"
            label="Variable omkostninger på jobbet"
            unit="kr"
            hint="Materialer, underleverandører, leje af maskiner og løn til dem, der udfører jobbet."
            value={v.variable}
            onChange={(x) => set("variable", x)}
          />
          <Field
            id="faste"
            label="Faste omkostninger pr. måned (valgfri)"
            unit="kr / md."
            hint="Bruges til at regne break-even."
            value={v.faste}
            onChange={(x) => set("faste", x)}
          />
          <Field
            id="maal"
            label="Ønsket dækningsgrad (valgfri)"
            unit="%"
            hint="Bruges til at regne den pris, der skal til."
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
            </>
          ) : (
            <p className="text-muted-foreground">Udfyld salgspris og variable omkostninger. Salgsprisen skal være mere end 0.</p>
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
