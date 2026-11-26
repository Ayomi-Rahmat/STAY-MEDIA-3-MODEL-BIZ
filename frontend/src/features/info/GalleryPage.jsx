import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import SiteLayout from "../../layouts/SiteLayout";
import PageHeader from "../../components/PageHeader";
import Photo from "../../components/Photo";
import Seo from "../../components/Seo";
import { GALLERY_ALL } from "../../data/content";

const TABS = [
  { id: "all", label: "All" },
  { id: "restaurant", label: "Restaurant" },
  { id: "hotel", label: "Hotel" },
  { id: "club", label: "Club" },
];

// Photos from all three businesses (PRD WEB-003, optional page). Filter by business; click a photo to enlarge it.
export default function GalleryPage() {
  const [tab, setTab] = useState("all");
  const [selected, setSelected] = useState(null);
  const dialogRef = useRef(null);

  const photos = GALLERY_ALL.filter((photo) => tab === "all" || photo.unit === tab);

  const open = (photo) => {
    setSelected(photo);
    // wait one frame so the <dialog> exists, then show it as a modal
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  return (
    <SiteLayout>
      <Seo
        title="Gallery"
        path="/gallery"
        description="Photos of our restaurant, hotel and club: the food, the rooms, the atmosphere and the events."
      />
      <PageHeader eyebrow="Our Moments" title="Gallery" subtitle="A look at our food, our spaces and our nights." />
      <section className="bg-sand py-16">
        <div className="container-x">
          <ul className="flex flex-wrap justify-center gap-3" aria-label="Filter photos by business">
            {TABS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  aria-pressed={tab === id}
                  onClick={() => setTab(id)}
                  className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
                    tab === id
                      ? "border-brand bg-brand text-white shadow-lg shadow-brand/30"
                      : "border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.alt} className="group overflow-hidden rounded-2xl bg-white">
                <button type="button" onClick={() => open(photo)} aria-label={`Enlarge photo: ${photo.alt}`} className="block h-48 w-full sm:h-60">
                  <Photo src={photo.src} alt={photo.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {selected && (
        <dialog
          ref={dialogRef}
          onClose={() => setSelected(null)}
          onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
          aria-label={selected.alt}
          className="m-auto w-[min(92vw,60rem)] overflow-hidden rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/70"
        >
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            aria-label="Close"
            className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg shadow-md"
          >
            <FaXmark />
          </button>
          <Photo src={selected.src} alt={selected.alt} loading="eager" className="max-h-[75vh] w-full object-contain" />
          <p className="p-4 text-center text-sm text-gray-600">{selected.alt}</p>
        </dialog>
      )}
    </SiteLayout>
  );
}
