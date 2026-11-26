import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getConsent, loadAnalytics, trackPageView } from "../utils/analytics";

// Sends a page view each time the address changes (only if the visitor has accepted cookies).
// Also starts the trackers on first load for visitors who accepted on an earlier visit.
export default function AnalyticsTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (getConsent() === "accepted") {
      loadAnalytics();
      trackPageView(pathname + search);
    }
  }, [pathname, search]);

  return null;
}
