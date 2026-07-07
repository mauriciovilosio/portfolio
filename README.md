# Mauricio Vilosio — Portfolio

A modern, product-grade personal portfolio for **Mauricio Vilosio** — Data Analyst building toward Sports Analytics and Tennis Performance. Built with plain **HTML, CSS and JavaScript**: no framework, no build step, no dependencies to install. Clone it and open `index.html`.

> Live goal: present a Data Analyst who is becoming a global reference in **Sports Analytics applied to tennis** — not a generic developer portfolio.

---

## ✨ Design principles

- **Dark mode by default** — near-black surfaces, glassmorphism, a lime/cyan gradient accent (a nod to the tennis ball + data/tech).
- **Minimalist, generous whitespace**, inspired by Apple, Stripe, Linear, Vercel, Notion, Nike and F1.
- **Motion with restraint** — scroll reveals, animated KPI counters, a custom cursor, and a subtle particle background. Everything respects `prefers-reduced-motion`.
- **Content-first**: the "About" section tells a story, not a skills list. The "Dashboard" section literally looks like a Power BI report.
- **Bilingual by default** — the whole site renders in **Spanish on first visit**, with an ES/EN switch in the nav. The choice is remembered (`localStorage`) across pages.

---

## 📁 Project structure

```
mauricio-vilosio-portfolio/
├── index.html                 # Single-page site: Hero → About → Timeline → Projects →
│                               #   Dashboard/KPIs → Skills → Vision →
│                               #   Process → Blog preview → Contact → Footer
├── projects/                  # One standalone page per featured project
│   ├── mi-tenis.html
│   └── portfolio.html
├── blog/                      # Blog scaffold, ready to grow
│   ├── index.html
│   ├── how-data-changes-tennis.html
│   ├── power-bi-for-coaches.html
│   ├── sports-analytics.html
│   └── training-analysis.html
├── css/
│   ├── variables.css          # Design tokens: color, type, spacing, motion (edit this first)
│   ├── base.css                # Reset + global element defaults + a11y basics
│   ├── components.css          # Every reusable UI block (nav, buttons, cards, dashboard...)
│   ├── animations.css           # Keyframes and entrance/hover motion
│   └── responsive.css           # Breakpoints: 1024px / 768px / 480px
├── js/
│   ├── cursor.js                # Custom dot + trailing ring cursor
│   ├── particles.js              # Subtle canvas background particles
│   ├── scrollReveal.js            # IntersectionObserver-based scroll reveals + nav bg swap
│   ├── counters.js                 # Animated KPI counters in the Dashboard section
│   ├── navigation.js                 # Mobile menu, active-link highlight, page transitions
│   ├── main.js                        # Footer year + contact form handling
│   └── i18n.js                         # ES/EN language-switch engine (see below)
├── assets/
│   ├── favicon.svg
│   └── images/                        # Placeholder SVG imagery (see "Replacing placeholders")
├── LICENSE                             # MIT
├── .gitignore
└── README.md
```

Every HTML page loads the same five stylesheets in the same order and the same JS modules — there is exactly one design system for the whole site.

---

## 🎨 Style guide

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#08090d` | Base background |
| `--color-accent-lime` | `#d4ff3f` | Primary accent (tennis ball) |
| `--color-accent-cyan` | `#35d0ff` | Secondary accent (data/tech) |
| `--color-accent-violet` | `#8b7bff` | Tertiary accent, used sparingly |
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | Inter | Body copy |
| `--font-mono` | JetBrains Mono | Eyebrows, labels, meta text |

All tokens live in [`css/variables.css`](css/variables.css) — change a value there and it propagates everywhere. Spacing follows an 8px scale (`--space-1` … `--space-9`).

---

## 🧩 Key interactive features

