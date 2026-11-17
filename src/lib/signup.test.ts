import { describe, expect, it } from "vitest";
import { providerUrl, signupErrorText, signupProblem } from "./signup";

const ok = { fullName: "Jens Jensen", email: "jens@firma.dk", password: "hemmelig1", company: "Jensens Haveservice" };

describe("signupProblem", () => {
  it("lets a filled form through", () => expect(signupProblem(ok)).toBeNull());
  it("names the first thing that is missing", () => {
    expect(signupProblem({ ...ok, fullName: " " })).toBe("Skriv dit navn");
    expect(signupProblem({ ...ok, email: "jens@firma" })).toBe("Skriv en gyldig e-mailadresse");
    expect(signupProblem({ ...ok, password: "12345" })).toMatch(/mindst 6 tegn/);
    expect(signupProblem({ ...ok, company: "" })).toBe("Skriv firmaets navn");
  });
});

describe("signupErrorText", () => {
  it("answers in Danish and never shows the raw message", () => {
    expect(signupErrorText(422, { error_code: "weak_password", msg: "Password should be at least 6 characters." })).toMatch(/mindst 6 tegn/);
    expect(signupErrorText(422, { error_code: "user_already_exists" })).toMatch(/Log ind/);
    expect(signupErrorText(429, { error_code: "over_email_send_rate_limit" })).toMatch(/Prøv igen om lidt/);
    expect(signupErrorText(500, { msg: "Database error saving new user" })).toBe("Kontoen blev ikke oprettet. Prøv igen om lidt.");
    expect(signupErrorText(500, null)).not.toMatch(/fetch|error/i);
  });
});

describe("providerUrl", () => {
  it("points at the app's own login", () => expect(providerUrl("google")).toBe("https://app.toolboks.dk/auth?start=google"));
});
