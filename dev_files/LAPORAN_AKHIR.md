# LAPORAN AKHIR
# STRUKTUR LAPORAN TOOLS TI

## COVER
<!-- Tempat untuk cover laporan -->

## DAFTAR ISI
<!-- Tempat untuk daftar isi -->

## DAFTAR GAMBAR
<!-- Tempat untuk daftar gambar -->

## DAFTAR TABEL
<!-- Tempat untuk daftar tabel -->

## BAB I PENDAHULUAN

### 1.1 Latar Belakang
Di era digital saat ini, kebutuhan untuk mengelola informasi dan gagasan secara efektif adalah sebuah keharusan, terutama bagi mahasiswa yang menghadapi arus data tanpa henti. *Personal Knowledge Management* (PKM) yang terorganisasi menjadi kunci untuk mengubah informasi menjadi bermakna.

Saat ini, lanskap digital dipenuhi oleh berbagai aplikasi *workspace* canggih. Namun, alih-alih mempercepat, banyak dari platform ini justru menciptakan **hambatan** baru dalam alur kerja. Fitur yang melimpah (*bloatware*), antarmuka yang padat, dan keharusan untuk terus-menerus mengatur *tool* itu sendiri sering kali mengalihkan fokus dari tugas utama: berpikir, menulis, dan mengorganisasi gagasan. Pengguna akhirnya menghabiskan lebih banyak waktu untuk mengelola alat bantu ketimbang menyelesaikan pekerjaan, sehingga produktivitas yang dijanjikan pun terkikis oleh kompleksitas yang tidak perlu.

Di atas masalah fundamental tersebut, terdapat isu krusial lainnya: **privasi dan kepemilikan data.** Model layanan terpusat yang dominan saat ini mengharuskan pengguna untuk membuat akun, menyerahkan kontrol data ke server pihak ketiga, dan sering kali disertai praktik pengumpulan data telemetri. Ini bukan hanya risiko keamanan, tetapi juga sebuah hambatan—mengharuskan koneksi internet dan proses login yang memecah konsentrasi.

Sebagai **implementasi dari mata kuliah TOOL TI D** dan respons terhadap kedua tantangan fundamental ini, proyek ini merancang dan membangun sebuah *Personal Workspace* yang didasarkan pada filosofi **simplicitas radikal dan kepemilikan data.** Ini bukan sekadar alternatif yang lebih ringan dari aplikasi yang ada, melainkan sebuah pendekatan baru yang bertujuan untuk **menghilangkan semua hambatan antara pengguna dan pekerjaannya.** Platform ini dirancang untuk beroperasi sepenuhnya secara luring (*offline*), dengan kebijakan ***zero-login*** dan ***zero-telemetry***.

Tujuannya adalah untuk mengembalikan esensi dari sebuah *workspace*: sebuah ruang digital yang jernih, cepat, dan sepenuhnya milik pengguna, di mana fokus utama adalah pada **pekerjaan itu sendiri, bukan pada alatnya.**

### 1.2 Rumusan Masalah
Berdasarkan latar belakang, permasalahan yang akan dijawab oleh proyek ini adalah sebagai berikut:

1.	Bagaimana merancang sebuah workspace dengan interface minimalis yang mampu mengurangi distraksi serta hadir out-of-the-box, sehingga meningkatkan produktivitas pengguna?
2.	Bagaimana membangun arsitektur aplikasi berbasis web yang sepenuhnya local-first untuk menjamin kepemilikan penuh data pengguna?
3.	Bagaimana mengimplementasikan fitur-fitur produktivitas inti seperti to-do list dan editor catatan yang responsif dan efisien pada platform client-side?

### 1.3 Tujuan
Tujuan dari proyek ini adalah untuk merancang dan membangun aplikasi *Personal Workspace* yang memenuhi kebutuhan akan alat produktivitas terpusat dengan antarmuka minimalis, beroperasi secara *local-first* untuk menjaga privasi dan kepemilikan data pengguna, serta menyediakan fungsionalitas inti yang responsif dan efisien untuk pengalaman penggunaan optimal secara *offline*.

