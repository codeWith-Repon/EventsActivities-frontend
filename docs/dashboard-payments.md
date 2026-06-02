# F07 — Payments Management

**Branch:** `feat/dashboard-payments` · **Status:** ✅ Done · **Route:** `/admin/dashboard/payments-management`

New admin finance screen: review all transactions and issue refunds.

## What it does
- Quick stats (transactions, collected on page, refunded on page).
- Table: Transaction id, Payer, Event, Amount (৳), Status, Date.
- **Filter** by payment status; pagination.
- **Refund** row action → `PATCH /payment/:id/refund`, shown only for `PAID` payments, with a destructive
  confirm. Backend sets the payment `REFUNDED` and the participant `CANCELLED`.
- New **Payments** sidebar item (under a "Finance" section).

## Endpoints used
| Method | Endpoint | Auth |
|---|---|---|
| `GET` | `/payment?paymentStatus&eventId&userId&page&limit` | ADMIN+ |
| `PATCH` | `/payment/:paymentId/refund` | ADMIN+ |

## Files
**Added:** `src/types/payment.interface.ts`; `PaymentsColumn/Filter/Table` (`src/components/modules/payment/`); the page + `loading.tsx`; `docs/dashboard-payments.md`.
**Modified:** `src/services/payment/payment.service.ts` (`getPayments`, `refundPayment`); `src/lib/navItem.config.ts` (Finance → Payments).

## Verification
- `tsc --noEmit` — clean · `eslint` — clean

## Notes
- New components live in the existing lowercase `payment/` module dir (avoids a Windows case clash with the public payment pages).
- "Collected"/"Refunded" stat cards summarise the **current page** (the list endpoint returns no aggregate totals); platform-wide revenue is F09.
