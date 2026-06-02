# SakuLog Dashboard UI Spec

## 1. Purpose

Dokumen ini adalah UI specification resmi untuk redesign dashboard SakuLog.

Codex harus menggunakan dokumen ini bersama dua gambar blueprint yang tersedia di folder ini:

```text
docs/design/dashboard-blueprint-collapsed.png
docs/design/dashboard-blueprint-expanded.png
```

Dokumen ini bukan inspirasi bebas. Dokumen ini adalah kontrak layout dan visual.

---

## 2. Source of Truth

### Primary Blueprint A

```text
docs/design/dashboard-blueprint-collapsed.png
```

Ini adalah acuan utama untuk dashboard desktop default.

State ini memakai:

* slim icon-only sidebar
* main dashboard grid yang lega
* hero summary card di kiri
* KPI cards di tengah
* kategori / signals / insight / transaksi di kanan
* cashflow trend di bawah

Codex harus menganggap gambar ini sebagai **default desktop dashboard layout**.

---

### Primary Blueprint B

```text
docs/design/dashboard-blueprint-expanded.png
```

Ini adalah acuan utama untuk dashboard desktop saat sidebar expanded.

State ini memakai:

* expanded sidebar sekitar 248–264px
* logo + label brand terlihat
* navigasi dengan icon + text label
* section grouping
* user/session area di bawah
* main content tetap reflow dengan aman
* card tidak overlap
* currency tidak wrap aneh
* dashboard tetap terasa lega

Codex harus menganggap gambar ini sebagai **expanded sidebar layout behavior**.

---

## 3. Important Design Intent

SakuLog harus terasa seperti:

```text
Web3-inspired premium personal finance dashboard
```

Bukan:

```text
basic admin dashboard
beginner Tailwind project
plain dark mode
crypto app yang membingungkan
white corporate dashboard
```

Visual direction:

* dark premium
* modern Web3 feel
* glassmorphism
* subtle glow
* deep navy / black / indigo
* cyan, violet, magenta accent
* emerald for income
* coral/rose for expense
* spacious dashboard
* professional UI/UX hierarchy
* readable and usable

---

## 4. Dashboard Copy

Hero headline harus menggunakan:

```text
Know where your money moves.
```

Jangan gunakan:

```text
Uangku habis ke mana?
```

Supporting text boleh tetap bahasa Indonesia.

Contoh:

```text
Ringkasan Juni 2026 untuk memahami sisa uang, cashflow, dan kategori yang paling banyak menguras saldo.
```

---

## 5. Sidebar States

### 5.1 Collapsed Sidebar

Acuan:

```text
dashboard-blueprint-collapsed.png
```

Collapsed sidebar adalah default desktop state.

Rules:

* width sekitar 72–88px
* icon-only navigation
* compact SakuLog brand mark di atas
* active item memakai glow / gradient
* tidak menampilkan label menu
* tidak mengambil terlalu banyak ruang
* main content harus terasa lega
* cocok untuk dashboard/report yang butuh banyak area

Collapsed sidebar harus terasa premium, bukan sekadar icon column biasa.

---

### 5.2 Expanded Sidebar

Acuan:

```text
dashboard-blueprint-expanded.png
```

Expanded sidebar digunakan saat user hover/click/toggle sidebar.

Rules:

* width sekitar 248–264px
* logo + text “SakuLog” terlihat
* optional subtitle seperti “Console” boleh digunakan
* navigation item menampilkan icon + label
* navigation harus dikelompokkan
* user/session/logout area berada di bawah
* active item memakai glow / gradient
* expanded sidebar tidak boleh menutupi card utama secara rusak
* main content harus reflow, bukan overlap
* tidak boleh ada horizontal overflow

Suggested grouping:

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

Navigation label boleh disesuaikan dengan route yang sudah ada, tetapi jangan menambah fitur baru yang belum ada.

---

## 6. Dashboard Layout Contract

Dashboard desktop harus menggunakan struktur utama berikut:

```text
App Shell
├── Sidebar
└── Main Content
    ├── Top Bar
    └── Dashboard Grid
        ├── Left Area
        ├── Middle KPI Area
        ├── Right Support Area
        └── Bottom Area
```

