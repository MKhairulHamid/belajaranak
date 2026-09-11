(function(global){
'use strict';
function extend(data){
 if(data.lessons.some(l=>l.level==='sd1'))return;
 const add=(id,topic,title,summary,goal,materials,steps,support,extension,questions)=>data.lessons.push({id,topic,level:'sd1',title,summary,goal,materials,steps:steps.map(([title,body,say])=>({title,body,say})),support,extension,questions:questions.map(([prompt,choices,answer,explanation])=>({prompt,choices,answer,explanation})),worksheet:['Amati gambar dan kerjakan petunjuk pertama.','Coba tantangan berikutnya dengan caramu.','Ceritakan cara yang kamu gunakan.'],minutes:20,order:data.lessons.filter(l=>l.topic===topic&&l.level==='sd1').length+1});
 add('sd1-math-1','math','Belanja buah sampai 20','Menggabungkan dua kelompok, lalu melihat puluhan dan satuan.','Anak menjumlahkan dua kelompok dengan hasil sampai 20 dan menjelaskan kelompok sepuluh serta sisanya.', ['20 benda hitung berukuran besar','Dua wadah','Pensil dan worksheet'],[
 ['Susun dua belanjaan','Letakkan tujuh benda di satu wadah dan lima di wadah lain. Minta anak menghitung setiap kelompok sebelum menggabungkannya.','Ada tujuh dan lima. Bagaimana caramu mencari jumlah semuanya?'],
 ['Buat satu kelompok sepuluh','Pindahkan tiga benda dari kelompok lima ke kelompok tujuh. Amati sepuluh benda dan dua sisanya; jumlah benda tetap sama.','Tujuh perlu berapa lagi agar menjadi sepuluh? Apa yang tersisa?'],
 ['Catat dengan gambar dan angka','Buka worksheet anak. Biarkan anak menghitung gambar atau memakai benda nyata, lalu menuliskan hasil dan menjelaskan satu jawabannya.','Boleh tunjukkan kelompok sepuluh yang kamu buat?']
 ],['Mulai dari hasil di bawah sepuluh dan pindahkan satu benda setiap kali menghitung.','Jika lambang angka membingungkan, anak boleh menggambar titik dahulu.'],'Coba dua cara berbeda untuk membuat jumlah empat belas.',[
 ['Ada 7 apel dan datang 5 apel lagi. Ada berapa semuanya?',['10','12','13'],1,'Tujuh ditambah tiga menjadi sepuluh; masih ada dua, jadi dua belas.'],
 ['Bilangan 14 terdiri dari satu kelompok sepuluh dan berapa satuan?',['4','10','14'],0,'Sepuluh dan empat satuan membentuk empat belas.']]);
 add('sd1-math-2','math','Jeruk yang dibagikan','Memahami pengurangan dengan benda dan cerita.','Anak menghubungkan cerita benda yang diambil dengan pengurangan sampai 20 serta memeriksa sisa dengan menghitung.', ['20 benda hitung berukuran besar','Wadah untuk benda yang dibagikan','Pensil dan worksheet'],[
 ['Ceritakan persediaannya','Susun sembilan jeruk mainan. Ajak anak menghitung dan memastikan jumlah awal sebelum ada yang dipindahkan.','Ada sembilan jeruk. Lima akan kita bagikan.'],
 ['Pisahkan yang dibagikan','Pindahkan lima benda ke wadah lain. Bedakan kelompok awal, yang dibagikan, dan yang masih tersedia.','Yang di wadah ini sudah dibagikan. Berapa yang masih ada di meja?'],
 ['Kerjakan dan periksa','Pada worksheet, coret gambar sesuai cerita lalu isi kotak sisa. Periksa satu soal dengan menyatukan sisa dan yang dibagikan.','Kalau empat yang tersisa digabung lima yang dibagikan, kembali berapa?']
 ],['Gunakan lima benda dahulu dan bagikan hanya satu atau dua.','Tutup benda yang dibagikan agar anak tidak menghitungnya sebagai sisa.'],'Ciptakan cerita sendiri tentang dua belas benda yang berkurang.',[
 ['Ada 9 jeruk. Sebanyak 5 dibagikan. Berapa sisanya?',['5','3','4'],2,'Sembilan dikurangi lima menyisakan empat jeruk.'],
 ['Ada 12 pensil. Sebanyak 2 disimpan. Berapa yang masih di meja?',['10','12','14'],0,'Dua dari dua belas dipindahkan; sepuluh masih di meja.']]);
 add('sd1-bahasa-1','bahasa','Kalimat dari gambar','Membaca kalimat pendek dan menemukan gambar yang sesuai.','Anak membaca kalimat sederhana, menghubungkannya dengan gambar, dan menyusun satu kalimat yang bermakna.', ['Worksheet dan pensil','Buku atau kartu gambar'],[
 ['Amati sebelum membaca','Tunjukkan gambar benda pada worksheet. Minta anak menyebut yang terlihat sebelum membaca kalimat di sebelahnya.','Apa yang kamu lihat? Sekarang kita cari kalimat yang cocok.'],
 ['Baca dengan makna','Baca kalimat pendek bersama. Tanyakan siapa atau benda apa yang dibicarakan, bukan hanya mengeja setiap huruf.','Kalimat ini mengatakan apa tentang apel itu?'],
 ['Susun pesan sendiri','Ajak anak menyusun tiga kata menjadi kalimat. Boleh menyalin kata, mendiktekan kepada orang tua, lalu membaca hasilnya.','Kalimatmu sudah menceritakan sesuatu. Coba bacakan kembali.']
 ],['Bacakan kalimat utuh lalu biarkan anak mencari satu kata yang ia kenal.','Tawarkan dua gambar saja sebelum menggunakan tiga pilihan.'],'Tambahkan satu kata sifat pada kalimat yang dibuat anak.',[
 ['Gambar mana cocok dengan kalimat: Ini buku saya.',['Gambar buku','Gambar ikan','Gambar tas'],0,'Kata buku menunjukkan benda yang disebut dalam kalimat.'],
 ['Susunan kata yang menjadi kalimat adalah ...',['membaca Ibu buku.','Ibu membaca buku.','buku Ibu membaca.'],1,'Ibu membaca buku menjelaskan siapa yang melakukan apa.']]);
 add('sd1-bahasa-2','bahasa','Cerita kebun tiga langkah','Menyusun peristiwa dan menceritakan sebab sederhana.','Anak mengurutkan tiga peristiwa merawat tanaman dan menulis atau mendiktekan satu kalimat untuk tiap peristiwa.', ['Worksheet dan pensil','Tanaman kecil bila tersedia'],[
 ['Temukan peristiwanya','Lihat gambar biji, kecambah, dan pohon. Diskusikan bahwa tumbuhan memerlukan waktu dan perawatan untuk berubah.','Mana yang biasanya kita lihat lebih dahulu saat mulai menanam?'],
 ['Susun urutan cerita','Minta anak memberi nomor urutan pada gambar. Gunakan kata pertama, kemudian, dan akhirnya untuk menyambung cerita.','Setelah biji ditanam dan dirawat, perubahan apa yang bisa muncul?'],
 ['Tuliskan versi anak','Anak mengisi satu kalimat pendek per gambar atau mendiktekan kalimatnya. Terima susunan kata yang bermakna meski ejaan masih dibantu.','Aku akan menuliskan ceritamu. Apakah sudah sesuai yang kamu maksud?']
 ],['Gunakan dua peristiwa dulu: sebelum dan sesudah.','Jangan menuntut tanaman berubah dalam sehari; lihat kembali foto pengamatan bila ada.'],'Ceritakan apa yang perlu dilakukan bila tanah mulai kering.',[
 ['Urutan yang masuk akal adalah ...',['Pohon, biji, kecambah','Biji, kecambah, pohon','Kecambah, pohon, biji'],1,'Tanaman dapat berawal dari biji, tumbuh menjadi kecambah, lalu membesar dengan waktu dan perawatan.'],
 ['Kata untuk menyambung peristiwa berikutnya adalah ...',['Kemudian','Siapa','Berapa'],0,'Kemudian membantu menjelaskan peristiwa yang terjadi sesudahnya.']]);
 add('sd1-english-1','english','I see an animal','Membaca pola kalimat dan mengenal enam hewan.','Anak menghubungkan cat, dog, bird, fish, rabbit, dan snail dengan gambar serta mencoba kalimat I see a ... dalam konteks.', ['Worksheet hewan','Pensil'],[
 ['Kenalkan melalui gambar','Tunjuk satu gambar dan ucapkan nama hewan dalam bahasa Inggris. Anak boleh mendengar dahulu sebelum menirukan.','This is a cat. Can you find the cat?'],
 ['Cari sesuai kalimat','Bacakan I see a fish dan minta anak melingkari gambar yang cocok. Ulangi dengan hewan lain tanpa berlomba.','I see a fish. Which picture is the fish?'],
 ['Giliran anak berbicara','Anak memilih hewan dan mencoba mengucapkan I see a ... . Bantu kata yang belum diingat sambil menunjuk gambarnya.','Choose an animal. What do you see?']
 ],['Mulai dengan dua hewan yang paling dikenal.','Terima anak menunjuk gambar; ulangi ungkapannya tanpa memaksa menirukan.'],'Cari hewan yang sama dalam buku lain dan gunakan kalimat yang sama.',[
 ['I see a rabbit. Pilih hewannya.',['Ikan','Kelinci','Burung'],1,'Rabbit berarti kelinci. I see a rabbit berarti aku melihat seekor kelinci.'],
 ['Fish adalah ...',['Ikan','Kucing','Anjing'],0,'Fish berarti ikan.']]);
 add('sd1-english-2','english','My body, my words','Menghubungkan kata bahasa Inggris dengan bagian tubuh.','Anak menunjuk head, eye, nose, mouth, hand, dan foot serta memasangkan kata dengan bagian tubuh pada gambar.', ['Worksheet tubuh','Pensil dan cermin opsional'],[
 ['Dengar dan tunjuk diri','Sebut head, hand, dan foot sambil menunjuk tubuh sendiri. Beri kesempatan anak merespons dengan gerak.','This is my hand. Where is your hand?'],
 ['Amati gambar tubuh','Lihat worksheet. Ikuti garis dari kotak menuju bagian tubuh, lalu pilih kata dari bank kata.','Follow this line. Does it point to the head or the foot?'],
 ['Bermain instruksi singkat','Gunakan instruksi Touch your nose atau Show your hand. Anak boleh memberi instruksi balik kepada pendamping.','Touch your nose. Now you can tell me what to touch.']
 ],['Kenalkan tiga kata dahulu sebelum enam kata sekaligus.','Tunjuk tubuh sendiri; tidak perlu menyentuh tubuh anak.'],'Gunakan dua instruksi berurutan: show your hand, then touch your head.',[
 ['Touch your nose berarti ...',['Sentuh hidungmu','Tunjukkan kakimu','Buka bukumu'],0,'Nose berarti hidung.'],
 ['Kata bahasa Inggris untuk tangan adalah ...',['Foot','Hand','Eye'],1,'Hand berarti tangan; foot berarti kaki dan eye berarti mata.']]);
 add('sd1-science-1','science','Hidup atau benda?','Mengelompokkan berdasarkan ciri yang diamati.','Anak membedakan contoh makhluk hidup dan benda tak hidup dengan alasan sederhana seperti tumbuh dan membutuhkan air atau makanan.', ['Worksheet','Daun atau tanaman','Buku dan bola'],[
 ['Bandingkan contoh nyata','Letakkan tanaman di dekat bola. Tanyakan apa yang dapat berubah pada tanaman setelah beberapa minggu perawatan.','Apa yang dibutuhkan tanaman agar terus hidup? Apakah bola juga perlu makan?'],
 ['Kelompokkan dengan alasan','Anak mengelompokkan gambar hewan dan tumbuhan sebagai makhluk hidup serta perlengkapan sebagai benda tak hidup.','Mengapa kamu menaruh pohon bersama ikan?'],
 ['Periksa contoh yang menarik','Diskusikan bahwa tanaman hidup meski tidak berjalan. Mobil mainan bergerak saat didorong tetapi tidak tumbuh sendiri.','Apakah semua yang bergerak pasti hidup? Kita cari alasannya.']
 ],['Gunakan dua contoh yang jelas, misalnya kucing dan buku.','Terima dugaan awal, lalu kembali membahas kebutuhan tumbuh dan hidup.'],'Cari satu contoh baru di sekitar rumah untuk tiap kelompok.',[
 ['Yang termasuk makhluk hidup adalah ...',['Buku','Pohon','Tas'],1,'Pohon tumbuh dan membutuhkan air, udara, dan cahaya yang sesuai.'],
 ['Bola menggelinding ketika didorong. Apakah bola makhluk hidup?',['Ya, karena bergerak','Tidak, bola tidak tumbuh dan tidak butuh makan','Ya, karena bulat'],1,'Benda dapat bergerak karena dorongan. Gerakan saja tidak cukup untuk menyebut sesuatu hidup.']]);
 add('sd1-science-2','science','Cuaca dan pilihanku','Mengamati cuaca dan menghubungkannya dengan kegiatan.','Anak mencatat cuaca yang dilihat dan memilih perlengkapan atau kegiatan yang sesuai sambil menjelaskan alasannya.', ['Worksheet dan pensil','Jendela untuk mengamati langit dengan aman'],[
 ['Amati dari tempat aman','Lihat langit dari jendela atau teras. Jangan menatap matahari langsung. Sebut ciri yang benar-benar terlihat.','Apakah ada awan? Bagaimana halaman terlihat hari ini?'],
 ['Catat hasil pengamatan','Anak melingkari gambar yang mendekati cuaca dan menggambar satu petunjuk yang diamati.','Gambar mana paling mirip keadaan di luar?'],
 ['Pilih kegiatan yang sesuai','Bicarakan pilihan kegiatan saat hujan atau terik. Tidak ada satu kegiatan wajib; minta anak memberikan alasan yang aman.','Jika hujan deras, di mana tempat yang nyaman untuk bermain?']
 ],['Pilih antara cerah dan hujan terlebih dahulu.','Jika cuaca sulit dilihat, diskusikan pengalaman kemarin dan tandai sebagai cerita, bukan pengamatan hari ini.'],'Buat catatan cuaca pada tiga hari berbeda dan bandingkan.',[
 ['Saat hujan deras, pilihan bermain yang aman adalah ...',['Bermain di dalam rumah','Berteduh di bawah pohon saat petir','Berdiri di jalan'],0,'Di dalam rumah kita dapat tetap bermain sambil terlindung dari hujan.'],
 ['Untuk mengetahui cuaca sekarang, kita ...',['Menebak dari warna baju','Mengamati keadaan di luar dengan aman','Melihat tas sekolah'],1,'Pengamatan langsung memberi petunjuk tentang cuaca saat ini.']]);
 add('sd1-art-1','art','Pola untuk bingkai karya','Mencipta motif berulang dengan aturan buatan sendiri.','Anak mengenali pola bentuk AB dan AAB, melanjutkannya, lalu membuat pola sendiri untuk menghias bingkai.', ['Worksheet','Pensil warna'],[
 ['Cari bagian yang berulang','Lihat deret daun, bunga, daun, bunga. Minta anak menunjukkan potongan paling pendek yang terus diulang.','Bagian mana yang muncul lagi dan lagi?'],
 ['Lanjutkan motif','Anak menggambar bentuk berikutnya pada kotak kosong. Boleh memakai warna lain asal aturan bentuk tetap jelas.','Kalau aturannya daun lalu bunga, setelah bunga ada apa?'],
 ['Buat aturan sendiri','Pilih dua bentuk dan susun bingkai kecil. Ajak anak menjelaskan aturannya sebelum menambahkan gambar di tengah.','Ceritakan aturan bingkaimu supaya aku bisa melanjutkannya.']
 ],['Mulai dengan dua jenis benda nyata sebelum menggambar.','Beri contoh satu pengulangan dan biarkan anak meneruskan berikutnya.'],'Buat pola AAB dengan dua daun dan satu bunga.',[
 ['Daun, bunga, daun, bunga. Berikutnya ...',['Daun','Bunga','Buku'],0,'Pola mengulang daun lalu bunga.'],
 ['Dua lingkaran lalu satu persegi berulang. Setelah persegi, mulai lagi dengan ...',['Segitiga','Lingkaran','Bintang'],1,'Unit pola dimulai lagi dengan lingkaran.']]);
 add('sd1-art-2','art','Gambar separuh temanku','Mengenal simetri melalui lipatan dan gambar.','Anak membandingkan dua sisi gambar dan mencoba melengkapi bentuk sederhana dengan garis tengah sebagai acuan.', ['Worksheet','Pensil warna','Selembar kertas untuk dilipat'],[
 ['Lipat dan cocokkan','Lipat kertas menjadi dua, buat bentuk hati sederhana dengan bantuan pendamping, lalu buka untuk melihat dua sisi.','Apa yang terjadi kalau dua sisi kertas ini kita pertemukan?'],
 ['Amati garis tengah','Tunjuk garis putus-putus pada worksheet. Cari bagian yang sudah tergambar dan sisi yang masih kosong.','Bagian mana yang perlu dibuat di sisi ini agar mirip?'],
 ['Lengkapi dengan caramu','Anak melengkapi gambar di sisi kosong. Fokus pada mencoba mencocokkan letak, bukan menuntut gambar sempurna.','Kita lihat jaraknya dari garis tengah. Sudah mirip atau ingin dicoba lagi?']
 ],['Gunakan satu bentuk besar seperti hati atau daun.','Anak boleh melipat kertas untuk membandingkan posisi kedua sisi.'],'Coba mencari benda rumah yang tampak memiliki dua sisi serupa.',[
 ['Untuk membandingkan dua sisi gambar, kita dapat ...',['Melipat pada garis tengah','Menghapus semua gambar','Mengganti semua warnanya'],0,'Lipatan membantu melihat apakah dua sisi bertemu.'],
 ['Garis tengah membantu kita melihat ...',['Harga gambar','Hubungan sisi kiri dan kanan','Nama warna'],1,'Garis tengah menjadi acuan untuk membandingkan dua sisi.']]);
 add('sd1-motor-1','motor','Peta pensil ke sekolah','Mengikuti arah dan mengendalikan garis.','Anak mengikuti jalur pada petak menggunakan instruksi arah sederhana dan membuat satu rute miliknya sendiri.', ['Worksheet','Pensil'],[
 ['Kenali titik mulai','Cari gambar rumah dan sekolah pada worksheet. Tunjuk petak awal dan bicarakan arah kanan, kiri, atas, bawah.','Kita mulai dari rumah. Ke arah mana sekolah berada?'],
 ['Ikuti rute perlahan','Bacakan satu instruksi arah setiap kali. Anak menarik garis dari tengah satu petak ke petak berikutnya.','Coba dua langkah ke kanan. Kita berhenti sebentar di sini.'],
 ['Ciptakan rute kedua','Minta anak membuat rute lain lalu membacakan arahnya kepada Anda. Jangan memakai kecepatan sebagai penilaian.','Bisakah kita sampai dengan jalan yang berbeda?']
 ],['Gunakan jari untuk menelusuri sebelum memakai pensil.','Kurangi jumlah perpindahan dan bacakan satu arah setiap kali.'],'Anak membuat tiga instruksi arah untuk pendamping.',[
 ['Dari satu petak, maju dua petak ke kanan berarti ...',['Pindah dua kotak ke kanan','Pindah dua kotak ke kiri','Tetap di tempat'],0,'Kita berpindah dua kotak menuju kanan.'],
 ['Jika garis melewati batas, kita bisa ...',['Mencoba perlahan lagi','Harus berhenti selamanya','Menyalahkan pensil'],0,'Boleh mencoba lagi dengan gerakan yang lebih nyaman.']]);
 add('sd1-motor-2','motor','Gerak silang tubuh','Menggabungkan koordinasi sisi kiri dan kanan.','Anak mencoba rangkaian gerak silang sederhana dengan kendali tubuh dan jeda sesuai kebutuhan.', ['Ruang lantai yang aman','Worksheet urutan gerak'],[
 ['Sediakan ruang nyaman','Pastikan lantai kering dan area cukup luas. Coba merentangkan tangan dengan jarak aman dari benda di sekitar.','Kita cek dulu, apakah tanganmu punya ruang untuk bergerak?'],
 ['Contohkan gerak silang','Contohkan tangan kanan menyentuh lutut kiri secara perlahan, lalu sebaliknya. Anak boleh duduk bila lebih nyaman.','Tangan ini menyeberang ke lutut di sisi satunya. Coba pelan-pelan.'],
 ['Susun rangkaian pendek','Gabungkan tepuk tangan, gerak silang, lalu jeda. Anak memilih jumlah pengulangan yang nyaman dan menggambar urutannya.','Setelah tepuk dan gerak silang, kita jeda. Bagaimana rasanya?']
 ],['Gunakan satu tangan dan satu lutut dahulu.','Boleh mengganti dengan menyentuh bahu berlawanan sambil duduk.'],'Anak menciptakan urutan tiga gerak aman untuk Anda ikuti.',[
 ['Gerak silang dapat berupa ...',['Tangan kanan menyentuh lutut kiri','Berlari di lantai licin','Menahan napas lama'],0,'Gerak ini menyeberangi garis tengah tubuh.'],
 ['Saat tubuh lelah, kita ...',['Mengambil jeda','Harus terus bergerak','Mempercepat gerakan'],0,'Jeda membantu kita memperhatikan kebutuhan tubuh.']]);
 add('sd1-social-1','social','Dua teman, satu mainan','Mencari beberapa solusi saat keinginan berbeda.','Anak menyebut kebutuhan dua pihak dan mencoba solusi yang disepakati dalam situasi berbagi mainan.', ['Satu mainan','Worksheet dan pensil'],[
 ['Dengarkan kedua pihak','Ceritakan dua teman ingin memakai bola yang sama. Tanyakan keinginan masing-masing tanpa memberi cap nakal.','Keduanya ingin bermain. Apa yang masing-masing butuhkan?'],
 ['Cari beberapa pilihan','Diskusikan bergiliran atau bermain bersama. Minta anak menilai pilihan yang aman dan dapat diterima kedua teman.','Selain berebut, cara apa lagi yang bisa kita coba?'],
 ['Latih kalimat kesepakatan','Mainkan percakapan singkat. Anak mencoba mengatakan keinginannya dan mendengar jawaban teman.','Aku ingin giliran setelahmu. Apakah kamu setuju?']
 ],['Tawarkan dua pilihan aman jika anak belum punya ide.','Pendamping membantu menjaga batas: tidak memukul atau merampas.'],'Coba situasi lain, misalnya memilih buku yang akan dibaca bersama.',[
 ['Dua teman ingin bola yang sama. Pilihan yang bisa dibicarakan adalah ...',['Bergiliran','Merebut','Mendorong'],0,'Bergiliran dapat menjadi kesepakatan jika kedua pihak memahami gilirannya.'],
 ['Kalimat meminta giliran yang jelas adalah ...',['Aku ingin giliran setelahmu, boleh?','Pokoknya milikku!','Pergi saja!'],0,'Kalimat ini menyatakan kebutuhan sambil memberi ruang untuk jawaban teman.']]);
 add('sd1-social-2','social','Perasaan dan kebutuhanku','Menghubungkan emosi, kejadian, dan bantuan yang dibutuhkan.','Anak menceritakan satu perasaan, kemungkinan pemicunya, dan dukungan yang dapat diminta kepada orang tepercaya.', ['Worksheet','Pensil warna'],[
 ['Pilih perasaan saat ini','Tanyakan perasaan anak tanpa menuntut jawaban bahagia. Ia boleh menunjuk, menggambar, atau mengatakan belum tahu.','Kalau mau bercerita, apa yang terasa di hatimu hari ini?'],
 ['Cari hubungan dengan kejadian','Bantu anak menceritakan kejadian sebelum perasaan muncul. Hindari menebak bahwa semua orang merasakan hal yang sama.','Apa yang terjadi sebelum kamu merasa begitu?'],
 ['Sebut kebutuhan dengan jelas','Latih satu kalimat meminta dukungan, misalnya aku perlu ditemani atau aku ingin jeda.','Bantuan seperti apa yang kamu inginkan dariku?']
 ],['Pendamping dapat berbagi satu contoh pengalamannya sendiri.','Jangan memaksa anak menjelaskan jika belum siap; tawarkan waktu lain.'],'Ceritakan bahwa dua orang bisa merasakan hal berbeda pada kejadian yang sama.',[
 ['Saat kecewa, kita boleh ...',['Meminta ditemani','Harus menyembunyikannya','Menyakiti teman'],0,'Perasaan boleh hadir. Kita dapat meminta dukungan sambil menjaga tindakan tetap aman.'],
 ['Kalimat meminta dukungan adalah ...',['Aku butuh jeda sebentar','Semua salahmu','Tidak boleh ada yang sedih'],0,'Kalimat ini menyebut kebutuhan secara jelas.']]);
 add('sd1-life-1','life','Daftar tas sesuai kegiatan','Memilih barang berdasarkan rencana, lalu memeriksanya.','Anak menyesuaikan isi tas dengan kegiatan yang direncanakan dan memeriksa daftar gambar secara mandiri atau dengan bantuan.', ['Tas anak','Buku, pensil, botol minum','Worksheet daftar barang'],[
 ['Baca rencana kegiatan','Ceritakan bahwa hari ini ada membaca, menggambar, dan minum saat istirahat. Tentukan perlengkapan yang terkait.','Apa yang kita perlukan untuk membaca dan menggambar?'],
 ['Pilih dan masukkan','Anak memilih barang dari gambar kemudian memasukkan benda nyata yang tersedia ke tas. Barang lain boleh tetap di tempatnya.','Mana yang dibutuhkan hari ini, dan mana yang bisa ditinggal?'],
 ['Periksa satu per satu','Cocokkan kembali isi tas dengan daftar. Ajak anak menandai setelah barang benar-benar ada di tas.','Kita tandai sesudah diperiksa, ya. Apa yang belum masuk?']
 ],['Mulai dengan dua barang yang dibutuhkan.','Gunakan gambar barang nyata anak jika berbeda bentuk dengan worksheet.'],'Ubah rencana menjadi kegiatan olahraga dan diskusikan isi tas yang berubah.',[
 ['Untuk menggambar kita perlu ...',['Pensil','Sabun cuci tangan','Piring'],0,'Pensil digunakan untuk menggambar pada kertas.'],
 ['Daftar ditandai setelah ...',['Barang diperiksa sudah masuk tas','Baru mengira-ngira','Melihat warna tas'],0,'Memeriksa barang membuat daftar membantu persiapan yang sebenarnya.']]);
 add('sd1-life-2','life','Urutkan pagi versiku','Merencanakan urutan dan menyesuaikan saat ada perubahan.','Anak menyusun rutinitas pagi yang masuk akal untuk keluarganya dan memilih langkah yang dapat dilakukan sendiri.', ['Worksheet','Pensil'],[
 ['Ceritakan pagi keluarga','Ajak anak menyebut tiga atau empat kebiasaan sebelum berangkat. Urutannya dapat berbeda pada setiap keluarga.','Biasanya setelah bangun, apa yang kamu lakukan?'],
 ['Susun rencana gambar','Anak memberi nomor pada gambar sesuai rencana yang disepakati. Tanyakan langkah mana yang masih membutuhkan bantuan.','Mana yang ingin kamu coba sendiri? Kapan perlu memanggilku?'],
 ['Latih saat rencana berubah','Ceritakan botol minum belum terisi. Minta anak menyampaikan kebutuhan dan menyesuaikan langkah tanpa terburu-buru.','Botolnya masih kosong. Apa yang bisa kamu lakukan atau tanyakan?']
 ],['Pilih tiga kebiasaan dulu agar rencana mudah diingat.','Pendamping membantu tugas yang belum aman dikerjakan sendiri.'],'Coba rencana selama satu pagi, lalu ubah bagian yang kurang nyaman.',[
 ['Jika ada perlengkapan belum siap, kita bisa ...',['Memeriksa dan meminta bantuan','Diam sampai terlambat','Menyalahkan teman'],0,'Menyampaikan kebutuhan membantu keluarga menyelesaikan persiapan.'],
 ['Rutinitas pagi yang baik untuk keluarga ...',['Bisa disepakati dan disesuaikan','Harus sama dengan semua teman','Tidak boleh berubah'],0,'Keluarga dapat menyesuaikan rutinitas dengan kebutuhan dan keadaan.']]);
}
if(typeof module!=='undefined')module.exports=extend;else extend(global.BAData);
})(typeof window!=='undefined'?window:globalThis);
