import { FaCalendarDays, FaEnvelope, FaLocationDot, FaPhone } from "react-icons/fa6";
import SectionHeading from "../components/SectionHeading";
import { HOURS } from "../data/content";
import { SITE } from "../data/site";

const GLASS = "rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm";

export default function OpeningHours() {
  const contactRows = [
    { icon: FaLocationDot, label: "Address", value: SITE.address },
    { icon: FaPhone, label: "Phone", value: SITE.phone },
    { icon: FaEnvelope, label: "Email", value: SITE.email },
  ];

  return (
    <section
      id="hours"
      className="scroll-mt-36 py-20 text-white"
      style={{
        backgroundColor: "#255a43",
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 22px), linear-gradient(160deg, #2b6a4e, #1f4d38)",
      }}
    >
      <div className="container-x">
        <SectionHeading
          tone="light"
          eyebrow="Opening Hours"
          title={
            <>
              We&apos;re Open <span className="text-accent">For You</span>
            </>
          }
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.35fr_0.8fr_1fr]">
          {/* opening times */}
          <div className={GLASS}>
            <h3 className="sr-only">Opening times</h3>
            <ul className="divide-y divide-white/10">
              {HOURS.map(({ days, time }) => (
                <li
                  key={days}
                  className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4"
                >
                  <span className="flex items-center gap-3 whitespace-nowrap text-sm text-white/85">
                    <FaCalendarDays aria-hidden="true" className="text-accent" /> {days}
                  </span>
                  {time ? (
                    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-bold">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-400" /> {time}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 whitespace-nowrap text-sm font-bold text-red-300">
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-400" /> Closed
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* reserve a table */}
          <div className="flex flex-col items-center justify-center rounded-2xl bg-brand px-8 py-10 text-center shadow-2xl shadow-black/25">
            <FaCalendarDays aria-hidden="true" className="text-4xl" />
            <h3 className="mt-4 font-heading text-2xl font-bold">Reserve a Table</h3>
            <p className="mt-2 text-sm text-white/85">Book ahead and your table will be waiting</p>
            <a
              href="#reservation"
              className="mt-6 rounded-full bg-white px-8 py-3 text-sm font-bold text-brand transition hover:-translate-y-0.5"
            >
              Reserve Now
            </a>
          </div>

          {/* find us */}
          <div className={GLASS}>
            <h3 className="flex items-center gap-2 font-semibold">
              <FaLocationDot aria-hidden="true" className="text-accent" /> Find Us
            </h3>
            <ul className="mt-5 divide-y divide-white/10">
              {contactRows.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex items-center justify-between gap-4 py-4 text-sm last:pb-0">
                  <span className="flex items-center gap-3 text-white/75">
                    <Icon aria-hidden="true" className="text-accent" /> {label}
                  </span>
                  <span className="text-right font-bold">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
