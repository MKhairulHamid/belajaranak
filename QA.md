# Catatan verifikasi

Diperiksa pada 11 September 2026.

## Otomatis

- `node --check app.js`, `node --check core.js`, dan `node --check data.js` lulus.
- `node --test tests/*.test.mjs`: 16 tes lulus.
- Cakupan: kelengkapan 32 materi, delapan bidang, akun awal berbayar, pemisahan data anak, perhitungan progres dan pengulangan, kalender, penyesuaian rekomendasi, validasi cadangan, pemulihan draf, escaping teks, serta path aset relatif.

## Browser

Diperiksa pada browser berbasis Chromium, termasuk viewport ponsel 390 × 844 dan tampilan desktop. Aplikasi disajikan pada subpath `/belajaranak/` untuk memeriksa struktur URL GitHub Pages.

- Membuka materi, mengikuti langkah kegiatan, menjawab pertanyaan, dan menyelesaikan sesi dengan catatan orang tua.
- Menyimpan sesi, memuat ulang, dan melanjutkan dengan jawaban, pengamatan, serta catatan yang tetap tersimpan.
- Mengubah nama anak, menambah profil, berpindah profil, dan memeriksa pemisahan progres.
- Mengubah paket aktif, durasi, gaya belajar, waktu, dan pilihan materi dalam jadwal.
- Mencari materi berdasarkan bahan, memfilter bidang, dan menyimpan materi favorit.
- Menambah catatan jurnal dan foto lokal, lalu memeriksa penyimpanan setelah memuat ulang.
- Mengekspor cadangan JSON ke file unduhan dan memvalidasi isinya.
- Menolak cadangan dengan versi tidak valid tanpa mengganti data yang ada.
- Memulihkan cadangan valid dan memeriksa progres yang kembali.
- Memeriksa tampilan beranda serta panduan sesi di layar ponsel.

Dialog cetak sistem, keluaran printer, dan kualitas suara text-to-speech belum diverifikasi. Pengujian lintas browser Safari/Firefox dan perangkat fisik belum dilakukan.

GitHub Pages tidak diaktifkan dalam pekerjaan ini. Petunjuk aktivasi manual tersedia di README.
