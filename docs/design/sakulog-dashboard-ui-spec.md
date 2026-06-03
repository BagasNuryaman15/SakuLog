# SakuLog Dashboard UI Spec — MacBook Air 13" Web3 Premium Blueprint

## 1. Purpose

Dokumen ini adalah UI specification resmi untuk redesign dashboard SakuLog.

Dokumen ini menggantikan UI spec lama.

Codex wajib menggunakan dokumen ini bersama dua gambar blueprint terbaru yang ada di folder:

```text
docs/design/dashboard-blueprint-collapsed.png
docs/design/dashboard-blueprint-expanded.png
```

Dokumen ini bukan inspirasi bebas.
Dokumen ini adalah **kontrak layout, visual, warna, proporsi, dan behavior**.

Codex tidak boleh hanya mengambil “vibe gelap” lalu membuat versi sendiri.
Codex harus mengikuti struktur, proporsi, warna, dan hierarchy dari blueprint semirip mungkin dalam batas implementasi web yang realistis.

---

## 2. Primary Target Device

Target utama dashboard SakuLog adalah:

```text
MacBook Air M3 13-inch
Effective design reference: 1440 × 900 class viewport
```

Artinya:

* dashboard harus nyaman dilihat di layar MacBook Air 13 inch
* dashboard tidak boleh memaksa layout yang hanya cocok untuk monitor besar
* dashboard tidak boleh horizontal overflow
* right column tidak boleh terpotong
* recent transactions tidak boleh squeezed
* amount/currency tidak boleh wrap aneh
* sidebar expanded tidak boleh merusak grid
* layout harus tetap terasa premium di viewport laptop 13 inch

External monitor / desktop besar boleh terlihat lebih lega, tetapi bukan target utama.

---

## 3. Source of Truth Images

### Blueprint A — Collapsed Sidebar

```text
docs/design/dashboard-blueprint-collapsed.png
```

Ini adalah acuan utama untuk dashboard desktop default di MacBook Air 13 inch.

State ini menggunakan:

* slim icon-only sidebar
* compact brand mark
* top bar full content width
* hero card di kiri
* KPI cards 2x2 di tengah
* expense/category card di kanan
* money signals, mini insight, recent transactions di right/support area
* cashflow trend di bawah kiri/tengah
* warna dark Web3 yang lebih hidup dan glowing
* tidak ada horizontal overflow

Codex harus menganggap gambar ini sebagai:

```text
default desktop dashboard target
```

---

### Blueprint B — Expanded Sidebar

```text
docs/design/dashboard-blueprint-expanded.png
```

Ini adalah acuan utama untuk dashboard saat sidebar expanded.

State ini menggunakan:

* expanded sidebar sekitar 248–256px
* logo + label brand terlihat
* navigation grouped sections
* user/profile area di bawah sidebar
* main content tetap fit di MacBook Air 13 inch
* top bar tetap berada di area content
* dashboard tetap 3-column feel, tetapi lebih compact
* tidak ada card overlap
* tidak ada horizontal overflow

Codex harus menganggap gambar ini sebagai:

```text
expanded desktop dashboard target
```

---

## 4. Non-Negotiable Visual Direction

SakuLog harus terlihat seperti:

```text
Web3-inspired premium personal finance dashboard
```

Bukan:

```text
plain dark mode
basic admin panel
beginner Tailwind project
flat dashboard
generic SaaS dashboard
white corporate dashboard
crypto app yang terlalu ramai
```

Visual wajib mendekati blueprint:

* dark navy / near-black base
* indigo and midnight blue depth
* glowing cyan / violet / magenta accents
* glassmorphism cards
* subtle blueprint grid background
* soft neon edges
* premium gradient buttons
* crisp financial cards
* modern typography
* visible contrast
* readable and clean

Codex tidak boleh hanya mempertahankan warna dashboard lama kalau hasilnya flat.

---

## 5. Color System — Must Match Blueprint Tone

Current dashboard sebelumnya terlalu:

```text
flat
terlalu gelap rata
kurang depth
kurang glow
kurang vivid
kurang mirip blueprint
```

Dashboard baru harus mengikuti warna blueprint.

### Required Background

Use layered background, not one flat dark color.

