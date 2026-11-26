import { FaBed, FaCircleCheck, FaRulerCombined, FaUsers } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import { FALLBACK_ROOM } from "../../../data/images";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import Alert from "../../../components/Alert";
import Amenities from "../components/Amenities";
import { formatPrice } from "../../../utils/format";

const REASONS = {
  too_many_guests: "Too small for your group",
  sold_out: "Sold out for these dates",
};

function RoomCard({ room, status, nights, onDetails, onBook }) {
  const unavailable = status && !status.available;
  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl ${unavailable ? "opacity-75" : ""}`}>
      <div className="relative h-56 overflow-hidden">
        <Photo src={room.images[0]} fallback={FALLBACK_ROOM} alt={room.name} className="h-full w-full object-cover" />
        {room.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-md bg-brand px-2.5 py-1 text-[11px] font-bold text-white">{room.badge}</span>
        )}
        {status && (
          <span
            className={`absolute right-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
              status.available ? "bg-green-600 text-white" : "bg-gray-800 text-white"
            }`}
          >
            {status.available ? (<><FaCircleCheck aria-hidden="true" /> Available</>) : REASONS[status.reason] ?? "Unavailable"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-xl font-bold">{room.name}</h3>
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          <li className="inline-flex items-center gap-1.5"><FaBed aria-hidden="true" className="text-brand" /> {room.bed}</li>
          <li className="inline-flex items-center gap-1.5"><FaUsers aria-hidden="true" className="text-brand" /> Up to {room.maxGuests}</li>
          <li className="inline-flex items-center gap-1.5"><FaRulerCombined aria-hidden="true" className="text-brand" /> {room.sizeSqm} m²</li>
        </ul>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{room.description}</p>
        <div className="mt-4">
          <Amenities items={room.amenities} limit={4} />
        </div>
        <div className="mt-auto pt-5">
          <p className="flex items-baseline gap-1">
            <span className="font-heading text-2xl font-bold text-brand">{formatPrice(room.pricePerNight)}</span>
            <span className="text-xs text-gray-500">/ night</span>
          </p>
          {status?.available && (
            <p className="text-xs text-gray-500">
              {formatPrice(status.totalPrice)} for {nights} {nights === 1 ? "night" : "nights"}
            </p>
          )}
          <div className="mt-4 flex gap-3">
            <Button variant="outline" fullWidth={false} className="flex-1 rounded-full" onClick={() => onDetails(room)} aria-label={`View details for ${room.name}`}>
              View Details
            </Button>
            <Button fullWidth={false} className="flex-1 rounded-full" disabled={unavailable} onClick={() => onBook(room)} aria-label={`Book ${room.name}`}>
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

// PRD 4.3: room categories, descriptions, images, availability.
//   availability = null (not checked yet) or { nights, rooms: [{ id, available, reason, totalPrice }] }
export default function Rooms({ rooms, loading, error, onRetry, availability, onDetails, onBook }) {
  const statusOf = (id) => availability?.rooms.find((entry) => entry.id === id);

  return (
    <section id="rooms" className="scroll-mt-22 bg-white py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="Rooms & Suites"
          title={<>Choose Your <span className="text-brand">Room</span></>}
          subtitle={
            availability
              ? "Showing availability for your dates. Pick a room to continue."
              : "Browse our rooms. Choose your dates above to see what is available."
          }
        />

        {loading && (
          <ul aria-label="Loading rooms" role="status" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <li key={index} className="h-96 animate-pulse rounded-3xl bg-sand" />
            ))}
          </ul>
        )}

        {error && (
          <div className="mx-auto mt-10 max-w-md text-center">
            <Alert type="error">{error}</Alert>
            <Button variant="outline" fullWidth={false} className="mt-4" onClick={onRetry}>Try again</Button>
          </div>
        )}

        {!loading && !error && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                status={statusOf(room.id)}
                nights={availability?.nights}
                onDetails={onDetails}
                onBook={onBook}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
