// "Opret konto" on the front page: the same four fields as in the app, and the
// account is created in the app's own login system. The app then makes the
// firm from the name the first time the owner opens the link in the mail.
import { APP_AUTH_URL, APP_PUBLIC_KEY, APP_URL } from "./site";

export interface SignupInput { fullName: string; email: string; password: string; company: string }

export const MIN_PASSWORD = 6;

/** What is wrong with the form, in the owner's words. null when it can be sent. */
export function signupProblem(input: SignupInput): string | null {
  if (input.fullName.trim().length < 2) return "Skriv dit navn";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email.trim())) return "Skriv en gyldig e-mailadresse";
  if (input.password.length < MIN_PASSWORD) return `Adgangskoden skal være på mindst ${MIN_PASSWORD} tegn`;
  if (input.company.trim().length < 2) return "Skriv firmaets navn";
  return null;
}

/** The login system answers in English. These are the answers an owner can meet. */
export function signupErrorText(status: number, body: { error_code?: string; msg?: string } | null): string {
  const code = body?.error_code ?? "";
  if (code === "weak_password") return `Adgangskoden skal være på mindst ${MIN_PASSWORD} tegn`;
  if (code === "email_address_invalid" || code === "validation_failed") return "Skriv en gyldig e-mailadresse";
  if (code === "user_already_exists" || code === "email_exists") return "Der findes allerede en konto med den e-mail. Log ind i stedet.";
  if (status === 429 || code.includes("rate_limit")) return "Der er oprettet for mange konti på kort tid. Prøv igen om lidt.";
  return "Kontoen blev ikke oprettet. Prøv igen om lidt.";
}

/** Creates the account. Returns null when it went well, else what to tell the owner. He then confirms through the link in the mail. */
export async function createAccount(input: SignupInput): Promise<string | null> {
  const problem = signupProblem(input);
  if (problem) return problem;
  try {
    const res = await fetch(`${APP_AUTH_URL}/signup?redirect_to=${encodeURIComponent(`${APP_URL}/`)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: APP_PUBLIC_KEY },
      body: JSON.stringify({
        email: input.email.trim(),
        password: input.password,
        data: { full_name: input.fullName.trim(), org_name: input.company.trim() },
      }),
    });
    if (res.ok) return null;
    const body = await res.json().catch(() => null);
    return signupErrorText(res.status, body);
  } catch {
    return "Vi kunne ikke få forbindelse. Tjek dit net, og prøv igen.";
  }
}

export type LoginProvider = "apple" | "google" | "microsoft";
/** Starts the provider's login in the app itself, where the account is made. */
export const providerUrl = (provider: LoginProvider) => `${APP_URL}/auth?start=${provider}`;
