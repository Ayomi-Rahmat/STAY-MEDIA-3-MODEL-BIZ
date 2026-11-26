import { useCallback, useState } from "react";
import SiteLayout from "../layouts/SiteLayout";
import SectionNav from "../components/SectionNav";
import Hero from "../sections/Hero";
import Ticker from "../sections/Ticker";
import Categories from "../sections/Categories";
import About from "../sections/About";
import Menu from "../sections/Menu";
import Gallery from "../sections/Gallery";
import Facilities from "../sections/Facilities";
import History from "../sections/History";
import Chefs from "../sections/Chefs";
import OpeningHours from "../sections/OpeningHours";
import Reviews from "../sections/Reviews";
import Reservation from "../sections/Reservation";
import Blog from "../sections/Blog";
import Newsletter from "../sections/Newsletter";
import Contact from "../sections/Contact";
import useMenu from "../hooks/useMenu";

// The Restaurant page (/restaurant) is just the sections stacked in order.
//
// Home owns the things that TWO sections need to share (React calls this "lifting state up"):
//   - the loaded menu    -> used by Categories, Menu
//   - the chosen category -> set by Categories / Footer, read by Menu
export default function Restaurant() {
  const menu = useMenu();
  const [category, setCategory] = useState("all");
  // Pick a category, then glide down to the menu.
  const selectCategory = useCallback((id) => {
    setCategory(id);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <SiteLayout subNav={<SectionNav />} onSelectCategory={selectCategory}>
      <Hero />
      <Ticker />
      <Categories menu={menu} activeCategory={category} onSelect={selectCategory} />
      <About />
      <Menu menu={menu} category={category} onCategoryChange={setCategory} />
      <Facilities />
      <Gallery />
      <History />
      <Chefs />
      <OpeningHours />
      <Reviews />
      <Reservation />
      <Blog />
      <Newsletter />
      <Contact />
    </SiteLayout>
  );
}
