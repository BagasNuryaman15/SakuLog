# SakuLog V1.5 PRD

# PRD SakuLog V1.5 — Stabilization, Dashboard Diet, and Reports Upgrade

## 1. Product Summary

SakuLog adalah aplikasi personal finance untuk membantu user mencatat pemasukan dan pengeluaran, memahami ke mana uang bergerak, dan membangun kebiasaan finansial yang lebih sadar.

Masalah utama yang ingin diselesaikan SakuLog adalah:

> User sering merasa uang cepat habis, tetapi tidak tahu uang itu habis ke mana, lewat metode pembayaran apa, dan pola pengeluarannya seperti apa.

SakuLog V1 sudah membuktikan fondasi produk:

* user bisa login,
* user bisa mencatat pengeluaran dan pemasukan,
* user bisa melihat dashboard,
* user bisa melihat, mengedit, dan menghapus transaksi,
* user bisa melihat laporan periode dasar,
* data tersimpan di Supabase dengan user isolation.

Namun, setelah evaluasi produk, ditemukan masalah penting:

> Dashboard terlalu banyak mengambil peran Reports, sedangkan Reports belum punya fungsi analisis yang cukup kuat.

Karena itu, SakuLog tidak langsung masuk V2. Produk perlu melewati fase V1.5 terlebih dahulu.

## 2. Product Version Decision

### Keputusan

SakuLog masuk ke tahap:

> V1.5 — Stabilization & Product Clarity

Bukan langsung V2.

### Alasan

V1.5 dibutuhkan karena produk sudah usable secara teknis, tetapi belum rapi secara information architecture. Dashboard, Reports, dan beberapa area UX masih perlu dipisahkan perannya agar aplikasi lebih jelas, nyaman dipakai harian, dan tidak terasa seperti kumpulan komponen visual.

### V2 Ditunda

V2 hanya akan dibahas setelah V1.5 selesai dan stabil.

V2 dapat berisi fitur besar seperti:

* budgeting system,
* wants & needs planning,
* AI insight,
* export PDF/Excel,
* recurring transactions,
* custom categories,
* advanced search,
* public portfolio polish,
* multi-device refinement.

Fitur-fitur tersebut tidak masuk scope utama V1.5.

## 3. Core Product Principle

SakuLog V1.5 harus mengikuti prinsip berikut:

> Dashboard menjawab kondisi sekarang.
> Reports menjawab penyebab dan pola.
> Transactions menyimpan dan mengoreksi data mentah.
> Add menjadi jalur input cepat.
> Settings menjaga kontrol sesi dan preferensi dasar.

Produk tidak boleh menumpuk semua informasi di Dashboard.

Dashboard harus cepat dibaca. Reports harus lebih dalam. Transactions harus dipercaya. Add harus cepat. Settings harus tidak terasa kosong.

## 4. Target User

Target utama V1.5 adalah single user personal finance.

User memiliki pola:

* mencatat pengeluaran harian,
* mencatat pemasukan dari orang tua, trading, investasi, freelance, atau sumber lain,
* sering menggunakan Cash, QRIS/M-Banking, E-wallet, dan kemungkinan kartu debit/ATM,
* ingin tahu mengapa uang cepat habis,
* ingin tahu metode pembayaran mana yang paling membuat uang bocor,
* butuh aplikasi yang enak dipakai harian, bukan sistem accounting berat.

## 5. Problem Statement

### Problem 1 — Dashboard Terlalu Penuh

Dashboard saat ini terlalu banyak menampilkan informasi analitis. Akibatnya:

* Dashboard terasa seperti Reports,
* Reports kehilangan alasan untuk dibuka,
* user bisa bingung membedakan halaman,
* visual terlihat impresif tetapi fungsi halaman menjadi tumpang tindih.

### Problem 2 — Reports Belum Kuat

Reports saat ini hanya menampilkan ringkasan periode. Reports belum menjawab:

* kenapa uang habis,
* kategori apa yang paling boros,
* metode pembayaran apa yang paling bocor,
* sumber pemasukan terbesar,
* apakah minggu ini lebih boros dari minggu lalu,
* apakah bulan ini lebih baik atau buruk dari bulan lalu.

### Problem 3 — Payment Method Belum Dimanfaatkan

Data payment method sudah ada, tetapi belum menjadi insight utama. Padahal user secara eksplisit ingin tahu:

> Uang lebih cepat habis saat pakai Cash, QRIS/M-Banking, E-wallet, atau Card?

Ini harus menjadi fitur penting V1.5.

