# Portfolio Design Plan — Security Engineer / Shield Theme (v2: Hybrid Redesign)

## Subject
Personal portfolio for Mohammed Al-Dokimi — SECURITY ENGINEER. Audience: recruiters, clients, peers in cybersecurity / infrastructure. Job: show authority, precision, and deep technical expertise.

## v2 Direction: Hybrid
Keep the dark navy/security-green brand identity. Graft on structural ideas from seanhalpin.xyz (floating glass nav, huge fluid hero type, ambient glow, soft bouncy motion, wider spacious layout) without losing the security vernacular. This supersedes the v1 "sharp-everywhere, no rounding" rule below.

## Color Token System (Dark Theme — Default, unchanged core)
- `--bg`: `#030712` — near-black navy
- `--fg`: `#f0f4f8` — off-white
- `--accent`: `#00e676` — bright security green (full saturation: text, buttons, active states)
- `--accent2`: `#00e5ff` — cyan (full saturation: data/info links)
- `--card`: `#0d1a2b`
- `--border`: `#1e2a3a`
- `--muted`: `#8aa0b0`

### New: glow/glass tokens (desaturated, low-opacity — ambient surfaces only)
- `--glow-green`: `rgba(0, 230, 118, 0.12)` — ambient hero glow, radial gradient stops
- `--glow-cyan`: `rgba(0, 229, 255, 0.08)` — secondary glow tint
- `--glass-bg`: `rgba(13, 26, 43, 0.55)` — nav/colophon glass surface (pair with `backdrop-filter: blur(16px) saturate(1.4)`)
- `--glass-border`: `rgba(0, 230, 118, 0.15)` — hairline edge on glass surfaces

Rule: full-saturation `--accent`/`--accent2` are for text, buttons, borders, active indicators. Glow/glass tokens are exclusively for ambient background effects (hero glow, nav/colophon blur surfaces, soft shadows) — never for text or interactive states.

Light theme tokens unchanged from v1 (see brand-guidelines.md); apply the same glow/glass desaturation rule when a light-mode glass surface is introduced.

## Typography (unchanged fonts, new fluid scale)
Font stack stays Archivo (display) / Space Grotesk (body) / JetBrains Mono (labels) — no font changes.

- **H1 Hero**: fluid `clamp(3.5rem, 2.2rem + 7vw, 10rem)` (~56px → ~160px), weight 800, line-height 1.0, tracking `-0.04em`
- **H2 Section**: fluid `clamp(2rem, 1.5rem + 2.5vw, 3.5rem)`, weight 700, tracking `-0.02em`
- **H3 Card Title**: 24–28px, weight 600
- **Body**: 17–19px / 1.7, max-width 70ch
- **Labels / Tags**: 13px mono, uppercase, tracking `0.15em`

## Shape Language (v2 — supersedes v1 "sharp-only" rule)
- Base border-radius opens up to **8–12px** on cards, buttons, and tags (previously 0–2px max).
- Nav and colophon card go further: fully rounded glass pill/capsule shapes.
- Sharp geometric accents (corner marks, shield motif) remain as a *detail*, not the governing shape rule — e.g. a small sharp corner accent on card hover is still fine, but the card itself is no longer hard-edged by default.

## Layout
- Container width widens from `max-w-5xl` to **`max-w-7xl`** (~1400px) for section containers.
- `ProjectCard` becomes larger and more visual: bigger thumbnail/image area, bolder title, bento-style grid instead of a single-column list.
- Other content (bio, skills, certs, education) keeps a readable inner column within the wider container — don't stretch body text to full 1400px width.

## Hero
- Replace the particle-network `HeroCanvas` with an **ambient radial glow**: a slow-drifting radial gradient using `--glow-green`/`--glow-cyan`, centered behind the headline, `prefers-reduced-motion` disables the drift (static glow remains).
- Headline uses the new fluid H1 scale. Keep copy short (name + one-line title) so it reads well at the larger sizes.

## Navigation
- Detach `SiteHeader` from the viewport edges: a centered floating glass pill (`--glass-bg` + blur + `--glass-border`), fixed near the top.
- Active route gets a sliding highlight behind the link (animated via the bounce curve below), not just an underline.
- Theme toggle stays in the nav, same sharp-geometric icon mark, but sits inside the rounded pill.

