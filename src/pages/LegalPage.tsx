import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LegalPage = ({ title }: { title: string }) => (
  <>
    <Helmet>
      <title>{`${title} – Toolboks`}</title>
    </Helmet>
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{title}</h1>
        <p className="text-muted-foreground text-lg">Siden opdateres snart.</p>
      </main>
      <Footer />
    </div>
  </>
);

export default LegalPage;
