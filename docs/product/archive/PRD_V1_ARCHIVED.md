Status: Archived / Superseded

This PRD is historical only.
It is no longer the active product source of truth.
Use docs/product/PRD_V1_5.md for current SakuLog planning and implementation.

**PRD—** **SakuLogV1**

**PersonalMoneyTrackeruntukMencatat,Memahami,dan**
**MengontrolKeuanganPribadi**

**1.ProductOverview**

**SakuLog**adalahaplikasiwebpribadiuntukmencatatpemasukandanpengeluaransecaracepat,rapi,dan
elegan.Aplikasiinidibuatagarpenggunadapatmengetahuikemanauangnyapergi,darimanauangnya
masuk,danbagaimanakondisikeuangannyadalamperiodeharian,mingguan,bulanan,dantahunan.

SakuLogbukansekadaraplikasicatatantransaksi.Tujuanutamanyaadalahmembantupengguna
menjawabpertanyaan:

> “Uangkuhabiskemana?”

SakuLogdirancanguntukdigunakandari**mobile**dan**MacBook**,dengantampilanmodern,premium,soft
dimata,dantidakterasasepertiprojectbasicHTML/CSS/Tailwind.

**2.Background&** **ProblemStatement**

Penggunaseringmengalamikondisidimanauangterasa“tiba-tibahabis”tanpatahusecarajelasdipakai
untukapa.

Masalahyangingindiselesaikan:

> •Pengeluaranseringtidaktercatat.
> •Penggunatidaktahuuanghabisdikategoriapa.
> •Penggunatidaktahupengeluaranmingguinisudahterlalubesarataubelum.
>
> •Pemasukanbisadatangbeberapakalidalamseminggu,sehinggaperludicatatsecarafleksibel.
> •Penggunainginmelihatlaporanharian,mingguan,bulanan,dantahunansecararapi.
> •Penggunamembutuhkanaplikasipribadiyangnyamandigunakan,bukanaplikasiakuntansiyang
>
> rumit.

SakuLogdibuatuntukmengubahkondisi:

> Dari“uangtiba-tibahilang”menjadi“uangpunyajejakyangjelas.”
>
> 1

**3.ProductGoals** TujuanutamaSakuLogV1:

> 1.Membantupenggunamencatatpemasukandanpengeluarandengancepat.
> 2.Membantupenggunamengetahuisisauangbulanini.
> 3.Membantupenggunamelihatpengeluaranhariinidanmingguini.
> 4.Membantupenggunamengetahuikategoripengeluaranpalingboros.
> 5.Membantupenggunamemahamilaporankeuanganharian,mingguan,bulanan,dantahunan.
> 6.Membantupenggunalebihsadardandisiplindalammengelolauangpribadi.

**4.Non-GoalsV1** FiturberikuttidakmasukV1:

> •AIfinancialadvisor. •Rekomendasiotomatiskebutuhandankeinginan.
> •Scanstruk.
>
> •OCR. •Integrasirekeningbank. •ExportPDF. •ExportExcel.
> •Reminderotomatis. •Notifikasi. •Budgetlimitkompleks. •Targettabungan.
>
> •Multi-user. •Fiturinvestasi/tradingaktif.
>
> •Sistemrekomendasiprioritaspembelian.

Fitur-fiturtersebutdapatdipertimbangkansetelahV1stabildanpenggunasudahmemilikidatatransaksi
nyata.

**5.TargetUser**
TargetpenggunautamaV1adalah**penggunapribadi**,yaitupemilikaplikasisendiri.

Karakterpengguna:

> •Inginmencatatuangmasukdankeluar.
> •Seringmerasauangcepathabistanpatahudetailnya.
> •Mendapatpemasukantidakselalubulanan.
> •Seringmenggunakanmobileuntukmencatattransaksi.
> •MenggunakanMacBookuntukmelihatdashboard/reportdenganlebihnyaman.
>
> 2
>
> •Menyukaitampilanelegan,rapi,premium,dantidakterlalusederhana.
> •Tidaknyamandengantampilanputihyangterlaluterang.
> •Inginaplikasiyangmudahdigunakantanpaterasasepertiaplikasiakuntansiberat.

**6.ProductPrinciple** PrinsiputamaSakuLog:

> Cepatdicatat.Rapidilihat.Mudahdipahami.

Prinsippengalamanpengguna:

> 1.**Cepat**
> Penggunaharusbisamencatattransaksitanpaprosesyangmembingungkan.
>
> 2.**Jelas**
> Angkautamasepertisisauang,pengeluaranhariini,danpengeluaranmingguiniharusmudah
> dibaca.
>
> 3.**Elegan**
> Tampilantidakbolehterlalubasic,polos,atausepertiprojectlatihanHTML/CSS/Tailwind.
>
> 4.**Softdimata**
> Warnatidakbolehterlaluputihmenyilaukanataukontrasberlebihan.
>
> 5.**Tidakmenghakimi**
> Aplikasimembantupenggunasadar,bukanmembuatpenggunamerasabersalah.
>
> 6.**Personal**
> SakuLogterasasepertialatpribadiuntukmengontroluang,bukandashboardperusahaan.

**7.DesignDirection** SakuLogmenggunakangayavisual:

> ElegantSoftPremiumFinanceDashboard

Arahvisual:

> •Modern. •Premium. •Rapi. •Tidakbasic.
>
> 3
>
> •Softdimata. •Tidakharushitammurni.
>
> •Tidakmenggunakanputihterangsebagaidefault.
> •Bisamenggunakanpaletsepertideepnavy,charcoalblue,mutedindigo,darkglass,softemerald,
>
> warmamber,dancorallembut.

ReferensivisualFinoradigunakansebagaiinspirasirasapremium,tetapitidakbolehdijiplakmentah-mentah.

SakuLogbolehmemakaipendekatan:

> •Softdarkpremium. •Deepblue-gray. •Midnightindigo. •Darkglassmorphism.
> •Mutedgradient.
>
> •Card-baseddashboard.

Tampilanharusterasaelegan,tetapitetapmudahdigunakan.

**8.Platform&** **Responsiveness**
SakuLogharusdapatdigunakandengannyamandi:

> 1.**Mobile**
>
> 2.Fokusuntukinputcepat.
>
> 3.Menggunakanbottomnavigation. 4.Tomboltambahtransaksimudahdijangkau.
> 5.Cardbesardanmudahdibaca.
>
> 6.Scrollvertikal.
>
> 7.**MacBook/Desktop**
>
> 8.Menggunakansidebar.
>
> 9.Layoutdashboardlebihluas. 10.Carddapatdisusundalamgrid.
> 11.Reportdantransaksiterbarudapattampillebihlega.
>
> 4

**9.NavigationStructure** **MobileNavigation** Bottomnavigation:

> •Dashboard •Transaksi •Tambah •Report •Settings

Tombol**Tambah**harusterlihatjelasdanmudahdijangkau.

**DesktopNavigation** Sidebarkiri:

> •Dashboard •Transaksi •Tambah •Report •Settings

**10.MainUserFlow** **10.1FlowMembukaAplikasi**

> 1.PenggunamembukaSakuLog. 2.Penggunalangsungmelihatdashboardutama.
>
> 3.Dashboardmenampilkankondisiuangsecaracepat:
>
> 4.Sisauangbulanini.
>
> 5.Pengeluaranhariini. 6.Pengeluaranmingguini. 7.Kategoripalingboros.

Tujuanflowiniadalahagarpenggunabisamemahamikondisiuangnyadalambeberapadetik.

**10.2FlowTambahTransaksi** 1.Penggunamenekantombol**Tambah**.

> 5
>
> 2.SakuLogmenampilkanpilihan:
>
> 3.TambahPengeluaran.
>
> 4.TambahPemasukan. 5.Penggunamemilihsalahsatu.
> 6.SakuLogmembukaformsesuaipilihan. 7.Penggunamengisidata.
> 8.Penggunamenekansimpan.
>
> 9.Datatersimpandanlangsungmemengaruhidashboard/report.

Catatanpenting:

> •JanganlangsungmembukaformsaattombolTambahditekan.
> •PilihanantaraPengeluarandanPemasukanharustampilterlebihdahulu.
> •Pilihaninipentingagarpenggunamerasajelassedangmencatatuangkeluaratauuangmasuk.

**11.DashboardRequirements** DashboardadalahhalamanutamaSakuLog.

Dashboardtidakbolehmemadatkansemuainformasidalamsatulayar.Informasiharusdibuatbertingkat:

> Bagianatasuntukjawabancepat,bagianbawahuntukdetailtambahan.

**11.1StrukturDashboard** Dashboardterdiridari:

