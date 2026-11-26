import { Link } from "react-router-dom";
import { FaAward, FaBookOpen, FaLeaf, FaCalendarCheck } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import { IMAGES } from "../../../data/images";
import { SITE } from "../../../data/site";

const FEATURES = [
  {
    icon: FaLeaf,
    tone: "bg-brand/10 text-brand",
    title: "100% Fresh Ingredients",
    text: "We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.",
  },
  {
    icon: FaAward,
    tone: "bg-accent/15 text-accent",
    title: "Award-Winning Recipes",
    text: "Our signature recipes have won national culinary awards 5 years in a row.",
  },
  {
    icon: FaCalendarCheck,
    tone: "bg-forest/10 text-forest",
    title: "Easy Reservations",
    text: "Reserve your table online in under a minute and walk straight in to a warm welcome.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-22 bg-white py-20 lg:py-28">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        {/* pictures */}
        <div className="relative pb-8 pr-6 lg:pr-0">
          <Photo
            src={IMAGES.aboutMain}
            alt={`Inside the ${SITE.name} restaurant`}
            className="aspect-[4/4.3] w-full rounded-3xl object-cover shadow-2xl shadow-black/15"
          />
          <div className="absolute -left-3 top-10 rounded-2xl bg-brand px-6 py-5 text-center text-white shadow-xl shadow-brand/30 sm:-left-5">
            <p className="font-heading text-4xl font-bold leading-none">12+</p>
            <p className="mt-2 text-xs leading-tight">
              Years of
              <br />
              Excellence
            </p>
          </div>
          <Photo
            src={IMAGES.aboutInset}
            alt="A freshly plated dish"
            className="absolute bottom-0 right-0 h-36 w-36 rounded-2xl border-4 border-white object-cover shadow-xl sm:h-40 sm:w-40 lg:-right-6"
          />
        </div>

        {/* words */}
        <div>
          <p className="font-script text-2xl text-brand">Our Story</p>
          <h2 className="mt-1 font-heading text-4xl font-bold leading-tight sm:text-[2.6rem]">
            We Invite You to
            <br />
            Visit <span className="text-brand">{SITE.name}</span>
          </h2>
          <span className="mt-4 block h-1 w-16 rounded-full bg-linear-to-r from-brand to-accent" />

          <p className="mt-6 leading-relaxed text-gray-500">
            Founded in 2012, {SITE.name} began as a small corner restaurant with a big dream - to bring people together over
            great food. Today we are a restaurant, a hotel and a club, welcoming thousands of happy guests every week
            with the same passion that started it all.
          </p>

          <ul className="mt-8 space-y-5">
            {FEATURES.map(({ icon: Icon, tone, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-lg ${tone}`}>
                  <Icon aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            to="/menu"
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-brand to-brand-dark px-8 py-4 text-[15px] font-semibold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5"
          >
            <FaBookOpen aria-hidden="true" /> View Full Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
