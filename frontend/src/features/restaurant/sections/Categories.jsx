import Photo from "../../../components/Photo";
import SectionHeading from "../../../components/SectionHeading";
import { IMAGES } from "../../../data/images";

// "Browse by Category": one card per category. Clicking a card filters the menu below.
// Props come from Home: `menu` (loaded menu data), `activeCategory`, `onSelect`.
export default function Categories({ menu, activeCategory, onSelect }) {
  // If the menu failed to load, the Menu section shows the error and a Retry button; hide this one.
  if (menu.error) return null;

  const cards = menu.data
    ? [
        {
          id: "all",
          name: "All Items",
          count: menu.data.totalItems ?? menu.data.items.length,
          image: IMAGES.menuSmashBurger,
        },
        ...menu.data.categories.filter((category) => !category.hidden),
      ]
    : null;

  return (
    <section id="categories" className="scroll-mt-22 bg-cream py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="What We Offer"
          title={
            <>
              Browse by <span className="text-brand">Category</span>
            </>
          }
          subtitle="From sizzling burgers to exotic world cuisines - find your favourite in our menu"
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {cards
            ? cards.map((card) => {
                const active = activeCategory === card.id;
                return (
                  <li key={card.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(card.id)}
                      aria-pressed={active}
                      className={`flex h-full w-full flex-col items-center rounded-2xl bg-white px-3 pb-5 pt-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                        active ? "ring-2 ring-brand" : "ring-1 ring-transparent"
                      }`}
                    >
                      <Photo
                        src={card.image}
                        alt=""
                        className="h-[86px] w-[86px] rounded-full object-cover shadow-md"
                      />
                      <span className="mt-4 text-sm font-semibold text-ink">{card.name}</span>
                      <span className="mt-1 text-xs text-gray-400">{card.count} items</span>
                    </button>
                  </li>
                );
              })
            : Array.from({ length: 6 }, (_, index) => (
                <li key={index} aria-hidden="true" className="h-[170px] animate-pulse rounded-2xl bg-white/70" />
              ))}
        </ul>
      </div>
    </section>
  );
}
