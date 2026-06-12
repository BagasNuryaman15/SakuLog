> Status: Archived / Superseded
> This document is historical only. Do not use it as the active source of truth for SakuLog V1.5. Use docs/product/PRD_V1_5.md and docs/design/dashboard-v1-5-design-direction.md instead.

# SakuLog Dashboard — Layer 2 Structural Blueprint

## 1. Purpose

Dokumen ini adalah spesifikasi **Layer 2 Structural Blueprint** untuk dashboard SakuLog.

Layer 2 fokus pada:

* proporsi layout
* ukuran card
* tinggi section
* lebar kolom
* spacing antar elemen
* alignment
* density dashboard
* kesiapan struktur sebelum visual final

Layer 2 **bukan** visual final.

Jangan fokus dulu ke:

* warna final
* glow final
* glassmorphism detail
* animasi
* decorative Web3 assets
* real final copywriting
* pixel-perfect final UI

Tujuan Layer 2 adalah membuat dashboard wireframe yang sudah ada menjadi lebih **proporsional, terukur, dan siap untuk Layer 3 visual styling**.

---

## 2. Source of Truth

Gunakan dokumen dan gambar berikut sebagai source of truth utama:

```text
docs/design/sakulog-dashboard-layer-2-structural-blueprint.md
docs/design/dashboard-layer-2-structural-blueprint.png
```

Gunakan Layer 1 hanya sebagai referensi struktur dasar:

```text
docs/design/sakulog-dashboard-layer-1-wireframe.md
docs/design/dashboard-layer-1-wireframe.png
```

Jangan gunakan archived UI spec sebagai source of truth.

Archived UI spec hanya arsip historis, bukan acuan untuk task Layer 2.

---

## 3. Current Layer Status

Layer 1 sudah selesai dan sudah di-commit.

Layer 1 berhasil mengunci:

* dashboard wireframe mode
* collapsed sidebar
* topbar
* hero placement
* KPI 2x2 placement
* right rail placement
* cashflow placement
* no final content rendering
* no final Web3 styling

Layer 2 tidak boleh merusak struktur Layer 1.

---

## 4. Target Viewport

Target utama:

```text
MacBook Air 13 inch
1440 × 900 class viewport
Collapsed sidebar state
```

Dashboard harus nyaman dibaca pada ukuran tersebut.

Layer 2 harus menghindari:

* horizontal overflow
* card overlap
* right column terpotong
* card terlalu tinggi
* card terlalu renggang
* cashflow terlalu turun
* recent transactions terlalu jauh di bawah
* topbar terlalu memakan tinggi viewport

---

## 5. Structural Targets

Gunakan ukuran berikut sebagai panduan, bukan aturan pixel-perfect.

```text
Viewport target: 1440 × 900
Collapsed sidebar layout width: 88px
Outer content padding: 24px
Grid gap: 16px
Card radius: 24px
Top bar height: 72–76px
Main content max width: ~1240px
Right rail width: 320–340px
Hero height: ~380–400px
KPI card height: ~180–190px each
Cashflow trend height: ~280–320px
```

Jika viewport nyata sedikit berbeda karena browser chrome, gunakan `clamp()`, `minmax()`, dan responsive rules agar tetap aman.

---

## 6. Layout Structure

Pertahankan struktur dashboard Layer 1:

```text
Collapsed Sidebar | Main Content

Main Content:
├── Top Bar
└── Dashboard Grid
    ├── Hero
    ├── KPI Grid 2x2
    ├── Right Rail
    │   ├── Expense by Category
    │   ├── Money Signals
    │   ├── Mini Insight
    │   └── Recent Transactions
    └── Cashflow Trend
```

Desktop collapsed layout:

```text
Row 1:
Hero | KPI Grid 2x2 | Expense by Category

Row 2:
Cashflow Trend spans Hero + KPI columns
Right Rail continues vertically
```

Cashflow Trend harus berada langsung di bawah Hero + KPI area.

Jangan biarkan Cashflow Trend terdorong terlalu jauh ke bawah karena tinggi right rail.

---

## 7. Sidebar Structural Rules

Sidebar collapsed tetap berupa floating rounded rail.

Rules:

* visual rail tidak menempel seperti full-height wall
* outer sidebar area boleh full height untuk layout
* inner sidebar rail harus floating
* width layout sekitar 88px
* rail width visual sekitar 64–72px
* rail punya margin top/bottom
* rail punya radius besar
* icon group compact dan rapi
* avatar/status tetap di bawah rail
* jangan mengubah expanded sidebar di Layer 2

Layer 2 hanya boleh menyesuaikan:

* spacing icon
* alignment icon
* rail width visual
* rail margin
* active item size
* bottom avatar spacing

Jangan masuk ke visual final glow/sidebar color polish.

---

## 8. Top Bar Structural Rules

