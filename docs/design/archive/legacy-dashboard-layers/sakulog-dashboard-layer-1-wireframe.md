> Status: Archived / Superseded
> This document is historical only. Do not use it as the active source of truth for SakuLog V1.5. Use docs/product/PRD_V1_5.md and docs/design/dashboard-v1-5-design-direction.md instead.

# SakuLog Dashboard — Layer 1 Wireframe Spec

## 1. Purpose

Dokumen ini adalah spesifikasi **Layer 1 Wireframe** untuk rebuild dashboard SakuLog.

Fokus dokumen ini hanya:

- layout
- struktur grid
- posisi komponen
- proporsi dasar
- spacing dasar
- hierarchy dashboard
- target MacBook Air 13 inch

Dokumen ini **bukan** UI visual final.

Jangan fokus dulu ke:

- warna final
- glow
- glassmorphism detail
- animasi
- dekorasi Web3
- polish icon
- pixel-perfect styling

Tujuan utama Layer 1 adalah membuat struktur dashboard benar dulu.

---

## 2. Source of Truth

Gunakan gambar wireframe berikut sebagai source of truth utama:

```text
docs/design/dashboard-layer-1-wireframe.png

Jika nama file gambar berbeda, gunakan gambar Layer 1 Wireframe yang ada di folder docs/design.

Blueprint lama boleh dilihat hanya sebagai referensi sekunder, tetapi jangan jadikan acuan utama untuk warna atau visual polish.

Archived UI spec tidak boleh digunakan sebagai source of truth untuk task ini.

3. Target Viewport

Target utama:

MacBook Air 13 inch
1440 × 900 class viewport
Collapsed sidebar state

Dashboard harus nyaman di viewport ini.

Tidak boleh:

horizontal overflow
card overlap
right column terpotong
currency wrap aneh
grid memanjang tidak terkendali
cashflow trend terdorong terlalu jauh ke bawah
4. Scope

Task ini hanya untuk rebuild layout dashboard collapsed state.

Yang boleh diubah:

components/dashboard/web3-dashboard.tsx
file dashboard component kecil jika memang diperlukan

Yang tidak boleh diubah:

auth
Supabase schema
transaction CRUD
Add page
Transactions page
Settings page
database logic
protected routes
real data fetching

Real dashboard data harus tetap dipakai.

5. Dashboard Layout Structure

Dashboard harus mengikuti struktur utama berikut:

App Shell
├── Collapsed Sidebar
└── Main Content
    ├── Top Bar
    └── Dashboard Grid
        ├── Hero
        ├── KPI Grid 2x2
        ├── Expense by Category
        ├── Money Signals
        ├── Mini Insight
        ├── Recent Transactions
        └── Cashflow Trend
6. Collapsed Sidebar

Sidebar collapsed tetap ada di kiri.

Rules:

icon-only
slim
tidak mengambil banyak ruang
tidak perlu expanded behavior di task ini
jangan fokus polish sidebar dulu
cukup pastikan dashboard content menghitung area sidebar dengan benar
7. Top Bar

Top bar berada di atas area content.

Isi top bar:

title area: Dashboard
subtitle: Ringkasan keuanganmu secara real-time
search field
month selector
notification button
primary action button: Tambah Transaksi

Rules:

top bar harus full width di area content
search field boleh shrink
button tidak boleh keluar viewport
top bar tidak boleh membuat horizontal overflow
8. Main Grid Layout

Layer 1 harus menggunakan layout seperti wireframe:

Row 1
Hero | KPI Grid 2x2 | Expense by Category
Row 2
Cashflow Trend | Right Support Column

Dengan detail:

Left + Middle area:
- Hero di kiri atas
- KPI Grid 2x2 di tengah atas
- Cashflow Trend di bawah Hero + KPI

Right column:
- Expense by Category
- Money Signals
- Mini Insight
- Recent Transactions

Cashflow Trend harus berada langsung di bawah Hero + KPI area, bukan terdorong terlalu jauh ke bawah.

9. Hero Card

Hero card berada di kiri atas.

Isi wajib:

small label/pill: SakuLog Console
headline: Know where your money moves.
supporting text pendek
balance section/card

Rules:

hero menjadi anchor utama dashboard
hero lebih besar dari KPI cards
hero tidak boleh terlalu tinggi sampai membuat layout berat sebelah
balance amount harus tetap terbaca
tidak perlu dekorasi final dulu
10. KPI Grid

KPI Grid berada di tengah atas.

Harus berisi 4 card:

Pemasukan bulan ini
Pengeluaran bulan ini
Pengeluaran hari ini
Pengeluaran minggu ini

Layout:

KPI 1 | KPI 2
KPI 3 | KPI 4

Rules:

2x2 grid
setiap card proporsional
tidak terlalu kosong
label dan nominal harus terbaca
nominal jangan ellipsis kalau masih bisa dikecilkan responsive
jika perlu sparkline, gunakan placeholder sederhana
jangan pakai mock angka
angka tetap dari real data
11. Expense by Category

Expense by Category berada di kanan atas.

Isi wajib:

title
subtitle
donut/progress placeholder
top category
amount
simple category list atau fallback sederhana
button/link: Lihat semua kategori

Rules:

jangan donut besar di tengah sendirian
donut lebih baik di kiri
kategori/list di kanan
card compact
tidak terlalu tinggi
tidak banyak empty space

Jika breakdown real belum tersedia, gunakan data yang ada secara aman. Jangan membuat angka palsu besar.

12. Money Signals

Money Signals berada tepat di bawah Expense by Category dalam right column.

Isi:

Pengeluaran hari ini
Pengeluaran minggu ini
Kategori terboros

Rules:

compact
row kecil
label kiri
value kanan
tidak terlalu tinggi
tidak melebar berlebihan
tetap pakai real data
13. Mini Insight

Mini Insight berada di bawah Money Signals.

Isi:

insight pendek dari data real/rule-based
optional tip kecil

Rules:

compact
bukan text box besar
maksimal 1–2 kalimat pendek
tidak memakan banyak tinggi
14. Recent Transactions

Recent Transactions berada di bawah Mini Insight.

Isi per row:

nama transaksi
kategori
nominal
optional tanggal/jam kecil jika muat

Rules:

dashboard tidak perlu metadata panjang
jangan tampilkan payment method panjang jika membuat row sempit
amount harus rata kanan
amount tidak boleh wrap
nama transaksi boleh truncate
row harus compact
3–5 transaksi cukup
15. Cashflow Trend

Cashflow Trend berada di bawah Hero + KPI area.

Rules:

span left + middle area
tidak full right column
tidak terlalu rendah
tidak terlalu tinggi kosong
chart boleh sederhana
posisi dan ukuran lebih penting daripada chart detail
tetap gunakan real data kalau sudah ada
16. Layout Safety Rules

Gunakan pendekatan yang aman:

CSS grid
minmax()
min-w-0
responsive gap
whitespace-nowrap untuk nominal penting
truncate hanya untuk text panjang, bukan angka uang
no horizontal overflow
no absolute positioning untuk major layout

Jangan gunakan:

fixed width besar yang hanya cocok di monitor besar
layout patch lama
nested grid yang membuat right column turun jauh
chart besar yang mendorong card lain terlalu jauh
17. Implementation Strategy

Untuk task ini, lakukan rebuild dashboard layout dari nol berdasarkan wireframe.

Jangan patch struktur dashboard lama.

Allowed:

rewrite JSX layout dashboard
create small local components inside dashboard file
preserve existing data variables and formatter
simplify visual content while keeping real values

Not allowed:

change real data to mock data
change schema
change auth
change CRUD
change unrelated pages
focus on final color polish
18. Acceptance Checklist

Layer 1 dianggap berhasil jika:

collapsed dashboard mengikuti wireframe structure
top bar berada benar
hero berada kiri atas
KPI 2x2 berada tengah atas
expense category berada kanan atas
money signals berada di bawah category
mini insight berada di bawah money signals
recent transactions berada di bawah mini insight
cashflow trend berada langsung di bawah hero + KPI
tidak ada horizontal overflow
tidak ada card overlap
right column tidak terpotong
currency tidak wrap aneh
real data tetap dipakai
npm run lint lulus

Build boleh dilakukan nanti di fase QA berikutnya.

19. Important Reminder for Codex

Task ini bukan membuat visual final.

Jangan mengejar:

glow final
color perfection
Web3 decoration
pixel-perfect blueprint
expanded sidebar
mobile final polish

Fokus hanya:

layout structure first

Jika layout sudah benar, visual style akan dikerjakan di Layer 2 dan Layer 3.
