# F10 — Notifications Center

**Branch:** `feat/dashboard-notifications` · **Status:** ✅ Done · **Routes:** topbar bell + `/admin/dashboard/notifications`

In-dashboard notifications: a topbar bell with unread badge + dropdown, and a full notifications page.

## What it does
- **Topbar bell** (`NotificationBell`) — unread count badge, popover with the 8 most recent, click to mark read,
  "Mark all", and a link to the full page. Replaces the F00 placeholder bell.
- **Notifications page** — full list with per-item mark-read (dot) and delete, plus "Mark all as read".
- New **Account → Notifications** sidebar item.

## Endpoints used
| Method | Endpoint |
|---|---|
| `GET` | `/notifications/` |
| `GET` | `/notifications/unread-count` |
| `PATCH` | `/notifications/read-all` |
| `PATCH` | `/notifications/:id/read` |
| `DELETE` | `/notifications/:id` |

## Files
**Added:** `src/services/notification/notification.service.ts`, `src/types/notification.interface.ts`, `NotificationBell` + `NotificationsList` (`src/components/modules/Notification/`), the page, `docs/dashboard-notifications.md`.
**Modified:** `DashboardNavbarContent.tsx` (wires the bell), `src/lib/navItem.config.ts` (Account → Notifications).

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- Optimistic UI: mark-read / delete update local state immediately, then call the API.
- Initial fetch is inlined in the effect with `setState` inside `.then` to satisfy the React-compiler lint
  (no synchronous `setState` in effects).
