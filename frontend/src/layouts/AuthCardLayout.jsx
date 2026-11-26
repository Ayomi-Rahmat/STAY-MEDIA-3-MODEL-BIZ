import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Logo from "../components/Logo";
import { SITE } from "../data/site";

const CURRENT_YEAR = new Date().getFullYear();

// Centered single-card layout for the password-recovery screens
// (Forgot password, Enter code, New password).
export default function AuthCardLayout({
  icon: Icon,
  title,
  subtitle,
  backTo = "/login",
  backLabel = "Back to Login",
  children,
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <div className="w-full max-w-120">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-3xl bg-white p-7 shadow-xl shadow-orange-900/5 ring-1 ring-black/5 sm:p-10">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition hover:text-brand"
          >
            <FiArrowLeft aria-hidden="true" /> {backLabel}
          </Link>

          <div className="mt-6 text-center">
            {Icon && (
              <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-brand/10 text-2xl text-brand">
                <Icon aria-hidden="true" />
              </span>
            )}
            <h1 className="font-heading text-2xl font-bold">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-gray-500">{subtitle}</p>}
          </div>

          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          &copy; {CURRENT_YEAR} {SITE.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