Suggested implementation:

```css
background:
  radial-gradient(circle at 12% 8%, rgba(139, 92, 246, 0.28), transparent 34%),
  radial-gradient(circle at 82% 10%, rgba(34, 211, 238, 0.18), transparent 32%),
  radial-gradient(circle at 55% 88%, rgba(236, 72, 153, 0.14), transparent 38%),
  linear-gradient(135deg, #030617 0%, #070B1F 38%, #081426 68%, #030617 100%);
```

### Required Grid Overlay

Use a subtle grid overlay like blueprint.

Example direction:

```css
background-image:
  linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
background-size: 72px 72px;
```

Grid must be subtle.
It must not reduce readability.

### Required Tokens

Use these as the design token direction:

```text
bg-base: #030617
bg-panel: #070B1F
bg-panel-2: #0B1028
bg-indigo: #17114A
bg-blue: #061B33

surface-glass: rgba(255, 255, 255, 0.065)
surface-glass-strong: rgba(255, 255, 255, 0.10)
surface-blue-glass: rgba(20, 40, 80, 0.42)
surface-violet-glass: rgba(70, 45, 145, 0.35)

border-soft: rgba(255, 255, 255, 0.12)
border-glow-cyan: rgba(77, 231, 255, 0.32)
border-glow-violet: rgba(139, 92, 246, 0.36)
border-glow-magenta: rgba(236, 72, 153, 0.30)

text-primary: #F8FAFC
text-secondary: #B7C0D8
text-muted: #7A849F
text-faint: #566078

accent-cyan: #4DE7FF
accent-blue: #60A5FA
accent-violet: #8B5CF6
accent-purple: #A855F7
accent-magenta: #EC4899
accent-pink: #F472B6

income: #34D399
income-glow: rgba(52, 211, 153, 0.32)

expense: #FB7185
expense-glow: rgba(251, 113, 133, 0.32)

warning: #FBBF24
```

### Visual Quality Rules

* Cards must not look like flat black rectangles.
* Borders must be visible but soft.
* Cards should have subtle inner glow.
* Important cards should have richer gradient depth.
* Primary CTA must use violet-to-magenta gradient.
* Active sidebar item must use cyan/violet/magenta glow.
* Income must use emerald/cyan.
* Expense must use rose/magenta/coral.
* Do not use plain green block as primary accent.
* Do not use flat gray card surfaces.

---

## 6. Typography

Preferred font:

```text
Plus Jakarta Sans
```

Alternative only if already easier:

```text
Manrope
Geist
```

Avoid typography that feels too default.

### Typography Scale

Use responsive clamp values to avoid wrapping.

Suggested direction:

```text
Hero title:
clamp(2rem, 3.4vw, 3.4rem)

Balance amount:
clamp(2rem, 3vw, 3rem)

KPI amount:
clamp(1.35rem, 1.8vw, 1.85rem)

Page title:
clamp(1.35rem, 1.8vw, 1.8rem)

Card title:
0.95rem – 1.05rem

Body:
0.875rem – 0.95rem

Caption:
0.72rem – 0.8rem
```

Rules:

* currency values must stay readable
* avoid `break-words` on currency
* use `whitespace-nowrap` for important money values when possible
* reduce font size responsively before allowing wrap
* avoid oversized hero text on MacBook Air 13 inch
* avoid tiny unreadable captions

---

## 7. Dashboard Copy

Hero headline must be:

```text
Know where your money moves.
```

Do not use:

```text
Uangku habis ke mana?
```

Supporting text may use Indonesian.

Preferred supporting text:

```text
Ringkasan Juni 2026 untuk memahami sisa uang, cashflow, dan kategori yang paling banyak menguras saldo.
```

CTA label:

```text
Tambah Transaksi
```

Page title:

```text
Dashboard
```

Page subtitle:

```text
Ringkasan keuanganmu secara real-time
```

---

## 8. Sidebar Behavior

### 8.1 Collapsed Sidebar

Blueprint:

```text
dashboard-blueprint-collapsed.png
```

Collapsed sidebar is the default desktop state.

Required:

```text
width: 80–88px
```

Rules:

