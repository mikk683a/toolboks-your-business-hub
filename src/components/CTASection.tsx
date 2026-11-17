import { useState } from "react";
import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { APP_URL, TRIAL_MONTHS } from "@/lib/site";
import { MIN_PASSWORD, createAccount, providerUrl, type LoginProvider } from "@/lib/signup";

const field = "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition";
const PROVIDERS: { id: LoginProvider; name: string; cls: string }[] = [
  { id: "apple", name: "Apple", cls: "bg-foreground text-background hover:bg-foreground/90" },
  { id: "google", name: "Google", cls: "border border-border bg-card text-foreground hover:bg-secondary" },
  { id: "microsoft", name: "Microsoft", cls: "border border-border bg-card text-foreground hover:bg-secondary" },
];

// The same form as "Opret konto" in the app: it creates the account right away.
const CTASection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const problem = await createAccount({ fullName, email, password, company });
    setLoading(false);
    if (problem) setError(problem);
    else setSentTo(email.trim());
  };

  return (
    <section id="signup" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Klar til at komme i gang?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Opret din konto her. Gratis i {TRIAL_MONTHS} måneder, uden betalingskort og uden binding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto bg-card rounded-3xl border border-border shadow-lg p-8"
        >
          {sentTo ? (
            <div className="text-center py-6" role="status">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MailCheck className="w-8 h-8 text-accent" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Tjek din e-mail</h3>
              <p className="text-muted-foreground">
                Vi har sendt et bekræftelseslink til <strong className="break-all text-foreground">{sentTo}</strong>. Åbn linket, så er du inde i Toolboks. Tjek også din spammappe.
              </p>
              <a href={`${APP_URL}/auth`} className="mt-5 inline-block font-semibold text-primary underline-offset-4 hover:underline">Har du allerede bekræftet? Log ind</a>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="signup-name" className="block text-sm font-medium text-foreground mb-1.5">Fulde navn</label>
                  <input id="signup-name" type="text" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Dit navn" required className={field} />
                </div>
                <div>
                  <label htmlFor="signup-email" className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
                  <input id="signup-email" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="din@email.dk" required className={field} />
                </div>
                <div>
                  <label htmlFor="signup-password" className="block text-sm font-medium text-foreground mb-1.5">Adgangskode</label>
                  <input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={`Mindst ${MIN_PASSWORD} tegn`} minLength={MIN_PASSWORD} required className={field} />
                </div>
                <div>
                  <label htmlFor="signup-company" className="block text-sm font-medium text-foreground mb-1.5">Firmanavn</label>
                  <input id="signup-company" type="text" autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Jensens Haveservice" required className={field} />
                </div>

                {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

                <Button type="submit" variant="hero" size="xl" className="w-full" disabled={loading}>
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Opretter…</>
                  ) : (
                    <>Opret konto <ArrowRight className="w-5 h-5" /></>
                  )}
                </Button>
              </form>

              <p className="my-5 flex items-center gap-3 text-sm text-muted-foreground" aria-hidden="true"><span className="h-px flex-1 bg-border" />eller<span className="h-px flex-1 bg-border" /></p>

              <div className="space-y-2.5">
                {PROVIDERS.map((p) => (
                  <a key={p.id} href={providerUrl(p.id)} className={`flex h-12 w-full items-center justify-center rounded-xl text-sm font-semibold transition-colors ${p.cls}`}>
                    Fortsæt med {p.name}
                  </a>
                ))}
              </div>

              <p className="text-center text-xs text-muted-foreground pt-5">
                Ved at oprette en konto accepterer du vores{" "}
                <Link to="/vilkaar" className="underline hover:text-foreground">vilkår</Link>{" "}
                og{" "}
                <Link to="/privatliv" className="underline hover:text-foreground">privatlivspolitik</Link>.
              </p>
              <p className="text-center text-sm text-muted-foreground pt-3">
                Har du allerede en konto? <a href={`${APP_URL}/auth`} className="font-semibold text-primary underline-offset-4 hover:underline">Log ind</a>
              </p>
            </>
          )}
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Ingen betalingskort. Ingen binding. Vi hjælper dig i gang, gratis.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
