# F05 — Events Management

**Branch:** `feat/dashboard-events` · **Status:** ✅ Done · **Route:** `/admin/dashboard/events-management`

The admin events screen — **built from scratch** (the route didn't exist on `main`, though the sidebar
already linked to it). Browse, filter, inspect, and **force-cancel** events.

---

## What it does

- Lists events (`GET /events`) in a glass table: Event (thumb + title + category), Host, Date/Time, Fee, Capacity, Status.
- **Search** (title/location/category/description) + **filter** by Status and Category.
- **View** full event details in a glass dialog (image, description, schedule, location, host, capacity, fee).
- **Force cancel** (admin moderation) → `PATCH /events/:eventId/force-cancel`, with a destructive confirm.
  Shown only for events that aren't already `CANCELLED`/`COMPLETED`. Notifies approved participants (backend).
- Total-events chip, pagination, resilient `EmptyState`, loading skeleton.

---

## Endpoints used

| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/events?page&limit&sortBy&sortOrder&searchTerm&status&category&hostId` | public | list |
| `GET` | `/events/category` | public | category filter options |
| `PATCH` | `/events/:eventId/force-cancel` | ADMIN+ | force-cancel (uses event **id**, not slug) |
| `DELETE` | `/events/:slug` | creator only | service added but **not** surfaced here (see notes) |

---

## Files

**Added**
- `src/services/events/eventAdmin.ts` — `getAllCategory`, `forceCancelEvent`, `deleteEvent`
- `src/components/modules/AdminDashboard/Event/EventsColumn.tsx`
- `src/components/modules/AdminDashboard/Event/EventsFilter.tsx`
- `src/components/modules/AdminDashboard/Event/EventsTable.tsx`
- `src/components/modules/AdminDashboard/Event/EventViewDialog.tsx`
- `src/app/(dashboardLayout)/admin/dashboard/events-management/page.tsx`
- `src/app/(dashboardLayout)/admin/dashboard/events-management/loading.tsx`
- `docs/dashboard-events.md`

---

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- **Edit/Delete are creator-only** in the backend, so an admin (who usually isn't the event's host) would get
  `403`. The correct admin moderation tool is **force-cancel**, which is what this page surfaces. `deleteEvent`
  is included in the service for reuse (e.g. a future host/owner events view), but intentionally not shown here.
- `force-cancel` takes the event **UUID** (`event.id`); the list provides it alongside the slug.