### 1.4 Manfaat
Manfaat dari aplikasi ini diharapkan dapat meningkatkan produktivitas pengguna dengan menyediakan *workspace* yang bebas distraksi, menjamin keamanan dan kepemilikan data pribadi, serta memberikan fleksibilitas penggunaan tanpa ketergantungan internet.

## BAB II TINJAUAN PUSTAKA

### 2.1. Personal Knowledge Management (PKM)

*Personal Knowledge Management* (PKM) atau Manajemen Pengetahuan Pribadi adalah sebuah kerangka kerja untuk individu mengelola proses belajar dan pengetahuannya secara sistematis. Konsep ini secara formal muncul dalam literatur akademis sekitar tahun 1999 melalui tulisan Frand dan Hixon (dalam Jones, 2010). Secara umum, PKM didefinisikan sebagai sekumpulan proses yang digunakan seseorang untuk mengumpulkan, mengklasifikasikan, menyimpan, mencari, mengambil kembali, dan membagikan pengetahuan dalam aktivitas sehari-hari (Jones, 2010).

Tujuan utama dari PKM adalah untuk meningkatkan efektivitas dan kinerja individu dalam konteks pribadi, organisasi, maupun sosial (Pomerol, 2010). Ini berbeda dari Manajemen Pengetahuan (KM) organisasional yang berfokus pada level perusahaan; PKM menempatkan individu sebagai pusat dari proses manajemen pengetahuannya sendiri. Lebih dari sekadar Manajemen Informasi Pribadi (PIM) yang hanya berfokus pada pengelolaan informasi, PKM menekankan pada transformasi informasi tersebut menjadi pengetahuan yang bermakna dan dapat ditindaklanjuti.

Menurut Wright (2007), proses dalam PKM dapat dilihat sebagai siklus berkelanjutan yang mencakup:

1.  **Menemukan (Find):** Mencari dan menemukan informasi baru yang relevan.
2.  **Menilai (Evaluate):** Menilai kredibilitas dan kegunaan dari informasi yang ditemukan.
3.  **Mengatur (Organize):** Menyusun dan menstrukturkan informasi agar mudah diakses.
4.  **Menganalisis (Analyze):** Menganalisis informasi untuk menemukan pola dan hubungan.
5.  **Menyajikan (Present):** Menyajikan pengetahuan dalam format yang berguna, baik untuk diri sendiri maupun orang lain.
6.  **Berkolaborasi (Collaborate):** Berbagi dan mengembangkan pengetahuan melalui interaksi dengan orang lain.

Dalam konteks mahasiswa, penerapan PKM menjadi sangat relevan. Mahasiswa setiap hari dihadapkan pada volume informasi yang sangat besar. Dengan menerapkan siklus PKM, mahasiswa dapat membangun basis pengetahuan pribadi yang solid, yang tidak hanya membantu dalam studi dan penulisan tugas, tetapi juga mendorong pembelajaran seumur hidup (*lifelong learning*). Aplikasi *Personal Workspace* yang dikembangkan dalam proyek ini dirancang sebagai alat bantu untuk memfasilitasi siklus PKM tersebut secara efisien.

### 2.2. Arsitektur Local-First

Arsitektur *Local-First* (Lokal-Utama) adalah sebuah paradigma pengembangan perangkat lunak yang memprioritaskan penyimpanan dan pemrosesan data langsung di perangkat pengguna, bukan di server *cloud*. Dalam model ini, salinan utama (primer) dari data pengguna berada di perangkat mereka sendiri, dan sinkronisasi dengan server atau perangkat lain terjadi di latar belakang ketika koneksi internet tersedia. Pendekatan ini secara fundamental berbeda dengan arsitektur *cloud-first* tradisional di mana data primer berada di server dan pengguna membutuhkan koneksi internet untuk mengakses dan memodifikasinya.

Konsep arsitektur *local-first* secara komprehensif dipaparkan oleh Kleppmann, et al. (2019) dalam artikel mereka, "Local-first software: You own your data, in spite of the cloud." Mereka menguraikan tujuh prinsip utama yang mendefinisikan aplikasi *local-first*:

