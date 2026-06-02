# F03 — Admins Management

**Branch:** `feat/dashboard-admins` · **Status:** ✅ Done · **Route:** `/admin/dashboard/admins-management`

Lists administrator accounts and adds **role promote/demote** — the SUPER_ADMIN-only ability to change
any user's role (`USER` ⇄ `HOST` ⇄ `ADMIN`).

---

## What it does

- Reuses the F02 Aurora users table/filter (search, status, gender, block/unblock, delete, view), pinned to `role=ADMIN`.
- Adds a **Change role** row action — visible **only when the signed-in user is `SUPER_ADMIN`**, and never on
  your own account or other super admins (privilege-escalation guard). Opens a dialog to pick the new role.
- Redesigned page header with a live admin count chip; resilient `EmptyState`; loading skeleton.

---

## Endpoint used

| Method | Endpoint | Auth | Body |
|---|---|---|---|
| `PATCH` | `/users/:id/role` | SUPER_ADMIN | `{ role: 'USER' \| 'HOST' \| 'ADMIN' }` |

Promoting to `HOST` auto-creates a Host profile (backend behaviour). All listing/filtering reuses `GET /users`.

---

## Files

**Added**
- `src/components/dashboard/ChangeRoleDialog.tsx` — role picker dialog (reused anywhere role changes are needed)
- `src/app/(dashboardLayout)/admin/dashboard/admins-management/loading.tsx`
- `docs/dashboard-admins.md`

**Modified**
- `src/services/user/userManagements.ts` — added `updateUserRole(id, role)`
- `src/components/modules/User/UsersTable.tsx` — SUPER_ADMIN-gated "Change role" action (via `useUser()`)
- `src/app/(dashboardLayout)/admin/dashboard/admins-management/page.tsx` — `PageHeader` + glass table + count chip

---

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- The role action is gated client-side by `useUser()` for UX; the backend still enforces SUPER_ADMIN, so it's safe.
- Because `UsersTable` is shared, the Change-role action is now available on the Users and Hosts lists too (for super admins) — intentional and consistent.
- Fixed the old duplicated "Admins Management" title; the Hosts page is fully rebuilt in F04.
