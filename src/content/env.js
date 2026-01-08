const raw = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

// remove trailing slash if any
export const SITE_URL = raw.replace(/\/$/, "");