import { useState } from "react";
import { FaLock, FaPaperPlane } from "react-icons/fa6";
import { restaurantApi } from "../../../services/api";
import { trackEvent } from "../../../utils/analytics";
import { isEmail } from "../../../utils/validators";

const CIRCLES =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Ccircle cx='37.5' cy='37.5' r='36' fill='none' stroke='white' stroke-opacity='0.07'/%3E%3C/svg%3E\")";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) return setError("Enter your email address.");
    if (!isEmail(email)) return setError("Enter a valid email address.");
    setError("");

    setLoading(true);
    try {
      await restaurantApi.subscribe({ email: email.trim() });
      trackEvent("newsletter_signup");
      setDone(true);
      setEmail("");
    } catch (err) {
      setError(err.errors?.email ?? err.fieldErrors?.email ?? err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="scroll-mt-22 py-20 text-center text-white"
      style={{ backgroundImage: `${CIRCLES}, linear-gradient(135deg, #e8271c 0%, #b81209 55%, #8f0000 100%)` }}
    >
      <div className="container-x">
        <p className="font-script text-2xl text-white/90">Stay Connected</p>
        <h2 className="mt-1 font-heading text-3xl font-semibold sm:text-4xl">
          Subscribe &amp; Get Exclusive <span className="text-accent">Deals</span>
        </h2>
        <p className="mt-4 text-white/85">Get news, events and special announcements straight to your inbox</p>

        {done ? (
          <p role="status" className="mx-auto mt-8 max-w-md rounded-full bg-white/15 px-6 py-4 font-semibold">
            You&apos;re subscribed! Check your inbox for a welcome message.
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                }}
                placeholder="Enter your email address..."
                autoComplete="email"
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "newsletter-error" : undefined}
                className="min-w-0 flex-1 rounded-full bg-white px-6 py-4 text-sm text-ink outline-none placeholder:text-gray-400 focus:ring-4 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-ink transition hover:-translate-y-0.5 disabled:opacity-70"
              >
                <FaPaperPlane aria-hidden="true" /> {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {error && (
              <p id="newsletter-error" role="alert" className="mt-3 text-sm font-medium text-yellow-200">
                {error}
              </p>
            )}
          </form>
        )}

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-white/60">
          <FaLock aria-hidden="true" /> No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
