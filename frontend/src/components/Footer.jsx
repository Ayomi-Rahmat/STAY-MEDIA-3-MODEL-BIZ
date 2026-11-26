import { Link } from "react-router-dom";
import { FaChevronRight, FaClock, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import InfoItem from "./InfoItem";
import { SITE, UNITS } from "../data/site";
import { SOCIALS } from "../data/socials";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  ...UNITS.map(({ name, path }) => ({ label: name, to: path })),
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Blog", to: "/blog" },
  { label: "FAQs", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

// `id` matches a category id in the menu data; clicking filters the menu.
const MENU_LINKS = [
  { id: "burgers", label: "Burgers" },
  { id: "pizza", label: "Pizza" },
  { id: "chicken", label: "Fried Chicken" },
  { id: "fastfood", label: "Fast Food" },
  { id: "wraps", label: "Wraps & Rolls" },
  { id: "pasta", label: "Pasta" },
  { id: "desserts", label: "Desserts" },
];

const CURRENT_YEAR = new Date().getFullYear();
const linkClass = "flex items-center gap-2 text-sm text-gray-400 transition hover:text-white";

function ColumnHeading({ children }) {
  return (
    <h3 className="inline-block border-b-2 border-brand pb-1.5 font-semibold text-white">{children}</h3>
  );
}

export default function Footer({ onSelectCategory }) {
  return (
    <footer className="bg-night text-gray-400">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.3fr]">
        <div>
          <p className="font-heading text-3xl font-bold text-white">
            {SITE.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            One destination for great food, comfortable stays and unforgettable nights. Explore our restaurant, hotel
            and club, and book online.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 text-sm transition hover:bg-brand hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <ColumnHeading>Quick Links</ColumnHeading>
          <ul className="mt-6 space-y-3">
            {QUICK_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className={linkClass}>
                  <FaChevronRight aria-hidden="true" className="text-[10px] text-brand" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {onSelectCategory ? (
          <nav aria-label="Menu categories">
            <ColumnHeading>Our Menu</ColumnHeading>
            <ul className="mt-6 space-y-3">
              {MENU_LINKS.map(({ id, label }) => (
                <li key={id}>
                  <button type="button" onClick={() => onSelectCategory(id)} className={linkClass}>
                    <FaChevronRight aria-hidden="true" className="text-[10px] text-brand" /> {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ) : (
          <nav aria-label="Legal">
            <ColumnHeading>Information</ColumnHeading>
            <ul className="mt-6 space-y-3">
              {[
                { label: "Privacy Policy", to: "/privacy" },
                { label: "Terms & Policies", to: "/terms" },
                { label: "Log in", to: "/login" },
                { label: "Create account", to: "/register" },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className={linkClass}>
                    <FaChevronRight aria-hidden="true" className="text-[10px] text-brand" /> {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div>
          <ColumnHeading>Get In Touch</ColumnHeading>
          <div className="mt-6 space-y-5">
            <InfoItem compact icon={FaLocationDot} label="Address">
              {SITE.fullAddress}
            </InfoItem>
            <InfoItem compact icon={FaPhone} label="Phone">
              {SITE.phone}
            </InfoItem>
            <InfoItem compact icon={FaEnvelope} label="Email">
              {SITE.email}
            </InfoItem>
            <InfoItem compact icon={FaClock} label="Restaurant Hours">
              {SITE.hours}
            </InfoItem>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <p>
            &copy; {CURRENT_YEAR} <span className="text-brand">{SITE.name}</span>. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link to="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition hover:text-white">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
