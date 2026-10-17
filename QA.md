# Catatan verifikasi

Diperiksa pada 18 Oktober 2026, setelah perombakan alur ke fokus worksheet, penambahan 16 materi Kelas 1 SD, dan penggantian ilustrasi.

## Otomatis

- `node --check` untuk `app.js`, `core.js`, `data.js`, `sd1-data.js`, `content.js`, dan `worksheets.js` lulus.
- `node --test tests/*.test.mjs`: 31 tes lulus.
- Cakupan: kelengkapan 64 materi di delapan bidang (32 TK B, 32 Kelas 1 SD), manfaat dan harapan hasil untuk tiap materi, validasi soal beserta sebaran posisi jawaban benar, penolakan soal yang mematok satu nama anak, penguraian kode belajar, pemetaan usia ke jenjang, penyusunan paket 30 hari (bergilir antar bidang, hari ulang, tidak mencampur jenjang), perhitungan nomor hari dan kemajuan paket, pemisahan data antar profil, aturan pengulangan dua hari, validasi cadangan termasuk kode dan jenjang yang tidak cocok, validasi draf dan jawaban worksheet, escaping teks, kelengkapan worksheet beserta kunci jawabannya, serta pemuatan seluruh modul dari path relatif.
- Satu tes menjaga agar fitur yang dihapus (jurnal, portofolio, penjadwalan manual, mode anak, favorit) tidak kembali dirujuk aplikasi.

## Browser

Diperiksa pada browser berbasis Chromium, viewport ponsel 375 × 812 dan desktop, disajikan pada subpath `/belajaranak/` untuk memeriksa struktur URL GitHub Pages. Tidak ada galat konsol.

- Onboarding: kode salah format ditolak dengan pesan yang menjelaskan formatnya; `TKB-2026` dengan anak 6 tahun membuka TK B; `SD1-2026` dengan anak 8 tahun membuka Kelas 1 SD; `SD1-2026` dengan anak 6 tahun tetap membuka Kelas 1 SD disertai pemberitahuan ketidakcocokan usia.
- Setelah onboarding hanya satu jenjang yang tampil: katalog TK B dan Kelas 1 SD masing-masing berisi 32 materi, tanpa pilihan ganti jenjang di mana pun.
- Paket 30 hari tersusun otomatis; delapan hari pertama menyentuh delapan bidang berbeda. Kedua jenjang kini berisi 30 hari materi baru tanpa hari ulang.
- Halaman pembuka materi menampilkan judul, manfaat, harapan hasil, dan bahan; worksheet baru muncul setelah menekan Mulai.
- Halaman kerja memuat bahan, perintah, worksheet, soal, dan pencatatan hasil dalam satu gulungan tanpa berpindah halaman.
- Menandai jawaban salah: pilihan yang dipilih ditandai, jawaban yang tepat ikut ditampilkan, dan penjelasan menyebut jawaban benar. Jawaban dapat dihapus lalu dicoba lagi.
- Posisi gulir tetap setelah menandai jawaban, mengganti variasi gambar worksheet, dan menjeda penghitung waktu.
- Menyelesaikan sesi menyimpan hasil, menghapus draf, dan memperbarui ringkasan hasil serta penanda pada paket 30 hari.
- Seluruh 64 worksheet dirender tanpa galat, dan 34 aset `assets/library` yang dirujuk seluruhnya tersedia (diperiksa lewat fetch).
- Ekspor cadangan dan pemulihan cadangan berjalan; cadangan dengan kode atau jenjang yang tidak cocok ditolak.
- Ilustrasi delapan bidang dan hero onboarding tampil di beranda, katalog, halaman materi, dan halaman masuk; tidak ada gambar yang gagal dimuat.

## Belum diverifikasi

- Dialog cetak sistem, keluaran printer sebenarnya, dan kualitas suara text-to-speech.
- Pengujian lintas browser Safari/Firefox dan perangkat fisik.
- GitHub Pages tidak diaktifkan dalam pekerjaan ini; petunjuk aktivasi manual ada di README.
- Keterbacaan materi baru Kelas 1 SD oleh anak sebenarnya; isinya belum ditelaah ahli pendidikan.
