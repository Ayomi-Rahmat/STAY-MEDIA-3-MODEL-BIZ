import { useCallback, useState } from "react";
import SiteLayout from "../../layouts/SiteLayout";
import Hero from "./sections/Hero";
import Ticker from "./sections/Ticker";
import Categories from "./sections/Categories";
import Menu from "./sections/Menu";
import Facilities from "./sections/Facilities";
import Gallery from "./sections/Gallery";
import OpeningHours from "./sections/OpeningHours";
import Reviews from "../../sections/Reviews";
import Reservation from "./sections/Reservation";
import ContactCta from "../../sections/ContactCta";
import Seo from "../../components/Seo";
import { SITE } from "../../data/site";
import useMenu from "./hooks/useMenu";

// The Restaurant page (/restaurant): overview, menu, facilities & services, hours, reviews, reservation.
// "Our story" and the history live on the About page; contact details and the enquiry form on the Contact page.
//
// This page owns the things that TWO sections need to share (React calls this "lifting state up"):
//   - the loaded menu     -> used by Categories, Menu
//   - the chosen category -> set by Categories / Footer, read by Menu
export default function Restaurant() {
  const menu = useMenu();
  const [category, setCategory] = useState("all");

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  // Pick a category, then glide down to the menu.
  const selectCategory = useCallback((id) => {
    setCategory(id);
    scrollTo("menu");
  }, []);

  return (
    <SiteLayout onSelectCategory={selectCategory}>
      <Seo
        title="Restaurant"
        path="/restaurant"
        description="Browse our menu, see what we offer and reserve a table online. Burgers, pizza, fried chicken, wraps, desserts and more."
        schema={{
          "@type": "Restaurant",
          name: `${SITE.name} Restaurant`,
          url: `${SITE.url}/restaurant`,
          image: `${SITE.url}${SITE.shareImage}`,
          telephone: SITE.phone,
          email: SITE.email,
          priceRange: "NGN",
          servesCuisine: ["Burgers", "Pizza", "Fried chicken", "Fast food"],
          acceptsReservations: true,
          address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: "Lagos", addressCountry: "NG" },
        }}
      />
      <Hero />
      <Ticker />
      <Categories menu={menu} activeCategory={category} onSelect={selectCategory} />
      <Menu menu={menu} category={category} onCategoryChange={setCategory} onReserve={() => scrollTo("reservation")} />
      <Facilities />
      <Gallery />
      <OpeningHours />
      <Reviews />
      <Reservation />
      <ContactCta
        subject="general"
        title="Have a question about the restaurant?"
        text="Ask about the menu, allergies, events or anything else. We'll get back to you."
      />
    </SiteLayout>
  );
}