Top bar harus lebih compact dan tidak mengambil terlalu banyak tinggi.

Target:

```text
Top bar height: 72–76px
```

Isi topbar pada Layer 2 tetap placeholder/wireframe:

* search area
* month selector placeholder
* notification placeholder
* action button placeholder

Rules:

* topbar full width di area content
* topbar tidak boleh terlalu tinggi
* topbar harus sejajar dengan grid bawah
* search field boleh fleksibel
* action placeholder tidak boleh overflow
* gap internal topbar harus konsisten

---

## 9. Main Grid Structural Rules

Gunakan CSS grid sebagai dasar.

Target desktop collapsed:

```text
Main grid columns:
Hero column: flexible large
KPI column: fixed/flexible medium
Right rail: 320–340px
```

Rekomendasi:

```css
grid-template-columns:
  minmax(420px, 1.35fr)
  minmax(360px, 0.95fr)
  minmax(320px, 340px);
gap: 16px;
```

Catatan:

* angka dapat disesuaikan berdasarkan implementasi nyata
* jangan gunakan fixed width besar yang menyebabkan overflow
* gunakan `min-w-0`
* gunakan `minmax()`
* gunakan `clamp()` bila perlu

---

## 10. Hero Structural Rules

Hero adalah anchor utama kiri atas.

Target:

```text
Hero height: ~380–400px
```

Rules:

* hero lebih besar dari KPI card
* hero tidak boleh terlalu tinggi sampai cashflow turun
* hero tidak boleh terlalu pendek
* internal balance block berada di bawah kiri/area bawah
* placeholder image/decorative block boleh ada, tapi tetap wireframe
* jangan masukkan final cube/glow asset di Layer 2

Hero structure:

```text
Hero
├── small pill placeholder
├── title lines placeholder
├── subtitle lines placeholder
├── optional image placeholder
└── balance block placeholder
```

---

## 11. KPI Grid Structural Rules

KPI Grid berada di tengah atas.

Target:

```text
KPI Grid = 2 columns × 2 rows
Each KPI card height: ~180–190px
Total KPI grid height should align with Hero height
```

Rules:

* KPI grid harus sejajar tinggi dengan hero
* setiap KPI card tidak boleh terlalu kosong
* icon placeholder di atas kiri
* label placeholder di bawah icon
* amount placeholder di tengah
* sparkline/line placeholder di bawah
* semua KPI card punya ukuran konsisten
* gap antar KPI card: 16px

KPI cards:

```text
KPI 1 — Pemasukan bulan ini
KPI 2 — Pengeluaran bulan ini
KPI 3 — Pengeluaran hari ini
KPI 4 — Pengeluaran minggu ini
```

Di Layer 2, label boleh tetap berupa zone label/placeholder. Jangan masukkan real final data dulu jika dashboard masih dalam wireframe mode.

---

## 12. Right Rail Structural Rules

Right rail adalah kolom kanan.

Target:

```text
Right rail width: 320–340px
```

Right rail berisi:

```text
Expense by Category
Money Signals
Mini Insight
Recent Transactions
```

Rules:

* right rail harus compact
* right rail tidak boleh terlalu lebar
* right rail tidak boleh terlalu sempit sampai content tidak terbaca
* vertical gap antar card: 16px
* recent transactions minimal header dan beberapa rows terlihat di MacBook 13 inch
* jangan membuat right rail turun jauh tanpa alasan

---

## 13. Expense by Category Structural Rules

Expense by Category berada di kanan atas.

Target:

```text
Height: ~210–240px
```

Structure:

```text
Expense by Category
├── title
├── donut/progress placeholder on left
├── category list placeholder on right
└── button/link placeholder at bottom
```

Rules:

* donut jangan besar di tengah sendirian
* donut berada di kiri
* list berada di kanan
* button di bawah
* card compact
* tidak banyak empty space
* jangan pakai final colorful donut di Layer 2

---

## 14. Money Signals Structural Rules

Money Signals berada langsung di bawah Expense by Category.

Target:

```text
Height: ~130–160px
```

Structure:

```text
Money Signals
├── row 1
├── row 2
└── row 3
```

Rules:

* row kecil dan compact
* label kiri
* value placeholder kanan
* status dot/indicator placeholder kanan
* jangan terlalu tinggi
* jangan terlalu banyak text
* tetap wireframe

---

## 15. Mini Insight Structural Rules

Mini Insight berada di bawah Money Signals.

Target:

```text
Height: ~90–120px
```

Structure:

```text
Mini Insight
├── small icon/image placeholder
├── 1–2 line placeholder
└── optional tiny badge placeholder
```

Rules:

* compact
* tidak seperti text box besar
* jangan terlalu tinggi
* tidak perlu decorative gem final di Layer 2

---

## 16. Recent Transactions Structural Rules

