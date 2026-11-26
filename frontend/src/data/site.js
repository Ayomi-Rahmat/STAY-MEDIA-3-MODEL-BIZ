// ONE place for the words and numbers shown on the homepage.
// To change a phone number, a nav label or a stat, edit it here - no hunting through components.
// (Values are SAMPLE content; replace with the real business details.)

export const SITE = {
  // PLACEHOLDER brand name - the client has not chosen one yet. Change it here and the whole site updates.
  name: "Your Brand",
  tagline: "Restaurant \u00b7 Hotel \u00b7 Club",
  phone: "+234 803 123 4567",
  email: "hello@yourbrand.com",
  address: "12 Admiralty Way, Lekki, Lagos",
  fullAddress: "12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria",
  hours: "Wed - Sun: 9 AM - 11 PM",
  // PLACEHOLDER website address - replace with the real domain before launch (also in public/sitemap.xml and robots.txt).
  url: "https://www.yourbrand.com",
  // Used by Google and when the link is shared on WhatsApp / social media.
  description: "Eat, stay and celebrate in one place. Reserve a table at our restaurant, book a hotel room or plan a night at our club.",
  shareImage: "/images/hero-burger.jpg",
  // WhatsApp number for the chat button: country code + number, digits only (no + or spaces).
  whatsapp: "2348031234567",
  promo: "Book a table, a room or a night out",
  // Currency CODE used to format every price (USD, NGN, GBP...). Change it here once.
  currency: "NGN",
  currencyLocale: "en-NG",
};

// The three businesses. The homepage cards, navbar and footer all read from this list.
// `path` is the page address; add a new unit here and it appears everywhere.
export const UNITS = [
  {
    id: "restaurant",
    name: "Restaurant",
    path: "/restaurant",
    blurb: "Fresh, flavour-packed dishes served fast and friendly. Browse the menu and reserve your table online.",
    points: ["Full food & drinks menu", "Online table reservation", "Open Wednesday to Sunday"],
    cta: "Explore & Reserve",
  },
  {
    id: "hotel",
    name: "Hotel",
    path: "/hotel",
    blurb: "Comfortable rooms and warm hospitality. See room categories, facilities and book your stay.",
    points: ["Room categories & photos", "Facilities & services", "Online room booking"],
    cta: "View Rooms",
  },
  {
    id: "club",
    name: "Club",
    path: "/club",
    blurb: "Music, drinks and unforgettable nights. Discover the venue, upcoming events and table reservations.",
    points: ["Events & entertainment", "Facilities & services", "Table reservation enquiries"],
    cta: "Plan Your Night",
  },
];

export const HERO_STATS = [
  { value: "850", suffix: "+", label: "Happy Customers" },
  { value: "120", suffix: "+", label: "Menu Items" },
  { value: "15", suffix: "+", label: "Expert Chefs" },
  { value: "12", suffix: "yr", label: "Experience" },
];

export const TICKER_ITEMS = [
  "Gourmet Burgers",
  "Artisan Pizzas",
  "Fresh Wraps & Rolls",
  "Loaded Fries",
  "Ice Cream Shakes",
  "Grilled Sandwiches",
  "Crispy Fried Chicken",
];
