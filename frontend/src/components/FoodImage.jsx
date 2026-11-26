import { FALLBACK_FOOD } from "../data/images";

// A normal <img> with one extra trick: if the file is missing or fails to load,
// it swaps in a placeholder instead of showing a broken-image icon.
// Pass `fallback` to use a different placeholder (e.g. a person silhouette for faces).
export default function FoodImage({ src, alt, className = "", loading = "lazy", fallback = FALLBACK_FOOD }) {
  const handleError = (event) => {
    event.currentTarget.onerror = null; // stop a loop if the placeholder itself fails
    event.currentTarget.src = fallback;
  };

  return <img src={src} alt={alt} loading={loading} onError={handleError} className={className} />;
}
