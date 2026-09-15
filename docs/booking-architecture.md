# Happy-Park Booking Architecture

## Phase 2B

The Happy-Park visit booking domain is designed around:

- configurable admission packages
- configurable booking extras
- visit-date capacity
- immutable pricing snapshots
- provider-neutral payment state
- QR admission passes
- auditable check-in scans
- booking lifecycle events

## Booking lifecycle

Draft
→ Pending Payment
→ Confirmed
→ Partially Checked In
→ Checked In
→ Completed

Alternative terminal states:

- Cancelled
- Expired
- Refunded

## Historical pricing

A booking must never depend on the current price of an admission package.

When checkout begins, Happy-Park snapshots:

- package name
- package description
- adult unit price
- child unit price
- guest quantities
- subtotal
- selected extras
- extra unit prices
- currency

If an administrator changes a package tomorrow, yesterday's booking remains financially correct.

## Money

Database monetary fields use integer minor units.

Examples:

JMD $1,200.00 = 120000 minor units

USD $19.99 = 1999 minor units

This avoids floating-point money calculations and keeps the platform ready for multiple currencies.

## QR security

QR codes must contain only an opaque token or opaque pass reference.

QR codes must not contain:

- customer names
- email addresses
- phone numbers
- prices
- booking details
- sensitive customer information

The server resolves the token and determines whether the pass is:

- valid
- already used
- revoked
- cancelled
- expired
- for the correct visit date

## Check-in auditing

Every scan attempt creates a CheckIn record.

Do not simply overwrite BookingPass.status without recording the scan event.

This gives Happy-Park:

- admission history
- duplicate-scan detection
- staff auditability
- device/gate history
- dispute evidence
- operational analytics

## Capacity

VisitDayCapacity provides date-level controls.

Management will eventually be able to:

- open a date
- limit a date
- mark it sold out
- close a date
- set maximum guest capacity
- set booking cutoff times
- publish a customer-facing notice

## Payment architecture

PaymentStatus is intentionally provider-independent.

No payment provider is embedded in the booking model.

A separate Payment domain will be connected in Phase 2C.

## Important

No database migration was executed during Phase 2B.

The real PostgreSQL host must be selected and configured before Happy-Park database deployment.
