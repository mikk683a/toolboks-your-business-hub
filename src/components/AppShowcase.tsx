import { motion } from "framer-motion";
import leadsImage from "@/assets/leads-screen.png";
import jobsImage from "@/assets/jobs-screen.png";

const AppShowcase = () => {
  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Built for <span className="text-gradient">tradespeople</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature designed with your workflow in mind. Simple to use, powerful when you need it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Leads Screen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl shadow-card p-4 md:p-6 border border-border">
              <img
                src={leadsImage}
                alt="Leads Management Screen"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Never lose a lead again
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              All your leads organized in one place. Filter by status, see contact details, 
              and take action with one tap. Send quotes, make calls, or schedule jobs instantly.
            </p>
            <ul className="space-y-4">
              {[
                "Filter leads by status (New, Quote Sent, Won, Lost)",
                "One-tap calling and SMS",
                "Quick quote generation",
                "Full contact history",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    ✓
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          {/* Jobs Content - Now First on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Your schedule, simplified
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              View your day, week, or month at a glance. The calendar shows all your jobs 
              with team assignments, so everyone knows where they need to be.
            </p>
            <ul className="space-y-4">
              {[
                "Daily, weekly, and monthly views",
                "Team scheduling & assignments",
                "Job details at a glance",
                "Drag and drop rescheduling",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    ✓
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Jobs Screen */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="bg-card rounded-3xl shadow-card p-4 md:p-6 border border-border">
              <img
                src={jobsImage}
                alt="Job Scheduling Screen"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
