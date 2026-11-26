import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import { SITE } from "../../data/site";
import BrandHero from "./sections/BrandHero";
import Units from "./sections/Units";
import OneAccount from "./sections/OneAccount";
import Reviews from "../../sections/Reviews";
import Blog from "./sections/Blog";
import Newsletter from "./sections/Newsletter";
import ContactCta from "../../sections/ContactCta";

// The brand homepage (/): introduces the business and shows the three units first.
export default function Home() {
  return (
    <SiteLayout>
      <Seo
        path="/"
        schema={{
          "@type": "Organization",
          name: SITE.name,
          url: SITE.url,
          description: SITE.description,
          telephone: SITE.phone,
          email: SITE.email,
          address: { "@type": "PostalAddress", streetAddress: SITE.address, addressLocality: "Lagos", addressCountry: "NG" },
        }}
      />
      <BrandHero />
      <Units />
      <OneAccount />
      <Reviews />
      <Blog />
      <Newsletter />
      <ContactCta />
    </SiteLayout>
  );
}
