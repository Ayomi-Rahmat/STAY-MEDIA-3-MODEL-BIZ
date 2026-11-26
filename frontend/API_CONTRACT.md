# Sarab Restaurant - API Contract

**For the backend (PHP) developer.** The React interface is already built to this contract
(`src/services/api.js`). If something here is hard to build, tell the frontend developer and
we'll change the interface instead - route names live in ONE place (`ENDPOINTS` in `api.js`).

## Conventions

- Base URL: set in the frontend `.env` as `VITE_API_URL` (e.g. `http://localhost:8000`)
- All requests and responses are JSON (`Content-Type: application/json`)
- **Success** responses (HTTP 200/201):
  ```json
  { "success": true, "message": "Human readable text", "data": { } }
  ```
- **Error** responses (HTTP 4xx/5xx):
  ```json
  { "success": false, "message": "Text shown to the user", "errors": { "email": "Field-specific text" } }
  ```
  `errors` is optional. When present, each key is a form field name (`name`, `email`, `phone`, `password`)
  and the text is shown directly under that field. Use HTTP **422** for validation errors, **401** for bad
  login, **400** for other bad input.
- After login/register the frontend sends `Authorization: Bearer <token>` on every request.
- **CORS:** allow origin `http://localhost:5173` (and the live domain later), methods `GET, POST, PUT, DELETE, OPTIONS`,
  headers `Content-Type, Authorization`. The browser sends an `OPTIONS` preflight first - it must return 200/204.

## The user object (returned by login and register)

```json
{ "id": 12, "name": "Aramide Opoola", "email": "aramide@example.com", "phone": "+2348031234567", "role": "customer" }
```

`role` is one of `customer`, `admin`, `management`. One login endpoint serves everyone; the frontend
will send admins to the admin dashboard later based on `role`.

---

## 1. Register - `POST /api/auth/register`

Request:
```json
{ "name": "Aramide Opoola", "email": "aramide@example.com", "phone": "+2348031234567", "password": "Secret123" }
```
Success `201`:
```json
{ "success": true, "message": "Account created.", "data": { "token": "<string>", "user": { } } }
```
Errors: `422` with `errors` (e.g. `{ "email": "This email is already registered." }`).

Rules (the frontend checks these too, but the server must re-check):
name >= 2 chars; valid email, unique; phone = `+234` followed by exactly 10 digits; password >= 8 chars with at least one letter and one number.
Store passwords with `password_hash()` - never plain text.

## 2. Login - `POST /api/auth/login`

