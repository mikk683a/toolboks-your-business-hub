import { fieldError, fmtKr, hourlyRate, parseNumber } from "@/lib/calculators";
import { CopyLinkButton, Field, ResultRow, ToolLayout, useUrlState } from "./shared";

const TimeprisTool = () => {
  const [v, set] = useUrlState({ faste: "60000", overskud: "15000", timer: "120" });
  const result = hourlyRate({
    fixedCosts: parseNumber(v.faste) ?? NaN,
    desiredProfit: parseNumber(v.overskud) ?? NaN,
    billableHours: parseNumber(v.timer) ?? NaN,
  });

  const errors = {
    faste: fieldError(v.faste, { min: 0 }),
    overskud: fieldError(v.overskud, { min: 0 }),
    timer: fieldError(v.timer, { gt: 0 }),
  };

  return (
    <ToolLayout
      slug="timepris"
      intro="Hvad skal en time koste, for at du kan betale dine regninger og få det overskud, du ønsker? Tast dine tal ind, og se svaret med det samme."
      explanation={
        <>
          <h2 className="text-2xl font-bold">Sådan regner vi</h2>
          <p>
            Formlen er enkel: <strong>(faste omkostninger + ønsket overskud) / fakturerbare timer</strong>. Faste
            omkostninger er alt, du skal betale hver måned, uanset hvor travlt du har. Det er løn, bil, forsikring,
            leasing, værktøj, software og telefon.
          </p>
          <p>
            Fakturerbare timer er de timer, du faktisk kan sende regning for. Kørsel, tilbud og administration tæller
            ikke med. Mange regner med for mange timer, og så bliver timeprisen for lav.
          </p>
          <p>
            Prisen uden moms er det beløb, din virksomhed skal have ind. Prisen med moms er det, en privatkunde ser på
            regningen. Moms er 25 procent.
          </p>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Field
            id="faste"
            label="Faste omkostninger pr. måned"
            unit="kr / md."
            hint="Løn til dig og dine ansatte, bil, forsikring, leasing, software, telefon."
            error={errors.faste}
            value={v.faste}
            onChange={(x) => set("faste", x)}
          />
          <Field
            id="overskud"
            label="Ønsket overskud pr. måned"
            unit="kr / md."
            error={errors.overskud}
            value={v.overskud}
            onChange={(x) => set("overskud", x)}
          />
          <Field
            id="timer"
            label="Fakturerbare timer pr. måned"
            unit="timer / md."
            hint="Kun timer du kan sende regning for. Træk kørsel og admin fra."
            error={errors.timer}
            value={v.timer}
            onChange={(x) => set("timer", x)}
          />
        </div>
        <div aria-live="polite">
          <h2 className="text-lg font-semibold text-foreground mb-3">Din timepris</h2>
          {result ? (
            <>
              <ResultRow big label="Timepris uden moms" value={fmtKr(result.rateExVat, 2)} />
              <ResultRow label="Timepris med moms" value={fmtKr(result.rateInclVat, 2)} />
              <ResultRow label="Omsætning pr. måned der skal til" value={fmtKr(result.monthlyRevenue)} />
            </>
          ) : (
            <p className="text-muted-foreground">
              Ret felterne til venstre, så vises timeprisen her.
            </p>
          )}
          <div className="mt-6">
            <CopyLinkButton />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TimeprisTool;
