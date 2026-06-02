<div align="center">

# EventsHub — Frontend

**Find your people for events & activities.**
A modern platform to discover local events, join activities, host gatherings, and manage everything from a clean, role-aware dashboard.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[Live Demo](https://events-activities-frontend-alpha.vercel.app) · [Backend API](https://github.com/codeWith-Repon) · [Dashboard Docs](./docs)

</div>

---

## Overview

EventsHub connects people through shared experiences — concerts, hikes, game nights, workshops and more. This repository is the **Next.js frontend**; it talks to a separate Express + Prisma REST API over JWT (HTTP-only cookie) auth.

It ships three coordinated surfaces:

- **Public site** — landing page, event discovery, event details, authentication.
- **Admin dashboard** — a "Clean Light Pro" control center for managing users, hosts, events, participants, payments, reports, revenue analytics, and notifications.
- **Host tools** — a per-event "Manage" workspace for analytics, invitations, check-in/attendance, and co-hosts.

---

## Features

### Public
- 🔎 Browse & search events with filters (category, status, location)
- 📅 Event detail pages with host info, capacity, pricing, and ratings
- 🔐 Authentication — register, login, forgot/reset password (JWT via HTTP-only cookies)
- ⚡ **Quick demo login** — one-click sign-in as User / Host / Admin

### Admin Dashboard (`/admin/dashboard`)
- 📊 **Overview** — KPIs + bespoke SVG charts (revenue, signups, events, status mix)
- 👥 **Users** — search/filter, block/unblock, delete
- 🛡️ **Admins** — role promote/demote (SUPER_ADMIN-gated)
- ✨ **Hosts** — verify toggle + per-host stats
- 🎟️ **Events** — browse, inspect, force-cancel (moderation)
- 🧾 **Participants** — every join request, filterable & removable
- 💳 **Payments** — transactions + refunds
- 🚩 **Reports** — resolve / dismiss content reports
- 📈 **Revenue** — monthly trend + top events/hosts
- 🔔 **Notifications** — topbar bell + full center
- 🌗 Light/Dark theme toggle (light-first)

### Host Tools (`/manage-events`)
- 📉 Per-event analytics (views, capacity, revenue, attendance)
- ✉️ Invitations (send / list / revoke + invitee accept-decline)
- ✅ Check-in & attendance (token-based)
- 🤝 Co-host management

---

## Tech Stack

| Area | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, Server Actions, React Server Components) |
| Language | **TypeScript 5** |
| UI | **React 19**, **Tailwind CSS v4**, **shadcn/ui** (Radix primitives) |
| Charts | Bespoke lightweight SVG components (no charting dependency) |
| Forms & Validation | **react-hook-form**, **zod** |
| Motion | **framer-motion** |
| Notifications | **sonner** |
| Icons | **lucide-react** |
| Fonts | Sora · Onest · JetBrains Mono (dashboard) · Geist (public) via `next/font` |

---

## Project Structure

```
src/
├── app/
│   ├── (authentication)/      # login, register, forgot/reset password
│   ├── (commonLayout)/        # public site (home, events, profile, invite accept)
│   └── (dashboardLayout)/
│       ├── admin/dashboard/   # admin management pages
│       └── (commonDashboard)/ # my-events + host "manage-event" tools
├── components/
│   ├── ui/                    # shadcn/ui primitives
│   ├── dashboard/             # reusable dashboard primitives (StatCard, PageHeader, …)
│   ├── modules/               # feature components grouped by domain
│   └── shared/                # navbar, footer, table, cells, dialogs
├── services/                  # server actions per domain (auth, events, payment, …)
├── types/                     # shared TypeScript interfaces
├── lib/                       # utils, server-fetch, formatters, theme controller
└── zod/                       # validation schemas
docs/                          # per-feature dashboard documentation
plan.md                        # dashboard reconstruction plan & changelog
```

---

## Getting Started

### Prerequisites
- **Node.js 20+**
- A package manager (**pnpm** recommended; npm works too)
- A running instance of the **[Events & Activities backend](https://github.com/codeWith-Repon)** API

### 1. Clone & install

```bash
git clone https://github.com/codeWith-Repon/EventsActivities-frontend.git
cd EventsActivities-frontend
pnpm install      # or: npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```env
# Base URL of the backend REST API
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000/api/v1
```

### 3. Run the dev server

```bash
pnpm dev          # or: npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**.

> ℹ️ The frontend needs the backend running (default `http://localhost:5000`) for auth and data.

---

## Demo Accounts

The login screen includes **Quick demo login** buttons. Seed them in the backend with
`node prisma/seed-demo.js`, then sign in instantly:

| Role | Email | Password |
|---|---|---|
| User | `user@eventshub.test` | `Demo@1234` |
| Host | `host@eventshub.test` | `Demo@1234` |
| Admin | `admin@eventshub.test` | `Demo@1234` |

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Run the production build |
| `pnpm lint` | Lint with ESLint |

---

## Architecture Notes

- **Auth** — JWT access/refresh tokens stored as HTTP-only cookies; `lib/server-fetch.ts` forwards them on server-side requests, and `loginUser` sets them via Server Actions.
- **Data fetching** — pages are React Server Components that call typed **Server Actions** in `src/services/*`; lists/filters/pagination are driven entirely by URL query params.
- **Dashboard theming** — a token-scoped design system (`.aurora` / `.aurora-light` in `globals.css`) re-skins every dashboard page from one place; light is the default with an optional dark toggle. The public site is unaffected.
- **Reusable primitives** — `PageHeader`, `StatCard`, `StatusBadge`, `GlassCard`, `EmptyState`, `SelectFilter`, `ConfirmActionDialog`, and an enhanced `ManagementTable` (sortable + generic row actions) power all management pages.
- **Docs** — each dashboard feature has a write-up in [`docs/`](./docs); the overall plan and changelog live in [`plan.md`](./plan.md).

---

## Deployment

Optimized for **Vercel**. Set `NEXT_PUBLIC_BASE_API_URL` to your deployed backend URL in the project's environment variables, then deploy from the Git repository. Any Node-compatible host that supports Next.js 16 also works.

---

## License

This project is for educational and portfolio purposes.

<div align="center">

Built with Next.js · Made by [Repon](https://github.com/codeWith-Repon)

</div>