1.  **Fungsionalitas Penuh Secara Luring (*Offline*):** Aplikasi dapat digunakan secara penuh tanpa koneksi internet.
2.  **Responsivitas Instan:** Interaksi pengguna (seperti mengetik) terasa cepat karena tidak ada latensi jaringan; data langsung dibaca dan ditulis dari *database* lokal.
3.  **Ketersediaan Jangka Panjang:** Data pengguna tetap dapat diakses dan digunakan bahkan jika server atau perusahaan pengembang berhenti beroperasi.
4.  **Kepemilikan dan Kontrol Penuh Pengguna:** Pengguna memiliki kendali penuh atas data mereka, termasuk kemampuan untuk menyalin, memodifikasi, dan menghapusnya.
5.  **Keamanan dan Privasi:** Dengan data disimpan secara lokal, risiko pelanggaran data di server terpusat dapat diminimalkan.
6.  **Kolaborasi Tanpa Batas:** Memungkinkan kolaborasi baik secara *real-time* maupun asinkron antar pengguna dan perangkat.
7.  **Sinkronisasi Lanjutan:** Data dapat disinkronkan secara mulus antar berbagai perangkat milik pengguna.

Penerapan arsitektur *local-first* untuk proyek *Personal Workspace* ini sangat relevan. Hal ini secara langsung menjawab permasalahan yang diangkat dalam latar belakang: memberikan pengguna **kepemilikan data penuh** (prinsip 4), menjamin **privasi** (prinsip 5), memastikan aplikasi dapat selalu **diakses secara luring** (prinsip 1), dan memberikan **performa yang cepat** (prinsip 2). Teknologi kunci yang sering digunakan untuk memungkinkan sinkronisasi dan kolaborasi dalam arsitektur ini adalah *Conflict-Free Replicated Data Types* (CRDTs).

### 2.3. Teknologi Client-Side

#### 2.3.1. HTML, CSS, dan JavaScript

Pengembangan aplikasi web *client-side*, termasuk *Personal Workspace* ini, dibangun di atas tiga pilar teknologi web fundamental: HTML, CSS, dan JavaScript. Ketiga teknologi ini bekerja secara sinergis untuk menciptakan pengalaman pengguna yang lengkap dan interaktif di peramban web.

1.  **HTML (HyperText Markup Language):** HTML berfungsi sebagai tulang punggung setiap halaman web. Ini adalah bahasa *markup* standar yang digunakan untuk membuat struktur dan konten dari sebuah halaman web. Elemen-elemen HTML (seperti `<p>` untuk paragraf, `<h1>` untuk judul, `<div>` untuk bagian) mendefinisikan hierarki dan jenis konten yang akan ditampilkan kepada pengguna. Dalam konteks *Personal Workspace*, HTML bertanggung jawab untuk menyusun kerangka dasar aplikasi, elemen navigasi, dan area konten untuk catatan.

2.  **CSS (Cascading Style Sheets):** CSS adalah bahasa *stylesheet* yang digunakan untuk mendeskripsikan presentasi dokumen yang ditulis dalam HTML. Dengan CSS, pengembang dapat mengontrol aspek visual halaman web, termasuk warna, *font*, *layout*, spasi, dan bagaimana elemen-elemen HTML harus ditampilkan. CSS memungkinkan pemisahan antara struktur konten (HTML) dan gaya presentasi, mempermudah pemeliharaan dan adaptasi desain aplikasi (misalnya untuk mode terang/gelap atau responsivitas layar).

3.  **JavaScript:** JavaScript adalah bahasa pemrograman yang memungkinkan interaktivitas pada halaman web. Berbeda dengan HTML (struktur) dan CSS (gaya), JavaScript bertanggung jawab atas perilaku dinamis aplikasi. Ini memungkinkan elemen halaman untuk merespons input pengguna (misalnya, klik tombol, ketikan), memanipulasi konten HTML secara *real-time*, melakukan validasi data, dan berkomunikasi dengan API. Untuk aplikasi *Personal Workspace*, JavaScript adalah inti yang menggerakkan fungsionalitas editor, pengelolaan data lokal, dan logika aplikasi lainnya.

Kombinasi ketiga teknologi ini sangat penting dalam membangun aplikasi *Personal Workspace* yang responsif, visual menarik, dan fungsional sepenuhnya di sisi klien tanpa ketergantungan pada server.

#### 2.3.2. React

