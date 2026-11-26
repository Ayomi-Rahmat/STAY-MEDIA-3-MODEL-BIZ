import SiteLayout from "../layouts/SiteLayout";
import BrandHero from "../sections/BrandHero";
import Units from "../sections/Units";
import OneAccount from "../sections/OneAccount";
import Reviews from "../sections/Reviews";
import Blog from "../sections/Blog";
import Newsletter from "../sections/Newsletter";
import Contact from "../sections/Contact";

// The brand homepage (/): introduces the business and shows the three units first.
export default function Home() {
  return (
    <SiteLayout>
      <BrandHero />
      <Units />
      <OneAccount />
      <Reviews />
      <Blog />
      <Newsletter />
      <Contact />
    </SiteLayout>
  );
}
