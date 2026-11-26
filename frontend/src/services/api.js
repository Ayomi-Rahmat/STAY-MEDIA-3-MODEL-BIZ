import axios from "axios";
import { MENU_DATA, MENU_DETAILS } from "../features/restaurant/data/menu";
import { ROOMS } from "../features/hotel/data/rooms";
import { nightsBetween } from "../utils/format";

/*
  THE ONLY FILE THAT TALKS TO THE BACKEND.
  Pages never call axios directly - they call `authApi.login(...)` etc.
  That way, if the backend URL or response shape changes, you fix it here once.

  Two switches live in the .env file:
    VITE_API_URL   -> where the PHP server lives, e.g. http://localhost:8000
    VITE_USE_MOCK  -> "true" = fake responses so you can test the screens
                      before the backend exists. Set to "false" to go live.
*/

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const TOKEN_KEY = "sarab_token";

// If the backend developer names the routes differently, change them here.
const ENDPOINTS = {
  login: "/api/auth/login",
  register: "/api/auth/register",
  forgotPassword: "/api/auth/forgot-password",
  verifyOtp: "/api/auth/verify-otp",
  resetPassword: "/api/auth/reset-password",
  logout: "/api/auth/logout",
  menu: "/api/menu",
  menuItem: (id) => `/api/menu/${id}`,
  bookings: "/api/bookings",
  hotelRooms: "/api/hotel/rooms",
  hotelAvailability: "/api/hotel/availability",
  contact: "/api/contact",
  newsletter: "/api/newsletter",
};

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  timeout: 15000,
});

// Automatically attach the login token (if there is one) to every request.
client.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {
    // storage unavailable (private mode) - carry on without a token
  }
  return config;
});

// Turns any axios failure into one predictable shape the pages can show:
//   { message: "text for the user", fieldErrors: { email: "..." }, status: 401 }
function toApiError(error) {
  if (error.response) {
    const { data, status } = error.response;
    return {
      message: data?.message || "Something went wrong. Please try again.",
      fieldErrors: data?.errors || {},
      status,
    };
  }
  if (error.request) {
    return {
      message: "Can't reach the server. Check your internet connection and try again.",
      fieldErrors: {},
      status: 0,
    };
  }
  return { message: error.message || "Unexpected error.", fieldErrors: {}, status: 0 };
}

async function get(url, params) {
  try {
    const response = await client.get(url, { params });
    return response.data?.data ?? {};
  } catch (error) {
    throw toApiError(error);
  }
}

async function post(url, body) {
  try {
    const response = await client.post(url, body);
    // Backend replies { success, message, data: {...} } - pages only need `data`.
    return response.data?.data ?? {};
  } catch (error) {
    throw toApiError(error);
  }
}

/* ---------------- MOCK MODE (fake backend for testing the UI) ---------------- */

const wait = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));
const fail = (message, status = 400, fieldErrors = {}) => ({ message, status, fieldErrors });

const mockUser = (overrides = {}) => ({
  id: 1,
  name: "Demo Customer",
  email: "demo@sarab.test",
  phone: "+2348031234567",
  role: "customer",
  ...overrides,
});

const mockApi = {
  async login({ email, password }) {
    await wait();
    // Try password "wrong" to see the error state.
    if (password === "wrong") throw fail("Invalid email or password.", 401);
    return { token: "mock-token-123", user: mockUser({ email }) };
  },
  async register({ name, email, phone }) {
    await wait();
    // Try email "taken@test.com" to see a field-level server error.
    if (email === "taken@test.com") {
      throw fail("Please fix the highlighted fields.", 422, { email: "This email is already registered." });
    }
    return { token: "mock-token-123", user: mockUser({ name, email, phone }) };
  },
  async forgotPassword() {
    await wait();
    return {};
  },
  async verifyOtp({ otp }) {
    await wait();
    // In mock mode the correct code is always 1234.
    if (otp !== "1234") throw fail("That code is incorrect or has expired.", 400);
    return { resetToken: "mock-reset-token" };
  },
  async resetPassword() {
    await wait();
    return {};
  },
  async logout() {
    return {};
  },
};

/* ---------------- REAL API ---------------- */