React adalah sebuah *library* JavaScript yang paling populer dan banyak digunakan untuk membangun antarmuka pengguna (UI) yang interaktif dan efisien, terutama untuk *single-page applications* (SPA). Dikembangkan oleh Facebook (sekarang Meta), React telah menjadi fondasi bagi banyak aplikasi web modern berkat pendekatannya yang deklaratif dan berbasis komponen.

Konsep utama React yang mendukung pengembangan UI meliputi:

1.  **Arsitektur Berbasis Komponen:** React memungkinkan pengembang untuk memecah UI menjadi komponen-komponen yang kecil, independen, dan dapat digunakan kembali. Setiap komponen memiliki logika dan tampilannya sendiri. Contoh komponen bisa berupa tombol, *form input*, atau bahkan seluruh modul editor. Pendekatan ini mempromosikan modularitas, mempermudah pengelolaan kode, dan mempercepat pengembangan dengan memungkinkan komponen untuk dikombinasikan dan dipakai ulang.
2.  **UI Deklaratif:** React menggunakan paradigma deklaratif, artinya pengembang cukup mendefinisikan bagaimana UI seharusnya terlihat pada *state* tertentu, dan React akan mengurus cara yang paling efisien untuk mencapai tampilan tersebut. Hal ini menyederhanakan pengembangan UI yang kompleks dan dinamis, karena pengembang hanya perlu fokus pada *state* aplikasi.
3.  **Virtual DOM:** Untuk mengoptimalkan performa, React menggunakan Virtual DOM, yaitu representasi ringan dari DOM asli yang disimpan dalam memori. Ketika *state* komponen berubah, React pertama-tama memperbarui Virtual DOM, kemudian membandingkannya dengan Virtual DOM sebelumnya (*diffing*). Hanya bagian-bagian DOM asli yang benar-benar berbeda yang akan diperbarui (*reconciliation*). Proses ini meminimalkan operasi langsung pada DOM yang cenderung mahal, sehingga menghasilkan antarmuka yang sangat cepat dan responsif.
4.  **JSX (JavaScript XML):** React memanfaatkan JSX, sebuah ekstensi sintaksis yang memungkinkan penulisan kode mirip HTML langsung di dalam file JavaScript. Ini memudahkan pengembang untuk mendeskripsikan struktur UI secara intuitif bersamaan dengan logika komponennya, meningkatkan keterbacaan dan pemeliharaan kode.

Dalam proyek ini, React dipilih sebagai *library* utama untuk membangun antarmuka pengguna karena beberapa alasan kunci yang selaras dengan tujuan proyek. **Arsitektur berbasis komponen** memungkinkan pengembangan fitur-fitur modular seperti *Kanban Card*, *Markdown Editor*, dan elemen UI lainnya secara independen dan dapat digunakan kembali. Ini mempercepat proses iterasi dan mempermudah pengelolaan kode. Dengan **Virtual DOM**, React memastikan setiap interaksi pengguna—seperti *drag-and-drop* kartu atau mengetik di editor—terasa instan dan responsif, yang merupakan syarat mutlak untuk aplikasi produktivitas yang tidak menghambat alur kerja.

#### 2.3.3. Tailwind CSS

Tailwind CSS adalah sebuah *framework* CSS *utility-first* yang dirancang untuk mempercepat proses pengembangan antarmuka pengguna (UI) dengan menyediakan set lengkap kelas-kelas utilitas siap pakai. Berbeda dengan *framework* CSS tradisional seperti Bootstrap yang menyediakan komponen UI pradesain (misalnya, `btn` untuk tombol, `card` untuk kartu), Tailwind CSS berfokus pada penyediaan kelas-kelas individual yang secara langsung memetakan properti CSS tunggal atau kombinasi kecil.

Konsep utama di balik Tailwind CSS meliputi:

1.  **Pendekatan *Utility-First*:** Pengembang membangun UI dengan langsung menerapkan kelas-kelas utilitas ke elemen HTML. Contohnya, untuk membuat teks biru dengan *padding* atas 4 unit, pengembang akan menulis `<p class="text-blue-500 pt-4">...</p>`. Ini memungkinkan kontrol yang sangat granular atas setiap elemen tanpa perlu menulis CSS kustom.
2.  **Kustomisasi Ekstensif:** Meskipun menyediakan banyak kelas utilitas *default*, Tailwind CSS sangat mudah dikonfigurasi. Pengembang dapat menyesuaikan tema desain mereka (warna, *font*, spasi, *breakpoint* responsif) melalui file konfigurasi JavaScript, memastikan konsistensi dengan *brand guideline* proyek.
3.  **Ukuran File CSS yang Kecil:** Tailwind CSS secara *default* menghasilkan file CSS yang sangat besar karena menyertakan semua kelas utilitas yang tersedia. Namun, dengan alat seperti PurgeCSS (atau JIT *compiler* bawaan), hanya kelas-kelas utilitas yang benar-benar digunakan dalam kode aplikasi yang akan disertakan dalam *build* akhir. Hal ini menghasilkan file CSS akhir yang sangat kecil dan efisien, ideal untuk performa aplikasi web.
4.  **Integrasi Mudah:** Tailwind CSS dirancang untuk berintegrasi dengan mulus dengan *framework* JavaScript seperti React, memungkinkan pengembang untuk membangun komponen UI yang *styling*-nya langsung tertanam dalam *markup* komponen.

Untuk styling, proyek ini mengadopsi **Tailwind CSS**. Pendekatan ini memungkinkan kustomisasi desain yang sangat granular dan cepat tanpa perlu menulis file CSS terpisah. Setiap komponen React dapat di-style langsung di dalam file JSX-nya, menghasilkan UI yang konsisten dan mudah dipelihara. Tema monokromatik dengan hirarki kedalaman visual (menggunakan palet warna *Zinc*) yang diimplementasikan di seluruh aplikasi dapat dicapai dengan efisien menggunakan kelas-kelas utilitas Tailwind, sekaligus memastikan ukuran file CSS produksi tetap minimal berkat fitur *purging*.

#### 2.3.4. Penyimpanan Lokal Browser: IndexedDB

Penyimpanan lokal di peramban (*browser*) adalah teknologi kunci yang memungkinkan arsitektur *local-first*. Teknologi ini memberikan aplikasi web kemampuan untuk menyimpan data secara persisten di perangkat pengguna, sehingga data tetap tersedia bahkan setelah peramban ditutup dan dibuka kembali. Dua mekanisme utama untuk penyimpanan lokal modern adalah `LocalStorage` dan `IndexedDB`.

1.  **LocalStorage**
    `LocalStorage` adalah mekanisme penyimpanan sederhana yang berbasis *key-value pair*. Data disimpan sebagai *string* dan diakses secara sinkron, yang berarti operasi baca/tulis dapat memblokir *thread* utama aplikasi jika data yang diolah cukup besar. Kapasitas penyimpanannya pun terbatas, biasanya sekitar 5-10 MB per domain. Karena kesederhanaan dan batasannya, `LocalStorage` lebih cocok untuk menyimpan data dalam jumlah kecil dan sederhana, seperti preferensi pengguna.

2.  **IndexedDB**
    `IndexedDB` adalah sistem *database* NoSQL tingkat rendah yang terintegrasi di dalam peramban. Berbeda dengan `LocalStorage`, `IndexedDB` mampu menyimpan data terstruktur dalam jumlah besar (bisa mencapai beberapa gigabyte, tergantung ruang disk pengguna) dan mendukung berbagai tipe data JavaScript, termasuk *object* dan *file*. Operasi pada `IndexedDB` bersifat asinkron, sehingga tidak akan menghalangi *thread* utama dan menjaga antarmuka pengguna tetap responsif.

Berdasarkan perbandingan di atas, **IndexedDB** adalah pilihan yang jelas dan paling tepat untuk aplikasi *Personal Workspace* ini. Kebutuhan untuk menyimpan data catatan yang kompleks dan berpotensi besar (dalam format *block-based editor*) serta keharusan untuk menjaga performa aplikasi tetap cepat dan responsif, menjadikan operasi asinkron dan kapasitas besar dari `IndexedDB` sebagai fondasi yang solid untuk arsitektur *local-first* proyek ini.

#### 2.3.5. Editor Teks Kaya: Tiptap

Salah satu fitur inti dari *Personal Workspace* ini adalah editor berbasis blok (*block-based editor*). Untuk mengatasi tantangan membangun editor dari awal, proyek ini memanfaatkan *library* editor yang sudah matang.

