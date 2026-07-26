# Design QA

**Source visual truth paths**

- Theory: `C:\Users\sridh\.codex\generated_images\019f9ea5-0307-7ab0-af05-27fb6494374d\call_JJ652d0I2vzBZ3fbqlW48cA1.png`
- Model: `C:\Users\sridh\.codex\generated_images\019f9ea5-0307-7ab0-af05-27fb6494374d\call_0UIusikvuqHtZmOs4TDzLEad.png`

**Implementation evidence**

- Theory screenshot: `C:\Users\sridh\Vibe Coding\joint-cognitive-systems\prototype\qa-theory.png`
- Model screenshot: `C:\Users\sridh\Vibe Coding\joint-cognitive-systems\prototype\qa-model.png`
- Theory comparison: `C:\Users\sridh\Vibe Coding\joint-cognitive-systems\prototype\qa-theory-comparison.png`
- Model comparison: `C:\Users\sridh\Vibe Coding\joint-cognitive-systems\prototype\qa-model-comparison.png`
- Local implementation: `http://localhost:4173/`

**Viewport and normalization**

- CSS viewport: 1440 x 1024 at deviceScaleFactor 1 for final Theory inspection and Model inspection.
- Source pixels: 1487 x 1058 for both generated references.
- Browser screenshots: 1425 x 1013 pixels after in-app browser viewport framing.
- Comparison boards normalize each source and implementation to 720 x 512, side by side on a 1440 x 548 board.
- States: Theory default with latency-mismatch journey stage active; Model default urban-mobility configuration; additional interactive states tested separately.

**Full-view comparison evidence**

- Both views preserve the approved two-tier navigation, Cream System palette, wide academic composition, mono figure labels, restrained teal accents, and explicit provenance treatment.
- Theory preserves the large research question, proposed-hypothesis note, phase diagram, adjustable model variables, approach-to-exclusion progression, and epistemic-status footer.
- Model preserves the four-stage cognitive workflow, independent autonomy allocation, layered governance band, control signature, threshold position, inference, and primary stress-test action.
- No visible raster imagery was required by the source. UI icons use Phosphor; data visualizations use Recharts rather than handcrafted SVG or CSS drawings.

**Focused region comparison evidence**

- Theory phase diagram: axes, boundary curve, example industries, interactive marker, region labels and limitation note were compared at full source resolution.
- Theory journey: six-stage sequence, active latency-mismatch state and model CTA were compared separately in the lower viewport.
- Model architecture: four autonomy controls, L-level and HITL/HOTL/HOOTL readings, governance band and right-side interpretation were compared at full source resolution.
- Model tooltip terminology, expanded 10-level continuum, scenario selection, governance toggles and stress-test result were checked through the browser DOM and direct interaction.

**Findings**

- No actionable P0, P1 or P2 differences remain.
- Typography: Archivo and JetBrains Mono match the source hierarchy, weight contrast and academic labeling. Wrapping remains faithful at the target viewport.
- Spacing and layout: the first pass exceeded the 1024px target by 77px on Theory and 14px on Model. Section padding, chart height and journey rhythm were tightened; final Theory document height is 1025px including browser rounding, and Model primary controls fit within the intended composition.
- Colors and tokens: shared Cream System values are used directly; teal is limited to active, interactive and epistemic-status cues.
- Image quality: no source photography or illustration was omitted. Library-rendered charts and icons remain crisp at deviceScaleFactor 1.
- Copy: the approved research question, conceptual-model caveat, taxonomy language, citations and attribution distinctions are present. Encoding artifacts from the initial patch pass were replaced with stable ASCII punctuation.

**Interaction verification**

- Theory and Model tab navigation: passed.
- Sources drawer open, source links visible, and drawer close: passed.
- Scenario selection changed to High-frequency finance: passed.
- Stress-test result updated to the expected latency-failure inference: passed.
- 10-level continuum expanded and Level 10 changed all runtime functions to HOOTL: passed.
- Control signature recomputed after autonomy changes: passed.
- Browser console warnings/errors checked on initial render: none observed.
- Production build: passed.
- Sites worker compatibility tests: 4/4 passed.

**Comparison history**

1. First pass: Theory and Model exceeded the reference viewport height; punctuation written through the Windows patch pipeline showed replacement characters.
2. Fixes: reduced lower-section padding and chart height, tightened the Theory journey, reduced Model vertical padding, replaced unstable punctuation, and added accessible focus styling and a close label for the source panel.
3. Post-fix evidence: final Theory screenshot and browser DOM confirm the 1440 x 1024 composition; final Model DOM interactions confirm all revised controls and copy. Side-by-side comparison boards show only P3-level micro-differences in chart annotation density.

**Follow-up polish**

- P3: the implementation uses a slightly lighter chart-annotation density than the generated mock, improving legibility at smaller widths.
- P3 test gap: a 390 x 844 responsive browser recapture was blocked by the local browser URL policy after desktop verification. Responsive breakpoints are implemented, but that secondary viewport was not visually certified in this pass.

**Implementation checklist**

- [x] Approved Theory visual recreated.
- [x] Approved Model visual recreated.
- [x] Core interactions implemented.
- [x] Sources and attribution implemented.
- [x] Desktop visual QA completed.
- [x] Production and Sites checks passed.

final result: passed
