import { FaBed } from "react-icons/fa6";

// Top of the hotel page: title and a short welcome. The date search sits right under it.
export default function HotelHero() {
  return (
    <section id="home" className="bg-cream pb-6 pt-16 text-center">
      <div className="container-x">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-flame to-accent text-3xl text-white shadow-lg shadow-brand/25">
          <FaBed aria-hidden="true" />
        </span>
        <p className="mt-6 font-script text-2xl text-brand">Stay With Us</p>
        <h1 className="mt-1 font-heading text-4xl font-bold text-ink sm:text-5xl">Our Hotel</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Rest easy in comfortable rooms with warm, attentive service. Pick your dates, choose a room and book online.
        </p>
      </div>
    </section>
  );
}
