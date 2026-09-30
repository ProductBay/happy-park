# HER client account architecture

`/her/account` is a mobile-first client preview for one synthetic HER customer. It is intentionally separate from `/her/admin` and the broader `/account` experience.

## Ownership and privacy

The client UI consumes a narrowed appointment projection containing service, schedule, price, lifecycle state, and client-safe timer fields. It excludes customer lists, contact details, notes, reports, revenue, operational variance, schedule pressure, and staff controls. H1.1 timestamp helpers are shared; admin state is not controlled by the client.

## Self-service preview

Eligible requested or confirmed appointments can follow an in-memory reschedule flow using clearly labelled demo availability between 8:00 AM and 8:00 PM. Rebooking hands the current service identifier to the existing `/her/book` journey for review, date, time, and confirmation. Cancellation is presented only as a contact/request action until policy exists.

## Future production requirements

Production delivery requires authenticated roles (`HER_CLIENT`, `HER_ADMIN`, `HAPPY_PARK_ADMIN`, `PLATFORM_ADMIN`), per-customer authorization, persisted appointments and service sessions, audited mutations, live availability, cancellation/refund policy, notification consent and delivery, and formal privacy/retention controls. `HER_CLIENT` must be restricted to their own appointments.

## Demo limitations

There is no authentication, database persistence, payment processing, production availability, notification delivery, or local-storage PII. Refreshing resets the preview. Timer information is approximate customer guidance, not an operational commitment or medical recommendation.
