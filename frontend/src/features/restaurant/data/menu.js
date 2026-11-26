import { IMAGES } from "../../../data/images";

/*
  SAMPLE MENU - the exact shape the backend should return from  GET /api/menu
  (see API_CONTRACT.md). Used only while VITE_USE_MOCK=true.

  category.count  = how many dishes that category has in total (shown on the "Browse by Category" cards)
  category.hidden = true -> still a filter pill, but no card in "Browse by Category"
  item.badge      = "Hot" | "New" | "Best Seller" | "Chef's Pick" | null
  item.oldPrice   = null when there is no discount
  item.priceFrom  = true when the item has several sizes (the card shows "From NGN ...")

  MENU_DETAILS (bottom of this file) = what the backend returns from  GET /api/menu/{id}  for ONE dish.
  It is shown when a customer opens a dish ("View details").
*/
export const MENU_DATA = {
  totalItems: 99,
  categories: [
    { id: "burgers", name: "Burgers", pill: "Burgers", count: 24, image: IMAGES.menuSmashBurger },
    { id: "pizza", name: "Pizza", pill: "Pizza", count: 18, image: IMAGES.menuMargherita },
    { id: "chicken", name: "Fried Chicken", pill: "Chicken", count: 15, image: IMAGES.menuNashville },
    { id: "wraps", name: "Wraps", pill: "Wraps", count: 12, image: IMAGES.menuFajita },
    { id: "desserts", name: "Desserts", pill: "Desserts", count: 20, image: IMAGES.menuLavaCake },
    { id: "fastfood", name: "Fast Food", pill: "Fast Food", count: 16, image: IMAGES.menuFastFood },
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
      priceFrom: true,
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
      priceFrom: true,
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
    {
      id: 7,
      name: "Crispy Chicken & Chips",
      category: "fastfood",
      description: "Golden fried chicken pieces with thick-cut chips and a creamy dipping sauce",
      price: 5200,
      priceFrom: true,
      oldPrice: null,
      rating: 4.7,
      reviews: 164,
      badge: "Best Seller",
      image: IMAGES.menuFastFood,
    },
    {
      id: 8,
      name: "Loaded Cheese Fries",
      category: "fastfood",
      description: "Crinkle-cut fries smothered in melted cheese, jalapenos and spring onion",
      price: 3500,
      oldPrice: null,
      rating: 4.6,
      reviews: 97,
      badge: null,
      image: IMAGES.menuFastFood,
    },
    {
      id: 9,
      name: "Classic Hot Dog Combo",
      category: "fastfood",
      description: "Grilled sausage in a toasted bun with onions and mustard, served with a drink",
      price: 3800,
      oldPrice: null,
      rating: 4.5,
      reviews: 71,
      badge: null,
      image: IMAGES.menuFastFood,
    },
  ],
};

