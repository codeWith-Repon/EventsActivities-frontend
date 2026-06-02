# F02 — Users Management

**Branch:** `feat/dashboard-users` · **Status:** ✅ Done · **Route:** `/admin/dashboard/users-management`

Admin screen to browse, filter, inspect, block/unblock, and delete member accounts — redesigned in the
Aurora Glass style and wired to the real `status` field (the old UI only knew `isDeleted`).

---

## What it does

- **List** end-users (role = USER by default) with sortable columns: User, Role, Status, Contact, Gender, Joined.
- **Search** by name / email / contact (debounced) + **filter** by Status (Active / Inactive / Blocked) and Gender.
- **View** a full profile in a glass dialog.
- **Block / Unblock** — `PATCH /users/:id/status` (`BLOCKED` ⇄ `ACTIVE`) with a confirm dialog. A blocked user can't sign in.
- **Delete** — `DELETE /users/:id` with a destructive confirm.
- Pagination + per-page size via the shared control; resilient `EmptyState` if the API is down.

---

## Endpoints used

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/users?page&limit&sortBy&sortOrder&searchTerm&status&role&gender` | list |
| `PATCH` | `/users/:id/status` | block (`BLOCKED`) / unblock (`ACTIVE`) |
| `DELETE` | `/users/:id` | delete |

All filters/sorting/pagination are driven by URL query params, so the server component re-fetches on change.

---

## Reusable pieces added (used by F03–F06 too)

- **`SelectFilter`** (`src/components/dashboard/`) — URL-param dropdown filter (status, gender, role, payment status, etc.).
- **`ConfirmActionDialog`** (`src/components/dashboard/`) — generic confirm (block, refund, verify, force-cancel…), violet or destructive.
- **`ManagementTable`** enhanced — now glass-styled with a generic **`actions`** prop
  (`RowAction<T>[]`: label, icon, onClick, variant, `show(row)`), rendered between Edit and Delete.
  Existing `onView`/`onEdit`/`onDelete` still work, so other pages are unaffected.

---

## Files

**Added**
- `src/components/dashboard/SelectFilter.tsx`
- `src/components/dashboard/ConfirmActionDialog.tsx`
- `src/app/(dashboardLayout)/admin/dashboard/users-management/loading.tsx`
- `docs/dashboard-users.md`

**Modified**
- `src/services/user/userManagements.ts` — added `updateUserStatus(id, status)`
- `src/components/shared/ManagementTable.tsx` — glass styling + `actions` prop
- `src/components/modules/User/UsersColumn.tsx` — `StatusBadge` for role + status
- `src/components/modules/User/UsersFilter.tsx` — search + status + gender filters
- `src/components/modules/User/UsersTable.tsx` — block/unblock + delete + view
- `src/components/modules/User/UserViewDialog.tsx` — Aurora glass redesign
- `src/app/(dashboardLayout)/admin/dashboard/users-management/page.tsx` — `PageHeader` + total chip + glass table

---

## Verification
- `tsc --noEmit` — clean · `eslint` — clean
- Endpoints already existed on `main`; only `updateUserStatus` was added.

## Notes
- The page pins `role=USER` (admins/hosts have dedicated pages F03/F04), so a role filter is intentionally omitted here.
- `IUserInfo.status` is the source of truth for the Status column/badge (replacing the old `isDeleted` boolean display).
