import { TICKER_ITEMS } from "../../../data/site";

// The red strip of scrolling food names.
// The list is written out twice and the whole row slides left by exactly half its width,
// then jumps back - which looks like an endless loop.
export default function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden bg-brand py-4 text-white" aria-label="Our specialities">
      <ul className="flex w-max animate-marquee items-center">
        {doubled.map((item, index) => (
          <li
            key={index}
            aria-hidden={index >= TICKER_ITEMS.length}
            className="flex items-center gap-4 whitespace-nowrap px-6 text-sm font-semibold"
          >
            <span className="h-2 w-2 rounded-full bg-white/70" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
