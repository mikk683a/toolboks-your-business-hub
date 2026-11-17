export const SITE_URL = "https://toolboks.dk";
export const APP_URL = "https://app.toolboks.dk";
export const SITE_NAME = "Toolboks";
// The app's backend and its public (publishable) key. The signup form on the
// front page creates the account straight in the app, with the same fields.
export const APP_AUTH_URL = "https://saybnismxzpjkahlymnm.supabase.co/auth/v1";
export const APP_PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNheWJuaXNteHpwamthaGx5bW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNDM5NDksImV4cCI6MjA3NDgxOTk0OX0.vALexWvL7XVH32yg8je0UZjh38cTi7BSF1_ERnFiwcY";

// Pricing: one source of truth for the whole site. Mirrors the app's billing
// (supabase/functions/_shared/billing.ts in quickjob-deal).
// Decided 17 Nov 2026 ("Klar til sæsonen"): one package, with the new website
// and ongoing work on Google included. People in the firm count the owner too.
//   Alone in the firm      199 kr pr. måned
//   Up to 2 people         249 kr pr. måned
//   Each person over 2      49 kr pr. måned
export const PRICE_SOLO = 199;
export const PRICE_FIRM = 249;
export const INCLUDED_EMPLOYEES = 2;
export const PRICE_EXTRA_EMPLOYEE = 49;
export const TRIAL_MONTHS = 3;

/** Monthly price excl. VAT for a firm with this many people, the owner included. */
export const priceForTeam = (people: number): number =>
  people <= 1 ? PRICE_SOLO : PRICE_FIRM + Math.max(0, people - INCLUDED_EMPLOYEES) * PRICE_EXTRA_EMPLOYEE;

// "Klar til sæsonen": sign up before 1 March 2027 and the free months start on
// 1 March, so Toolboks is free until 1 June 2027. After that, 3 months from
// sign-up. The app sets the same date (public.trial_end_for in the database).
export const SEASON_OFFER_ENDS = new Date("2027-03-01T00:00:00+01:00");
export const SEASON_TRIAL_END_TEXT = "1. juni 2027";
export const seasonOfferOpen = (now: Date = new Date()) => now.getTime() < SEASON_OFFER_ENDS.getTime();

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
export const PRICE_LINE = `${PRICE_SOLO} kr pr. måned, hvis du er alene, og ${PRICE_FIRM} kr, hvis I er op til ${INCLUDED_EMPLOYEES}`;
export const PRICE_EXTRA_LINE = `${PRICE_EXTRA_EMPLOYEE} kr pr. måned for hver ekstra person`;
export const TRIAL_LINE = seasonOfferOpen() ? `gratis til ${SEASON_TRIAL_END_TEXT}, uden kort` : `${TRIAL_MONTHS} måneder gratis, uden kort`;
/** Short trial sentence for descriptions, e.g. "Gratis til 1. juni 2027." */
export const TRIAL_SENTENCE = `${cap(TRIAL_LINE.replace(/, uden kort$/, ""))}.`;
/** Trial sentence for FAQ answers. */
export const TRIAL_FAQ = seasonOfferOpen()
  ? `Opretter du dig før 1. marts 2027, er Toolboks gratis til ${SEASON_TRIAL_END_TEXT}. Du skal ikke oplyse kort.`
  : `De første ${TRIAL_MONTHS} måneder er gratis, og du skal ikke oplyse kort.`;
/** Standard answer to "what does it cost" */
export const PRICE_ANSWER = `${cap(PRICE_LINE)}. ${cap(PRICE_EXTRA_LINE)}. En ny hjemmeside og løbende arbejde med Google er med i prisen. ${cap(TRIAL_LINE)}. Ingen binding. Priserne er ekskl. moms.`;
/** The 30 minute intro call (Google appointment schedule on kontakt@toolboks.dk). */
export const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0UAAspFuLxAOnol0uSF7VwN2nBI6XUHWfjSSUdk73F39d0F2fTfqDY8bbi_45EhJisJFG-LbY6";

export const DK_VAT_RATE = 0.25;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
