import { describe, expect, it } from "vitest";
import { adminTimeCost, coverage, hourlyRate, parseNumber, priceForCoverage } from "./calculators";

describe("parseNumber", () => {
  it("parses plain and Danish formatted numbers", () => {
    expect(parseNumber("1250.5")).toBe(1250.5);
    expect(parseNumber("1.250,50")).toBe(1250.5);
    expect(parseNumber("60 000")).toBe(60000);
    expect(parseNumber("1.250.000")).toBe(1250000);
    expect(parseNumber("12,5")).toBe(12.5);
  });
  it("returns null for empty or invalid input", () => {
    expect(parseNumber("")).toBeNull();
    expect(parseNumber(null)).toBeNull();
    expect(parseNumber("abc")).toBeNull();
  });
});

describe("hourlyRate", () => {
  it("is (fixed + profit) / billable hours", () => {
    const r = hourlyRate({ fixedCosts: 60000, desiredProfit: 15000, billableHours: 120 });
    expect(r).toEqual({ rateExVat: 625, rateInclVat: 781.25, monthlyRevenue: 75000 });
  });
  it("rejects zero hours and negative values", () => {
    expect(hourlyRate({ fixedCosts: 1, desiredProfit: 1, billableHours: 0 })).toBeNull();
    expect(hourlyRate({ fixedCosts: -1, desiredProfit: 1, billableHours: 10 })).toBeNull();
    expect(hourlyRate({ fixedCosts: NaN, desiredProfit: 1, billableHours: 10 })).toBeNull();
  });
  it("allows zero profit", () => {
    expect(hourlyRate({ fixedCosts: 1000, desiredProfit: 0, billableHours: 10 })?.rateExVat).toBe(100);
  });
});

describe("coverage", () => {
  it("computes contribution and ratio", () => {
    const r = coverage({ price: 10000, variableCosts: 6000, fixedCosts: 60000 });
    expect(r).toEqual({ contribution: 4000, ratioPct: 40, breakEvenRevenue: 150000 });
  });
  it("skips break-even without fixed costs", () => {
    expect(coverage({ price: 100, variableCosts: 25, fixedCosts: null })?.breakEvenRevenue).toBeNull();
  });
  it("handles a loss making job", () => {
    const r = coverage({ price: 100, variableCosts: 130, fixedCosts: 1000 });
    expect(r?.ratioPct).toBe(-30);
    expect(r?.breakEvenRevenue).toBeNull();
  });
  it("rejects a zero price", () => {
    expect(coverage({ price: 0, variableCosts: 10 })).toBeNull();
  });
});

describe("priceForCoverage", () => {
  it("finds the price for a target ratio", () => {
    expect(priceForCoverage(6000, 40)).toBe(10000);
    expect(priceForCoverage(500, 50)).toBe(1000);
  });
  it("rejects 100 percent or more", () => {
    expect(priceForCoverage(100, 100)).toBeNull();
  });
});

describe("adminTimeCost", () => {
  it("uses 52 / 12 weeks per month", () => {
    const r = adminTimeCost({ hoursPerWeek: 6, hourValue: 550, people: 1 });
    expect(r?.hoursPerMonth).toBe(26);
    expect(r?.costPerMonth).toBe(14300);
    expect(r?.costPerYear).toBe(171600);
    expect(r?.oneHourLessPerMonth).toBe(2383.33);
  });
  it("multiplies by people", () => {
    expect(adminTimeCost({ hoursPerWeek: 3, hourValue: 500, people: 2 })?.costPerMonth).toBe(13000);
  });
  it("rejects zero people", () => {
    expect(adminTimeCost({ hoursPerWeek: 3, hourValue: 500, people: 0 })).toBeNull();
  });
});