---

## 7. Top Bar

Top bar berada di dalam main content, bukan di dalam sidebar.

Top bar harus berisi:

* Page title area: Dashboard
* Subtitle: Ringkasan keuanganmu secara real-time
* Search field / command style input
* Month selector
* Notification icon
* Primary CTA: Tambah Transaksi

Rules:

* top bar full width di area konten
* tidak overlap dengan sidebar
* tinggi tidak berlebihan
* terlihat seperti bagian premium dashboard
* CTA memakai gradient violet/magenta
* search field memakai dark glass style

---

## 8. Desktop Grid Structure

Grid harus terasa seperti 3 kolom.

Suggested desktop logic:

```text
Left column:
- Hero summary card
- Balance card inside hero

Middle column:
- KPI cards 2x2

Right column:
- Kategori terboros
- Money signals
- Mini insight
- Recent transactions

Bottom:
- Cashflow trend section spanning left/middle area
```

Dashboard tidak boleh terasa seperti card-card yang ditempel acak.

---

## 9. Hero Card

Hero card berada di area kiri.

Content:

* small pill: SakuLog Console
* headline: Know where your money moves.
* short supporting text
* balance card / sisa uang bulan ini
* optional decorative Web3 cube/glow illustration if implemented safely

Rules:

* hero card penting, tapi tidak boleh terlalu dominan
* hero card tidak boleh membuat KPI card terlalu sempit
* hero card tidak boleh terlalu tinggi sampai mendorong section lain terlalu jauh
* headline harus readable
* balance amount tidak boleh wrap aneh

Balance amount rules:

```text
Rp1.425.000 should stay on one line when possible.
If viewport is narrow, reduce font-size responsively before wrapping.
```

---

## 10. KPI Cards

KPI cards berada di middle area.

Required KPI:

* Pemasukan bulan ini
* Pengeluaran bulan ini
* Pengeluaran hari ini
* Pengeluaran minggu ini

Rules:

* 2x2 grid on desktop when space allows
* each card must be readable
* each card must have enough width
* amount should not wrap awkwardly
* income uses emerald/cyan accent
* expense uses coral/rose accent
* cards should not feel empty or too tall
* cards should not become ultra narrow in expanded sidebar mode

Optional visual details:

* icon bubble
* mini sparkline placeholder
* small comparison text

But do not fake important financial values.

---

## 11. Right Support Column

Right column contains supporting financial context.

Required sections:

1. Kategori terboros
2. Money signals
3. Mini insight
4. Recent transactions

Rules:

* right column must feel intentional
* cards must align vertically
* recent transactions must remain readable
* no cramped transaction list
* no random stacking without hierarchy

---

## 12. Kategori Terboros Card

Content:

* title: Kategori terboros
* subtitle: Expense bulan ini
* visual ring/donut/progress
* top category name
* amount
* optional category breakdown

Rules:

* should be visually strong
* should not be oversized
* should not dominate the whole dashboard
* use accent colors: violet/cyan/rose
* if no data, show elegant empty state

---

## 13. Money Signals

Content:

* Pengeluaran hari ini
* Pengeluaran minggu ini
* Kategori terboros

Rules:

* quick scan
* small rows / pills
* right-aligned values
* should be readable at a glance

---

## 14. Mini Insight

Content:

* simple rule-based insight
* no AI
* short and helpful

Examples:

```text
Bulan ini pengeluaran terbesar kamu ada di kategori Jajan.
Cashflow bulan ini masih positif.
Pengeluaran bulan ini lebih besar dari pemasukan.
```

Rules:

* no judgmental tone
* no long paragraph
* must be readable

---

## 15. Recent Transactions

Content:

* 3–5 most recent transactions
* name
* category
* amount
* date/time if available
* income/expense distinction

Rules:

* recent transactions must not be squeezed
* rows must have clear spacing
* expense uses rose/coral accent
* income uses emerald/cyan accent
* amount alignment should be clean

---

## 16. Cashflow Trend

Cashflow trend appears in bottom area.

Rules:

