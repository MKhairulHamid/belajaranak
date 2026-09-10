# Belajar Anak

Aplikasi pendamping belajar di rumah untuk orang tua anak usia 6 tahun (TK B menuju SD). HTML, CSS, dan JavaScript tanpa dependensi runtime atau proses build.

## Menjalankan

Buka `index.html`, atau jalankan `node scripts/serve.mjs` lalu buka `http://localhost:4173`.

## GitHub Pages

Di repo GitHub, buka **Settings → Pages → Deploy from a branch**, pilih branch **main**, folder **/ (root)**. Semua tautan dan aset menggunakan path relatif sehingga mendukung `/belajaranak/`.

## Penyimpanan

Profil, paket aktif, jadwal, aktivitas tersimpan, catatan, dan hasil sesi disimpan di localStorage browser. Data terpisah untuk setiap profil anak. Ekspor dan pemulihan cadangan tersedia di Pengaturan. Data tidak dikirim ke server. Menghapus data situs akan menghapus data di perangkat itu.

Pengguna langsung masuk dengan paket Rumah Belajar aktif. Perubahan paket adalah pilihan lokal dan tidak menjalankan transaksi pembayaran.

## Materi

32 aktivitas lengkap dalam 8 bidang: Bahasa Indonesia, Matematika, Bahasa Inggris, Sains & Alam, Seni & Kreativitas, Motorik & Gerak, Sosial & Emosi, Kemandirian. Tiap aktivitas berisi tujuan, bahan, langkah, contoh percakapan, bantuan saat kesulitan, eksplorasi lanjutan, lembar cetak, dan pencatatan hasil. Hasil aktivitas dan penguasaan dibedakan; aplikasi tidak mengklaim anak siap sekolah hanya dari jumlah sesi.

## Pemeriksaan

`node --test tests/*.test.mjs`

Implementasi konsep produk dengan materi awal untuk evaluasi bersama keluarga. Materi belum melalui penelaahan ahli pendidikan dan bukan asesmen diagnostik atau sertifikasi kesiapan sekolah.
