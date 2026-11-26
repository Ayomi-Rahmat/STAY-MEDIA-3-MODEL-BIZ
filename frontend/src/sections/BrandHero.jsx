import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { SITE } from "../data/site";

// The first thing visitors see on the homepage: who we are, and a nudge to pick a business.
export default function BrandHero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden text-white"
      style={{
        backgroundColor: "#1a1a1a",
        backgroundImage:
          "radial-gradient(60rem 28rem at 85% -10%, rgba(232,39,28,0.35), transparent 60%), radial-gradient(40rem 24rem at 0% 110%, rgba(245,166,35,0.22), transparent 60%)",
      }}
    >
      <div className="container-x py-20 text-center lg:py-28">
        <p className="font-script text-2xl text-accent">Welcome to {SITE.name}</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Dine. Stay. <span className="text-accent">Celebrate.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-white/75 sm:text-lg">
          A restaurant, a hotel and a club in one place. Choose where you&apos;re headed and book online in minutes.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#units"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold shadow-lg shadow-brand/30 transition hover:-translate-y-0.5"
          >
            Explore Our Services <FaArrowRight aria-hidden="true" />
          </a>
          <Link
            to="/register"
            className="rounded-full border border-white/30 px-8 py-3.5 text-sm font-bold transition hover:bg-white/10"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </section>
  );
}
