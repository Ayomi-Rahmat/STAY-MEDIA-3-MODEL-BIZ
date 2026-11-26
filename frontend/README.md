# React + Vite

## Folder layout (one folder per business)

```
src/
  features/
    restaurant/   RestaurantPage.jsx + sections/, components/, hooks/, data/ (menu, hours, facilities...)
    hotel/        HotelPage.jsx + sections/, components/, hooks/, data/ (rooms, facilities, house rules)
    club/         ClubPage.jsx (placeholder until the club completed)
    home/         HomePage.jsx + the homepage-only sections
    info/         About, Contact, FAQ, Blog, Gallery, Privacy, Terms, NotFound
    auth/         Login, Register, Forgot/Verify/Reset password
  components/     shared pieces used by every business (Button, Input, Photo, Navbar, Footer...)
  layouts/        page frames (SiteLayout, auth layouts, UnitPage)
  sections/       sections shared by several pages (Contact form, Reviews, ContactCta)
  data/           site-wide data (SITE, UNITS, images, shared content)
  services/       api.js - the only file that talks to the backend (hotelApi, restaurantApi, authApi)
  context/ hooks/ utils/
```
