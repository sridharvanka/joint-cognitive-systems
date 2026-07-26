# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved product direction

- Use the shared Cream System visual identity.
- The project is an academic interactive investigation titled ?The Human Exclusion Threshold.?
- Keep Theory and Model as separate route-style tabs.
- Theory frames a proposed threshold and the journey toward operational exclusion.
- Model allocates autonomy independently across Acquire, Analyze, Decide, and Act.
- Treat HITL/HOTL/HOOTL as runtime relationships; HOVTL/SITL as governance layers; RLHF as an offline learning loop.
- Clearly distinguish established frameworks, illustrative modeling, and Sridhar Vanka?s proposed synthesis.
