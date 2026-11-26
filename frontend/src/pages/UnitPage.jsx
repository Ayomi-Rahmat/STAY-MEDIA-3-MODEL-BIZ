import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import SiteLayout from "../layouts/SiteLayout";
import SectionHeading from "../components/SectionHeading";
import Contact from "../sections/Contact";

// One template for the Hotel and Club pages. Their real content (rooms, events, photos)
// arrives in a later phase; for now each page has an overview, facilities and the enquiry form.
export default function UnitPage({ eyebrow, title, intro, facilities, icon: Icon, note }) {
  return (
    <SiteLayout>
      <section id="home" className="bg-cream py-20 text-center">
        <div className="container-x">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-flame to-accent text-3xl text-white shadow-lg shadow-brand/25">
            <Icon aria-hidden="true" />
          </span>
          <p className="mt-6 font-script text-2xl text-brand">{eyebrow}</p>
          <h1 className="mt-1 font-heading text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">{intro}</p>
        </div>
      </section>

      <section id="facilities" className="bg-white py-20">
        <div className="container-x">
          <SectionHeading eyebrow="What We Offer" title={<>Facilities &amp; <span className="text-brand">Services</span></>} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map(({ title: name, text }) => (
              <li key={name} className="rounded-2xl bg-sand p-6">
                <h3 className="font-heading text-lg font-bold text-ink">{name}</h3>
                <p className="mt-2 text-sm text-gray-600">{text}</p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl bg-cream p-5 text-sm text-gray-700">
            <FaCircleInfo aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
            <span>
              {note} In the meantime, send us an enquiry below, or look at our{" "}
              <Link to="/restaurant" className="font-semibold text-brand hover:underline">
                restaurant
              </Link>
              .
            </span>
          </p>
        </div>
      </section>

      <Contact />
    </SiteLayout>
  );
}