> 1.Header 2.HeroCard 3.QuickCards 4.CashflowSummary 5.MiniInsight
> 6.TransaksiTerbaru

**11.2Header** Headermenampilkan:

> •Sapaansingkat. •Periodeaktif,misalnyabulanberjalan.
> •Aksescepatketambahtransaksijikadiperlukan.
>
> 6

Contoh:

> Halo,Satria Ringkasankeuanganbulanini

**11.3HeroCard** Herocardmenampilkanangkautama:

•**Sisauangbulanini** Contoh:

> SisaBulanIni Rp750.000

Herocardharusmenjadielemenpalingmenonjoldidashboard.

**11.4QuickCards** Quickcardsmenampilkan:

> 1.Pengeluaranhariini. 2.Pengeluaranmingguini. 3.Kategoripalingboros.

Contoh:

> •HariIni:Rp35.000keluar. •MingguIni:Rp210.000keluar.
> •PalingBoros:Jajan— Rp120.000.

**11.5CashflowSummary** Cashflowsummarymenampilkan:

> •Totalpemasukanbulanini. •Totalpengeluaranbulanini. •Sisabulanini.
>
> •Perbandingansederhanapemasukanvspengeluaran.

Bagianinitidakharusberadapalingatas,tetapiharusmudahditemukansaatpenggunascroll.

> 7

**11.6MiniInsight**
Miniinsightmenampilkan1–2kesimpulanpendekberdasarkandata.

Contoh:

> •MingguinipengeluaranterbesaradadiJajan.
>
> •QRIS/M-Bankingmenjadimetodepembayaranterbesarbulanini.
> •Pengeluaranhariinimasihlebihrendahdarirata-rataharianmingguini.

MiniinsighttidakmenggunakanAIdiV1.Insightdapatdibuatdariaturansederhanaberdasarkandata
transaksi.

**11.7TransaksiTerbaru** Menampilkan3–5transaksiterakhir.

Setiapitemtransaksimenampilkan:

> •Namatransaksi. •Nominal. •Jenistransaksi. •Kategori.
>
> •Metodepembayaran/penerimaan. •Tanggalsingkat.

Contoh:

> Kopisusu Rp18.000·Jajan·E-wallet
>
> UangdariMamah +Rp150.000·OrangTua·Transfer

**12.TransactionTypes** SakuLogmemilikiduajenistransaksi:

> 1.Pengeluaran 2.Pemasukan

Keduanyaharusdiperlakukansebagaibagianpentingdariaplikasi.SakuLogtidakbolehterasahanyafokus
padapengeluaran.

> 8

**13.ExpenseFormRequirements**
Formpengeluarandigunakanuntukmencatatuangkeluar.

**13.1RequiredFields** Fieldwajib:

> 1.Namapengeluaran 2.Nominal 3.Kategori 4.Tanggal
>
> 5.Metodepembayaran

**13.2OptionalFields** Fieldopsional:

> 1.Catatan

Catatanbersifatopsionalagarprosesinputtetapcepat.Penggunabolehmenyimpantransaksitanpa
mengisicatatan.

**13.3ExpenseFieldDetails** **NamaPengeluaran**

Contoh:

> •Kopisusu •Nasiayam •Bensin •ChatGPTPro •Sabun

**Nominal** Nominalharusbisadiisimanual.

FormattampilanmenggunakanRupiah.

Contoh:

> •Rp18.000 •Rp50.000 •Rp100.000
>
> 9

**QuickAmount** Inputnominalharusmemilikifitur**QuickAmount**.

Contohtombol:

> •+5.000 •+10.000 •+20.000 •+50.000 •+100.000

Catatan:

> •QuickAmountmembantumempercepatinput. •Nominaltetapbisadiketikmanual.
> •QuickAmounttidakbolehmembatasinominalhanyakekelipatantertentu.

**KategoriPengeluaran** Kategoriawal:

> •Makanan •Jajan •Transport
>
> •Internet&Pulsa •Belajar •Langganan •KebutuhanHarian •Hiburan
> •Kesehatan •Pakaian
>
> •Hadiah •Peralatan •Lainnya

**MetodePembayaran** Metodepembayaranutama:

> •Cash
>
> •QRIS/M-Banking •E-wallet •Lainnya

Catatan:

> •ATM/cardtidakmenjadipilihanutamakarenapenggunajarangmenggunakannya.
>
> 10