* spans wide area, preferably left/middle
* should feel like a real dashboard section
* not leftover space
* can use current visual placeholder if chart library not implemented
* should not break real dashboard data

If no chart library is used, visual bars/placeholders are acceptable as long as text values remain real.

---

## 17. Color Tokens

Preferred palette:

```text
background-deep: #040617
background-navy: #07111f
background-indigo: #130b2d
surface-glass: rgba(255, 255, 255, 0.06)
surface-glass-strong: rgba(255, 255, 255, 0.10)
border-soft: rgba(255, 255, 255, 0.12)
text-primary: #F8FAFC
text-secondary: #A8B0C3
text-muted: #6F7890

accent-cyan: #4DE7FF
accent-violet: #8B5CF6
accent-magenta: #EC4899
income-emerald: #34D399
expense-rose: #FB7185
warning-amber: #FBBF24
```

Do not use flat default green as the primary UI color.

---

## 18. Typography

Preferred font:

```text
Plus Jakarta Sans
```

Alternative:

```text
Manrope
Geist
```

Typography rules:

* large hero headline
* readable amount numbers
* card label smaller and muted
* title hierarchy consistent
* avoid tiny unreadable text
* avoid oversized text that causes wrapping

Suggested hierarchy:

```text
Hero title: 48–64px desktop
Page title: 24–32px
Card title: 14–18px
Amount large: 32–48px
KPI amount: 22–30px
Body: 14–16px
Caption: 12–13px
```

Use responsive font sizes.

---

## 19. Spacing and Radius

Suggested values:

```text
page padding desktop: 24–32px
card gap: 16–24px
card padding: 20–28px
card radius: 24–32px
small element radius: 12–18px
```

Rules:

* spacing must be consistent
* dashboard should feel spacious
* card gaps should align
* do not use random margins

---

## 20. Layout Safety Rules

Codex must prevent:

* card overlap
* text overflow
* horizontal scroll on desktop
* awkward wrapping of currency
* hero card dominating too much
* KPI cards becoming too narrow
* right column becoming unreadable
* expanded sidebar breaking the grid

Use:

* CSS grid
* minmax()
* max-width container
* responsive breakpoints
* clamp() for large typography if needed
* overflow-safe rules

Avoid:

* fragile absolute positioning for main cards
* hardcoded magic pixel hacks
* layout that only works at one screen size

---

## 21. Data Preservation Rules

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
* transaction CRUD
* auth flow
* protected routes
* add transaction form
* transactions page logic

---

## 22. Mobile Rules

Mobile is not the primary target of this spec, but must not break.

Rules:

* keep bottom navigation
* avoid sidebar on mobile
* stack dashboard cards vertically
* keep values readable
* no horizontal overflow

---

## 23. Acceptance Checklist

Implementation is acceptable only if:

* collapsed sidebar matches the spirit of `dashboard-blueprint-collapsed.png`
* expanded sidebar matches the spirit of `dashboard-blueprint-expanded.png`
* sidebar collapsed and expanded states are visually distinct
* main content reflows safely when sidebar expands
* no card overlap
* no text overflow
* large currency values do not wrap badly
* hero headline is `Know where your money moves.`
* dashboard still uses real Supabase data
* top bar remains inside content area
* KPI cards are readable
* right column feels intentional
* recent transactions are readable
* cashflow trend feels like a real section
* dark Web3 premium visual identity remains
* mobile bottom navigation still works
* `npm run lint` passes
* `npm run build` passes

---

## 24. Implementation Priority

If exact visual matching is not possible, prioritize in this order:

1. Layout structure
2. No overlap
3. Readability
4. Sidebar behavior
5. Card proportions
6. Real data preservation
7. Premium Web3 visual polish
8. Decorative details

Do not prioritize decoration over layout correctness.

## Asset Note

Logo mark and hero illustration may be added later as fixed assets in:

- `docs/design/assets/sakulog-logo-mark.png`
- `docs/design/assets/sakulog-hero-illustration.png`

For now, Codex should prioritize layout structure, spacing, sidebar behavior, typography, and dashboard hierarchy before decorative asset replacement.