# Design System

## Anduril-Inspired Minimal Aesthetic

This design system follows the principles of **restraint, clarity, and mission focus** inspired by [Anduril Industries](https://www.anduril.com/).

---

## Color Palette

### Primary Colors (Monochrome)

```css
--bg: #000000           /* Primary background - deep black */
--bg-elev: #0B0B0B      /* Elevated surfaces (cards, panels) */
--ink: #FFFFFF          /* Primary text - pure white */
--muted: #C1C3C2        /* Secondary text, labels, metadata */
```

### Accent Colors (Restrained Use Only)

```css
--accent-ok: #28C76F    /* Success, low magnitude quakes (≤2.5) */
--accent-mid: #FFB020   /* Warning, light quakes (2.6-4.0) */
--accent-warn: #FF7A00  /* Alert, moderate+ quakes (>4.0) */
```

**Usage Rule**: Color appears only for data visualization. All UI chrome (buttons, borders, text) stays monochrome.

---

## Typography

### Font Stack

```css
--font-base: "Inter", "Helvetica Neue", Arial, system-ui, sans-serif;
```

**Inter** is used as a free substitute for Anduril's Helvetica Now. It's a clean, Swiss-style grotesk designed for screen readability.

### Type Scale

```css
--font-12: 12px  /* Labels, metadata, captions */
--font-14: 14px  /* Body text, secondary content */
--font-16: 16px  /* Primary body text */
--font-20: 20px  /* Section headers */
--font-28: 28px  /* Page titles */
--font-40: 40px  /* Hero text (rare use) */
```

### Font Weights

- **400** - Regular body text
- **600** - Semibold for emphasis, labels
- **700** - Bold for headers, high contrast

### Text Styling

```css
/* Labels and controls - ALL CAPS */
text-transform: uppercase;
letter-spacing: 0.03em - 0.04em;

/* Headers - Slight negative tracking */
letter-spacing: -0.01em to -0.02em;

/* Numbers - Tabular for alignment */
font-variant-numeric: tabular-nums;
```

---

## Spacing Scale

**Principle**: Consistent rhythm using multiples of 4px.

```css
--space-4: 4px      /* Tight internal spacing */
--space-8: 8px      /* Small gaps, padding */
--space-12: 12px    /* Compact grouping */
--space-16: 16px    /* Standard gap */
--space-24: 24px    /* Section spacing */
--space-32: 32px    /* Large spacing */
--space-48: 48px    /* Extra large spacing */
--space-64: 64px    /* Hero/feature spacing */
```

---

## Layout

### Container

```css
--container-max: 1240px  /* Max content width */
/* Gutters: 24px on desktop, 12px on mobile */
```

### Grid

Main content uses a **two-column grid**:
```css
grid-template-columns: 1fr 480px;  /* Map | List */
```

On mobile, stacks to:
```css
grid-template-rows: 300px 1fr;  /* Map above, List below */
```

---

## Borders & Dividers

### Hairline

```css
--hairline: 1px solid rgba(255, 255, 255, 0.06);
```

Extremely subtle divider for sectioning without visual clutter.

### Border Radius

```css
--border-radius: 0px;  /* Sharp corners, no rounding */
```

**Exception**: Map markers and some UI elements use circles (`border-radius: 50%`).

---

## Motion

### Duration

```css
--duration: 180ms;  /* Standard transition time */
```

Range: 120-240ms for subtle UI feedback.

### Easing

```css
--easing: cubic-bezier(0.2, 0.9, 0.2, 1);
```

Smooth deceleration curve. No bounce or overshoot.

### Transitions

```css
transition: all 180ms cubic-bezier(0.2, 0.9, 0.2, 1);
```

Applied to:
- Button hover states
- Border color changes
- Transform effects (scale, translateY)

**Animations**: Only loading spinner uses `@keyframes`. Avoid gratuitous animation.

---

## Component Patterns

### Buttons

**Primary Action**:
```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.2);
color: var(--ink);
padding: 8px 16px;
font-size: 12px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.03em;
```

**Hover State**:
```css
border-color: var(--ink);
transform: translateY(-1px);
```

**Active/Selected**:
```css
border-color: var(--ink);
color: var(--ink);
```

### Cards

```css
background-color: var(--bg);
border: var(--hairline);
padding: 16px;
```

**Hover**:
```css
border-color: rgba(255, 255, 255, 0.2);
transform: translateX(2px);
```

**Selected**:
```css
border-color: var(--ink);
```

### Input Fields

```css
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.2);
color: var(--ink);
padding: 8px 12px;
font-size: 12px;
```

**Focus**:
```css
outline: none;
border-color: var(--ink);
```

### Sliders

**Track**:
```css
height: 2px;
background: rgba(255, 255, 255, 0.2);
```

**Thumb**:
```css
width: 12px;
height: 12px;
background: var(--ink);
border: 2px solid var(--bg);
border-radius: 50%;
```

**Hover Thumb**:
```css
transform: scale(1.2);
```

---

## Map Styling

### Basemap

**CARTO Dark Matter**:
```
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

Dark, low-contrast basemap that keeps focus on earthquake markers.

### Markers

**Style**:
```css
background-color: [accent color based on magnitude];
width: [magnitude × 4px, min 12px];
height: [magnitude × 4px, min 12px];
border-radius: 50%;
border: 1px solid rgba(255, 255, 255, 0.4);
```

**Hover**:
```css
transform: scale(1.05);
border-width: 2px;
```

### Legend

Floating panel with dark background and hairline border:
```css
background-color: rgba(11, 11, 11, 0.95);
border: var(--hairline);
backdrop-filter: blur(8px);
```

---

## Accessibility

### Color Contrast

All text meets **WCAG AA standards**:
- White on black: 21:1 ratio
- Muted text (#C1C3C2 on black): 12:1 ratio
- Accent colors chosen for sufficient contrast on dark backgrounds

### Keyboard Navigation

- All interactive elements are keyboard-focusable (`tabIndex`)
- Focus states have visible outlines (1px solid white)
- List items support Enter/Space activation

### ARIA

- `role="button"` on clickable cards
- `aria-label` on controls and map
- `aria-pressed` on toggle buttons (sort controls)
- `aria-live="polite"` on location name

### Screen Readers

- Semantic HTML (`<header>`, `<footer>`, `<nav>`)
- Descriptive link text ("View on USGS" not "Click here")
- Alternative text via ARIA labels on icon-only buttons

---

## Anti-Patterns to Avoid

### ❌ Don't Do This

- **Gradients** - Stay flat, monochrome
- **Glassmorphism** - No heavy blurs or translucency (exception: legend has light blur)
- **Drop shadows** - Use hairline borders instead
- **Rounded corners** - Keep sharp (0px radius) except circles
- **Color overload** - Accent colors only for data, not decoration
- **Multiple fonts** - Stick to Inter
- **Emoji overuse** - Only where functionally useful (location pin, refresh icon)

### ✅ Do This Instead

- **Hairline dividers** for sectioning
- **Flat colors** with subtle opacity changes
- **Generous whitespace** for breathing room
- **ALL CAPS labels** with tight letter-spacing
- **Monochrome UI chrome** with color only on data
- **Subtle motion** (180ms, no bounce)

---

## Responsive Breakpoints

```css
/* Tablet */
@media (max-width: 1024px) {
  /* Grid: stack map above list */
  grid-template-columns: 1fr;
  grid-template-rows: 400px 1fr;
}

/* Mobile */
@media (max-width: 768px) {
  /* Reduce spacing, stack controls */
  grid-template-rows: 300px 1fr;
  /* Filters: flex-direction column */
}
```

---

## References & Inspiration

- [Anduril Industries](https://www.anduril.com/) - Mission-focused, minimal, monochrome UI
- [Anduril Case Study (Yashas Mitta)](https://yashasmitta.com/anduril) - Silicon Valley sophistication
- [Helvetica Now on Fonts in Use](https://fontsinuse.com/uses/38642/anduril-com) - Typography reference
- [Brandfetch Anduril](https://brandfetch.com/anduril.com) - Brand colors and assets
- [Swiss Design Principles](https://www.smashingmagazine.com/2009/07/lessons-from-swiss-style-graphic-design/) - Grid, typography, hierarchy

---

## Tools for Designers

If you're extending this design system:

### Figma / Design Tools
1. Set up color variables: `--bg`, `--ink`, `--accent-ok`, etc.
2. Create text styles: 12px/14px/16px/20px/28px in Inter
3. Spacing library: 4/8/12/16/24/32/48/64px
4. Components: Button, Card, Input, Slider

### Code
All tokens are defined in [App.css](./src/App.css) as CSS custom properties:
```css
:root {
  --bg: #000000;
  --ink: #FFFFFF;
  /* ... */
}
```

Use them throughout:
```css
.my-component {
  background-color: var(--bg);
  color: var(--ink);
  padding: var(--space-16);
}
```

---

**Remember**: Less is more. When in doubt, remove decoration.
