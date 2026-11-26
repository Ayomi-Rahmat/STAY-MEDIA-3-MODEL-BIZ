import { FaEnvelope, FaFacebookF, FaFire, FaInstagram, FaLocationDot, FaPhone, FaTiktok, FaYoutube } from "react-icons/fa6";
import { SITE } from "../data/site";

const SOCIALS = [
  { label: "Facebook", icon: FaFacebookF, href: "#" },
  { label: "Instagram", icon: FaInstagram, href: "#" },
  { label: "TikTok", icon: FaTiktok, href: "#" },
  { label: "YouTube", icon: FaYoutube, href: "#" },
];

// The thin dark strip above the navbar. Hidden on phones to save space.
export default function TopBar() {
  return (
    <div className="hidden bg-[#141414] text-[13px] text-gray-300 md:block">
      <div className="container-x flex items-center justify-between py-2.5">
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2">
            <FaPhone aria-hidden="true" className="text-accent" /> {SITE.phone}
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <FaEnvelope aria-hidden="true" className="text-accent" /> {SITE.email}
          </li>
          <li className="hidden items-center gap-2 xl:flex">
            <FaLocationDot aria-hidden="true" className="text-accent" /> {SITE.address}
          </li>
        </ul>

        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
            <FaFire aria-hidden="true" className="text-accent" /> {SITE.promo}
          </span>
          <ul className="flex items-center gap-2">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-xs transition hover:bg-brand hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
