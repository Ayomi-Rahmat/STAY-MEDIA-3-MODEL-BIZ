import { RESTAURANT_LINKS } from "../data/site";
import useScrollSpy from "../hooks/useScrollSpy";

const SECTION_IDS = RESTAURANT_LINKS.map((link) => link.id);

// The second bar on the Restaurant page: jumps between that page's sections and
// underlines the one you are reading (scroll-spy). It scrolls sideways on phones.
export default function SectionNav() {
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <div className="sticky top-22 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <nav aria-label="Restaurant sections" className="container-x flex items-center gap-6 overflow-x-auto">
        <span className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-brand sm:block">Restaurant</span>
        <ul className="flex items-center gap-6">
          {RESTAURANT_LINKS.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <a
                href={`#${id}`}
                aria-current={activeId === id ? "true" : undefined}
                className={`relative block py-3.5 text-sm font-medium transition-colors hover:text-brand ${
                  activeId === id ? "text-ink" : "text-gray-500"
                }`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-brand transition-all ${
                    activeId === id ? "w-full" : "w-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
