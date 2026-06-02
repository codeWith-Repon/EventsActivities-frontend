# F06 — Event Participants Management

**Branch:** `feat/dashboard-participants` · **Status:** ✅ Done · **Route:** `/admin/dashboard/event-participants-management`

The sidebar linked here but the page didn't exist — now built. Browse every participation record across the
platform, filter by join/payment status, inspect, and delete records.

---

## What it does
- Lists participation records (`GET /event-participants`): Participant, Event, Join status, Payment, Joined.
- **Search** (user/email/event) + **filter** by Join status and Payment status.
- **View** a record in a glass dialog; **Delete** a record (`DELETE /event-participants/:id`, admin).
- Total chip, pagination, resilient `EmptyState`, loading skeleton.

## Endpoints used
| Method | Endpoint | Auth |
|---|---|---|
| `GET` | `/event-participants?page&limit&searchTerm&joinStatus&paymentStatus&eventId&userId&hostId` | public |
| `DELETE` | `/event-participants/:id` | ADMIN+ |

## Files
**Added:** `ParticipantsColumn/Filter/Table/ViewDialog` (`src/components/modules/Participant/`), the page + `loading.tsx`, `docs/dashboard-participants.md`.
**Modified:** `src/services/participant/participant.service.ts` — added `deleteParticipant`.

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- `PATCH /event-participants/:id` is participant-only (CANCELLED/REJECTED), not an admin approve hook, so the
  admin page exposes **view + delete**. Approvals happen automatically (free events / payment / waitlist promotion).
