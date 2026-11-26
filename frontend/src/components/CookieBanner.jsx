import { useState } from "react";
import { Link } from "react-router-dom";
import { analyticsConfigured, getConsent, loadAnalytics, saveConsent, trackPageView } from "../utils/analytics";

// Asks permission before any analytics cookie is used. It only appears when analytics is configured in .env,
// and only until the visitor chooses. Accept loads Google Analytics / Meta Pixel; Decline loads nothing.
export default function CookieBanner() {
  const [visible, setVisible] = useState(() => analyticsConfigured && getConsent() === null);

  if (!visible) return null;

  const choose = (value) => {
    saveConsent(value);
    setVisible(false);
    if (value === "accepted") {
      loadAnalytics();
      trackPageView(window.location.pathname + window.location.search);
    }
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-night p-5 text-sm text-white shadow-2xl sm:flex-row sm:items-center"
    >
      <p className="flex-1 text-white/80">
        We use cookies to understand how the website is used and to improve it. See our{" "}
        <Link to="/privacy" className="font-semibold text-accent underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex gap-3">
        <button type="button" onClick={() => choose("declined")} className="rounded-full border border-white/30 px-5 py-2 font-semibold">
          Decline
        </button>
        <button type="button" onClick={() => choose("accepted")} className="rounded-full bg-brand px-5 py-2 font-semibold">
          Accept
        </button>
      </div>
    </div>
  );
}