### Problem 4 — Sidebar dan Navigasi Masih Butuh Stabilitas

Sidebar sedang dalam tahap polish. Expanded sidebar sudah mulai membaik, tetapi collapsed sidebar masih membutuhkan revisi interaction dan visual. Sebelum masuk fitur besar, navigasi utama harus stabil.

## 6. Product Goals

### Goal 1 — Dashboard Diet

Membuat Dashboard lebih ringkas, cepat dibaca, dan fokus pada kondisi sekarang.

Dashboard tidak boleh menjadi tempat semua analisis.

### Goal 2 — Reports Upgrade

Membuat Reports menjadi halaman analisis utama yang menjawab pola dan penyebab keuangan.

Reports harus punya alasan kuat untuk dibuka.

### Goal 3 — Payment Leak Insight

Menambahkan insight tentang metode pembayaran yang paling banyak menghabiskan uang.

Fitur ini muncul ringkas di Dashboard dan detail di Reports.

### Goal 4 — Daily Use Stabilization

Membuat SakuLog nyaman dipakai harian:

* Add cepat,
* Transactions bisa dipercaya,
* Dashboard jelas,
* Reports berguna,
* sidebar stabil,
* Settings tidak terasa kosong.

## 7. Non-Goals

V1.5 tidak mengerjakan:

* AI financial advisor,
* budgeting kompleks,
* bank integration,
* automatic transaction import,
* multi-user/team,
* export PDF/Excel,
* recurring transaction,
* notification/reminder,
* public dashboard,
* redesign total seluruh app,
* migration database besar yang tidak perlu.

## 8. Information Architecture

### 8.1 Dashboard — “Now”

Dashboard adalah halaman untuk menjawab:

> Kondisi uangku sekarang gimana?

Dashboard harus bisa dipahami dalam 10–20 detik.

Dashboard berisi:

1. Money Status
2. KPI ringkas
3. Payment Leak Alert
4. Today / Week Snapshot
5. Recent Transactions
6. Quick CTA

Dashboard tidak boleh menampilkan analisis detail seperti full cashflow trend, full category breakdown, atau payment method breakdown lengkap.

### 8.2 Reports — “Why”

Reports adalah halaman untuk menjawab:

> Kenapa uangku habis dan pola pengeluaranku seperti apa?

Reports berisi:

1. Period selector
2. Cashflow trend
3. Category breakdown
4. Payment method breakdown
5. Income source breakdown
6. Period comparison
7. Spending pattern insight

Reports harus menjadi ruang evaluasi, bukan sekadar kartu angka.

### 8.3 Transactions — “Raw Data”

Transactions adalah halaman untuk:

* melihat semua transaksi,
* memfilter transaksi,
* mengedit transaksi,
* menghapus transaksi,
* memverifikasi catatan mentah.

Transactions bukan halaman analisis utama.

### 8.4 Add — “Input”

Add adalah jalur input utama:

* user memilih Pengeluaran atau Pemasukan,
* user mengisi form sesuai tipe transaksi,
* user bisa memakai quick amount,
* user bisa memilih kategori, tanggal, metode/source, dan catatan.

Add harus tetap cepat dan tidak membingungkan.

### 8.5 Settings — “Control”

Settings minimal harus memberi rasa kontrol:

* session/logout,
* workspace info,
* preferensi dasar yang aman untuk V1.5.

Settings tidak boleh terasa kosong.

## 9. Dashboard V1.5 Specification

### 9.1 Dashboard Objective

Dashboard harus menjadi layar cepat untuk melihat:

* apakah kondisi bulan ini aman,
* uang paling banyak keluar ke mana,
* metode pembayaran mana yang paling bocor,
* transaksi terakhir apa,
* apa action berikutnya.

### 9.2 Dashboard Layout Target

Struktur dashboard V1.5:

1. Topbar
2. Money Status Hero
3. Compact KPI Row
4. Payment Leak Alert
5. Today / Week Snapshot
6. Recent Transactions

### 9.3 Dashboard Components

#### A. Topbar

Tetap menampilkan:

* title Dashboard,
* month context,
* search coming soon,
* Add CTA.

Search tetap disabled sampai benar-benar tersedia.

#### B. Money Status Hero

Hero utama tidak boleh sekadar branding. Hero harus menjawab kondisi uang bulan ini.

Isi:

* net balance bulan ini,
* pemasukan bulan ini,
* pengeluaran bulan ini,
* status kecil: Aman, Waspada, atau Minus.

Contoh status:

* Aman: pengeluaran masih jauh di bawah pemasukan.
* Waspada: pengeluaran mendekati pemasukan.
* Minus: pengeluaran lebih besar dari pemasukan.

#### C. Compact KPI Row

KPI maksimal 4 item:

1. Income this month
2. Expenses this month
3. Daily average
4. Top category atau Remaining balance

Label KPI harus compact. Jangan memakai label panjang yang merusak layout.

#### D. Payment Leak Alert

Payment Leak adalah fitur baru utama V1.5.

Dashboard hanya menampilkan alert ringkas.

Contoh:

* “Paling bocor via QRIS / M-Banking”
* “Rp185.000 bulan ini”
* “43% dari pengeluaran”

Dashboard tidak menampilkan tabel breakdown lengkap. Detailnya ada di Reports.

#### E. Today / Week Snapshot

Ringkasan kecil:

* pengeluaran hari ini,
* pengeluaran minggu berjalan,
* jumlah transaksi minggu ini,
* optional: transaksi terakhir dicatat kapan.

Ini membantu user sadar kondisi pendek tanpa membuka Reports.

#### F. Recent Transactions

Menampilkan maksimal 5 transaksi terakhir.

Harus ada link ke Transactions untuk melihat detail.

#### G. Quick CTA

Dashboard harus memberi action cepat:

* Tambah Pengeluaran
* Tambah Pemasukan

CTA tidak boleh tersembunyi.

### 9.4 Remove / Move from Dashboard

Komponen berikut tidak lagi menjadi fokus Dashboard:

#### Cashflow Trend besar

Pindahkan ke Reports.

Dashboard boleh menampilkan status singkat, tetapi bukan chart besar.

#### Category breakdown detail

Pindahkan ke Reports.

Dashboard hanya menampilkan top category.

#### Money signals terlalu banyak

Kurangi menjadi satu alert utama.

#### Mini insight analitis

Pindahkan ke Reports atau gabungkan menjadi Payment Leak / Money Status.

#### Full analysis cards

Jangan tampilkan terlalu banyak kartu analisis di Dashboard.

## 10. Reports V1.5 Specification

### 10.1 Reports Objective

Reports harus menjadi halaman evaluasi pola uang.

Reports menjawab:

* uang habis karena apa,
* kategori apa yang paling boros,
* metode pembayaran apa yang paling membuat uang cepat habis,
* sumber pemasukan terbesar dari mana,
* apakah minggu/bulan ini lebih boros dari sebelumnya.

### 10.2 Reports Layout Target

Reports V1.5 berisi:

1. Period Selector
2. Summary Cards
3. Cashflow Trend
4. Category Breakdown
5. Payment Method Breakdown
6. Income Source Breakdown
7. Period Comparison
8. Insight Summary

### 10.3 Reports Components

#### A. Period Selector

Minimal:

* Daily
* Weekly
* Monthly
* Yearly

Optional later:

* custom range

#### B. Summary Cards

Masih boleh ada:

* income,
* expense,
* balance,
* top category.

Namun ini hanya pembuka, bukan seluruh Reports.

#### C. Cashflow Trend

Reports adalah tempat utama untuk chart cashflow.

Menampilkan:

* income trend,
* expense trend,
* net balance trend.

#### D. Category Breakdown

Menampilkan ranking kategori pengeluaran.

Contoh:

1. Jajan — 35%
2. Makanan — 25%
3. Transport — 15%

Dashboard hanya menampilkan top category. Reports menampilkan detailnya.

#### E. Payment Method Breakdown

Fitur penting V1.5.

Menampilkan:

* total pengeluaran per payment method,
* jumlah transaksi per payment method,
* persentase dari total pengeluaran,
* metode paling bocor.

Payment method minimal:

* Cash
* QRIS / M-Banking
* E-wallet
* Kartu Debit / ATM
* Lainnya

Catatan:
Jika data lama belum punya Kartu Debit / ATM, tidak perlu migrasi besar. Karena field payment_method bertipe text, penambahan constant cukup untuk input baru.

#### F. Income Source Breakdown

Menampilkan sumber pemasukan:

* Mamah
* Ayah
* Mamah & Ayah
* Trading
* Investasi
* Freelance / Project
* Lainnya

Reports harus bisa menjawab sumber pemasukan terbesar.

#### G. Period Comparison

Minimal untuk V1.5:

* bulan ini vs bulan lalu,
* minggu ini vs minggu lalu.

Jika terlalu berat untuk implementasi awal, mulai dari month-over-month dulu.

#### H. Insight Summary

Reports boleh memberi insight tekstual.

Contoh:

