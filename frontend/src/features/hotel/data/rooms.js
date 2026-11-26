/*
  SAMPLE hotel content (PRD 4.3) - replace with the real hotel's rooms, prices and photos.
  Photos: put files in public/images/ and list them in `images` (e.g. "/images/room-deluxe-1.jpg").
  While `images` is empty a placeholder picture is shown, so nothing looks broken.

  The backend sends the same shape from GET /api/hotel/rooms (see API_CONTRACT.md section 10).
  `amenities` uses short icon words; features/hotel/components/RoomAmenities.jsx turns them into icons.
*/

export const ROOMS = [
  {
    id: "standard",
    name: "Standard Room",
    pricePerNight: 45000,
    maxGuests: 2,
    sizeSqm: 22,
    bed: "1 Queen bed",
    roomsTotal: 6,
    badge: null,
    images: [],
    description: "A calm, comfortable room with everything you need for a short stay.",
    longDescription:
      "Our Standard Room is a bright, air-conditioned room with a queen bed, a work desk and a private bathroom with hot water. A good choice for solo travellers and couples who want comfort at a fair price.",
    amenities: ["ac", "wifi", "tv", "bath", "breakfast"],
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    pricePerNight: 65000,
    maxGuests: 3,
    sizeSqm: 30,
    bed: "1 King bed",
    roomsTotal: 4,
    badge: "Popular",
    images: [],
    description: "More space, a king bed and a small seating area. Our most booked room.",
    longDescription:
      "The Deluxe Room gives you extra space, a king bed, a seating corner and a bigger bathroom. A third guest can be added with a sofa bed. Breakfast for two is included.",
    amenities: ["ac", "wifi", "tv", "bath", "breakfast", "minibar", "kettle"],
  },
  {
    id: "executive",
    name: "Executive Room",
    pricePerNight: 85000,
    maxGuests: 3,
    sizeSqm: 38,
    bed: "1 King bed",
    roomsTotal: 3,
    badge: null,
    images: [],
    description: "Built for business and longer stays, with a proper work desk and a balcony.",
    longDescription:
      "The Executive Room has a king bed, a large work desk, a private balcony and a safe for your laptop and valuables. Fast Wi-Fi and breakfast are included.",
    amenities: ["ac", "wifi", "tv", "bath", "breakfast", "minibar", "desk", "safe", "balcony"],
  },
  {
    id: "family",
    name: "Family Room",
    pricePerNight: 110000,
    maxGuests: 5,
    sizeSqm: 48,
    bed: "2 Queen beds",
    roomsTotal: 2,
    badge: null,
    images: [],
    description: "Two queen beds and plenty of room for the whole family.",
    longDescription:
      "The Family Room sleeps up to five guests with two queen beds and a sofa bed. It has a large bathroom, a mini fridge and extra storage. Cots can be added on request.",
    amenities: ["ac", "wifi", "tv", "bath", "breakfast", "minibar", "kettle"],
  },
  {
    id: "suite",
    name: "Presidential Suite",
    pricePerNight: 180000,
    maxGuests: 4,
    sizeSqm: 75,
    bed: "1 King bed + lounge",
    roomsTotal: 1,
    badge: "Best Suite",
    images: [],
    description: "Our top suite: a separate lounge, a private balcony and a bath tub.",
    longDescription:
      "The Presidential Suite has a king bedroom, a separate lounge, a dining corner, a private balcony and a bathroom with a bath tub. Airport pick-up and daily breakfast are included.",
    amenities: ["ac", "wifi", "tv", "bath", "breakfast", "minibar", "desk", "safe", "balcony", "kettle"],
  },
];

export const AMENITY_LABELS = {
  ac: "Air conditioning",
  wifi: "Free Wi-Fi",
  tv: "Smart TV",
  bath: "Private bathroom",
  breakfast: "Breakfast included",
  minibar: "Mini bar",
  desk: "Work desk",
  safe: "In-room safe",
  balcony: "Balcony",
  kettle: "Tea & coffee",
};

// SAMPLE hotel-wide facilities.
export const HOTEL_FACILITIES = [
  { icon: "reception", title: "24/7 Reception", text: "Friendly help any time, day or night." },
  { icon: "wifi", title: "Free Wi-Fi", text: "Fast internet in rooms and public areas." },
  { icon: "breakfast", title: "Breakfast", text: "A fresh breakfast served every morning." },
  { icon: "parking", title: "Secure Parking", text: "Safe on-site parking for guests." },
  { icon: "dining", title: "On-site Restaurant", text: "Enjoy meals at our restaurant, steps from your room." },
  { icon: "laundry", title: "Laundry", text: "Same-day laundry and ironing on request." },
  { icon: "power", title: "Backup Power", text: "Steady electricity all day, even during outages." },
  { icon: "airport", title: "Airport Pick-up", text: "We can arrange a car to meet you on arrival." },
];

// SAMPLE house rules - confirm with the client (cancellation policy is still an open question in the PRD).
export const HOTEL_POLICIES = [
  { title: "Check-in", text: "From 2:00 PM. Early check-in on request, subject to availability." },
  { title: "Check-out", text: "By 12:00 noon. Late check-out on request." },
  { title: "Cancellation", text: "To be confirmed by the hotel. Tell us as early as you can if your plans change." },
  { title: "Payment", text: "Your booking is confirmed by email. Payment details will be shared once the hotel confirms." },
  { title: "Children", text: "Children are welcome. Please count them in the number of guests." },
  { title: "ID at arrival", text: "Please bring a valid government ID for check-in." },
];