/*
  FULL DETAILS OF ONE DISH  (GET /api/menu/{id})
  Every dish has all of these keys; use [] / null when a dish has nothing for a key.
    longDescription  text shown in the details window
    images           array of image URLs (first one is the main photo)
    ingredients      list of strings
    sizes            [{ id, label, serves, price, oldPrice }]  - empty [] when the dish has only one size
    extras           [{ id, name, price }]  - optional add-ons (extra cheese, bacon ...)
    tags             ["Vegetarian", "Vegan", "Halal", "Gluten-free" ...]
    allergens        ["Gluten", "Dairy", "Egg", "Nuts" ...]
    spiceLevel       0 (none) to 3 (very hot)
    calories         number or null (per serving)
    prepTime         text, e.g. "15-20 min"
    available        false -> the dish is shown as "Not available today"
*/
export const MENU_DETAILS = {
  1: {
    longDescription:
      "Two smashed beef patties cooked on a very hot griddle for a crisp, caramelised edge, then layered with melted cheddar, sweet caramelised onions, crunchy pickles and our house special sauce in a toasted brioche bun.",
    images: [IMAGES.menuSmashBurger],
    ingredients: ["Beef patties", "Cheddar cheese", "Caramelised onions", "Pickles", "Special sauce", "Brioche bun"],
    sizes: [],
    extras: [
      { id: "extra-patty", name: "Extra patty", price: 1500 },
      { id: "bacon", name: "Crispy bacon", price: 800 },
      { id: "fried-egg", name: "Fried egg", price: 500 },
    ],
    tags: [],
    allergens: ["Gluten", "Dairy", "Egg"],
    spiceLevel: 1,
    calories: 720,
    prepTime: "12-15 min",
    available: true,
  },
  2: {
    longDescription:
      "Our signature pizza on a slow-fermented sourdough base: San Marzano tomato sauce, creamy buffalo mozzarella, fresh basil and a light drizzle of truffle oil, baked in a stone oven until the crust is blistered and golden.",
    images: [IMAGES.menuMargherita],
    ingredients: ["Sourdough base", "San Marzano tomato sauce", "Buffalo mozzarella", "Fresh basil", "Truffle oil"],
    sizes: [
      { id: "small", label: 'Small (8")', serves: "1 person", price: 8500, oldPrice: 10500 },
      { id: "medium", label: 'Medium (12")', serves: "2 people", price: 12500, oldPrice: 14500 },
      { id: "large", label: 'Large (16")', serves: "3-4 people", price: 16500, oldPrice: 19000 },
    ],
    extras: [
      { id: "extra-cheese", name: "Extra mozzarella", price: 1000 },
      { id: "mushrooms", name: "Mushrooms", price: 800 },
      { id: "olives", name: "Black olives", price: 600 },
      { id: "chicken", name: "Grilled chicken", price: 1500 },
    ],
    tags: ["Vegetarian"],
    allergens: ["Gluten", "Dairy"],
    spiceLevel: 0,
    calories: 820,
    prepTime: "15-20 min",
    available: true,
  },
  3: {
    longDescription:
      "Juicy chicken pieces brined, double-coated and fried until shatteringly crisp, then brushed with our fiery Nashville spice blend and finished with a honey drizzle. Served on white bread with pickles.",
    images: [IMAGES.menuNashville],
    ingredients: ["Chicken", "Nashville spice blend", "Honey", "Pickles", "White bread"],
    sizes: [
      { id: "2pc", label: "2 pieces", serves: "1 person", price: 5500, oldPrice: 7000 },
      { id: "4pc", label: "4 pieces", serves: "2 people", price: 9500, oldPrice: 12000 },
      { id: "8pc", label: "8 pieces", serves: "4 people", price: 17500, oldPrice: 21000 },
    ],
    extras: [
      { id: "extra-sauce", name: "Extra hot sauce", price: 300 },
      { id: "coleslaw", name: "Coleslaw", price: 700 },
    ],
    tags: [],
    allergens: ["Gluten", "Egg"],
    spiceLevel: 3,
    calories: 640,
    prepTime: "15-20 min",
    available: true,
  },
  4: {
    longDescription:
      "A warm flour tortilla packed with seasoned fajita chicken, grilled peppers and onions, melted cheese, fresh lettuce and a zesty lime crema.",
    images: [IMAGES.menuFajita],
    ingredients: ["Flour tortilla", "Fajita chicken", "Peppers", "Onions", "Cheese", "Lettuce", "Lime crema"],
    sizes: [],
    extras: [
      { id: "guacamole", name: "Guacamole", price: 900 },
      { id: "extra-chicken", name: "Extra chicken", price: 1200 },
    ],
    tags: [],
    allergens: ["Gluten", "Dairy"],
    spiceLevel: 1,
    calories: 540,
    prepTime: "10-12 min",
    available: true,
  },
  5: {
    longDescription:
      "A rich chocolate sponge with a molten Nutella centre, baked to order. Served warm with a scoop of vanilla ice cream.",
    images: [IMAGES.menuLavaCake],
    ingredients: ["Chocolate sponge", "Nutella", "Vanilla ice cream"],
    sizes: [],
    extras: [{ id: "extra-scoop", name: "Extra ice cream scoop", price: 700 }],
    tags: ["Vegetarian"],
    allergens: ["Gluten", "Dairy", "Egg", "Nuts"],
    spiceLevel: 0,
    calories: 480,
    prepTime: "10 min",
    available: true,
  },
  6: {
    longDescription:
      "Fresh pasta tossed in a creamy truffle sauce with sauteed mushrooms, garlic and parmesan, finished with parsley.",
    images: [IMAGES.menuTrufflePasta],
    ingredients: ["Fresh pasta", "Mushrooms", "Truffle cream sauce", "Garlic", "Parmesan", "Parsley"],
    sizes: [],
    extras: [{ id: "grilled-chicken", name: "Grilled chicken", price: 1500 }],
    tags: ["Vegetarian"],
    allergens: ["Gluten", "Dairy", "Egg"],
    spiceLevel: 0,
    calories: 690,
    prepTime: "15 min",
    available: true,
  },
  7: {
    longDescription:
      "Seasoned chicken pieces fried to a deep golden crunch, served with thick-cut chips and a creamy dipping sauce.",
    images: [IMAGES.menuFastFood],
    ingredients: ["Chicken", "Seasoned flour coating", "Potato chips", "Creamy dip"],
    sizes: [
      { id: "regular", label: "Regular", serves: "1 person", price: 5200, oldPrice: null },
      { id: "large", label: "Large", serves: "1-2 people", price: 7200, oldPrice: null },
    ],
    extras: [{ id: "extra-dip", name: "Extra dip", price: 300 }],
    tags: [],
    allergens: ["Gluten", "Egg"],
    spiceLevel: 1,
    calories: 760,
    prepTime: "12-15 min",
    available: true,
  },
  8: {
    longDescription:
      "Crinkle-cut fries piled high with melted cheese sauce, sliced jalapenos and spring onion.",
    images: [IMAGES.menuFastFood],
    ingredients: ["Crinkle-cut fries", "Cheese sauce", "Jalapenos", "Spring onion"],
    sizes: [],
    extras: [{ id: "bacon-bits", name: "Bacon bits", price: 600 }],
    tags: ["Vegetarian"],
    allergens: ["Dairy"],
    spiceLevel: 2,
    calories: 590,
    prepTime: "8-10 min",
    available: true,
  },
  9: {
    longDescription:
      "A grilled sausage in a soft toasted bun with caramelised onions and mustard, served with a cold drink of your choice.",
    images: [IMAGES.menuFastFood],
    ingredients: ["Sausage", "Toasted bun", "Onions", "Mustard", "Soft drink"],
    sizes: [],
    extras: [{ id: "cheese", name: "Melted cheese", price: 400 }],
    tags: [],
    allergens: ["Gluten"],
    spiceLevel: 0,
    calories: 520,
    prepTime: "8-10 min",
    available: true,
  },
};
