import SiteLayout from "../../layouts/SiteLayout";
import Seo from "../../components/Seo";
import PageHeader from "../../components/PageHeader";
import Contact from "../../sections/Contact";

// Contact (/contact) - PRD WEB-006: one place for enquiries about the restaurant, hotel and club.
// Other pages link here with the subject already chosen, e.g. /contact?subject=accommodation
export default function ContactPage() {
  return (
    <SiteLayout>
      <Seo title="Contact Us" path="/contact" description="Send an enquiry about the restaurant, hotel or club, or find our address, phone number and opening hours." />
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Have a question, feedback, or want to plan a special event? We'd love to hear from you."
      />
      <Contact withHeading={false} />
    </SiteLayout>
  );
}
