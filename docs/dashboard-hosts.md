# F04 — Hosts Management

**Branch:** `feat/dashboard-hosts` · **Status:** ✅ Done · **Route:** `/admin/dashboard/hosts-management`

Manage host accounts: review verification status & performance, toggle the **verified** badge, and open a
per-host **stats** panel. Previously this page incorrectly listed *User* records via `GET /users`; it now
uses the real **Host** endpoints.

---

## What it does

- Lists Host records (`GET /hosts`) with sortable columns: Host, Verified, Events, Rating, Joined.
- **Verify / Remove verification** row action → `PATCH /hosts/:hostId/verify`.
- **View stats** → opens a dialog that fetches `GET /hosts/:hostId/stats` and shows events hosted,
  participants, revenue, and average rating as `StatCard`s.
- Header chips for total hosts + verified count; pagination; refresh; resilient `EmptyState`.

---

## Endpoints used

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/hosts?page&limit&sortBy&sortOrder` | ADMIN+ | host + `_count.events` + rating + isVerified |
| `GET` | `/hosts/:hostId/stats` | ADMIN+ | `{ host, stats:{ totalEvents, totalParticipants, totalRevenue, averageRating } }` |
| `PATCH` | `/hosts/:hostId/verify` | ADMIN+ | `{ isVerified: boolean }` |

> `GET /hosts` supports only page/limit/sort (no `searchTerm`), so this list intentionally has no search box.

---

## Files

**Added**
- `src/services/host/host.service.ts` — `getHosts`, `getHostStats`, `verifyHost`
- `src/types/host.interface.ts` — `IHostListItem`, `IHostStats`
- `src/components/modules/Host/HostsColumn.tsx`
- `src/components/modules/Host/HostsTable.tsx`
- `src/components/modules/Host/HostStatsDialog.tsx`
- `src/app/(dashboardLayout)/admin/dashboard/hosts-management/loading.tsx`
- `docs/dashboard-hosts.md`

**Modified**
- `src/app/(dashboardLayout)/admin/dashboard/hosts-management/page.tsx` — full rebuild on the host service

---

## Verification
- `tsc --noEmit` — clean · `eslint` — clean
- New service `host.service.ts` built fresh (no host endpoints existed on `main`).

## Notes
- The stats dialog fetches lazily on open via the server action; loading is **derived** from the response key
  (avoids synchronous `setState` in effects).
- Verification toggles directly (no extra confirm) with a toast + refresh; the backend enforces admin auth.
