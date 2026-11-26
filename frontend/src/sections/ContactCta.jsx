import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";

// A short call-to-action band that sends people to the Contact page.
// `subject` pre-selects the subject there: general | reservation | accommodation | event
export default function ContactCta({
  subject = "general",
  title = "Have a question?",
  text = "Send us a message and we'll get back to you.",
}) {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-night px-8 py-10 text-center text-white md:flex-row md:text-left">
          <div>
            <h2 className="font-heading text-2xl font-bold">{title}</h2>
            <p className="mt-1.5 text-sm text-white/70">{text}</p>
          </div>
          <Link
            to={`/contact?subject=${subject}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-bold transition hover:-translate-y-0.5"
          >
            <FaEnvelope aria-hidden="true" /> Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