Recent Transactions berada di bawah Mini Insight.

Target:

```text
Height: flexible, remaining right rail space
Minimum visible: header + 3 rows
```

Structure per row:

```text
icon placeholder | name/category placeholders | amount placeholder
```

Rules:

* row compact
* jangan tampilkan metadata panjang
* amount area di kanan
* 3–5 rows cukup
* jangan membuat row terlalu chunky
* jangan membuat card terlalu tinggi sampai keluar viewport
* jika perlu, recent transactions boleh scroll internal nanti di Layer 3, tetapi Layer 2 cukup struktur visible

---

## 17. Cashflow Trend Structural Rules

Cashflow Trend berada di bawah Hero + KPI.

Target:

```text
Cashflow Trend height: ~280–320px
```

Rules:

* span left + middle columns
* tidak mengambil right rail
* chart area visible
* tidak terlalu tinggi kosong
* tidak terlalu rendah
* title dan controls di atas chart
* chart placeholder boleh sederhana
* posisi lebih penting daripada detail chart

Cashflow structure:

```text
Cashflow Trend
├── title
├── legend/filter placeholder
└── chart placeholder
```

---

## 18. Spacing Rules

Gunakan spacing system konsisten:

```text
Outer page/content padding: 24px
Grid gap: 16px
Card padding: 18–24px
Internal component gap: 8–12px
Sidebar rail internal gap: 12–16px
```

Rules:

* jangan pakai gap acak
* jangan membuat topbar terlalu jauh dari dashboard grid
* jangan membuat right rail terlalu renggang
* jangan membuat cashflow terlalu jauh dari hero/KPI
* gunakan rhythm 8px/16px/24px

---

## 19. Border Radius Rules

Gunakan radius konsisten:

```text
Main card radius: 24px
Small card radius: 18–20px
Pill radius: full / 999px
Icon button radius: 14–16px
Sidebar rail radius: 28–32px
```

Layer 2 tidak butuh shadow/glow final.

---

## 20. Wireframe Visual Rules

Layer 2 tetap wireframe/blueprint mode.

Allowed:

* outline cards
* muted placeholder lines
* placeholder blocks
* simple chart skeleton
* simple donut skeleton
* structural labels
* subtle dark surfaces

Not allowed:

* real final copy
* real final colorful Web3 styling
* gradient-heavy final cards
* decorative cube/gem asset final
* glow-heavy visual
* mock financial numbers as final content

Jika memakai placeholder angka dalam blueprint image/spec, itu hanya untuk structural reference, bukan data final.

---

## 21. Data Rules

Layer 2 boleh mempertahankan real data fetching di code untuk nanti.

Namun tampilan Layer 2 masih boleh tetap skeleton/wireframe.

Jangan:

* menghapus data fetching yang sudah ada
* mengubah schema
* mengubah Supabase logic
* mengubah auth
* mengubah CRUD
* mengubah formatter utama

Boleh:

* menyembunyikan real data dari UI selama wireframe mode
* menjaga variabel data tetap ada untuk Layer 3
* menggunakan placeholder visual untuk layout

---

## 22. Implementation Strategy for Codex

Ketika implement Layer 2:

1. Jangan rebuild dari nol total jika Layer 1 sudah benar.
2. Pertahankan struktur dashboard Layer 1.
3. Sesuaikan ukuran, spacing, height, width, alignment.
4. Jangan ubah visual final.
5. Jangan tampilkan real content final.
6. Jangan menyentuh page lain.
7. Jalankan `npm run lint`.
8. Jangan push sebelum approval.

---

## 23. Acceptance Checklist

Layer 2 dianggap berhasil jika:

* topbar lebih compact dan proporsional
* sidebar rail tetap floating dan rapi
* hero height stabil sekitar 380–400px
* KPI grid 2x2 sejajar dengan hero
* KPI card tidak terlalu kosong
* right rail width stabil sekitar 320–340px
* expense category compact dengan donut kiri dan list kanan
* money signals berada langsung di bawah expense category
* mini insight compact
* recent transactions header + beberapa rows terlihat
* cashflow trend langsung di bawah hero + KPI
* cashflow height tidak berlebihan
* spacing antar card konsisten
* tidak ada horizontal overflow
* tidak ada card overlap
* tidak ada visual final yang dipaksakan
* wireframe mode tetap terjaga
* `npm run lint` pass

---

## 24. Important Reminder

Layer 2 adalah tahap struktur.

Jangan mencoba membuat dashboard final.

Urutan kerja yang benar:

```text
Layer 1: layout/wireframe foundation ✅
Layer 2: structural proportions ⬅ current
Layer 3: visual Web3 styling + real dashboard content later
```

Jika ragu antara membuat visual lebih cantik atau menjaga struktur lebih stabil, pilih struktur.
