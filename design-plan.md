# Portfolio Design Plan — Security Engineer / Shield Theme

## Subject
Personal portfolio for Mohammed Al-Dokimi — SECURITY ENGINEER. Audience: recruiters, clients, peers in cybersecurity / infrastructure. Job: show authority, precision, and deep technical expertise. Design must feel like a security console / system dashboard — sharp, authoritative, geometric.

## Visual Direction: Security Badge / Shield Theme
- Sharp geometric borders (no rounded corners, or very minimal `2px` radius only on interactive elements)
- Shield / badge iconography: security shields, key icons, lock indicators in component headers
- Clean card structures with sharp borders and subtle borders — not rounded SaaS cards
- Dark theme by default: deep navy-black (`#030712`) with bright green (`#00e676`) and cyan (`#00e5ff`) neon accents — like a live security terminal
- Grid / geometric background patterns: subtle hexagon or shield-grid background textures
- Typography: bold, tight tracking — commands authority. Inter + JetBrains Mono.
- No generic cream backgrounds, no terracotta, no ALL-CAPS eyebrow labels.

## Color Token System (Dark Theme — Default)
- `--bg`: `#030712` — near-black navy (security terminal dark)
- `--fg`: `#f0f4f8` — off-white (high contrast for readability)
- `--accent`: `#00e676` — bright security green (live / active / verified)
- `--accent2`: `#00e5ff` — cyan (data / info / secondary alerts)
- `--card`: `#0d1a2b` — slightly lighter dark for cards (sharp borders, not shadows)
- `--border`: `#1e2a3a` — sharp geometric borders
- `--muted`: `#8aa0b0` — muted slate for secondary info

Light Theme (toggle option):
- `--bg`: `#f8fafc`
- `--fg`: `#0a0f1a`
- `--accent`: `#00c853` (slightly darker green for light bg visibility)
- `--card`: `#1a2332` (dark navy cards on light bg — inverted security console look)
- `--border`: `#e2e8f0`

## Typography (Bold / Command Authority)
- H1 Hero: 72–96px / 1.05 / bold (`font-weight: 800`) / tight tracking (`-0.04em`) — makes a statement like a security banner
- H2 Section: 48–56px / 1.1 / bold (`font-weight: 700`) / tracking `-0.02em`
- H3 Card Title: 24–28px / 1.2 / semibold (`font-weight: 600`)
- Body: 17–19px / 1.7 / regular (`font-weight: 400`), max-width 70ch
- Labels / Tags: 13px / 1.3 / mono (`font-weight: 500`) — like terminal tags
- Links / CTAs: bold, underline on hover, accent color

Avoid: all-caps labels, middle-dot meta strings, single-word italic/bold accents.

## Layout Concept — Security Console / Shield Layout
- Dark background with sharp geometric sections
- Hero: large bold title + sub-title in bright green + geometric shield pattern background (CSS or canvas)
- Sections aligned to `max-w-5xl` reading column, left-aligned text, sharp dividers between sections
- Cards: sharp borders (`border: 2px solid var(--border)`), dark backgrounds, no rounded corners (or `border-radius: 2px` max), subtle green/cyan left-border accent for active/highlighted cards
- Skills grid: sharp-bordered cards with security badge icons + mono labels
- Projects: sharp card layout with thumbnail, title, description, tech tags (sharp tags)
- Certifications / Education: clean sharp table/card layout, no newspaper density

## Principles
- **Security vernacular**: use shield shapes, geometric grids, key/lock symbols, terminal/code aesthetics
- **Bold in one place**: hero with massive bold typography + green accent. Everything else sharp and quiet.
- **No clutter / no generic patterns**: no number markers (01/02/03) unless sequential, no eyebrow labels, no decorative gradients
- **Type as authority**: large bold tracking = confidence. This is not a generic SaaS page.
- **Theme toggle**: always visible in header as a sharp geometric button (shield or circle with sun/moon icon)

## Visualizations / Components
- Hero: geometric shield/network background pattern (CSS grid or subtle particle field), massive bold title, brief security-focused bio line
- Skills: grid of sharp-bordered cards, each with a security/tech icon (shield, server, key, lock), name in mono, brief description
- Projects: sharp cards with image, bold title, description, tech tag pills (sharp rectangles)
- Certifications: list with sharp card layout, cert name, issuer, date, sharp verification badge (green dot / shield icon)
- Education: similar sharp card layout with institution name and focus area
- Contact: sharp geometric contact section with email, LinkedIn, GitHub links — all sharp buttons with border, not soft rounded pills

## Animations
- Hero text entrance: single bold fade-in with slight translate (0.3s ease-out) — one orchestrated moment
- Section reveal: simple fade-in on scroll (using `ScrollAnimations`), one sequence, not scattered per-card
- Reduced motion respected (`prefers-reduced-motion`): disable animations
- No scattered hover effects on every card

## Theme Toggle
Sharp geometric toggle button in site header (shield shape or circle with sun/moon). Class toggle on `<html>` element: `.dark` class applies dark variables, no `.dark` applies light variables (or vice versa based on default).

## Uniqueness Check
Not cream + terracotta. Not generic SaaS card kit. Not broadsheet hairline rules. Not ALL-CAPS labels. Design is specific to security/infrastructure: dark terminal aesthetic, sharp geometric cards, shield/iconography references, bold authority typography.