* “Pengeluaran bulan ini naik dibanding bulan lalu.”
* “QRIS / M-Banking menjadi metode paling besar bulan ini.”
* “Kategori Jajan mendominasi pengeluaran minggu ini.”
* “Belum ada pemasukan tercatat di periode ini.”

Insight harus berbasis data, bukan copy dekoratif.

## 11. Payment Leak Feature

### 11.1 Feature Definition

Payment Leak adalah fitur untuk mendeteksi metode pembayaran yang paling banyak membuat uang keluar.

Pertanyaan yang dijawab:

> Uang paling cepat habis lewat Cash, QRIS/M-Banking, E-wallet, atau Card?

### 11.2 Dashboard Behavior

Dashboard menampilkan satu alert:

* metode paling bocor,
* total pengeluaran,
* persentase terhadap total expense.

Contoh:
“Paling bocor via QRIS / M-Banking — Rp185.000 bulan ini, 43% dari pengeluaran.”

### 11.3 Reports Behavior

Reports menampilkan breakdown lengkap:

* payment method,
* total expense,
* transaction count,
* percentage,
* optional average per transaction.

### 11.4 Data Requirement

Menggunakan field existing:

* payment_method
* type
* amount
* transaction_date
* user_id

Tidak perlu tabel baru untuk V1.5.

### 11.5 Edge Cases

Jika belum ada pengeluaran:

* Dashboard: “Belum ada payment leak”
* Reports: empty state

Jika payment method kosong:

* Kelompokkan sebagai “Tidak diketahui” atau “Lainnya”

Jika total expense 0:

* percentage = 0

## 12. Data & Backend Requirements

### 12.1 Current Data Model

SakuLog tetap memakai tabel transactions.

V1.5 tidak membutuhkan tabel baru.

### 12.2 Required Aggregations

Tambahkan atau rapikan aggregation untuk:

* monthly net balance,
* today expense,
* current week expense,
* top category,
* payment method breakdown,
* income source breakdown,
* period comparison.

### 12.3 Payment Method Aggregation

Input:

* transactions filtered by user and date range
* type = expense

Output:

* method
* total
* count
* percentage

### 12.4 Income Source Aggregation

Input:

* transactions filtered by user and date range
* type = income

Output:

* source/category
* total
* count
* percentage

### 12.5 No Major Migration

Tidak ada migration database besar untuk V1.5.

Penambahan payment method “Kartu Debit / ATM” boleh dilakukan di constants.

## 13. UX Requirements

### 13.1 Dashboard UX

Dashboard harus:

* cepat dipahami,
* tidak terlalu panjang,
* tidak menampilkan terlalu banyak chart,
* punya hierarchy jelas,
* punya satu primary action,
* punya alert paling penting.

### 13.2 Reports UX

Reports harus:

* terasa seperti halaman analisis,
* punya period selector,
* punya breakdown yang jelas,
* tidak hanya kartu ringkasan,
* punya empty state yang manusiawi.

### 13.3 Transactions UX

Transactions harus:

* mudah difilter,
* edit/delete jelas,
* empty state mengarah ke Add,
* error state jelas.

### 13.4 Add UX

Add harus:

* tetap memilih tipe transaksi dulu,
* form tidak terlalu panjang,
* quick amount tetap ada,
* success state memberi action lanjut.

### 13.5 Sidebar UX

Sidebar harus:

* stabil di collapsed dan expanded mode,
* tidak terlalu ramai,
* active state jelas,
* Add branch jelas,
* tidak mengganggu dashboard content.

## 14. UI Direction

### 14.1 Visual Style

Tetap memakai:

* Premium Black
* Cyber Violet
* Controlled Cyan Accent
* glass/depth
* subtle glow
* command center feeling

### 14.2 UI Rule

SakuLog tidak boleh menjadi:

* terlalu neon,
* terlalu gaming,
* terlalu padat,
* terlalu banyak box,
* terlalu banyak chart di Dashboard.

### 14.3 Dashboard Diet Visual Rule

Dashboard harus terasa:

* lebih fokus,
* lebih lega,
* lebih cepat dibaca,
* tetap premium,
* tetap kaya visual, tetapi tidak penuh informasi analitis.

### 14.4 Reports Visual Rule

Reports boleh lebih dense daripada Dashboard karena memang halaman analisis.

Namun Reports tetap harus rapi dan tidak seperti spreadsheet mentah.

## 15. Implementation Phases

### Phase 0 — Sidebar Revision Closure

Selesaikan revisi sidebar yang masih aktif.

Acceptance:

