import { useEffect, useRef } from "react";
import { FaClock, FaFire, FaPepperHot, FaStar, FaXmark } from "react-icons/fa6";
import Photo from "../../../components/Photo";
import Alert from "../../../components/Alert";
import useMenuItem from "../hooks/useMenuItem";
import { formatPrice } from "../../../utils/format";

// A pop-up window ("modal") with everything about one dish.
// It uses the browser's built-in <dialog>: it traps the keyboard focus inside, closes with the Esc key,
// and dims the page behind it - all for free.
//   item     = the summary from the menu list (shown instantly)
//   onClose  = called when the window closes
//   onReserve = called when the person taps "Reserve a Table"
export default function MenuItemModal({ item, categoryLabel, onClose, onReserve }) {
  const dialogRef = useRef(null);
  const { data, loading, error, retry } = useMenuItem(item.id);
  const full = data ?? item; // show the list data straight away, add the details when they arrive

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // stop the page scrolling behind the window
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) dialogRef.current.close(); // click outside the window
  };

  const pepper = data?.spiceLevel ?? 0;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      aria-labelledby="dish-title"
      className="m-auto w-[min(92vw,56rem)] max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-0 shadow-2xl backdrop:bg-black/60"
    >
      <div className="relative grid md:grid-cols-[1fr_1.1fr]">
        <button
          type="button"
          onClick={() => dialogRef.current.close()}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-lg shadow-md transition hover:scale-110"
        >
          <FaXmark />
        </button>

        <Photo src={(data?.images ?? [])[0] ?? item.image} alt={item.name} className="h-64 w-full object-cover md:h-full" />

        <div className="p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{categoryLabel}</p>
          <h2 id="dish-title" className="mt-1 font-heading text-3xl font-bold">
            {item.name}
          </h2>
          <p className="mt-2 flex flex-wrap items-center gap-x-3 text-sm text-gray-500">
            <span className="inline-flex items-center gap-1">
              <FaStar aria-hidden="true" className="text-accent" /> {item.rating} ({item.reviews} reviews)
            </span>
            {item.badge && <span className="rounded-md bg-brand px-2 py-0.5 text-[11px] font-bold text-white">{item.badge}</span>}
          </p>

          <p className="mt-3 flex items-baseline gap-2">
            {item.priceFrom && <span className="text-xs uppercase text-gray-400">From</span>}
            <span className="font-heading text-2xl font-bold text-brand">{formatPrice(item.price)}</span>
            {item.oldPrice && <span className="text-sm text-gray-300 line-through">{formatPrice(item.oldPrice)}</span>}
          </p>

          <p className="mt-4 leading-relaxed text-gray-600">{full.longDescription ?? item.description}</p>

          {loading && (
            <div role="status" aria-label="Loading dish details" className="mt-6 space-y-3">
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
            </div>
          )}

          {error && (
            <div className="mt-6">
              <Alert type="error">{error}</Alert>
              <button type="button" onClick={retry} className="mt-2 text-sm font-semibold text-brand hover:underline">
                Try again
              </button>
            </div>
          )}

          {data && (
            <div className="mt-6 space-y-6">
              {!data.available && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">Not available today</p>
              )}

              {data.sizes.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Sizes &amp; prices</h3>
                  <ul className="mt-2 divide-y divide-gray-100 rounded-2xl bg-sand px-4">
                    {data.sizes.map((size) => (
                      <li key={size.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                        <span>
                          <b>{size.label}</b>
                          {size.serves && <span className="ml-2 text-gray-400">{size.serves}</span>}
                        </span>
                        <span className="font-bold text-brand">{formatPrice(size.price)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Ingredients</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {data.ingredients.map((name) => (
                    <li key={name} className="rounded-full bg-cream px-3 py-1 text-xs text-gray-700">
                      {name}
                    </li>
                  ))}
                </ul>
              </section>

              {data.extras.length > 0 && (
                <section>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Optional extras</h3>
                  <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                    {data.extras.map((extra) => (
                      <li key={extra.id} className="flex justify-between text-gray-600">
                        <span>{extra.name}</span>
                        <span className="font-semibold">+{formatPrice(extra.price)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink">Good to know</h3>
                <ul className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  {data.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-forest/10 px-3 py-1 font-semibold text-forest">
                      {tag}
                    </li>
                  ))}
                  {data.prepTime && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      <FaClock aria-hidden="true" /> {data.prepTime}
                    </li>
                  )}
                  {data.calories && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                      <FaFire aria-hidden="true" /> {data.calories} kcal
                    </li>
                  )}
                  <li
                    className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-gray-600"
                    aria-label={`Spice level ${pepper} of 3`}
                  >
                    {pepper === 0 ? (
                      "Not spicy"
                    ) : (
                      Array.from({ length: pepper }, (_, index) => <FaPepperHot key={index} aria-hidden="true" className="text-brand" />)
                    )}
                  </li>
                </ul>
                {data.allergens.length > 0 && (
                  <p className="mt-3 rounded-xl bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
                    <b>Contains:</b> {data.allergens.join(", ")}. Tell us about any allergies when you book.
                  </p>
                )}
              </section>
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              dialogRef.current.close();
              onReserve();
            }}
            className="mt-8 w-full rounded-full bg-linear-to-r from-brand to-brand-dark px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand/25 transition hover:-translate-y-0.5"
          >
            Reserve a Table
          </button>
        </div>
      </div>
    </dialog>
  );
}
