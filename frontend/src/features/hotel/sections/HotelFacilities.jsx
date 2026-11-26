import { FaBellConcierge, FaBolt, FaCar, FaMugHot, FaPlaneArrival, FaShirt, FaUtensils, FaWifi } from "react-icons/fa6";
import SectionHeading from "../../../components/SectionHeading";
import { HOTEL_FACILITIES, HOTEL_POLICIES } from "../data/rooms";

const ICONS = {
  reception: FaBellConcierge,
  wifi: FaWifi,
  breakfast: FaMugHot,
  parking: FaCar,
  dining: FaUtensils,
  laundry: FaShirt,
  power: FaBolt,
  airport: FaPlaneArrival,
};

// PRD 4.3: hotel facilities. House rules sit underneath so guests see them before booking.
export default function HotelFacilities() {
  return (
    <section id="facilities" className="scroll-mt-22 bg-cream py-20">
      <div className="container-x">
        <SectionHeading eyebrow="Comfort & Care" title={<>Hotel <span className="text-brand">Facilities</span></>} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOTEL_FACILITIES.map(({ icon, title, text }) => {
            const Icon = ICONS[icon] ?? FaBellConcierge;
            return (
              <li key={title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{text}</p>
              </li>
            );
          })}
        </ul>

        <div id="policies" className="mt-16 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <h3 className="font-heading text-2xl font-bold">House rules</h3>
          <dl className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {HOTEL_POLICIES.map(({ title, text }) => (
              <div key={title}>
                <dt className="text-sm font-bold text-ink">{title}</dt>
                <dd className="mt-0.5 text-sm text-gray-500">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
