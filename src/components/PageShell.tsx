import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/lib/features";
import { PRICE_LINE, TRIAL_LINE } from "@/lib/site";

export const PageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export const Breadcrumbs = ({ items }: { items: { name: string; to?: string }[] }) => (
  <nav aria-label="Brødkrumme" className="text-sm text-muted-foreground mb-4">
    <ol className="flex flex-wrap items-center gap-1">
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {it.to ? (
            <Link to={it.to} className="inline-flex items-center min-h-[44px] px-1 hover:text-foreground underline-offset-4 hover:underline">
              {it.name}
            </Link>
          ) : (
            <span className="text-foreground inline-flex items-center min-h-[44px] px-1">{it.name}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export const PageHeader = ({
  eyebrow,
  h1,
  intro,
}: {
  eyebrow?: string;
  h1: string;
  intro: string;
}) => (
  <header className="mb-10">
    {eyebrow && (
      <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
        {eyebrow}
      </span>
    )}
    <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight mb-5">{h1}</h1>
    <p className="text-lg text-muted-foreground max-w-2xl">{intro}</p>
  </header>
);

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="container mx-auto px-4 pt-28 pb-16 max-w-4xl">{children}</div>
);

export const FaqList = ({ faq, heading = "Ofte stillede spørgsmål" }: { faq: Faq[]; heading?: string }) => (
  <section className="mt-14" aria-labelledby="faq-heading">
    <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-foreground mb-6">
      {heading}
    </h2>
    <div className="space-y-3">
      {faq.map((f) => (
        <details key={f.q} className="group bg-card border border-border rounded-xl px-5 py-4">
          <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between gap-4">
            <span>{f.q}</span>
            <span aria-hidden="true" className="text-primary group-open:rotate-45 transition-transform">+</span>
          </summary>
          <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  </section>
);

/** Sign-up call to action. Links to the existing sign-up form on the front page. */
export const SignupCta = ({ heading = "Prøv Toolboks gratis" }: { heading?: string }) => (
  <section className="mt-14 rounded-3xl bg-secondary/40 border border-border p-8 text-center">
    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{heading}</h2>
    <p className="text-muted-foreground mb-6">
      {TRIAL_LINE.charAt(0).toUpperCase() + TRIAL_LINE.slice(1)}. Bagefter {PRICE_LINE}. Ingen binding.
    </p>
    <Button variant="hero" size="xl" asChild>
      <a href="/#signup">
        Opret gratis konto
        <ArrowRight className="w-5 h-5" />
      </a>
    </Button>
  </section>
);
