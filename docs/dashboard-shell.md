# F00 — Dashboard Design System & Shell

**Branch:** `feat/dashboard-shell` · **Status:** ✅ Done
**Aesthetic:** Aurora Glass — dark-first, violet→cyan gradient accents, glassmorphism panels, soft glows.

This feature rebuilds the **admin dashboard chrome** and ships the reusable design system that every
later dashboard feature (F01–F14) is built on. It does **not** touch the public landing page.

---

## What it does

- Introduces a self-contained **Aurora Glass** theme, scoped so it only affects the dashboard.
- Replaces the old white sidebar/topbar with glass panels, a gradient brand mark, gradient active states, and a user card.
- Adds a **light/dark toggle** for the dashboard (dark by default), persisted to `localStorage`.
- Ships reusable primitives — `GlassCard`, `PageHeader`, `StatCard`, `EmptyState`, `StatusBadge` — so all pages feel like one product.
- Fixes a leftover **"PH Healthcare"** label in the mobile sidebar and adds the missing **Overview** nav item.

---

## How the theming works

The dashboard root (`#aurora-root`, in `admin/layout.tsx`) always carries `.aurora`, plus either
`.dark` (default) or `.aurora-light`. All Aurora design tokens are defined in `globals.css` **scoped to
`.aurora`**, so they override the shadcn token names (`--background`, `--card`, `--primary`, …) only
inside the dashboard. Everything outside `.aurora` (the public site) is untouched.

- **Token source:** `src/app/globals.css` — `.aurora { … }` (dark) and `.aurora.aurora-light { … }` (light).
- **Theme controller:** `src/lib/aurora-theme.ts` — `applyTheme`, `setTheme`, `currentTheme`, `subscribe`.
- **No-flash init:** `src/components/dashboard/AuroraThemeScript.tsx` applies the stored theme on mount.
- **Toggle:** `src/components/dashboard/ThemeToggle.tsx` (in the topbar) flips `.dark` ⇄ `.aurora-light`,
  persists to `localStorage["eh-dash-theme"]`, and stays in sync via `useSyncExternalStore`.

### Fonts
Loaded in `src/lib/dashboard-fonts.ts` via `next/font/google` and applied as CSS variables on the root:
- **Sora** → `--font-display` (headings, big numbers)
- **Onest** → `--font-sans` (body / UI)
- **JetBrains Mono** → `--font-mono` (labels, numerics)

---

## Utilities added (in `globals.css`)

| Class | Purpose |
|---|---|
| `.aurora-canvas` | Atmospheric gradient-mesh page background |
| `.glass` / `.glass-strong` | Glassmorphism panels (blur + translucency + hairline) |
| `.glow-violet` | Violet glow ring shadow |
| `.text-gradient-aurora` | Violet→cyan gradient text |
| `.bg-gradient-aurora` | Violet→fuchsia gradient fill |
| `.aurora-rise` | Staggered fade-up entrance animation |

---

## Reusable primitives (`src/components/dashboard/`)

| Component | Props (key) | Use |
|---|---|---|
| `GlassCard` | `strong`, `glow`, `className` | Base panel for any card/surface |
| `PageHeader` | `kicker`, `title`, `description`, `actions` | Top of every dashboard page |
| `StatCard` | `label`, `value`, `icon`, `accent`, `delta`, `hint` | KPI tiles (F01, F09, F11) |
| `EmptyState` | `icon`, `title`, `description`, `action` | Empty lists/tables |
| `StatusBadge` | `status`, `tone?` | Colored pill for any backend enum (Join/Payment/Event/User/Report/Invitation status, roles) |

`StatusBadge` auto-maps every backend status value to a tone, so list pages can render
`<StatusBadge status={row.joinStatus} />` without per-page color logic.

---

## Files

**Added**
- `src/lib/aurora-theme.ts`
- `src/lib/dashboard-fonts.ts`
- `src/components/dashboard/AuroraThemeScript.tsx`
- `src/components/dashboard/ThemeToggle.tsx`
- `src/components/dashboard/GlassCard.tsx`
- `src/components/dashboard/PageHeader.tsx`
- `src/components/dashboard/StatCard.tsx`
- `src/components/dashboard/EmptyState.tsx`
- `src/components/dashboard/StatusBadge.tsx`
- `docs/dashboard-shell.md`

**Modified**
- `src/app/globals.css` — Aurora token blocks + utilities (+ `--font-display` in `@theme`)
- `src/app/(dashboardLayout)/admin/layout.tsx` — Aurora root, fonts, background, theme init
- `src/components/modules/Dashboard/DashboardSidebarContent.tsx` — glass sidebar
- `src/components/modules/Dashboard/DashboardMobileSidebar.tsx` — glass + brand fix
- `src/components/modules/Dashboard/DashboardNavbarContent.tsx` — glass topbar + theme toggle
- `src/lib/navItem.config.ts` — added **Overview** nav item

---

## How to use (for later features)

```tsx
import PageHeader from '@/components/dashboard/PageHeader';
import StatCard from '@/components/dashboard/StatCard';
import GlassCard from '@/components/dashboard/GlassCard';
import StatusBadge from '@/components/dashboard/StatusBadge';
import { Users } from 'lucide-react';

export default function Page() {
  return (
    <div className='space-y-6'>
      <PageHeader kicker='Users' title='User management' description='Manage member accounts.' />
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard label='Total users' value='1,284' icon={Users} accent='violet' delta={12} />
      </div>
      <GlassCard className='p-4'>{/* table … */}</GlassCard>
    </div>
  );
}
```

---

## Verification
- `tsc --noEmit` — clean
- `eslint` (changed files) — clean
- Production build via Turbopack is constrained by this machine's memory (page-file) limit — unrelated to these changes.

## Notes / follow-ups
- Existing page bodies (Overview, Users, Hosts, Admins) still use their old styling; they render inside the
  new shell and are **redesigned in F01–F05**.
- The topbar **search** and **notifications bell** are placeholders — notifications are wired in **F10**.
- `main` is missing the `meta` service and chart components present on `dev`; **F01/F05/F09** will port or
  rebuild those when reached.
