export const SITE_URL = "https://toolboks.dk";
export const APP_URL = "https://app.toolboks.dk";
export const SITE_NAME = "Toolboks";

// Pricing: one source of truth for the whole site.
// Decided 16 Nov 2026: one price per firm incl. two employees, 49 per extra employee.
export const PRICE_FIRM = 249;
export const INCLUDED_EMPLOYEES = 2;
export const PRICE_EXTRA_EMPLOYEE = 49;
export const TRIAL_MONTHS = 3;
export const PRICE_LINE = `${PRICE_FIRM} kr pr. måned for firmaet, med op til ${INCLUDED_EMPLOYEES} medarbejdere`;
export const PRICE_EXTRA_LINE = `${PRICE_EXTRA_EMPLOYEE} kr pr. ekstra medarbejder`;
export const TRIAL_LINE = `${TRIAL_MONTHS} måneder gratis, uden kort`;
/** Standard answer to "what does it cost" */
export const PRICE_ANSWER = `${PRICE_LINE}. ${PRICE_EXTRA_LINE}. De første ${TRIAL_MONTHS} måneder er gratis, og du skal ikke oplyse kort. Ingen binding.`;

export const DK_VAT_RATE = 0.25;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
