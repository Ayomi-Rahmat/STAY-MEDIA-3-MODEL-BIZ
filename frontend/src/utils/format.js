import { SITE } from "../data/site";

// 6500 -> "₦6,500" (symbol and style come from SITE.currency). Naira prices are shown without decimals.
const formatter = new Intl.NumberFormat(SITE.currencyLocale, {
  style: "currency",
  currency: SITE.currency,
  maximumFractionDigits: 0,
});
export const formatPrice = (amount) => formatter.format(amount);

// Today's date as "YYYY-MM-DD" in the visitor's own timezone (what <input type="date"> expects).
export function todayString() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

// "2026-12-05" -> "Saturday, 5 December 2026". Read as local time so the day never shifts.
export function prettyDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-NG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

// "2026-12-05" + 1 -> "2026-12-06"
export function addDays(value, days) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day + days);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

// Number of nights between two "YYYY-MM-DD" dates (0 if the dates are missing or wrong).
export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const toUtc = (value) => {
    const [year, month, day] = value.split("-").map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.max(0, Math.round((toUtc(checkOut) - toUtc(checkIn)) / 86400000));
}
