# HER Admin architecture

## Purpose

`/her/admin` is the dedicated operational surface for HER Salon & Wellness. It is intentionally separate from the Happy-Park Business OS at `/admin`. Phase H1 is an interactive front-end preview using typed static data and ephemeral React state.

## Route ownership

- `/admin` and its descendants belong to Happy-Park operations.
- `/her/admin` belongs to HER operations.
- Public HER discovery and booking previews remain under `/her`, `/her/services`, and `/her/book`.

The H1 root shell suppresses customer-facing chrome only for the `/her/admin` route family. This does not grant authorization; it creates the correct product boundary for the preview.

## Future roles

- `HER_ADMIN`: access only to authorized HER appointments, clients, consultations, services, schedules, and reports.
- `HAPPY_PARK_ADMIN`: access only to authorized Happy-Park operational resources.
- `PLATFORM_ADMIN`: potential future role for explicitly authorized cross-business oversight.

Role membership must never be inferred solely from access to another business workspace.

## Data boundaries

HER operational data must use business-scoped authorization and storage boundaries. Happy-Park administrators must not automatically receive HER client or operational access, and HER administrators must not receive Happy-Park operational access. Cross-business reporting, if introduced, requires explicit platform authorization and auditable purpose.

## Sensitive-information considerations

HER is a salon and wellness operation, not a healthcare-record system. Production collection should be minimized to appointment, contact, preference, and appropriate consultation information. Diagnoses, medications, clinical histories, prescriptions, and medical documents are outside this product boundary. Access to customer-selected hair/scalp concerns should be restricted, logged, retained only as necessary, and protected in transit and at rest.

## Production wiring requirements

Production delivery requires authenticated identities, business-scoped RBAC, server-side authorization on every resource, persistent appointment/client/consultation models, concurrency-safe availability, audit logs, retention and deletion policy, notification consent, secure WhatsApp/email/SMS providers, payment/deposit rules, monitoring, backup/recovery, and security/privacy review.

## H1 limitations

H1 has no production authentication, authorization, database writes, live availability, payments, notifications, automatic WhatsApp sending, or cross-route customer-booking synchronization. All interactive changes reset with the component lifecycle.
