import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Thomas Andersen",
    role: "Carpenter, Copenhagen",
    avatar: "TA",
    rating: 5,
    quote:
      "Toolboks has completely changed how I run my business. I used to lose track of leads all the time — now everything is in one place. I've won 30% more jobs since I started using it.",
  },
  {
    name: "Maria Kristensen",
    role: "Handyman, Aarhus",
    avatar: "MK",
    rating: 5,
    quote:
      "The invoicing feature alone saves me hours every week. My customers love the professional look, and I get paid faster. It's a no-brainer for any tradesperson.",
  },
  {
    name: "Lars Petersen",
    role: "Flooring Specialist, Odense",
    avatar: "LP",
    rating: 5,
    quote:
      "I was skeptical at first, but the calendar and job scheduling is incredibly easy. My whole team knows exactly where they need to be. No more phone calls back and forth.",
  },
  {
    name: "Anders Nielsen",
    role: "Painter, Aalborg",
    avatar: "AN",
    rating: 5,
    quote:
      "Before Toolboks, I was using notebooks and spreadsheets. Now I have everything on my phone. The customer support is also amazing — they actually listen to feedback.",
  },
  {
    name: "Sofie Hansen",
    role: "Renovation Contractor, Vejle",
    avatar: "SH",
    rating: 5,
    quote:
      "Managing a small team used to be chaos. Toolboks keeps everyone on the same page. We've grown from 2 to 5 employees and the app has scaled perfectly with us.",
  },
  {
    name: "Mikkel Sørensen",
    role: "Electrician, Esbjerg",
    avatar: "MS",
    rating: 5,
    quote:
      "The lead tracking feature is gold. I can see exactly where each customer is in the pipeline. My quote-to-job conversion rate has doubled since switching to Toolboks.",
  },
];

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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by <span className="text-gradient">tradespeople</span> across Denmark
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 500+ carpenters, handymen, and contractors who trust Toolboks to run their business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-10 h-10" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-warning text-warning"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground leading-relaxed mb-6 relative z-10">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-hero-gradient flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 bg-card rounded-2xl p-8 border border-border shadow-card"
        >
          {[
            { value: "500+", label: "Active Users" },
            { value: "4.9/5", label: "Average Rating" },
            { value: "50,000+", label: "Jobs Completed" },
            { value: "12M kr", label: "Invoiced Monthly" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
