import { Link } from "react-router-dom";
import { FaBell, FaCalendarCheck, FaReceipt } from "react-icons/fa6";

const PERKS = [
  { icon: FaCalendarCheck, title: "All bookings in one place", text: "Tables, rooms and club nights appear in a single account." },
  { icon: FaReceipt, title: "Payment history", text: "See every payment and confirmation without searching your inbox." },
  { icon: FaBell, title: "Stay informed", text: "Get notified when a booking is confirmed or changed." },
];

// Explains that one account works across the restaurant, hotel and club.
export default function OneAccount() {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <div className="rounded-3xl bg-night px-6 py-12 text-white sm:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold">
              One Account, <span className="text-accent">Every Booking</span>
            </h2>
            <p className="mt-3 text-sm text-white/70">
              Sign up once and use the same login for the restaurant, the hotel and the club.
            </p>
          </div>
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {PERKS.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand/20 text-accent">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm text-white/65">{text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <Link to="/register" className="inline-block rounded-full bg-brand px-8 py-3 text-sm font-bold transition hover:-translate-y-0.5">
              Create Your Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
