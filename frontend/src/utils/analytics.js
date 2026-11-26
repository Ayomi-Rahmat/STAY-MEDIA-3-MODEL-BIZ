// Google Analytics (GA4) and Meta Pixel - loaded ONLY if the ID is set in .env AND the visitor said "Accept".
//   VITE_GA_ID=G-XXXXXXXXXX        VITE_META_PIXEL_ID=123456789012345
// With no IDs set (the default) nothing is loaded and no cookie banner is shown.

export const GA_ID = import.meta.env.VITE_GA_ID || "";
export const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "";
export const analyticsConfigured = Boolean(GA_ID || PIXEL_ID);

const CONSENT_KEY = "site_cookie_consent"; // "accepted" | "declined"

export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null; // storage blocked -> treat as "not asked yet"
  }
}

export function saveConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode: the choice just will not be remembered */
  }
}

let loaded = false;

function addScript(src) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

// Load the tracking scripts (once).
export function loadAnalytics() {
  if (loaded || !analyticsConfigured) return;
  loaded = true;

  if (GA_ID) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments); // GA needs the real `arguments` object here
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false }); // we send page views ourselves (below)
    addScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
  }

  if (PIXEL_ID) {
    // Standard Meta Pixel bootstrap, written out readably.
    const fbq = function fbq() {
      (fbq.queue = fbq.queue || []).push(arguments);
    };
    window.fbq = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    addScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", PIXEL_ID);
  }
}

// A single-page site never reloads, so we tell the trackers about each new page ourselves.
export function trackPageView(path) {
  if (!loaded) return;
  window.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href });
  window.fbq?.("track", "PageView");
}

// Business events worth counting (PRD 15 success metrics): "booking_confirmed", "enquiry_sent", "newsletter_signup", "sign_up".
export function trackEvent(name, params = {}) {
  if (!loaded) return;
  window.gtag?.("event", name, params);
  window.fbq?.("trackCustom", name, params);
}
