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
 ['Bilangan 14 terdiri dari satu kelompok sepuluh dan berapa satuan?',['10','14','4'],2,'Sepuluh dan empat satuan membentuk empat belas.']]);
 add('sd1-math-2','math','Jeruk yang dibagikan','Memahami pengurangan dengan benda dan cerita.','Anak menghubungkan cerita benda yang diambil dengan pengurangan sampai 20 serta memeriksa sisa dengan menghitung.', ['20 benda hitung berukuran besar','Wadah untuk benda yang dibagikan','Pensil dan worksheet'],[
 ['Ceritakan persediaannya','Susun sembilan jeruk mainan. Ajak anak menghitung dan memastikan jumlah awal sebelum ada yang dipindahkan.','Ada sembilan jeruk. Lima akan kita bagikan.'],
 ['Pisahkan yang dibagikan','Pindahkan lima benda ke wadah lain. Bedakan kelompok awal, yang dibagikan, dan yang masih tersedia.','Yang di wadah ini sudah dibagikan. Berapa yang masih ada di meja?'],
 ['Kerjakan dan periksa','Pada worksheet, coret gambar sesuai cerita lalu isi kotak sisa. Periksa satu soal dengan menyatukan sisa dan yang dibagikan.','Kalau empat yang tersisa digabung lima yang dibagikan, kembali berapa?']
 ],['Gunakan lima benda dahulu dan bagikan hanya satu atau dua.','Tutup benda yang dibagikan agar anak tidak menghitungnya sebagai sisa.'],'Ciptakan cerita sendiri tentang dua belas benda yang berkurang.',[
 ['Ada 9 jeruk. Sebanyak 5 dibagikan. Berapa sisanya?',['4','5','3'],0,'Sembilan dikurangi lima menyisakan empat jeruk.'],
 ['Ada 12 pensil. Sebanyak 2 disimpan. Berapa yang masih di meja?',['12','10','14'],1,'Dua dari dua belas dipindahkan; sepuluh masih di meja.']]);
 add('sd1-bahasa-1','bahasa','Kalimat dari gambar','Membaca kalimat pendek dan menemukan gambar yang sesuai.','Anak membaca kalimat sederhana, menghubungkannya dengan gambar, dan menyusun satu kalimat yang bermakna.', ['Worksheet dan pensil','Buku atau kartu gambar'],[
 ['Amati sebelum membaca','Tunjukkan gambar benda pada worksheet. Minta anak menyebut yang terlihat sebelum membaca kalimat di sebelahnya.','Apa yang kamu lihat? Sekarang kita cari kalimat yang cocok.'],
 ['Baca dengan makna','Baca kalimat pendek bersama. Tanyakan siapa atau benda apa yang dibicarakan, bukan hanya mengeja setiap huruf.','Kalimat ini mengatakan apa tentang apel itu?'],
 ['Susun pesan sendiri','Ajak anak menyusun tiga kata menjadi kalimat. Boleh menyalin kata, mendiktekan kepada orang tua, lalu membaca hasilnya.','Kalimatmu sudah menceritakan sesuatu. Coba bacakan kembali.']
 ],['Bacakan kalimat utuh lalu biarkan anak mencari satu kata yang ia kenal.','Tawarkan dua gambar saja sebelum menggunakan tiga pilihan.'],'Tambahkan satu kata sifat pada kalimat yang dibuat anak.',[
 ['Gambar mana cocok dengan kalimat: Ini buku saya.',['Gambar ikan','Gambar tas','Gambar buku'],2,'Kata buku menunjukkan benda yang disebut dalam kalimat.'],
 ['Susunan kata yang menjadi kalimat adalah ...',['Ibu membaca buku.','membaca Ibu buku.','buku Ibu membaca.'],0,'Ibu membaca buku menjelaskan siapa yang melakukan apa.']]);
 add('sd1-bahasa-2','bahasa','Cerita kebun tiga langkah','Menyusun peristiwa dan menceritakan sebab sederhana.','Anak mengurutkan tiga peristiwa merawat tanaman dan menulis atau mendiktekan satu kalimat untuk tiap peristiwa.', ['Worksheet dan pensil','Tanaman kecil bila tersedia'],[
 ['Temukan peristiwanya','Lihat gambar biji, kecambah, dan pohon. Diskusikan bahwa tumbuhan memerlukan waktu dan perawatan untuk berubah.','Mana yang biasanya kita lihat lebih dahulu saat mulai menanam?'],
 ['Susun urutan cerita','Minta anak memberi nomor urutan pada gambar. Gunakan kata pertama, kemudian, dan akhirnya untuk menyambung cerita.','Setelah biji ditanam dan dirawat, perubahan apa yang bisa muncul?'],
 ['Tuliskan versi anak','Anak mengisi satu kalimat pendek per gambar atau mendiktekan kalimatnya. Terima susunan kata yang bermakna meski ejaan masih dibantu.','Aku akan menuliskan ceritamu. Apakah sudah sesuai yang kamu maksud?']
 ],['Gunakan dua peristiwa dulu: sebelum dan sesudah.','Jangan menuntut tanaman berubah dalam sehari; lihat kembali foto pengamatan bila ada.'],'Ceritakan apa yang perlu dilakukan bila tanah mulai kering.',[
 ['Urutan yang masuk akal adalah ...',['Pohon, biji, kecambah','Biji, kecambah, pohon','Kecambah, pohon, biji'],1,'Tanaman dapat berawal dari biji, tumbuh menjadi kecambah, lalu membesar dengan waktu dan perawatan.'],
 ['Kata untuk menyambung peristiwa berikutnya adalah ...',['Siapa','Berapa','Kemudian'],2,'Kemudian membantu menjelaskan peristiwa yang terjadi sesudahnya.']]);
 add('sd1-english-1','english','I see an animal','Membaca pola kalimat dan mengenal enam hewan.','Anak menghubungkan cat, dog, bird, fish, rabbit, dan snail dengan gambar serta mencoba kalimat I see a ... dalam konteks.', ['Worksheet hewan','Pensil'],[
 ['Kenalkan melalui gambar','Tunjuk satu gambar dan ucapkan nama hewan dalam bahasa Inggris. Anak boleh mendengar dahulu sebelum menirukan.','This is a cat. Can you find the cat?'],
 ['Cari sesuai kalimat','Bacakan I see a fish dan minta anak melingkari gambar yang cocok. Ulangi dengan hewan lain tanpa berlomba.','I see a fish. Which picture is the fish?'],
 ['Giliran anak berbicara','Anak memilih hewan dan mencoba mengucapkan I see a ... . Bantu kata yang belum diingat sambil menunjuk gambarnya.','Choose an animal. What do you see?']
 ],['Mulai dengan dua hewan yang paling dikenal.','Terima anak menunjuk gambar; ulangi ungkapannya tanpa memaksa menirukan.'],'Cari hewan yang sama dalam buku lain dan gunakan kalimat yang sama.',[
 ['I see a rabbit. Pilih hewannya.',['Kelinci','Ikan','Burung'],0,'Rabbit berarti kelinci. I see a rabbit berarti aku melihat seekor kelinci.'],
 ['Fish adalah ...',['Kucing','Ikan','Anjing'],1,'Fish berarti ikan.']]);
 add('sd1-english-2','english','My body, my words','Menghubungkan kata bahasa Inggris dengan bagian tubuh.','Anak menunjuk head, eye, nose, mouth, hand, dan foot serta memasangkan kata dengan bagian tubuh pada gambar.', ['Worksheet tubuh','Pensil dan cermin opsional'],[
 ['Dengar dan tunjuk diri','Sebut head, hand, dan foot sambil menunjuk tubuh sendiri. Beri kesempatan anak merespons dengan gerak.','This is my hand. Where is your hand?'],
 ['Amati gambar tubuh','Lihat worksheet. Ikuti garis dari kotak menuju bagian tubuh, lalu pilih kata dari bank kata.','Follow this line. Does it point to the head or the foot?'],
 ['Bermain instruksi singkat','Gunakan instruksi Touch your nose atau Show your hand. Anak boleh memberi instruksi balik kepada pendamping.','Touch your nose. Now you can tell me what to touch.']
 ],['Kenalkan tiga kata dahulu sebelum enam kata sekaligus.','Tunjuk tubuh sendiri; tidak perlu menyentuh tubuh anak.'],'Gunakan dua instruksi berurutan: show your hand, then touch your head.',[
 ['Touch your nose berarti ...',['Tunjukkan kakimu','Buka bukumu','Sentuh hidungmu'],2,'Nose berarti hidung.'],
 ['Kata bahasa Inggris untuk tangan adalah ...',['Hand','Foot','Eye'],0,'Hand berarti tangan; foot berarti kaki dan eye berarti mata.']]);
 add('sd1-science-1','science','Hidup atau benda?','Mengelompokkan berdasarkan ciri yang diamati.','Anak membedakan contoh makhluk hidup dan benda tak hidup dengan alasan sederhana seperti tumbuh dan membutuhkan air atau makanan.', ['Worksheet','Daun atau tanaman','Buku dan bola'],[
 ['Bandingkan contoh nyata','Letakkan tanaman di dekat bola. Tanyakan apa yang dapat berubah pada tanaman setelah beberapa minggu perawatan.','Apa yang dibutuhkan tanaman agar terus hidup? Apakah bola juga perlu makan?'],
 ['Kelompokkan dengan alasan','Anak mengelompokkan gambar hewan dan tumbuhan sebagai makhluk hidup serta perlengkapan sebagai benda tak hidup.','Mengapa kamu menaruh pohon bersama ikan?'],
 ['Periksa contoh yang menarik','Diskusikan bahwa tanaman hidup meski tidak berjalan. Mobil mainan bergerak saat didorong tetapi tidak tumbuh sendiri.','Apakah semua yang bergerak pasti hidup? Kita cari alasannya.']
 ],['Gunakan dua contoh yang jelas, misalnya kucing dan buku.','Terima dugaan awal, lalu kembali membahas kebutuhan tumbuh dan hidup.'],'Cari satu contoh baru di sekitar rumah untuk tiap kelompok.',[
 ['Yang termasuk makhluk hidup adalah ...',['Buku','Pohon','Tas'],1,'Pohon tumbuh dan membutuhkan air, udara, dan cahaya yang sesuai.'],
 ['Bola menggelinding ketika didorong. Apakah bola makhluk hidup?',['Ya, karena bergerak','Ya, karena bulat','Tidak, bola tidak tumbuh dan tidak butuh makan'],2,'Benda dapat bergerak karena dorongan. Gerakan saja tidak cukup untuk menyebut sesuatu hidup.']]);
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
 ['Daun, bunga, daun, bunga. Berikutnya ...',['Bunga','Buku','Daun'],2,'Pola mengulang daun lalu bunga.'],
 ['Dua lingkaran lalu satu persegi berulang. Setelah persegi, mulai lagi dengan ...',['Lingkaran','Segitiga','Bintang'],0,'Unit pola dimulai lagi dengan lingkaran.']]);
 add('sd1-art-2','art','Gambar separuh temanku','Mengenal simetri melalui lipatan dan gambar.','Anak membandingkan dua sisi gambar dan mencoba melengkapi bentuk sederhana dengan garis tengah sebagai acuan.', ['Worksheet','Pensil warna','Selembar kertas untuk dilipat'],[
 ['Lipat dan cocokkan','Lipat kertas menjadi dua, buat bentuk hati sederhana dengan bantuan pendamping, lalu buka untuk melihat dua sisi.','Apa yang terjadi kalau dua sisi kertas ini kita pertemukan?'],
 ['Amati garis tengah','Tunjuk garis putus-putus pada worksheet. Cari bagian yang sudah tergambar dan sisi yang masih kosong.','Bagian mana yang perlu dibuat di sisi ini agar mirip?'],
 ['Lengkapi dengan caramu','Anak melengkapi gambar di sisi kosong. Fokus pada mencoba mencocokkan letak, bukan menuntut gambar sempurna.','Kita lihat jaraknya dari garis tengah. Sudah mirip atau ingin dicoba lagi?']
 ],['Gunakan satu bentuk besar seperti hati atau daun.','Anak boleh melipat kertas untuk membandingkan posisi kedua sisi.'],'Coba mencari benda rumah yang tampak memiliki dua sisi serupa.',[
 ['Untuk membandingkan dua sisi gambar, kita dapat ...',['Menghapus semua gambar','Melipat pada garis tengah','Mengganti semua warnanya'],1,'Lipatan membantu melihat apakah dua sisi bertemu.'],
 ['Garis tengah membantu kita melihat ...',['Harga gambar','Nama warna','Hubungan sisi kiri dan kanan'],2,'Garis tengah menjadi acuan untuk membandingkan dua sisi.']]);
 add('sd1-motor-1','motor','Peta pensil ke sekolah','Mengikuti arah dan mengendalikan garis.','Anak mengikuti jalur pada petak menggunakan instruksi arah sederhana dan membuat satu rute miliknya sendiri.', ['Worksheet','Pensil'],[
 ['Kenali titik mulai','Cari gambar rumah dan sekolah pada worksheet. Tunjuk petak awal dan bicarakan arah kanan, kiri, atas, bawah.','Kita mulai dari rumah. Ke arah mana sekolah berada?'],
 ['Ikuti rute perlahan','Bacakan satu instruksi arah setiap kali. Anak menarik garis dari tengah satu petak ke petak berikutnya.','Coba dua langkah ke kanan. Kita berhenti sebentar di sini.'],
 ['Ciptakan rute kedua','Minta anak membuat rute lain lalu membacakan arahnya kepada Anda. Jangan memakai kecepatan sebagai penilaian.','Bisakah kita sampai dengan jalan yang berbeda?']
 ],['Gunakan jari untuk menelusuri sebelum memakai pensil.','Kurangi jumlah perpindahan dan bacakan satu arah setiap kali.'],'Anak membuat tiga instruksi arah untuk pendamping.',[
 ['Dari satu petak, maju dua petak ke kanan berarti ...',['Pindah dua kotak ke kanan','Pindah dua kotak ke kiri','Tetap di tempat'],0,'Kita berpindah dua kotak menuju kanan.'],
 ['Jika garis melewati batas, kita bisa ...',['Harus berhenti selamanya','Mencoba perlahan lagi','Menyalahkan pensil'],1,'Boleh mencoba lagi dengan gerakan yang lebih nyaman.']]);
 add('sd1-motor-2','motor','Gerak silang tubuh','Menggabungkan koordinasi sisi kiri dan kanan.','Anak mencoba rangkaian gerak silang sederhana dengan kendali tubuh dan jeda sesuai kebutuhan.', ['Ruang lantai yang aman','Worksheet urutan gerak'],[
 ['Sediakan ruang nyaman','Pastikan lantai kering dan area cukup luas. Coba merentangkan tangan dengan jarak aman dari benda di sekitar.','Kita cek dulu, apakah tanganmu punya ruang untuk bergerak?'],
 ['Contohkan gerak silang','Contohkan tangan kanan menyentuh lutut kiri secara perlahan, lalu sebaliknya. Anak boleh duduk bila lebih nyaman.','Tangan ini menyeberang ke lutut di sisi satunya. Coba pelan-pelan.'],
 ['Susun rangkaian pendek','Gabungkan tepuk tangan, gerak silang, lalu jeda. Anak memilih jumlah pengulangan yang nyaman dan menggambar urutannya.','Setelah tepuk dan gerak silang, kita jeda. Bagaimana rasanya?']
 ],['Gunakan satu tangan dan satu lutut dahulu.','Boleh mengganti dengan menyentuh bahu berlawanan sambil duduk.'],'Anak menciptakan urutan tiga gerak aman untuk Anda ikuti.',[
 ['Gerak silang dapat berupa ...',['Berlari di lantai licin','Menahan napas lama','Tangan kanan menyentuh lutut kiri'],2,'Gerak ini menyeberangi garis tengah tubuh.'],
 ['Saat tubuh lelah, kita ...',['Mengambil jeda','Harus terus bergerak','Mempercepat gerakan'],0,'Jeda membantu kita memperhatikan kebutuhan tubuh.']]);
 add('sd1-social-1','social','Dua teman, satu mainan','Mencari beberapa solusi saat keinginan berbeda.','Anak menyebut kebutuhan dua pihak dan mencoba solusi yang disepakati dalam situasi berbagi mainan.', ['Satu mainan','Worksheet dan pensil'],[
 ['Dengarkan kedua pihak','Ceritakan dua teman ingin memakai bola yang sama. Tanyakan keinginan masing-masing tanpa memberi cap nakal.','Keduanya ingin bermain. Apa yang masing-masing butuhkan?'],
 ['Cari beberapa pilihan','Diskusikan bergiliran atau bermain bersama. Minta anak menilai pilihan yang aman dan dapat diterima kedua teman.','Selain berebut, cara apa lagi yang bisa kita coba?'],
 ['Latih kalimat kesepakatan','Mainkan percakapan singkat. Anak mencoba mengatakan keinginannya dan mendengar jawaban teman.','Aku ingin giliran setelahmu. Apakah kamu setuju?']
 ],['Tawarkan dua pilihan aman jika anak belum punya ide.','Pendamping membantu menjaga batas: tidak memukul atau merampas.'],'Coba situasi lain, misalnya memilih buku yang akan dibaca bersama.',[
 ['Dua teman ingin bola yang sama. Pilihan yang bisa dibicarakan adalah ...',['Merebut','Bergiliran','Mendorong'],1,'Bergiliran dapat menjadi kesepakatan jika kedua pihak memahami gilirannya.'],
 ['Kalimat meminta giliran yang jelas adalah ...',['Pokoknya milikku!','Pergi saja!','Aku ingin giliran setelahmu, boleh?'],2,'Kalimat ini menyatakan kebutuhan sambil memberi ruang untuk jawaban teman.']]);
 add('sd1-social-2','social','Perasaan dan kebutuhanku','Menghubungkan emosi, kejadian, dan bantuan yang dibutuhkan.','Anak menceritakan satu perasaan, kemungkinan pemicunya, dan dukungan yang dapat diminta kepada orang tepercaya.', ['Worksheet','Pensil warna'],[
 ['Pilih perasaan saat ini','Tanyakan perasaan anak tanpa menuntut jawaban bahagia. Ia boleh menunjuk, menggambar, atau mengatakan belum tahu.','Kalau mau bercerita, apa yang terasa di hatimu hari ini?'],
 ['Cari hubungan dengan kejadian','Bantu anak menceritakan kejadian sebelum perasaan muncul. Hindari menebak bahwa semua orang merasakan hal yang sama.','Apa yang terjadi sebelum kamu merasa begitu?'],
 ['Sebut kebutuhan dengan jelas','Latih satu kalimat meminta dukungan, misalnya aku perlu ditemani atau aku ingin jeda.','Bantuan seperti apa yang kamu inginkan dariku?']
 ],['Pendamping dapat berbagi satu contoh pengalamannya sendiri.','Jangan memaksa anak menjelaskan jika belum siap; tawarkan waktu lain.'],'Ceritakan bahwa dua orang bisa merasakan hal berbeda pada kejadian yang sama.',[
 ['Saat kecewa, kita boleh ...',['Meminta ditemani','Harus menyembunyikannya','Menyakiti teman'],0,'Perasaan boleh hadir. Kita dapat meminta dukungan sambil menjaga tindakan tetap aman.'],
 ['Kalimat meminta dukungan adalah ...',['Semua salahmu','Aku butuh jeda sebentar','Tidak boleh ada yang sedih'],1,'Kalimat ini menyebut kebutuhan secara jelas.']]);
 add('sd1-life-1','life','Daftar tas sesuai kegiatan','Memilih barang berdasarkan rencana, lalu memeriksanya.','Anak menyesuaikan isi tas dengan kegiatan yang direncanakan dan memeriksa daftar gambar secara mandiri atau dengan bantuan.', ['Tas anak','Buku, pensil, botol minum','Worksheet daftar barang'],[
 ['Baca rencana kegiatan','Ceritakan bahwa hari ini ada membaca, menggambar, dan minum saat istirahat. Tentukan perlengkapan yang terkait.','Apa yang kita perlukan untuk membaca dan menggambar?'],
 ['Pilih dan masukkan','Anak memilih barang dari gambar kemudian memasukkan benda nyata yang tersedia ke tas. Barang lain boleh tetap di tempatnya.','Mana yang dibutuhkan hari ini, dan mana yang bisa ditinggal?'],
 ['Periksa satu per satu','Cocokkan kembali isi tas dengan daftar. Ajak anak menandai setelah barang benar-benar ada di tas.','Kita tandai sesudah diperiksa, ya. Apa yang belum masuk?']
 ],['Mulai dengan dua barang yang dibutuhkan.','Gunakan gambar barang nyata anak jika berbeda bentuk dengan worksheet.'],'Ubah rencana menjadi kegiatan olahraga dan diskusikan isi tas yang berubah.',[
 ['Untuk menggambar kita perlu ...',['Sabun cuci tangan','Piring','Pensil'],2,'Pensil digunakan untuk menggambar pada kertas.'],
 ['Daftar ditandai setelah ...',['Barang diperiksa sudah masuk tas','Baru mengira-ngira','Melihat warna tas'],0,'Memeriksa barang membuat daftar membantu persiapan yang sebenarnya.']]);
 add('sd1-life-2','life','Urutkan pagi versiku','Merencanakan urutan dan menyesuaikan saat ada perubahan.','Anak menyusun rutinitas pagi yang masuk akal untuk keluarganya dan memilih langkah yang dapat dilakukan sendiri.', ['Worksheet','Pensil'],[
 ['Ceritakan pagi keluarga','Ajak anak menyebut tiga atau empat kebiasaan sebelum berangkat. Urutannya dapat berbeda pada setiap keluarga.','Biasanya setelah bangun, apa yang kamu lakukan?'],
 ['Susun rencana gambar','Anak memberi nomor pada gambar sesuai rencana yang disepakati. Tanyakan langkah mana yang masih membutuhkan bantuan.','Mana yang ingin kamu coba sendiri? Kapan perlu memanggilku?'],
 ['Latih saat rencana berubah','Ceritakan botol minum belum terisi. Minta anak menyampaikan kebutuhan dan menyesuaikan langkah tanpa terburu-buru.','Botolnya masih kosong. Apa yang bisa kamu lakukan atau tanyakan?']
 ],['Pilih tiga kebiasaan dulu agar rencana mudah diingat.','Pendamping membantu tugas yang belum aman dikerjakan sendiri.'],'Coba rencana selama satu pagi, lalu ubah bagian yang kurang nyaman.',[
 ['Jika ada perlengkapan belum siap, kita bisa ...',['Diam sampai terlambat','Memeriksa dan meminta bantuan','Menyalahkan teman'],1,'Menyampaikan kebutuhan membantu keluarga menyelesaikan persiapan.'],
 ['Rutinitas pagi yang baik untuk keluarga ...',['Harus sama dengan semua teman','Tidak boleh berubah','Bisa disepakati dan disesuaikan'],2,'Keluarga dapat menyesuaikan rutinitas dengan kebutuhan dan keadaan.']]);
 add('sd1-math-3','math','Puluhan dan satuan','Mengikat sepuluh benda, lalu membaca puluhan dan satuannya.','Anak mengelompokkan benda sepuluh-sepuluh dan menyebut bilangan sampai 99 sebagai jumlah puluhan dan satuan.', ['30 benda hitung berukuran besar','Karet gelang atau wadah kecil','Pensil dan worksheet'],[
 ['Ikat satu kelompok sepuluh','Hitung sepuluh benda bersama anak lalu kumpulkan dalam satu wadah. Sebut kelompok itu satu puluhan dan simpan terpisah.','Kita simpan sepuluh di wadah ini. Berapa benda di dalamnya?'],
 ['Baca puluhan dan satuannya','Buat dua ikatan sepuluh dan sisakan empat benda di meja. Minta anak membaca dua puluh empat dari dua wadah dan empat sisanya.','Ada dua wadah dan empat sisa. Bilangan apa yang kita punya?'],
 ['Tulis hasil hitunganmu','Pada worksheet, anak menghitung gambar dan menuliskan jumlahnya, lalu memecah satu bilangan menjadi puluhan dan satuan.','Dua belas itu berapa puluhan dan berapa satuan?']
 ],['Berhenti di 20 dahulu dengan satu ikatan sepuluh saja.','Biarkan anak membongkar ikatan dan menghitung ulang bila ragu.'],'Minta anak menyusun 35 benda dan menyebut jumlah wadahnya.',[
 ['Tiga puluh enam terdiri dari ...',['3 puluhan dan 6 satuan','6 puluhan dan 3 satuan','36 puluhan'],0,'Angka depan menunjukkan banyak puluhan; angka belakang menunjukkan satuan.'],
 ['Dua wadah berisi sepuluh dan 5 benda lepas. Berapa semuanya?',['15','25','52'],1,'Dua puluhan bernilai dua puluh, ditambah lima satuan menjadi dua puluh lima.']]);
 add('sd1-math-4','math','Genap atau ganjil','Memasangkan benda dua-dua untuk melihat sisa.','Anak memasangkan benda dua-dua dan menyebut suatu jumlah genap bila tidak ada sisa atau ganjil bila ada satu sisa.', ['12 benda hitung sejenis','Kaus kaki beberapa pasang','Pensil dan worksheet'],[
 ['Pasangkan kaus kaki','Letakkan enam kaus kaki dan minta anak memasangkannya dua-dua. Tunjukkan bahwa semua mendapat pasangan tanpa sisa.','Semua sudah berpasangan. Ada yang tidak kebagian pasangan?'],
 ['Tambah satu benda','Tambahkan satu kaus kaki sehingga menjadi tujuh. Anak memasangkan lagi dan menemukan satu benda tanpa pasangan.','Sekarang ada satu yang sendiri. Apa artinya untuk jumlah ini?'],
 ['Uji beberapa jumlah','Pada worksheet, anak menghitung tiap kelompok lalu menandai genap atau ganjil setelah mencoba memasangkannya.','Kelompok ini genap atau ganjil? Bagaimana kamu tahu?']
 ],['Gunakan jumlah kecil dahulu, misalnya dua, tiga, dan empat benda.','Susun benda berjajar dua baris agar pasangan mudah terlihat.'],'Cari jumlah benda di rumah dan tebak genap atau ganjil sebelum memasangkan.',[
 ['Jumlah 9 benda dipasangkan dua-dua. Hasilnya ...',['Semua berpasangan','Tidak bisa dihitung','Ada satu yang tersisa'],2,'Sembilan menyisakan satu benda tanpa pasangan, jadi sembilan ganjil.'],
 ['Bilangan genap adalah ...',['8','7','5'],0,'Delapan dapat dibagi menjadi empat pasang tanpa sisa.']]);
 add('sd1-bahasa-3','bahasa','Bertanya tentang gambar','Membuat kalimat tanya dengan apa, siapa, dan di mana.','Anak menyusun tiga kalimat tanya tentang satu gambar dan menjawab pertanyaan pendamping dengan kalimat utuh.', ['Worksheet dan pensil','Satu foto atau gambar dari buku'],[
 ['Kenali tiga kata tanya','Sebut apa, siapa, dan di mana. Jelaskan bahwa tiap kata menanyakan hal berbeda: benda, orang, dan tempat.','Kata siapa dipakai untuk menanyakan orang atau benda?'],
 ['Buat pertanyaan dari gambar','Lihat gambar bersama. Anak membuat satu pertanyaan memakai tiap kata tanya, dan pendamping menjawabnya dengan kalimat utuh.','Pertanyaanmu tentang tempat tadi apa? Aku akan menjawabnya.'],
 ['Tukar peran bertanya','Pendamping bertanya, anak menjawab dengan kalimat lengkap, bukan satu kata. Tulis satu pertanyaan dan jawabannya di worksheet.','Di mana kucing itu duduk? Coba jawab dengan kalimat panjang.']
 ],['Pakai satu kata tanya dahulu sampai anak terbiasa.','Pendamping boleh menuliskan kalimat yang didiktekan anak.'],'Buat satu pertanyaan memakai kata mengapa dan cari jawabannya bersama.',[
 ['Untuk menanyakan tempat, kita memakai kata ...',['Siapa','Di mana','Berapa'],1,'Di mana menanyakan tempat atau posisi sesuatu.'],
 ['Kalimat tanya diakhiri dengan tanda ...',['Titik','Koma','Tanya'],2,'Kalimat tanya memakai tanda tanya di akhir.']]);
 add('sd1-bahasa-4','bahasa','Suku kata jadi kata','Menggabungkan suku kata menjadi kata yang bermakna.','Anak membaca dua atau tiga suku kata secara berurutan, menggabungkannya menjadi satu kata, dan menuliskan kata itu.', ['Worksheet dan pensil','Kertas kecil untuk kartu suku kata'],[
 ['Buat kartu suku kata','Tulis bo, la, pi, dan sang pada kertas kecil. Letakkan berjajar dan bacakan tiap suku kata dengan jelas.','Ini bunyi bo. Ini bunyi la. Dengarkan keduanya dahulu.'],
 ['Gabungkan dan dengarkan','Dekatkan dua kartu lalu baca sambung tanpa jeda. Tanyakan kata apa yang terdengar dan apakah kata itu ada artinya.','Bo dan la jika disambung menjadi kata apa?'],
 ['Baca dan tulis di worksheet','Anak melingkari gambar yang sesuai suku kata, lalu menuliskan katanya pada baris yang tersedia.','Kata ini ditulis dengan huruf apa saja? Coba tulis bersama.']
 ],['Mulai dari kata dua suku kata yang sudah dikenal anak.','Tunjuk tiap suku kata saat membaca agar anak mengikuti urutannya.'],'Susun kartu menjadi kata tiga suku kata seperti ke-lin-ci.',[
 ['Suku kata pi dan sang digabung menjadi ...',['Pisang','Piring','Pensil'],0,'Pi disambung sang menjadi pisang.'],
 ['Kata kucing terdiri dari berapa suku kata?',['Satu','Dua','Empat'],1,'Kucing dibaca ku-cing, jadi dua suku kata.']]);
 add('sd1-english-3','english','How many do you see','Menghitung sampai sepuluh dalam bahasa Inggris.','Anak menghitung benda sampai sepuluh dalam bahasa Inggris dan menjawab pertanyaan how many dengan angka yang benar.', ['Worksheet dan pensil','10 benda kecil yang aman'],[
 ['Dengar angka satu sampai sepuluh','Hitung sepuluh benda dalam bahasa Inggris sambil menunjuk satu per satu. Anak mendengarkan dahulu lalu ikut menghitung.','One, two, three. Can you count with me?'],
 ['Jawab pertanyaan how many','Letakkan enam benda dan tanyakan how many. Bantu anak menjawab six sambil menunjuk bendanya kembali.','How many do you see? Count them again with me.'],
 ['Hitung gambar di worksheet','Anak menghitung tiap kelompok gambar, mengucapkan angkanya dalam bahasa Inggris, lalu menuliskan lambang angkanya.','Say the number in English, then write the number.']
 ],['Berhenti di lima dahulu sebelum menambah sampai sepuluh.','Terima jawaban dalam bahasa Indonesia, lalu ulangi dalam bahasa Inggris.'],'Hitung benda di satu ruangan dalam bahasa Inggris sampai sepuluh.',[
 ['How many? Jika ada 7 benda, jawabannya ...',['Nine','Ten','Seven'],2,'Seven berarti tujuh.'],
 ['Kata bahasa Inggris untuk sepuluh adalah ...',['Ten','Two','Eight'],0,'Ten berarti sepuluh; two berarti dua dan eight berarti delapan.']]);
 add('sd1-english-4','english','My things at home','Menyebut nama benda sehari-hari dalam bahasa Inggris.','Anak mengenali book, pencil, bag, bottle, cup, dan soap serta memakainya dalam kalimat This is a ... .', ['Worksheet dan pensil','Buku, pensil, tas, botol minum, gelas, sabun'],[
 ['Tunjuk benda yang asli','Letakkan benda nyata di meja. Sebut namanya dalam bahasa Inggris sambil mengangkat satu benda setiap kali.','This is a book. Can you give me the book?'],
 ['Pasangkan benda dan gambar','Anak mencocokkan benda asli dengan gambar pada worksheet, lalu melingkari gambar yang disebut pendamping.','Find the bottle. Which picture shows the bottle?'],
 ['Katakan this is a ...','Anak memilih satu benda dan mencoba kalimat This is a ... . Bantu kata yang belum diingat tanpa mengoreksi berlebihan.','Pick one thing. Tell me, this is a what?']
 ],['Kenalkan tiga benda dahulu, lalu tambah tiga berikutnya.','Anak boleh menunjuk atau mengangkat benda sebagai jawaban.'],'Cari dua benda lain di rumah dan cari namanya bersama pendamping.',[
 ['This is a pencil. Benda yang dimaksud adalah ...',['Gelas','Pensil','Sabun'],1,'Pencil berarti pensil.'],
 ['Kata bahasa Inggris untuk tas adalah ...',['Cup','Book','Bag'],2,'Bag berarti tas; cup berarti gelas dan book berarti buku.']]);
 add('sd1-science-3','science','Bagian tumbuhan','Mengenali akar, batang, daun, dan bunga serta kegunaannya.','Anak menyebut empat bagian tumbuhan pada tanaman nyata dan menjelaskan satu kegunaan tiap bagian dengan kata sendiri.', ['Tanaman kecil dalam pot atau sayuran berakar','Worksheet dan pensil'],[
 ['Amati tanaman dari bawah ke atas','Tunjuk akar, batang, daun, lalu bunga bila ada. Minta anak menyentuh dengan hati-hati tanpa mencabut tanaman.','Mulai dari bawah. Bagian yang ada di dalam tanah namanya apa?'],
 ['Bicarakan kegunaan tiap bagian','Jelaskan akar menyerap air, batang menegakkan dan menyalurkan air, daun menangkap cahaya, bunga menjadi awal buah atau biji.','Kalau akarnya rusak, menurutmu apa yang sulit didapat tanaman?'],
 ['Gambar dan beri nama','Pada worksheet, anak menggambar satu tanaman lalu menuliskan nama bagian yang ia kenali di sebelah gambarnya.','Bagian mana yang kamu gambar paling besar? Beri namanya.']
 ],['Gunakan dua bagian dahulu: akar dan daun.','Cuci tangan setelah memegang tanah dan tanaman.'],'Bandingkan daun dua tanaman berbeda dan sebutkan bedanya.',[
 ['Bagian tumbuhan yang menyerap air dari tanah adalah ...',['Akar','Bunga','Daun'],0,'Akar menyerap air dan menahan tumbuhan di tanah.'],
 ['Daun berguna untuk ...',['Menyimpan sepatu','Menangkap cahaya matahari','Menahan hujan'],1,'Daun menangkap cahaya yang dipakai tumbuhan membuat makanannya.']]);
 add('sd1-science-4','science','Cara hewan bergerak','Mengelompokkan hewan dari cara berpindah tempat.','Anak mengelompokkan hewan yang berjalan, terbang, dan berenang serta menyebut bagian tubuh yang dipakai untuk bergerak.', ['Worksheet dan pensil','Buku bergambar hewan bila tersedia'],[
 ['Tirukan gerak hewan','Ajak anak meniru gerak burung, ikan, dan kucing di tempat yang aman. Bicarakan bagian tubuh yang paling banyak dipakai.','Saat jadi ikan, bagian mana yang paling banyak bergerak?'],
 ['Kelompokkan dengan alasan','Anak menandai tiap gambar hewan sesuai cara bergeraknya. Minta alasan berupa sayap, kaki, atau sirip.','Mengapa burung kamu masukkan ke kelompok terbang?'],
 ['Bahas hewan yang menarik','Diskusikan siput yang bergerak lambat dengan badannya dan bebek yang bisa berjalan serta berenang.','Ada hewan yang bisa dua cara. Kamu tahu contohnya?']
 ],['Pakai dua kelompok dahulu: berjalan dan terbang.','Terima jawaban dari pengalaman anak, lalu periksa bersama di buku atau gambar.'],'Cari satu hewan di sekitar rumah dan catat cara bergeraknya.',[
 ['Hewan yang bergerak memakai sirip adalah ...',['Kelinci','Burung','Ikan'],2,'Ikan memakai sirip dan ekornya untuk berenang.'],
 ['Burung dapat terbang karena memiliki ...',['Sayap','Sirip','Sisik'],0,'Sayap membuat burung dapat terbang di udara.']]);
 add('sd1-art-3','art','Garis jadi tekstur','Memakai jenis garis berbeda untuk mengisi bidang gambar.','Anak membuat garis lurus, bergelombang, dan zigzag lalu memakainya untuk mengisi tiga bagian gambarnya sendiri.', ['Worksheet','Pensil dan pensil warna'],[
 ['Coba tiga jenis garis','Contohkan garis lurus, bergelombang, dan zigzag pada kertas kosong. Anak mencoba tiap garis beberapa kali.','Garis mana yang terasa paling mudah untuk tanganmu?'],
 ['Isi bidang dengan garis','Pilih satu jenis garis untuk mengisi bagian dalam satu bentuk. Amati bahwa permukaan terlihat berbeda meski warnanya sama.','Bagian ini kita isi garis bergelombang. Terlihat seperti apa?'],
 ['Buat gambar bertekstur','Anak menggambar satu benda di worksheet dan mengisi tiga bagiannya dengan jenis garis yang berbeda.','Bagian mana yang ingin terlihat kasar? Garis apa yang cocok?']
 ],['Gunakan satu jenis garis dahulu dan bidang yang besar.','Pensil tidak perlu ditekan keras; istirahatkan tangan bila lelah.'],'Tiru tekstur benda nyata, misalnya permukaan daun atau dinding.',[
 ['Garis yang naik turun tajam disebut garis ...',['Lurus','Zigzag','Bulat'],1,'Garis zigzag berbelok tajam naik dan turun.'],
 ['Mengisi bidang dengan garis berbeda membuat gambar terlihat ...',['Lebih mahal','Lebih kecil','Memiliki permukaan berbeda'],2,'Jenis garis mengubah kesan permukaan meski warnanya sama.']]);
 add('sd1-art-4','art','Cerita tiga kotak','Menyusun cerita bergambar dengan awal, tengah, dan akhir.','Anak menggambar tiga kejadian berurutan dan menceritakan hubungan antar kotak dengan kata penghubung.', ['Worksheet','Pensil dan pensil warna'],[
 ['Pilih satu kejadian nyata','Ajak anak memilih kejadian yang ia alami, misalnya menanam atau membantu memasak. Tentukan awal, tengah, dan akhirnya.','Apa yang terjadi paling awal dalam ceritamu?'],
 ['Gambar satu kejadian per kotak','Satu kotak hanya berisi satu kejadian. Ingatkan tidak perlu menggambar seluruh cerita di kotak pertama.','Kotak kedua menunjukkan apa yang terjadi setelah itu?'],
 ['Ceritakan sambil menunjuk','Anak membacakan ceritanya sambil menunjuk tiap kotak dan memakai kata pertama, kemudian, dan akhirnya.','Ceritamu sudah berurutan. Coba bacakan dari kotak pertama.']
 ],['Gunakan dua kotak dahulu: sebelum dan sesudah.','Gambar sederhana dengan tanda sudah cukup bila anak dapat menjelaskannya.'],'Tambahkan satu kotak keempat tentang perasaan di akhir cerita.',[
 ['Kotak pertama cerita bergambar biasanya menunjukkan ...',['Kejadian paling awal','Kejadian paling akhir','Nama pembuatnya'],0,'Cerita bergambar dibaca berurutan dari kotak pertama.'],
 ['Kata yang cocok untuk kotak terakhir adalah ...',['Pertama','Akhirnya','Mengapa'],1,'Akhirnya menandai kejadian penutup cerita.']]);
 add('sd1-motor-3','motor','Potong mengikuti garis','Mengendalikan gunting dan tangan penahan kertas.','Anak memotong kertas mengikuti garis lurus dan bergelombang dengan gunting anak serta mengatur posisi tangan penahan.', ['Gunting ujung tumpul untuk anak','Kertas bekas','Lem dan worksheet'],[
 ['Siapkan posisi aman','Dampingi anak sepanjang kegiatan. Tunjukkan cara memegang gunting dan menjauhkan jari tangan penahan dari garis potong.','Tangan ini memegang kertas di tepi, jauh dari gunting.'],
 ['Potong garis lurus dahulu','Gunting mengikuti garis lurus dengan bukaan kecil berulang. Putar kertas, bukan guntingnya, saat arah berubah.','Kita buka gunting sedikit saja, lalu potong pelan-pelan.'],
 ['Coba garis bergelombang','Potong garis melengkung pada worksheet lalu tempelkan hasilnya. Hasil yang belum rapi tetap dihargai sebagai latihan.','Kertasnya kita putar sedikit. Bagaimana rasanya sekarang?']
 ],['Mulai dengan memotong lajur pendek selebar tiga sentimeter.','Anak boleh memotong beberapa kali dengan jeda; gunting disimpan setiap jeda.'],'Potong bentuk sederhana lalu susun menjadi satu gambar.',[
 ['Saat memotong, tangan yang tidak memegang gunting sebaiknya ...',['Memegang tepi kertas jauh dari garis','Menutupi garis potong','Memegang ujung gunting'],0,'Tangan penahan memegang tepi kertas agar jari tetap aman.'],
 ['Saat arah garis berubah, yang kita putar adalah ...',['Gunting ke arah tubuh','Kursi tempat duduk','Kertasnya'],2,'Memutar kertas lebih aman daripada memutar gunting.']]);
 add('sd1-motor-4','motor','Lempar, tangkap, catat','Melatih koordinasi mata dan tangan sambil mencatat hasil.','Anak melempar dan menangkap bola lunak dalam beberapa percobaan, lalu mencatat hasilnya pada tabel sederhana.', ['Bola lunak atau kaus kaki digulung','Ruang bermain yang aman','Worksheet dan pensil'],[
 ['Tentukan jarak dan aturan','Pilih ruang tanpa benda mudah pecah. Sepakati jarak dan jumlah percobaan sebelum mulai bermain.','Kita coba dari jarak ini dulu. Lima kali lemparan, ya?'],
 ['Lempar dan tangkap bergantian','Lempar bola dari bawah ke arah tangan anak. Minta anak menyiapkan dua tangan seperti mangkuk sebelum bola datang.','Buka tanganmu seperti mangkuk. Bolanya datang perlahan.'],
 ['Catat tiap percobaan','Setelah tiap putaran, anak menandai berapa kali tertangkap pada worksheet, lalu memilih jarak untuk putaran berikutnya.','Putaran ini berapa yang tertangkap? Mau coba jarak berapa?']
 ],['Lempar dari jarak satu langkah dan gunakan bola besar yang ringan.','Hitung lemparan yang terlepas sebagai data, bukan kesalahan.'],'Bandingkan hasil dari dua jarak berbeda dan bicarakan bedanya.',[
 ['Agar bola lebih mudah ditangkap, tangan disiapkan ...',['Di belakang punggung','Terbuka seperti mangkuk','Dalam kantong'],1,'Dua tangan terbuka memberi ruang bola berhenti.'],
 ['Mencatat hasil tiap percobaan berguna untuk ...',['Menentukan pemenang','Menghukum yang gagal','Melihat perubahan setelah beberapa kali mencoba'],2,'Catatan membantu kita melihat perkembangan dari percobaan ke percobaan.']]);
 add('sd1-social-3','social','Aturan rumah dan alasannya','Menghubungkan aturan dengan alasan yang masuk akal.','Anak menyebut tiga aturan di rumahnya beserta alasan keamanan atau kenyamanan di balik setiap aturan.', ['Worksheet dan pensil','Kertas untuk ditempel di dinding'],[
 ['Sebut aturan yang sudah ada','Ajak anak menyebut aturan yang ia ingat, misalnya mencuci tangan sebelum makan atau tidak berlari di tangga.','Aturan apa yang paling sering kamu dengar di rumah?'],
 ['Cari alasan tiap aturan','Bahas alasan di balik aturan. Hubungkan dengan keamanan tubuh, kesehatan, atau kenyamanan orang lain di rumah.','Kalau kita berlari di tangga, apa yang bisa terjadi?'],
 ['Tulis dan tempel kesepakatan','Anak menulis tiga aturan dengan alasannya di worksheet. Bicarakan juga satu aturan yang ingin ia usulkan.','Ada aturan baru yang ingin kamu usulkan untuk kita semua?']
 ],['Bahas satu aturan dahulu sampai alasannya jelas.','Jangan memakai daftar aturan sebagai hukuman; fokus pada alasannya.'],'Tanyakan aturan di rumah kerabat dan bandingkan alasannya.',[
 ['Aturan mencuci tangan sebelum makan dibuat agar ...',['Kuman tidak masuk bersama makanan','Tangan terlihat basah','Makanan cepat habis'],0,'Mencuci tangan mengurangi kuman yang bisa tertelan bersama makanan.'],
 ['Jika sebuah aturan belum dipahami, kita sebaiknya ...',['Melanggar diam-diam','Menanyakan alasannya','Menyalahkan orang lain'],1,'Menanyakan alasan membantu kita memahami dan menyepakati aturan.']]);
 add('sd1-social-4','social','Maaf dan memperbaiki','Mengakui kekeliruan lalu memperbaiki keadaan.','Anak menyebut kekeliruan yang terjadi, mengucapkan maaf dengan kalimat jelas, dan memilih satu tindakan memperbaiki.', ['Worksheet dan pensil','Satu benda yang pernah tertukar atau tersenggol'],[
 ['Ceritakan kejadian tanpa cap','Ceritakan contoh menyenggol gelas teman hingga tumpah. Pisahkan kejadian dari penilaian bahwa anak nakal.','Gelasnya tumpah. Mari kita pikirkan apa yang bisa dilakukan.'],
 ['Latih kalimat maaf yang jelas','Kalimat maaf menyebut apa yang terjadi, misalnya maaf aku menyenggol gelasmu, bukan hanya kata maaf singkat.','Coba sebut apa yang kamu sesali di dalam kalimatmu.'],
 ['Pilih cara memperbaiki','Diskusikan tindakan nyata seperti membantu membersihkan atau mengganti barang. Anak memilih satu yang bisa ia lakukan.','Setelah minta maaf, apa yang bisa kamu bantu kerjakan?']
 ],['Pendamping mencontohkan kalimat maaf lebih dahulu.','Beri waktu bila anak masih kesal; perbaikan dapat dibicarakan setelah tenang.'],'Bicarakan cara menerima permintaan maaf dari orang lain.',[
 ['Kalimat maaf yang jelas adalah ...',['Maaf, aku menyenggol gelasmu','Bukan aku yang salah','Semua orang juga begitu'],0,'Kalimat ini menyebut kejadian yang disesali secara terbuka.'],
 ['Setelah minta maaf, langkah memperbaiki bisa berupa ...',['Pergi menjauh','Membantu membersihkan','Mendiamkan teman'],1,'Tindakan memperbaiki menunjukkan permintaan maaf yang sungguh.']]);
 add('sd1-life-3','life','Minum dan bekalku sendiri','Menyiapkan minum dan bekal dengan langkah yang aman.','Anak menuang air ke gelas, menyiapkan bekal sederhana, dan membereskan meja setelah selesai dengan bantuan sesuai kebutuhan.', ['Botol minum dan gelas','Piring kecil dan makanan siap santap','Kain untuk mengeringkan','Worksheet'],[
 ['Siapkan alat di satu tempat','Letakkan botol, gelas, dan piring di meja yang stabil. Sediakan kain kecil untuk mengeringkan bila ada tetesan.','Semua alat sudah di meja. Kainnya kita taruh di sini.'],
 ['Tuang dengan dua tangan','Anak memegang botol dengan dua tangan dan menuang sampai setengah gelas. Hentikan sebelum penuh agar tidak tumpah.','Berhenti saat air sampai di tengah gelas, ya.'],
 ['Bereskan setelah selesai','Anak memindahkan gelas kotor ke tempat yang disepakati dan mengeringkan meja, lalu menandai langkah pada worksheet.','Meja sudah kering? Gelasnya kita taruh di mana?']
 ],['Isi botol hanya sedikit dahulu agar lebih ringan.','Gunakan gelas yang tidak mudah pecah dan hindari air panas.'],'Siapkan bekal untuk dua orang dan bagi tugasnya.',[
 ['Agar air tidak tumpah saat menuang, kita ...',['Menuang sambil berjalan','Berhenti sebelum gelas penuh','Memakai satu jari'],1,'Menyisakan ruang di gelas membuat air tidak meluap.'],
 ['Setelah makan, langkah yang perlu dilakukan adalah ...',['Membiarkan piring di meja','Menumpuk di kursi','Memindahkan piring ke tempat yang disepakati'],2,'Membereskan setelah makan menjaga meja tetap bersih dan siap dipakai.']]);
 add('sd1-life-4','life','Beres setelah belajar','Memilah barang dan mengembalikannya ke tempat tetap.','Anak memilah perlengkapan belajar dan mainan setelah sesi, lalu mengembalikannya ke tempat yang disepakati keluarga.', ['Buku, pensil, dan dua jenis mainan','Dua wadah atau rak','Worksheet'],[
 ['Sepakati tempat tiap kelompok','Tentukan bersama tempat perlengkapan belajar dan tempat mainan. Tunjuk wadahnya agar anak mudah mengingat.','Buku dan pensil kita taruh di mana setelah selesai?'],
 ['Pilah barang di meja','Anak mengambil satu barang setiap kali dan menyebut kelompoknya sebelum memasukkannya ke wadah yang tepat.','Pensil ini masuk kelompok apa? Letakkan di wadahnya.'],
 ['Periksa meja sebelum pergi','Ajak anak melihat seluruh meja dan kolong kursi, lalu menandai pada worksheet kelompok barang yang sudah kembali.','Masih ada barang yang tertinggal? Kita lihat sekeliling meja.']
 ],['Mulai dengan dua jenis barang dan satu wadah untuk masing-masing.','Beri waktu tambahan bila anak masih lelah setelah sesi belajar.'],'Catat waktu yang dibutuhkan hari ini dan bandingkan besok.',[
 ['Barang yang termasuk perlengkapan belajar adalah ...',['Pensil','Bola','Balok mainan'],0,'Pensil dipakai untuk menulis dan menggambar saat belajar.'],
 ['Tempat tetap untuk setiap barang membuat kita ...',['Harus membeli wadah baru','Tidak boleh bermain lagi','Lebih cepat menemukannya nanti'],2,'Barang yang kembali ke tempatnya lebih mudah ditemukan saat dibutuhkan.']]);
}
if(typeof module!=='undefined')module.exports=extend;else extend(global.BAData);
})(typeof window!=='undefined'?window:globalThis);
