const KEY = "cookie_consent_v1"; // bump this if you change your policy later

export function getConsent() {
  const v = localStorage.getItem(KEY);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

export function setConsent(value) {
  localStorage.setItem(KEY, value); // "accepted" | "rejected"
}