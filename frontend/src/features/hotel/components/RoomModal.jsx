import { useEffect, useRef } from "react";
import { FaBed, FaRulerCombined, FaUsers, FaXmark } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import { FALLBACK_ROOM } from "../../../data/images";
import Button from "../../../components/Button";
import Amenities from "./Amenities";
import { formatPrice } from "../../../utils/format";

// Pop-up with everything about one room (same <dialog> idea as the menu's food-details window).
export default function RoomModal({ room, onClose, onBook }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    dialogRef.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const photos = room.images.length > 0 ? room.images : [null];

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && dialogRef.current.close()}
      aria-labelledby="room-title"
      className="m-auto max-h-[90vh] w-[min(92vw,56rem)] overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/60"
    >
      <div className="relative">
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg shadow-md transition hover:scale-110"
        >
          <FaXmark />
        </button>
        <div className={`grid gap-1 ${photos.length > 1 ? "sm:grid-cols-2" : ""}`}>
          {photos.slice(0, 4).map((src, index) => (
            <Photo key={src ?? index} src={src} fallback={FALLBACK_ROOM} alt={`${room.name} photo ${index + 1}`} className="h-56 w-full object-cover sm:h-72" />
          ))}
        </div>
        <div className="p-6 sm:p-8">
          <h2 id="room-title" className="font-heading text-3xl font-bold">
            {room.name}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-gray-500">
            <li className="inline-flex items-center gap-2"><FaBed aria-hidden="true" className="text-brand" /> {room.bed}</li>
            <li className="inline-flex items-center gap-2"><FaUsers aria-hidden="true" className="text-brand" /> Up to {room.maxGuests} guests</li>
            <li className="inline-flex items-center gap-2"><FaRulerCombined aria-hidden="true" className="text-brand" /> {room.sizeSqm} m²</li>
          </ul>
          <p className="mt-4 leading-relaxed text-gray-600">{room.longDescription}</p>
          <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-accent">What&apos;s in the room</h3>
          <div className="mt-3">
            <Amenities items={room.amenities} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-6">
            <p>
              <span className="font-heading text-3xl font-bold text-brand">{formatPrice(room.pricePerNight)}</span>
              <span className="text-sm text-gray-500"> / night</span>
            </p>
            <Button
              fullWidth={false}
              className="rounded-full"
              onClick={() => {
                dialogRef.current.close();
                onBook(room);
              }}
            >
              Book this room
            </Button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
