import SectionHeading from "../components/SectionHeading";
import { TIMELINE } from "../data/content";

// Vertical timeline. On desktop the entries alternate left/right of a centre line;
// on phones everything sits to the right of a line on the left edge.
export default function History() {
  return (
    <section id="history" className="scroll-mt-36 bg-cream py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Journey"
          title={
            <>
              A History of <span className="text-brand">Restaurant</span>
            </>
          }
          subtitle="From humble beginnings to the city's most beloved restaurant - every chapter written with passion."
        />

        <ol className="relative mx-auto mt-14 max-w-4xl">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-3 top-2 w-0.5 bg-linear-to-b from-brand to-accent md:left-1/2 md:-translate-x-1/2"
          />

          {TIMELINE.map((entry, index) => {
            const onLeft = index % 2 === 0;
            return (
              <li key={entry.year} className="relative pb-12 pl-12 last:pb-0 md:grid md:grid-cols-2 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-1.5 grid h-6 w-6 -translate-x-1/2 place-items-center rounded-full bg-brand/25 md:left-1/2"
                >
                  <span className="h-3 w-3 rounded-full bg-brand" />
                </span>

                <div
                  className={
                    onLeft ? "md:col-start-1 md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"
                  }
                >
                  <p className="font-heading text-2xl italic text-brand">{entry.year}</p>
                  <h3 className="mt-1 font-heading text-lg font-bold">{entry.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{entry.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