* icon-only
* logo mark at top
* active nav has glowing gradient pill
* user avatar/status at bottom
* no text labels
* must feel premium
* should not feel like plain vertical buttons

Collapsed sidebar must maximize dashboard content space.

---

### 8.2 Expanded Sidebar

Blueprint:

```text
dashboard-blueprint-expanded.png
```

Expanded sidebar uses click toggle only for now.

Required:

```text
width: 248–256px
```

Rules:

* brand logo + SakuLog visible
* optional subtitle: Money OS or Console
* grouped nav sections
* icons + labels visible
* active nav uses gradient highlight
* bottom user/profile area visible
* must not overlay dashboard content in a broken way
* main content must reflow safely
* no horizontal page overflow

Suggested nav groups:

```text
Overview
- Dashboard
- Reports

Tools
- Transactions
- Add

Settings
- Settings
```

Do not add routes that do not exist.

---

## 9. App Shell Layout

The dashboard app shell should use:

```text
Sidebar + Main Content
```

Main content must account for sidebar width.

Rules:

* collapsed sidebar: content gets more width
* expanded sidebar: content compresses safely
* no horizontal overflow
* no card clipping
* no right column cut off
* no hidden recent transactions
* top bar stays inside content area

Avoid:

* absolute positioning for dashboard grid
* fixed widths that only work on one screen
* forcing desktop monitor layout onto MacBook Air 13 inch

---

## 10. MacBook Air 13" Layout Contract

Target effective design class:

```text
1440 × 900
```

But browser usable content may be smaller.

Therefore:

* layout must fit in a 13-inch laptop browser
* content should use max width close to blueprint
* avoid excessive page padding
* avoid huge sidebar + huge 3-column grid combination
* cards must shrink gracefully

Suggested content max width:

```text
collapsed sidebar: max content width around 1180–1280px
expanded sidebar: max content width around 1080–1160px
```

The exact value can be adjusted based on app shell, but the output must visually match blueprint and avoid overflow.

---

## 11. Dashboard Grid Structure

Dashboard must not be a random stack of cards.

Use a clear dashboard grid.

### Collapsed Sidebar Layout

Use blueprint A.

Expected structure:

```text
Top Bar
Dashboard Grid
├── Hero Card
├── KPI Cards 2x2
├── Expense by Category
├── Money Signals
├── Mini Insight
├── Recent Transactions
└── Cashflow Trend
```

Suggested collapsed composition:

```text
Row 1:
Hero card | KPI 2x2 | Expense by Category

Row 2:
Money Signals | Mini Insight | Recent Transactions

Row 3:
Cashflow Trend spanning left + middle
Recent Transactions/right support may continue if needed
```

The blueprint shows the cashflow card spanning the left + center area, while the right column keeps utility cards readable.

### Expanded Sidebar Layout

Use blueprint B.

Expected:

* same visual logic
* more compact content width
* sidebar takes 248–256px
* hero, KPI, right column remain readable
* no overflow

If needed, expanded state may slightly reduce:

* hero width
* chart width
* card padding
* typography sizes

But do not destroy hierarchy.

---

## 12. Breakpoint Strategy

Do not force one layout everywhere.

Required behavior:

### Mobile / small tablet

```text
< 1024px
```

* hide desktop sidebar
* use bottom nav
* stack cards vertically
* no horizontal overflow

### Laptop / MacBook 13 primary

```text
1024px – 1535px
```

* collapsed sidebar default
* dashboard uses compact 3-column feel if space allows
* if expanded sidebar makes grid too narrow, reduce gaps/padding and card widths safely
* right column must remain visible
* recent transactions must stay readable

### Large desktop / external monitor

```text
>= 1536px
```

* full blueprint layout
* more spacious 3-column dashboard
* larger gaps
* richer spacing

Do not use a layout that only looks good at 1728px+.

---

## 13. Grid Implementation Guidance

Prefer CSS grid with explicit areas.

Example conceptual structure:

```text
.dashboard-grid {
  display: grid;
  grid-template-columns:
    minmax(360px, 1.35fr)
    minmax(240px, 0.85fr)
    minmax(300px, 1fr);
  gap: 16px;
}
```

For MacBook 13 inch, tune values carefully.

