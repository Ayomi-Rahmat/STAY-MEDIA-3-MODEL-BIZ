import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import WhatsAppButton from "../components/WhatsAppButton";

// The frame shared by every public page: skip link, top strip, navbar, content, footer, floating buttons.
//   onSelectCategory  -> lets the footer filter the restaurant menu (only passed by the Restaurant page)
export default function SiteLayout({ children, onSelectCategory, extra = null }) {
  return (
    <>
      {/* Keyboard users press Tab once to jump past the menus straight to the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-brand focus:shadow-lg"
      >
        Skip to content
      </a>
      <TopBar />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer onSelectCategory={onSelectCategory} />
      <BackToTop />
      <WhatsAppButton />
      {extra}
    </>
  );
}
