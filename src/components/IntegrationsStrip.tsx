const BOOKKEEPING = ["Dinero", "Billy", "e-conomic"];

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
              <li key={n} className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-medium text-foreground">
                {n}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <h3 className="font-semibold text-foreground mb-3">Løn</h3>
          <p className="inline-flex min-h-[44px] items-center rounded-full border border-border px-4 font-medium text-foreground">
            CSV til dit lønsystem
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default IntegrationsStrip;
