# Happy-Park Admission & QR Architecture

## Phase 2D

Happy-Park admission credentials are designed as secure opaque credentials.

A QR code MUST NOT contain:

- Customer name
- Customer email
- Customer phone
- Guest age
- Booking value
- Payment information
- Internal database IDs

The QR contains only a high-entropy credential.

Example shape:

HP1.<opaque random value>

## Stored credential

The raw QR credential is not stored in the Happy-Park database.

The database stores:

- passNumber
- qrTokenHash
- tokenVersion
- BookingPass status
- booking relation
- guest relation/data
- visit date
- admission audit information

The credential is hashed using SHA-256 before lookup/storage.

## Check-in rules

A pass may be accepted only when all applicable conditions pass:

1. Credential format is valid.
2. Credential hash resolves to a BookingPass.
3. Booking is Confirmed.
4. Payment state permits admission.
5. Pass is Active.
6. Pass is valid for the applicable visit date.
7. Pass has not already been used.
8. Pass has not been revoked, cancelled or expired.

## Duplicate scans

The final check-in transaction must atomically:

1. Find the pass.
2. Verify its state.
3. Transition Active -> Used.
4. Record used/check-in time.
5. Create a CheckIn audit event.
6. Recalculate booking attendance state where required.

A second scan must not admit the guest again.

It should create or return an AlreadyUsed outcome.

## Pass issuance

Passes are not issued merely because a customer reaches a checkout or success page.

They are issued only after a trusted server-side payment confirmation or another authorized admission workflow.

## Current development state

HAPPY_PARK_DB_ENABLED remains false.

Phase 2D-A establishes:

- secure credential generation
- credential hashing
- pass-number generation
- validation
- admission service boundary
- scan API boundary

Phase 2D-B will implement transactional database-backed issuance and check-in.
