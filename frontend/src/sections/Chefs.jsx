import FoodImage from "../components/FoodImage";
import SectionHeading from "../components/SectionHeading";
import { CHEFS } from "../data/content";
import { FALLBACK_PERSON } from "../data/images";

export default function Chefs() {
  return (
    <section id="chefs" className="scroll-mt-36 bg-white py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="The Culinary Team"
          title={
            <>
              Meet Our Expert <span className="text-brand">Chefs</span>
            </>
          }
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHEFS.map((chef) => (
            <li
              key={chef.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg shadow-black/5 ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/4.2] overflow-hidden">
                <FoodImage
                  src={chef.image}
                  alt={`${chef.name}, ${chef.role}`}
                  fallback={FALLBACK_PERSON}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-5 py-5 text-center">
                <h3 className="font-semibold">{chef.name}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-brand">{chef.role}</p>
                <p className="mt-1.5 text-xs text-gray-400">{chef.years} years experience</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
