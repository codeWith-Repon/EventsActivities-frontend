# F08 — Content Reports / Moderation

**Branch:** `feat/dashboard-reports` · **Status:** ✅ Done · **Route:** `/admin/dashboard/reports-management`

New admin moderation screen: review reports users filed against events/ratings and resolve or dismiss them.

## What it does
- Table: Type (Event/Rating), Reason, Reporter, Status, Reported date.
- **Filter** by type and status; pagination; pending-count chip.
- **Review** action (on PENDING reports) → dialog to choose **Resolved/Dismissed** + optional admin note,
  posted via `PATCH /reports/:id`.
- New **Moderation → Reports** sidebar item.

## Endpoints used
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| `GET` | `/reports?type&status&page&limit` | ADMIN+ | — |
| `PATCH` | `/reports/:reportId` | ADMIN+ | `{ status: 'RESOLVED'\|'DISMISSED', adminNote? }` |

## Files
**Added:** `src/services/report/report.service.ts`, `src/types/report.interface.ts`, `ReportsColumn/Filter/Table` + `ResolveReportDialog` (`src/components/modules/Report/`), page + `loading.tsx`, `docs/dashboard-reports.md`.
**Modified:** `src/lib/navItem.config.ts` (Moderation → Reports).

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- Submitting reports (`POST /reports`) is a user action belonging in event/rating detail views, not this admin screen.
- `targetId` links to the reported event/rating; deep-linking to the target is a future enhancement.
