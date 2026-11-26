import { useEffect, useState } from "react";

// Tells you which page section is currently in the middle of the screen,
// so the navbar can underline the matching link.
// `ids` must be a stable list (declare it outside the component).
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // Only count a section as "active" while it crosses a thin band around the middle.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
