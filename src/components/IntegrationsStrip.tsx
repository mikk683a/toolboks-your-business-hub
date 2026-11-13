const BOOKKEEPING = [
  { name: "Billy", live: true },
  { name: "Dinero", live: false },
  { name: "e-conomic", live: false },
];

const IntegrationsStrip = () => (
  <section className="py-12" aria-labelledby="virker-med-title">
    <div className="container mx-auto px-4 max-w-3xl text-center">
      <h2 id="virker-med-title" className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        Virker med det, du har
      </h2>
      <p className="text-muted-foreground mb-6">Send fakturaer videre til bogholderiet, og hent timer til løn.</p>
      <div className="grid gap-4 sm:grid-cols-2 text-left">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Bogholderi</h3>
          <ul className="flex flex-wrap gap-2">
            {BOOKKEEPING.map((n) => (
              <li
                key={n.name}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 font-medium ${
                  n.live ? "border-accent/50 bg-accent/10 text-foreground" : "border-dashed border-border text-muted-foreground"
                }`}
              >
                {n.name}
                {!n.live && (
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-xs font-semibold text-warning">
                    Kommer snart
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">Billy virker i dag. Dinero og e-conomic kommer snart.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Løn</h3>
          <p className="inline-flex min-h-[44px] items-center rounded-full border border-accent/50 bg-accent/10 px-4 font-medium text-foreground">
            CSV til dit lønsystem
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default IntegrationsStrip;
