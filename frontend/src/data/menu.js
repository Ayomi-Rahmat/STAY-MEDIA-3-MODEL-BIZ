import { IMAGES } from "./images";

/*
  SAMPLE MENU - the exact shape the backend should return from  GET /api/menu
  (see API_CONTRACT.md). Used only while VITE_USE_MOCK=true.

  category.count  = how many dishes that category has in total (shown on the "Browse by Category" cards)
  category.hidden = true -> still a filter pill, but no card in "Browse by Category"
  item.badge      = "Hot" | "New" | "Best Seller" | "Chef's Pick" | null
  item.oldPrice   = null when there is no discount
*/
export const MENU_DATA = {
  totalItems: 99,
  categories: [
    { id: "burgers", name: "Burgers", pill: "Burgers", count: 24, image: IMAGES.menuSmashBurger },
    { id: "pizza", name: "Pizza", pill: "Pizza", count: 18, image: IMAGES.menuMargherita },
    { id: "chicken", name: "Fried Chicken", pill: "Chicken", count: 15, image: IMAGES.menuNashville },
    { id: "wraps", name: "Wraps", pill: "Wraps", count: 12, image: IMAGES.menuFajita },
    { id: "desserts", name: "Desserts", pill: "Desserts", count: 20, image: IMAGES.menuLavaCake },
    { id: "pasta", name: "Pasta", pill: "Pasta", count: 10, image: IMAGES.menuTrufflePasta, hidden: true },
  ],
  items: [
    {
      id: 1,
      name: "Classic Smash Burger",
      category: "burgers",
      description: "Double smashed patty, cheddar, caramelized onions, pickles & special sauce",
      price: 6500,
      oldPrice: 8000,
      rating: 4.8,
      reviews: 128,
      badge: "Hot",
      image: IMAGES.menuSmashBurger,
    },
    {
      id: 2,
      name: "Margherita Royale",
      category: "pizza",
      description: "San Marzano tomatoes, buffalo mozzarella, basil & truffle oil on sourdough",
      price: 8500,
      oldPrice: 10500,
      rating: 4.9,
      reviews: 95,
      badge: "New",
      image: IMAGES.menuMargherita,
    },
    {
      id: 3,
      name: "Nashville Hot Chicken",
      category: "chicken",
      description: "Crispy fried chicken in fiery Nashville spice blend with honey drizzle",
      price: 5500,
      oldPrice: 7000,
      rating: 4.8,
      reviews: 210,
      badge: "Best Seller",
      image: IMAGES.menuNashville,
    },
    {
      id: 4,
      name: "Loaded Fajita Wrap",
      category: "wraps",
      description: "Grilled chicken, peppers, sour cream & guacamole in a warm tortilla",
      price: 4500,
      oldPrice: null,
      rating: 4.6,
      reviews: 74,
      badge: null,
      image: IMAGES.menuFajita,
    },
    {
      id: 5,
      name: "Nutella Lava Cake",
      category: "desserts",
      description: "Molten chocolate cake with Nutella center, vanilla ice cream & caramel",
      price: 3800,
      oldPrice: 5000,
      rating: 4.7,
      reviews: 56,
      badge: "New",
      image: IMAGES.menuLavaCake,
    },
    {
      id: 6,
      name: "Truffle Mushroom Pasta",
      category: "pasta",
      description: "Al dente tagliatelle, wild mushrooms, black truffle, parmesan & thyme",
      price: 7500,
      oldPrice: null,
      rating: 4.8,
      reviews: 88,
      badge: "Chef's Pick",
      image: IMAGES.menuTrufflePasta,
    },
  ],
};
