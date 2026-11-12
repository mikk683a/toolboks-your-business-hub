export const SITE_URL = "https://toolboks.dk";
export const APP_URL = "https://app.toolboks.dk";
export const SITE_NAME = "Toolboks";

// Pricing: one source of truth for the whole site.
export const PRICE_PER_USER = 49;
export const TRIAL_MONTHS = 3;
export const PRICE_LINE = `${PRICE_PER_USER} kr pr. bruger pr. måned`;
export const TRIAL_LINE = `${TRIAL_MONTHS} måneder gratis, uden kort`;

export const DK_VAT_RATE = 0.25;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const absoluteUrl = (path: string) =>
  path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