## Colophon Card (new)
- Small floating glass card, bottom-left on the homepage, listing the actual build stack: Next.js 16, React 19, Cloudflare Workers, GSAP, Lenis, Tailwind, etc.
- Same glass treatment as the nav (`--glass-bg`, blur, `--glass-border`).
- Collapsible/hidden on narrow mobile viewports to avoid covering content.

## Motion
- **Scroll reveals**: unchanged — GSAP `power2.out`, 0.7s, one orchestrated fade per section (per v1 "one orchestrated moment" principle).
- **Interactive elements** (nav tab-slide, button/link hovers, theme toggle): new springy curve `cubic-bezier(0.175, 0.885, 0.32, 1.275)`.
- `prefers-reduced-motion` disables the hero glow drift and any bounce overshoot (interactions still transition, just linearly/instantly).

## Principles (carried over from v1)
- Security vernacular stays: shield/key/lock iconography, mono terminal labels, geometric accent marks — now paired with the softer glass/glow surfaces rather than replaced by them.
- Bold in one place: the hero. Sections stay calm.
- No clutter: no decorative gradients outside the defined glow tokens, no number markers unless sequential.

## v1.2: Full-Page Snap Sections + Motion Layer
Inspired by animejs.com, motion.dev, kokonutui.com, bklit.com. Homepage sections (Hero, Experience, Skills, Certifications, Education, Projects) became full-viewport scroll-snap sections instead of one continuous scroll.

- **Navigation**: `SectionNavDots` — fixed right-side dot indicator (one per section), click to jump, `ArrowUp`/`ArrowDown`/`PageUp`/`PageDown` to step between sections via `scrollIntoView`. Lenis is excluded from the homepage scroll container (`data-lenis-prevent`) so native CSS scroll-snap drives it.
- **Section entrance**: `SpringReveal` — each section is a `motion.section` that animates in with real spring physics (`stiffness: 120, damping: 16`) via Motion (the `framer-motion` package), not a linear fade. Respects `useReducedMotion()`.
- **Hero**: name text gets a `ShimmerText` sweep (CSS gradient animation, disabled under reduced motion via the existing global media query).
- **CTA buttons**: `ParticleButton` — a small particle burst (Motion-animated dots) fires on click for both hero CTAs.
- Not added (explicitly deferred by user choice): magnetic cursor-follow buttons, ⌘K command palette.

## v1.3: Dashboard, Animated Objects, Interactive Timeline, Skills Orbit
Further inspired by animejs.com, motion.dev, kokonutui.com, bklit.com.

- **`StatsDashboard`** (new "stats" snap-section after Hero): four stat tiles with animate-count-up values computed from real data (years active since earliest experience entry, roles held, certifications held, projects shipped — no fabricated metrics), plus a decorative "system status: nominal" waveform strip (explicitly ambient, not a real data series — see dataviz skill honesty constraint).
- **`HeroObject`**: an SVG shield that draws itself in on load and tilts toward the cursor (spring-based parallax), sitting faintly behind the hero text. Decorative only, `aria-hidden`.
- **`ExperienceTimeline`**: Experience became a horizontally draggable (Motion `drag="x"`) card rail with velocity-based snap-to-nearest-card and a dot rail, instead of a static vertical list. Replaced `ExperienceNode.tsx` (removed).
- **`SkillsOrbit`**: Skills became 7 orbiting "category" nodes (counter-rotating child layer keeps labels upright) around a center hub; clicking a node reveals that category's skill tags below. Deliberately *not* one dot per individual skill (~79 total skills) — that volume doesn't fit a radial scatter without unreadable crowding, so category-level orbit + progressive disclosure was chosen over a literal radar chart with fabricated per-skill magnitude.

## v1.4: Pinned Intro Sidebar + Light-Theme Card Contrast Fix