* collapsed Add branch rapi,
* hover stable,
* connector aligned,
* no visual regression,
* lint/test/build pass.

### Phase 1 — PRD Alignment

Dokumentasikan keputusan V1.5:

* Dashboard = Now
* Reports = Why
* Transactions = Raw Data
* Add = Input
* Settings = Control

### Phase 2 — Data Aggregation Foundation

Tambahkan aggregation untuk:

* payment method breakdown,
* top payment leak,
* income source breakdown,
* today/week snapshot,
* period comparison jika feasible.

### Phase 3 — Dashboard Diet

Refactor dashboard agar:

* lebih ringkas,
* cashflow trend besar dipindahkan,
* category detail dikurangi,
* payment leak alert ditambahkan,
* recent transactions tetap ada,
* KPI tetap compact.

### Phase 4 — Reports Upgrade

Upgrade Reports agar:

* punya cashflow trend,
* category breakdown,
* payment method breakdown,
* income source breakdown,
* period selector,
* insight summary.

### Phase 5 — Transaction UX Hardening

Polish:

* empty state,
* filter accessibility,
* edit form clarity,
* post-submit action,
* error/success states.

### Phase 6 — Settings Minimum Maturity

Settings minimal:

* session card,
* workspace info,
* data/account note,
* logout.

Tidak perlu settings kompleks.

### Phase 7 — Documentation / Portfolio Baseline

Jika aplikasi sudah stabil:

* README,
* setup guide,
* env guide,
* Supabase migration note,
* screenshot optional.

## 16. Acceptance Criteria V1.5

SakuLog V1.5 dianggap selesai jika:

1. Dashboard tidak lagi mengambil semua fungsi Reports.
2. Dashboard bisa dipahami dalam 10–20 detik.
3. Reports punya analisis yang jelas dan berguna.
4. Payment Leak tersedia ringkas di Dashboard.
5. Payment Method Breakdown tersedia detail di Reports.
6. Add flow tetap cepat dan jelas.
7. Transactions tetap bisa edit/delete/filter dengan aman.
8. Sidebar stabil di collapsed dan expanded mode.
9. Settings tidak terasa kosong.
10. Tidak ada major visual regression.
11. Tidak ada schema migration besar yang tidak perlu.
12. `npm run lint` pass.
13. `npm run test` pass.
14. `npm run build` pass.

## 17. Risks

### Risk 1 — Dashboard terlalu kosong setelah diet

Mitigasi:
Dashboard tetap punya hero, KPI, payment leak, recent transactions, dan CTA. Diet bukan menghapus karakter visual, tetapi menghapus analisis berlebihan.

### Risk 2 — Reports terlalu kompleks

Mitigasi:
Bangun Reports bertahap. Mulai dari payment breakdown dan category breakdown sebelum period comparison kompleks.

### Risk 3 — Codex over-polish UI

Mitigasi:
Setiap prompt harus menyebut:

* jangan redesign total,
* jangan ubah dashboard body di luar scope,
* code harus simple/readable,
* no dependency,
* no asset,
* lint/test/build.

### Risk 4 — Payment Leak misleading

Mitigasi:
Payment Leak harus berbasis total expense dan percentage. Jangan membuat klaim jika data kosong.

### Risk 5 — Data lama tidak punya card method

Mitigasi:
Tambahkan “Kartu Debit / ATM” untuk input baru. Data lama tetap valid.

## 18. Product Manager Notes

SakuLog V1.5 bukan tentang menambah banyak fitur. Fokusnya adalah memperjelas produk.

Masalah terbesar SakuLog saat ini bukan kekurangan UI. Justru UI sudah terlalu banyak menampilkan informasi di Dashboard.

Keputusan paling penting:

* Dashboard harus diet.
* Reports harus naik kelas.
* Payment Leak menjadi insight pembeda.
* Sidebar harus selesai sebelum masuk refactor besar.
* Jangan masuk V2 sebelum V1.5 stabil.

## 19. Recommended Next Task Order

1. Finish Sidebar Revision
2. Create PRD V1.5 document in repo
3. Add Payment Leak aggregation
4. Dashboard Diet implementation
5. Reports Upgrade implementation
6. Transaction UX Hardening
7. Settings Minimum Maturity
8. Documentation / README baseline

## 20. Final Product Direction

SakuLog V1.5 harus menjadi aplikasi yang membuat user bisa berkata:

> “Sekarang aku tahu uangku ke mana, lewat apa uangku paling cepat habis, dan apa pola yang perlu aku perbaiki.”

Itulah tujuan utama V1.5.

