import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// A browser reloads and jumps to the top on a normal page change, but React Router swaps pages
// without reloading - so we do the jump ourselves. If the address has a #section, glide to it instead.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" }); // the site scrolls smoothly by default; a new page should just start at the top
      return;
    }
    // wait a moment so the new page has rendered its sections
    const timer = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 80);
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
