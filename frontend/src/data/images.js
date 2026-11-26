// Every photo path in one place.
// Files live in  public/images/  and are referenced as "/images/<file>".
// Copy the photos from the Sarab template download into that folder using THESE names
// (or keep the template's names and change the paths below).
// Until a photo exists, a plain placeholder is shown instead, so nothing looks broken.
// See public/images/README.txt for what each picture is used for.

const img = (file) => `/images/${file}`;

export const IMAGES = {
  // hero + sections
  heroBurger: img("hero-burger.jpg"),
  aboutMain: img("about-restaurant.jpg"), // the restaurant interior
  aboutInset: img("about-dish.jpg"), // small plated dish
  galleryBurger: img("gallery-burger.jpg"), // the big tall burger photo

  // menu items (also reused by the category cards, gallery and blog)
  menuSmashBurger: img("menu-smash-burger.jpg"),
  menuMargherita: img("menu-margherita.jpg"),
  menuNashville: img("menu-nashville.jpg"),
  menuFajita: img("menu-fajita.jpg"),
  menuLavaCake: img("menu-lava-cake.jpg"),
  menuTrufflePasta: img("menu-truffle-pasta.jpg"),
  menuFastFood: img("menu-fast-food.jpg"),

  // people
  chef1: img("chef-1.jpg"),
  chef2: img("chef-2.jpg"),
  chef3: img("chef-3.jpg"),
  chef4: img("chef-4.jpg"),
  avatar1: img("avatar-1.jpg"),
  avatar2: img("avatar-2.jpg"),
  avatar3: img("avatar-3.jpg"),
};

// Shown when a photo is missing or fails to load.
export const FALLBACK_FOOD = img("placeholder.svg");
export const FALLBACK_ROOM = img("placeholder-room.svg");
export const FALLBACK_PERSON = img("person-placeholder.svg");
