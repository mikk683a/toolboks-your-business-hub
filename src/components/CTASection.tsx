import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const BOOKING_URL = "https://cal.com/mikkel-ovesen-9jlpze/toolboks-onboarding";

const CTASection = () => {
  const [step, setStep] = useState<"idle" | "form" | "success">("idle");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Send to admin email as a simple notification
    // TODO: Replace with actual Supabase insert + email notification once app is wired
    await new Promise((r) => setTimeout(r, 800)); // Simulated delay
    setLoading(false);
    setStep("success");
  };

  return (
    <section id="signup" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {step === "idle" && (
              <>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                  Klar til at tage kontrol over din forretning?
                </h2>
                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                  Tilmeld dig gratis og få 3 måneder på os. Vi hjælper dig personligt med at komme i gang.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="xl"
                    className="bg-card text-foreground hover:bg-card/90 shadow-lg hover:shadow-xl"
                    onClick={() => setStep("form")}
                  >
                    Start gratis prøveperiode
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                  <Button
                    size="xl"
                    variant="ghost"
                    className="text-primary-foreground border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    onClick={() => window.location.href = BOOKING_URL}
                  >
                    Book et opkald
                  </Button>
                </div>
              </>
            )}

            {step === "form" && (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                  Kom i gang gratis
                </h2>
                <p className="text-primary-foreground/80 mb-6 text-sm">
                  Udfyld formularen og vi kontakter dig inden for 24 timer for at booke dit onboarding-opkald.
                </p>
                <div className="space-y-3 mb-6">
                  <input
                    type="text"
                    required
                    placeholder="Dit navn"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Din e-mail"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 backdrop-blur-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Dit telefonnummer (valgfrit)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 backdrop-blur-sm"
                  />
                </div>
                <Button
                  type="submit"
                  size="xl"
                  disabled={loading}
                  className="w-full bg-card text-foreground hover:bg-card/90 shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Send tilmelding
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
                <p className="text-white/50 text-xs mt-3">
                  Ingen betalingskort. Ingen binding. Afmeld når som helst.
                </p>
              </form>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8"
              >
                <CheckCircle className="w-16 h-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
                  Tak, {form.name.split(" ")[0]}! 🎉
                </h2>
                <p className="text-primary-foreground/90 text-lg">
                  Vi kontakter dig på <strong>{form.email}</strong> inden for 24 timer for at booke dit onboarding-opkald.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