- **Split layout (≥lg)**: the intro (name/title/bio/CTAs) moved into a pinned left `<aside>` (38% width) that stays in place while the right panel (Stats → Experience → Skills → Certs → Education → Projects) scroll-snaps independently. Below `lg`, there's no room for a sidebar, so the intro renders as the first snap-section instead (`HomeHero` is reused in both places; `SectionNavDots` no longer lists "hero" since it's either always visible or the natural top of the page).
- **Fixed a real contrast bug, not just a preference**: the light theme kept dark-navy cards (`--card: #1a2332`, the "inverted console" look from v1) but every component painted card text with the page-level `--fg`/`--muted` tokens — which are *dark* in light mode. That's dark text on a dark card: unreadable. Added `--card-fg`/`--card-muted` tokens (light values in both themes, since the card surface itself stays dark in both themes) and repointed every card-sharp/tag-sharp text usage (`ProjectCard`, `ExperienceTimeline`, `CertGrid`, `EducationRecords`, `ContactServices`, `StatsDashboard`, `SkillsOrbit`'s inactive node) to them. `.tag-sharp` and `.card-sharp` fixes in `globals.css` cascade-fixed most instances in one place; a handful of explicit per-component overrides needed individual fixes since Tailwind utility classes outrank inherited color.

## v1.5: Navigation Smoothness Pass
Verified against the ui-ux-pro-max UX guideline set (touch target size, smooth scroll, deep linking) rather than guessed.

- **Scroll-snap softened**: `scroll-snap-type` went from `y mandatory` to `y proximity`, and `scroll-snap-stop: always` was removed. Mandatory+always forces a hard stop at *every* section even on a fast flick — proximity lets a quick scroll glide through while a deliberate scroll (or dot/keyboard nav) still lands cleanly on a section.
- **Dot-nav touch targets fixed**: each `SectionNavDots` button was effectively ~8×16px, failing the WCAG 2.2 24×24px minimum. Now `h-6 w-6` (24×24px) hit areas around the same small visual dot.
- **Deep linking added**: the active section now syncs to `location.hash` via `history.replaceState` (no history spam), and loading the homepage with a hash (e.g. `/#projects`) scrolls straight to that section on mount. Makes individual sections shareable/bookmarkable and survives a reload mid-scroll.
- **Route transition added**: `app/template.tsx` gives `/` ↔ `/contact/` a short fade+slide-up on enter (Motion, respects `prefers-reduced-motion`) instead of an abrupt hard cut.
- **Discoverability**: a tiny `↑↓` hint now sits under the dot-nav column so keyboard section-jumping isn't a hidden feature.

## v1.6: Blog (Admin + Notion-Style Editor)
Restored and reworked the pre-redesign blog feature (`main` branch had the D1 schema/queries/server-actions but no in-app auth, a plain markdown textarea editor, and old slate/cyan styling).

