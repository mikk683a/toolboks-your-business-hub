import { Gift, Phone, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Tidlig adgang
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Vær med fra{" "}
            <span className="text-gradient">starten</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toolboks er i tidlig adgang. Tilmeld dig gratis og vær med til at forme produktet — din feedback betyder alt.
          </p>
        </motion.div>

        {/* Early Access Highlights */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              icon: Gift,
              title: "3 måneder gratis",
              description: "Ingen betalingskort kræves. Prøv alt i 3 måneder helt gratis.",
            },
            {
              icon: Phone,
              title: "Personlig onboarding",
              description: "Book et gratis opkald med os. Vi hjælper dig i gang og sætter det op til din forretning.",
            },
            {
              icon: MessageSquare,
              title: "Din mening tæller",
              description: "Som early-access bruger er din feedback med til at forme de næste funktioner.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><item.icon className="w-7 h-7" /></div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
