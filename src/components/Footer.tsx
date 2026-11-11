import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const APP_URL = "https://app.toolboks.dk";

const productLinks = [
  { name: "Funktioner", href: "/#features" },
  { name: "Se det i brug", href: "/#showcase" },
  { name: "Priser", href: "/#pricing" },
  { name: "Opret gratis konto", href: "/#signup" },
];

const legalLinks = [
  { name: "Privatlivspolitik", to: "/privatliv" },
  { name: "Vilkår", to: "/vilkaar" },
  { name: "Databehandleraftale", to: "/databehandleraftale" },
];

const Footer = () => (
  <footer className="bg-card border-t border-border py-12 lg:py-16">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center">
              <Wrench className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Toolboks</span>
          </Link>
          <p className="text-muted-foreground max-w-sm">
            Admin-appen til tømrere, håndværkere og andre selvstændige. Styr din forretning hvor du end er.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Produkt</h4>
          <ul className="space-y-3">
            {productLinks.map((l) => (
              <li key={l.name}>
                <a href={l.href} className="text-muted-foreground hover:text-foreground transition-colors">{l.name}</a>
              </li>
            ))}
            <li>
              <a href={APP_URL} className="text-muted-foreground hover:text-foreground transition-colors">Log ind</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-foreground mb-4">Juridisk</h4>
          <ul className="space-y-3">
            {legalLinks.map((l) => (
              <li key={l.name}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground transition-colors">{l.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-muted-foreground text-sm text-center md:text-left">
          © {new Date().getFullYear()} Toolboks. Alle rettigheder forbeholdes.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
