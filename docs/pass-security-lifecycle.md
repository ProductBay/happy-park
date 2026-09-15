# Happy-Park Admission Pass Security Lifecycle

## Credential classes

### Admission credential

Format:

HP1.<random-secret>

Used only by the Happy-Park admission scanner.

The raw credential is never stored directly in the BookingPass row.

BookingPass stores:

- SHA-256 hash
- token version
- lifecycle status
- revocation metadata

A recoverable copy is stored separately using AES-256-GCM encryption.

### Customer pass-access credential

Format:

HPA1.<random-secret>

This is not an admission credential.

It provides controlled access to retrieve a confirmed customer's digital passes.

Only its SHA-256 hash is persisted.

## Reissue lifecycle

When a pass is reissued:

1. Staff supplies a required reason.
2. Current pass and booking are validated.
3. Used, cancelled or expired passes are rejected.
4. Booking must remain eligible and paid.
5. A brand-new cryptographically random HP1 credential is generated.
6. SHA-256 hash replaces the previous scanner hash.
7. AES-256-GCM encrypted credential replaces the previous recoverable credential.
8. tokenVersion increments.
9. Pass returns to active status.
10. A BookingPassSecurityEvent records the operation.

The previous QR credential is immediately invalid because its hash no longer exists as the pass verification hash.

## Revocation lifecycle

A pass may be revoked without issuing a replacement.

The pass becomes:

revoked

The revocation reason, timestamp and security audit event are persisted.

The existing QR credential will be rejected by admission policy.

## Audit

BookingPassSecurityEvent stores:

- action
- pass
- booking
- previous token version
- new token version
- reason
- staff identity when available
- non-sensitive metadata
- timestamp

Raw QR credentials and raw customer access tokens must never appear in audit metadata or application logs.

## Staff authorization

The current APIs establish the transaction and validation boundary.

Before production activation, staff authentication and permissions must be enforced so only approved Happy-Park roles can revoke or reissue passes.
