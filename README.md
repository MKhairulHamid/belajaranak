# Belajar Anak

Ruang kerja orang tua untuk menemani anak belajar di rumah. Intinya satu hal:
**mempermudah orang tua menjalankan peran guru di rumah lewat worksheet dan
perintah yang komunikatif.** Catatan perkembangan tetap ada, tetapi hanya
sebagai ringkasan dari sesi yang sudah dijalankan — bukan fitur utama.

HTML, CSS, dan JavaScript tanpa dependensi runtime atau proses build.

## Menjalankan

Buka `index.html`, atau jalankan `node scripts/serve.mjs` lalu buka `http://localhost:4173`.

Saat pertama dibuka, aplikasi meminta nama anak, tanggal lahir, dan **kode belajar**.
Kode uji coba: `TKB-2026` (usia 5–6 tahun) atau `SD1-2026` (7 tahun ke atas).

## Satu kode, satu jenjang

Paket dijual per usia. Satu kode belajar membuka satu jenjang, dan jenjang itu
tidak dapat diganti dari dalam aplikasi. Usia anak dipakai untuk memeriksa
kecocokan: bila kode dan usia berbeda, aplikasi memberi tahu tetapi tetap
mengikuti kode yang dibeli. Seluruh katalog, paket, dan ringkasan hasil hanya
menampilkan materi jenjang tersebut.

Format kode: `TKB-0000` atau `SD1-0000`. Ini PoC — kode hanya divalidasi
formatnya di perangkat, belum ada pemeriksaan ke server.

## Paket 30 hari

Orang tua tidak menyusun rencana sendiri. Begitu kode dimasukkan, aplikasi
menyusun paket 30 hari yang bergilir antar delapan bidang, sehingga delapan hari
pertama sudah menyentuh seluruh bidang. Urutan boleh dikerjakan tidak berurutan;
nomor hari hanya penanda posisi dan dapat dimulai ulang kapan saja.

Kedua jenjang kini memiliki 32 materi, jadi 30 hari paket berisi materi baru
seluruhnya. Bila suatu jenjang memiliki kurang dari 30 materi, sisa hari diberi
tanda **ulang** dan memakai materi yang sudah muncul.

## Alur satu materi

1. **Halaman pembuka** — judul, manfaat materi, harapan hasil anak, dan bahan
   yang perlu disiapkan. Belum ada worksheet di sini.
2. Tekan **Mulai** → satu halaman kerja berisi seluruhnya tanpa berpindah
   halaman: bahan, perintah untuk orang tua, worksheet anak, soal percakapan,
   catat hasil.

## Materi

64 materi dalam 8 bidang: Bahasa Indonesia, Matematika, Bahasa Inggris, Sains &
Alam, Seni & Kreativitas, Motorik & Gerak, Sosial & Emosi, Kemandirian.
32 materi TK B dan 32 materi Kelas 1 SD, masing-masing 4 materi per bidang.
Tiap materi berisi manfaat, harapan hasil, bahan, tiga perintah dengan kalimat
yang bisa dibacakan, worksheet anak siap cetak, dua soal percakapan dengan
kunci jawaban, dan pencatatan hasil.

## Penyimpanan

Profil, paket, jawaban worksheet, dan hasil sesi disimpan di localStorage
browser, terpisah per profil anak. Ekspor dan pemulihan cadangan tersedia di
Pengaturan. Data tidak dikirim ke server. Menghapus data situs akan menghapus
data di perangkat itu. Kunci penyimpanan `belajaranak:v2`; data dari versi
sebelumnya tidak dimigrasikan.

## GitHub Pages

Di repo GitHub, buka **Settings → Pages → Deploy from a branch**, pilih branch
**main**, folder **/ (root)**. Semua tautan dan aset memakai path relatif
sehingga mendukung `/belajaranak/`.

## Pemeriksaan

`node --test tests/*.test.mjs`

Implementasi konsep produk dengan materi awal untuk evaluasi bersama keluarga.
Materi belum melalui penelaahan ahli pendidikan dan bukan asesmen diagnostik
atau sertifikasi kesiapan sekolah.
