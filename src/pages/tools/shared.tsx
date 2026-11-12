import { useCallback, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Link2 } from "lucide-react";
import Seo, { breadcrumbJsonLd, faqJsonLd } from "@/components/Seo";
import { Breadcrumbs, Container, FaqList, PageHeader, PageShell, SignupCta } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { TOOLS, TOOL_FAQ, getTool, toolPath } from "@/lib/tools";

/** Form state that lives in the URL, so a result can be shared as a link. */
export function useUrlState<K extends string>(defaults: Record<K, string>) {
  const [params, setParams] = useSearchParams();
  const values = {} as Record<K, string>;
  (Object.keys(defaults) as K[]).forEach((k) => {
    values[k] = params.get(k) ?? defaults[k];
  });
  const set = useCallback(
    (key: K, value: string) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(key, value);
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );
  return [values, set] as const;
}

export const Field = ({
  id,
  label,
  hint,
  unit,
  value,
  onChange,
  error,
}: {
  id: string;
  error?: string | null;
  label: string;
  hint?: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
      {label}
    </label>
    <div className="flex items-center gap-2">
      <input
        id={id}
        name={id}
        inputMode="decimal"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl border bg-background ${error ? "border-destructive" : "border-border"} text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition`}
      />
      <span className="text-muted-foreground text-sm w-20 flex-shrink-0">{unit}</span>
    </div>
    {error && (
      <p id={`${id}-error`} role="alert" className="text-sm text-destructive mt-1.5">
        {error}
      </p>
    )}
    {hint && <p className="text-xs text-muted-foreground mt-1.5">{hint}</p>}
  </div>
);

export const ResultRow = ({ label, value, big = false }: { label: string; value: string; big?: boolean }) => (
  <div className="flex items-baseline justify-between gap-4 py-2 border-b border-border last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className={big ? "text-3xl font-bold text-foreground" : "text-lg font-semibold text-foreground"}>
      {value}
    </span>
  </div>
);

export const Warning = ({ children }: { children: ReactNode }) => (
  <p role="status" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-foreground">
    {children}
  </p>
);

export const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available, the address bar link still works */
    }
  };
  return (
    <Button type="button" variant="heroOutline" onClick={copy}>
      {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      {copied ? "Link kopieret" : "Kopier link til dit resultat"}
    </Button>
  );
};

export const ToolLayout = ({
  slug,
  intro,
  children,
  explanation,
}: {
  slug: string;
  intro: string;
  children: ReactNode;
  explanation: ReactNode;
}) => {
  const tool = getTool(slug);
  const path = toolPath(slug);
  const faq = TOOL_FAQ[slug];
  const others = TOOLS.filter((t) => t.slug !== slug);
  return (
    <PageShell>
      <Seo
        title={tool.title}
        description={tool.description}
        path={path}
        jsonLd={[
          breadcrumbJsonLd([
            { name: "Forside", path: "/" },
            { name: "Værktøjer", path: "/vaerktoej" },
            { name: tool.name, path },
          ]),
          faqJsonLd(faq),
        ]}
      />
      <Container>
        <Breadcrumbs items={[{ name: "Forside", to: "/" }, { name: "Værktøjer", to: "/vaerktoej" }, { name: tool.name }]} />
        <PageHeader eyebrow="Gratis værktøj" h1={tool.h1} intro={intro} />
        <div className="bg-card border border-border rounded-3xl shadow-card p-6 md:p-8">{children}</div>
        <p className="text-xs text-muted-foreground mt-3">
          Tallene i felterne er kun et eksempel. Ret dem til dine egne tal. Du skal ikke logge ind, og vi gemmer ikke
          det, du taster.
        </p>
        <section className="mt-12 space-y-4 text-foreground leading-relaxed">{explanation}</section>
        <FaqList faq={faq} />
        <SignupCta heading="Spar tid på admin med Toolboks" />
        <section className="mt-14">
          <h2 className="text-xl font-bold text-foreground mb-4">Flere gratis værktøjer</h2>
          <ul className="flex flex-wrap gap-2">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  to={toolPath(t.slug)}
                  className="inline-flex items-center min-h-[44px] px-4 rounded-full border border-border bg-card text-sm text-foreground hover:border-primary"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </PageShell>
  );
};