Untuk fitur editor catatan, proyek ini secara spesifik memanfaatkan **Tiptap**, sebuah *headless editor framework* yang dibangun di atas Prosemirror. Disebut "*headless*" karena Tiptap tidak menyediakan UI bawaan, memberikan kebebasan penuh untuk merancang *toolbar* dan tampilan editor sesuai dengan tema desain aplikasi. Tiptap dipilih karena:
1.  **Ekstensibilitas:** Memudahkan penambahan fungsionalitas seperti *placeholder* dan kontrol dari *toolbar*.
2.  **Kontrol Penuh atas UI:** Sangat cocok dengan pendekatan *utility-first* Tailwind CSS.
3.  **Output Fleksibel:** Dapat dikonfigurasi untuk menghasilkan output dalam format Markdown, yang ideal untuk portabilitas data.

#### 2.3.6. Interaktivitas: @hello-pangea/dnd

Untuk fungsionalitas *drag-and-drop* pada Kanban Board, *library* `@hello-pangea/dnd` digunakan. Ini adalah *fork* yang terawat dari `react-beautiful-dnd` yang populer, menyediakan API yang kuat dan aksesibel untuk membangun pengalaman seret-dan-lepas yang mulus dan responsif.

## BAB III PEMBAHASAN

### 3.1 Gambaran Umum Sistem
Aplikasi "Personal Workspace" adalah sebuah *Single-Page Application* (SPA) yang dirancang dengan filosofi *local-first*. Aplikasi ini memiliki dua modul produktivitas utama yang terintegrasi dalam satu antarmuka yang bersih dan minimalis: **To-do List** dalam format Kanban Board dan sistem **Note-Taking** sederhana. Seluruh data disimpan secara lokal di browser pengguna menggunakan IndexedDB, memastikan privasi, kepemilikan data penuh, dan fungsionalitas *offline*.

### 3.2 Perancangan Sistem dan Arsitektur
Aplikasi ini dibangun menggunakan arsitektur berbasis komponen dengan React. Struktur utama aplikasi dibagi menjadi beberapa bagian:
1.  **Toolbar (Sisi Kiri):** Bar vertikal paling kiri yang berisi tombol untuk menampilkan/menyembunyikan sidebar utama dan membuka To-do list.
2.  **MainSidebar (Sidebar Utama):** Area khusus untuk fitur *note-taking*. Pengguna dapat membuat catatan baru dan melihat daftar catatan yang ada.
3.  **WorkingArea (Area Kerja):** Konten utama aplikasi yang menggunakan sistem *tab-based*. Setiap fitur atau catatan yang dibuka akan muncul sebagai tab baru.
4.  **State Management:** State global (seperti daftar tab, catatan, dan status sidebar) dikelola di komponen `App.jsx` dan didistribusikan ke komponen anak melalui *props*.

### 3.3 Hasil dan Pembahasan Implementasi

#### 3.3.1. Modul To-do List: Kanban Board
Fitur to-do list diimplementasikan sebagai Kanban board yang terinspirasi dari Notion, memberikan visualisasi alur kerja yang jelas.

