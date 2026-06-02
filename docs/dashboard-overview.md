# F01 — Overview (stats + charts)

**Branch:** `feat/dashboard-overview` · **Status:** ✅ Done · **Route:** `/admin/dashboard`

The admin landing screen: four KPI tiles plus four charts, all driven by a single API call and
filterable by time period. Built on the F00 Aurora Glass system with **bespoke SVG charts** (no
charting dependency added).

---

## What it does

- Fetches `GET /dashboard/meta-data` (admin only) and renders:
  - **KPI tiles** — Total users, Total events, Paid sales, Revenue (৳).
  - **Revenue** area chart (paid transactions over the period).
  - **Event status** donut (distribution across OPEN / FULL / COMPLETED / CANCELLED).
  - **New users** and **Events created** area charts.
- A **duration filter** (7 days / 15 days / This month) updates the `?duration=` query param, which
  re-runs the server fetch.
- Resilient: if the API is unreachable or returns nothing, a friendly `EmptyState` is shown instead of crashing.

---

## Data flow

```
page.tsx (server, force-dynamic)
  └─ getDashboardMeta(searchParams)            src/services/meta/meta.service.ts
       └─ serverFetch.get('/dashboard/meta-data?duration=…')   (sends accessToken cookie)
  └─ maps response → StatCard / AreaTrendChart / DonutChart
```

### Response shape consumed (`data`)
```ts
{
  summary: { totalUsers, totalEvents, totalSales, totalRevenue },
  eventDistribution: [{ status, _count: { _all } }],
  charts: {
    revenue: [{ date: 'YYYY-MM-DD', total }],
    users:   [{ date: 'YYYY-MM-DD', count }],
    events:  [{ date: 'YYYY-MM-DD', count }],
  }
}
```
> Raw-SQL `SUM(amount)` can arrive as a string, so chart values are coerced with `Number()`.
> `duration` accepts `7days | 15days | 1month` (backend defaults to start-of-month).

---

## Bespoke charts (no dependency)

Instead of pulling in a charting library, F01 ships two small, on-brand SVG components:

- **`AreaTrendChart`** — gradient-filled area + line, hairline gridlines, hover guide + tooltip
  (nearest-point tracking). Tones: violet / cyan / fuchsia / teal / amber. Accepts a `formatValue`.
- **`DonutChart`** — `stroke-dasharray` arcs with hover highlight, center total, and a legend with
  per-segment counts and percentages.

Both scale fluidly and use the Aurora CSS variables, so they re-color automatically in light/dark.

---

## Files

**Added**
- `src/services/meta/meta.service.ts` — `getDashboardMeta(query)`
- `src/components/modules/AdminDashboard/DurationFilter.tsx`
- `src/components/modules/AdminDashboard/charts/AreaTrendChart.tsx`
- `src/components/modules/AdminDashboard/charts/DonutChart.tsx`
- `src/app/(dashboardLayout)/admin/dashboard/loading.tsx`
- `docs/dashboard-overview.md`

**Modified**
- `src/app/(dashboardLayout)/admin/dashboard/page.tsx` — was a stub, now the full overview
- `src/types/dashboard.interface.ts` — added `DashboardMeta`, `DashboardSummary`, `ChartPoint`, `EventDistributionItem`

---

## Verification
- `tsc --noEmit` — clean · `eslint` — clean
- API base `NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1` confirmed; endpoint returns `401`
  without an admin session (expected) — i.e. it's reachable and the page will populate once signed in as admin.

## Notes
- This rebuilds the overview **fresh on `main`** (the `meta` service and chart components only existed on `dev`).
- No deltas/trends are shown on KPI tiles because the API doesn't return prior-period figures — avoided
  fabricating numbers. Can be added if the backend later exposes comparisons.
