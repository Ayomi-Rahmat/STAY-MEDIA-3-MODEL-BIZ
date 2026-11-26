import { FaMartiniGlassCitrus } from "react-icons/fa6";
import UnitPage from "../../layouts/UnitPage";

// SAMPLE facilities - replace with the real club's details (an admin screen will manage these later).
const FACILITIES = [
  { title: "Live Entertainment", text: "DJs, live music and themed nights." },
  { title: "VIP Tables", text: "Reserve a table for you and your guests." },
  { title: "Bar & Lounge", text: "Cocktails, spirits and bottle service." },
  { title: "Private Events", text: "Birthdays and celebrations hosted with care." },
  { title: "Sound & Lighting", text: "A professional stage and sound system." },
  { title: "Secure Entry", text: "Safe, well-managed access and security." },
];

export default function Club() {
  return (
    <UnitPage
      icon={FaMartiniGlassCitrus}
      eyebrow="Night Out"
      title="Our Club"
      intro="Great music, great company and nights worth remembering."
      facilities={FACILITIES}
      path="/club"
      schemaType="NightClub"
      seoDescription="Music, drinks and unforgettable nights. See our facilities and send an event or table enquiry."
      enquirySubject="event"
      enquiryTitle="Planning an event or a night out? Send an enquiry"
      note="Upcoming events and online table reservations are coming soon."
    />
  );
}
