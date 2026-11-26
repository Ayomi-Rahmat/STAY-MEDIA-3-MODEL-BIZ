import { SITE } from "./site";
import { IMAGES } from "./images";
import { GALLERY } from "../features/restaurant/data/content";

/*
  Sample content for the homepage sections (template filler - replace with real content).
  REPLACE THESE with the real restaurant's information before launch -
  names, years, awards, reviews and blog posts below are NOT real.
*/

// Photos for the site-wide Gallery page (/gallery): all three businesses.
// Hotel and club photos are placeholders until the client supplies real ones (src: null shows the placeholder).
export const GALLERY_ALL = [
  ...GALLERY.map((photo) => ({ ...photo, unit: "restaurant" })),
  { unit: "hotel", src: null, alt: "Hotel room (photo coming soon)" },
  { unit: "hotel", src: null, alt: "Hotel reception (photo coming soon)" },
  { unit: "hotel", src: null, alt: "Hotel breakfast area (photo coming soon)" },
  { unit: "club", src: null, alt: "Club dance floor (photo coming soon)" },
  { unit: "club", src: null, alt: "Club bar and lounge (photo coming soon)" },
  { unit: "club", src: null, alt: "Club VIP area (photo coming soon)" },
];

export const TIMELINE = [
  {
    year: "2012",
    title: "Evolution of Restaurants",
    text: `${SITE.name} opens its first 20-seat diner on Flavor Street. Within 3 months, lines stretch around the block every evening as word of our food spreads.`,
  },
  {
    year: "2015",
    title: "Fine Dining & The Concept",
    text: "Expanding the vision - we introduced our signature tasting menu and hired our first Michelin-trained chef, elevating our craft to remarkable new heights.",
  },
  {
    year: "2019",
    title: "Our Signature Menu",
    text: "Launched our signature menu, merging gourmet quality with speed and convenience. Within 6 months we won 3 prestigious culinary awards nationally.",
  },
  {
    year: "2026",
    title: "National Expansion",
    text: "A growing team, a refreshed menu and thousands of happy guests - and we are only getting started.",
  },
];

export const CHEFS = [
  { name: "Alice Mortal", role: "Head Chef", years: 12, image: IMAGES.chef1 },
  { name: "Michael Corn", role: "Grill Master", years: 8, image: IMAGES.chef2 },
  { name: "Faz Chowdel", role: "Pastry Chef", years: 10, image: IMAGES.chef3 },
  { name: "William Latnum", role: "Pizza Artisan", years: 9, image: IMAGES.chef4 },
];

export const REVIEWS = [
  {
    name: "Cameron Fox",
    role: "Food Blogger",
    image: IMAGES.avatar1,
    text: `Booked a table for the family and the food arrived hot and fresh. Portions are generous. ${SITE.name} has become my go-to comfort food spot without question.`,
  },
  {
    name: "Priya Sharma",
    role: "Food Enthusiast",
    image: IMAGES.avatar2,
    text: "The truffle pasta blew my mind. I didn't expect that quality from such a relaxed spot. Great ambiance, super friendly staff. Highly recommended!",
  },
  {
    name: "David Park",
    role: "Corporate Client",
    image: IMAGES.avatar3,
    text: "Catered our office party of 50 people and everything was flawless. Fresh, delicious, on time and well presented. Nashville chicken was the absolute star!",
  },
];

export const BLOG_POSTS = [
  {
    slug: "healthy-eating-out-myth-or-reality",
    day: "14",
    month: "Mar",
    category: "Food & Health",
    title: "Healthy Eating Out: A Myth or Beautiful Reality",
    excerpt: "Fresh ingredients and smarter cooking are changing what a quick meal can be.",
    author: "James Writer",
    comments: 24,
    image: IMAGES.menuSmashBurger,
  },
  {
    slug: "is-eating-out-getting-healthier",
    day: "28",
    month: "Feb",
    category: "Food Science",
    title: "Is Eating Out Getting Healthier? Here's What We Found",
    excerpt: "Menus are evolving. Here is what is changing and why it matters.",
    author: "Sarah Grain",
    comments: 18,
    image: IMAGES.menuMargherita,
  },
  {
    slug: "hot-chickpeas-flake-recipe",
    day: "05",
    month: "Jan",
    category: "Recipes",
    title: "Innovative Hot Chickpeas Flake Crackin' Recipe at Home",
    excerpt: "A crispy, spicy snack you can make in minutes.",
    author: "Chef Marcus",
    comments: 32,
    image: IMAGES.menuNashville,
  },
];

// ---------- reservation form options ----------

export const SUBJECT_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "reservation", label: "Restaurant Reservation" },
  { value: "accommodation", label: "Hotel / Accommodation" },
  { value: "event", label: "Club & Events" },
  { value: "feedback", label: "Feedback" },
  { value: "other", label: "Other" },
];

