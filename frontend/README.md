# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Folder layout (one folder per business)

```
src/
  features/
    restaurant/   RestaurantPage.jsx + sections/, components/, hooks/, data/ (menu, hours, facilities...)
    hotel/        HotelPage.jsx + sections/, components/, hooks/, data/ (rooms, facilities, house rules)
    club/         ClubPage.jsx (placeholder until the club phase)
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
Rule of thumb: code used by ONE business lives in its folder; code used by two or more goes in a shared folder.
Each developer works inside their own business folder, so merge conflicts stay rare.