Request:
```json
{ "email": "aramide@example.com", "password": "Secret123", "remember": true }
```
Success `200`: same `data` shape as register (`token` + `user`).
`remember: true` means the user ticked "Remember me for 30 days" - use a longer token lifetime.
Error `401`: `{ "success": false, "message": "Invalid email or password." }` (don't reveal which one was wrong).

## 3. Forgot password - `POST /api/auth/forgot-password`

Request: `{ "email": "aramide@example.com" }`

Behaviour: generate a **4-digit** code, email it, expire it after ~10 minutes.
Success `200`: `{ "success": true, "message": "If that email exists, a code has been sent.", "data": {} }`
**Always return 200 even if the email isn't registered** (prevents people discovering who has an account).
Also used by the "Resend code" button - rate-limit it (e.g. 1 request / 30 seconds per email).

## 4. Verify code - `POST /api/auth/verify-otp`

Request: `{ "email": "aramide@example.com", "otp": "1234" }`

Success `200`: `{ "success": true, "message": "Code verified.", "data": { "resetToken": "<random string>" } }`
Error `400`: `{ "success": false, "message": "That code is incorrect or has expired." }`
Limit attempts (e.g. 5 wrong tries invalidates the code). `resetToken` should be single-use and short-lived (~15 min).

## 5. Reset password - `POST /api/auth/reset-password`

Request: `{ "email": "aramide@example.com", "resetToken": "<from step 4>", "password": "NewSecret123" }`

Success `200`: `{ "success": true, "message": "Password updated.", "data": {} }`
Error `400`: invalid/expired token. Error `422`: password breaks the rules above (`errors.password`).
Invalidate the `resetToken` after use.

## 6. Logout - `POST /api/auth/logout`

Headers: `Authorization: Bearer <token>` - Body: `{}`
Success `200`: `{ "success": true, "message": "Logged out.", "data": {} }`
(Optional to invalidate the token server-side; the frontend always clears its own copy.)

---

## Open questions for the backend developer

1. Token style: a JWT, or a random string stored in the database? (Either works with this contract.)
   If you prefer PHP **sessions/cookies**, tell us - the frontend change is small.
2. Can you email the 4-digit code from the first version, or should we plan for a delay?
3. Final route names, if you want anything other than `/api/auth/...`.

---

# Restaurant homepage endpoints

Same conventions as above (`{success,message,data}` / `{success:false,message,errors}`). These need no login
(guests can use them); if a Bearer token is sent, link the record to that user.

## 6. Menu - `GET /api/menu` (the list)

Success `200` `data`:
```json
{
  "totalItems": 99,
  "categories": [
    { "id": "pizza", "name": "Pizza", "pill": "Pizza", "count": 18, "image": "https://.../pizza.jpg", "hidden": false }
  ],
  "items": [
    { "id": 2, "name": "Margherita Royale", "category": "pizza",
      "description": "Short text for the card", "price": 8500, "priceFrom": true, "oldPrice": 10500,
      "rating": 4.9, "reviews": 95, "badge": "New", "image": "https://.../x.jpg" }
  ]
}
```
- `category` on an item = the `id` of a category. `oldPrice`, `badge`, `image` may be `null`.
- `hidden: true` categories are not shown as a card on the page (their dishes still appear under "All").
- `price` is a number in Naira, no decimals (6500 = N6,500). Currency is set on the frontend (`SITE.currency`).
- `priceFrom: true` means the dish has several sizes and `price` is the SMALLEST size price (card shows "From").
- Categories on the restaurant today: Burgers, Pizza, Fried Chicken, Wraps, Desserts, Fast Food, Pasta.

## 6b. One dish in full - `GET /api/menu/{id}`

Called when a customer taps "View Details". Returns ALL the list fields above PLUS the detail fields.
Full spec, example JSON and suggested database tables: see **BACKEND_FOOD_DETAILS.md**.
Errors: `404` `{ "success": false, "message": "This dish could not be found." }`

## 7. Create a booking - `POST /api/bookings`

ONE endpoint for all three businesses (the site is a single platform with one login). `businessUnit` says which one.
Restaurant and hotel send bookings today (hotel: section 12); club will use the same endpoint later with its own fields.

Request (restaurant):
```json
{ "businessUnit": "restaurant", "name": "Aramide", "phone": "+2348031234567", "email": "a@b.com", "guests": "2",
  "date": "2026-12-05", "time": "19:30", "requests": "Window seat please" }
```
- `businessUnit` is one of `restaurant`, `hotel`, `club`.
- `date` is `YYYY-MM-DD` (must not be in the past), `time` is `HH:mm` (24h), `requests` optional.
- Please store a `status` on every booking (`pending`, `confirmed`, `cancelled`) - the customer portal and admin dashboard will use it.
Success `201`: `{ "success": true, "message": "Booking received.", "data": { "reference": "BKG-1042" } }`
Errors: `422` with field `errors` (`name, phone, email, guests, date, time`). Return `409` with a message if the slot is full.

## 7b. One account for everything

Login/register (sections 1-2) serve the restaurant, hotel and club alike. A logged-in customer's token is sent on
booking requests; link the booking to that user so one portal can list bookings from every business.

## 8. Contact message - `POST /api/contact`

Request: `{ "name": "...", "email": "...", "phone": "" , "subject": "general", "message": "..." }`
`subject` is one of the values in `SUBJECT_OPTIONS` (`src/data/content.js`). `phone` optional.
Success `201`: `{ "success": true, "message": "Message sent." }`

## 9. Newsletter - `POST /api/newsletter`

Request: `{ "email": "a@b.com" }`
Success `201`: `{ "success": true, "message": "Subscribed." }`. Duplicate email -> `422` with `errors.email`.

# Hotel endpoints

## 10. Rooms - `GET /api/hotel/rooms`

Success `200`:
```json
{ "success": true, "data": { "rooms": [
  { "id": "deluxe", "name": "Deluxe Room", "pricePerNight": 65000, "maxGuests": 3, "sizeSqm": 30, "bed": "1 King bed",
    "roomsTotal": 4, "badge": "Popular", "images": ["https://.../deluxe-1.jpg"],
    "description": "short text for the card", "longDescription": "full text for the pop-up window",
    "amenities": ["ac", "wifi", "tv", "bath", "breakfast", "minibar", "kettle"] }
] } }
```
- `pricePerNight` is a whole number in naira. `images` may be empty (the site shows a placeholder). `badge` may be `null`.
- `amenities` are short words; the allowed list and labels are in `src/features/hotel/data/rooms.js` (`AMENITY_LABELS`).
  Tell us if you want to add more and we add the icon.

## 11. Availability - `GET /api/hotel/availability?checkIn=2026-12-06&checkOut=2026-12-08&guests=2`

Dates are `YYYY-MM-DD`. `checkOut` must be after `checkIn` (else `422` with `errors.checkOut`). Success `200`:
```json
{ "success": true, "data": { "checkIn": "2026-12-06", "checkOut": "2026-12-08", "nights": 2, "rooms": [
  { "id": "deluxe", "available": true,  "reason": null,              "roomsLeft": 3, "nights": 2, "totalPrice": 130000 },
  { "id": "suite",  "available": false, "reason": "sold_out",        "roomsLeft": 0, "nights": 2, "totalPrice": 360000 },
  { "id": "standard","available": false,"reason": "too_many_guests", "roomsLeft": 0, "nights": 2, "totalPrice": 90000 }
] } }
```
- Return ALL rooms, with `available` true/false. `reason` is `null`, `sold_out` or `too_many_guests` (guests > `maxGuests`).
- `totalPrice` = `pricePerNight x nights`. The site recalculates it for display, but the server's price is the truth.

## 12. Book a room - `POST /api/bookings` with `businessUnit: "hotel"`

Same endpoint as section 7. Request:
```json
{ "businessUnit": "hotel", "roomId": "deluxe", "checkIn": "2026-12-06", "checkOut": "2026-12-08", "guests": "2",
  "name": "Ada Obi", "phone": "+2348030000000", "email": "ada@example.com", "requests": "Late arrival" }
```
Success `201`: `{ "success": true, "message": "Booking received.", "data": { "reference": "HTL-1042", "nights": 2, "totalPrice": 130000 } }`
- Check availability again on the server when saving (two people may book the last room). If it is gone, return `409` with a message.
- Store `status` = `pending`. The hotel confirms it later (customer portal and admin dashboard will show the status).
- The site shows "Pending confirmation" and promises a confirmation email, so please send one.
