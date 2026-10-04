# Brand Guidelines v1.1 — SecurityPortfolio (Hybrid Redesign)

> **v1.1 update:** The site adopts a hybrid direction — the dark navy/security-green identity stays, but shape language opens up (rounded cards/nav), a new ambient glow/glass surface system is added, layout widens, and interactive motion gains a springy curve. See `design-plan.md` for the full rationale. Sections below are updated in place; anything not called out as changed still applies as written.

## Quick Reference
- **Primary Color:** `#030712` (near-black navy)
- **Secondary Color:** `#1e2a3a` (sharp border)
- **Accent Color:** `#00e676` (security green)
- **Secondary Accent:** `#00e5ff` (cyan data)
- **Primary Font (Display):** Archivo (bold, tight tracking)
- **Body Font:** Space Grotesk (clean, spacious)
- **Mono Font:** JetBrains Mono (terminal/code labels)
- **Voice:** Precise, authoritative, direct — no fluff, no marketing hype

## 1. Color Palette

### Primary Colors
| Name | Hex | RGB | Usage |
| Primary Dark | `#030712` | rgb(3,7,18) | Background, deep terminal dark |
| Primary Light | `#f8fafc` | rgb(248,250,252) | Light mode background |
| Accent Green | `#00e676` | rgb(0,230,118) | CTAs, active indicators, verified badges |
| Accent Cyan | `#00e5ff` | rgb(0,229,255) | Data links, secondary highlights |

### Neutral Palette
| Name | Hex | RGB | Usage |
| Background | `#030712` | rgb(3,7,18) | Page background (default dark) |
| Surface | `#0a1220` | rgb(10,18,32) | Card surfaces, header background |
| Card | `#0d1a2b` | rgb(13,26,43) | Component cards |
| Text Primary | `#f0f4f8` | rgb(240,244,248) | Main body text |
| Text Secondary | `#8aa0b0` | rgb(138,160,176) | Muted captions, meta info |
| Border | `#1e2a3a` | rgb(30,42,58) | Sharp geometric borders |

### Glow / Glass Surfaces (v1.1 — ambient effects only)
| Name | Value | Usage |
| Glow Green | `rgba(0, 230, 118, 0.12)` | Ambient hero radial glow |
| Glow Cyan | `rgba(0, 229, 255, 0.08)` | Secondary glow tint |
| Glass Surface | `rgba(13, 26, 43, 0.55)` + `backdrop-filter: blur(16px) saturate(1.4)` | Floating nav, colophon card |
| Glass Border | `rgba(0, 230, 118, 0.15)` | Hairline edge on glass surfaces |

**Rule:** full-saturation Accent Green/Cyan are reserved for text, buttons, borders, and active states. Glow/Glass tokens are for ambient backgrounds only (hero glow, nav/colophon blur, soft shadows) — never for text or interactive states.

### Accessibility
- Dark mode: text/background = ~16:1 (exceeds 4.5:1)
- Light mode: `#0a0f1a` on `#f8fafc` = ~15:1
- All interactive elements have visible focus outlines (`outline: 2px solid #00e676`)
- `prefers-reduced-motion` fully respected

## 2. Typography

### Font Stack
```css
--font-display: 'Archivo', 'Helvetica Neue', system-ui, sans-serif;
--font-body: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Type Scale
| Element | Font | Weight | Size (Desktop / Mobile) | Line Height | Tracking |
| H1 Hero | Archivo | 700–800 | 96px / 56px | 1.05 | `-0.05em` |
| H2 Section | Archivo | 600–700 | 42px / 28px | 1.1 | `-0.03em` |
| H3 Card Title | Archivo | 600 | 24px / 20px | 1.2 | `-0.02em` |
| Body | Space Grotesk | 400 | 17px / 16px | 1.7 | `0` |
| Small / Captions | Space Grotesk | 400 | 14px / 14px | 1.5 | `0.01em` |
| Mono Label | JetBrains Mono | 500 | 11px | 1.3 | `0.15em` uppercase |

### Usage Rules
- Use `Archivo` only for headings and major labels.
- Never mix `Archivo` and `Space Grotesk` in the same text block.
- Mono font is reserved for labels (`SECURITY ENGINEER`, tags, meta info) — never for body text.
- All uppercase text must be in mono font; never in display font.

## 3. Voice & Tone

### Brand Personality
- **Precise**: Every word earns its place. No filler.
- **Authoritative**: Confident without arrogance. Technical depth without showing off.
- **Direct**: Active voice, sentence case, no exclamation points in professional copy.

### Voice Chart
| Trait | We Are | We Are Not |
| Precise | Sharp, minimal, no decorative labels | Vague, flowery, or overly casual |
| Authoritative | Deep technical expertise shown through work | Bragging, hype, or unverified claims |
| Direct | Plain verbs, active voice, sentence case | Corporate jargon, passive voice, all-caps labels |

### Tone by Context
| Context | Tone | Example |
| Hero / Bio | Direct, brief, confident | "Security Engineer with deep expertise in infrastructure and cloud-native systems." |
| Project Cards | Technical, concise | "Scalable automation pipeline for multi-region deployment." |
| Skills / Tags | Precise, labeled | `INFRASTRUCTURE`, `SECURITY`, `GOLANG`, `PYTHON` |
| Contact / CTA | Clear invitation | "Open to consulting, coaching, and platform engineering work." |
| Error Messages | Direction + fix (not apology) | "No connection. Check your network and retry." |

### Prohibited Terms
- "Leverage" (use "use" or "build with")
- "Synergy" / "synergistic"
- "Innovative" (let the work speak)
- "Passionate" (show depth instead)
- Any emoji in UI (use geometric shapes: squares, lines, dots)
- "World-class", "best-in-class", "cutting-edge"

## 4. Visual Identity

### Logo / Mark Usage
- **Primary Mark**: Sharp geometric square (`2px` border `#00e676` rotated 45°) — represents security / verification.
- **Wordmark**: `~/portfolio` in `JetBrains Mono`, left-aligned, green accent.
- **Clear Space**: 2× the height of the geometric square on all sides.
- **Minimum Size**: 24px for the square mark, 80px for full logo with text.

