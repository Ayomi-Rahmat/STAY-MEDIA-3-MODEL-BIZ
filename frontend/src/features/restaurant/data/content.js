import { IMAGES } from "../../../data/images";

// Content that belongs only to the Restaurant (sample text - replace with the real details).

export const GALLERY = [
  { src: IMAGES.galleryBurger, alt: "Classic cheeseburger with fresh lettuce and tomato" },
  { src: IMAGES.menuMargherita, alt: "Wood-fired pizza" },
  { src: IMAGES.menuNashville, alt: "Crispy chicken sandwich with sauce" },
  { src: IMAGES.menuLavaCake, alt: "Chocolate dessert with sprinkles" },
  { src: IMAGES.menuFajita, alt: "Grilled steak and vegetables" },
];

// time: null means closed that day
export const HOURS = [
  { days: "Monday - Tuesday", time: null },
  { days: "Wednesday - Thursday", time: "09:00 AM - 10:00 PM" },
  { days: "Friday", time: "09:00 AM - 11:00 PM" },
  { days: "Saturday", time: "10:00 AM - 11:30 PM" },
  { days: "Sunday", time: "11:00 AM - 09:00 PM" },
];

// Every 30 minutes from 09:00 to 23:00. value = "HH:mm" (24h, sent to the backend), label = "09:00 AM".
export const TIME_SLOTS = Array.from({ length: 29 }, (_, index) => {
  const totalMinutes = 9 * 60 + index * 30;
  const hour24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const hour12 = hour24 % 12 || 12;
  const pad = (n) => String(n).padStart(2, "0");
  return {
    value: `${pad(hour24)}:${pad(minutes)}`,
    label: `${pad(hour12)}:${pad(minutes)} ${hour24 >= 12 ? "PM" : "AM"}`,
  };
});

export const GUEST_OPTIONS = [
  ...Array.from({ length: 10 }, (_, index) => ({
    value: String(index + 1),
    label: index === 0 ? "1 Person" : `${index + 1} People`,
  })),
  { value: "11+", label: "More than 10 (group dining)" },
];

// SAMPLE restaurant facilities and services (PRD 4.2). Replace with the real ones; icons are chosen in sections/Facilities.jsx.
export const FACILITIES = [
  { icon: "ac", title: "Air-Conditioned Dining", text: "A cool, comfortable indoor dining hall." },
  { icon: "outdoor", title: "Outdoor Seating", text: "A relaxed open-air area for evenings." },
  { icon: "wifi", title: "Free Wi-Fi", text: "Fast internet for guests, free of charge." },
  { icon: "parking", title: "Secure Parking", text: "On-site parking with attendants." },
  { icon: "kids", title: "Family Friendly", text: "Kids' menu and high chairs available." },
  { icon: "access", title: "Easy Access", text: "Step-free entrance and accessible restrooms." },
];

export const SERVICES = [
  { icon: "table", title: "Table Reservations", text: "Reserve online and walk straight to your table." },
  { icon: "private", title: "Private Dining", text: "A separate room for meetings and intimate dinners." },
  { icon: "party", title: "Birthdays & Celebrations", text: "Tell us the occasion and we will help make it special." },
  { icon: "group", title: "Group Dining", text: "Special arrangements for parties of 10 or more." },
  { icon: "events", title: "Event Hosting", text: "Corporate lunches, launches and small functions." },
  { icon: "catering", title: "Catering Enquiries", text: "Ask us about food for your own event." },
];

export const SEATING_OPTIONS = [
  { value: "any", label: "No preference" },
  { value: "indoor", label: "Indoor dining" },
  { value: "outdoor", label: "Outdoor seating" },
  { value: "private", label: "Private dining room" },
];
