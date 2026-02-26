import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const SUPABASE_URL = "https://baspsmhbbwxjrvcyahnp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhc3BzbWhiYnd4anJ2Y3lhaG5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NTQzNDMsImV4cCI6MjA1NjEzMDM0M30.nvzB-s-2h1e5CRNn8E_ANjwo8Ap4DKqlAdUWUaxvKdA";

const CTASection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/landing-signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ name, email, phone }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Noget gik galt");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Noget gik galt. Prøv igen.");
    } finally {
      setLoading(false);
    }
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
            Opret dig gratis — ingen kreditkort, ingen binding. Vi kontakter dig og sætter det hele op.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-md mx-auto bg-card rounded-3xl border border-border shadow-lg p-8"
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Tak, {name.split(" ")[0]}! 🎉</h3>
              <p className="text-muted-foreground">
                Tak! Du hører fra os inden for 1 hverdagsdag. Tjek din email for næste skridt.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Navn <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Dit fulde navn"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.dk"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Telefon <span className="text-muted-foreground text-xs">(valgfrit)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+45 12 34 56 78"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sender...</>
                ) : (
                  <>Opret gratis konto <ArrowRight className="w-5 h-5" /></>
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground pt-1">
                Ved at tilmelde dig accepterer du vores{" "}
                <a href="#" className="underline hover:text-foreground">vilkår</a>{" "}
                og{" "}
                <a href="#" className="underline hover:text-foreground">privatlivspolitik</a>.
              </p>
            </form>
          )}
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Ingen betalingskort. Ingen binding. Kom i gang på 15 minutter.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
