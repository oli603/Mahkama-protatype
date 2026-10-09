# Mahkama client prototype plan

## Scope
Build a browser-ready, client-facing prototype for an Ethiopia-first legal marketplace. The first release is an interaction-rich demo using local realistic data and client-side state, not a production legal service. The user should be able to move from the home dashboard into guided case intake, browse many Ethiopian case types, see suggested verified lawyers, compare proposals, select a lawyer, and preview the downstream secure-workflow states (chat, documents, appointment, Chapa payment and review).

## Product choices
- Keep the prototype centered on the client. Lawyer tools are represented through profile and proposal information rather than built as a second dashboard.
- Treat matches as suggestions only. Use careful language such as “may fit” and “based on your answers”; never guarantee outcomes or provide legal advice.
- Use local Ethiopia-specific content: Addis Ababa as the initial location, Amharic/English language cues, ETB pricing, and case categories that are common in Ethiopia.
- Use local state for the demo so every key step is clickable without requiring a real account, payment or document upload. The production architecture can later connect these surfaces to the managed Server, Database, Authentication and Storage capabilities already enabled.

## Design direction
- **Design movement:** civic editorial / modern Ethiopian service design — a warm, high-trust interface that feels closer to a well-made public service desk than a generic SaaS dashboard.
- **Core principles:** reduce uncertainty; make expertise legible; keep the client in control; surface privacy and next steps at the moment they matter.
- **Color philosophy:** deep forest green signals grounded trust and is the signature brand color; warm parchment keeps the experience human and readable; terracotta provides a distinctly local, energetic action accent without feeling alarmist; muted gold marks progress and verification.
- **Layout paradigm:** a split workspace with a slim dark navigation rail and an airy paper-toned canvas. Home uses asymmetric editorial cards rather than a centered marketing grid; intake becomes a focused step-by-step workbench.
- **Signature elements:** the Mahkama “M.” arch mark; a compact “fit signal” pill on lawyer cards; dotted journey lines that show progress from case to resolution.
- **Interaction philosophy:** every action gives a clear next step and a reversible path back. Selected categories, filters and steps remain visible so the client never loses context.
- **Animation:** use short 160–220ms fades and small upward reveals for cards; active step indicators fill left-to-right; avoid looping motion and avoid decorative animation near high-stakes actions.
- **Typography system:** Plus Jakarta Sans for interface clarity and a serif display face for editorial headlines. Use strong 12–13px uppercase labels, 16px body copy, and 34–48px headlines with tight line height.
- **Brand essence:** “A calmer way for Ethiopian clients to find legal help.” Personality: grounded, clear, generous.
- **Brand voice:** direct and reassuring. Example lines: “Start with what happened.” and “You choose the professional. We make the next step clearer.”
- **Wordmark & logo:** a rounded arch “M.” glyph paired with the Mahkama wordmark; the arch suggests a doorway into help and echoes Ethiopian architectural forms without becoming ornamental.
- **Signature brand color:** forest green `#173F35`.

## Project structure
- `client/src/pages/Home.tsx` — all demo screens and local interaction state for the client journey.
- `client/src/App.tsx` — route shell and global providers.
- `client/src/index.css` — palette, type, responsive layout and custom component styling.
- `client/public/manus-routes.json` — declared page route manifest for the preview host.
- `plan.md` / `TODO.md` — decisions and deliverable acceptance criteria.
- `drizzle/` and `server/` — preserved managed infrastructure starter; future persistence and auth can be wired here without changing the client interaction model.

## Build workflow
1. Replace the starter example page with the client shell, home dashboard, intake, matches, case detail, profile and messages states.
2. Add realistic demo datasets for Ethiopian case categories, locations, languages, lawyers, proposals and active cases.
3. Add route metadata, app logo metadata and responsive styling.
4. Register host-managed TypeScript diagnostics, run `pnpm check` and `pnpm build`.
5. Start the Cloud dev server on the configured port, verify `/`, `/manus-routes.json` and `/api/health`, then commit the finished deliverable to `origin/main` so Manus records the checkpoint.
