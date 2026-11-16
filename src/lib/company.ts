/** Toolboks' own company details. One place, used by the footer and the legal pages. */
export const COMPANY = {
  name: "Toolboks",
  legalForm: "enkeltmandsvirksomhed",
  owner: "Mikkel Ovesen",
  cvr: "46920171",
  /** Registered address. Empty until it is confirmed; the pages then leave it out. */
  address: "",
  email: "admin@toolboks.dk",
  site: "toolboks.dk",
} as const;
