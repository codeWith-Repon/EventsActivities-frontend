# F14 — Co-hosts (host)

**Branch:** `feat/host-cohosts` · **Status:** ✅ Done · **Route:** `/manage-event/[slug]/co-hosts`

Primary hosts delegate event management to other hosts.

## What it does
- Lists current co-hosts (name/email/avatar).
- **Add a co-host** by target user ID → `POST /co-hosts/events/:eventId`.
- **Remove** a co-host → `DELETE /co-hosts/events/:eventId/:hostId` (uses `Host.id`).

## Endpoints used
| Method | Endpoint | Auth |
|---|---|---|
| `GET` | `/co-hosts/events/:eventId` | public |
| `POST` | `/co-hosts/events/:eventId` `{ userId }` | primary host |
| `DELETE` | `/co-hosts/events/:eventId/:hostId` | primary host |

## Files
**Added:** `src/services/cohost/cohost.service.ts`, `src/types/cohost.interface.ts`,
`CoHostsManager` (`src/components/modules/ManageEvent/`), `manage-event/[slug]/co-hosts/page.tsx`, `docs/host-cohosts.md`.

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- Adding requires the **target user's UUID** (the API keys on `userId`, and the target must already be a host).
  A user-search picker is a sensible future enhancement.
- Remove keys on `Host.id` (`coHost.hostId`), not the user id — matching the backend contract.
