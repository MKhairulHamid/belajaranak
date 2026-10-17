/* Belajar Anak — ruang kerja orang tua.
   Fokus: membantu orang tua mengajar di rumah dengan worksheet dan perintah yang
   komunikatif. Catatan perkembangan adalah ringkasan dari sesi yang dijalankan,
   bukan fitur utama. */
(function(){
'use strict';
const {topics,lessons,guides}=BAData,C=BACore,E=C.escapeHtml;
let storageIssue='',state;
try{const raw=localStorage.getItem(C.KEY);state=raw?C.validateState(JSON.parse(raw),lessons):C.initialState();}
catch(err){state=C.initialState();storageIssue='Catatan di perangkat ini belum dapat dibaca. Anda bisa memulihkan cadangan melalui Pengaturan.';}
let libraryTopic='all',libraryQuery='',libraryFilter='all',progressView='skills';
let timerPaused=true,timerHandle=null,session=null,dialogReturn=null,toastTimeout,onboardNote='';
const app=document.querySelector('#app'),dialog=document.querySelector('#dialog');
const child=()=>C.activeChild(state),topic=id=>topics.find(t=>t.id===id),lesson=id=>lessons.find(l=>l.id===id);
/* Warna per bidang dipilih di lapisan tampilan supaya mudah disetel tanpa
   mengubah data materi. */
const tones={bahasa:'coral',math:'blue',english:'grape',science:'leaf',art:'tangerine',motor:'sun',social:'pink',life:'teal'};
const tone=id=>tones[id]||'leaf';
const labels={trying:'Masih perlu contoh',supported:'Bisa dengan bantuan',independent:'Bisa sendiri'};
const ratingHelp={trying:'Anak belum bisa melakukannya walau sudah diberi contoh.',supported:'Anak bisa setelah ditunjukkan atau diingatkan.',independent:'Anak melakukannya tanpa petunjuk dan bisa menjelaskan caranya.'};
const dayNames=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const fmt=(date,options={day:'numeric',month:'long',year:'numeric'})=>C.parseDate(date).toLocaleDateString('id-ID',options);
const levelLessons=()=>lessons.filter(l=>l.level===child().level);

function icon(name,cls=''){
 const paths={home:'m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',book:'M12 6c-3-3-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15',calendar:'M4 5h16v16H4ZM8 2v6m8-6v6M4 10h16m-12 4h2m4 0h2m-8 4h2',chart:'M4 20V4m0 16h17M8 16v-5m5 5V7m5 9V3',settings:'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM9 3l-1 3-3 1-2 3 2 3-1 3 3 3 3-1 3 2 3-2 3 1 2-3-1-3 2-3-2-3-3-1-1-3Z',arrow:'M4 12h15m-6-6 6 6-6 6',chevron:'m9 5 7 7-7 7',down:'m6 9 6 6 6-6',back:'M20 12H5m6-6-6 6 6 6',clock:'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z',check:'m5 12 4 4L19 6',close:'m6 6 12 12M6 18 18 6',plus:'M12 5v14M5 12h14',search:'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm5 12 6 6',leaf:'M5 19C-1 5 10 2 21 3c1 12-4 19-16 16Zm0 0L16 8',shapes:'M2 3h8v8H2ZM17 3l5 8H12ZM8 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm7 2h7m-3.5-3.5v7',chat:'M3 3h18v14H9l-6 4V3Zm4 5h10M7 12h6',palette:'M12 2a10 10 0 1 0 0 20h1c3 0 3-4 1-5-2-1-1-3 1-3h4c5 0 4-12-7-12ZM7 7h.01M12 5h.01M17 8h.01M5 12h.01',sun:'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0-6v3m0 16v3M1 12h3m16 0h3M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2',backpack:'M7 8V6a5 5 0 0 1 10 0v2M5 8h14l2 13H3ZM8 14h8v5H8',heart:'M12 21C-5 11 3-3 12 6 21-3 29 11 12 21Z',bell:'M18 8a6 6 0 0 0-12 0c0 6-3 8-3 8h18s-3-2-3-8ZM9 20h6',user:'M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM3 21c0-10 18-10 18 0',print:'M6 8V2h12v6M6 17H3V8h18v9h-3M6 14h12v8H6m11-11h1',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',upload:'M12 16V4m-5 5 5-5 5 5M4 16v5h16v-5',play:'m8 4 12 8-12 8Z',pause:'M8 4v16M16 4v16',spark:'m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z',edit:'m4 16 12-12 4 4L8 20H4Zm9-9 4 4',help:'M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 4m0 3h.01M22 12a10 10 0 1 0-20 0 10 10 0 0 0 20 0Z',image:'M3 3h18v18H3Zm0 14 6-6 4 4 3-3 5 5M7 7h.01',shield:'M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6Zm-5 10 3 3 6-6',volume:'m11 4-6 5H2v6h3l6 5Zm5 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14',key:'M14 7a4 4 0 1 1 3 7l-1-1-2 2-2-2-2 2-2-2-2 2H3v-3l8-8Z',target:'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7'};
 return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.spark}"/></svg>`;
}
function avatar(name='bunny',size=''){
 const bg={bunny:'#FFE3C9',bear:'#FFEBBE',fox:'#FFCFA6',cat:'#D6E6FF',frog:'#D6F2CE'}[name]||'#FFE3C9';
 const ears=name==='bunny'?'<ellipse cx="25" cy="17" rx="7" ry="15" fill="#FFF7EC"/><ellipse cx="42" cy="17" rx="7" ry="15" fill="#FFF7EC"/><ellipse cx="25" cy="16" rx="2.5" ry="9" fill="#F7A8B4"/><ellipse cx="42" cy="16" rx="2.5" ry="9" fill="#F7A8B4"/>'
  :name==='cat'||name==='fox'?'<path d="m13 31 2-20 17 12 17-12 3 22" fill="#FFB877"/>'
  :name==='frog'?'<circle cx="20" cy="23" r="10" fill="#5FBF7A"/><circle cx="45" cy="23" r="10" fill="#5FBF7A"/>'
  :'<circle cx="16" cy="26" r="9" fill="#C98B5B"/><circle cx="48" cy="26" r="9" fill="#C98B5B"/>';
 const face=name==='frog'?'#7ACF8E':name==='bear'?'#DFA571':'#FFF7EC';
 return `<span class="avatar ${size}" style="background:${bg}"><svg viewBox="0 0 64 64" aria-hidden="true">${ears}<ellipse cx="32" cy="40" rx="23" ry="21" fill="${face}"/><path d="M23 37v2m18-2v2" stroke="#33425C" stroke-width="3.4" stroke-linecap="round"/><path d="m30 42 2 2 2-2m-2 2v3m-5-1c3 3 7 3 10 0" fill="none" stroke="#5A6478" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="18" cy="44" rx="4.5" ry="2.4" fill="#F79C9C"/><ellipse cx="46" cy="44" rx="4.5" ry="2.4" fill="#F79C9C"/></svg></span>`;
}
/* Ilustrasi bidang: berkas WebP lokal di assets/topics, dibuat sekali lalu
   disimpan di repo. Murni dekoratif, jadi alt dikosongkan. */
function art(id){
 return `<img class="topic-art" src="assets/topics/topic-${id}.webp" alt="" width="560" height="560" loading="lazy" decoding="async">`;
}
function toast(message){
 if(dialog.open){let note=dialog.querySelector('.dialog-feedback');
  if(!note){note=document.createElement('p');note.className='dialog-feedback';note.setAttribute('role','status');dialog.querySelector('.dialog-head').after(note);}
  note.textContent=message;}
 clearTimeout(toastTimeout);
 const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');
 toastTimeout=setTimeout(()=>el.classList.remove('show'),4200);
}
function persist(next){
 if(storageIssue){toast('Catatan belum tersimpan. Pulihkan penyimpanan di Pengaturan.');return false;}
 try{localStorage.setItem(C.KEY,JSON.stringify(next));state=next;return true;}
 catch{toast('Catatan belum tersimpan. Ruang penyimpanan tidak tersedia. Ekspor cadangan sebelum mengosongkan ruang.');return false;}
}
function change(fn,message,renderAfter=true){
 const next=structuredClone(state);fn(next,C.activeChild(next));
 if(!persist(next))return false;
 if(renderAfter)render();
 if(message)toast(message);
 return true;
}

/* ---------- kerangka halaman ---------- */
function navItem(route,label,ic,badge=''){
 const current=location.hash.slice(1).split('/')[0]||'home';
 return `<a href="#${route}" class="nav-link ${current===route?'active':''}" ${current===route?'aria-current="page"':''}>${icon(ic)}<span>${label}</span>${badge?`<span class="nav-count">${badge}</span>`:''}</a>`;
}
function shell(content,title='Beranda'){
 const c=child(),day=C.planDayNumber(c);
 return `<aside class="sidebar"><a href="#home" class="brand"><img src="assets/favicon.svg" width="38" height="38" alt=""><span>belajar<span class="brand-light">anak</span><small>WORKSHEET SIAP PAKAI DI RUMAH</small></span></a>`
 +`<button class="child-switch" data-action="children">${avatar(c.avatar)}<span><strong>${E(c.name)}</strong><small>${C.age(c.dob)} tahun · ${C.levelName(c.level)}</small></span>${state.children.length>1?icon('down'):icon('edit')}</button>`
 +`<nav aria-label="Navigasi utama">${navItem('home','Hari ini','home')}${navItem('plan','Paket 30 hari','calendar','Hari '+day)}${navItem('library','Semua materi','book',String(levelLessons().length))}${navItem('progress','Hasil anak','chart')}${navItem('settings','Pengaturan','settings')}</nav>`
 +`<div class="sidebar-bottom"><div class="membership"><span class="membership-icon">${icon('key')}</span><span><strong>${C.levelName(c.level)}</strong><small>Kode ${E(state.access.code)} aktif</small></span></div></div></aside>`
 +`<div class="workspace"><header class="topbar"><a class="mobile-brand" href="#home"><img src="assets/favicon.svg" width="28" height="28" alt="">belajaranak</a>`
 +`<div class="breadcrumb">${E(title)}</div><div class="topbar-right"><span class="top-date">${fmt(C.dateKey(),{weekday:'long',day:'numeric',month:'long'})}</span>`
 +`<button class="icon-button" aria-label="Bantuan" data-action="help">${icon('help')}</button>`
 +`<button class="header-avatar" data-action="children" aria-label="Profil anak">${avatar(c.avatar)}</button></div></header>`
 +`<main id="main" tabindex="-1">${storageIssue?`<div class="storage-banner" role="alert">${E(storageIssue)} <a href="#settings">Buka pengaturan</a></div>`:''}${content}`
 +`<footer class="page-footer"><span>Belajar Anak · ${levelLessons().length} materi ${C.levelName(c.level)}</span><span>Catatan tersimpan di perangkat ini saja.</span></footer></main></div>`
 +`<nav class="mobile-nav" aria-label="Navigasi seluler">${navItem('home','Hari ini','home')}${navItem('plan','30 hari','calendar')}${navItem('library','Materi','book')}${navItem('progress','Hasil','chart')}${navItem('settings','Akun','user')}</nav>`;
}
function heading(eyebrow,title,description,action=''){
 return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-description">${description}</p></div>${action}</div>`;
}
function pill(text,color='leaf'){return `<span class="pill ${color}">${text}</span>`;}
function empty(ic,title,body,button='',action=''){
 return `<div class="empty-state"><span class="empty-icon">${icon(ic)}</span><h2>${title}</h2><p>${body}</p>${button?`<button class="button secondary" data-action="${action}">${button}</button>`:''}</div>`;
}

/* ---------- onboarding: umur + kode belajar menentukan satu jenjang ---------- */
function welcomePage(){
 return `<div class="onboard"><div class="onboard-art"><img src="assets/topics/hero-home.webp" alt="" width="1200" height="800" decoding="async"></div>`
 +`<div class="onboard-card"><a class="brand onboard-brand" href="#welcome"><img src="assets/favicon.svg" width="40" height="40" alt=""><span>belajar<span class="brand-light">anak</span></span></a>`
 +`<h1>Siapkan ruang belajar anak Anda</h1>`
 +`<p class="onboard-lead">Isi usia anak dan kode belajar dari pembelian Anda. Aplikasi langsung menyiapkan paket 30 hari — Anda tidak perlu menyusun rencana sendiri.</p>`
 +`<form id="onboard-form" novalidate><label class="field"><span>Nama panggilan anak</span><input name="name" maxlength="32" required autocomplete="off" placeholder="Misalnya: Aira"></label>`
 +`<label class="field"><span>Tanggal lahir anak</span><input name="dob" type="date" required max="${C.dateKey()}" min="${new Date().getFullYear()-18}-01-01"><small class="field-help">Dipakai untuk menentukan jenjang materi.</small></label>`
 +`<label class="field"><span>Kode belajar</span><input name="code" maxlength="16" required autocomplete="off" placeholder="TKB-0000 atau SD1-0000" spellcheck="false"><small class="field-help">Satu kode membuka satu jenjang sesuai usia yang Anda beli. Untuk mencoba PoC ini: <b>TKB-2026</b> (5–6 tahun) atau <b>SD1-2026</b> (7 tahun ke atas).</small></label>`
 +`<label class="field"><span>Nama Anda <small>opsional</small></span><input name="parent" maxlength="60" autocomplete="name" placeholder="Nama orang tua atau pendamping"></label>`
 +`<p id="onboard-error" class="form-error" role="alert">${E(onboardNote)}</p>`
 +`<button type="submit" class="button primary full">${icon('arrow')} Buka ruang belajar</button></form>`
 +`<p class="onboard-foot">${icon('shield')} Data anak hanya tersimpan di browser perangkat ini dan tidak dikirim ke server mana pun.</p>`
 +`</div></div>`;
}
function startWorkspace(form){
 const fd=new FormData(form),get=k=>String(fd.get(k)||'').trim();
 const name=get('name'),dob=get('dob'),raw=get('code'),parent=get('parent');
 const error=document.querySelector('#onboard-error');
 const show=msg=>{onboardNote=msg;if(error)error.textContent=msg;};
 if(!name)return show('Isi nama panggilan anak terlebih dahulu.');
 if(!dob||!/^\d{4}-\d{2}-\d{2}$/.test(dob))return show('Isi tanggal lahir anak.');
 const years=C.age(dob);
 if(years<0||years>18||dob>C.dateKey())return show('Tanggal lahir belum masuk akal. Periksa kembali.');
 const parsed=C.parseCode(raw);
 if(!parsed)return show('Kode belajar belum sesuai. Formatnya TKB-0000 atau SD1-0000, sesuai jenjang yang Anda beli.');
 const suggested=C.levelFromAge(years);
 const next=C.initialState();
 next.onboarded=true;
 next.account={name:parent||'Orang tua '+name,email:''};
 next.access={code:parsed.code,level:parsed.level,activatedAt:C.dateKey()};
 const newborn=C.newChild(name,dob,'bunny',parsed.level,lessons);
 next.children=[newborn];next.activeChild=newborn.id;
 if(!persist(next))return;
 onboardNote='';
 location.hash='home';render();
 toast(suggested===parsed.level
  ?`Ruang belajar ${C.levelName(parsed.level)} siap. Paket 30 hari dimulai hari ini.`
  :`Kode Anda membuka ${C.levelName(parsed.level)}. Usia ${years} tahun biasanya masuk ${C.levelName(suggested)} — materi tetap mengikuti kode yang Anda beli.`);
}

/* ---------- hari ini ---------- */
function todayCard(){
 const c=child(),day=C.planDayNumber(c),entry=C.planEntry(c,day);
 if(!entry)return empty('book','Paket belum tersedia','Materi untuk jenjang ini belum lengkap. Buka Semua materi untuk memilih sendiri.','Buka semua materi','go-library');
 const l=lesson(entry.lessonId),t=topic(l.topic),done=C.latest(c,l.id),draft=c.draft?.lessonId===l.id;
 return `<section class="today ${tone(l.topic)}"><div class="today-main"><p class="eyebrow">HARI ${day} DARI ${C.PLAN_DAYS} · ${t.name.toUpperCase()}${entry.kind==='review'?' · HARI ULANG':''}</p>`
 +`<h2>${l.title}</h2><p class="today-goal">${l.summary}</p>`
 +`<dl class="today-facts"><div><dt>Waktu</dt><dd>${l.minutes} menit</dd></div><div><dt>Bahan</dt><dd>${l.materials.length} benda rumahan</dd></div><div><dt>Status</dt><dd>${done?labels[done.rating]:'Belum dikerjakan'}</dd></div></dl>`
 +`<a class="button primary" href="#lesson/${l.id}">${icon(draft?'play':'arrow')} ${draft?'Lanjutkan materi ini':'Mulai pelajari'}</a>`
 +`<a class="button secondary" href="#plan">${icon('calendar')} Lihat paket 30 hari</a></div>${art(l.topic)}</section>`;
}
function homePage(){
 const c=child(),day=C.planDayNumber(c),progress=C.planProgress(c),due=C.reviewDue(c,lessons).slice(0,3);
 const mins=Math.round(c.sessions.reduce((n,s)=>n+s.seconds,0)/60);
 return shell(heading(C.levelName(c.level).toUpperCase()+' · KODE '+E(state.access.code),'Hari ini bersama '+E(c.name),
  `Paket 30 hari sudah tersusun. Buka materi hari ini, cetak worksheet-nya, lalu catat hasilnya dalam satu halaman.`)
 +todayCard()
 +`<div class="stats-grid"><div class="stat-card"><span class="round-icon leaf">${icon('calendar')}</span><span><strong>Hari ${day}<small> / ${C.PLAN_DAYS}</small></strong><p>posisi paket belajar</p></span></div>`
 +`<div class="stat-card"><span class="round-icon blue">${icon('check')}</span><span><strong>${progress.done}<small> / ${progress.total}</small></strong><p>materi paket selesai</p></span></div>`
 +`<div class="stat-card"><span class="round-icon tangerine">${icon('clock')}</span><span><strong>${mins}<small> menit</small></strong><p>total waktu sesi tercatat</p></span></div>`
 +`<div class="stat-card"><span class="round-icon grape">${icon('book')}</span><span><strong>${C.completed(c).size}<small> / ${levelLessons().length}</small></strong><p>materi jenjang ini dicoba</p></span></div></div>`
 +(due.length?`<section class="white-card"><div class="section-head"><div><p class="eyebrow">PERLU DIULANG</p><h2>Materi yang kemarin masih perlu bantuan</h2></div></div>`
  +`<p class="card-note">Materi ini Anda catat belum bisa dikerjakan sendiri dan sudah lewat dua hari. Mengulang saat jeda dua hari membantu anak mengingat lebih lama.</p>`
  +`<div class="lesson-list">${due.map(lessonRow).join('')}</div></section>`:'')
 +`<section class="white-card"><div class="section-head"><div><p class="eyebrow">DELAPAN BIDANG</p><h2>Cakupan materi ${C.levelName(c.level)}</h2></div><a href="#library" class="text-link">Semua materi ${icon('arrow')}</a></div>`
 +`<div class="topic-grid">${topics.map(t=>{const p=C.topicProgress(c,t.id,lessons);return `<a href="#library/${t.id}" class="topic-card ${tone(t.id)}">${art(t.id)}<div><h3>${t.name}</h3><span>${p.done} dari ${p.total} materi selesai</span>${icon('arrow')}</div></a>`;}).join('')}</div></section>`,'Hari ini');
}
function lessonRow(l,index=0){
 const t=topic(l.topic),done=C.latest(child(),l.id);
 return `<article class="lesson-row"><span class="subject-icon ${tone(l.topic)}">${icon(t.icon)}</span>`
 +`<div class="lesson-row-info"><span class="overline">${t.name}</span><h3><a href="#lesson/${l.id}">${l.title}</a></h3>`
 +`<p>${l.minutes} menit · ${done?labels[done.rating]:'Belum dikerjakan'}</p></div>`
 +`<a class="row-go" href="#lesson/${l.id}" aria-label="Buka ${l.title}">${icon('arrow')}</a></article>`;
}

/* ---------- paket 30 hari ---------- */
function planPage(){
 const c=child(),today=C.planDayNumber(c),progress=C.planProgress(c);
 if(!c.plan)return shell(empty('calendar','Paket belum tersusun','Materi jenjang ini belum tersedia.','Buka semua materi','go-library'),'Paket 30 hari');
 const total=c.plan.days.length;
 return shell(heading('RENCANA SIAP PAKAI','Paket '+total+' hari '+C.levelName(c.level),
  'Urutan dibuat bergilir antar delapan bidang supaya setiap minggu menyentuh banyak kemampuan. Anda tidak perlu menyusunnya sendiri; boleh dikerjakan tidak berurutan.',
  `<button class="button secondary compact" data-action="print-plan">${icon('print')} Cetak paket</button>`)
 +`<div class="plan-summary white-card"><div><strong>Hari ${today} dari ${total}</strong><p>Mulai ${fmt(c.plan.start)} · ${progress.done} dari ${progress.total} materi selesai</p></div>`
 +`<div class="progress-track"><i style="width:${progress.percent}%"></i></div>`
 +`<button class="button secondary compact" data-action="restart-plan">${icon('calendar')} Mulai ulang dari hari ini</button></div>`
 +`<div class="plan-list">${c.plan.days.map((entry,i)=>{
   const l=lesson(entry.lessonId),t=topic(l.topic),done=C.latest(c,l.id),n=i+1;
   return `<article class="plan-row ${n===today?'today':''} ${done?'done':''}"><div class="plan-day"><span>HARI</span><strong>${n}</strong></div>`
   +`<span class="subject-icon ${tone(l.topic)}">${icon(t.icon)}</span>`
   +`<div class="plan-info"><span class="overline">${t.name}${entry.kind==='review'?' · ulang':''}</span><h3><a href="#lesson/${l.id}">${l.title}</a></h3><p>${l.outcome||l.summary}</p></div>`
   +`<div class="plan-actions">${done?pill(labels[done.rating],done.rating==='independent'?'leaf':'sun'):n===today?pill('Hari ini','blue'):''}`
   +`<a class="icon-button" href="#lesson/${l.id}" aria-label="Buka ${l.title}">${icon('arrow')}</a></div></article>`;}).join('')}</div>`
 +(c.plan.days.some(d=>d.kind==='review')
  ?`<div class="card-note info">Jenjang ${C.levelName(c.level)} berisi ${levelLessons().length} materi. Hari bertanda “ulang” memakai materi yang sudah dikerjakan supaya anak mengerjakannya kembali setelah jeda beberapa hari.</div>`
  :''),'Paket 30 hari');
}

/* ---------- katalog ---------- */
function libraryPage(){
 const c=child();
 const pool=levelLessons();
 const filtered=pool.filter(l=>
  (libraryTopic==='all'||l.topic===libraryTopic)
  &&(libraryFilter==='all'||(libraryFilter==='done'?C.latest(c,l.id):!C.latest(c,l.id)))
  &&(l.title+' '+l.summary+' '+l.materials.join(' ')+' '+topic(l.topic).name).toLowerCase().includes(libraryQuery.toLowerCase()));
 return shell(heading('MATERI '+C.levelName(c.level).toUpperCase(),'Semua materi '+C.levelName(c.level),
  `${pool.length} materi untuk usia ${C.levelAges(c.level)}, terbagi dalam delapan bidang. Setiap materi berisi perintah untuk Anda, worksheet anak yang bisa dicetak, dan soal percakapan.`)
 +`<div class="library-toolbar"><label class="search-field">${icon('search')}<input id="library-search" type="search" placeholder="Cari judul, bidang, atau bahan…" aria-label="Cari materi" value="${E(libraryQuery)}"></label>`
 +`<select id="library-filter" aria-label="Filter status materi"><option value="all" ${libraryFilter==='all'?'selected':''}>Semua status</option><option value="new" ${libraryFilter==='new'?'selected':''}>Belum dikerjakan</option><option value="done" ${libraryFilter==='done'?'selected':''}>Sudah dikerjakan</option></select></div>`
 +`<div class="filter-chips" aria-label="Bidang belajar"><button class="filter-chip ${libraryTopic==='all'?'active':''}" data-action="topic" data-id="all" aria-pressed="${libraryTopic==='all'}">Semua bidang</button>`
 +`${topics.map(t=>`<button class="filter-chip ${tone(t.id)} ${libraryTopic===t.id?'active':''}" data-action="topic" data-id="${t.id}" aria-pressed="${libraryTopic===t.id}">${icon(t.icon)}${t.short}</button>`).join('')}</div>`
 +`<div class="library-summary"><span>${filtered.length} materi ditampilkan${libraryTopic==='all'?'':' di '+topic(libraryTopic).name}</span></div>`
 +`<div class="lesson-grid">${filtered.map(l=>{const t=topic(l.topic),s=C.latest(c,l.id);
   return `<article class="material-card"><a class="material-visual ${tone(l.topic)}" href="#lesson/${l.id}" tabindex="-1" aria-hidden="true">${art(t.id)}<span class="material-order">${t.short} ${String(l.order).padStart(2,'0')}</span></a>`
   +`<div class="material-body"><span class="overline">${t.name}</span><h2><a href="#lesson/${l.id}">${l.title}</a></h2><p>${l.outcome||l.summary}</p>`
   +`<div class="material-footer"><span>${icon('clock')} ${l.minutes} menit</span>${s?pill(labels[s.rating],s.rating==='independent'?'leaf':'sun'):pill('Belum dikerjakan','neutral')}</div></div></article>`;}).join('')}</div>`
 +(filtered.length?'':empty('book','Tidak ada materi yang cocok','Coba kata kunci lain atau pilih bidang yang berbeda.','Reset pencarian','reset-search')),'Semua materi');
}
function refreshLibraryResults(){
 const template=document.createElement('template');template.innerHTML=libraryPage();
 for(const selector of ['.library-summary','.lesson-grid']){
  const current=document.querySelector(selector),next=template.content.querySelector(selector);
  if(current&&next)current.replaceWith(next);
 }
 document.querySelector('#main .empty-state')?.remove();
 const emptyResult=template.content.querySelector('.empty-state');
 if(emptyResult)document.querySelector('.lesson-grid')?.after(emptyResult);
}

/* ---------- halaman pembuka materi: manfaat dan harapan hasil ---------- */
function lessonPage(id){
 const l=lesson(id);
 if(!l||l.level!==child().level)return missingPage();
 const t=topic(l.topic),c=child(),s=C.latest(c,id),draft=c.draft?.lessonId===id;
 const planIndex=(c.plan?.days||[]).findIndex(d=>d.lessonId===id);
 return shell(`<a class="back-link" href="#library/${l.topic}">${icon('back')} ${t.name}</a>`
 +`<div class="lesson-hero ${tone(l.topic)}"><div><span class="hero-tags">${pill(t.name,'white')}${planIndex>=0?pill('Hari '+(planIndex+1)+' paket','white'):''}</span>`
 +`<h1>${l.title}</h1><p>${l.summary}</p>`
 +`<div class="lesson-meta"><span>${icon('clock')} ${l.minutes} menit</span><span>${icon('user')} ${C.levelName(l.level)} · usia ${C.levelAges(l.level)}</span><span>${icon('list')} ${l.questions.length} soal percakapan</span></div></div>${art(l.topic)}</div>`
 +`<div class="intro-layout"><section class="white-card intro-card benefit"><span class="round-icon ${tone(l.topic)}">${icon('spark')}</span>`
 +`<h2>Manfaat materi ini</h2><p class="lead-text">${l.benefit||l.goal}</p></section>`
 +`<section class="white-card intro-card outcome"><span class="round-icon ${tone(l.topic)}">${icon('target')}</span>`
 +`<h2>Harapan hasil anak</h2><p class="lead-text">${l.outcome||l.goal}</p>`
 +`<p class="card-note">Ini yang Anda amati di akhir sesi. Satu sesi belum berarti kemampuan sudah dikuasai di semua situasi.</p></section></div>`
 +`<section class="white-card prep-card"><div class="section-head"><div><p class="eyebrow">SEBELUM MULAI</p><h2>Siapkan ${l.materials.length} benda ini</h2></div><span class="muted">Semuanya biasa ada di rumah</span></div>`
 +`<ul class="material-preview">${l.materials.map(m=>`<li>${icon('check')} ${E(m)}</li>`).join('')}</ul>`
 +`<div class="start-bar"><button class="button primary large" data-action="start-session" data-id="${id}">${icon('play')} ${draft?'Lanjutkan sesi':s?'Kerjakan lagi':'Mulai'} ${icon('arrow')}</button>`
 +`<p>Setelah ditekan, perintah untuk Anda dan worksheet anak terbuka dalam satu halaman.</p></div>`
 +`<div class="prep-secondary"><button class="text-link" data-action="print-worksheet" data-id="${id}">${icon('print')} Cetak worksheet dulu</button>`
 +`<button class="text-link" data-action="print-parent" data-id="${id}">${icon('print')} Cetak panduan orang tua</button></div></section>`
 +(s?`<section class="white-card last-session"><span class="eyebrow">CATATAN TERAKHIR · ${fmt(s.date).toUpperCase()}</span><h3>${labels[s.rating]}</h3><p>${ratingHelp[s.rating]}</p>${s.note?`<blockquote>${E(s.note)}</blockquote>`:''}<a href="#progress" class="text-link">Lihat semua hasil ${icon('arrow')}</a></section>`:''),'Materi');
}

/* ---------- satu halaman kerja: perintah + worksheet + soal + catatan ---------- */
function workPage(id){
 const l=lesson(id);
 if(!l)return missingPage();
 if(!session||session.lessonId!==id){
  const d=child().draft;
  if(d?.lessonId===id)session=structuredClone(d);
  else return lessonPage(id);
 }
 const s=session,t=topic(l.topic),c=child();
 const answered=l.questions.filter((_,i)=>s.answers[i]!==null&&s.answers[i]!==undefined).length;
 return `<div class="work-shell"><header class="work-header"><a href="#home" class="brand"><img src="assets/favicon.svg" width="32" height="32" alt=""><span>belajar<span class="brand-light">anak</span></span></a>`
 +`<div class="work-title"><span class="overline">${t.name} · ${C.levelName(l.level)}</span><strong>${l.title}</strong></div>`
 +`<div class="work-tools"><button class="timer" data-action="toggle-timer" aria-label="${timerPaused?'Lanjutkan':'Jeda'} penghitung waktu">${icon(timerPaused?'play':'pause')}<span id="timer-value">${timerText(s.seconds)}</span></button>`
 +`<button class="button secondary compact" data-action="exit-session">${icon('close')} Simpan & keluar</button></div></header>`
 +`<main id="main" tabindex="-1" class="work-main">`
/* Tautan anchor biasa akan mengubah hash dan memicu router, jadi lompatan
   antarbagian memakai tombol. */
 +`<nav class="work-jump" aria-label="Bagian halaman">`
 +`${[['bahan','1. Bahan'],['perintah','2. Perintah Anda'],['worksheet','3. Worksheet anak'],['soal','4. Soal percakapan'],['catatan','5. Catat hasil']]
   .map(([target,label])=>`<button data-action="jump" data-target="${target}">${label}</button>`).join('')}</nav>`

 +`<section class="work-section" id="bahan"><h2><span>1</span> Bahan yang disiapkan</h2>`
 +`<div class="material-checks">${l.materials.map((m,i)=>`<label><input type="checkbox" data-prepared="${i}" ${s.prepared?.[i]?'checked':''}><span>${E(m)}</span></label>`).join('')}</div></section>`

 +`<section class="work-section" id="perintah"><h2><span>2</span> Perintah untuk Anda</h2>`
 +`<p class="section-lead">Seluruh langkah ada di halaman ini — tidak perlu berpindah halaman. Kalimat dalam tanda kutip bisa Anda bacakan langsung kepada ${E(c.name)}.</p>`
 +`<ol class="command-list">${l.steps.map(step=>`<li><h3>${step.title}</h3><p>${step.body}</p><blockquote><span>BACAKAN</span>“${step.say}”</blockquote></li>`).join('')}</ol></section>`

 +`<section class="work-section" id="worksheet"><h2><span>3</span> Worksheet anak</h2>`
 +worksheetPanel(l)+`</section>`

 +`<section class="work-section" id="soal"><h2><span>4</span> Soal percakapan <small>${answered} dari ${l.questions.length} terjawab</small></h2>`
 +`<p class="section-lead">Bacakan pertanyaannya. Anak boleh menjawab dengan benda, gerakan, atau kata. Anda yang menandai pilihannya. Jawaban yang tepat muncul setelah ditandai supaya Anda bisa langsung menjelaskan.</p>`
 +`<div class="practice-questions">${l.questions.map((q,i)=>{
   const pick=s.answers[i],has=pick!==null&&pick!==undefined,correct=has&&pick===q.answer;
   return `<section class="question ${has?(correct?'is-correct':'is-wrong'):''}"><span class="overline">SOAL ${i+1} DARI ${l.questions.length}</span><h3>${q.prompt}</h3>`
   +`<div class="answer-options">${q.choices.map((a,j)=>{
     const chosen=pick===j,isKey=has&&j===q.answer;
     return `<button class="answer-option ${chosen?'chosen':''} ${isKey?'key':''}" data-action="answer" data-question="${i}" data-answer="${j}" aria-pressed="${chosen}">`
     +`<span class="option-letter">${String.fromCharCode(65+j)}</span><span class="option-text">${a}</span>`
     +`${isKey?icon('check','option-mark'):chosen?icon('close','option-mark'):''}</button>`;}).join('')}</div>`
   +(has?`<div class="answer-feedback ${correct?'correct':'revisit'}" role="status">${icon(correct?'check':'help')}`
     +`<p><strong>${correct?'Tepat.':'Jawaban yang tepat: '+q.choices[q.answer]+'.'}</strong> ${q.explanation}</p></div>`
     +`<button class="text-link" data-action="clear-answer" data-question="${i}">Hapus jawaban dan coba lagi</button>`:'')
   +`</section>`;}).join('')}</div>`
 +(l.topic==='english'?`<button class="button secondary" data-action="speak" data-id="${l.id}">${icon('volume')} Dengarkan contoh pelafalan</button>`:'')+`</section>`

 +`<section class="work-section" id="catatan"><h2><span>5</span> Catat hasil ${E(c.name)}</h2>`
 +`<p class="section-lead">Pilih satu yang paling sesuai dengan apa yang Anda lihat hari ini. Pilihan ini menentukan materi mana yang ditawarkan ulang.</p>`
 +`<fieldset class="rating-fieldset"><legend class="sr-only">Hasil pengamatan</legend><div class="rating-grid">`
 +`${['trying','supported','independent'].map(value=>`<label class="rating-card ${s.rating===value?'selected':''}"><input type="radio" name="rating" value="${value}" ${s.rating===value?'checked':''}><strong>${labels[value]}</strong><span>${ratingHelp[value]}</span></label>`).join('')}</div></fieldset>`
 +`<label class="field"><span>Catatan untuk Anda sendiri <small>opsional</small></span><textarea id="session-note" rows="3" maxlength="1500" placeholder="Misalnya: masih melewati benda saat menghitung di atas tujuh.">${E(s.note)}</textarea></label>`
 +`<div class="work-finish"><button class="button secondary" data-action="exit-session">${icon('back')} Simpan & lanjutkan nanti</button>`
 +`<button class="button primary large" data-action="complete-session">${icon('check')} Simpan hasil & selesai</button></div></section>`
 +`</main></div>`;
}

/* ---------- worksheet ---------- */
function worksheetPanel(l){
 const c=child();
 return `<div class="worksheet-workspace"><div class="worksheet-toolbar"><div><h3>${E(BAWorksheets.specs[l.id].title)}</h3>`
 +`<p>Kotak jawaban bisa diisi langsung di layar dan tersimpan otomatis. Kegiatan menggambar dan menarik garis dikerjakan di kertas setelah dicetak.</p>`
 +`<span class="worksheet-save-status" role="status">Jawaban tersimpan di profil ${E(c.name)}.</span></div>`
 +`<div class="worksheet-tools"><label>Gambar <select id="worksheet-ink"><option value="color" ${c.worksheetInk!=='outline'?'selected':''}>Berwarna</option><option value="outline" ${c.worksheetInk==='outline'?'selected':''}>Garis (hemat tinta)</option></select></label>`
 +`<button class="button primary compact" data-action="print-worksheet" data-id="${l.id}">${icon('print')} Cetak worksheet</button></div></div>`
 +`<div class="worksheet-print-options"><span>A4 · 1 halaman</span><label><input type="checkbox" id="print-child-answers"> Sertakan jawaban anak saat dicetak</label>`
 +`<button class="text-link" data-action="print-parent" data-id="${l.id}">Cetak panduan orang tua</button>`
 +`<button class="text-link" data-action="print-session-pack" data-id="${l.id}">Cetak paket 2 halaman</button></div>`
 +(l.id==='english-2'&&c.worksheetInk==='outline'?`<div class="card-note info">Materi ini mengenalkan warna. Pilih “Berwarna” saat mencetak, atau warnai gambarnya lebih dahulu bersama anak.</div>`:'')
 +`<div class="worksheet-paper-wrap">${BAWorksheets.render(l.id,{name:c.name,variant:c.worksheetInk,answers:c.worksheets[l.id]||{}})}</div>`
 +`<div class="worksheet-bottom"><p>Worksheet adalah bahan percakapan. Tidak semua bagian punya satu jawaban benar.</p>`
 +`<button class="text-link" data-action="clear-worksheet" data-id="${l.id}">Kosongkan jawaban worksheet ini</button></div></div>`;
}
function parentSheet(l){
 return `<article class="wk-sheet wk-parent"><header class="wk-header"><div><span class="wk-brand">belajar anak</span>`
 +`<span class="wk-level">${C.levelName(l.level)} · PANDUAN ORANG TUA</span><h1>${E(l.title)}</h1></div></header>`
 +`<p class="wk-instruction"><strong>Manfaat:</strong> ${E(l.benefit||l.goal)}</p>`
 +`<p class="wk-instruction"><strong>Harapan hasil:</strong> ${E(l.outcome||l.goal)}</p>`
 +`<p><strong>Bahan:</strong> ${l.materials.map(E).join(' · ')}</p>`
 +`<div class="wk-parent-steps">${l.steps.map((step,i)=>`<section><h2>${i+1}. ${E(step.title)}</h2><p>${E(step.body)}</p><blockquote>“${E(step.say)}”</blockquote></section>`).join('')}</div>`
 +`<section class="wk-parent-key"><h2>Kunci jawaban dan hal yang diamati</h2>${BAWorksheets.specs[l.id].answers.map(a=>`<p>${E(a)}</p>`).join('')}`
 +`${l.questions.map((q,i)=>`<p><b>Soal ${i+1}:</b> ${E(q.prompt)} → ${E(q.choices[q.answer])}. ${E(q.explanation)}</p>`).join('')}</section>`
 +`<p><strong>Bila anak kesulitan:</strong> ${E(l.support[0])}</p>`
 +`<p class="wk-parent-note">Catatan pengamatan: __________________________________________________<br>___________________________________________________________________</p>`
 +`<footer class="wk-footer"><span>Untuk pendamping · Simpan terpisah dari lembar anak</span><span>${l.id}</span></footer></article>`;
}

/* ---------- hasil anak ---------- */
function progressPage(){
 const c=child(),done=C.completed(c).size,mins=Math.round(c.sessions.reduce((n,s)=>n+s.seconds,0)/60);
 const counts={trying:0,supported:0,independent:0};
 for(const id of C.completed(c)){const s=C.latest(c,id);counts[s.rating]++;}
 return shell(heading('RINGKASAN DARI SESI YANG DIJALANKAN','Hasil belajar '+E(c.name),
  'Ringkasan ini dihitung dari catatan Anda sendiri di akhir setiap sesi. Bukan nilai, bukan tes, dan bukan asesmen kesiapan sekolah.',
  `<button class="button secondary compact" data-action="print-report">${icon('print')} Cetak ringkasan</button>`)
 +`<div class="stats-grid"><div class="stat-card"><span class="round-icon leaf">${icon('book')}</span><span><strong>${done}<small> / ${levelLessons().length}</small></strong><p>materi sudah dikerjakan</p></span></div>`
 +`<div class="stat-card"><span class="round-icon blue">${icon('check')}</span><span><strong>${counts.independent}</strong><p>terakhir teramati bisa sendiri</p></span></div>`
 +`<div class="stat-card"><span class="round-icon sun">${icon('help')}</span><span><strong>${counts.supported+counts.trying}</strong><p>masih perlu bantuan atau contoh</p></span></div>`
 +`<div class="stat-card"><span class="round-icon tangerine">${icon('clock')}</span><span><strong>${mins}<small> menit</small></strong><p>total waktu sesi</p></span></div></div>`
 +`<div class="tab-bar" role="tablist" aria-label="Tampilan hasil">`
 +`<button role="tab" aria-selected="${progressView==='skills'}" class="${progressView==='skills'?'active':''}" data-action="progress-tab" data-id="skills">Per bidang</button>`
 +`<button role="tab" aria-selected="${progressView==='history'}" class="${progressView==='history'?'active':''}" data-action="progress-tab" data-id="history">Riwayat sesi <span>${c.sessions.length}</span></button></div>`
 +(progressView==='skills'
  ?`<div class="skill-grid">${topics.map(t=>{const p=C.topicProgress(c,t.id,lessons);
    return `<details class="skill-card"><summary><span class="subject-icon ${tone(t.id)}">${icon(t.icon)}</span>`
    +`<div><h2>${t.name}</h2><p>${p.done} dari ${p.total} materi dikerjakan · ${p.independent} teramati bisa sendiri</p></div>${icon('down')}`
    +`<span class="progress-track"><i style="width:${p.percent}%"></i></span></summary>`
    +`<div class="skill-lessons">${lessons.filter(l=>l.topic===t.id&&l.level===c.level).map(l=>{const s=C.latest(c,l.id);
      return `<a href="#lesson/${l.id}"><span>${l.title}</span>${s?pill(labels[s.rating],s.rating==='independent'?'leaf':'sun'):'<span class="muted">Belum dikerjakan</span>'}</a>`;}).join('')}</div></details>`;}).join('')}</div>`
  :c.sessions.length
   ?`<div class="history-list">${[...c.sessions].sort((a,b)=>b.at.localeCompare(a.at)).map(s=>{const l=lesson(s.lessonId),t=topic(l.topic);
     return `<article class="white-card history-card"><span class="subject-icon ${tone(l.topic)}">${icon(t.icon)}</span>`
     +`<div><span class="overline">${fmt(s.date)} · ${Math.max(1,Math.round(s.seconds/60))} menit</span><h3>${l.title}</h3>${s.note?`<p>${E(s.note)}</p>`:''}</div>`
     +`${pill(labels[s.rating],s.rating==='independent'?'leaf':'sun')}`
     +`<button class="icon-button" data-action="edit-session" data-id="${s.id}" aria-label="Ubah catatan ${l.title}">${icon('edit')}</button></article>`;}).join('')}</div>`
   :empty('chart','Belum ada sesi tercatat','Setelah satu materi dikerjakan dan hasilnya dicatat, ringkasannya muncul di sini.','Buka materi hari ini','go-home')),'Hasil anak');
}

/* ---------- pengaturan ---------- */
function settingsPage(){
 const c=child();
 return shell(heading('AKUN DAN DATA','Pengaturan','Profil anak, akses jenjang, dan cadangan data keluarga.')
 +`<div class="settings-layout"><div><section class="white-card"><div class="section-head"><h2>Profil anak</h2><span class="muted">${state.children.length} dari 3 profil</span></div>`
 +`<div class="profile-list">${state.children.map(p=>`<div class="profile-setting">${avatar(p.avatar,'large')}<div><h3>${E(p.name)} ${p.id===c.id?pill('Aktif','blue'):''}</h3><p>${C.age(p.dob)} tahun · ${C.levelName(p.level)}</p></div>`
 +`<button class="button secondary compact" data-action="edit-child" data-id="${p.id}">${icon('edit')} Ubah</button></div>`).join('')}</div>`
 +`${state.children.length<3?`<button class="text-link" data-action="add-child">${icon('plus')} Tambah profil anak</button>`:''}`
 +`<p class="card-note">Semua profil memakai jenjang ${C.levelName(state.access.level)} sesuai kode belajar Anda. Untuk jenjang lain diperlukan kode terpisah.</p></section>`
 +`<section class="white-card"><div class="section-head"><h2>Akun orang tua</h2><button class="text-link" data-action="account">Ubah ${icon('edit')}</button></div>`
 +`<dl class="settings-details"><div><dt>Nama</dt><dd>${E(state.account.name)}</dd></div><div><dt>Email</dt><dd>${E(state.account.email)||'Belum ditambahkan'}</dd></div></dl></section>`
 +`<section class="white-card"><h2>Data keluarga</h2><p>Catatan disimpan pada browser di perangkat ini. Unduh cadangan untuk memindahkan atau menyimpannya.</p>`
 +`<div class="button-group wrap"><button class="button secondary" data-action="export-data">${icon('download')} Ekspor cadangan</button>`
 +`<button class="button secondary" data-action="import-data">${icon('upload')} Pulihkan cadangan</button></div>`
 +`<input class="sr-only" type="file" id="backup-input" accept="application/json,.json" tabindex="-1">`
 +`<details class="data-reset"><summary>Mulai ulang data perangkat</summary><p>Profil, paket 30 hari, dan catatan di browser ini akan dihapus, termasuk kode belajar yang sudah dimasukkan. Ekspor cadangan terlebih dahulu bila masih diperlukan.</p>`
 +`<button class="button danger" data-action="reset-data">Hapus data perangkat</button></details></section></div>`
 +`<aside><section class="access-card"><span class="round-icon white">${icon('key')}</span><p class="eyebrow">AKSES AKTIF</p>`
 +`<h2>${C.levelName(state.access.level)}</h2><p>Kode <b>${E(state.access.code)}</b> · aktif sejak ${fmt(state.access.activatedAt)}</p>`
 +`<ul><li>${icon('check')} ${levelLessons().length} materi usia ${C.levelAges(state.access.level)}</li><li>${icon('check')} Paket ${child().plan?.days.length||0} hari siap pakai</li>`
 +`<li>${icon('check')} Worksheet anak dan panduan orang tua siap cetak</li><li>${icon('check')} Sampai 3 profil anak</li></ul></section>`
 +`<section class="white-card"><h3>Panduan singkat untuk pendamping</h3><p>Tiga catatan pendek tentang cara bertanya dan menanggapi jawaban anak.</p>`
 +`<div class="guide-links">${guides.map(g=>`<button class="guide-link" data-action="guide" data-id="${g.id}"><span>${g.title}</span>${state.guidesRead.includes(g.id)?icon('check'):icon('arrow')}</button>`).join('')}</div></section>`
 +`<button class="button secondary full" data-action="help">${icon('help')} Pertanyaan yang sering muncul</button></aside></div>`,'Pengaturan');
}
function missingPage(){
 return shell(empty('book','Halaman tidak ditemukan','Materi yang Anda buka mungkin bukan bagian dari jenjang yang aktif.','Buka semua materi','go-library'),'Materi');
}

/* ---------- router ---------- */
function render(){
 const parts=(location.hash.slice(1)||'home').split('/'),[route,id]=parts;
 if(!state.onboarded||!state.children.length){
  if(session){session=null;stopTimer();}
  app.innerHTML=welcomePage();
  document.title='Mulai — Belajar Anak';
  return;
 }
 if(route!=='work'&&session){saveDraft();stopTimer();session=null;}
 if(route==='library'&&id&&topics.some(t=>t.id===id))libraryTopic=id;
 if(route==='progress'&&id==='history')progressView='history';
 const pages={home:homePage,plan:planPage,library:libraryPage,progress:progressPage,settings:settingsPage};
 app.innerHTML=route==='lesson'?lessonPage(id):route==='work'?workPage(id):(pages[route]||missingPage)();
 const names={home:'Hari ini',plan:'Paket 30 hari',library:'Semua materi',progress:'Hasil anak',settings:'Pengaturan'};
 document.title=(route==='lesson'||route==='work'?lesson(id)?.title||'Belajar Anak':names[route]||'Belajar Anak')+' — Belajar Anak';
}

/* Halaman kerja panjang; menandai jawaban tidak boleh melemparkan orang tua
   kembali ke bagian atas halaman. */
function renderKeepingScroll(){
 const y=window.scrollY;
 render();
 window.scrollTo(0,y);
}

/* ---------- dialog ---------- */
function openModal(title,body,wide=false){
 dialogReturn=document.activeElement;
 dialog.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${title}</h2><button class="icon-button" data-action="close-dialog" aria-label="Tutup">${icon('close')}</button></div><div class="dialog-body">${body}</div>`;
 dialog.classList.toggle('wide',wide);
 if(!dialog.open)dialog.showModal();
}
function closeModal(){dialog.close();if(dialogReturn?.isConnected)dialogReturn.focus();}
function field(label,name,value,type='text',extra=''){
 return `<label class="field"><span>${label}</span><input name="${name}" type="${type}" value="${E(value)}" ${extra}></label>`;
}
const formActions=(label='Simpan perubahan')=>`<div class="form-actions"><button type="button" class="button secondary" data-action="close-dialog">Batal</button><button type="submit" class="button primary">${icon('check')} ${label}</button></div>`;
function childrenModal(){
 openModal('Profil anak',`<p>Setiap anak punya paket 30 hari dan catatan hasilnya sendiri.</p>`
 +`<div class="child-options">${state.children.map(c=>`<button data-action="switch-child" data-id="${c.id}" class="child-option ${c.id===state.activeChild?'selected':''}">${avatar(c.avatar,'large')}`
 +`<span><strong>${E(c.name)}</strong><small>${C.age(c.dob)} tahun · ${C.levelName(c.level)} · hari ${C.planDayNumber(c)}</small></span>${c.id===state.activeChild?icon('check'):icon('arrow')}</button>`).join('')}</div>`
 +`${state.children.length<3?`<button class="button secondary full" data-action="add-child">${icon('plus')} Tambah profil anak</button>`:''}`
 +`<button class="button secondary full" data-action="edit-child" data-id="${state.activeChild}">${icon('edit')} Ubah profil aktif</button>`);
}
function childModal(id){
 const c=state.children.find(c=>c.id===id),p=c||{name:'',dob:C.addDays(C.dateKey(),-2190),avatar:'bunny'};
 openModal(c?'Profil '+E(c.name):'Tambah profil anak',
 `<form id="child-form" data-id="${c?.id||''}"><p>Jenjang mengikuti kode belajar Anda: <b>${C.levelName(state.access.level)}</b>.</p>`
 +`<fieldset class="avatar-fieldset"><legend>Gambar profil</legend><div class="avatar-choices">`
 +`${['bunny','bear','fox','cat','frog'].map((a,i)=>`<label><input type="radio" name="avatar" value="${a}" ${a===p.avatar?'checked':''} aria-label="${['Kelinci','Beruang','Rubah','Kucing','Katak'][i]}">${avatar(a)}</label>`).join('')}</div></fieldset>`
 +`${field('Nama panggilan','name',p.name,'text','required maxlength="32" autocomplete="off"')}`
 +`${field('Tanggal lahir','dob',p.dob,'date',`required min="${new Date().getFullYear()-18}-01-01" max="${C.dateKey()}"`)}`
 +`${formActions(c?'Simpan profil':'Tambah profil')}`
 +`${c&&state.children.length>1?`<button type="button" class="danger-link" data-action="remove-child" data-id="${c.id}">Hapus profil dan catatannya</button>`:''}</form>`);
}
function accountModal(){
 openModal('Akun orang tua',`<form id="account-form">${field('Nama yang ditampilkan','name',state.account.name,'text','required maxlength="60" autocomplete="name"')}`
 +`${field('Email (opsional)','email',state.account.email,'email','maxlength="120" autocomplete="email"')}`
 +`<p class="field-help">Email hanya disimpan di perangkat ini.</p>${formActions()}</form>`);
}
function guideModal(id){
 const g=guides.find(g=>g.id===id);if(!g)return;
 openModal(g.title,`<div class="guide-modal"><span class="overline">${g.subtitle}</span><p class="lead-text">${g.intro}</p>`
 +`<ol>${g.steps.map(s=>`<li>${s}</li>`).join('')}</ol><blockquote><span>CONTOH KALIMAT</span>${g.example}</blockquote>`
 +`<button class="button primary full" data-action="read-guide" data-id="${g.id}">${icon('check')} ${state.guidesRead.includes(id)?'Sudah dibaca':'Tandai sudah dibaca'}</button></div>`);
}
function editSessionModal(id){
 const s=child().sessions.find(s=>s.id===id);if(!s)return;
 openModal('Catatan '+lesson(s.lessonId).title,
 `<form id="edit-session-form" data-id="${id}"><p>${fmt(s.date)} · ${E(child().name)}</p>`
 +`<label class="field"><span>Hasil pengamatan</span><select name="rating">${Object.entries(labels).map(([k,v])=>`<option value="${k}" ${s.rating===k?'selected':''}>${v}</option>`).join('')}</select></label>`
 +`<label class="field"><span>Catatan</span><textarea name="note" maxlength="1500" rows="5">${E(s.note)}</textarea></label>${formActions()}</form>`);
}
function helpModal(){
 openModal('Pertanyaan yang sering muncul',`<div class="help-questions">${[
 ['Apa yang saya kerjakan setiap hari?','Buka Hari ini, tekan Mulai pelajari, lalu ikuti satu halaman kerja: siapkan bahan, bacakan perintah, kerjakan worksheet, tandai soal, catat hasil. Satu sesi 15–20 menit.'],
 ['Apakah saya perlu menyusun rencana sendiri?','Tidak. Paket 30 hari sudah tersusun bergilir antar delapan bidang begitu kode belajar dimasukkan. Anda boleh mengerjakannya tidak berurutan; nomor hari hanya penanda posisi.'],
 ['Kenapa hanya satu jenjang yang muncul?','Satu kode belajar membuka satu jenjang sesuai usia yang Anda beli. Untuk jenjang lain diperlukan kode terpisah.'],
 ['Apakah anak harus menatap layar?','Tidak harus. Kotak jawaban worksheet dapat diisi di layar, tetapi seluruh worksheet dan panduan bisa dicetak lalu dikerjakan di kertas.'],
 ['Bagaimana mencetak worksheet?','Dari halaman materi atau halaman kerja, tekan Cetak worksheet. Di dialog cetak browser Anda dapat memilih printer atau Simpan sebagai PDF.'],
 ['Di mana catatan tersimpan?','Pada browser di perangkat ini saja. Gunakan Ekspor cadangan di Pengaturan, lalu Pulihkan cadangan pada perangkat tujuan.'],
 ['Apa arti “bisa sendiri”?','Pada sesi itu anak mengerjakan tanpa petunjuk dan bisa menjelaskan caranya. Ini catatan pengamatan Anda, bukan hasil tes atau jaminan kesiapan sekolah.']
 ].map(([q,a])=>`<details><summary>${q}${icon('down')}</summary><p>${a}</p></details>`).join('')}</div>`);
}

/* ---------- sesi ---------- */
function startSession(id,force=false){
 const l=lesson(id);if(!l)return;
 const d=child().draft;
 if(d&&d.lessonId!==id&&!force){
  openModal('Ada sesi yang belum selesai',
  `<p>Sesi <strong>${lesson(d.lessonId).title}</strong> masih bisa dilanjutkan. Memulai materi baru akan mengganti catatan sesi yang belum selesai itu.</p>`
  +`<div class="form-actions"><button class="button secondary" data-action="resume-draft">Lanjutkan sebelumnya</button>`
  +`<button class="button primary" data-action="replace-session" data-id="${id}">Mulai yang baru</button></div>`);
  return;
 }
 const next=structuredClone(state),c=C.activeChild(next);
 c.draft=d?.lessonId===id?structuredClone(d):{id:C.uid(),lessonId:id,seconds:0,answers:[],note:'',rating:'',prepared:l.materials.map(()=>false)};
 if(!persist(next))return;
 session=structuredClone(c.draft);
 closeModal();startTimer();
 location.hash='work/'+id;render();window.scrollTo(0,0);
}
function saveDraft(){
 if(!session)return true;
 const next=structuredClone(state);
 C.activeChild(next).draft=structuredClone(session);
 return persist(next);
}
function timerText(seconds){const n=Math.floor(seconds);return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;}
function startTimer(){
 clearInterval(timerHandle);timerPaused=false;
 let previous=performance.now();
 timerHandle=setInterval(()=>{
  if(session&&!timerPaused){
   const now=performance.now();
   session.seconds=Math.min(86400,session.seconds+(now-previous)/1000);previous=now;
   const el=document.querySelector('#timer-value');if(el)el.textContent=timerText(session.seconds);
   if(Math.floor(session.seconds)%10===0)saveDraft();
  }
 },1000);
}
function stopTimer(){clearInterval(timerHandle);timerHandle=null;timerPaused=true;}
function completeSession(){
 if(!session?.rating){
  toast('Pilih dulu hasil pengamatan di bagian 5.');
  document.querySelector('#catatan')?.scrollIntoView({block:'center'});
  document.querySelector('.rating-card input')?.focus();
  return;
 }
 const finished=structuredClone(session),l=lesson(finished.lessonId);
 if(!change((_,c)=>C.recordSession(c,finished.lessonId,finished.rating,finished.note,finished.seconds,new Date(),finished.id),'',false))return;
 stopTimer();session=null;
 location.hash='progress';progressView='skills';render();
 openModal('Sesi tersimpan',
 `<div class="completion"><h3>${E(l.title)}</h3><p>Hasil yang Anda catat: <strong>${labels[finished.rating]}</strong>.</p>`
 +`<p>${finished.rating==='independent'
   ?'Materi ini tidak akan ditawarkan ulang. Anda tetap bisa membukanya kapan saja dari Semua materi.'
   :'Materi ini akan muncul kembali sebagai bahan ulangan setelah dua hari, agar anak mengingatnya lebih lama.'}</p>`
 +`<div class="form-actions"><button class="button secondary" data-action="go-home">Lihat materi besok</button>`
 +`<button class="button primary" data-action="close-dialog">Lihat hasil anak ${icon('arrow')}</button></div></div>`);
}

/* ---------- cetak dan cadangan ---------- */
function downloadFile(name,content,type){
 const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=name;document.body.append(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),3000);
}
function exportData(){
 downloadFile(`belajar-anak-cadangan-${C.dateKey()}.json`,JSON.stringify(state,null,2),'application/json');
 toast('Cadangan keluarga siap diunduh.');
}
function printDocument(title,body){
 const root=document.querySelector('#print-root');
 root.className='';
 root.innerHTML=`<div class="print-page"><header><img src="assets/favicon.svg" width="34" height="34" alt=""><span><strong>belajaranak</strong><small>WORKSHEET SIAP PAKAI DI RUMAH</small></span></header>`
 +`<h1>${title}</h1><p class="print-meta">${E(child().name)} · ${C.levelName(child().level)} · ${fmt(C.dateKey())}</p>${body}`
 +`<footer>Belajar Anak · Catatan pengamatan orang tua, bukan hasil tes.</footer></div>`;
 window.print();
}
let printBusy=false,printOriginalTitle='';
function prepareWorksheetPrint(id,kind='child'){
 const l=lesson(id);if(!l)return;
 const includeAnswers=Boolean(document.querySelector('#print-child-answers')?.checked),root=document.querySelector('#print-root');
 root.className='worksheet-print-root'+(includeAnswers?' include-child-answers':'');
 root.innerHTML=(kind!=='parent'?BAWorksheets.render(id,{name:child().name,variant:child().worksheetInk,answers:includeAnswers?(child().worksheets[id]||{}):{},includeAnswers}):'')
  +(kind!=='child'?parentSheet(l):'');
 return root;
}
async function printWorksheet(id,kind='child'){
 if(printBusy)return;
 printBusy=true;
 const root=prepareWorksheetPrint(id,kind);
 if(!root){printBusy=false;return;}
 printOriginalTitle=document.title;
 try{
  await Promise.all([...root.querySelectorAll('img')].map(img=>img.decode()));
  await document.fonts.ready;
  document.title='Belajar Anak - '+lesson(id).title+' - '+(kind==='parent'?'Panduan':kind==='pack'?'Paket sesi':'Worksheet');
  window.print();
 }catch(err){toast('Gambar cetak belum siap. Tunggu sebentar, lalu coba lagi.');}
 finally{printBusy=false;document.title=printOriginalTitle;}
}
window.addEventListener('beforeprint',()=>{
 if(printBusy)return;
 const [route,id]=location.hash.slice(1).split('/');
 if(['lesson','work'].includes(route)&&lesson(id))prepareWorksheetPrint(id);
});
function printPlan(){
 const c=child();
 if(!c.plan)return;
 printDocument(`Paket ${c.plan.days.length} hari ${C.levelName(c.level)}`,
 `<p>Mulai ${fmt(c.plan.start)}. Urutan boleh disesuaikan dengan hari keluarga.</p>`
 +`<table><thead><tr><th>Hari</th><th>Materi</th><th>Harapan hasil</th><th>Selesai</th></tr></thead><tbody>`
 +`${c.plan.days.map((entry,i)=>{const l=lesson(entry.lessonId);
   return `<tr><td>${i+1}</td><td>${E(l.title)}<br>${E(topic(l.topic).name)}${entry.kind==='review'?' · ulang':''}</td><td>${E(l.outcome||l.goal)}</td><td>______</td></tr>`;}).join('')}`
 +`</tbody></table>`);
}
function printReport(){
 const c=child();
 printDocument('Ringkasan hasil '+E(c.name),
 `<p>${C.completed(c).size} dari ${levelLessons().length} materi ${C.levelName(c.level)} dikerjakan dalam ${c.sessions.length} sesi.</p>`
 +`<p>Ringkasan pengamatan orang tua. Bukan asesmen diagnostik atau tes kesiapan sekolah.</p>`
 +`<table><thead><tr><th>Bidang</th><th>Dikerjakan</th><th>Bisa sendiri</th></tr></thead><tbody>`
 +`${topics.map(t=>{const p=C.topicProgress(c,t.id,lessons);return `<tr><td>${t.name}</td><td>${p.done} / ${p.total}</td><td>${p.independent}</td></tr>`;}).join('')}</tbody></table>`
 +`<h2>Catatan sesi terbaru</h2>`
 +`${c.sessions.length?[...c.sessions].reverse().slice(0,20).map(s=>`<div class="print-session"><h3>${E(lesson(s.lessonId).title)}</h3><p>${fmt(s.date)} · ${labels[s.rating]}</p>${s.note?`<p>${E(s.note)}</p>`:''}</div>`).join(''):'<p>Belum ada sesi yang dicatat.</p>'}`);
}

/* ---------- worksheet: simpan jawaban ---------- */
function saveWorksheetAnswer(id,key,value){
 if(!lesson(id)||!/^f\d{1,3}$/.test(key))return false;
 return change((_,c)=>{c.worksheets??={};c.worksheets[id]??={};c.worksheets[id][key]=String(value).slice(0,80);},'',false);
}
document.addEventListener('input',event=>{
 const el=event.target;
 if(el.dataset.workAnswer){
  const ok=saveWorksheetAnswer(el.dataset.lesson,el.dataset.workAnswer,el.value);
  const status=document.querySelector('.worksheet-save-status');
  if(status)status.textContent=ok?'Jawaban tersimpan.':'Jawaban belum tersimpan. Periksa penyimpanan perangkat.';
 }
});
document.addEventListener('click',event=>{
 const el=event.target.closest('[data-work-choice]');
 if(!el)return;
 const key=el.dataset.workChoice,id=el.dataset.lesson;
 const current=(child().worksheets[id]?.[key]||'').split(',').filter(Boolean),value=el.dataset.choice;
 const next=el.dataset.workMulti==='true'
  ?(current.includes(value)?current.filter(x=>x!==value):[...current,value])
  :current.includes(value)?[]:[value];
 if(saveWorksheetAnswer(id,key,next.join(','))){
  for(const b of document.querySelectorAll('[data-work-choice="'+key+'"]')){
   const chosen=next.includes(b.dataset.choice);
   b.classList.toggle('chosen',chosen);b.setAttribute('aria-pressed',String(chosen));
  }
  const status=document.querySelector('.worksheet-save-status');
  if(status)status.textContent='Pilihan tersimpan.';
 }
});

/* ---------- aksi ---------- */
let pendingRestore=null;
document.addEventListener('click',event=>{
 if(event.target.closest('.skip-link')){event.preventDefault();document.getElementById('main')?.focus();return;}
 const el=event.target.closest('[data-action]');
 if(!el)return;
 const action=el.dataset.action,id=el.dataset.id;
 switch(action){
 case 'close-dialog':closeModal();break;
 case 'children':childrenModal();break;
 case 'switch-child':
  if(!state.children.some(c=>c.id===id))break;
  if(session)saveDraft();
  stopTimer();session=null;
  if(change(s=>s.activeChild=id,'Profil anak diganti.')){closeModal();if(location.hash.startsWith('#work'))location.hash='home';}
  break;
 case 'add-child':if(state.children.length<3)childModal();break;
 case 'edit-child':childModal(id);break;
 case 'remove-child':
  openModal('Hapus profil ini?',`<p>Profil <strong>${E(state.children.find(c=>c.id===id)?.name)}</strong>, paket 30 harinya, dan seluruh catatan hasilnya akan dihapus dari perangkat ini.</p>`
  +`<div class="form-actions"><button class="button secondary" data-action="close-dialog">Batal</button>`
  +`<button class="button danger" data-action="confirm-remove-child" data-id="${id}">Hapus profil</button></div>`);
  break;
 case 'confirm-remove-child':
  if(state.children.length>1&&change(s=>{s.children=s.children.filter(c=>c.id!==id);if(s.activeChild===id)s.activeChild=s.children[0].id;},'Profil dihapus.'))closeModal();
  break;
 case 'account':accountModal();break;
 case 'guide':guideModal(id);break;
 case 'read-guide':
  if(guides.some(g=>g.id===id)&&change(s=>{if(!s.guidesRead.includes(id))s.guidesRead.push(id);},'Panduan ditandai sudah dibaca.'))closeModal();
  break;
 case 'help':helpModal();break;
 case 'topic':libraryTopic=id;location.hash=id==='all'?'library':'library/'+id;render();break;
 case 'reset-search':libraryQuery='';libraryFilter='all';libraryTopic='all';location.hash='library';render();break;
 case 'go-library':closeModal();location.hash='library';break;
 case 'go-home':closeModal();location.hash='home';break;
 case 'start-session':startSession(id);break;
 case 'replace-session':startSession(id,true);break;
 case 'resume-draft':if(child().draft)startSession(child().draft.lessonId,true);break;
 case 'exit-session':
  if(session&&saveDraft()){const target=session.lessonId;stopTimer();location.hash='lesson/'+target;toast('Sesi tersimpan. Lanjutkan kapan saja.');}
  break;
 case 'jump':document.getElementById(el.dataset.target)?.scrollIntoView({behavior:'smooth',block:'start'});break;
 case 'toggle-timer':if(timerPaused)startTimer();else{stopTimer();saveDraft();}renderKeepingScroll();break;
 case 'answer':
  if(session){
   const i=Number(el.dataset.question);
   while(session.answers.length<i)session.answers.push(null);
   session.answers[i]=Number(el.dataset.answer);
   saveDraft();renderKeepingScroll();
  }
  break;
 case 'clear-answer':
  if(session){session.answers[Number(el.dataset.question)]=null;saveDraft();renderKeepingScroll();}
  break;
 case 'complete-session':completeSession();break;
 case 'speak':{
  if(!('speechSynthesis' in window)){toast('Pelafalan otomatis belum tersedia di browser ini. Contoh ungkapan tetap dapat Anda bacakan.');break;}
  const name=child().name;
  const lines={
   'sd1-english-1':'I see a cat. I see a dog. I see a bird. I see a fish. I see a rabbit. I see a snail.',
   'sd1-english-2':'Head. Eye. Nose. Mouth. Hand. Foot. Touch your nose.',
   'english-1':`Hello. My name is ${name}. Goodbye.`,
   'english-2':'Red. Blue. Yellow. Find something blue.',
   'english-3':'Stand up. Sit down. Clap your hands.',
   'english-4':'One. Two. Three. Four. Five.'};
  if(!lines[id]){toast('Contoh pelafalan untuk materi ini belum tersedia.');break;}
  const speech=new SpeechSynthesisUtterance(lines[id]);
  speech.lang='en-US';speech.rate=.75;
  speech.onerror=()=>toast('Pelafalan belum tersedia. Silakan bacakan contoh ungkapannya.');
  speechSynthesis.cancel();speechSynthesis.speak(speech);
  break;}
 case 'progress-tab':progressView=id;if(location.hash!=='#progress')location.hash='progress';render();break;
 case 'edit-session':editSessionModal(id);break;
 case 'restart-plan':
  openModal('Mulai ulang paket 30 hari?',`<p>Hari 1 akan dihitung dari hari ini. Catatan hasil dan jawaban worksheet tidak terhapus.</p>`
  +`<div class="form-actions"><button class="button secondary" data-action="close-dialog">Batal</button>`
  +`<button class="button primary" data-action="confirm-restart-plan">Mulai ulang dari hari ini</button></div>`);
  break;
 case 'confirm-restart-plan':
  if(change((_,c)=>{c.plan=C.buildPlan(c.level,lessons);},'Paket dimulai ulang dari hari ini.'))closeModal();
  break;
 case 'print-worksheet':printWorksheet(id);break;
 case 'print-parent':printWorksheet(id,'parent');break;
 case 'print-session-pack':printWorksheet(id,'pack');break;
 case 'clear-worksheet':
  openModal('Kosongkan worksheet ini?',`<p>Jawaban pada worksheet ini akan dihapus. Catatan hasil dan worksheet lain tetap tersimpan.</p>`
  +`<div class="form-actions"><button class="button secondary" data-action="close-dialog">Batal</button>`
  +`<button class="button primary" data-action="confirm-clear-worksheet" data-id="${id}">Kosongkan jawaban</button></div>`);
  break;
 case 'confirm-clear-worksheet':
  if(change((_,c)=>{delete c.worksheets[id];},'Worksheet siap dikerjakan lagi.'))closeModal();
  break;
 case 'print-plan':printPlan();break;
 case 'print-report':printReport();break;
 case 'export-data':exportData();break;
 case 'import-data':document.querySelector('#backup-input')?.click();break;
 case 'confirm-restore':
  if(pendingRestore){
   try{
    localStorage.setItem(C.KEY,JSON.stringify(pendingRestore));
    state=pendingRestore;pendingRestore=null;storageIssue='';
    stopTimer();session=null;closeModal();
    location.hash='settings';render();
    toast('Cadangan keluarga berhasil dipulihkan.');
   }catch{toast('Cadangan belum dipulihkan. Ruang penyimpanan browser tidak tersedia.');}
  }
  break;
 case 'reset-data':
  openModal('Mulai lagi di perangkat ini?',`<p>Seluruh profil, paket, catatan, dan kode belajar pada browser ini akan dihapus. Anda perlu memasukkan kode belajar lagi. Pastikan cadangan sudah disimpan bila masih diperlukan.</p>`
  +`<div class="form-actions"><button class="button secondary" data-action="close-dialog">Batal</button>`
  +`<button class="button danger" data-action="confirm-reset">Hapus & mulai lagi</button></div>`);
  break;
 case 'confirm-reset':
  try{
   const fresh=C.initialState();
   localStorage.setItem(C.KEY,JSON.stringify(fresh));
   state=fresh;storageIssue='';onboardNote='';
   stopTimer();session=null;closeModal();
   location.hash='welcome';render();
   toast('Data perangkat dihapus.');
  }catch{toast('Data belum dapat diubah. Periksa izin penyimpanan browser.');}
  break;
 }
});
document.addEventListener('submit',event=>{
 const form=event.target;
 if(!form.id.endsWith('-form'))return;
 event.preventDefault();
 if(form.id==='onboard-form'){if(form.reportValidity())startWorkspace(form);return;}
 if(!form.reportValidity())return;
 const fd=new FormData(form),value=name=>String(fd.get(name)||'').trim();
 let ok=false;
 switch(form.id){
 case 'child-form':{
  const name=value('name'),dob=value('dob');
  if(!name||C.age(dob)<0||C.age(dob)>18){toast('Isi nama dan tanggal lahir yang valid.');return;}
  const id=form.dataset.id;
  if(!id&&state.children.length>=3)return;
  ok=change(s=>{
   if(id){
    const c=s.children.find(c=>c.id===id);
    if(s.account.name==='Orang tua '+c.name)s.account.name='Orang tua '+name;
    Object.assign(c,{name,dob,avatar:value('avatar')});
   }else{
    const c=C.newChild(name,dob,value('avatar'),s.access.level,lessons);
    s.children.push(c);s.activeChild=c.id;
   }
  },'Profil anak tersimpan.');
  break;}
 case 'account-form':
  if(!value('name'))return;
  ok=change(s=>s.account={name:value('name'),email:value('email')},'Akun orang tua tersimpan.');
  break;
 case 'edit-session-form':
  ok=change((_,c)=>{const s=c.sessions.find(s=>s.id===form.dataset.id);if(s){s.rating=value('rating');s.note=value('note');}},'Catatan sesi diperbarui.');
  break;
 }
 if(ok)closeModal();
});
document.addEventListener('input',event=>{
 const el=event.target;
 if(el.id==='library-search'){libraryQuery=el.value;refreshLibraryResults();}
 if(el.id==='session-note'&&session){session.note=el.value;saveDraft();}
});
document.addEventListener('change',async event=>{
 const el=event.target;
 if(el.id==='library-search'){libraryQuery=el.value;refreshLibraryResults();}
 if(el.id==='library-filter'){libraryFilter=el.value;render();}
 if(el.dataset.prepared!==undefined&&session){
  session.prepared??=lesson(session.lessonId).materials.map(()=>false);
  session.prepared[Number(el.dataset.prepared)]=el.checked;
  saveDraft();
 }
 if(el.id==='worksheet-ink'&&change((_,c)=>c.worksheetInk=el.value,'',false))renderKeepingScroll();
 if(el.name==='rating'&&session){
  session.rating=el.value;saveDraft();
  document.querySelectorAll('.rating-card').forEach(card=>card.classList.toggle('selected',card.querySelector('input').checked));
 }
 if(el.id==='backup-input'){
  const file=el.files[0];
  if(!file)return;
  if(file.size>5000000){toast('Berkas cadangan terlalu besar. Maksimal 5 MB.');el.value='';return;}
  try{
   pendingRestore=C.validateState(JSON.parse(await file.text()),lessons);
   openModal('Pulihkan cadangan keluarga?',
   `<p>Cadangan berisi <strong>${pendingRestore.children.length} profil anak</strong> dan <strong>${pendingRestore.children.reduce((n,c)=>n+c.sessions.length,0)} catatan sesi</strong> untuk jenjang ${C.levelName(pendingRestore.access.level)}.</p>`
   +`<p>Data pada browser ini akan diganti dengan isi cadangan. Ekspor catatan saat ini terlebih dahulu jika masih diperlukan.</p>`
   +`<div class="form-actions"><button class="button secondary" data-action="close-dialog">Batal</button>`
   +`<button class="button primary" data-action="confirm-restore">Pulihkan cadangan</button></div>`);
  }catch(err){
   pendingRestore=null;
   toast(err instanceof SyntaxError?'Berkas bukan cadangan JSON yang valid.':err.message);
  }
  el.value='';
 }
});
dialog.addEventListener('click',event=>{
 if(event.target!==dialog)return;
 const rect=dialog.getBoundingClientRect();
 if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeModal();
});
dialog.addEventListener('close',()=>{if(dialogReturn?.isConnected)dialogReturn.focus();});
window.addEventListener('hashchange',()=>{
 const parts=location.hash.slice(1).split('/');
 if(parts[0]==='library')libraryTopic=topics.some(t=>t.id===parts[1])?parts[1]:'all';
 render();window.scrollTo(0,0);
 document.querySelector('#main')?.focus({preventScroll:true});
});
window.addEventListener('beforeunload',()=>{saveDraft();});
document.addEventListener('visibilitychange',()=>{
 if(document.hidden&&session){stopTimer();saveDraft();}
 else if(session)renderKeepingScroll();
});
window.addEventListener('storage',event=>{
 if(event.key!==C.KEY)return;
 if(session){
  stopTimer();
  storageIssue='Data diperbarui pada tab lain. Muat ulang halaman sebelum melanjutkan agar catatan tetap selaras.';
  toast(storageIssue);
  return;
 }
 try{
  state=event.newValue?C.validateState(JSON.parse(event.newValue),lessons):C.initialState();
  storageIssue='';
  if(dialog.open)closeModal();
  render();
 }catch{toast('Perubahan dari tab lain belum dapat dibaca.');}
});
render();
})();
