import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaCalendarCheck, FaXmark } from "react-icons/fa6";
import Logo from "./Logo";
import { UNITS } from "../data/site";
import { useAuth } from "../context/AuthContext";

// The site-wide navbar, shown on every page.
// Links go to PAGES (/restaurant, /hotel, /club). The Restaurant page adds its own second bar for its sections.
const LINKS = [
  { to: "/", label: "Home", end: true },
  ...UNITS.map(({ path, name }) => ({ to: path, label: name })),
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a shadow once the page has scrolled a little.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the phone menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const firstName = user?.name?.split(" ")[0];

  // NavLink tells us whether the link matches the current page. "hash" links (Contact) are never "active".
  const linkClass = (isActive, hash) =>
    `relative py-2 text-[15px] font-medium transition-colors hover:text-brand ${
      isActive && !hash ? "text-brand" : "text-gray-700"
    }`;

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}>
      <nav aria-label="Main" className="container-x flex h-22 items-center justify-between">
        <Logo />

        {/* desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {LINKS.map(({ to, label, end, hash }) => (
            <li key={label}>
              <NavLink to={to} end={end} className={({ isActive }) => linkClass(isActive, hash)}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          {/* login / user area (desktop) */}
          <div className="hidden items-center gap-4 lg:flex">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Hi, {firstName}</span>
                <button type="button" onClick={logout} className="text-sm font-semibold text-brand hover:underline">
                  Log out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-ink transition hover:text-brand">
                Log in
              </Link>
            )}
          </div>

          <Link
            to="/#units"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-linear-to-r from-brand to-brand-dark px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5 sm:px-5"
          >
            <FaCalendarCheck aria-hidden="true" className="hidden sm:block" /> Book Now
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-lg text-xl text-ink transition hover:bg-cream lg:hidden"
          >
            {menuOpen ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* phone menu */}
      {menuOpen && (
        <div id="mobile-menu" className="border-t border-gray-100 bg-white px-6 pb-6 pt-2 lg:hidden">
          <ul>
            {LINKS.map(({ to, label, end, hash }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-gray-100 py-3.5 text-base font-medium ${
                      isActive && !hash ? "text-brand" : "text-gray-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="flex-1 text-sm text-gray-600">Hi, {firstName}</span>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-ink"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex-1 rounded-lg border border-gray-200 py-2.5 text-center text-sm font-semibold">
                  Log in
                </Link>
                <Link to="/register" className="flex-1 rounded-lg bg-ink py-2.5 text-center text-sm font-semibold text-white">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