- **Animated KPI dashboard** (`js/counters.js`) — numbers count up and progress bars fill once the section scrolls into view.
- **Custom cursor** (`js/cursor.js`) — disabled automatically on touch devices.
- **Scroll reveals** (`js/scrollReveal.js`) — any element with class `reveal` fades/slides in once, on first view.
- **Page transitions** (`js/navigation.js`) — add `data-transition` to an internal `<a>` for a premium wipe transition between pages.
- **Language switch** (`js/i18n.js`) — see below.

---

## 🌐 Language switch (ES / EN)

The site defaults to **Spanish** on first load. A pill in the nav (`ES` / `EN`) lets visitors switch to English; the choice is saved in `localStorage` (key `mv-lang`) so it persists across every page.

How it works, if you need to add or edit copy:

- Shared strings used on every page (nav links, footer, section labels like "Description"/"Descripción") live in the `COMMON` object inside `js/i18n.js`.
- Page-specific copy lives in a small inline `window.PAGE_I18N = { es: {...}, en: {...} }` script near the bottom of each page's `<body>`. Spanish is only listed there for the homepage's meta title/description; everywhere else the **visible HTML is already Spanish**, and `PAGE_I18N.en` holds the English translation that gets swapped in on toggle.
- Mark any translatable element with:
  - `data-i18n="key"` → replaces `textContent`
  - `data-i18n-html="key"` → replaces `innerHTML` (for copy with `<strong>`, `<br>`, lists)
  - `data-i18n-copy="key"` → like `data-i18n`, but replaces the `{year}` token (used by the footer)
- To add a new page, copy the `lang-switch` markup from any existing page's nav and give it its own `PAGE_I18N` block — `js/i18n.js` handles the rest automatically.

---

## 🖼️ Replacing placeholders

Everything in `assets/images/` is an SVG placeholder so the repo works out of the box with zero external assets. The hero section is intentionally photo-free (text-only by design).

1. **Project cards**: each `assets/images/project-*.svg` maps to one card in `index.html` and the matching page in `projects/`. Swap the file, keep the name, or update the `<img src>` references.
2. **Galleries**: each project page reuses four generic `assets/images/gallery-*.svg` tiles. Replace with real screenshots per project as they become available.

---

## 🚀 Running locally

No build step required.

```bash
# Option 1 — just open it
open index.html   # macOS
start index.html  # Windows

# Option 2 — serve it (recommended, avoids any file:// quirks)
npx serve .
# or
python3 -m http.server 8080
```

## 🌐 Deploying (GitHub Pages)

1. Push this repo to GitHub.
2. Go to **Settings → Pages**.
3. Source: `Deploy from a branch` → Branch: `main` → Folder: `/ (root)`.
4. Your site publishes at `https://<your-username>.github.io/<repo-name>/`.

---

## ✅ Technical checklist

- [x] Fully responsive (1024px / 768px / 480px breakpoints)
- [x] No build tools, no dependencies — pure HTML/CSS/JS
- [x] Semantic HTML + `aria-live`/`aria-expanded` where relevant
- [x] `prefers-reduced-motion` respected across all animation
- [x] Lazy-loaded project/gallery images (`loading="lazy"`)
- [x] SEO meta tags + Open Graph tags on the homepage
- [x] Reusable design tokens (`css/variables.css`)
- [x] Commented, modular JavaScript (one concern per file)
- [x] Bilingual (ES default / EN toggle) across every page

---

## 🗺️ Roadmap

- Wire the contact form to a real backend (Formspree, Resend, or a small serverless function) — see the `TODO` in `js/main.js`.
- Publish the first real blog article and retire the "Coming soon" badges.
- Replace SVG placeholders with real photography as it becomes available.
- Expand `Mi Tenis` into its own linked product page as the system matures.

---

## 📄 License

MIT — see [LICENSE](LICENSE).

## 📬 Contact

- LinkedIn: [linkedin.com/in/mauriciovilosio](https://www.linkedin.com/in/mauriciovilosio/)
- GitHub: [github.com/mauriciovilosio](https://github.com/mauriciovilosio)
- Email: mvilosiog@gmail.com
