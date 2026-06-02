# EventsHub — Dashboard Reconstruction & Feature Plan

> Living plan for rebuilding the **dashboard** (admin + host/co-host tools) and wiring it to the
> existing backend. The public landing page is **out of scope** — do not redesign it.

- **Frontend:** `f:\projects\personal\EventsActivities-frontend` (Next.js 16, React 19, Tailwind v4, shadcn/ui)
- **Backend:** `F:\projects\personal\Events-Activities-backend` (Express 5, Prisma 7, JWT cookies) — `API_DOCS.md` is the contract
- **API base:** `http://localhost:5000/api/v1` · Auth via HTTP-only cookies (`accessToken`, `refreshToken`)

---

## How we work (workflow rules)

When you say **"start F0x"** (or just **"next"**), I will, for that one feature:

1. **Branch from `main`** → `git checkout main && git pull && git checkout -b <feature-branch>`
2. **Always use the `frontend-design` skill** for every piece of UI. Bold, distinctive, production-grade — never generic.
3. Build the feature end-to-end: service layer → components/pages → wire to backend → light + dark theming.
4. **Verify**: `tsc --noEmit` + `eslint` clean (build if the machine allows).
5. **Mark the feature `[x]` done** in this `plan.md`.
6. **Write a docs file** `docs/<feature>.md` explaining how the feature works (what it does, endpoints used, files, data flow, how to use it).
7. **Commit & push** the branch to `origin`.
8. **Merge into `main`** (`--no-ff`) and push `main`.
9. Stop. Wait for the next prompt, then repeat from step 1 for the next feature.

**Conventions**
- Branch names: as listed per feature below.
- Commit style: Conventional Commits (`feat:`, `fix:`, `refactor:`), Claude co-author trailer.
- New API calls live in `src/services/<domain>/*.ts` (server actions, mirror existing patterns).
- Reuse the shell primitives from **F00**; don't re-invent tables/headers/filters per page.

**Status legend:** `[ ]` todo · `[~]` in progress · `[x]` done (branch merged to `main`, docs written)

---

## Design direction

