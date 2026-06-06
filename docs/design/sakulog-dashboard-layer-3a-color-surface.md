# SakuLog Dashboard — Layer 3A Color & Surface Foundation

## 1. Purpose

Dokumen ini adalah spesifikasi **Layer 3A — Color System & Surface Foundation** untuk dashboard SakuLog.

Layer 3A fokus hanya pada:

* warna dasar aplikasi
* background premium
* surface/card styling
* border
* placeholder color
* accent color system
* depth / subtle glow
* sidebar dan topbar surface

Layer 3A **bukan final dashboard UI**.

Jangan masuk dulu ke:

* real data rendering
* final copywriting
* chart final
* donut final
* KPI sparkline final
* decorative cube/gem final
* typography hierarchy final
* responsive final QA
* layout redesign

Tujuan Layer 3A adalah mengubah Layer 2 wireframe menjadi fondasi visual yang mulai terasa **premium Web3**, tetapi struktur tetap sama.

---

## 2. Source of Truth

Gunakan referensi visual utama:

```text
docs/design/dashboard-blueprint-collapsed.png
```

Jika nama file berbeda, gunakan gambar collapsed blueprint terbaru yang menunjukkan dashboard final direction dengan warna:

* dark navy background
* blue/cyan glow
* violet accent
* magenta accent
* glassy card surface
* premium Web3 dashboard feel

Gunakan struktur dari Layer 2:

```text
docs/design/dashboard-layer-2-structural-blueprint.png
docs/design/sakulog-dashboard-layer-2-structural-blueprint.md
```

Jangan gunakan archived UI spec lama sebagai acuan utama.

---

## 3. Layer Rules

Layer 3A harus mempertahankan:

* layout Layer 2
* ukuran card Layer 2
* grid Layer 2
* collapsed sidebar Layer 2
* skeleton/wireframe content mode
* placeholder content
* no real financial values
* no final dashboard data

Layer 3A hanya mengubah visual surface.

---

## 4. Visual Direction

Target visual:

```text
Premium dark Web3 dashboard
Modern financial console
Elegant, not flashy
Dark but not dead black
Glassy but still readable
Neon accents but controlled
Comfortable for eyes
```

Jangan membuat tampilan:

* terlalu abu-abu flat
* terlalu hitam polos
* terlalu neon
* terlalu ramai
* terlalu childish
* terlalu purple semua
* terlalu cyan semua
* terlalu terang

---

## 5. Core Color Palette

Gunakan warna berikut sebagai panduan utama.

### App Background

```css
--bg-deep: #030712;
--bg-navy: #06111f;
--bg-indigo: #0b1028;
--bg-violet-shadow: #17113a;
--bg-cyan-shadow: #042f3f;
```

Background utama harus terasa seperti:

```css
background:
  radial-gradient(circle at 78% 12%, rgba(34, 211, 238, 0.16), transparent 34%),
  radial-gradient(circle at 18% 18%, rgba(124, 58, 237, 0.18), transparent 32%),
  radial-gradient(circle at 50% 100%, rgba(168, 85, 247, 0.10), transparent 38%),
  linear-gradient(135deg, #030712 0%, #06111f 42%, #090b1f 100%);
```

Catatan:

* cyan glow harus terasa di kanan/atas
* violet/indigo glow harus terasa di kiri/bawah
* glow harus subtle, bukan mencolok
* base tetap dark navy

---

## 6. Main Canvas

Main canvas/dashboard area harus memakai warna gelap yang sedikit lebih terang dari app background.

Rekomendasi:

```css
--canvas: rgba(5, 13, 28, 0.82);
--canvas-border: rgba(125, 163, 255, 0.18);
--canvas-grid: rgba(148, 163, 184, 0.055);
```

Jika ada grid background, gunakan sangat subtle:

```css
linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px)
```

Grid size:

```css
background-size: 64px 64px;
```

Grid tidak boleh terlalu jelas.

---

## 7. Card Surface

Semua dashboard cards harus berubah dari wireframe flat menjadi glass navy surface.

Gunakan prinsip:

```css
--card-surface: rgba(8, 20, 38, 0.78);
--card-surface-soft: rgba(12, 25, 48, 0.72);
--card-surface-strong: rgba(15, 23, 42, 0.84);
--card-border: rgba(125, 163, 255, 0.22);
--card-border-hover: rgba(103, 232, 249, 0.30);
```

Card style direction:

```css
background:
  linear-gradient(145deg, rgba(15, 23, 42, 0.86), rgba(7, 16, 32, 0.76));
border: 1px solid rgba(125, 163, 255, 0.22);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.035),
  0 18px 48px rgba(0, 0, 0, 0.22);
backdrop-filter: blur(18px);
```

Cards should feel:

* deep
* soft
* premium
* slightly glassy
* not flat
* not over-glowing

---

## 8. Hero Surface

Hero card boleh sedikit lebih spesial dibanding card lain, tetapi jangan final polish berlebihan.

Hero background direction:

```css
background:
  radial-gradient(circle at 72% 28%, rgba(99, 102, 241, 0.20), transparent 34%),
  radial-gradient(circle at 18% 12%, rgba(124, 58, 237, 0.18), transparent 30%),
  linear-gradient(145deg, rgba(30, 27, 75, 0.72), rgba(8, 18, 36, 0.82));
```

Hero border:

```css
border: 1px solid rgba(167, 139, 250, 0.24);
```

Hero should look:

* more prominent than other cards
* softly violet/indigo
* still skeleton/wireframe
* not final decorative

---

## 9. Topbar Surface

Topbar should feel like a premium command bar.

Topbar background:

```css
background:
  linear-gradient(135deg, rgba(10, 21, 40, 0.86), rgba(8, 13, 30, 0.78));
border: 1px solid rgba(125, 163, 255, 0.22);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.04),
  0 12px 32px rgba(0, 0, 0, 0.18);
```

Topbar placeholders:

* search placeholder surface: rgba(15, 23, 42, 0.62)
* border: rgba(148, 163, 184, 0.20)
* active/action placeholder may use subtle violet/cyan accent

Do not restore real text yet.

---

## 10. Sidebar Surface

Sidebar rail should become more premium but stay subtle.

Rail background:

```css
background:
  linear-gradient(180deg, rgba(9, 14, 31, 0.94), rgba(3, 7, 18, 0.96));
border: 1px solid rgba(125, 163, 255, 0.22);
box-shadow:
  inset 0 1px 0 rgba(255, 255, 255, 0.04),
  0 20px 48px rgba(0, 0, 0, 0.32);
```

Active sidebar item:

```css
background:
  linear-gradient(135deg, rgba(59, 130, 246, 0.35), rgba(217, 70, 239, 0.34));
border: 1px solid rgba(103, 232, 249, 0.42);
box-shadow:
  0 0 24px rgba(34, 211, 238, 0.16),
  0 0 28px rgba(168, 85, 247, 0.16);
```

Inactive icons:

```css
color: rgba(203, 213, 225, 0.68);
border: rgba(148, 163, 184, 0.16);
background: rgba(15, 23, 42, 0.36);
```

Rules:

* active state boleh terlihat jelas
* inactive tetap tenang
* jangan membuat semua icon glowing
* jangan ubah layout sidebar

---

## 11. Placeholder Colors

Placeholder harus berubah dari gray flat menjadi slate-blue premium.

Primary placeholder:

```css
--placeholder-primary: rgba(203, 213, 225, 0.42);
```

Secondary placeholder:

```css
--placeholder-secondary: rgba(148, 163, 184, 0.28);
```

Muted placeholder:

```css
--placeholder-muted: rgba(100, 116, 139, 0.22);
```

Accent placeholder:

```css
--placeholder-cyan: rgba(34, 211, 238, 0.62);
--placeholder-violet: rgba(139, 92, 246, 0.60);
--placeholder-magenta: rgba(217, 70, 239, 0.58);
```

Rules:

* normal skeleton lines use slate-blue
* chart/sparkline placeholders may use cyan/violet/magenta accents
* do not turn every placeholder into neon color
* use accent colors only for important future data zones

---

## 12. Accent Color System

Gunakan accent secara disiplin.

### Cyan

Use for:

* income/positive placeholder
* primary technical accent
* chart income placeholder
* small active dots
* selected line details

Color:

```css
--accent-cyan: #22d3ee;
--accent-cyan-soft: rgba(34, 211, 238, 0.58);
--accent-cyan-glow: rgba(34, 211, 238, 0.18);
```

### Violet

Use for:

* navigation active
* premium highlight
* hero/brand accent
* secondary chart/surface detail

Color:

```css
--accent-violet: #8b5cf6;
--accent-violet-soft: rgba(139, 92, 246, 0.58);
--accent-violet-glow: rgba(139, 92, 246, 0.18);
```

### Magenta

Use for:

* expense/attention placeholder
* CTA secondary accent
* donut/sparkline contrast later