const realApi = {
  login: (payload) => post(ENDPOINTS.login, payload),
  register: (payload) => post(ENDPOINTS.register, payload),
  forgotPassword: (payload) => post(ENDPOINTS.forgotPassword, payload),
  verifyOtp: (payload) => post(ENDPOINTS.verifyOtp, payload),
  resetPassword: (payload) => post(ENDPOINTS.resetPassword, payload),
  logout: () => post(ENDPOINTS.logout, {}),
};

export const authApi = USE_MOCK ? mockApi : realApi;

/* ---------------- RESTAURANT (menu, reservations, contact, newsletter) ---------------- */

const mockRestaurantApi = {
  async getMenu() {
    await wait(600);
    return MENU_DATA;
  },
  async getMenuItem(id) {
    await wait(400);
    const item = MENU_DATA.items.find((entry) => entry.id === id);
    if (!item) throw fail("This dish could not be found.", 404);
    // The real API returns the list fields and the details together, in one object.
    return { ...item, ...MENU_DETAILS[id] };
  },
  async createReservation() {
    await wait();
    return { reference: `BKG-${Math.floor(1000 + Math.random() * 9000)}` };
  },
  async sendMessage() {
    await wait();
    return {};
  },
  async subscribe({ email }) {
    await wait(500);
    // Try the email "fail@test.com" to see the error state.
    if (email === "fail@test.com") throw fail("We couldn't subscribe you right now. Please try again.", 500);
    return {};
  },
};

const realRestaurantApi = {
  getMenu: () => get(ENDPOINTS.menu),
  getMenuItem: (id) => get(ENDPOINTS.menuItem(id)),
  createReservation: (payload) => post(ENDPOINTS.bookings, { businessUnit: "restaurant", ...payload }),
  sendMessage: (payload) => post(ENDPOINTS.contact, payload),
  subscribe: (payload) => post(ENDPOINTS.newsletter, payload),
};

export const restaurantApi = USE_MOCK ? mockRestaurantApi : realRestaurantApi;

/* ---------------- HOTEL (rooms, availability, bookings) ---------------- */

// Mock rule so you can see a "sold out" state: the Executive Room is full over Christmas week (24-31 December).
function overlapsChristmasWeek(checkIn, checkOut) {
  const year = Number(checkIn.slice(0, 4));
  return checkIn <= `${year}-12-31` && checkOut > `${year}-12-24`;
}

const mockHotelApi = {
  async getRooms() {
    await wait(600);
    return { rooms: ROOMS };
  },
  // Returns one entry per room: can it be booked for these dates and this many guests, and what would it cost?
  async checkAvailability({ checkIn, checkOut, guests }) {
    await wait(700);
    const nights = nightsBetween(checkIn, checkOut);
    if (nights < 1) throw fail("Check-out must be after check-in.", 422, { checkOut: "Choose a later date." });
    const rooms = ROOMS.map((room) => {
      let reason = null;
      if (Number(guests) > room.maxGuests) reason = "too_many_guests";
      else if (room.id === "executive" && overlapsChristmasWeek(checkIn, checkOut)) reason = "sold_out";
      return {
        id: room.id,
        available: reason === null,
        reason,
        roomsLeft: reason === null ? room.roomsTotal : 0,
        nights,
        totalPrice: room.pricePerNight * nights,
      };
    });
    return { checkIn, checkOut, nights, rooms };
  },
  async createBooking({ roomId, checkIn, checkOut }) {
    await wait();
    const room = ROOMS.find((entry) => entry.id === roomId);
    const nights = nightsBetween(checkIn, checkOut);
    return { reference: `HTL-${Math.floor(1000 + Math.random() * 9000)}`, nights, totalPrice: (room?.pricePerNight ?? 0) * nights };
  },
};

const realHotelApi = {
  getRooms: () => get(ENDPOINTS.hotelRooms),
  checkAvailability: (params) => get(ENDPOINTS.hotelAvailability, params),
  createBooking: (payload) => post(ENDPOINTS.bookings, { businessUnit: "hotel", ...payload }),
};

export const hotelApi = USE_MOCK ? mockHotelApi : realHotelApi;