•Jikasuatusaatdiperlukan,ATM/carddapatditambahkandiversiberikutnyaataumasukkeLainnya.
**Tanggal**

Tanggaldefaultadalahhariini.

Penggunatetapbisamenggantitanggal,karenamungkinpenggunabarumencatattransaksisetelah
kejadian.

**Catatan** Catatanopsional.

Contoh:

> •Belisetelahkuliah. •Untukkebutuhankos. •Nongkrongdenganteman.

**14.IncomeFormRequirements**
Formpemasukandigunakanuntukmencatatuangmasuk.

Pemasukanpenggunatidakselalubulanan.Pemasukanbisadatangharian,mingguan,ataubeberapakali
dalamsatuminggu.

SakuLogtidakbolehmengasumsikanpemasukansebagaigajibulanantetap.

**14.1RequiredFields** Fieldwajib:

> 1.Namapemasukan 2.Nominal 3.Kategoripemasukan 4.Sumberpemasukan
> 5.Tanggal 6.Metodepenerimaan

**14.2OptionalFields** Fieldopsional:

> 1.Catatan
>
> 11

**14.3IncomeFieldDetails** **NamaPemasukan**

Contoh:

> •Uangbekalmingguini •Transfertambahan •Uangharian •UangdariMamah
> •UangdariAyah

**Nominal** NominalmenggunakanformatRupiah.

Contoh:

> •Rp50.000 •Rp150.000 •Rp300.000

**KategoriPemasukan** Kategoriawal:

> •OrangTua •Trading •Investasi •Freelance/Project •Hadiah
>
> •Lainnya

Catatan:

> •TradingdanInvestasitetapdimasukkansebagaikategorimeskipunpenggunasedangvakum,
> karenasebelumnyapernahmenjadisumberpemasukan.

**SumberPemasukan** Sumberpemasukanawal:

> •Mamah •Ayah
>
> •Mamah&Ayah •Lainnya
>
> 12

Catatan:

> •Pemasukanutamapenggunaberasaldariorangtua,khususnyaMamahdanAyah.
> •Pemasukandapatdiberikanharian,mingguan,ataubeberapakaliperminggu.

**MetodePenerimaan** Metodepenerimaan:

> •Cash
>
> •Transfer/M-Banking •E-wallet
>
> •Lainnya

**Tanggal** Tanggaldefaultadalahhariini,tetapidapatdiganti.

**Catatan** Catatanopsional.

Contoh:

> •Dikasihsebelumbalikkuliah. •Transfertambahanuntukmakan.
> •Dikasihsaatpulangkerumah.

**15.TransactionsPageRequirements**
HalamanTransaksidigunakanuntukmelihatseluruhtransaksi.

**15.1MainRequirements** HalamanTransaksiharusmemiliki:

> •Daftarsemuatransaksi. •Filterjenistransaksi: •Semua
>
> •Pengeluaran •Pemasukan •Filtertanggal/periode. •Filterkategori.
> •Detailtransaksi. •Edittransaksi. •Hapustransaksi.
>
> 13

**15.2TransactionItemDisplay** Setiapitemtransaksimenampilkan:

> •Namatransaksi. •Nominal. •Jenistransaksi. •Kategori.
>
> •Metodepembayaran/penerimaan. •Tanggal.

Pengeluarandanpemasukanharusmudahdibedakansecaravisual.

Contoh:

> •Pengeluaranmenggunakanaksencoral/redsoft.
> •Pemasukanmenggunakanaksenemerald/greensoft.

**16.Edit&** **DeleteRequirements**
V1wajibmendukungeditdanhapustransaksi.

Alasan:

> •Penggunabisasalahinputnominal. •Penggunabisasalahmemilihtanggal.
> •Penggunabisasalahmemilihkategori.
> •Penggunabisasalahmemilihmetodepembayaran.

Jikatransaksitidakbisadiedit/hapus,aplikasiakanterasamenyebalkandandatamenjaditidakakurat.

**17.ReportRequirements** ReportSakuLogharusmenggunakanformatgabungan:

> Kesimpulansingkatdiatas,detailangkadibawah.

Tujuan:

> •Kesimpulanmembantupenggunacepatmemahamikondisikeuangan.
> •Detailangkamembantupenggunamengecekpenyebabnya.
>
> 14

Reportwajibmencakup:

> 1.Harian 2.Mingguan 3.Bulanan 4.Tahunansederhana

