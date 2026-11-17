import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, PRICE_SOLO, SITE_NAME, SITE_URL, TRIAL_LINE, absoluteUrl } from "@/lib/site";
import type { Faq } from "@/lib/features";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  description:
    "Toolboks er en admin-app til små danske servicevirksomheder, der kører ud til kunder.",
};

export const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "da-DK",
  description:
    "Admin-app til små servicevirksomheder: henvendelser, tilbud, kalender med køretid, jobs, faktura, timeregistrering og kundebeskeder samlet ét sted.",
  featureList: [
    "Henvendelser fra telefon, hjemmeside, bookinglink og prisberegner i én indbakke",
    "Tilbud på SMS og e-mail",
    "Kalender med forslag til tider ud fra køretid",
    "Faktura, når jobbet er færdigt",
    "Timeregistrering med CSV-eksport til løn",
    "SMS, e-mail og hjemmeside i samme indbakke",
    "Ny hjemmeside og løbende arbejde med Google",
  ],
  offers: {
    "@type": "Offer",
    price: String(PRICE_SOLO),
    priceCurrency: "DKK",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(PRICE_SOLO),
      priceCurrency: "DKK",
      unitText: "pr. måned, fra",
      billingDuration: 1,
      billingIncrement: 1,
      valueAddedTaxIncluded: false,
    },
    description: `Fra-pris pr. måned ekskl. moms for et firma med én person. ${TRIAL_LINE.charAt(0).toUpperCase() + TRIAL_LINE.slice(1)}.`,
    url: `${SITE_URL}/#pricing`,
  },
};

export const faqJsonLd = (faq: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: object[];
  noindex?: boolean;
}

const Seo = ({ title, description, path, jsonLd = [], noindex = false }: SeoProps) => {
  const url = absoluteUrl(path);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="da_DK" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
};

export default Seo;
