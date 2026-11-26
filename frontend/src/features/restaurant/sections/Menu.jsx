import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaTableCells } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import SectionHeading from "../../../components/SectionHeading";
import Button from "../../../components/Button";
import MenuItemModal from "../components/MenuItemModal";
import { formatPrice } from "../../../utils/format";

// How each badge looks. Anything not listed here gets no badge colour.
const BADGES = {
  Hot: { className: "bg-accent text-ink", star: true },
  New: { className: "bg-forest text-white", star: true },
  "Best Seller": { className: "bg-brand text-white", star: true },
  "Chef's Pick": { className: "bg-accent text-ink", star: false },
};

function MenuCard({ item, categoryLabel, onOpen }) {
  const [liked, setLiked] = useState(false);
  const badge = BADGES[item.badge];

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 overflow-hidden">
        <Photo
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {item.badge && (
          <span
            className={`absolute left-3.5 top-3.5 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-bold ${
              badge?.className ?? "bg-ink text-white"
            }`}
          >
            {badge?.star && <FaStar aria-hidden="true" />} {item.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setLiked((value) => !value)}
          aria-pressed={liked}
          aria-label={liked ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full bg-white text-sm shadow-md transition hover:scale-110"
        >
          {liked ? <FaHeart className="text-brand" /> : <FaRegHeart className="text-gray-400" />}
        </button>
      </div>

      <div className="p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{categoryLabel}</p>
        <h3 className="mt-1.5 font-heading text-xl font-bold">{item.name}</h3>
        <p className="mt-1.5 line-clamp-2 min-h-10 text-[13px] leading-relaxed text-gray-400">{item.description}</p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="flex items-baseline gap-2">
              {item.priceFrom && <span className="text-[11px] uppercase text-gray-400">From</span>}
              <span className="font-heading text-xl font-bold text-brand">{formatPrice(item.price)}</span>
              {item.oldPrice && (
                <span className="text-xs text-gray-300 line-through">{formatPrice(item.oldPrice)}</span>
              )}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
              <FaStar aria-hidden="true" className="text-accent" /> ({item.reviews})
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpen(item)}
            aria-label={`View details of ${item.name}`}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold transition hover:border-brand hover:text-brand"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

function MenuSkeleton() {
  return (
    <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading menu">
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index} className="h-[26rem] animate-pulse rounded-3xl bg-white/80" />
      ))}
    </ul>
  );
}

// Props come from Home: `menu` (loaded data), `category` (selected filter), `onCategoryChange`.
export default function Menu({ menu, category, onCategoryChange, onReserve }) {
  const [openItem, setOpenItem] = useState(null); // the dish whose details window is open
  const pills = menu.data ? [{ id: "all", pill: "All" }, ...menu.data.categories] : [];
  const labelFor = (id) => menu.data?.categories.find((c) => c.id === id)?.pill ?? "";
  const visibleItems = menu.data
    ? menu.data.items.filter((item) => category === "all" || item.category === category)
    : [];

  return (
    <section id="menu" className="scroll-mt-22 bg-sand py-20">
      <div className="container-x">
        <SectionHeading
          eyebrow="What's Cooking"
          title={
            <>
              Our Delicious <span className="text-brand">Menu</span>
            </>
          }
        />

        {menu.loading && <MenuSkeleton />}

        {menu.error && (
          <div className="mx-auto mt-10 max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="font-semibold">We couldn&apos;t load the menu.</p>
            <p className="mt-1 text-sm text-gray-500">{menu.error}</p>
            <Button className="mt-5" onClick={menu.retry}>
              Try again
            </Button>
          </div>
        )}

        {menu.data && (
          <>
            <ul className="mt-10 flex flex-wrap justify-center gap-3" aria-label="Filter menu by category">
              {pills.map((pill) => (
                <li key={pill.id}>
                  <button
                    type="button"
                    onClick={() => onCategoryChange(pill.id)}
                    aria-pressed={category === pill.id}
                    className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition ${
                      category === pill.id
                        ? "border-brand bg-brand text-white shadow-lg shadow-brand/30"
                        : "border-gray-200 bg-white text-gray-600 hover:border-brand hover:text-brand"
                    }`}
                  >
                    {pill.pill}
                  </button>
                </li>
              ))}
            </ul>

            {visibleItems.length > 0 ? (
              <ul className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {visibleItems.map((item) => (
                  <li key={item.id}>
                    <MenuCard item={item} categoryLabel={labelFor(item.category)} onOpen={setOpenItem} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-12 text-center text-gray-500">No dishes in this category yet - check back soon.</p>
            )}

            {category !== "all" && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={() => onCategoryChange("all")}
                  className="inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-brand to-brand-dark px-8 py-4 text-[15px] font-semibold text-white shadow-xl shadow-brand/30 transition hover:-translate-y-0.5"
                >
                  <FaTableCells aria-hidden="true" /> Show All Dishes
                </button>
              </div>
            )}
          </>
        )}

        {openItem && (
          <MenuItemModal
            item={openItem}
            categoryLabel={labelFor(openItem.category)}
            onClose={() => setOpenItem(null)}
            onReserve={onReserve}
          />
        )}
      </div>
    </section>
  );
}
