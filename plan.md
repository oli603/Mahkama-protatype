# Mahkama implementation plan

## Product approach

Build a browser-ready, three-role prototype for an Ethiopia-first legal marketplace. The client experience remains the default: a person describes a legal problem in plain language, browses common Ethiopian case types, sees suggested verified lawyers, compares proposals and previews the next steps. The lawyer role makes the marketplace loop visible through a professional workspace for leads, proposals, verification status, appointments and earnings. The admin role provides the trust and operations layer for verification, safety, support, moderation and payment oversight.

This release is an interaction-rich prototype using realistic local demo data and client-side state. It does not claim to be a law firm, give legal advice, guarantee outcomes or replace Ethiopian legal review. Production persistence and permissions are intentionally named as next integrations.

## Design direction

- **Design movement:** civic editorial interface with Addis-inspired warmth, quiet confidence and a premium service-desk feel.
- **Core principles:** calm over alarm, progressive disclosure, trust made visible, and local context without visual clutter.
- **Color philosophy:** deep forest green communicates grounded guidance; cream and parchment surfaces keep legal work approachable; terracotta and brass accents add human warmth; muted blue/rose signals distinguish operational states.
- **Layout paradigm:** a persistent workspace rail paired with editorial panels, asymmetric dashboard columns and compact review cards rather than a generic centered grid.
- **Signature elements:** the M. seal, arch/orbit hero illustration, status pills and privacy notes that recur at every sensitive transition.
- **Interaction philosophy:** every action explains the next step and what remains under the user’s control; selection and review decisions are suggestions or recorded states, never guarantees.
- **Animation:** use short, low-motion page-enter transitions and smooth scrolling; preserve readable focus states and avoid decorative motion during sensitive forms.
- **Typography:** DM Serif Display for human, editorial headings; Inter for dense controls, labels, metrics and legal-operational metadata.
- **Brand essence:** Mahkama is a clearer first step for Ethiopian clients and professionals navigating legal help; personality is calm, humane and accountable.
- **Brand voice:** plain, reassuring and specific. Example lines: “Start with what happened.” and “Trust is a workflow.”
- **Wordmark/mark:** a circular M. seal paired with a small Ethiopian-script support cue; the mark appears as a recurring trust stamp rather than a generic app icon.
- **Signature brand color:** Mahkama forest `#173f35`.

## Implementation

- `client/src/pages/Home.tsx` contains the interactive client dashboard, intake flow, case matches, case details, messages, profile, lawyer workspace and admin console.
- The client flow covers eighteen Ethiopia-focused legal categories, Addis locations, English/Amharic cues, plain-language intake, matching suggestions, proposal comparison, secure chat/document/appointment/Chapa/review states and trust messaging.
- `/lawyer` opens the professional workspace with privacy-safe leads, proposal drafts, verification display, clients, response rate, ETB earnings, payout overview and calendar.
- `/admin` opens the operations console with verification queue, protected document-preview states, approve/reject/correction actions, audit messaging, scoped support/dispute items, safety/moderation reports and Chapa reconciliation states.
- `client/src/index.css` owns the responsive civic-editorial system and mobile breakpoints.
- `client/public/manus-routes.json` declares `/`, `/intake`, `/lawyers`, `/case/:id`, `/messages`, `/profile`, `/lawyer` and `/admin`.
- `client/src/App.tsx` maps those routes to the prototype shell.
- `plan.md` and `TODO.md` preserve scope and acceptance clauses.

## Production boundary

The UI is ready for the next backend pass, but live production still needs Authentication, Database, Storage, RBAC, OTP, lawyer license/Bar document storage, admin audit events, real matching rules, proposals, private chat, Chapa webhooks/reconciliation, payout release rules, appointments, reviews, moderation, dispute escalation, safety handling, full Amharic localization and security/accessibility QA.