![Kanban Board](https://i.imgur.com/your-screenshot-url.png) <!-- GANTI DENGAN URL SCREENSHOT -->
*Gambar 1: Tampilan Kanban Board*

Fitur-fitur utamanya meliputi:
*   **Tiga Kolom Status:** "Belum dimulai", "Sedang berlangsung", dan "Selesai". Setiap kolom menampilkan jumlah tugas di dalamnya.
*   **Kartu Tugas Interaktif:** Setiap tugas direpresentasikan sebagai kartu yang dapat diseret (*drag-and-drop*) antar kolom untuk mengubah statusnya.
*   **Editing Langsung di Kartu:** Untuk efisiensi maksimal, judul dan deskripsi singkat dapat diedit langsung dengan melakukan *double-click* pada teks. Prioritas tugas juga dapat diubah dengan mengklik *badge* prioritas yang akan berputar (cycle) melalui opsi "Low", "Medium", dan "High".
*   **Manajemen Deadline:** Setiap kartu memiliki indikator deadline di sisi kiri bawah dan area klik di sisi kanan bawah untuk mengatur tanggal/waktu. Indikator ini secara cerdas menampilkan sisa waktu (misal: "2 hari lagi") atau status keterlambatan ("Lewat").
*   **Catatan Terintegrasi:** Setiap kartu memiliki tombol ikon untuk membuka modal catatan, memungkinkan pengguna untuk menulis catatan panjang terkait tugas tersebut menggunakan Markdown Editor.

#### 3.3.2. Modul Note-Taking
Fitur ini dirancang untuk pencatatan cepat dan sederhana, terintegrasi langsung di sidebar.

![Note Taking](https://i.imgur.com/your-screenshot-url-2.png) <!-- GANTI DENGAN URL SCREENSHOT -->
*Gambar 2: Tampilan Note-Taking dengan Editor*

Fitur-fitur utamanya meliputi:
*   **Manajemen dari Sidebar:** Pengguna dapat dengan mudah membuat "Catatan Baru" melalui tombol `+` di sidebar. Daftar catatan yang ada ditampilkan dalam bentuk kartu-kartu ramping yang "mengambang", memberikan kesan kedalaman visual. Setiap item memiliki tombol hapus yang muncul saat di-hover.
*   **Editing Berbasis Tab:** Mengklik sebuah catatan akan membukanya sebagai tab baru di *working area*. Judul catatan dapat diedit di bagian atas, sementara kontennya diedit menggunakan editor di bawahnya.
*   **Editor Teks Kaya:** Menggunakan `MarkdownEditor` berbasis Tiptap yang sama dengan fitur to-do, lengkap dengan *toolbar* untuk formating (Bold, Italic, Heading, dll.) dan *placeholder* "Ketikan catatan disini...".

#### 3.3.3. Sistem Organisasi dan Folder
Untuk mendukung manajemen catatan yang lebih kompleks, aplikasi ini telah dilengkapi dengan sistem folder yang dapat diperluas (*expandable*). Pengguna dapat mengelompokkan catatan berdasarkan kategori atau subjek, serta melakukan pencarian catatan secara *real-time* berdasarkan judul maupun tag.

#### 3.3.4. Desain Antarmuka dan Pengalaman Pengguna (UI/UX)
Seluruh aplikasi dirancang dengan skema warna monokromatik menggunakan palet warna **Zinc** dari Tailwind CSS. Aplikasi mendukung **Mode Terang dan Gelap** yang dapat diganti secara instan melalui toolbar.

Responsivitas telah menjadi prioritas utama, di mana aplikasi menyesuaikan perilakunya berdasarkan perangkat:
*   **Desktop:** Sidebar bersifat *relative* untuk alur kerja berdampingan.
*   **Tablet & Mobile:** Sidebar berubah menjadi *overlay* dengan backdrop untuk menghemat ruang. Kanban board di modul To-do list juga secara cerdas berubah menjadi format kolom tunggal dengan sistem navigasi *tab switcher* pada layar di bawah 1024px.

## BAB IV PENUTUP

### 4.1 Simpulan
Proyek ini berhasil merancang dan membangun aplikasi "Personal Workspace" berbasis web dengan arsitektur *local-first* yang fungsional. Aplikasi ini berhasil mengimplementasikan fitur produktivitas inti—Kanban board, sistem *note-taking* dengan folder, serta antarmuka yang sangat responsif. Penggunaan React 19, Tailwind CSS 4, dan IndexedDB terbukti efektif dalam menjawab rumusan masalah. Hasil akhirnya adalah sebuah alat produktivitas yang cepat, privat, dan adaptif di berbagai perangkat.

### 4.2 Saran
Untuk pengembangan lebih lanjut, fitur yang dapat ditambahkan adalah:
1.  **Ekspor/Impor Data:** Memungkinkan pengguna mencadangkan data lokal mereka ke dalam file JSON atau Markdown.
2.  **Sinkronisasi:** Menjelajahi teknologi CRDTs untuk sinkronisasi antar perangkat tanpa mengorbankan prinsip privasi.

## DAFTAR PUSTAKA
... (Konten tidak berubah) ...

## Lampiran (kalau ada)
<!-- Tempat untuk lampiran, misalnya kode program, desain database, dll. -->
