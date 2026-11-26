import { useCallback, useEffect, useState } from "react";
import { restaurantApi } from "../services/api";

// Loads the menu from the backend once and reports its state:
//   loading -> true while waiting
//   error   -> text to show if it failed (call `retry` to try again)
//   data    -> { totalItems, categories, items } when it worked
export default function useMenu() {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false; // ignore the answer if the page was left before it arrived

    restaurantApi
      .getMenu()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: "" });
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error: error.message ?? "Could not load the menu." });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ data: null, loading: true, error: "" });
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}
