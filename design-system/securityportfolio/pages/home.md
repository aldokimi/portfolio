# Portfolio Home — Security Engineer Theme (Page Override)

Overrides MASTER.md for this page.

## Theme: Security / Shield / Terminal
- Identity: Security Engineer (not generic portfolio)
- Style: Dark terminal, geometric, sharp borders
- Font: JetBrains Mono (mono terminal) + Inter (bold display)
- Colors: Deep navy `#030712`, bright green `#00e676`, cyan `#00e5ff`

## Component Specs (Applying ui-ux-pro-max MASTER patterns)

### Hero
- Large bold title with tight tracking (`-0.04em`)
- Sharp geometric label (`SECURITY ENGINEER`)
- Particle/network background animation
- Single orchestrated reveal animation

### Cards (Sharp geometric — override MASTER rounded card)
- `border: 2px solid` sharp borders (`border-radius: 2px`)
- No soft shadows; use subtle border highlights
- Sharp geometric corner accent on hover
- Card background: `#0d1a2b` (dark security card)

### Buttons
- Sharp geometric (`border-radius: 2px`)
- Primary: `border: 2px solid var(--accent)`, hover fills `var(--accent)`
- No rounded pill shapes

### Tags / Labels
- Sharp pill (`border-radius: 2px`)
- Mono font (`font-family: "JetBrains Mono"`)
- Small size (`11-13px`)

### Animations
- Single orchestrated hero entrance (`fade-in-up`)
- Scroll reveal (`ScrollAnimations` with `data-scroll-anim`)
- `prefers-reduced-motion`: disable all
- No scattered card hover animations

## Accessibility (From MASTER Checklist)
- [x] Contrast 4.5:1 (dark bg + bright green/accent)
- [x] No emoji icons (use geometric shapes / SVG)
- [x] Focus states visible (sharp outline or border color change)
- [x] `cursor-pointer` on clickable elements
- [x] Hover states `150-300ms`
- [x] `prefers-reduced-motion` respected
- [x] Responsive: mobile, tablet, desktop

## Anti-Patterns Avoided
- No warm cream + terracotta default
- No rounded SaaS card kit with identical shadows
- No ALL-CAPS eyebrow labels above headings
- No middle-dot meta strings (`·`)
- No single-word italic/bold accent tricks
- No decorative gradients without purpose
