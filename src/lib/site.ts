export const SITE_URL = "https://toolboks.dk";
export const APP_URL = "https://app.toolboks.dk";
export const SITE_NAME = "Toolboks";

// Pricing: one source of truth for the whole site.
// Decided 16 Nov 2026: one price per firm incl. two employees, 49 per extra employee.
export const PRICE_FIRM = 249;
export const INCLUDED_EMPLOYEES = 2;
export const PRICE_EXTRA_EMPLOYEE = 49;
export const TRIAL_MONTHS = 3;
// Decided 17 Nov 2026: a second package where we also run the firm's website, SEO and social media.
export const PRICE_VISIBILITY = 449;
export const VISIBILITY_NAME = "Toolboks + Synlighed";
export const PRICE_LINE = `${PRICE_FIRM} kr pr. måned for firmaet, med op til ${INCLUDED_EMPLOYEES} medarbejdere`;
export const PRICE_EXTRA_LINE = `${PRICE_EXTRA_EMPLOYEE} kr pr. ekstra medarbejder`;
export const TRIAL_LINE = `${TRIAL_MONTHS} måneder gratis, uden kort`;
/** Standard answer to "what does it cost" */
export const PRICE_ANSWER = `${PRICE_LINE}. En ny hjemmeside er med i prisen. ${PRICE_EXTRA_LINE}. De første ${TRIAL_MONTHS} måneder er gratis, og du skal ikke oplyse kort. Ingen binding. Vil du have, at vi også styrer din hjemmeside, Google og sociale medier, koster ${VISIBILITY_NAME} ${PRICE_VISIBILITY} kr pr. måned.`;
/** The 30 minute intro call (Google appointment schedule on kontakt@toolboks.dk). */
export const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0UAAspFuLxAOnol0uSF7VwN2nBI6XUHWfjSSUdk73F39d0F2fTfqDY8bbi_45EhJisJFG-LbY6";

export const DK_VAT_RATE = 0.25;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