Do not blindly copy this example if it causes overflow.

Use:

* `minmax()`
* `clamp()`
* `min-width: 0`
* `overflow-hidden` only inside cards where appropriate
* `whitespace-nowrap` for money values
* responsive gaps

Avoid:

* fixed 500px hero + fixed 360px right + fixed 256px sidebar if it overflows
* absolute positioning for main cards
* nested layouts that create accidental 2-column behavior
* `break-words` on currency values

---

## 14. Top Bar

Top bar must look like blueprint.

Content:

* Dashboard title
* subtitle
* search field
* month selector
* notification button
* CTA button

Rules:

* inside main content area
* full available width
* dark glass style
* not too tall
* CTA gradient violet/magenta
* search field should shrink safely on MacBook
* top bar must not force horizontal overflow

Search input should not be fixed too wide in expanded sidebar mode.

---

## 15. Hero Card

Hero card should visually match blueprint.

Required content:

* SakuLog Console pill
* `Know where your money moves.`
* supporting text
* balance card
* optional Web3 cube/glow visual

Hero card must have:

* richer violet/indigo gradient
* subtle pattern/grid
* visible glow
* glass surface
* balance panel inside card
* one-line currency if possible

Hero card must not:

* dominate the entire dashboard
* push KPI cards too narrow
* create huge empty vertical space
* have flat black/gray look

Balance amount rule:

```text
Rp1.425.000 must not wrap into Rp1.425. / 000
```

Use:

* `whitespace-nowrap`
* `clamp()`
* `min-width: 0`
* responsive text sizing

---

## 16. KPI Cards

Required cards:

* Pemasukan bulan ini
* Pengeluaran bulan ini
* Pengeluaran hari ini
* Pengeluaran minggu ini

Blueprint style:

* compact but readable
* icon bubble
* label
* large amount
* small delta
* mini sparkline

Rules:

* 2x2 on desktop/laptop when possible
* not ultra narrow
* not too empty
* no awkward amount wrap
* income card uses teal/emerald/cyan
* expense card uses rose/magenta/coral
* card background has glass depth

If real sparkline data is not available, decorative sparkline is acceptable only as visual decoration. Do not fake financial values.

---

## 17. Expense by Category Card

Blueprint label:

```text
Expense by Category
```

Indonesian label is acceptable:

```text
Kategori terboros
```

But the visual must match blueprint.

Required:

* donut/progress ring
* top category
* amount
* category breakdown list if available
* link/button: View all categories or Lihat semua kategori

Rules:

* visually strong but not oversized
* must fit right column
* include colored category dots
* use cyan/violet/magenta/orange accents
* do not center everything with too much empty space
* if data is limited, show top category + simple distribution gracefully

---

## 18. Money Signals

Content:

* Pengeluaran hari ini
* Pengeluaran minggu ini
* Kategori terboros

Style:

* compact rows
* right-aligned values
* soft pill rows
* small colored status dots/icons
* readable in right/support area

Must not look like raw text list.

---

## 19. Mini Insight

Content:

* one short rule-based insight
* optional small tip badge
* optional decorative gem/cube

Rules:

* compact
* actionable
* readable
* no long paragraph
* no AI call
* no judgmental tone

Example:

```text
Bulan ini pengeluaran terbesar kamu ada di kategori Makanan.
Tip: Coba tetapkan batas mingguan untuk kategori ini.
```

---

## 20. Recent Transactions

Recent transactions must match blueprint quality.

Required:

* 3–5 rows
* icon
* transaction name
* category/payment metadata
* amount aligned right
* date/time if available
* income/expense visual distinction

Rules:

* must remain readable on MacBook 13 inch
* must not be squeezed outside viewport
* row height comfortable
* card should not be cut off
* amounts must align cleanly
* positive income uses emerald
* expense uses rose/coral

---

## 21. Cashflow Trend

Cashflow trend should span a wide area.

Blueprint direction:

```text
Cashflow trend spans left + center
```

Rules:

* must feel like a main dashboard section
* not leftover space
* should use paired bars or existing chart visual
* can be visual placeholder if no chart library, but labels and totals must be real where applicable
* should not become enormous vertical empty area
* must align with dashboard grid

