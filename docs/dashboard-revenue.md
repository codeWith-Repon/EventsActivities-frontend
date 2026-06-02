# F09 — Revenue & Analytics Report

**Branch:** `feat/dashboard-revenue` · **Status:** ✅ Done · **Route:** `/admin/dashboard/revenue-report`

Platform-wide earnings analytics: total revenue, monthly trend, and top events/hosts by revenue.

## What it does
- Stat cards: total revenue (all time), best month, top host.
- **Monthly revenue** area chart (bespoke `AreaTrendChart`).
- **Top events** and **Top hosts** ranked bar lists (proportional aurora bars).
- New **Finance → Revenue** sidebar item.

## Endpoint used
| Method | Endpoint | Auth | Returns |
|---|---|---|---|
| `GET` | `/dashboard/revenue-report` | ADMIN+ | `{ topEvents[], topHosts[], monthlyRevenue[] }` (top 10) |

## Files
**Added:** `RankedBarList` (`src/components/modules/AdminDashboard/`), page + `loading.tsx`, `docs/dashboard-revenue.md`.
**Modified:** `src/services/meta/meta.service.ts` (`getRevenueReport`), `src/types/dashboard.interface.ts` (revenue types), `src/lib/navItem.config.ts` (Finance → Revenue).

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- Total revenue is summed from `monthlyRevenue` (all-time). Reuses the F01 `AreaTrendChart`, so no new chart dep.
