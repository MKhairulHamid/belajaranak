/* Original activity content. No network requests or third-party assets. */
(function(global) {
'use strict';
const topics = [
  {id:'bahasa',name:'Bahasa Indonesia',short:'Bahasa',icon:'book',color:'peach',description:'Bunyi, cerita, dan keberanian mengungkapkan ide.',skills:['Menyimak','Bunyi awal','Bercerita']},
  {id:'math',name:'Matematika',short:'Matematika',icon:'shapes',color:'sage',description:'Bilangan dan pola, dimulai dari benda di rumah.',skills:['Menghitung','Membandingkan','Pola & bentuk']},
  {id:'english',name:'Bahasa Inggris',short:'B. Inggris',icon:'chat',color:'lavender',description:'Kata-kata pertama lewat percakapan dan bermain.',skills:['Sapaan','Kosakata','Instruksi sederhana']},
  {id:'science',name:'Sains & Alam',short:'Sains',icon:'leaf',color:'yellow',description:'Mengamati, bertanya, dan menemukan hal baru.',skills:['Mengamati','Memprediksi','Merawat alam']},
  {id:'art',name:'Seni & Kreativitas',short:'Seni',icon:'palette',color:'pink',description:'Bereksperimen dengan warna, bunyi, dan imajinasi.',skills:['Warna','Irama','Ekspresi']},
  {id:'motor',name:'Motorik & Gerak',short:'Motorik',icon:'sun',color:'sky',description:'Menguatkan koordinasi lewat gerak dan permainan.',skills:['Koordinasi tangan','Keseimbangan','Gerak tubuh']},
  {id:'social',name:'Sosial & Emosi',short:'Sosial & emosi',icon:'heart',color:'peach',description:'Mengenali perasaan dan belajar bersama orang lain.',skills:['Mengenali emosi','Bergiliran','Berkomunikasi']},
  {id:'life',name:'Kemandirian',short:'Kemandirian',icon:'backpack',color:'sage',description:'Kebiasaan kecil untuk hari-hari yang lebih mandiri.',skills:['Merawat diri','Rutinitas','Meminta bantuan']}
];
const lessons=[];
function L(id,topic,title,summary,goal,materials,steps,support,extension,questions,worksheet,minutes=15) {
  lessons.push({id,topic,title,summary,goal,materials,steps:steps.map(s=>({title:s[0],body:s[1],say:s[2]})),support,extension,questions:questions.map(q=>({prompt:q[0],choices:q[1],answer:q[2],explanation:q[3]})),worksheet,minutes,order:lessons.filter(l=>l.topic===topic).length+1});
}
L('math-1','math','Pasar buah mini','Menghitung sambil bermain jual beli.','Anak memasangkan satu benda dengan satu hitungan dan membandingkan jumlah sampai 10.',
['10 benda besar (buah mainan atau balok)','2 piring atau wadah','Kertas dan pensil'],[
['Buka toko kecil','Susun lima benda sebagai dagangan. Biarkan anak memilih peran penjual atau pembeli. Gunakan benda yang tidak mudah tertelan.','Hari ini kita buka toko. Buah apa yang ingin kamu jual?'],
['Belanja sambil menghitung','Minta tiga benda. Anak memindahkan satu per satu ke piring sambil menghitung. Ulangi dengan lima, lalu jumlah sampai sepuluh jika nyaman.','Aku mau tiga buah. Kita pindahkan satu-satu, ya. Ada berapa sekarang?'],
['Bandingkan dua pesanan','Taruh tiga benda di satu piring dan lima di piring lain. Pasangkan benda dari kedua piring agar selisihnya terlihat.','Piring mana yang isinya lebih banyak? Bagaimana kamu tahu?']
],['Jika hitungan melompat, mulai dari tiga benda. Pindahkan setiap benda yang sudah dihitung.','Jika anak menilai dari panjang barisan, rapatkan satu barisan lalu pasangkan bendanya satu per satu.'],
'Buat pesanan baru: empat buah ditambah satu buah. Gabungkan bendanya, lalu hitung bersama.',[
['Ada tiga apel. Datang dua apel lagi. Berapa semuanya?',['5 apel','4 apel','6 apel'],0,'Satukan tiga dan dua benda. Hitung satu per satu: satu, dua, tiga, empat, lima.'],
['Piring A berisi 3 buah. Piring B berisi 5 buah. Mana yang lebih banyak?',['Piring A','Piring B','Sama banyak'],1,'Piring B lebih banyak. Setelah dipasangkan, masih ada dua buah di piring B.']
],['Gambar 3 buah di piring pertama dan 5 buah di piring kedua.','Hubungkan buah pada kedua piring satu per satu. Lingkari piring dengan sisa buah.','Buat gambar pesananmu sendiri. Ceritakan jumlahnya.'],20);
L('math-2','math','Detektif bentuk','Berburu lingkaran, segitiga, dan persegi.','Anak mengelompokkan bentuk berdasarkan sisi dan lengkungan, meski ukuran atau arahnya berbeda.',
['Kertas','Pensil warna','Benda rumah dengan permukaan datar'],[
['Kenali jejak bentuk','Gambar satu lingkaran, segitiga, dan persegi. Telusuri tepinya dengan jari.','Mana yang melengkung? Mana yang punya sudut?'],
['Berburu di rumah','Cari permukaan yang menyerupai bentuk tadi, seperti muka jam atau ubin. Bedakan bendanya dengan bentuk permukaannya.','Permukaan benda mana yang mirip gambar ini?'],
['Putar dan kelompokkan','Gambar dua ukuran setiap bentuk. Putar kertas dan minta anak mengelompokkannya lagi.','Kalau diputar, apakah jumlah sudutnya berubah?']
],['Jika bingung segitiga dan persegi, hitung sisi bersama dengan menunjuk setiap sisi.','Jika persegi miring dianggap bentuk baru, putar kembali perlahan lalu amati sisinya.'],
'Buat gambar rumah dari tiga bentuk. Anak menjelaskan bentuk yang dipilih.',[
['Bentuk mana yang memiliki tiga sisi?',['Lingkaran','Persegi','Segitiga'],2,'Segitiga memiliki tiga sisi dan tiga sudut.'],
['Persegi diputar miring. Apa yang terjadi?',['Tetap persegi','Menjadi lingkaran','Sisinya bertambah'],0,'Bentuknya tetap persegi. Arah berubah, tetapi sisi dan sudutnya tetap.']
],['Gambar satu lingkaran besar dan satu lingkaran kecil.','Gambar sebuah segitiga. Beri satu titik pada setiap sudut.','Buat rumah dari bentuk-bentuk yang kamu temukan.']);
L('math-3','math','Kereta pola warna','Menyusun pola yang bisa dilanjutkan.','Anak mengenali dan meneruskan pola berulang sederhana AB dan AAB.',
['Kertas dua warna atau balok dua warna','Ruang datar'],[
['Susun gerbong','Buat urutan merah, biru, merah, biru dengan balok atau kertas. Ucapkan warnanya sambil menunjuk.','Coba lihat kereta kita. Merah, biru, merah, biru.'],
['Lanjutkan kereta','Biarkan anak memilih dua gerbong berikutnya. Tanyakan bagian kecil yang terus berulang.','Setelah biru, warna apa yang datang lagi?'],
['Buat pola sendiri','Tukar peran. Anak membuat pola dua warna untuk Anda lanjutkan. Jika nyaman, coba merah, merah, biru.','Sekarang kamu yang membuat aturan keretanya. Boleh aku mencoba?']
],['Jika anak memilih acak, pisahkan pola menjadi pasangan merah-biru agar pengulangannya terlihat.','Jika pola AAB terasa sulit, kembali ke AB dan gunakan tepukan sebagai bantuan.'],
'Terjemahkan pola warna menjadi tepuk–ketuk. Bandingkan aturan keduanya.',[
['Merah, biru, merah, biru, ... Warna berikutnya?',['Biru','Merah','Kuning'],1,'Pola mengulang merah lalu biru, jadi setelah biru kembali ke merah.'],
['Tepuk, tepuk, ketuk, tepuk, tepuk, ... Gerakan berikutnya?',['Tepuk','Diam','Ketuk'],2,'Bagian yang berulang adalah dua tepuk lalu satu ketuk.']
],['Warnai 6 kotak dengan pola dua warna yang berulang.','Gambar pola lingkaran, lingkaran, segitiga sebanyak dua kali.','Ciptakan polamu sendiri dan ajak pendamping melanjutkan.']);
L('math-4','math','Berapa yang tersisa?','Bercerita tentang benda yang datang dan pergi.','Anak menunjukkan penambahan dan pengurangan sederhana dengan benda konkret sampai 10.',
['8 balok besar','2 wadah','Boneka atau gambar hewan'],[
['Siapkan bekal','Taruh lima balok sebagai bekal boneka. Hitung bersama sambil memindahkan.','Boneka kita membawa lima bekal. Kita pastikan jumlahnya, yuk.'],
['Bekal dibagikan','Boneka memberikan dua bekal kepada temannya. Pindahkan dua balok ke wadah lain.','Dua bekal sudah dibagikan. Apa yang masih ada di sini?'],
['Cerita bergantian','Buat cerita tiga benda ditambah dua, lalu enam dikurangi satu. Anak boleh menciptakan ceritanya sendiri.','Ceritakan yang terjadi pada bekal ini. Kita lihat dengan bendanya.']
],['Jika anak menjawab tanpa melihat, ajak memindahkan benda sesuai cerita lalu menghitung sisa.','Jika bingung tambah dan kurang, gunakan kata datang dan pergi sambil memeragakannya.'],
'Sembunyikan sebagian dari lima balok di bawah wadah. Ajak anak mencari kemungkinan jumlah yang tersembunyi.',[
['Lima bekal, dua diberikan. Berapa yang tersisa?',['3','2','7'],0,'Pindahkan dua dari lima benda. Tiga benda masih ada.'],
['Ada enam balok, tiga dipakai teman. Berapa yang tersisa?',['2','3','4'],1,'Pindahkan tiga dari enam balok. Hitung yang masih ada: satu, dua, tiga.']
],['Gambar 5 bekal. Coret 2 yang dibagikan. Lingkari sisanya.','Gambar 4 balok, lalu tambahkan 1 balok berbeda warna.','Gambar cerita hitungmu sendiri. Ceritakan yang datang atau pergi.'],20);
L('bahasa-1','bahasa','Aku dengar bunyi B','Menemukan bunyi awal dari benda sehari-hari.','Anak mendengar dan mengelompokkan kata dengan bunyi awal /b/ tanpa tuntutan membaca.',
['Bola atau gambar bola','Buku','Bantal','Satu sendok'],[
['Dengar dulu','Sebut bola, buku, dan bantal perlahan. Tekankan bunyi /b/ singkat, bukan nama huruf be.','Bola. Buku. Bantal. Coba dengarkan awal katanya.'],
['Temukan yang serupa','Campur benda dengan sendok. Sebut namanya satu-satu dan biarkan anak memilih yang awal bunyinya sama.','Mana teman bola yang punya bunyi awal serupa?'],
['Giliran anak','Ajak anak menyebut benda lain atau nama yang ia kenal. Terima percobaan dan ulangi kata bersama.','Apakah ada kata lain yang dimulai dengan bunyi /b/?']
],['Jika anak menyebut nama huruf, modelkan bunyi awal lewat kata utuh tanpa meminta hafalan huruf.','Jika sendok ikut dipilih, ucapkan bola dan sendok berdampingan lalu dengarkan lagi.'],
'Cari pasangan kata dengan bunyi awal /m/, seperti mata dan meja. Berhenti sebelum anak lelah.',[
['Kata mana yang bunyi awalnya sama dengan bola?',['Meja','Sapu','Buku'],2,'Bola dan buku sama-sama dimulai dengan bunyi /b/.'],
['Kata mana yang berbeda bunyi awalnya?',['Sendok','Bantal','Baju'],0,'Sendok dimulai dengan bunyi /s/, sedangkan bantal dan baju dimulai /b/.']
],['Gambar dua benda yang namanya dimulai seperti bola.','Pendamping menyebut buku, meja, bantal. Anak menggambar tanda di kata yang bunyi awalnya /b/.','Ceritakan benda favoritmu. Dengarkan bunyi awal namanya bersama.']);
L('bahasa-2','bahasa','Cerita tiga gambar','Mengurutkan cerita dari awal sampai akhir.','Anak menceritakan rangkaian tiga peristiwa dengan kata pertama, lalu, dan akhirnya.',
['3 lembar kertas kecil','Pensil warna'],[
['Buat tiga adegan','Gambar biji, tanaman kecil, dan bunga. Tidak perlu gambar yang rapi.','Ada tiga gambar. Apa yang kamu lihat pada setiap gambar?'],
['Urutkan bersama','Acak kartu lalu minta anak menyusun urutan. Tanyakan alasannya, jangan buru-buru membetulkan.','Menurutmu, mana yang terjadi lebih dulu?'],
['Ceritakan ulang','Anak bercerita sambil menunjuk gambar. Tawarkan kata penghubung jika diperlukan.','Pertama ada apa? Lalu bagaimana? Akhirnya apa yang terjadi?']
],['Jika hanya menyebut nama benda, tanya apa yang terjadi pada benda itu.','Jika urutan berbeda, dengarkan alasan anak lalu peragakan proses yang masuk akal.'],
'Anak membuat tiga gambar tentang paginya sendiri lalu menceritakannya kepada anggota keluarga.',[
['Urutan menanam yang masuk akal adalah...',['Bunga, biji, tunas','Biji, tunas, bunga','Tunas, bunga, biji'],1,'Biji dapat tumbuh menjadi tunas, lalu tanaman tumbuh dan dapat berbunga.'],
['Kata mana yang membantu menandai bagian terakhir cerita?',['Pertama','Sebelum','Akhirnya'],2,'Akhirnya membantu pendengar mengetahui bagian penutup cerita.']
],['Buat tiga kotak. Gambar awal, tengah, dan akhir ceritamu.','Ceritakan gambar dengan kata pertama, lalu, dan akhirnya.','Pendamping menuliskan satu kalimat anak di bawah gambar.']);
L('bahasa-3','bahasa','Tepuk suku kata','Mendengar potongan bunyi dalam sebuah kata.','Anak memisahkan kata lisan menjadi suku kata melalui tepukan.',
['Tangan untuk bertepuk','3 benda rumah'],[
['Mulai dari nama','Sebut nama panggilan anak secara alami, lalu perlahan per suku kata. Tepuk sekali untuk setiap suku kata.','Kita dengarkan potongan bunyi namamu, yuk.'],
['Tepuk benda','Coba bo-la, bu-ku, dan se-pa-tu. Gunakan gerakan pelan dan ulangi hanya bila anak tertarik.','Se-pa-tu. Tiga potongan bunyi, tiga tepukan.'],
['Pilih dan kelompokkan','Anak memilih benda dan menepuk namanya. Kelompokkan kata dengan dua dan tiga tepukan.','Kata mana yang tepukannya sama banyak dengan bola?']
],['Jika menepuk setiap huruf, kembali ke kata lisan. Hindari menunjukkan ejaan dulu.','Jika tepukan terlalu cepat, ketuk meja bersama mengikuti laju suara.'],
'Buat puisi lisan pendek dengan dua kata yang berirama, misalnya bola dan pola.',[
['Berapa tepukan untuk kata bo-la?',['2','1','3'],0,'Bo-la mempunyai dua suku kata.'],
['Kata mana yang punya tiga suku kata?',['Buku','Sepatu','Bola'],1,'Se-pa-tu memiliki tiga suku kata.']
],['Gambar bola. Buat satu titik untuk setiap tepukan namanya.','Gambar sepatu. Buat satu titik untuk setiap tepukan namanya.','Pilih benda sendiri, lalu gambar dan hitung tepukannya.']);
L('bahasa-4','bahasa','Pesan untuk teman','Menyimak pesan dan mengungkapkan kebutuhan.','Anak mengikuti dua instruksi berurutan dan menyampaikan pesan sederhana.',
['Boneka','Buku','Pensil','Kertas'],[
['Boneka memberi pesan','Gunakan boneka untuk meminta satu tindakan, lalu dua tindakan yang berhubungan.','Ambil buku, lalu taruh di meja.'],
['Dengar dan lakukan','Ulangi dengan pensil dan kertas. Minta anak mengulang pesan dengan kata-katanya sebelum bergerak.','Apa yang akan kamu lakukan lebih dulu? Setelah itu?'],
['Anak menjadi pengirim','Anak memberi dua instruksi kepada Anda atau menyampaikan permintaan kepada boneka.','Sekarang aku mendengarkan pesanmu. Apa yang kamu perlukan?']
],['Jika bagian kedua terlupa, ringkas instruksi dan gunakan dua jari sebagai pengingat urutan.','Jika anak diam, tawarkan awal kalimat seperti aku perlu, tanpa memaksa tampil.'],
'Buat pesan suara langsung untuk anggota keluarga: satu salam, satu kebutuhan, dan ucapan terima kasih.',[
['Pesannya: ambil buku, lalu duduk. Apa yang dilakukan pertama?',['Duduk','Tutup pintu','Ambil buku'],2,'Kita mengambil buku terlebih dahulu, kemudian duduk.'],
['Kamu belum mendengar pesan dengan jelas. Kamu bisa berkata...',['Tolong ulangi pelan-pelan','Aku harus menebak','Aku tidak boleh bertanya'],0,'Meminta pesan diulang membantu kita memahami dan merupakan keterampilan yang baik.']
],['Gambar dua langkah dari pesan pendamping.','Beri tanda panah dari langkah pertama ke langkah kedua.','Sampaikan satu kebutuhanmu. Pendamping menuliskan kata-katamu.']);
L('english-1','english','Hello, teman baru!','Berkenalan dalam bahasa Inggris lewat boneka.','Anak mencoba sapaan hello, menyebut nama, dan mengucapkan goodbye dalam konteks bermain.',
['Boneka atau tokoh dari kertas'],[
['Sapa boneka','Lambaikan tangan dan katakan hello. Beri arti halo, lalu biarkan anak menjawab dengan suara atau gerak.','Hello! Artinya halo. Kita sapa teman kita, yuk.'],
['Kenalkan nama','Modelkan My name is ... dengan nama Anda. Tidak perlu meminta aksen tertentu.','My name is ... Isi dengan nama anak, lalu tanyakan: siapa namamu?'],
['Mainkan pertemuan','Buat boneka datang, berkenalan, lalu pulang. Ulangi dengan peran bertukar.','Saat bertemu kita bisa bilang hello. Saat berpisah, goodbye.']
],['Jika anak belum mau bicara, terima lambaian atau respons bahasa Indonesia dan modelkan ulang.','Jika tertukar hello dan goodbye, peragakan datang dan pulang agar maknanya jelas.'],
'Tambahkan How are you? yang berarti apa kabar. Anak boleh menjawab dengan kata atau ekspresi wajah.',[
['Saat bertemu teman, kita bisa berkata...',['Goodbye','Hello','Blue'],1,'Hello digunakan untuk menyapa. Artinya halo.'],
['Seorang anak berkata: My name is Budi. Artinya...',['Aku mau makan','Selamat malam','Namaku Budi'],2,'My name is berarti namaku. Saat mencoba, ganti Budi dengan nama anak Anda.']
],['Gambar dirimu dan satu teman.','Pendamping menulis Hello di balon percakapan. Ucapkan bersama.','Perkenalkan nama, lalu lambaikan tangan sambil mengucapkan Goodbye.']);
L('english-2','english','Color hunt di rumah','Mencari red, blue, dan yellow di sekitar kita.','Anak menghubungkan tiga kata warna dalam bahasa Inggris dengan benda nyata.',
['Benda merah, biru, dan kuning','3 kertas kecil'],[
['Tiga warna dulu','Tunjuk benda merah sambil mengucap red, lalu blue untuk biru dan yellow untuk kuning.','Ini merah. Dalam bahasa Inggris, red.'],
['Berburu bersama','Minta anak menemukan warna di ruangan. Gunakan kalimat pendek dan gerakan menunjuk.','Find something blue. Ayo cari benda berwarna biru.'],
['Anak memberi petunjuk','Anak memilih satu warna untuk Anda cari. Beri ruang untuk menjawab dengan menunjuk jika belum ingat kata.','Sekarang warna apa yang perlu aku cari?']
],['Jika semua kata tertukar, gunakan dua warna dulu dan ulangi dengan benda yang berbeda.','Jika anak mengira red adalah nama benda, tunjukkan dua benda merah yang berbeda.'],
'Gambar pelangi tiga warna dan sebutkan warnanya bersama tanpa tuntutan hafalan.',[
['Red adalah warna...',['Merah','Biru','Kuning'],0,'Red berarti merah. Cari benda merah di sekitar Anda.'],
['Kamu diminta mencari blue. Pilih benda berwarna...',['Kuning','Biru','Hijau'],1,'Blue berarti biru.']
],['Warnai satu lingkaran red atau merah.','Warnai satu kotak blue atau biru, dan satu segitiga yellow atau kuning.','Gambar benda favoritmu. Ceritakan warnanya.']);
L('english-3','english','Move with me','Memahami instruksi tubuh sambil bergerak.','Anak merespons stand up, sit down, dan clap your hands dengan bantuan gerakan.',
['Tempat yang lapang dan tidak licin','Kursi yang stabil'],[
['Lihat dan tirukan','Peragakan berdiri sambil berkata stand up, duduk untuk sit down, dan bertepuk untuk clap your hands.','Stand up, berdiri. Kita coba pelan-pelan.'],
['Dengar dan gerak','Ucapkan satu instruksi dan beri waktu anak merespons. Gabungkan suara dan contoh gerakan bila perlu.','Clap your hands. Tepuk tangan, yuk.'],
['Bertukar pemimpin','Anak memimpin dengan kata atau gerakan. Ikuti instruksinya dan ulangi ungkapan bahasa Inggrisnya.','Sekarang kamu yang memimpin. Aku akan mengikuti.']
],['Jika instruksi tertukar, kembali ke satu ungkapan sambil memperagakan.','Jika gerak tertentu tidak nyaman, gunakan gerak tangan sebagai pengganti dan utamakan kenyamanan anak.'],
'Tambahkan touch your head, artinya sentuh kepala, tanpa mempercepat permainan.',[
['Sit down mengajak kita untuk...',['Berdiri','Bertepuk','Duduk'],2,'Sit down berarti duduk.'],
['Clap your hands berarti...',['Tepuk tangan','Sentuh kaki','Tutup mata'],0,'Clap your hands mengajak kita bertepuk tangan.']
],['Gambar seseorang sedang berdiri. Katakan Stand up.','Gambar seseorang sedang duduk. Katakan Sit down.','Pilih satu instruksi dan peragakan kepada pendamping.']);
L('english-4','english','One, two, animal friends','Menyebut angka satu sampai lima dengan hewan.','Anak menghubungkan one sampai five dengan jumlah benda dari satu sampai lima.',
['5 gambar hewan atau balok besar','Kertas'],[
['Kenalkan teman','Letakkan satu gambar, lalu tambahkan satu per satu sambil menghitung one, two, three, four, five.','One artinya satu. Kita hitung teman hewan kita.'],
['Tunjuk jumlahnya','Minta anak memberi dua atau tiga gambar. Ulangi dalam bahasa Indonesia jika diperlukan.','Give me two, please. Boleh beri aku dua?'],
['Buat parade','Anak menyusun lima gambar dan memindahkan satu per satu sambil menghitung.','Setiap hewan dapat satu hitungan. Kita mulai dari one.']
],['Jika anak hafal urutan tetapi jumlah tidak cocok, pindahkan satu benda pada setiap kata angka.','Jika pengucapan belum jelas, ulangi dengan hangat tanpa menuntut aksen tertentu.'],
'Gunakan ungkapan three cats untuk tiga kucing. Kata cat berarti kucing; cukup dengar dalam konteks.',[
['Three berarti...',['Dua','Tiga','Lima'],1,'One satu, two dua, three tiga.'],
['Setelah four saat menghitung sampai lima, kita mengucapkan...',['Two','One','Five'],2,'Urutannya one, two, three, four, five.']
],['Gambar 2 hewan. Hitung one, two sambil menunjuk.','Gambar 5 jejak kaki. Hitung sampai five.','Tunjukkan jumlah jari yang diminta pendamping.']);
L('science-1','science','Tenggelam atau mengapung?','Membuat dugaan lalu mengamati benda di air.','Anak membandingkan dugaan dengan hasil pengamatan dan menceritakan perbedaannya.',
['Baskom kecil berisi sedikit air','Sendok logam','Daun','Tutup plastik besar','Lap'],[
['Buat dugaan','Letakkan benda di samping baskom. Tanyakan benda mana yang menurut anak akan tetap di permukaan. Dampingi air sepanjang aktivitas.','Menurutmu, apa yang terjadi kalau daun ini masuk air?'],
['Uji satu per satu','Letakkan benda perlahan di air. Amati, lalu pindahkan benda ke kelompok mengapung atau tenggelam sesuai hasil nyata.','Kita lihat bersama. Bendanya di atas air atau di dasar?'],
['Bandingkan hasil','Bicarakan dugaan yang sesuai dan berbeda. Tidak perlu menghafal rumus atau menganggap semua benda berat tenggelam.','Tadi kita menduga apa? Setelah dicoba, apa yang kita lihat?']
],['Jika anak kecewa dugaannya berbeda, jelaskan bahwa mencoba membantu kita menemukan hal baru.','Jika anak menyimpulkan hanya berat yang menentukan, coba wadah kosong yang mengapung; bentuk dan bahan juga berperan.'],
'Buat perahu dari kertas aluminium jika tersedia. Uji bentuk datar dan bentuk mangkuk dengan pendamping.',[
['Benda yang tetap di permukaan air disebut...',['Mengapung','Tenggelam','Menguap'],0,'Mengapung berarti benda tetap berada di permukaan air.'],
['Dugaan kita berbeda dengan hasil percobaan. Kita sebaiknya...',['Menyembunyikan hasil','Menceritakan yang benar-benar terlihat','Mengulang tebakan saja'],1,'Hasil pengamatan membantu kita belajar, walau berbeda dari dugaan.']
],['Gambar bendamu sebelum dimasukkan ke air. Tunjukkan dugaanmu kepada pendamping.','Gambar posisi benda setelah dicoba: di permukaan atau di dasar.','Ceritakan satu hal yang membuatmu penasaran.'],20);
L('science-2','science','Kebun kacang kecil','Mengamati perubahan biji dari hari ke hari.','Anak mencatat perubahan biji dan merawatnya dengan air secukupnya.',
['3 biji kacang hijau, ditangani bersama orang dewasa','Wadah dangkal','Kapas atau tisu','Air'],[
['Siapkan kebun','Basahi kapas sampai lembap, bukan tergenang. Taruh tiga biji di atasnya. Biji tidak untuk dimakan saat percobaan.','Seperti apa biji kita hari ini? Keras atau lembut?'],
['Pilih tempat','Letakkan di tempat terang tanpa matahari terik langsung. Anak membantu memeriksa kelembapan setiap hari.','Apa yang perlu kita periksa agar kapas tetap lembap?'],
['Catat pengamatan','Gambar keadaan hari ini. Lanjutkan pengamatan beberapa hari berikutnya dan catat yang benar-benar tampak.','Apa yang berubah dari gambar kemarin? Kalau belum berubah, itu juga boleh dicatat.']
],['Jika belum tumbuh, jangan menjanjikan hari tertentu. Periksa kelembapan dan amati lagi.','Jika terlihat jamur atau berbau, orang dewasa membuang isi wadah dan mencucinya; mulai lagi dengan bahan bersih.'],
'Bandingkan dua wadah dengan kelembapan berbeda di bawah pendampingan. Catat perbedaannya tanpa menyimpulkan dari satu biji saja.',[
['Kapas untuk kebun biji sebaiknya...',['Kering sekali','Selalu penuh air','Lembap secukupnya'],2,'Kapas lembap memberi air tanpa merendam biji seluruhnya.'],
['Hari ini biji belum berubah. Apa yang dicatat?',['Belum terlihat perubahan','Sudah jadi pohon','Tidak perlu melihat lagi'],0,'Catat apa yang terlihat, termasuk belum adanya perubahan.']
],['Gambar biji pada hari pertama.','Buat dua ruang gambar untuk pengamatan hari berikutnya. Tulis tanggal bersama pendamping.','Ceritakan perubahan atau hal yang belum berubah.']);
L('science-3','science','Pemburu bayangan','Mencari hubungan cahaya, benda, dan bayangan.','Anak mengamati bahwa benda yang menghalangi cahaya dapat menghasilkan bayangan.',
['Senter','Mainan tidak transparan','Dinding kosong'],[
['Temukan bayangan','Arahkan senter ke dinding, lalu letakkan mainan di jalur cahaya. Jangan arahkan cahaya ke mata.','Apa yang muncul di dinding saat mainan ada di depan cahaya?'],
['Ubah jarak','Dengan senter tetap, gerakkan benda mendekati senter lalu menjauh. Amati perubahan ukuran bayangan.','Kalau bendanya lebih dekat ke senter, apa yang berubah?'],
['Bercerita dengan tangan','Buat bentuk tangan sederhana di jalur cahaya. Anak membuat cerita pendek dari bayangan.','Bayangan ini mengingatkanmu pada apa?']
],['Jika bayangan kurang jelas, kurangi cahaya ruangan secukupnya dan gunakan benda tidak transparan.','Jika ukuran tidak berubah jelas, pertahankan posisi senter dan dinding lalu gerakkan hanya bendanya.'],
'Amati bayangan di luar rumah pada dua waktu berbeda bersama pendamping. Hindari melihat langsung ke matahari.',[
['Bayangan muncul ketika...',['Benda mengeluarkan suara','Benda menghalangi cahaya','Benda diberi air'],1,'Saat jalur cahaya terhalang benda, sebagian cahaya tidak mencapai permukaan di belakangnya.'],
['Saat menguji jarak benda, supaya mudah membandingkan kita...',['Menggerakkan semuanya','Menutup mata','Menahan senter dan menggerakkan benda'],2,'Mengubah satu hal membantu kita melihat pengaruh perubahan itu.']
],['Gambar senter, benda, dan tempat bayangannya.','Gambar bayangan kecil dan besar yang kamu amati.','Buat satu tokoh bayangan dan ceritakan namanya.']);
L('science-4','science','Kenali dengan indra','Mengamati sifat benda dengan aman.','Anak menyebut sifat benda menggunakan penglihatan, pendengaran, sentuhan, dan penciuman.',
['Kain lembut','Sendok logam','Jeruk utuh','Kertas'],[
['Lihat dan sebutkan','Amati warna dan bentuk tiap benda. Mulai dengan benda yang sudah dikenal.','Apa yang bisa kita ketahui hanya dengan melihatnya?'],
['Sentuh dan dengar','Raba kain dan sendok. Ketuk sendok perlahan ke meja. Ajak anak membandingkan sifatnya.','Mana yang lembut? Suara apa yang kamu dengar?'],
['Ceritakan petunjuk','Cium aroma kulit jeruk dari jarak nyaman, tanpa kewajiban mencium. Anak memberi dua petunjuk agar Anda menebak benda.','Bendaku berwarna oranye dan punya aroma. Menurutmu apa?']
],['Jika anak memakai kata bagus saja, tawarkan pasangan kata seperti halus-kasar atau keras-lembut.','Jika tidak nyaman dengan tekstur atau aroma, beri pilihan mengamati dengan mata saja.'],
'Buat kantong rabaan berisi benda besar yang aman. Anak boleh melihat kapan saja; jangan memakai benda tajam atau panas.',[
['Untuk mengetahui suara, kita menggunakan...',['Telinga','Hidung','Lidah'],0,'Telinga membantu kita mendengar suara.'],
['Saat menemukan benda yang belum dikenal, kita...',['Langsung mencicipi','Bertanya kepada orang dewasa','Memasukkannya ke hidung'],1,'Bertanya kepada orang dewasa membantu kita mengamati benda dengan aman.']
],['Gambar satu benda. Ceritakan warnanya.','Gambar simbol tangan di samping benda yang lembut.','Pendamping menulis dua kata sifat yang kamu gunakan.']);
L('art-1','art','Laboratorium warna','Mencampur warna dan menikmati kejutan kecil.','Anak mencoba campuran dua warna dan menceritakan hasil pengamatannya.',
['Cat anak yang dapat dicuci: merah, kuning, biru','Kertas','Kuas dan alas meja'],[
['Kenali warna awal','Beri sedikit cat merah, kuning, dan biru pada wadah terpisah. Cat hanya untuk berkarya, bukan untuk dicicipi.','Kita punya tiga warna. Campuran mana yang membuatmu penasaran?'],
['Campur dua warna','Anak mencampur sedikit kuning dan biru. Amati hasilnya. Coba pasangan lain pada bagian kertas yang bersih.','Apa yang terjadi ketika dua warna ini bertemu?'],
['Beri nama karya','Anak menggunakan hasil campurannya untuk menggambar bebas. Tanya tentang pilihan, bukan nilai bagus atau jelek.','Bagian mana yang ingin kamu ceritakan?']
],['Jika warna menjadi keruh, gunakan kuas bersih dan dua warna saja untuk percobaan berikutnya.','Jika anak takut mengotori, tawarkan kuas panjang atau krayon untuk mengeksplorasi lapisan warna.'],
'Campurkan warna dengan perbandingan berbeda. Amati bahwa hasilnya dapat lebih terang atau lebih gelap.',[
['Kuning dan biru biasanya menghasilkan warna...',['Merah','Ungu','Hijau'],2,'Pada cat yang umum digunakan, campuran kuning dan biru biasanya tampak hijau. Amati hasil cat yang dipakai.'],
['Untuk melihat hasil dua warna dengan lebih jelas, kita...',['Memakai kuas bersih','Mencampur semuanya sekaligus','Menutup kertas'],0,'Kuas bersih membantu agar warna lain tidak ikut tercampur.']
],['Buat dua lingkaran warna awal, lalu satu lingkaran hasil campurannya.','Coba campuran lain pada bagian kertas yang berbeda.','Beri judul karyamu. Pendamping menuliskan ceritanya.'],20);
L('art-2','art','Kolase kebun impian','Menyusun potongan kertas menjadi cerita.','Anak memilih, menyusun, dan merekatkan bentuk untuk mengekspresikan idenya.',
['Kertas bekas bersih','Lem aman untuk anak','Kertas dasar','Krayon'],[
['Kumpulkan bentuk','Sobek kertas menjadi potongan besar dan kecil. Anak memilih warna yang ingin digunakan.','Kebun seperti apa yang ingin kamu buat?'],
['Susun sebelum menempel','Coba beberapa susunan di atas kertas dasar. Tidak ada contoh yang harus ditiru persis.','Mau letakkan pohonnya di mana? Coba dulu sebelum dilem.'],
['Tempel dan bercerita','Oleskan sedikit lem, tempel potongan, lalu tambah detail dengan krayon. Dengarkan cerita anak.','Siapa yang tinggal di kebunmu?']
],['Jika lem terlalu banyak, peragakan satu titik kecil dan beri lap untuk membersihkan tangan.','Jika anak bingung memulai, tawarkan dua pilihan bentuk atau cerita, bukan menentukan hasilnya.'],
'Tambahkan jalur dari rumah ke kebun. Anak menjelaskan perjalanan dengan kata dekat, jauh, dan di samping.',[
['Sebelum merekatkan potongan, kita bisa...',['Membuang semua kertas','Menyusunnya dulu','Menuang semua lem'],1,'Mencoba susunan lebih dulu memberi kesempatan mengubah ide.'],
['Karya teman berbeda dari karyamu. Kita bisa...',['Meminta semuanya sama','Mengatakan hanya satu yang benar','Mendengarkan cerita karyanya'],2,'Setiap anak dapat punya ide dan cerita yang berbeda.']
],['Gambar rencana kebunmu secara bebas.','Tempel potongan kertas untuk pohon atau bunga.','Pendamping menulis satu kalimat cerita kebunmu.'],20);
L('art-3','art','Orkestra meja makan','Mengeksplorasi ketukan dan jeda.','Anak meniru pola ritme pendek serta membedakan bunyi pelan dan keras yang nyaman.',
['Wadah plastik','Sendok kayu','Meja atau alas'],[
['Dengarkan bunyi','Ketuk wadah dengan lembut. Bandingkan dengan tepukan tangan. Jaga volume nyaman.','Bunyinya sama atau berbeda? Kita dengarkan dulu.'],
['Tiru ritme pendek','Buat dua ketukan lalu jeda. Anak meniru, lalu coba tiga ketukan lambat.','Dum, dum, diam. Sekarang giliranmu.'],
['Pimpin orkestra','Anak menciptakan ritme. Gunakan tangan terbuka untuk mulai dan tangan menutup untuk berhenti.','Kamu pemimpinnya. Kapan kita mulai dan berhenti?']
],['Jika sulit meniru, mulai dari satu ketukan dengan jeda panjang.','Jika suara terasa mengganggu, ganti wadah dengan bantal atau gunakan tepukan paha.'],
'Iringi lagu keluarga dengan ketukan lambat. Biarkan anak memilih lagu dan kapan ingin berhenti.',[
['Jeda dalam permainan ritme berarti...',['Berhenti sejenak','Bunyi lebih keras','Bermain makin cepat'],0,'Jeda adalah bagian tanpa bunyi untuk sementara.'],
['Kalau suara membuat telinga tidak nyaman, kita...',['Memukul lebih keras','Mengecilkan suara atau berhenti','Tetap melanjutkan'],1,'Kenyamanan pendengaran lebih penting daripada menyelesaikan pola.']
],['Gambar dua titik dan satu ruang kosong untuk dua ketukan lalu jeda.','Buat pola ketukanmu dengan titik dan ruang kosong.','Mainkan polanya untuk pendamping.']);
L('art-4','art','Panggung boneka kertas','Membuat tokoh dan memainkan cerita pendek.','Anak mengekspresikan ide melalui gambar, dialog, dan permainan peran.',
['Kertas','Krayon','Pita perekat','Buku sebagai panggung'],[
['Ciptakan tokoh','Anak menggambar dua tokoh. Lipat bagian bawah kertas agar bisa berdiri.','Siapa namanya? Apa yang ia sukai?'],
['Pilih kejadian','Tawarkan kejadian sederhana, seperti dua teman mencari bola yang hilang. Biarkan anak memilih jalan cerita.','Mereka ingin melakukan apa hari ini?'],
['Mainkan percakapan','Pegang satu tokoh dan biarkan anak memegang yang lain. Beri jeda untuk balasannya.','Tokohku bilang: boleh aku ikut mencari? Apa jawab tokohmu?']
],['Jika anak diam, modelkan satu dialog pendek lalu beri kesempatan menirukan atau mengubah.','Jika cerita melompat, tanyakan apa yang terjadi selanjutnya tanpa memaksa alur sempurna.'],
'Undang satu anggota keluarga sebagai penonton jika anak ingin. Anak boleh memilih hanya menceritakan gambarnya.',[
['Saat tokoh teman berbicara, kita bisa...',['Selalu memotong','Merebut bonekanya','Mendengarkan lalu merespons'],2,'Mendengarkan membantu cerita berkembang bersama.'],
['Agar tokoh mudah dikenal, kita dapat...',['Memberi nama dan ciri','Menyembunyikannya','Menghapus semua gambar'],0,'Nama dan ciri membantu kita membayangkan tokoh dan ceritanya.']
],['Gambar dua tokoh dan beri nama dengan bantuan pendamping.','Buat satu balon percakapan untuk setiap tokoh.','Mainkan bagian awal, kejadian, dan penutup cerita.'],20);
L('motor-1','motor','Jalur pensil petualang','Melatih gerak tangan melalui jalur gambar.','Anak menggerakkan alat gambar mengikuti jalur lebar dengan posisi yang nyaman.',
['Kertas','Krayon tebal atau pensil','Meja dan kursi yang sesuai'],[
['Hangatkan tangan','Buka-tutup jari, putar pergelangan perlahan, lalu gambar garis bebas besar.','Jari kita siap jalan-jalan. Gerakan mana yang terasa nyaman?'],
['Ikuti sungai','Gambar dua garis bergelombang dengan jarak lebar sebagai sungai. Anak menggambar jalan perahu di antaranya.','Perahunya mau lewat mana? Pelan saja, tidak perlu berlomba.'],
['Buat jalur sendiri','Anak menggambar jalur untuk Anda. Ubah menjadi zig-zag lebar atau lingkaran jika nyaman.','Sekarang buatkan aku jalan. Kita coba bersama.']
],['Jika keluar jalur, lebarkan jalur dan terima percobaan tanpa menghapus berulang.','Jika tangan lelah, berhenti dan ganti menggambar di udara. Jangan memaksa posisi jari tertentu saat tidak nyaman.'],
'Gambar jalan dari rumah ke taman dengan dua tikungan dan satu lingkaran sebagai tujuan.',[
['Saat tangan mulai lelah, kita...',['Terus menekan pensil','Beristirahat sebentar','Harus menyelesaikan semua'],1,'Istirahat membantu tangan kembali nyaman.'],
['Untuk memulai latihan jalur, pilih...',['Jalur sangat sempit','Garis sekecil mungkin','Jalur lebar'],2,'Jalur lebar memberi ruang untuk mencoba mengendalikan gerakan.']
],['Pendamping menggambar dua garis bergelombang lebar. Telusuri ruang di antaranya.','Buat jalan dari lingkaran besar menuju gambar rumah.','Gambar jalur pilihanmu untuk dicoba pendamping.']);
L('motor-2','motor','Jembatan keseimbangan','Mengikuti jalur di lantai sambil menjaga tubuh.','Anak mencoba mengatur keseimbangan dan berhenti dengan aman sesuai kemampuannya.',
['Pita kertas yang tidak licin','Lantai datar bebas barang','Pendamping di dekat anak'],[
['Siapkan jembatan','Buat garis pendek di lantai dengan pita kertas. Uji agar lantai tidak licin dan pita tidak terangkat.','Ini jembatan kita. Kamu boleh memilih langkah yang nyaman.'],
['Jalan perlahan','Anak berjalan di dekat atau di atas garis. Tangan boleh direntangkan, dan pendamping dapat memberi pegangan.','Coba rasakan kakimu. Aku ada di sebelahmu.'],
['Berhenti dan berbalik','Tambahkan tempat berhenti. Anak berbalik dengan langkah kecil tanpa tergesa-gesa.','Di ujung jembatan kita berhenti sebentar, lalu kembali.']
],['Jika mudah goyah, gunakan jalur lebih lebar dan pegangan tangan.','Jika anak tidak dapat atau tidak ingin berjalan, coba gerakan lengan seimbang sambil duduk dengan nyaman.'],
'Tambahkan belokan lebar pada jalur. Tidak perlu menaikkan ketinggian atau menutup mata.',[
['Tempat yang nyaman untuk latihan ini adalah...',['Lantai datar dan tidak licin','Tangga tinggi','Lantai penuh mainan'],0,'Lantai yang datar dan bebas halangan memberi ruang gerak yang lebih aman.'],
['Saat merasa goyah, kamu boleh...',['Mempercepat langkah','Meminta pegangan','Menutup mata'],1,'Meminta pegangan adalah cara yang baik untuk menjaga kenyamanan dan keamanan.']
],['Gambar jalur lurus dan satu jalur berbelok.','Beri lingkaran untuk tempat berhenti.','Setelah bergerak, ceritakan bagian yang nyaman atau perlu bantuan.']);
L('motor-3','motor','Lempar ke sarang','Melatih koordinasi mata dan tangan.','Anak mengarahkan lemparan lembut ke sasaran dari jarak yang nyaman.',
['3 pasang kaus kaki digulung','Keranjang rendah','Lantai bebas barang'],[
['Kenali sasaran','Letakkan keranjang dekat anak. Gunakan gulungan kaus kaki yang lembut sebagai bola.','Kita bantu bola masuk ke sarangnya, yuk.'],
['Coba lempar lembut','Peragakan ayunan dari bawah. Anak mencoba dengan satu atau dua tangan. Tidak perlu menghitung kegagalan.','Lihat sarangnya, ayunkan tangan, lalu lepaskan pelan.'],
['Atur jarak bersama','Anak memilih tetap dekat atau mundur satu langkah jika ingin. Bergantian mengambil dan melempar.','Jarak mana yang pas untuk kamu?']
],['Jika lemparan sering melewati sasaran, dekatkan keranjang atau gunakan wadah lebih besar.','Jika melempar tidak nyaman, gulirkan bola di lantai menuju sasaran.'],
'Buat dua sasaran dengan warna berbeda. Sebut satu warna sebelum anak mengarahkan bola.',[
['Jika sasaran terlalu jauh, kita bisa...',['Melempar benda keras','Memaksa terus','Mendekatkannya'],2,'Mengatur jarak membantu latihan terasa pas.'],
['Benda yang cocok untuk dilempar ke keranjang di rumah adalah...',['Gulungan kaus kaki','Gelas','Batu'],0,'Gulungan kaus kaki lembut lebih sesuai untuk permainan ini.']
],['Gambar keranjang dan tempatmu berdiri.','Gambar arah perjalanan bola dengan garis melengkung.','Ceritakan cara mengubah permainan agar lebih nyaman.']);
L('motor-4','motor','Jepit, pindah, susun','Melatih koordinasi jari dengan benda rumah.','Anak menggunakan gerakan membuka-menutup penjepit untuk memindahkan benda besar.',
['Penjepit makanan ringan yang mudah ditekan','6 gulungan kaus kaki kecil','2 wadah'],[
['Coba penjepit','Biarkan anak membuka-menutup penjepit tanpa benda dahulu. Pastikan tidak menjepit jari.','Kalau kita tekan, apa yang terjadi? Kalau dilepas?'],
['Pindahkan benda','Anak memindahkan gulungan dari satu wadah ke wadah lain. Tidak perlu mengejar kecepatan.','Kita pindahkan satu dulu. Tekanan seperti apa yang pas?'],
['Susun menurut pilihan','Ajak anak memisahkan dua warna atau menyusun satu barisan. Ia boleh memakai tangan jika perlu.','Mau kamu kelompokkan berdasarkan apa?']
],['Jika penjepit terlalu berat, ganti yang lebih ringan atau biarkan anak menggunakan dua tangan.','Jika benda sering jatuh, pilih benda lebih ringan dengan permukaan yang tidak licin.'],
'Gunakan jemuran rendah untuk membuka dan memasang penjepit baju bersama pendamping.',[
['Untuk memulai latihan penjepit, pilih benda...',['Tajam','Besar dan ringan','Sangat kecil'],1,'Benda besar dan ringan lebih mudah dicengkeram dan diamati.'],
['Kalau jari terasa sakit, kita...',['Menekan lebih keras','Harus berlomba','Berhenti dan mengganti cara'],2,'Rasa sakit adalah tanda untuk berhenti dan mencari alat atau gerakan yang lebih nyaman.']
],['Gambar dua wadah.','Gambar benda yang ingin kamu pindahkan di wadah pertama.','Setelah mencoba, ceritakan cara memegang yang paling nyaman.']);
L('social-1','social','Cuaca di dalam hati','Mengenali perasaan tanpa memberi cap baik atau buruk.','Anak menyebut perasaan dan mencoba menghubungkannya dengan pengalaman sehari-hari.',
['Kertas','Krayon','Boneka jika ada'],[
['Gambar wajah','Gambar wajah senang, sedih, marah, dan takut. Anak boleh membuat bentuknya sendiri.','Menurutmu wajah ini sedang merasa apa?'],
['Ceritakan kejadian','Buat cerita boneka yang mainannya rusak. Tanyakan kemungkinan perasaannya; terima jawaban yang masuk akal.','Kalau ini terjadi padamu, perasaan apa yang mungkin datang?'],
['Pilih bantuan','Tawarkan pelukan dengan izin, duduk bersama, atau ruang tenang. Jangan mewajibkan anak segera senang.','Saat merasa begitu, bantuan apa yang kamu inginkan?']
],['Jika anak belum punya kata, izinkan menunjuk gambar atau menunjukkan gerak tubuh.','Jika perasaan anak berbeda dari dugaan Anda, dengarkan penjelasannya. Tidak ada kewajiban merasakan hal tertentu.'],
'Buat kartu perasaan yang dapat dipakai saat bercerita tentang hari di sekolah.',[
['Saat teman sedih, kita bisa...',['Menanyakan bantuan yang ia mau','Memaksa dia tersenyum','Menertawakannya'],0,'Menanyakan kebutuhan membantu kita menghargai perasaan teman.'],
['Bolehkah kita merasa marah?',['Tidak boleh sama sekali','Boleh, sambil menjaga diri dan orang lain','Boleh menyakiti orang'],1,'Semua perasaan boleh hadir. Kita belajar memilih tindakan yang tidak menyakiti.']
],['Gambar cuaca yang mirip perasaanmu hari ini.','Pendamping menulis kata perasaan yang kamu pilih.','Gambar sesuatu yang bisa membantu saat perasaan terasa berat.']);
L('social-2','social','Sekarang giliran siapa?','Belajar menunggu dan menyepakati giliran.','Anak mencoba bergiliran dan menyampaikan keinginannya dalam permainan bersama.',
['Balok besar','Satu penanda giliran dari kertas'],[
['Sepakati aturan','Buat aturan sederhana: setiap orang menaruh satu balok, lalu memberikan kartu giliran.','Kita membangun bersama. Satu balok, lalu ganti giliran.'],
['Bangun bergantian','Modelkan menunggu dan menyebut pemilik giliran. Jika menara roboh, ajak membangun lagi.','Sekarang giliranmu. Aku akan menunggu sampai kartunya kembali.'],
['Bicarakan keinginan','Peragakan cara meminta giliran tanpa merebut. Dengarkan jika menunggu terasa sulit.','Aku juga ingin mencoba. Setelah kamu, boleh aku mendapat giliran?']
],['Jika anak sulit menunggu, pendekkan giliran menjadi satu langkah dan gunakan penanda yang terlihat.','Jika anak merebut, tahan benda dengan tenang dan ulangi kesepakatan tanpa memberi label nakal.'],
'Coba aturan baru yang disepakati bersama, misalnya dua balok per giliran, lalu bandingkan rasanya.',[
['Teman sedang mendapat giliran. Kamu bisa berkata...',['Aku ambil sekarang!','Kamu tidak boleh bermain','Setelah kamu, boleh aku?'],2,'Meminta giliran dengan kata-kata membantu kedua pihak memahami keinginan.'],
['Penanda giliran membantu kita...',['Mengetahui siapa yang sedang mencoba','Menentukan siapa paling hebat','Menghentikan semua permainan'],0,'Penanda membuat urutan giliran terlihat jelas.']
],['Gambar dua orang yang bermain bersama.','Gambar panah untuk menunjukkan pergantian giliran.','Pendamping menulis kalimat yang kamu gunakan untuk meminta giliran.']);
L('social-3','social','Aku bisa meminta bantuan','Mengenali kebutuhan dan orang yang dapat membantu.','Anak mencoba menyampaikan kebutuhan dengan jelas kepada orang dewasa tepercaya.',
['Boneka','Tas atau wadah yang agak sulit dibuka'],[
['Boneka punya masalah','Peragakan boneka kesulitan membuka tas. Tanyakan apa yang bisa ia lakukan.','Boneka sudah mencoba, tetapi belum bisa. Apa yang ia perlukan?'],
['Latih kalimat','Modelkan menyapa, menyebut kesulitan, lalu meminta bantuan. Anak boleh memakai kata-katanya sendiri.','Tolong bantu aku membuka tas ini. Aku belum bisa.'],
['Kenali orang tepercaya','Bicarakan anggota keluarga dan guru yang dikenal. Latih meminta bantuan di rumah dan sekolah melalui peran.','Kalau di kelas, kepada siapa kamu bisa meminta bantuan?']
],['Jika anak hanya berkata tolong, bantu menambahkan kebutuhan tanpa menuntut kalimat lengkap.','Jika anak merasa harus bisa sendiri, tegaskan bahwa mencoba dan meminta bantuan sama-sama boleh.'],
'Latih situasi alat gambar hilang, perlu ke toilet, atau tidak memahami instruksi.',[
['Jika tidak memahami instruksi, kamu bisa...',['Diam meski bingung','Meminta guru menjelaskan lagi','Langsung menyerah'],1,'Meminta penjelasan membantu kita memahami langkah berikutnya.'],
['Kalimat mana yang menjelaskan kebutuhan?',['Pokoknya tolong','Tidak ada apa-apa','Tolong bantu buka tasku'],2,'Menyebut bagian yang perlu dibantu memudahkan orang lain memahami.']
],['Gambar dua orang dewasa tepercaya yang kamu kenal.','Gambar satu keadaan ketika kamu membutuhkan bantuan.','Ucapkan permintaan bantuan. Pendamping menuliskannya.']);
L('social-4','social','Saat rencana berubah','Mencoba cara menenangkan diri dan memilih langkah baru.','Anak mengenali rasa kecewa dan mencoba satu strategi yang terasa nyaman.',
['Boneka','Kertas','Pensil warna'],[
['Cerita hujan','Boneka ingin ke taman tetapi hujan. Tanyakan perasaannya tanpa langsung menyuruh menerima.','Ia sudah menunggu waktu bermain. Apa yang mungkin ia rasakan?'],
['Berhenti sebentar','Tawarkan duduk bersama, minum, atau menarik napas perlahan jika nyaman. Anak memilih; tidak perlu menahan napas.','Kita boleh kecewa. Mau duduk bersama dulu atau minum air?'],
['Cari dua pilihan','Sesudah anak nyaman, pikirkan dua aktivitas lain. Biarkan ia memilih atau mengusulkan ide.','Kalau taman belum bisa, apa yang masih bisa kita lakukan di rumah?']
],['Jika anak belum ingin memilih, beri waktu dan tetap hadir. Jangan memaksa latihan saat sedang sangat kesal.','Jika anak menolak napas perlahan, tawarkan cara lain seperti menggambar atau memegang bantal.'],
'Buat daftar gambar tiga kegiatan alternatif untuk hari ketika rencana berubah.',[
['Saat kecewa karena rencana berubah, kita boleh...',['Berhenti sebentar dan mencari bantuan','Harus langsung gembira','Menyakiti teman'],0,'Memberi waktu pada diri sendiri membantu kita memilih langkah berikutnya.'],
['Setelah lebih tenang, kita bisa...',['Menyalahkan semua orang','Mencari pilihan kegiatan lain','Melarang semua rencana'],1,'Pilihan baru membantu kita melanjutkan hari tanpa mengabaikan perasaan.']
],['Gambar rencana yang pernah berubah.','Gambar satu cara menenangkan diri yang nyaman untukmu.','Gambar dua kegiatan pengganti yang bisa dipilih.']);
L('life-1','life','Tas sekolahku siap','Menyiapkan perlengkapan lewat daftar gambar.','Anak memilih perlengkapan sesuai kegiatan dan memeriksa tas dengan bantuan daftar.',
['Tas anak','Buku','Alat gambar','Botol minum tertutup','Kertas'],[
['Kenali kebutuhan','Bicarakan kegiatan sekolah atau belajar besok. Pilih hanya perlengkapan yang sesuai.','Besok kita akan menggambar dan membaca. Apa yang perlu dibawa?'],
['Buat daftar gambar','Gambar buku, alat gambar, dan botol. Anak mencocokkan benda dengan gambar sebelum memasukkan ke tas.','Setiap benda masuk, kita beri tanda pada gambarnya.'],
['Periksa dan simpan','Anak memeriksa tutup botol, resleting, dan tempat menyimpan tas. Orang dewasa membantu memastikan beban nyaman.','Apa yang perlu kita periksa sebelum tasnya ditutup?']
],['Jika anak memasukkan semua mainan, kembali ke kegiatan besok dan pilih satu per satu sesuai kebutuhan.','Jika resleting sulit, pegang sisi tas dan modelkan tarikan perlahan, lalu izinkan meminta bantuan.'],
'Anak membuat daftar sendiri untuk piknik singkat, lalu menjelaskan alasan memilih tiap benda.',[
['Daftar gambar membantu kita...',['Membawa semua barang','Membuat tas paling berat','Mengingat perlengkapan'],2,'Daftar membuat kebutuhan terlihat dan bisa diperiksa satu per satu.'],
['Sebelum botol dimasukkan ke tas, kita periksa...',['Tutupnya sudah rapat','Warna botol saja','Botol harus kosong'],0,'Tutup yang rapat membantu mencegah air tumpah ke barang lain.']
],['Gambar tiga perlengkapan yang kamu perlukan.','Beri kotak centang di samping setiap gambar.','Periksa tasmu sambil mencentang bersama pendamping.']);
L('life-2','life','Tangan bersih, siap makan','Mengenali urutan kebiasaan merawat diri.','Anak mempraktikkan mencuci tangan dengan sabun dan air mengalir bersama pendamping.',
['Air mengalir','Sabun','Lap bersih','Pijakan stabil jika diperlukan'],[
['Bicarakan waktunya','Tanyakan kegiatan sebelum makan dan sesudah dari toilet. Hubungkan cuci tangan dengan merawat diri.','Tangan kita dipakai menyentuh banyak benda. Sebelum makan, kita bersihkan dulu.'],
['Praktik bersama','Basahi tangan, gunakan sabun, gosok telapak, punggung tangan, sela jari, ibu jari, dan ujung jari. Lakukan sekitar dua puluh detik dengan pendamping.','Kita beri sabun ke semua bagian tangan, termasuk sela jari.'],
['Bilas dan rapikan','Bilas dengan air mengalir, lalu keringkan dengan lap bersih. Pastikan lantai tidak basah dan sabun dikembalikan.','Sudah bersih. Apa langkah terakhir supaya tangan dan tempatnya rapi?']
],['Jika urutannya terlupa, peragakan sambil menyebut satu langkah pada satu waktu.','Jika anak kurang nyaman dengan sabun tertentu, pilih sabun yang biasa cocok digunakan keluarga.'],
'Anak membuat tanda gambar dekat tempat cuci tangan sebagai pengingat sebelum makan.',[
['Sebelum makan, kebiasaan yang kita lakukan adalah...',['Menyentuh lantai','Mencuci tangan dengan sabun','Cukup mengelap baju'],1,'Sabun dan air mengalir membantu membersihkan tangan sebelum makan.'],
['Setelah tangan dibilas, kita...',['Memegang tempat sampah','Menambahkan tanah','Mengeringkan dengan lap bersih'],2,'Gunakan lap atau bahan pengering yang bersih.']
],['Gambar urutan: basahi, sabun dan gosok, bilas, keringkan.','Beri angka urutan dengan bantuan pendamping.','Gambar dua waktu ketika kamu perlu mencuci tangan.']);
L('life-3','life','Berbenah lima benda','Mengembalikan barang lewat kategori sederhana.','Anak mengelompokkan dan mengembalikan lima benda ke tempat yang disepakati.',
['5 benda mainan atau alat gambar','2 wadah','Label gambar'],[
['Pilih tempat bersama','Tentukan wadah untuk alat gambar dan mainan. Buat label gambar yang mudah dikenali.','Menurutmu, di mana rumah untuk pensil dan rumah untuk balok?'],
['Kembalikan satu-satu','Anak memilih lima benda untuk dirapikan. Cocokkan setiap benda dengan label wadah.','Benda ini termasuk kelompok yang mana?'],
['Lihat hasilnya','Amati ruang yang kembali kosong. Bicarakan bagaimana menemukan benda itu nanti.','Kalau besok ingin menggambar, sekarang kita tahu mencari di mana.']
],['Jika semua benda masuk satu wadah, kurangi menjadi dua jenis yang sangat berbeda.','Jika merapikan terasa berat, mulai dari dua benda dan lakukan berdampingan.'],
'Anak mendesain label gambar untuk satu laci atau rak kecil miliknya.',[
['Agar pensil mudah ditemukan lagi, kita...',['Menaruh di tempat yang disepakati','Menyembunyikannya','Melempar ke bawah meja'],0,'Tempat yang tetap membantu kita menemukan barang saat dibutuhkan.'],
['Jika ada terlalu banyak barang untuk dirapikan, kita bisa...',['Harus selesai tanpa bantuan','Mulai dari beberapa benda','Membuang semuanya'],1,'Bagian kecil membuat tugas lebih mudah dimulai.']
],['Gambar dua wadah dengan label berbeda.','Gambar lima benda dan hubungkan ke wadah yang sesuai.','Pilih satu sudut yang ingin dirapikan bersama.']);
L('life-4','life','Pagi yang lebih mandiri','Menyusun rutinitas pagi yang bisa dipahami anak.','Anak mengikuti tiga langkah rutinitas dan mengomunikasikan kebutuhan saat berpindah kegiatan.',
['3 kartu kertas','Krayon','Pita perekat'],[
['Pilih tiga kegiatan','Sepakati tiga kegiatan pagi keluarga, misalnya ke toilet, berpakaian, dan sarapan. Sesuaikan urutan dengan kebiasaan rumah.','Apa saja yang biasanya kita lakukan setelah bangun?'],
['Buat kartu urutan','Anak menggambar kegiatan. Tempel dalam urutan yang disepakati, tanpa menuntut membaca jam.','Setelah berpakaian, kegiatan apa yang datang berikutnya?'],
['Coba dan tinjau','Praktikkan melalui permainan peran. Anak membalik kartu yang selesai dan boleh meminta bantuan pada langkah sulit.','Bagian mana yang bisa kamu coba sendiri? Di mana kamu ingin ditemani?']
],['Jika perpindahan kegiatan sulit, beri pemberitahuan singkat sebelum berpindah dan tunjuk kartu berikutnya.','Jika rutinitas terlalu panjang, kembali ke dua langkah yang paling sering dilakukan.'],
'Gunakan cara yang sama untuk rutinitas menjelang tidur sesuai kebiasaan keluarga.',[
['Kartu rutinitas membantu kita tahu...',['Siapa yang paling cepat','Nilai sekolah','Apa yang dilakukan berikutnya'],2,'Gambar urutan membantu anak memahami kegiatan selanjutnya.'],
['Kalau satu langkah masih sulit, anak boleh...',['Meminta bantuan','Tidak boleh mencoba lagi','Menyalahkan diri sendiri'],0,'Kemandirian juga mencakup mengenali kapan kita membutuhkan bantuan.']
],['Gambar tiga kegiatan pagimu pada tiga kotak.','Hubungkan kotak dengan panah sesuai urutan keluarga.','Lingkari langkah yang ingin kamu coba sendiri besok.']);
const guides=[
 {id:'listen',title:'Beri ruang untuk anak berpikir',subtitle:'Panduan pendamping · 3 menit',icon:'chat',intro:'Jeda kecil setelah bertanya memberi anak kesempatan menyusun idenya sendiri.',steps:['Ajukan satu pertanyaan, lalu tunggu beberapa saat tanpa langsung menambahkan pertanyaan lain.','Perhatikan gerak, tatapan, atau benda yang ditunjuk. Jawaban tidak harus berupa kalimat.','Ulangi inti jawaban anak: jadi, menurutmu yang ini lebih banyak. Setelah itu, tanyakan bagaimana ia mengetahuinya.'],example:'“Menurutmu, mana yang lebih banyak?” [Beri jeda.] “Aku ingin mendengar caramu melihatnya.”'},
 {id:'mistakes',title:'Saat jawabannya belum tepat',subtitle:'Panduan pendamping · 3 menit',icon:'heart',intro:'Jawaban anak memberi petunjuk tentang caranya berpikir. Mulai dari situ sebelum memberi penjelasan.',steps:['Tanyakan cara anak mendapatkan jawaban tanpa memberi nada menguji.','Kembali ke benda nyata. Pindahkan, pasangkan, atau urutkan sambil mengamati bersama.','Jika anak mulai lelah, sederhanakan tugas atau akhiri dengan hal yang nyaman. Catat bagian yang perlu diulang.'],example:'“Boleh tunjukkan caramu menghitung? Kita geser benda yang sudah dihitung ke sini.”'},
 {id:'routine',title:'Rutinitas yang muat di hari Anda',subtitle:'Panduan pendamping · 2 menit',icon:'calendar',intro:'Rutinitas membantu ketika bisa disesuaikan dengan hari keluarga. Sesi yang terlewat dapat dijadwalkan ulang.',steps:['Pilih waktu setelah kebiasaan yang sudah ada, misalnya setelah camilan sore.','Siapkan bahan dari satu aktivitas saja. Mulai dengan durasi pendek dan berhenti saat perlu.','Akhiri dengan satu pertanyaan tentang pengalaman hari ini. Pilih jadwal berikutnya yang realistis.'],example:'“Hari ini kita punya waktu sebentar. Mau mencoba satu pesanan di toko buah kita?”'}
];
lessons.forEach(l=>l.level='tkb');
global.BAData={topics,lessons,guides};
if(typeof module!=='undefined'){require('./sd1-data.js')(global.BAData);require('./content.js').apply(global.BAData);}
if (typeof module!=='undefined') module.exports=global.BAData;
})(typeof window!=='undefined'?window:globalThis);
