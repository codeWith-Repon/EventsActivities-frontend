# F11 — Per-event Analytics (host)

**Branch:** `feat/host-analytics` · **Status:** ✅ Done
**Routes:** `/manage-events` (hub) · `/manage-event/[slug]` (analytics tab)

Establishes the **host "Manage event" surface** and its first tab — per-event analytics. This is the shell
that F12–F14 extend with more tabs.

## What it does
- **Manage-events hub** (`/manage-events`) — lists events the signed-in user hosts, each with a **Manage** link.
  Reachable via a "Host tools" link added to the My Events page.
- **Manage-event layout** — back link, event header (title/status), and a **tab nav**
  (Analytics · Invitations · Check-in · Co-hosts). Tabs for F12–F14 are present; their pages land in those features.
- **Analytics tab** — `GET /events/:slug/analytics`: stat cards (views, fill rate, revenue collected, attendance),
  a participants donut (approved/pending/waitlisted/rejected/cancelled), and capacity / revenue / check-in breakdowns.

## Endpoint used
| Method | Endpoint | Auth | Returns |
|---|---|---|---|
| `GET` | `/events/:slug/analytics` | host / co-host | `{ views, participants, capacity, revenue, checkin }` |

## Files
**Added:** `src/services/events/hostEvents.ts` (`getEventAnalytics`, `getMyHostedEvents`), `src/types/analytics.interface.ts`,
`ManageEventTabNav` (`src/components/modules/ManageEvent/`), `manage-events/page.tsx`,
`manage-event/[slug]/layout.tsx` + `page.tsx`, `docs/host-analytics.md`.
**Modified:** `my-events/page.tsx` — adds the Host-tools entry link (and removes a stray `console.log`).

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- `getMyHostedEvents` fetches a page of events and keeps those whose `host.userId` matches the current user
  (the list endpoint exposes `host.userId` but not a direct "my events" route). Fine for typical host volumes.
- The manage-event area opts into the Aurora theme via an `.aurora` wrapper, matching the admin dashboard.
