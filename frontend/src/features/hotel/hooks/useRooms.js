import { useCallback, useEffect, useState } from "react";
import { hotelApi } from "../../../services/api";

// Loads the room list once. Returns { rooms, loading, error, retry } (same idea as useMenu).
export default function useRooms() {
  const [state, setState] = useState({ rooms: [], loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    hotelApi
      .getRooms()
      .then((data) => {
        if (!cancelled) setState({ rooms: data.rooms ?? [], loading: false, error: "" });
      })
      .catch((error) => {
        if (!cancelled) setState({ rooms: [], loading: false, error: error.message ?? "Could not load the rooms." });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = useCallback(() => {
    setState({ rooms: [], loading: true, error: "" });
    setAttempt((count) => count + 1);
  }, []);

  return { ...state, retry };
}
