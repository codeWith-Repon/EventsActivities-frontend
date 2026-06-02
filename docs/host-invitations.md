# F12 — Invitations (host)

**Branch:** `feat/host-invitations` · **Status:** ✅ Done
**Routes:** `/manage-event/[slug]/invitations` (host tab) · `/events/invite/accept?token=…` (invitee)

Hosts invite people by email and manage those invitations; invitees accept/decline via the emailed link.

## What it does
- **Invitations tab** — send an invite by email, and a list of all invitations with status badges and a
  **Revoke** action for pending ones. Sending returns the `inviteLink` (toasted when no email is configured).
- **Invite response page** — reads `?token=`, lets the invitee **Accept** (auto-approved) or **Decline**,
  and shows the result. Accepting requires being signed in.

## Endpoints used
| Method | Endpoint | Auth |
|---|---|---|
| `POST` | `/invitations/send` `{ eventId, email }` | host |
| `GET` | `/invitations/events/:eventId` | host |
| `PATCH` | `/invitations/revoke/:invitationId` | host |
| `POST` | `/invitations/accept/:token` | any |
| `POST` | `/invitations/decline/:token` | any |

## Files
**Added:** `src/services/invitation/invitation.service.ts`, `src/types/invitation.interface.ts`,
`InvitationsManager` + `InviteResponse` (`src/components/modules/ManageEvent/`),
`manage-event/[slug]/invitations/page.tsx`, `(commonLayout)/events/invite/accept/page.tsx`, `docs/host-invitations.md`.

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- The invitations tab resolves the event **id** from the slug (`getEvent`) since the send/list endpoints key on `eventId`.
- The accept/decline page lives under the public `(commonLayout)` so the emailed link works with the site chrome.
