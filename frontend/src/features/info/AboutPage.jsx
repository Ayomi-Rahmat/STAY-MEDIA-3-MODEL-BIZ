import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import About from "./sections/About";
import History from "./sections/History";
import Chefs from "./sections/Chefs";

// About Us (/about) - PRD WEB-002: the business background and identity.
// Story, history timeline and the team.
export default function AboutPage() {
  return (
    <SiteLayout>
      <Seo title="About Us" path="/about" description="Our story, our journey and the people behind our restaurant, hotel and club." />
      <PageHeader eyebrow="Who We Are" title="About Us" subtitle="Our story, our journey and the people behind every meal." />
      <About />
      <History />
      <Chefs />
    </SiteLayout>
  );
}
