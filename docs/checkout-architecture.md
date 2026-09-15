# Happy-Park Checkout Boundary

## Phase 2C

The Happy-Park browser is never authoritative for pricing.

The customer may select:

- visit date
- adults
- children
- admission package
- extras

The browser displays an estimated total for UX purposes.

Before checkout, `/api/bookings/prepare` receives the booking selections and performs server-side validation.

## Server responsibilities

The server verifies:

1. request shape
2. visit date
3. guest quantities
4. admission package identity
5. booking extra identities
6. duplicate extras
7. customer contact data
8. authoritative package prices
9. authoritative extra prices
10. final booking total

The server never accepts a customer-supplied final price.

## Currency

UI configuration currently expresses JMD in whole currency values.

Before persistence/payment, values are converted to integer minor units.

Example:

JMD 1,200.00

becomes:

120000

## Quote lifecycle

A prepared development quote includes:

- quote ID
- preparation reference
- verified total
- visit date
- package
- extras
- customer
- expiry time

Current quote lifetime:

15 minutes

## Current limitation

Database persistence is intentionally disabled until Happy-Park's PostgreSQL environment is selected and configured.

A preparation reference is therefore NOT yet a confirmed booking.

## Production transition

Once PostgreSQL is connected:

prepare request
→ validate availability
→ reserve capacity
→ create Draft/PendingPayment booking
→ persist price snapshots
→ create payment session
→ customer pays
→ payment webhook verifies payment
→ booking becomes Confirmed
→ admission passes generated
→ confirmation dispatched

A success URL alone must never mark a booking as paid or confirmed.
