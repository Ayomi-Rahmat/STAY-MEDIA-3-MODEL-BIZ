import { FaWhatsapp } from "react-icons/fa6";
import { SITE } from "../data/site";

// Floating "chat with us" button (PRD INT-003). Opens WhatsApp with a ready-typed message.
export default function WhatsAppButton() {
  const text = encodeURIComponent(`Hello ${SITE.name}, I have a question.`);
  return (
    <a
      href={`https://wa.me/${SITE.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-2xl text-white shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:scale-105"
    >
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}
