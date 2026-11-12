import { DK_VAT_RATE } from "./site";

/** Parse a user typed number. Accepts Danish format ("1.250,50") and plain ("1250.5"). */
export function parseNumber(input: string | null | undefined): number | null {
  if (input === null || input === undefined) return null;
  let s = String(input).trim().replace(/\s/g, "");
  if (s === "") return null;
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if ((s.match(/\./g) || []).length > 1) {
    s = s.replace(/\./g, "");
  }
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

export interface HourlyRateInput {
  /** Faste omkostninger pr. måned (løn, bil, forsikring, leasing, software ...) */
  fixedCosts: number;
  /** Ønsket overskud pr. måned */
  desiredProfit: number;
  /** Fakturerbare timer pr. måned */
  billableHours: number;
}

export interface HourlyRateResult {
  rateExVat: number;
  rateInclVat: number;
  monthlyRevenue: number;
}

/** (faste omkostninger + ønsket overskud) / fakturerbare timer */
export function hourlyRate(i: HourlyRateInput): HourlyRateResult | null {
  if (![i.fixedCosts, i.desiredProfit, i.billableHours].every(Number.isFinite)) return null;
  if (i.fixedCosts < 0 || i.desiredProfit < 0 || i.billableHours <= 0) return null;
  const monthlyRevenue = i.fixedCosts + i.desiredProfit;
  const rateExVat = monthlyRevenue / i.billableHours;
  return {
    rateExVat: round2(rateExVat),
    rateInclVat: round2(rateExVat * (1 + DK_VAT_RATE)),
    monthlyRevenue: round2(monthlyRevenue),
  };
}

export interface CoverageInput {
  /** Salgspris uden moms */
  price: number;
  /** Variable omkostninger (materialer, underleverandør, direkte løn) */
  variableCosts: number;
  /** Valgfri: faste omkostninger pr. måned, bruges til break-even */
  fixedCosts?: number | null;
}

export interface CoverageResult {
  contribution: number;
  /** Dækningsgrad i procent */
  ratioPct: number;
  /** Omsætning pr. måned der skal til for at dække de faste omkostninger */
  breakEvenRevenue: number | null;
}

/** Dækningsgrad = (salgspris - variable omkostninger) / salgspris */
export function coverage(i: CoverageInput): CoverageResult | null {
  if (!Number.isFinite(i.price) || !Number.isFinite(i.variableCosts)) return null;
  if (i.price <= 0 || i.variableCosts < 0) return null;
  const contribution = i.price - i.variableCosts;
  const ratio = contribution / i.price;
  let breakEvenRevenue: number | null = null;
  if (i.fixedCosts !== null && i.fixedCosts !== undefined && Number.isFinite(i.fixedCosts) && i.fixedCosts >= 0 && ratio > 0) {
    breakEvenRevenue = round2(i.fixedCosts / ratio);
  }
  return {
    contribution: round2(contribution),
    ratioPct: round2(ratio * 100),
    breakEvenRevenue,
  };
}

/** Salgspris der skal til for at ramme en given dækningsgrad (i procent). */
export function priceForCoverage(variableCosts: number, targetPct: number): number | null {
  if (!Number.isFinite(variableCosts) || !Number.isFinite(targetPct)) return null;
  if (variableCosts < 0 || targetPct < 0 || targetPct >= 100) return null;
  return round2(variableCosts / (1 - targetPct / 100));
}

export const WEEKS_PER_MONTH = 52 / 12;

export interface AdminTimeInput {
  /** Admin-timer pr. uge pr. person */
  hoursPerWeek: number;
  /** Hvad en time er værd (timepris eller egen løn) */
  hourValue: number;
  /** Antal personer der bruger tid på admin */
  people: number;
}

export interface AdminTimeResult {
  hoursPerMonth: number;
  costPerMonth: number;
  costPerYear: number;
  /** Hvad én times mindre admin pr. uge pr. person er værd pr. måned */
  oneHourLessPerMonth: number;
}

export function adminTimeCost(i: AdminTimeInput): AdminTimeResult | null {
  if (![i.hoursPerWeek, i.hourValue, i.people].every(Number.isFinite)) return null;
  if (i.hoursPerWeek < 0 || i.hourValue < 0 || i.people <= 0) return null;
  const hoursPerMonth = i.hoursPerWeek * WEEKS_PER_MONTH * i.people;
  const costPerMonth = hoursPerMonth * i.hourValue;
  return {
    hoursPerMonth: round2(hoursPerMonth),
    costPerMonth: round2(costPerMonth),
    costPerYear: round2(costPerMonth * 12),
    oneHourLessPerMonth: round2(WEEKS_PER_MONTH * i.people * i.hourValue),
  };
}

const nf0 = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("da-DK", { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("da-DK", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const fmtKr = (n: number, decimals = 0) => `${(decimals === 2 ? nf2 : nf0).format(n)} kr`;
export const fmtNum = (n: number) => nf1.format(n);
export const fmtPct = (n: number) => `${nf1.format(n)} %`;
