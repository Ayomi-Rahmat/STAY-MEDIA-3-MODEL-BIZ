# How we work together

## Golden rules
1. **Never push straight to `main`.** All work goes through a branch and a Pull Request (PR).
2. **One small branch = one task.** Small PRs get reviewed fast and rarely conflict.
3. **Pull before you start**, and again before you open your PR.
4. **Never commit `.env` or any password/key.** Copy `.env.example` to `.env` instead.
5. **The API contract (`API_CONTRACT.md`) is the agreement between frontend and backend.** Change it in a PR that both sides approve.

## Branch names
`feature/<unit>-<what>`  e.g. `feature/restaurant-facilities`, `feature/hotel-room-list`, `feature/club-events`
`fix/<what>`             e.g. `fix/login-error-message`
`docs/<what>`            e.g. `docs/api-contract-bookings`

## Everyday loop
```bash
git switch main
git pull                          # get everyone's latest work
git switch -c feature/hotel-room-list
# ... write code, test it ...
npm run lint && npm run build     # must pass before you push
git add -A
git commit -m "Hotel: add room list section"
git push -u origin feature/hotel-room-list
# open a Pull Request on GitHub, ask a teammate to review
```
After the PR is merged: `git switch main && git pull`, then delete your old branch.

## If main moved while you worked
```bash
git switch main && git pull
git switch feature/hotel-room-list
git merge main                    # fix conflicts in VS Code if asked, then commit
```

## Who edits what (to avoid conflicts)
- Restaurant pages/sections, Hotel pages/sections, Club pages/sections: the person assigned to that unit.
- **Shared files** - `src/components/`, `src/layouts/`, `src/services/api.js`, `src/data/site.js`, `src/index.css`, `src/App.jsx`:
  tell the team before changing them, and keep those PRs small and separate.

## Before you open a PR
- [ ] `npm run lint` and `npm run build` pass
- [ ] You tried it in the browser, on desktop AND a phone-sized screen
- [ ] No `.env`, passwords or keys in the changes
- [ ] If an API field changed, `API_CONTRACT.md` is updated in the same PR
