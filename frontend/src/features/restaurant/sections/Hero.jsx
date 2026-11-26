import { Link } from "react-router-dom";
import { FaClock, FaFire, FaPlay, FaStar, FaUtensils } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import { HERO_STATS } from "../../../data/site";
import { IMAGES } from "../../../data/images";

// A small white card that floats beside the burger photo.
function FloatingCard({ icon: Icon, iconClass, title, text, className = "", delay = "0s" }) {
  return (
    <div
      style={{ animationDelay: delay }}
      className={`absolute flex animate-float items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-xl shadow-black/10 ${className}`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${iconClass}`}>
        <Icon aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-bold leading-tight">{title}</p>
        <p className="text-[11px] text-gray-400">{text}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative scroll-mt-22 overflow-hidden bg-cream">
      {/* faint decorative word behind the headline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 left-1/4 select-none font-heading text-[18rem] font-bold leading-none text-ink/3 max-lg:hidden"
      >
        Food
      </span>

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-2 lg:gap-6 lg:py-24">
        {/* ------------ text side ------------ */}
        <div>
          <p className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-[13px] font-semibold shadow-md shadow-black/5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-flame to-accent text-white">
              <FaStar aria-hidden="true" className="text-sm" />
            </span>
            Loved by diners across Lagos
          </p>

          <h1 className="mt-8 font-heading text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">
            Delicious
            <span className="block text-brand">Food</span>
            for Every Moment
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-gray-600">
            Experience bold flavors crafted from premium ingredients. From crispy burgers to gourmet
            pizzas - every bite is an adventure worth savoring.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <a
              href="#menu"
              className="inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-brand to-brand-dark px-8 py-4 text-[15px] font-semibold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5"
            >
              <FaUtensils aria-hidden="true" /> Explore Menu
            </a>
            <Link to="/about" className="group inline-flex items-center gap-3 text-[15px] font-semibold">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-brand shadow-lg shadow-black/10 transition group-hover:scale-110">
                <FaPlay aria-hidden="true" className="ml-0.5 text-sm" />
              </span>
              Our Story
            </Link>
          </div>

          <dl className="mt-12 flex flex-wrap gap-y-6">
            {HERO_STATS.map(({ value, suffix, label }, index) => (
              <div
                key={label}
                className={`pr-6 ${index > 0 ? "border-l border-gray-300/70 pl-6" : ""}`}
              >
                <dt className="sr-only">{label}</dt>
                <dd className="font-heading text-3xl font-bold">
                  {value}
                  <span className="text-brand">{suffix}</span>
                </dd>
                <p aria-hidden="true" className="mt-1 text-[11px] uppercase tracking-widest text-gray-400">
                  {label}
                </p>
              </div>
            ))}
          </dl>
        </div>

        {/* ------------ picture side ------------ */}
        <div className="relative mx-auto flex aspect-square w-full max-w-[34rem] items-center justify-center">
          <div className="absolute inset-[4%] rounded-full bg-accent/15" />
          <div className="absolute inset-[9%] overflow-hidden rounded-full bg-[#1d2330] shadow-2xl shadow-black/20 ring-8 ring-white/60">
            <Photo
              src={IMAGES.heroBurger}
              alt="Our signature burger"
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>

          <FloatingCard
            icon={FaFire}
            iconClass="bg-brand/10 text-brand"
            title="Fresh"
            text="Made to order"
            className="left-0 top-[20%] sm:-left-4"
          />
          <FloatingCard
            icon={FaClock}
            iconClass="bg-forest/10 text-forest"
            title="Daily"
            text="Freshly prepared"
            delay="1s"
            className="-right-1 top-[48%] sm:-right-6"
          />
          <FloatingCard
            icon={FaStar}
            iconClass="bg-accent/20 text-accent"
            title="4.9/5"
            text="2k+ reviews"
            delay="2s"
            className="bottom-[6%] right-[8%]"
          />
        </div>
      </div>
    </section>
  );
}
