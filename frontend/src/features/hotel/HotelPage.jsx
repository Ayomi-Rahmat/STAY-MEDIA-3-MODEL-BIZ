import { useState } from "react";
import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import ContactCta from "../../sections/ContactCta";
import { SITE } from "../../data/site";
import { hotelApi } from "../../services/api";
import useRooms from "./hooks/useRooms";
import HotelHero from "./sections/HotelHero";
import AvailabilitySearch from "./sections/AvailabilitySearch";
import Rooms from "./sections/Rooms";
import HotelFacilities from "./sections/HotelFacilities";
import HotelBooking from "./sections/HotelBooking";
import RoomModal from "./components/RoomModal";

const scrollToId = (id) => {
  // wait one frame so newly shown content exists before we scroll to it
  requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }));
};

// The Hotel page owns the shared state: the stay (dates + guests), the availability result and the chosen room.
// Each section below just receives what it needs (lifting state up, same as the Restaurant page).
export default function HotelPage() {
  const { rooms, loading, error, retry } = useRooms();
  const [stay, setStay] = useState({ checkIn: "", checkOut: "", guests: "2" });
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [hint, setHint] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [detailsRoom, setDetailsRoom] = useState(null);

  const selectedRoom = rooms.find((room) => room.id === selectedId) ?? null;

  const updateStay = (next) => {
    setStay(next);
    // Old results no longer match the new dates, so clear them (and the chosen room).
    setAvailability(null);
    setSelectedId(null);
    setHint("");
  };

  const search = async (current) => {
    setSearchError("");
    setChecking(true);
    try {
      const data = await hotelApi.checkAvailability({ checkIn: current.checkIn, checkOut: current.checkOut, guests: current.guests });
      setAvailability(data);
      scrollToId("rooms");
    } catch (err) {
      setSearchError(err.fieldErrors?.checkOut ?? err.message ?? "Could not check availability. Please try again.");
    } finally {
      setChecking(false);
    }
  };

  const book = (room) => {
    if (!availability) {
      setHint("Choose your check-in and check-out dates first, then pick a room.");
      scrollToId("availability");
      return;
    }
    const status = availability.rooms.find((entry) => entry.id === room.id);
    if (status && !status.available) {
      setHint(`${room.name} is not available for these dates or this many guests. Please pick another room.`);
      scrollToId("availability");
      return;
    }
    setSelectedId(room.id);
    scrollToId("booking");
  };

  const changeRoom = () => {
    setSelectedId(null);
    scrollToId("rooms");
  };

  return (
    <SiteLayout>
      <Seo
        title="Hotel"
        path="/hotel"
        description="Comfortable rooms and suites in Lagos. Check availability, choose a room and book online."
        schema={{
          "@type": "Hotel",
          name: `${SITE.name} Hotel`,
          url: `${SITE.url}/hotel`,
          telephone: SITE.phone,
          email: SITE.email,
          checkinTime: "14:00",
          checkoutTime: "12:00",
          address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: "Lagos", addressCountry: "NG" },
        }}
      />
      <HotelHero />
      <AvailabilitySearch stay={stay} onChange={updateStay} onSearch={search} loading={checking} error={searchError} hint={hint} />
      <Rooms
        rooms={rooms}
        loading={loading}
        error={error}
        onRetry={retry}
        availability={availability}
        onDetails={setDetailsRoom}
        onBook={book}
      />
      <HotelFacilities />
      <HotelBooking key={selectedId ?? "none"} room={selectedRoom} stay={stay} onChangeRoom={changeRoom} />
      <ContactCta subject="accommodation" title="Questions about a stay? Send an accommodation enquiry" text="Group bookings, long stays or special requests - we'll get back to you." />
      {detailsRoom && <RoomModal room={detailsRoom} onClose={() => setDetailsRoom(null)} onBook={book} />}
    </SiteLayout>
  );
}