**18.DailyReport** Reportharianfokusuntukmelihatkondisihariini.

**IsiDailyReport**

> •Totalpemasukanhariini. •Totalpengeluaranhariini. •Sisahariini.
> •Kategoripengeluaranterbesarhariini. •Transaksihariini.

**ContohKesimpulan** HariinipengeluaranterbesarkamuadadiJajan.

**19.WeeklyReport**
Reportmingguanadalahfiturpentingkarenamenjadialarmsebelumakhirbulan.

**IsiWeeklyReport**

> •Totalpemasukanmingguini. •Totalpengeluaranmingguini. •Sisamingguini.
> •Kategoripalingborosmingguini. •Metodepembayaranpalingbesarmingguini.
> •Daftartransaksiterbesarmingguini. •Jumlahtransaksimingguini.

**ContohKesimpulan** MingguinipengeluaranterbesarkamuadadiJajan.

> 15

**TujuanWeeklyReport** Weeklyreportmembantupenggunamengetahui:

> •Apakahmingguinisudahterlaluboros?
> •Uangpalingbanyakkeluaruntukkategoriapa?
> •Metodepembayaranapayangpalingsering/besardigunakan?
> •Apakahpengeluaranmingguiniperludikontrolsebelumbulanberakhir?

**20.MonthlyReport** ReportbulananadalahreportutamaSakuLog.

**IsiMonthlyReport**

> •Totalpemasukanbulanini. •Totalpengeluaranbulanini. •Sisauangbulanini.
> •Kategoripalingborosbulanini. •Metodepembayaranpalingbesarbulanini.
> •Transaksiterbesarbulanini. •Breakdownpengeluaranperkategori.
> •Breakdownpemasukanperkategori/sumber.

**ContohKesimpulan**
BulaninipengeluaranterbesarkamuadadiMakanandanJajan.

**TujuanMonthlyReport** Monthlyreportmenjawabpertanyaanutama:

> Bulaniniuangkuhabiskemana?

**21.YearlyReport** ReporttahunandiV1dibuatsederhana.

**IsiYearlyReport**

> •Totalpemasukantahunini. •Totalpengeluarantahunini. •Sisatahunini.
> •Bulanpalingboros.
>
> 16
>
> •Bulanpalinghemat. •Ringkasanperbulan.

TahunantidakperluterlalukompleksdiV1,tetapitetapharusadakarenapenggunainginmelihatlaporan
tahunan.

**22.InsightRulesV1** InsightV1tidakmenggunakanAI.

Insightdibuatberdasarkanaturansederhana.

Contohaturan:

> 1.JikakategoripengeluaranterbesarmingguiniadalahJajan,tampilkan:
>
> MingguinipengeluaranterbesarkamuadadiJajan.
>
> 2.JikametodepembayaranterbesarbulaniniadalahQRIS/M-Banking,tampilkan:
>
> BulaninipengeluaranterbesarkamulewatQRIS/M-Banking.
>
> 3.Jikapemasukanmingguinilebihkecildaripengeluaranmingguini,tampilkan:
>
> Mingguinipengeluarankamulebihbesardaripemasukan.
>
> 4.Jikaadasatutransaksisangatbesardalambulanini,tampilkan:
>
> Transaksiterbesarbulaniniadalah\[namatransaksi\].

Insightharussingkat,jelas,dantidakmenghakimi.

**23.SettingsRequirements** HalamanSettingsV1minimalberisi:

> •Informasiaplikasi. •Preferensitampilandasarjikadiperlukan.
> •Manajemenkategorijikamasukscoperingan. •Resetdatajikadiperlukan.
> •Informasibahwafiturlanjutanakandikembangkannanti.
>
> 17

Catatan:

> •SettingstidakmenjadifokusutamaV1.
> •Janganmembuatsettingsterlalukompleks.

**24.V1FeatureScopeSummary** FituryangwajibadadiV1:

> 1.Dashboardutama. 2.Tambahpengeluaran. 3.Tambahpemasukan.
> 4.QuickAmount. 5.Daftartransaksi. 6.Filtertransaksi. 7.Edittransaksi.
> 8.Hapustransaksi. 9.Reportharian.
>
> 10.Reportmingguan. 11.Reportbulanan. 12.Reporttahunansederhana.
> 13.Insightsederhanaberbasisaturan.
>
> 14.ResponsivelayoutuntukmobiledanMacBook.

