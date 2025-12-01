# Gemini Context: Personal Workspace Web App

## Project Overview

This is a web application project to build a "Personal Workspace". The goal is to create a single interface with several productivity tools.

*   **Purpose:** To provide a central hub for personal productivity.
*   **Key Features (Planned):** To-do list, note-taking, and reminders.
*   **Current Status:** The project is in the **design and planning phase**. All implementation should be preceded by a discussion and update to the `DESIGN_PLAN.md` file.
*   **Technology Stack:**
    *   **Existing:** The project is set up with `tailwindcss` for CSS styling.
    *   **Proposed:** The `DESIGN_PLAN.md` proposes using **React** as the frontend library and **Vite** as the build tool. This has been agreed upon but not yet implemented.

## Building and Running

The project setup is not yet complete. The following are inferred or placeholder commands.

### Tailwind CSS Compilation

To compile the `src/input.css` file into `src/output.css`, you can run the Tailwind CLI. This command can be added to the `scripts` section of `package.json`.

```bash
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

### Running the Application (TODO)

*TODO: Add commands for starting the development server and building the application for production once Vite and React have been configured.*

A typical command after setup would be:

```bash
# npm run dev 
```

## Development Conventions

*   **Planning First:** All new features or major changes should be outlined in `DESIGN_PLAN.md` before starting implementation.
*   **Styling:** All styling should be done using Tailwind CSS utility classes. The base stylesheet is located at `src/input.css`.
*   **Source Code:** All React components and application logic will reside in the `src/` directory. The main HTML entry point is `public/index.html`.

---

## Dasar Pemikiran dan Tujuan Proyek

Bagian ini mendefinisikan alasan ("mengapa") dan tujuan dari proyek ini, sebagaimana telah didiskusikan.

### Latar Belakang

Di era digital saat ini, kebutuhan untuk mengelola informasi dan gagasan secara efektif adalah sebuah keharusan, terutama bagi mahasiswa yang menghadapi arus data tanpa henti. *Personal Knowledge Management* (PKM) yang terorganisasi menjadi kunci untuk mengubah informasi menjadi pengetahuan yang bermakna.

Saat ini, lanskap digital dipenuhi oleh berbagai aplikasi *workspace* canggih. Namun, alih-alih mempercepat, banyak dari platform ini justru menciptakan **hambatan** baru dalam alur kerja. Fitur yang melimpah (*bloatware*), antarmuka yang padat, dan keharusan untuk terus-menerus mengatur *tool* itu sendiri sering kali mengalihkan fokus dari tugas utama: berpikir, menulis, dan mengorganisasi gagasan. Pengguna akhirnya menghabiskan lebih banyak waktu untuk mengelola alat bantu ketimbang menyelesaikan pekerjaan, sehingga produktivitas yang dijanjikan pun terkikis oleh kompleksitas yang tidak perlu.

Di atas masalah fundamental tersebut, terdapat isu krusial lainnya: **privasi dan kepemilikan data.** Model layanan terpusat yang dominan saat ini mengharuskan pengguna untuk membuat akun, menyerahkan kontrol data ke server pihak ketiga, dan sering kali disertai praktik pengumpulan data telemetri. Ini bukan hanya risiko keamanan, tetapi juga sebuah hambatan—mengharuskan koneksi internet dan proses login yang memecah konsentrasi.

Sebagai **implementasi dari mata kuliah TOOL TI D** dan respons terhadap kedua tantangan fundamental ini, proyek ini merancang dan membangun sebuah *Personal Workspace* yang didasarkan pada filosofi **simplicitas radikal dan kepemilikan data.** Ini bukan sekadar alternatif yang lebih ringan dari aplikasi yang ada, melainkan sebuah pendekatan baru yang bertujuan untuk **menghilangkan semua hambatan antara pengguna dan pekerjaannya.** Platform ini dirancang untuk beroperasi sepenuhnya secara luring (*offline*), dengan kebijakan ***zero-login*** dan ***zero-telemetry***.

Tujuannya adalah untuk mengembalikan esensi dari sebuah *workspace*: sebuah ruang digital yang jernih, cepat, dan sepenuhnya milik pengguna, di mana fokus utama adalah pada **pekerjaan itu sendiri, bukan pada alatnya.**

### Rumusan Masalah

Berdasarkan latar belakang, permasalahan yang akan dijawab oleh proyek ini adalah sebagai berikut:

1.	Bagaimana merancang sebuah workspace dengan interface minimalis yang mampu mengurangi distraksi serta hadir out-of-the-box, sehingga meningkatkan produktivitas pengguna?
2.	Bagaimana membangun arsitektur aplikasi berbasis web yang sepenuhnya local-first untuk menjamin kepemilikan penuh data pengguna?
3.	Bagaimana mengimplementasikan fitur block-based editor yang responsif dan efisien pada platform client-side agar dapat berfungsi secara optimal dalam mode offline?

---

## BAB II: Landasan Teori

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

**Relevansi dengan Proyek:**

Penggunaan React dalam proyek *Personal Workspace* ini sangat menguntungkan karena:
*   Memungkinkan pembangunan editor berbasis blok yang modular dan kompleks, namun tetap mudah dikelola.
*   Menjamin antarmuka pengguna yang sangat responsif dan cepat, krusial untuk pengalaman mengetik dan berinteraksi tanpa hambatan.
*   Sesuai dengan pendekatan *client-side* dan *local-first* karena performa tinggi di perangkat pengguna.
*   Memiliki ekosistem dan komunitas yang besar, menyediakan banyak sumber daya dan *library* pendukung.

#### 2.3.3. Tailwind CSS

Tailwind CSS adalah sebuah *framework* CSS *utility-first* yang dirancang untuk mempercepat proses pengembangan antarmuka pengguna (UI) dengan menyediakan set lengkap kelas-kelas utilitas siap pakai. Berbeda dengan *framework* CSS tradisional seperti Bootstrap yang menyediakan komponen UI pradesain (misalnya, `btn` untuk tombol, `card` untuk kartu), Tailwind CSS berfokus pada penyediaan kelas-kelas individual yang secara langsung memetakan properti CSS tunggal atau kombinasi kecil.

Konsep utama di balik Tailwind CSS meliputi:

1.  **Pendekatan *Utility-First*:** Pengembang membangun UI dengan langsung menerapkan kelas-kelas utilitas ke elemen HTML. Contohnya, untuk membuat teks biru dengan *padding* atas 4 unit, pengembang akan menulis `<p class="text-blue-500 pt-4">...</p>`. Ini memungkinkan kontrol yang sangat granular atas setiap elemen tanpa perlu menulis CSS kustom.
2.  **Kustomisasi Ekstensif:** Meskipun menyediakan banyak kelas utilitas *default*, Tailwind CSS sangat mudah dikonfigurasi. Pengembang dapat menyesuaikan tema desain mereka (warna, *font*, spasi, *breakpoint* responsif) melalui file konfigurasi JavaScript, memastikan konsistensi dengan *brand guideline* proyek.
3.  **Ukuran File CSS yang Kecil:** Tailwind CSS secara *default* menghasilkan file CSS yang sangat besar karena menyertakan semua kelas utilitas yang tersedia. Namun, dengan alat seperti PurgeCSS (atau JIT *compiler* bawaan), hanya kelas-kelas utilitas yang benar-benar digunakan dalam kode aplikasi yang akan disertakan dalam *build* akhir. Hal ini menghasilkan file CSS akhir yang sangat kecil dan efisien, ideal untuk performa aplikasi web.
4.  **Integrasi Mudah:** Tailwind CSS dirancang untuk berintegrasi dengan mulus dengan *framework* JavaScript seperti React, memungkinkan pengembang untuk membangun komponen UI yang *styling*-nya langsung tertanam dalam *markup* komponen.

**Relevansi dengan Proyek:**

Dalam pengembangan *Personal Workspace* ini, Tailwind CSS dipilih karena:
*   Memungkinkan pengembangan UI yang sangat cepat dan iteratif, cocok untuk *prototyping* dan penyesuaian desain yang dinamis.
*   Mendorong konsistensi desain di seluruh aplikasi tanpa perlu menulis dan memelihara banyak baris CSS kustom.
*   Menghasilkan file CSS akhir yang ringan, berkontribusi pada tujuan aplikasi yang cepat, efisien, dan *local-first*.
*   Mendukung pendekatan antarmuka minimalis dan bebas distraksi yang menjadi salah satu pilar desain aplikasi.

#### 2.3.4. Penyimpanan Lokal Browser

Penyimpanan lokal di peramban (*browser*) adalah teknologi kunci yang memungkinkan arsitektur *local-first*. Teknologi ini memberikan aplikasi web kemampuan untuk menyimpan data secara persisten di perangkat pengguna, sehingga data tetap tersedia bahkan setelah peramban ditutup dan dibuka kembali. Dua mekanisme utama untuk penyimpanan lokal modern adalah `LocalStorage` dan `IndexedDB`.

1.  **LocalStorage**
    `LocalStorage` adalah mekanisme penyimpanan sederhana yang berbasis *key-value pair*. Data disimpan sebagai *string* dan diakses secara sinkron, yang berarti operasi baca/tulis dapat memblokir *thread* utama aplikasi jika data yang diolah cukup besar. Kapasitas penyimpanannya pun terbatas, biasanya sekitar 5-10 MB per domain (GeeksforGeeks, 2023). Karena kesederhanaan dan batasannya, `LocalStorage` lebih cocok untuk menyimpan data dalam jumlah kecil dan sederhana, seperti preferensi pengguna (misalnya, tema gelap/terang) atau token otentikasi.

2.  **IndexedDB**
    `IndexedDB` adalah sistem *database* NoSQL tingkat rendah yang terintegrasi di dalam peramban. Berbeda dengan `LocalStorage`, `IndexedDB` mampu menyimpan data terstruktur dalam jumlah besar (bisa mencapai beberapa gigabyte, tergantung ruang disk pengguna) dan mendukung berbagai tipe data JavaScript, termasuk *object* dan *file*. Operasi pada `IndexedDB` bersifat asinkron, sehingga tidak akan menghalangi *thread* utama dan menjaga antarmuka pengguna tetap responsif (Shift Asia, 2023). `IndexedDB` juga mendukung transaksi untuk memastikan integritas data dan indeks untuk melakukan pencarian (*query*) data secara efisien.

**Perbandingan dan Pilihan untuk Proyek**

| Fitur | LocalStorage | IndexedDB |
| :--- | :--- | :--- |
| **Tipe** | Key-value store | Database NoSQL |
| **Operasi** | Sinkron (memblokir) | Asinkron (tidak memblokir) |
| **Kapasitas** | Kecil (~5-10 MB) | Besar (>50 MB, bisa GB) |
| **Tipe Data** | Hanya string | Semua tipe data JS, file, blob |
| **Query** | Hanya berdasarkan *key* | Kompleks, dengan indeks |

Berdasarkan perbandingan di atas, **IndexedDB** adalah pilihan yang jelas dan paling tepat untuk aplikasi *Personal Workspace* ini. Kebutuhan untuk menyimpan data catatan yang kompleks dan berpotensi besar (dalam format *block-based editor*) serta keharusan untuk menjaga performa aplikasi tetap cepat dan responsif, menjadikan operasi asinkron dan kapasitas besar dari `IndexedDB` sebagai fondasi yang solid untuk arsitektur *local-first* proyek ini (OpenReplay, 2023).