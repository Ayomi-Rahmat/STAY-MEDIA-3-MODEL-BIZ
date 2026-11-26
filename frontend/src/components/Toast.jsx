import { useEffect } from "react";

// A small dark message that pops up at the bottom and disappears by itself.
// `onClose` must be a stable function (wrap it in useCallback where it is created).
export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] max-w-md -translate-x-1/2 rounded-xl bg-ink px-5 py-3.5 text-center text-sm text-white shadow-2xl"
    >
      {message}
    </div>
  );
}