### Don'ts
- Don't rotate the geometric square beyond 45°.
- Don't change the square's border color outside `#00e676` or `#00e5ff`.
- Don't exceed 12px radius on cards/buttons/tags, and don't round the sharp geometric accent marks/logo mark themselves (v1.1: rounding is allowed up to 12px — see Cards/Buttons/Tags above — but stays short of a full pill outside the nav/colophon glass surfaces).
- Don't use decorative gradients without functional purpose — the only sanctioned gradients are the defined Glow Green/Glow Cyan ambient tokens (hero glow, glass surfaces); never add gradients elsewhere.
- Don't place text on busy or low-contrast backgrounds.

## 5. Component Rules

### Cards (v1.1 — rounded)
- Border: `border: 2px solid var(--border)`, `border-radius: 10px` (was 2px max — superseded by `design-plan.md` v2 shape language).
- Background: `var(--card)` (`#0d1a2b` in dark, `#FFFFFF` in light).
- No heavy drop shadows; use border highlights (`border-[var(--accent)]` for active/highlighted).
- Corner geometric accent on hover (`w-6 h-6` border-top-right) — kept as a detail even though the card itself is now rounded.

### Buttons (v1.1 — rounded)
- `border-radius: 10px` (was 2px — superseded).
- Primary: `border: 2px solid var(--accent)`, fill on hover (`background: var(--accent)`, `color: #030712`).
- The nav and colophon card go further and use fully rounded glass pill shapes (see Navigation below); standard buttons elsewhere use the 10px radius, not a full pill.

### Tags / Labels
- `border-radius: 8px` (was 2px — superseded).
- Font: `JetBrains Mono`, 11px, uppercase, `tracking: 0.15em`.
- Color: `var(--accent)` for active/highlight; `var(--fg)` for standard.
- Background: `var(--highlight)` (`rgba(0, 230, 118, 0.08)`).

### Navigation (v1.1 — new)
- Floating centered glass pill, detached from the viewport edges, using the Glass Surface/Glass Border tokens above.
- Active route: sliding highlight behind the link, animated with the springy curve `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (see Motion below), not just an underline.
- Theme toggle keeps its sharp geometric icon mark, sitting inside the rounded pill.

### Colophon Card (v1.1 — new)
- Small floating glass card, bottom-left on the homepage, listing the real build stack (Next.js 16, React 19, Cloudflare Workers, GSAP, Lenis, Tailwind).
- Same Glass Surface/Glass Border treatment as the nav.
- Collapsible/hidden on narrow mobile viewports.

### Motion (v1.1 — new)
- Scroll reveals stay calm: GSAP `power2.out`, one orchestrated fade per section — unchanged from v1.
- Interactive elements (nav tab-slide, button/link hovers, theme toggle) use the springy curve `cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
- `prefers-reduced-motion` disables hero glow drift and bounce overshoot; interactions still transition, just linearly.

### Section Dividers
- Thin horizontal line (`height: 2px`), gradient `transparent → var(--accent) → transparent`, opacity `0.4`.
- No decorative illustrations or gradients as section separators.

## 6. Imagery & Patterns

### Photography / Visual Style
- Not applicable (no photography used; geometric patterns only).
- Grid background pattern: `48px` cells, `1px` lines (`#1e2a3a`), opacity `0.15` — used in non-hero sections.
- Hero background (v1.1): ambient radial glow using Glow Green/Glow Cyan, slow drift, replaces the old particle-network canvas. `prefers-reduced-motion` keeps the glow but disables drift.
- No stock imagery, no decorative illustrations outside geometric patterns and the defined glow effect.

### Icons / Symbols
- Use geometric shapes only: squares, lines, dots, triangles.
- Size: `24px` base grid for icons.
- Color: `var(--accent)` for active/state indicators; `var(--border)` for structural lines.
- No emoji, no decorative icons without functional purpose.

## 7. Accessibility & Technical

- Contrast: 4.5:1 minimum (exceeds with current palette).
- Focus: sharp `outline: 2px solid var(--accent)` on all interactive elements.
- Motion: `prefers-reduced-motion` disables all animations; no layout-shifting transforms.
- Responsive: 375px, 768px, 1024px, 1440px breakpoints.
- No horizontal scroll. Section containers use `max-w-7xl` (~1400px, widened from `max-w-5xl` in v1.1) for project grids/hero; body text columns inside that container stay narrower (≤70ch) for readability.
- All clickable elements: `cursor: pointer`.