**25.DeferredFeatures/FutureRoadmap** Fituryangditunda:

**25.1Wants&** **NeedsPlanning** Penggunadapatmembuatdaftar:

> •Kebutuhan •Keinginan •Estimasibiaya •Tanggaljatuhtempo
> •Statuspembelian

Contoh:

> •Belibaju— Rp100.000 •BayarChatGPTPro— tanggaltertentu •Belisabun—
> Rp50.000
>
> 18

**25.2PriorityRecommendation**
Ketikapemasukanmasuk,SakuLogdapatmerekomendasikanprioritaspenggunaanuangberdasarkan:

> •Pemasukanbulanini. •Pengeluaranbulanini. •Sisauang. •Daftarkebutuhan.
> •Daftarkeinginan. •Tanggaljatuhtempo. •Tingkatprioritas.

Contohrekomendasi:

> 1.BayarChatGPTProterlebihdahulukarenatermasukkebutuhan/langganan.
> 2.Belisabunkarenakebutuhanharian. 3.Belibajujikasisauangmasihaman.

Catatan:

> •FiturinitidakmasukV1karenasistemrekomendasiperludatadanaturanyanglebihmatang.
> •FiturinidapatdikembangkansetelahpenggunarutinmemakaiSakuLog.

**25.3AIAdvisor**
AIadvisordapatmenjadifiturlanjutanuntukmemberisarankeuanganpersonal.

TidakmasukV1.

**25.4Export** ExportPDF/ExceltidakmasukV1.

**25.5Reminder** Reminderharian/mingguantidakmasukV1.

**25.6BudgetLimit** BudgetlimitperkategoritidakmasukV1.

**26.SuccessCriteria** SakuLogV1dianggapberhasiljika:

> 1.Penggunadapatmencatatpengeluarandengancepat.
>
> 19
>
> 2.Penggunadapatmencatatpemasukandenganfleksibel.
> 3.Penggunadapatmelihatsisauangbulanini.
> 4.Penggunadapatmelihatpengeluaranhariini.
> 5.Penggunadapatmelihatpengeluaranmingguini.
> 6.Penggunadapatmelihatkategoripalingboros.
> 7.Penggunadapatmelihatlaporanharian,mingguan,bulanan,dantahunansederhana.
> 8.Penggunadapatmengeditdanmenghapustransaksi.
> 9.Aplikasinyamandigunakandimobile.
>
> 10.AplikasinyamandigunakandiMacBook.
> 11.Tampilanterasaelegan,rapi,premium,dantidakbasic.
> 12.Penggunamerasalebihsadarkemanauangnyapergi.

Ukurankeberhasilanutama:

> Penggunatidaklagimerasauang“hilangtanpajejak”karenasetiappemasukandan
> pengeluarantercatatdenganjelas.

**27.ProductTone** SakuLogharusterasa:

> •Tenang. •Membantu. •Tidakmenghakimi. •Personal.
>
> •Elegan. •Rapi. •Dewasa.
>
> •Mudahdipahami.

Contohkalimatyangcocok:

> •“MingguinipengeluaranterbesarkamuadadiJajan.”
> •“BulaniniuangpalingbanyakkeluarlewatQRIS/M-Banking.”
> •“Hariinikamusudahmencatat3transaksi.”
> •“SisabulaninimasihtersediaRp750.000.”

Hindarikalimatyangterlalumenghakimiseperti:

> •“Kamuterlaluboros.” •“Pengeluarankamuburuk.”
> •“Kamugagalmengaturuang.”
>
> 20

**28.FinalV1Definition**

SakuLogV1adalahaplikasiwebpribadiuntukmencatatpemasukandanpengeluaran,melihatdashboard
keuanganutama,sertamembacalaporanharian,mingguan,bulanan,dantahunansederhana.

FokusutamaV1:

> Catatuangmasuk.Catatuangkeluar.Lihatuanghabiskemana.

SakuLogV1belummenjadifinancialadvisorpenuh.Namun,fondasinyaharuscukupkuatagarnantibisa
dikembangkanmenjadipersonalmoneydecisionassistant.

**29.FinalProductStatement**

SakuLogmembantupenggunamenjagakeuanganpribadidengancaramencatatsemuauangmasukdan
keluar,lalumenampilkanringkasandanlaporanyangelegan,rapi,danmudahdipahami.

SakuLogdibuatagaruangtidaklagiterasahilangtanpajejak.

> 21
