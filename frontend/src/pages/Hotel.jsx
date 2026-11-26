import { FaBed } from "react-icons/fa6";
import UnitPage from "./UnitPage";

// SAMPLE facilities - replace with the real hotel's details (an admin screen will manage these later).
const FACILITIES = [
  { title: "Comfortable Rooms", text: "Standard, deluxe and suite categories with room photos and descriptions." },
  { title: "Free Wi-Fi", text: "Fast, reliable internet throughout the property." },
  { title: "Breakfast", text: "Start the day with a fresh breakfast from our restaurant." },
  { title: "24/7 Reception", text: "Friendly support whenever you need it." },
  { title: "Secure Parking", text: "Safe on-site parking for guests." },
  { title: "On-site Dining", text: "Enjoy meals at our restaurant, steps from your room." },
];

export default function Hotel() {
  return (
    <UnitPage
      icon={FaBed}
      eyebrow="Stay With Us"
      title="Our Hotel"
      intro="Rest easy in comfortable rooms with warm, attentive service."
      facilities={FACILITIES}
      note="Room categories, availability and online booking are coming soon."
    />
  );
}