Color:

```css
--accent-magenta: #d946ef;
--accent-magenta-soft: rgba(217, 70, 239, 0.56);
--accent-magenta-glow: rgba(217, 70, 239, 0.18);
```

### Emerald

Use minimally for positive status.

```css
--accent-emerald: #34d399;
```

Rules:

* cyan/violet/magenta should be visible
* but not everywhere
* no rainbow effect
* no over-saturated neon background

---

## 13. CTA / Button Placeholder

The main action placeholder/button in topbar should already hint at final premium style.

Recommended:

```css
background:
  linear-gradient(135deg, #6366f1 0%, #8b5cf6 48%, #d946ef 100%);
border: 1px solid rgba(255, 255, 255, 0.12);
box-shadow:
  0 14px 32px rgba(139, 92, 246, 0.22),
  inset 0 1px 0 rgba(255, 255, 255, 0.14);
```

But keep it as placeholder/skeleton if Layer 3A is still not restoring real text.

---

## 14. Chart Placeholder Styling

Cashflow chart and KPI sparkline placeholders should start to look intentional.

Cashflow bars:

* income bar placeholder: cyan gradient
* expense bar placeholder: magenta gradient
* muted background bars: slate-blue outline

Allowed:

```css
background: linear-gradient(180deg, rgba(45, 212, 191, 0.72), rgba(34, 211, 238, 0.22));
background: linear-gradient(180deg, rgba(236, 72, 153, 0.72), rgba(217, 70, 239, 0.22));
```

KPI sparkline placeholders:

* thin but visible
* cyan/violet/magenta depending on KPI tone
* do not make real charts yet

Rules:

* charts remain placeholders
* no chart library work in Layer 3A
* no data restoration

---

## 15. Expense Category Placeholder

Expense by Category remains placeholder, but should hint at final donut visual.

Allowed:

* donut stroke can use cyan/violet/magenta muted segments
* category bullets can use accent dots
* list placeholders remain slate-blue
* button placeholder may have soft border

Not allowed:

* real category names
* real percentages
* final chart logic
* chart library work

---

## 16. Depth and Glow Rules

Use glow carefully.

Allowed glow:

```css
box-shadow:
  0 0 32px rgba(34, 211, 238, 0.08),
  0 0 42px rgba(139, 92, 246, 0.08);
```

Not allowed:

```css
huge neon glow
bright outer ring everywhere
high saturation backgrounds
glow on every element
```

Glow should be:

* subtle
* selective
* mostly hero, active sidebar, CTA, chart accents
* barely visible on normal cards

---

## 17. Text / Label Colors

Even in skeleton mode, zone labels should be readable but not dominant.

Label color:

```css
--text-primary: rgba(248, 250, 252, 0.88);
--text-secondary: rgba(203, 213, 225, 0.68);
--text-muted: rgba(148, 163, 184, 0.54);
```

Rules:

* zone labels can stay visible
* do not restore final real copy
* do not make labels bright white everywhere

---

## 18. Layer 3A Implementation Scope

Expected files:

```text
components/dashboard/web3-dashboard.tsx
components/layout/app-shell.tsx
components/layout/app-sidebar.tsx
app/globals.css
```

Only touch these if needed.

Do not modify:

```text
Supabase files
auth files
transactions page
add page
settings page
database schema
report logic
docs archive
```

---

## 19. Acceptance Checklist

Layer 3A is successful if:

* dashboard still uses Layer 2 layout
* dashboard still skeleton/wireframe mode
* colors are visibly more premium than Layer 2
* background has subtle dark navy/cyan/violet depth
* cards feel glassy/dark navy, not flat
* borders are soft blue/indigo
* placeholder lines look premium slate-blue
* accents cyan/violet/magenta are visible but controlled
* sidebar active state feels premium
* topbar feels like a command bar
* chart placeholders start to hint at final data visualization
* no real dashboard data is restored
* no final copy is restored
* no layout shift
* no overlap
* no horizontal overflow
* npm run lint passes

---

## 20. Important Reminder

Layer 3A is **not** the final dashboard.

Correct sequence:

```text
Layer 3A — Color System & Surface Foundation
Layer 3B — Typography & Visual Hierarchy
Layer 3C — Restore Real Dashboard Content
Layer 3D — Charts / Sparkline / Donut
Layer 3E — Final Polish
```

If uncertain, choose:

```text
preserve layout > add visual
subtle premium > loud neon
clear surface > complex decoration
controlled accent > colorful chaos
```
