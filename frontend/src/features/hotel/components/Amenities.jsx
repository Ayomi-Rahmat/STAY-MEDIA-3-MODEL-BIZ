import {
  FaBath, FaDoorOpen, FaLaptop, FaLock, FaMugHot, FaMugSaucer, FaSnowflake, FaTv, FaWifi, FaWineBottle,
} from "react-icons/fa6";
import { AMENITY_LABELS } from "../data/rooms";

// Turns the short icon words in data/rooms.js into real icons.
const ICONS = {
  ac: FaSnowflake,
  wifi: FaWifi,
  tv: FaTv,
  bath: FaBath,
  breakfast: FaMugHot,
  minibar: FaWineBottle,
  desk: FaLaptop,
  safe: FaLock,
  balcony: FaDoorOpen,
  kettle: FaMugSaucer,
};

// A row of small "chips": icon + label. `limit` shows only the first few (cards), none shows all (pop-up).
export default function Amenities({ items, limit }) {
  const shown = limit ? items.slice(0, limit) : items;
  const hidden = items.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-2">
      {shown.map((key) => {
        const Icon = ICONS[key];
        return (
          <li key={key} className="inline-flex items-center gap-1.5 rounded-full bg-sand px-3 py-1 text-xs text-gray-600">
            {Icon && <Icon aria-hidden="true" className="text-brand" />} {AMENITY_LABELS[key] ?? key}
          </li>
        );
      })}
      {hidden > 0 && <li className="rounded-full bg-sand px-3 py-1 text-xs text-gray-500">+{hidden} more</li>}
    </ul>
  );
}
