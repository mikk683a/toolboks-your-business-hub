import { Link } from "react-router-dom";
import { TRADES, tradePath } from "@/lib/trades";

const BranchesSection = () => (
  <section id="brancher" className="py-20 lg:py-28 bg-secondary/30">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
          Brancher
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Lavet til dem, der <span className="text-gradient">kører ud til kunden</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Toolboks er til virksomheder med 1 til 20 medarbejdere. Vælg din branche og se, hvad Toolboks kan gøre for
          dig.
        </p>
      </div>
      <ul className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {TRADES.map((t) => (
          <li key={t.slug}>
            <Link
              to={tradePath(t.slug)}
              className="inline-flex items-center min-h-[44px] px-5 rounded-full border border-border bg-card text-foreground font-medium hover:border-primary hover:text-primary transition-colors"
            >
              {t.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-center mt-8">
        <Link to="/brancher" className="inline-flex items-center min-h-[44px] px-2 text-primary font-medium underline-offset-4 hover:underline">
          Se alle brancher
        </Link>
      </p>
    </div>
  </section>
);

export default BranchesSection;
