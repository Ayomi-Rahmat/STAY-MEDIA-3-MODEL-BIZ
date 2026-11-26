import FoodImage from "../components/FoodImage";
import SectionHeading from "../components/SectionHeading";
import { GALLERY } from "../data/content";

// Photo grid. The first photo is big (two rows tall); the other four fill the remaining cells.
export default function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-36 bg-sand py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Food Showcase"
          title={
            <>
              Let&apos;s See Our <span className="text-brand">Fast Food</span>
            </>
          }
        />

        <ul className="mt-12 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] md:grid-cols-3 md:auto-rows-[215px]">
          {GALLERY.map((photo, index) => (
            <li
              key={photo.alt}
              className={`group overflow-hidden rounded-2xl ${
                index === 0 ? "col-span-2 row-span-2 md:col-span-1" : ""
              }`}
            >
              <FoodImage
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
