import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import SiteLayout from "../layouts/SiteLayout";
import PageHeader from "../components/PageHeader";
import { FAQS } from "../data/pages";

// Each question is a native <details> element: it opens and closes by itself (keyboard friendly, no state needed).
export default function Faq() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Got Questions?" title="Frequently Asked Questions" subtitle="Quick answers about bookings, accounts and contacting us." />
      <section className="bg-white py-16">
        <div className="container-x max-w-3xl">
          <ul className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <li key={q}>
                <details className="group rounded-2xl bg-sand p-5 open:bg-cream open:ring-1 open:ring-brand/20">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {q}
                    <FaChevronDown aria-hidden="true" className="shrink-0 text-xs text-brand transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-gray-600">{a}</p>
                </details>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-gray-600">
            Still need help?{" "}
            <Link to="/#contact" className="font-semibold text-brand hover:underline">
              Send us a message
            </Link>
            .
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
