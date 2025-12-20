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
... (Konten tidak berubah) ...

### 2.2. Arsitektur Local-First
... (Konten tidak berubah) ...

### 2.3. Teknologi Client-Side

#### 2.3.1. HTML, CSS, dan JavaScript
... (Konten tidak berubah) ...

#### 2.3.2. React
React dipilih sebagai *library* utama untuk membangun antarmuka pengguna karena beberapa alasan kunci yang selaras dengan tujuan proyek. **Arsitektur berbasis komponen** memungkinkan pengembangan fitur-fitur modular seperti *Kanban Card*, *Markdown Editor*, dan elemen UI lainnya secara independen dan dapat digunakan kembali. Ini mempercepat proses iterasi dan mempermudah pengelolaan kode. Dengan **Virtual DOM**, React memastikan setiap interaksi pengguna—seperti *drag-and-drop* kartu atau mengetik di editor—terasa instan dan responsif, yang merupakan syarat mutlak untuk aplikasi produktivitas yang tidak menghambat alur kerja.

#### 2.3.3. Tailwind CSS
Untuk styling, proyek ini mengadopsi **Tailwind CSS**, sebuah *framework utility-first*. Pendekatan ini memungkinkan kustomisasi desain yang sangat granular dan cepat tanpa perlu menulis file CSS terpisah. Setiap komponen React dapat di-style langsung di dalam file JSX-nya, menghasilkan UI yang konsisten dan mudah dipelihara. Tema monokromatik dengan hirarki kedalaman visual (menggunakan palet warna *Zinc*) yang diimplementasikan di seluruh aplikasi dapat dicapai dengan efisien menggunakan kelas-kelas utilitas Tailwind, sekaligus memastikan ukuran file CSS produksi tetap minimal berkat fitur *purging*.

#### 2.3.4. Penyimpanan Lokal Browser: IndexedDB
... (Konten tidak berubah) ...

#### 2.3.5. Editor Teks Kaya: Tiptap
Untuk fitur editor catatan, proyek ini memanfaatkan **Tiptap**, sebuah *headless editor framework* yang dibangun di atas Prosemirror. Disebut "*headless*" karena Tiptap tidak menyediakan UI bawaan, memberikan kebebasan penuh untuk merancang *toolbar* dan tampilan editor sesuai dengan tema desain aplikasi. Tiptap dipilih karena:
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

#### 3.3.3. Desain Antarmuka dan Pengalaman Pengguna (UI/UX)
Seluruh aplikasi dirancang dengan skema warna monokromatik menggunakan palet warna **Zinc** dari Tailwind CSS untuk menciptakan tampilan yang profesional, minimalis, dan tidak melelahkan mata. Hirarki visual diciptakan melalui perbedaan gradasi warna antar lapisan UI:
*   **Sidebar dan Toolbar:** Memiliki warna paling gelap (`zinc-900`), berfungsi sebagai fondasi.
*   **Working Area Background:** Sedikit lebih terang (`zinc-800`), menjadi kanvas utama.
*   **Kartu/Halaman Konten:** Paling terang (`zinc-900` atau `white` di mode terang), membuat konten menjadi fokus utama.

Pendekatan ini menjawab rumusan masalah pertama dengan menyediakan antarmuka yang bebas distraksi dan intuitif.

## BAB IV PENUTUP

### 4.1 Simpulan
Proyek ini berhasil merancang dan membangun aplikasi "Personal Workspace" berbasis web dengan arsitektur *local-first* yang fungsional. Aplikasi ini berhasil mengimplementasikan dua fitur produktivitas inti—sebuah Kanban board To-do list dan sistem *note-taking*—dengan antarmuka yang minimalis dan responsif. Penggunaan React untuk komponen, Tailwind CSS untuk *styling*, IndexedDB untuk penyimpanan, serta Tiptap dan `@hello-pangea/dnd` untuk interaktivitas terbukti efektif dalam menjawab rumusan masalah yang telah ditetapkan. Hasilnya adalah sebuah prototipe yang solid, yang mengedepankan kecepatan, privasi, dan pengalaman pengguna yang bebas distraksi.

### 4.2 Saran
Untuk pengembangan lebih lanjut, beberapa fitur dapat ditambahkan untuk melengkapi fungsionalitas aplikasi:
1.  **Sistem Folder/Kategori:** Menambahkan kemampuan untuk mengelompokkan catatan di sidebar ke dalam folder-folder yang dapat diperluas (*expandable*).
2.  **Fungsi Pencarian:** Mengimplementasikan fitur pencarian global untuk mencari tugas dan catatan berdasarkan judul atau konten.
3.  **Pengaturan Tema:** Memberikan opsi kepada pengguna untuk mengganti tema atau skema warna secara manual.
4.  **Sinkronisasi (Opsional):** Menjelajahi kemungkinan sinkronisasi data antar-perangkat secara *end-to-end encrypted* menggunakan teknologi seperti CRDTs, tanpa mengorbankan prinsip *local-first*.

## DAFTAR PUSTAKA
... (Konten tidak berubah) ...

## Lampiran (kalau ada)
<!-- Tempat untuk lampiran, misalnya kode program, desain database, dll. -->