---

## 22. Card System

Cards must use a consistent premium system.

Required card style:

```text
border: 1px solid rgba(255, 255, 255, 0.12)
background:
  linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))
box-shadow:
  0 24px 80px rgba(0,0,0,0.35),
  inset 0 1px 0 rgba(255,255,255,0.08)
border-radius: 24px–32px
```

Important cards may use stronger gradient overlays.

Avoid:

* flat #050505 cards
* invisible borders
* random card radius
* generic dark boxes
* cards with no depth

---

## 23. Decorative Visuals

Decorative visuals are allowed but must not block layout.

Allowed:

* CSS gradient orb
* CSS glow
* subtle grid/pattern
* simple cube/gem placeholder
* icon-based decorative element

Not required yet:

* final custom asset
* image file for cube
* perfect 3D illustration

Priority is still:

```text
layout + color + hierarchy + real data
```

---

## 24. Data Preservation

Dashboard must continue using real Supabase data.

Do not replace real values with static mock data.

Must preserve:

* month income
* month expense
* month balance
* today expense
* week expense
* top expense category
* recent transactions
* mini insight

Do not change:

* database schema
* auth
* protected routes
* transaction CRUD
* add transaction form
* transactions page logic
* Supabase helpers

---

## 25. Implementation Strategy

Do not keep patching the old dashboard layout if it prevents matching the blueprint.

Preferred approach:

```text
Build Dashboard V2 structure inside components/dashboard/web3-dashboard.tsx
using the real existing data props/functions.
```

Codex may restructure the component significantly.

Allowed:

* rewrite dashboard JSX layout
* create small local subcomponents inside dashboard file
* create helper components if simple
* improve CSS/Tailwind classes
* update app shell/sidebar only if necessary for layout safety

Not allowed:

* rewrite app auth
* rewrite Supabase logic
* remove real data
* change schema
* change unrelated pages
* add new chart library unless explicitly approved

---

## 26. What Not To Do

Do not:

* make dashboard look like current failed version
* make background flat dark
* force huge 3-column layout that overflows on MacBook 13
* let right column get cut off
* let transaction cards go outside viewport
* let currency wrap badly
* make KPI cards tall empty rectangles
* hide recent transactions below excessive scroll
* prioritize sidebar before dashboard structure
* fake Supabase values
* use static mock values for real financial metrics
* over-decorate before layout is correct

---

## 27. Acceptance Checklist

Implementation is acceptable only if:

* dashboard fits MacBook Air 13 inch viewport without horizontal overflow
* collapsed sidebar visually follows `dashboard-blueprint-collapsed.png`
* expanded sidebar visually follows `dashboard-blueprint-expanded.png`
* colors are visibly closer to the blueprint than the old dashboard
* background has layered navy/indigo depth and subtle grid
* cards have glass depth, border, and glow
* active sidebar item has gradient/glow
* top bar matches blueprint structure
* hero card matches blueprint hierarchy
* hero headline is `Know where your money moves.`
* balance amount does not wrap badly
* KPI cards are readable and balanced
* right column is visible and not squeezed
* category card has strong visual hierarchy
* money signals are compact and readable
* mini insight is compact and readable
* recent transactions are readable
* cashflow trend feels like a main dashboard section
* dashboard still uses real Supabase data
* add/transactions/auth flows are not broken
* mobile bottom nav still works
* `npm run lint` passes
* `npm run build` passes

---

## 28. Implementation Priority

If there is conflict between exact image matching and real responsive UI, prioritize:

1. MacBook Air 13 inch fit
2. no horizontal overflow
3. no card overlap
4. visual color match to blueprint
5. dashboard hierarchy
6. readability
7. real data preservation
8. sidebar behavior
9. decorative details

Do not prioritize decorative effects over layout correctness.

---

## 29. Final Instruction For Codex

Codex must not say “done” only because the page builds.

The result is only acceptable if it visually moves much closer to the blueprint.

Before implementation, Codex should restate:

* target viewport
* intended grid structure
* which files will change
* how it will preserve real data
* how it will avoid overflow

After implementation, Codex must report:

* changed files
* layout changes
* color changes
* real data preservation
* remaining limitations
* manual test steps
