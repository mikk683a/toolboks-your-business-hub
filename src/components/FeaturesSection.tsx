import { Users, Calendar, FileText, TrendingUp, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Lead Management",
    description: "Track all your leads in one place. See who's new, who needs a quote, and who's ready to book.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Calendar,
    title: "Job Scheduling",
    description: "Plan your day with an intuitive calendar. Never double-book or miss an appointment again.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Professional Invoices",
    description: "Create and send invoices in seconds. Get paid faster with online payment options.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: TrendingUp,
    title: "Business Dashboard",
    description: "See your business at a glance. Track revenue, pending payments, and daily tasks.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Phone,
    title: "One-Tap Contact",
    description: "Call or text customers directly from the app. All communication history in one place.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Log hours on each job automatically. Perfect for billing and productivity insights.",
    color: "bg-warning/10 text-warning",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything you need to{" "}
            <span className="text-gradient">grow your business</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From first contact to final invoice, Toolboks handles it all so you can focus on what you do best.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
