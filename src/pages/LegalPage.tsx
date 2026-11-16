import Seo from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEGAL_DOCS } from "@/lib/legal";

const LegalPage = ({ title, path }: { title: string; path: string }) => {
  const doc = LEGAL_DOCS[path];
  return (
    <>
      <Seo
        title={`${title} | Toolboks`}
        description={`${title} for Toolboks, admin-appen til små servicevirksomheder.`}
        path={path}
        noindex
      />
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 pt-32 pb-20 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{title}</h1>
          {doc ? (
            <>
              <p className="text-sm text-muted-foreground mb-6">Opdateret {doc.updated}</p>
              <p className="text-lg text-foreground mb-10">{doc.intro}</p>
              {doc.sections.map((s) => (
                <section key={s.heading} className="mb-8">
                  <h2 className="text-xl font-semibold text-foreground mb-3">{s.heading}</h2>
                  {s.paragraphs?.map((p) => (
                    <p key={p} className="text-muted-foreground leading-relaxed mb-3">{p}</p>
                  ))}
                  {s.list && (
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                      {s.list.map((li) => <li key={li}>{li}</li>)}
                    </ul>
                  )}
                </section>
              ))}
            </>
          ) : (
            <p className="text-muted-foreground text-lg">Siden opdateres snart.</p>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalPage;
