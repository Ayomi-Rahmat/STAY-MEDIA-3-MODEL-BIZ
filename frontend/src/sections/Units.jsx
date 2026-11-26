import { Link } from "react-router-dom";
import { FaArrowRight, FaBed, FaCheck, FaMartiniGlassCitrus, FaUtensils } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading";
import { UNITS } from "../data/site";

const ICONS = { restaurant: FaUtensils, hotel: FaBed, club: FaMartiniGlassCitrus };

// Three cards, one per business. Each card opens that business's own page.
export default function Units() {
  return (
    <section id="units" className="scroll-mt-36 bg-cream py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Three Ways To <span className="text-brand">Enjoy Us</span>
            </>
          }
          subtitle="Pick a business to see what we offer and book online."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {UNITS.map(({ id, name, path, blurb, points, cta }) => {
            const Icon = ICONS[id];
            return (
              <li key={id}>
                <article className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-xl shadow-black/5 ring-1 ring-black/5 transition hover:-translate-y-1">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-flame to-accent text-2xl text-white shadow-lg shadow-brand/25">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-ink">{name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{blurb}</p>
                  <ul className="mt-5 space-y-2.5 text-sm text-gray-700">
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5">
                        <FaCheck aria-hidden="true" className="text-xs text-brand" /> {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={path}
                    aria-label={`${cta} - ${name}`}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-brand"
                  >
                    {cta} <FaArrowRight aria-hidden="true" />
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
