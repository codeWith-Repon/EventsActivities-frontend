# F13 — Check-in & Attendance (host)

**Branch:** `feat/host-checkin` · **Status:** ✅ Done · **Route:** `/manage-event/[slug]/check-in`

Event-day attendance for hosts: see who's approved, check participants in by token, and track attendance.

## What it does
- Summary cards: approved / checked-in / absent.
- **Check in by token** — host enters (or pastes from a scanned QR) the participant's `checkInToken` →
  `POST /check-in`. Validates event-day on the backend.
- **Attendance list** — approved participants with checked-in / absent status (ordered by the API).

## Endpoints used
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/check-in/attendance/:eventId` | host | summary + participant list |
| `POST` | `/check-in` `{ token }` | host | mark attended (event-day only) |
| `GET` | `/check-in/qr/:participantId` | participant/host | token for QR (service included for reuse) |

## Files
**Added:** `src/services/checkin/checkin.service.ts`, `src/types/attendance.interface.ts`,
`CheckInManager` (`src/components/modules/ManageEvent/`), `manage-event/[slug]/check-in/page.tsx`, `docs/host-checkin.md`.

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- Manual token entry is the check-in mechanism here (no camera-scanner / QR-render dependency was added, to keep
  the bundle lean). `getCheckInToken` is included so a participant-facing QR view can be added later with a QR lib.
