import { Link } from "react-router-dom";
import { FaGem } from "react-icons/fa6";
import { SITE } from "../data/site";

// The site logo (name comes from SITE.name). `light` flips the colours for use on dark backgrounds.
export default function Logo({ light = false, className = "" }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-3 ${className}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-flame to-accent text-white shadow-lg shadow-brand/30">
        <FaGem className="text-lg" />
      </span>
      <span className="leading-none">
        <span className={`block font-heading text-2xl font-bold ${light ? "text-white" : "text-ink"}`}>
          {SITE.name}
        </span>
        <span
          className={`mt-1 block whitespace-nowrap text-[8px] uppercase tracking-[0.1em] sm:text-[9px] sm:tracking-[0.2em] ${light ? "text-white/70" : "text-gray-400"}`}
        >
          {SITE.tagline}
        </span>
      </span>
    </Link>
  );
}
