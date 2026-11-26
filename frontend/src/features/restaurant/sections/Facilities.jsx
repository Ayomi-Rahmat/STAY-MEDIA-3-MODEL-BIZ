import {
  FaBaby, FaBellConcierge, FaCakeCandles, FaCalendarCheck, FaCar, FaKitchenSet, FaPeopleGroup,
  FaPersonWalkingWithCane, FaSnowflake, FaTree, FaUsersLine, FaWifi, FaDoorClosed,
} from "react-icons/fa6";
import SectionHeading from "../../../components/SectionHeading";
import { FACILITIES, SERVICES } from "../data/content";

// The data (src/data/content.js) names an icon with a short word; this table turns the word into the real icon.
const ICONS = {
  ac: FaSnowflake,
  outdoor: FaTree,
  wifi: FaWifi,
  parking: FaCar,
  kids: FaBaby,
  access: FaPersonWalkingWithCane,
  table: FaCalendarCheck,
  private: FaDoorClosed,
  party: FaCakeCandles,
  group: FaPeopleGroup,
  events: FaUsersLine,
  catering: FaKitchenSet,
};

function Group({ title, items, id }) {
  return (
    <div>
      <h3 id={id} className="flex items-center gap-2 font-heading text-2xl font-bold text-ink">
        <FaBellConcierge aria-hidden="true" className="text-brand" /> {title}
      </h3>
      <ul aria-labelledby={id} className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map(({ icon, title: name, text }) => {
          const Icon = ICONS[icon] ?? FaBellConcierge;
          return (
            <li key={name} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h4 className="font-semibold text-ink">{name}</h4>
                <p className="mt-1 text-sm text-gray-500">{text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// PRD 4.2: "Restaurant facilities" and "Available services".
export default function Facilities() {
  return (
    <section id="facilities" className="scroll-mt-22 bg-cream py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Comfort & Care"
          title={
            <>
              Facilities &amp; <span className="text-brand">Services</span>
            </>
          }
          subtitle="Everything we provide to make your visit relaxed and memorable."
        />
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <Group id="facilities-title" title="Our Facilities" items={FACILITIES} />
          <Group id="services-title" title="Our Services" items={SERVICES} />
        </div>
      </div>
    </section>
  );
}
