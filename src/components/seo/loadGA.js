export function loadGA(measurementId) {
  if (!measurementId) return;

  // Prevent double-loading
  if (window.__ga_loaded__) return;
  window.__ga_loaded__ = true;

  // 1) Load gtag.js script
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  // 2) Init gtag
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());

  // Basic config (you can add options later)
  window.gtag("config", measurementId);
}