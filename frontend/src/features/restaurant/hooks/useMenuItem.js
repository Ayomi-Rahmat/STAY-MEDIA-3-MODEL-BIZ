import { useCallback, useEffect, useState } from "react";
import { restaurantApi } from "../../../services/api";

// Loads the FULL details of one dish (ingredients, sizes, allergens...) when the customer opens it.
// Same idea as useMenu, but for a single dish: { data, loading, error, retry }.
export default function useMenuItem(id) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    restaurantApi
      .getMenuItem(id)
      .then((data) => !cancelled && setState({ data, loading: false, error: "" }))
      .catch((error) => !cancelled && setState({ data: null, loading: false, error: error.message ?? "Could not load this dish." }));
    return () => {
      cancelled = true;
    };
  }, [id, attempt]);

  const retry = useCallback(() => {
    setState({ data: null, loading: true, error: "" });
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}