- **Auth**: real in-app login (not the old Cloudflare Access setup) — `/admin/login` checks a single `ADMIN_PASSWORD` secret and sets a signed httpOnly session cookie (HMAC over an expiry timestamp via Web Crypto, `lib/auth.ts`). `app/admin/(protected)/layout.tsx` is a route-group guard: every page under it (post list, new, edit) redirects to `/admin/login/` without a valid session; `/admin/login` itself sits outside the group so there's no redirect loop.
- **Editor**: replaced the plain markdown `<textarea>` with a real Notion-style block editor ([BlockNote](https://www.blocknote.js.org/), `@blocknote/shadcn` shell to match Tailwind rather than pulling in Mantine's CSS). Storage stays plain markdown in D1 (`editor.blocksToMarkdownLossy()` / `tryParseMarkdownToBlocks()` at the edges) — zero schema change, public `/blog` pages still render with `react-markdown` unchanged.
- **Renamed** `/logs` → `/blog` throughout (nav tab, routes, copy, docs) per your request; admin stays at `/admin`.
- **Restyled** every surface (`PostList`, `BlogFeed`, `MarkdownArticle`, admin nav, login form, editor chrome, error page) from the old hardcoded slate/cyan/emerald Tailwind classes onto this repo's actual token system (`--card-fg`/`--card-muted`/`--accent`/`card-sharp`/`btn-sharp`).
- Added "Blog" to `SiteHeader`'s nav.

## v1.7: Fixed invisible-section bug
`SpringReveal`'s `whileInView` used `viewport={{ amount: 0.4 }}` — firing only once 40% of the *entire section's own height* is simultaneously inside the viewport. Fine for short sections, but once Projects became a single stacked column (v1.5 fix) it grew far taller than one viewport, so 40% could never be satisfied — the section stayed at its `opacity: 0` initial state forever. Changed to `amount: "some"` (fires on any overlap, independent of section height) so this can't recur for any section regardless of how tall its content grows.

## v1.8: Experience as an Actual Travelling Timeline
Replaced the plain dot-row under the card carousel with a real timeline rail: a base track line, a solid accent "traveled" segment that grows from the start, year-labeled nodes at each role, and a glowing marker that springs along the track to the active node. All driven by the same `index` state as the card carousel/autoplay/drag — clicking a node, dragging a card, or autoplay advancing all move the marker identically. Nodes and marker share one `left: (i / maxIndex) * 100%` formula so they can't drift out of alignment regardless of role count.

## v1.9: Stats Section — Terminal, Not Fake Dashboard
The old Stats section (4 generic KPI tiles + 3 rows of decorative squiggly "status" waveforms with made-up labels like "Build: passing") read as a generic templated SaaS dashboard pretending to show live data it didn't actually have — correctly called out as silly, not professional.

Replaced with a single terminal-window panel (macOS-style traffic-light dots, `~/portfolio — zsh` titlebar) that types out three real, first-person lines character-by-character (`whoami`, `status`, `availability`), then reveals the four real stat counts (years/roles/certs/projects) as plain aligned key:value pairs once typing finishes. No fabricated waveforms, no fake live-system claims — real data, real voice, one cohesive object instead of a fragmented tile grid. Respects `prefers-reduced-motion` (renders fully typed immediately). Removed the now-unused `CountUp.tsx` and `pulse-line`/`pulse-dash` CSS.

## v1.10: bklit-Inspired Dashboard Panel
Researched bklit.com's actual shipped CSS (not just the marketing copy) to ground this rather than guess: their chart tokens are deliberately **grayscale** (`--chart-1..5` map to zinc/stone steps), with brand color reserved for chrome/emphasis, not the data marks themselves — hairline semi-transparent borders/grid, a dedicated near-black `--chart-background` distinct from card background, direct value labels instead of dense tooltips-everywhere.

Added `SkillsBarChart` — a horizontal bar chart of real skill-category counts (`skillCategories`, 7-15 items each, from `lib/profile.ts`), styled on that same restraint principle: bars default to a muted neutral fill, only brightening to the brand accent on hover; ticks at 0/5/10/15; value labeled at the bar tip per the dataviz mark spec; staggered width-in entrance on scroll, skipped under reduced motion. `DashboardPanels` composes it alongside the existing terminal (`StatsDashboard`) in a two-column grid on `lg+`, stacked on mobile — the Stats section is now an actual multi-panel dashboard instead of one lone widget.

Deliberately did **not** chart "top technologies across projects" — only 5 projects with mostly 1-2 stack entries each produced a flat, uninteresting tie-heavy chart with no real story; skill-category counts had far more genuine variation (7–15) and said more about actual depth.

## v1.11: Sidebar Navigation (Travelling Rail, Reused Motif)
Added `SidebarNav` under the intro in the pinned left sidebar — a vertical version of the same "travelling rail" built for the Experience timeline (base line + accent "traveled" segment + glowing marker that springs to the active item), so the two share a visual language instead of inventing a new nav pattern. Clicking a label, or `↑`/`↓`/`PageUp`/`PageDown`, smooth-scrolls the right panel and syncs the URL hash.

Singleton by construction, not by CSS: `HomeHero` takes a `showNav` prop and only the aside's instance passes it (the duplicated mobile-section `HomeHero` never does), so there's exactly one `SidebarNav` in the DOM. It's only *visible* at `lg+` (same breakpoint as the aside itself), but since `display:none` doesn't stop React effects, both it and the pre-existing `SectionNavDots` (which owns the `sm`–`lg` range) guard their hash-sync/`IntersectionObserver`/keyboard-listener effects with a `matchMedia("(min-width: 1024px)")` check so only one is ever actually active for a given viewport — otherwise both would independently write the same URL hash and handle the same arrow-key presses.

## v1.12: Header Reveal-at-End, Real Light Theme, Sun/Moon Toggle, Snappier Stats Boot
- **Header hides on the homepage until the end**: `SiteHeader` now tracks whether `#projects` (the last section) is in view and fades/slides the floating pill out of the way otherwise — scroll to the bottom and it reappears. Unaffected on every other route (`/blog`, `/contact`, `/admin`), where it's always visible as before.
- **Light theme is now an actual light theme**: previously `--card` stayed dark navy even in `.light` (the old "inverted console" idea), while card text correctly used light-safe `--card-fg`/`--card-muted` tokens — meaning the cards just looked like dark boxes floating on a light page rather than genuinely light. Cards are now white, text/border/muted values deepened across the board for real contrast (this is what `brand-guidelines.md` described all along — `--card: #FFFFFF in light` — implementation had just drifted from it).
- **Sun/Moon toggle**: replaced the diamond glyph with an actual sliding pill switch — a knob that springs between a sun icon (light) and a crescent moon (dark).
- **Stats terminal animation redesigned**: dropped the per-character typewriter (slow, and apparently didn't read as "cool") for a boot-sequence feel — a loading bar, then each `$ command` / output pair pops in as a whole line (fade+slide, staggered ~280ms apart) instead of crawling character by character, finishing with the stat tiles springing in. Whole sequence takes ~1.5s now instead of ~4s+.

## v1.13: Fix Round — Outer-Scroll Footer Leak, Stats Label Overflow, Colophon Collision, Revert Header Hide
- **Footer appearing at the top of the homepage**: real bug. The footer lived in normal body flow *outside* `main`, making the page slightly taller than one viewport — enough for the browser's own outer scrollbar to reveal the footer independent of how far `main`'s internal snap-scroll had gotten. Fixed by moving the footer to be the literal last element *inside* `main` (home page only; `SiteFooter` now renders `null` on `/` and every other route is unaffected) — body height is now exactly one viewport, no outer scrollbar, footer only reachable by scrolling `main` to its end.
- **Stats box text collision**: `years_in_field` etc. are one unbroken word — browsers don't treat `_` as a wrap point — so in the cramped 4-column grid they overflowed into each other instead of wrapping. Replaced the grid with a vertical `$ label  value` list, giving each label the full card width.
- **Bottom-left collision**: the garbled black circle was Next.js's own dev-mode indicator (only present under `next dev`, never in production) overlapping `ColophonCard`, which was also pinned bottom-left. Moved it to bottom-right.
- **Reverted the "header hides until the end" behavior** (added in v1.12) per explicit follow-up — nav stays visible on the homepage at all times, same as every other route. Only the footer is end-of-scroll-gated, and that's now a structural fact (last element in `main`) rather than a hide/reveal animation.

## v1.14: Footer Scroll-Snap Bounce-Back
Moving the footer inside `main` (v1.13) fixed the outer-scrollbar leak but introduced a new symptom: scroll-snap-type: y proximity on `.snap-container` has nowhere valid to land once you're past the last `.snap-section` (Projects), so releasing the scroll near the footer snapped back up to Projects instead of letting you rest on the footer. Added `.snap-end { scroll-snap-align: end }` and applied it to the footer — now it's a valid snap target too, so the bounce-back is gone.

## v1.15: Same Bounce-Back on Lenis-Driven Pages (Contact, Blog)
The contact page has no scroll-snap at all — it's plain Lenis smooth-scroll — so the v1.14 fix didn't apply there. Same symptom, different cause: the browser's native rubber-band/overscroll bounce at the page boundary fights Lenis's own eased virtual scroll, reading as the page "sticking" then getting pulled back. Added `overscroll-behavior-y: none` on `html`/`body` so Lenis is the only thing deciding what happens at the scroll edges, and `overscroll-behavior-y: contain` on `.snap-container` for the same reason on the homepage's independent scroll region.

## v1.16: Removed Colophon Card
Removed the floating "Built with" card entirely (`ColophonCard.tsx` deleted, no longer mounted in `app/layout.tsx`) per explicit request.

## Uniqueness Check
Still not cream+terracotta, not generic SaaS card kit, not a neon cyberpunk pastiche. The hybrid reads as: a security engineer's console that breathes — dark, authoritative, mono-labeled, but with one calm atmospheric glow and a soft floating nav borrowed from editorial-design portfolios.