Reconstruct the dashboard with a **distinctive, data-dense but calm** aesthetic (confirmed at F00 kickoff via the
frontend-design skill — not the generic shadcn default, and not the landing page's look). Requirements that hold
across every feature:

- Full **light + dark** theming via CSS tokens (no hardcoded `bg-white` / `text-gray-*`).
- A consistent **shell**: sidebar + topbar + page header + content rhythm.
- Reusable primitives so all pages feel like one product.

---

## Backend capability map (what we're surfacing)

| Domain | Endpoints | Surfaced in |
|---|---|---|
| Dashboard meta | `GET /dashboard/meta-data` | F01 |
| Revenue report | `GET /dashboard/revenue-report` | F09 |
| Users | `GET /users`, `PATCH /users/:id/status`, `/role`, `DELETE /users/:id` | F02, F03 |
| Hosts | `GET /hosts`, `GET /hosts/:id/stats`, `PATCH /hosts/:id/verify` | F04 |
| Events | `GET /events`, `PATCH /events/update/:slug`, `DELETE`, `PATCH /events/:id/force-cancel` | F05 |
| Participants | `GET /event-participants`, `GET/:id`, `PATCH/:id`, `DELETE/:id` | F06 |
| Payments | `GET /payment`, `PATCH /payment/:id/refund` | F07 |
| Reports | `GET /reports`, `PATCH /reports/:id` | F08 |
| Notifications | `GET /notifications`, `/unread-count`, `/read-all`, `/:id/read`, `DELETE /:id` | F10 |
| Event analytics | `GET /events/:slug/analytics` | F11 |
| Invitations | `POST /invitations/send`, `GET /invitations/events/:id`, `PATCH revoke`, accept/decline | F12 |
| Check-in | `GET /check-in/qr/:id`, `POST /check-in`, `GET /check-in/attendance/:id` | F13 |
| Co-hosts | `GET/POST /co-hosts/events/:id`, `DELETE /:id/:hostId` | F14 |

---

## Feature checklist

### Phase 0 — Foundation

- [x] **F00 — Dashboard design system & shell** · `feat/dashboard-shell` · ✅ merged → `docs/dashboard-shell.md`
  - Redesign: `admin/layout.tsx`, `(dashboardLayout)/(commonDashboard)/layout.tsx`, `DashboardSidebar(+Content)`, `DashboardNavbar(+Content)`, mobile sidebar.
  - Add: theme tokens + dark-mode toggle for dashboard, reusable primitives — `PageHeader`, `DataTable` shell, `StatCard`, `FilterBar`, `Pagination`, `EmptyState`, `StatusBadge`.
  - Everything else depends on this. → `docs/dashboard-shell.md`

### Phase 1 — Redesign existing admin pages

- [x] **F01 — Overview (stats + charts)** · `feat/dashboard-overview` · `GET /dashboard/meta-data` · ✅ merged → `docs/dashboard-overview.md`
- [x] **F02 — Users management** · `feat/dashboard-users` · list, search/filter, block/unblock, delete · ✅ merged → `docs/dashboard-users.md`
- [x] **F03 — Admins management** · `feat/dashboard-admins` · promote/demote roles (SUPER_ADMIN), list · ✅ merged → `docs/dashboard-admins.md`
- [x] **F04 — Hosts management** · `feat/dashboard-hosts` · list, verify toggle, host stats drawer · ✅ merged → `docs/dashboard-hosts.md`
- [x] **F05 — Events management** · `feat/dashboard-events` · list, view, **force-cancel** (edit/delete are creator-only) · ✅ merged → `docs/dashboard-events.md`

### Phase 2 — New admin pages (backend ready, no UI yet)

- [ ] **F06 — Event Participants management** · `feat/dashboard-participants` · nav already links here but the page is missing → `docs/dashboard-participants.md`
- [ ] **F07 — Payments management** · `feat/dashboard-payments` · list, filters, **refund** → `docs/dashboard-payments.md`
- [ ] **F08 — Content reports / moderation** · `feat/dashboard-reports` · list, resolve/dismiss + admin note → `docs/dashboard-reports.md`
- [ ] **F09 — Revenue & analytics report** · `feat/dashboard-revenue` · top events, top hosts, monthly revenue → `docs/dashboard-revenue.md`
- [ ] **F10 — Notifications center** · `feat/dashboard-notifications` · bell + unread count, list, mark read/all, delete → `docs/dashboard-notifications.md`

### Phase 3 — Host & co-host tools

- [ ] **F11 — Per-event analytics (host)** · `feat/host-analytics` · views, participants, capacity, revenue, check-in → `docs/host-analytics.md`
- [ ] **F12 — Invitations (host)** · `feat/host-invitations` · send, list per event, revoke; accept/decline pages → `docs/host-invitations.md`
- [ ] **F13 — Check-in & attendance (host)** · `feat/host-checkin` · participant QR, host scan/check-in, attendance summary → `docs/host-checkin.md`
- [ ] **F14 — Co-hosts (host)** · `feat/host-cohosts` · list, add by user, remove → `docs/host-cohosts.md`

---

## API endpoints by feature

> Base URL `http://localhost:5000/api/v1` · Auth via HTTP-only cookies (`accessToken`, `refreshToken`).
> Standard envelope: `{ "success": true, "message": "...", "statusCode": 200, "data": ... }`.
> Paginated list `data` shape: `{ meta: { page, limit, totalPage, total }, data: [...] }`.

### Shared (used by the shell / everywhere)
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `GET`  | `/users/me` | any | Current user profile (sidebar, role gating) |
| `PATCH`| `/users/` | any | Update own profile (multipart, key `file`) |
| `POST` | `/auth/logout` | — | Clear cookies |
| `POST` | `/auth/get-new-token` | refresh cookie | Refresh access token |

### F00 — Dashboard shell
- No new data endpoints. Consumes `GET /users/me` (role → nav) and `POST /auth/logout`.

### F01 — Overview (stats + charts)
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/dashboard/meta-data?startDate&endDate&duration` | ADMIN, SUPER_ADMIN | `duration` = `7days\|15days\|1month`. Response feeds `data.summary` (totalUsers/Events/Revenue/Participants), `data.charts.revenue\|users\|events`, `data.eventDistribution`. |

### F02 — Users management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/users?page&limit&sortBy&sortOrder&searchTerm&status&role&gender` | ADMIN+ | `status`=ACTIVE\|INACTIVE\|BLOCKED, `role`=USER\|ADMIN\|SUPER_ADMIN\|HOST |
| `GET`   | `/users/:userId` | any | Single user (no password) |
| `PATCH` | `/users/:userId/status` | ADMIN+ | `{ "status": "BLOCKED" \| "ACTIVE" }` |
| `DELETE`| `/users/:userId` | ADMIN+ | Returns deleted user |

### F03 — Admins management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/users?role=ADMIN` | ADMIN+ | List admins (reuse users list) |
| `PATCH` | `/users/:userId/role` | **SUPER_ADMIN only** | `{ "role": "USER" \| "HOST" \| "ADMIN" }` — promote/demote |

### F04 — Hosts management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/hosts?page&limit&sortBy&sortOrder` | ADMIN+ | Includes `user`, `_count.events`, `rating` |
| `GET`   | `/hosts/:hostId/stats` | ADMIN+ | `{ host, stats:{ totalEvents, totalParticipants, totalRevenue, averageRating } }` |
| `PATCH` | `/hosts/:hostId/verify` | ADMIN+ | `{ "isVerified": true \| false }` |

### F05 — Events management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/events?page&limit&sortBy&sortOrder&searchTerm&status&category&hostId` | public | `status`=OPEN\|FULL\|CANCELLED\|COMPLETED |
| `GET`   | `/events/category` | public | Unique category list |
| `GET`   | `/events/:slug` | public | Full event |
| `PATCH` | `/events/update/:slug` | creator | multipart; `deleteImages[]`, fields, `status` |
| `DELETE`| `/events/:slug` | creator | Delete event |
| `PATCH` | `/events/:eventId/force-cancel` | **ADMIN+** | Force-cancel any event (notifies participants) |

### F06 — Event Participants management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/event-participants?page&limit&searchTerm&joinStatus&paymentStatus&eventId&userId&hostId` | public | `joinStatus`=PENDING\|APPROVED\|REJECTED\|CANCELLED\|WAITLISTED |
| `GET`   | `/event-participants/:id` | any | Single record |
| `PATCH` | `/event-participants/:id` | participant | `{ "joinStatus": "CANCELLED" \| "REJECTED" }` |
| `DELETE`| `/event-participants/:id` | ADMIN+ | Delete record |

### F07 — Payments management
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/payment?paymentStatus&eventId&userId&page&limit` | ADMIN+ | Each row: amount, status, transactionId, user, event |
| `PATCH` | `/payment/:paymentId/refund` | ADMIN+ | Only `PAID` → `REFUNDED` (else 400); sets participant `CANCELLED` |

### F08 — Content reports / moderation
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `POST`  | `/reports` | any | `{ type:"EVENT"\|"RATING", targetId, reason }` (submit, used in detail views) |
| `GET`   | `/reports?type&status&page&limit` | ADMIN+ | `status`=PENDING\|RESOLVED\|DISMISSED |
| `PATCH` | `/reports/:reportId` | ADMIN+ | `{ status:"RESOLVED"\|"DISMISSED", adminNote? }` |

### F09 — Revenue & analytics report
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/dashboard/revenue-report` | ADMIN+ | `{ topEvents[], topHosts[], monthlyRevenue[{month,revenue}] }` (top 10) |

### F10 — Notifications center
| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| `GET`   | `/notifications/` | any | All notifications, newest first |
| `GET`   | `/notifications/unread-count` | any | `{ unread: n }` |
| `PATCH` | `/notifications/read-all` | any | Mark all read |
| `PATCH` | `/notifications/:notificationId/read` | any | Mark one read |
| `DELETE`| `/notifications/:notificationId` | any | Delete one |

### F11 — Per-event analytics (host)
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| `GET` | `/events/:slug/analytics` | host / co-host | `{ views, participants{...}, capacity{max,filled,fillRate}, revenue{collected,pending,refunded}, checkin{checkedIn,absent,attendanceRate} }` |

### F12 — Invitations (host)
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `POST`  | `/invitations/send` | host | `{ eventId, email }` → returns `invitation` + `inviteLink` |
| `GET`   | `/invitations/events/:eventId` | host | All invitations for event |
| `PATCH` | `/invitations/revoke/:invitationId` | host | → status `REVOKED` |
| `POST`  | `/invitations/accept/:token` | any | Invitee accepts (auto APPROVED); 410 if expired |
| `POST`  | `/invitations/decline/:token` | any | → status `DECLINED` |

### F13 — Check-in & attendance (host)
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`  | `/check-in/qr/:participantId` | participant or host | `{ checkInToken, eventTitle, eventDate }` (APPROVED only) → render QR |
| `POST` | `/check-in` | event host | `{ token }` from scanned QR; validates event-day |
| `GET`  | `/check-in/attendance/:eventId` | event host | `{ total, attended, absent, participants[] }` |

### F14 — Co-hosts (host)
| Method | Endpoint | Auth | Body / params |
|---|---|---|---|
| `GET`   | `/co-hosts/events/:eventId` | public | List co-hosts |
| `POST`  | `/co-hosts/events/:eventId` | primary host | `{ userId }` (target must be a host) |
| `DELETE`| `/co-hosts/events/:eventId/:hostId` | primary host | `:hostId` = `Host.id` (not userId) |

---

## Enums reference (for filters & badges)

| Enum | Values |
|---|---|
| Role | `USER`, `HOST`, `ADMIN`, `SUPER_ADMIN` |
| UserStatus | `ACTIVE`, `INACTIVE`, `BLOCKED` |
| EventStatus | `OPEN`, `FULL`, `CANCELLED`, `COMPLETED` |
| JoinStatus | `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED`, `WAITLISTED` |
| PaymentStatus | `PENDING`, `PAID`, `CANCELLED`, `REJECTED`, `FAILED`, `REFUNDED` |
| InvitationStatus | `PENDING`, `ACCEPTED`, `DECLINED`, `REVOKED` |
| ReportType / ReportStatus | `EVENT`,`RATING` / `PENDING`,`RESOLVED`,`DISMISSED` |
| NotificationType | `EVENT_REMINDER`, `PARTICIPANT_APPROVED`, `PARTICIPANT_REJECTED`, `PARTICIPANT_WAITLISTED`, `WAITLIST_PROMOTED`, `EVENT_CANCELLED` |

---

## Progress log

_(Each completed feature gets a one-line entry: date · feature · branch · merged ✓)_

- 2026-06-02 · **F00** Dashboard design system & shell (Aurora Glass) · `feat/dashboard-shell` · merged ✓
- 2026-06-02 · **F01** Overview — stats + bespoke SVG charts · `feat/dashboard-overview` · merged ✓
- 2026-06-02 · **F02** Users management — filters, block/unblock, delete · `feat/dashboard-users` · merged ✓
- 2026-06-02 · **F03** Admins management — role promote/demote (SUPER_ADMIN) · `feat/dashboard-admins` · merged ✓
- 2026-06-02 · **F04** Hosts management — verify toggle + stats dialog · `feat/dashboard-hosts` · merged ✓
- 2026-06-02 · **F05** Events management — list, view, force-cancel · `feat/dashboard-events` · merged ✓ · **Phase 1 complete**
