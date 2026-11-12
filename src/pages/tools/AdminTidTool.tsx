import { adminTimeCost, fmtKr, fmtNum, parseNumber } from "@/lib/calculators";
import { CopyLinkButton, Field, ResultRow, ToolLayout, useUrlState } from "./shared";

const AdminTidTool = () => {
  const [v, set] = useUrlState({ timer: "6", vaerdi: "550", personer: "1" });
  const result = adminTimeCost({
    hoursPerWeek: parseNumber(v.timer) ?? NaN,
    hourValue: parseNumber(v.vaerdi) ?? NaN,
    people: parseNumber(v.personer) ?? NaN,
  });

  return (
    <ToolLayout
      slug="admin-tid"
      intro="Tilbud, fakturaer, beskeder og planlægning tager tid. Tid du ikke kan sende regning for. Her kan du se, hvad den tid koster dig hver måned."
      explanation={
        <>
          <h2 className="text-2xl font-bold">Sådan regner vi</h2>
          <p>
            Vi ganger dine admin-timer pr. uge med 52 / 12 uger pr. måned, antal personer og værdien af en time.
            Resultatet er, hvad tiden koster pr. måned og pr. år.
          </p>
          <p>
            Brug din timepris som værdi, hvis du kunne have brugt tiden på betalt arbejde. Brug din egen løn pr. time,
            hvis du ikke kunne have fået mere arbejde.
          </p>
          <p>
            Beløbet er ikke en lovet besparelse. Det viser, hvad tiden koster i dag. Så kan du selv vurdere, hvad det
            er værd at gøre admin lettere.
          </p>
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <Field
            id="timer"
            label="Admin-timer pr. uge, pr. person"
            unit="timer / uge"
            hint="Tilbud, fakturaer, beskeder, kalender, timer til løn."
            value={v.timer}
            onChange={(x) => set("timer", x)}
          />
          <Field
            id="vaerdi"
            label="Hvad er en time værd?"
            unit="kr / time"
            hint="Din timepris, eller din egen løn pr. time."
            value={v.vaerdi}
            onChange={(x) => set("vaerdi", x)}
          />
          <Field
            id="personer"
            label="Antal personer, der bruger tid på admin"
            unit="personer"
            value={v.personer}
            onChange={(x) => set("personer", x)}
          />
        </div>
        <div aria-live="polite">
          <h2 className="text-lg font-semibold text-foreground mb-3">Hvad admin koster</h2>
          {result ? (
            <>
              <ResultRow big label="Pr. måned" value={fmtKr(result.costPerMonth)} />
              <ResultRow label="Pr. år" value={fmtKr(result.costPerYear)} />
              <ResultRow label="Timer pr. måned" value={`${fmtNum(result.hoursPerMonth)} timer`} />
              <ResultRow label="Værdi af 1 time mindre admin pr. uge, pr. måned" value={fmtKr(result.oneHourLessPerMonth)} />
            </>
          ) : (
            <p className="text-muted-foreground">Udfyld alle felter med tal. Antal personer skal være mere end 0.</p>
          )}
          <div className="mt-6">
            <CopyLinkButton />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default AdminTidTool;
