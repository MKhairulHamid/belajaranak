import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
const require=createRequire(import.meta.url),C=require('../core.js'),D=require('../data.js');
const validate=s=>C.validateState(s,D.lessons);
const setup=(level='tkb',name='Aira',dob='2020-03-14')=>{
 const s=C.initialState();
 s.onboarded=true;
 s.account={name:'Orang tua '+name,email:''};
 s.access={code:level==='sd1'?'SD1-2026':'TKB-2026',level,activatedAt:C.dateKey()};
 const c=C.newChild(name,dob,'bunny',level,D.lessons);
 s.children=[c];s.activeChild=c.id;
 return s;
};

test('katalog mencakup delapan bidang dengan materi lengkap dan tanpa duplikat',()=>{
 assert.equal(D.topics.length,8);
 assert.equal(D.lessons.length,48);
 assert.equal(new Set(D.lessons.map(l=>l.id)).size,48);
 for(const t of D.topics){
  assert.equal(D.lessons.filter(l=>l.topic===t.id&&l.level==='tkb').length,4);
  assert.equal(D.lessons.filter(l=>l.topic===t.id&&l.level==='sd1').length,2);
 }
 for(const l of D.lessons){
  assert.ok(['tkb','sd1'].includes(l.level));
  assert.ok(l.goal.length>30);
  assert.ok(l.materials.length);
  assert.equal(l.steps.length,3);
  assert.equal(l.questions.length,2);
  for(const step of l.steps){assert.ok(step.body.length>35);assert.ok(step.say.length>15);}
 }
});

test('setiap materi punya manfaat dan harapan hasil untuk halaman pembuka',()=>{
 for(const l of D.lessons){
  assert.ok(l.benefit&&l.benefit.length>40,'manfaat kurang: '+l.id);
  assert.ok(l.outcome&&l.outcome.length>40,'harapan hasil kurang: '+l.id);
  assert.notEqual(l.benefit,l.outcome);
 }
});

test('soal valid dan jawaban benar tidak terkonsentrasi pada satu posisi',()=>{
 const tally={};
 for(const l of D.lessons)for(const q of l.questions){
  assert.ok(q.prompt.trim()&&q.explanation.trim());
  assert.ok(q.choices.length>=2);
  assert.equal(new Set(q.choices.map(c=>c.toLowerCase().trim())).size,q.choices.length,'pilihan ganda duplikat: '+l.id);
  assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<q.choices.length);
  tally[q.answer]=(tally[q.answer]||0)+1;
 }
 const total=Object.values(tally).reduce((a,b)=>a+b,0);
 for(const [index,count] of Object.entries(tally))
  assert.ok(count/total<0.45,`terlalu banyak jawaban di posisi ${index}: ${count} dari ${total}`);
});

test('tidak ada soal yang mengandaikan satu nama anak tertentu',()=>{
 for(const l of D.lessons)for(const q of l.questions)
  assert.ok(!/\bAira\b/.test(q.prompt+' '+q.explanation+' '+q.choices.join(' ')),'nama anak dipatok di '+l.id);
});

test('kode belajar menentukan satu jenjang dan menolak format lain',()=>{
 assert.deepEqual(C.parseCode('TKB-2026'),{level:'tkb',serial:'2026',code:'TKB-2026'});
 assert.deepEqual(C.parseCode('sd12026'),{level:'sd1',serial:'2026',code:'SD1-2026'});
 assert.equal(C.parseCode('tkb-12'),null);
 assert.equal(C.parseCode('SD2-2026'),null);
 assert.equal(C.parseCode(''),null);
 assert.equal(C.parseCode(null),null);
});

test('jenjang disarankan dari usia anak',()=>{
 assert.equal(C.levelFromAge(5),'tkb');
 assert.equal(C.levelFromAge(6),'tkb');
 assert.equal(C.levelFromAge(7),'sd1');
 assert.equal(C.levelFromAge(9),'sd1');
});

test('paket 30 hari tersusun bergilir antar bidang dan hanya memakai materi sejenjang',()=>{
 for(const level of ['tkb','sd1']){
  const plan=C.buildPlan(level,D.lessons,'2026-10-18');
  assert.equal(plan.days.length,C.PLAN_DAYS);
  assert.equal(plan.start,'2026-10-18');
  const first=plan.days.slice(0,8).map(d=>D.lessons.find(l=>l.id===d.lessonId).topic);
  assert.equal(new Set(first).size,8,'delapan hari pertama harus menyentuh delapan bidang');
  assert.ok(plan.days.every(d=>D.lessons.find(l=>l.id===d.lessonId).level===level));
  const fresh=plan.days.filter(d=>d.kind==='new').map(d=>d.lessonId);
  assert.equal(new Set(fresh).size,fresh.length,'hari baru tidak boleh mengulang materi');
  for(const entry of plan.days.filter(d=>d.kind==='review'))
   assert.ok(fresh.includes(entry.lessonId),'hari ulang harus memakai materi yang sudah muncul');
 }
});

test('jenjang dengan materi lebih sedikit tetap mendapat 30 hari lewat hari ulang',()=>{
 const sd1=C.buildPlan('sd1',D.lessons);
 assert.equal(sd1.days.filter(d=>d.kind==='new').length,16);
 assert.equal(sd1.days.filter(d=>d.kind==='review').length,14);
});

test('nomor hari paket dihitung dari tanggal mulai dan berhenti di hari terakhir',()=>{
 const c=C.newChild('Aira','2020-03-14','bunny','tkb',D.lessons);
 c.plan.start='2026-10-01';
 assert.equal(C.planDayNumber(c,'2026-10-01'),1);
 assert.equal(C.planDayNumber(c,'2026-10-10'),10);
 assert.equal(C.planDayNumber(c,'2027-01-01'),C.PLAN_DAYS);
 assert.equal(C.planDayNumber(c,'2026-09-20'),1);
 assert.equal(C.planEntry(c,1).lessonId,c.plan.days[0].lessonId);
});

test('kemajuan paket dihitung dari materi unik yang sudah dikerjakan',()=>{
 const s=setup(),c=C.activeChild(s);
 assert.equal(C.planProgress(c).done,0);
 const first=c.plan.days[0].lessonId;
 C.recordSession(c,first,'supported');
 C.recordSession(c,first,'independent');
 assert.equal(C.planProgress(c).done,1);
 assert.equal(C.planProgress(c).total,new Set(c.plan.days.map(d=>d.lessonId)).size);
});

test('status awal belum onboarded dan tidak memuat profil palsu',()=>{
 const s=C.initialState();
 assert.equal(s.onboarded,false);
 assert.equal(s.children.length,0);
 assert.equal(s.access.level,'');
 assert.deepEqual(validate(JSON.parse(JSON.stringify(s))),s);
});

test('status setelah onboarding bertahan melalui JSON roundtrip',()=>{
 const back=validate(JSON.parse(JSON.stringify(setup())));
 assert.equal(back.access.code,'TKB-2026');
 assert.equal(back.children[0].level,'tkb');
 assert.equal(back.children[0].plan.days.length,C.PLAN_DAYS);
 assert.equal(back.children[0].sessions.length,0);
});

test('catatan dan jawaban worksheet terpisah antar profil anak',()=>{
 const s=setup(),first=C.activeChild(s),second=C.newChild('Bima','2020-05-01','bear','tkb',D.lessons);
 s.children.push(second);
 C.recordSession(first,'math-1','supported','Dengan balok',82);
 first.worksheets={'math-1':{f1:'3'}};
 s.activeChild=second.id;
 assert.equal(C.activeChild(s).sessions.length,0);
 assert.deepEqual(C.activeChild(s).worksheets,{});
 assert.equal(validate(JSON.parse(JSON.stringify(s))).children[0].sessions.length,1);
});

test('mengerjakan ulang tidak menggandakan hitungan materi selesai',()=>{
 const c=C.newChild('Aira','2020-03-14','bunny','tkb',D.lessons);
 C.recordSession(c,'math-1','trying');
 C.recordSession(c,'math-1','independent');
 assert.equal(c.sessions.length,2);
 assert.equal(C.completed(c).size,1);
 assert.equal(C.topicProgress(c,'math',D.lessons).done,1);
});

test('penyimpanan sesi idempoten untuk id draf yang sama',()=>{
 const c=C.newChild();
 C.recordSession(c,'math-1','trying','',1,new Date(),'fixed');
 C.recordSession(c,'math-1','trying','',1,new Date(),'fixed');
 assert.equal(c.sessions.length,1);
});

test('kemandirian ditentukan pengamatan terakhir, bukan jumlah sesi',()=>{
 const c=C.newChild('Aira','2020-03-14','bunny','tkb',D.lessons);
 C.recordSession(c,'math-1','independent','',1,new Date('2026-09-01T09:00:00Z'));
 C.recordSession(c,'math-1','supported','',1,new Date('2026-09-03T09:00:00Z'));
 const p=C.topicProgress(c,'math',D.lessons);
 assert.equal(p.done,1);
 assert.equal(p.independent,0);
 assert.equal(p.total,4);
});

test('kemajuan per bidang hanya menghitung materi jenjang anak',()=>{
 const tkb=C.newChild('A','2020-03-14','bunny','tkb',D.lessons);
 const sd1=C.newChild('B','2018-03-14','bear','sd1',D.lessons);
 assert.equal(C.topicProgress(tkb,'math',D.lessons).total,4);
 assert.equal(C.topicProgress(sd1,'math',D.lessons).total,2);
});

test('materi yang belum mandiri ditawarkan ulang setelah dua hari',()=>{
 const c=C.newChild('Aira','2020-03-14','bunny','tkb',D.lessons);
 C.recordSession(c,'social-1','supported','',1,new Date('2026-09-01T12:00:00'));
 assert.equal(C.reviewDue(c,D.lessons,'2026-09-02').length,0);
 assert.equal(C.reviewDue(c,D.lessons,'2026-09-03')[0].id,'social-1');
 C.recordSession(c,'social-2','independent','',1,new Date('2026-09-01T12:00:00'));
 assert.ok(!C.reviewDue(c,D.lessons,'2026-09-05').some(l=>l.id==='social-2'));
});

test('ulangan tidak mencampur jenjang lain',()=>{
 const c=C.newChild('B','2018-03-14','bear','sd1',D.lessons);
 C.recordSession(c,'math-1','supported','',1,new Date('2026-09-01T12:00:00'));
 assert.equal(C.reviewDue(c,D.lessons,'2026-09-05').length,0);
});

test('kunci kalender bertahan melewati batas bulan dan tahun',()=>{
 assert.equal(C.addDays('2026-12-31',1),'2027-01-01');
 assert.equal(C.addDays('2024-02-28',1),'2024-02-29');
 assert.equal(C.daysBetween('2026-12-28','2027-01-04'),7);
});

test('cadangan menolak materi tak dikenal, tanggal salah, dan profil ganda',()=>{
 let s=setup();
 s.children[0].sessions=[{id:'x',lessonId:'missing',rating:'trying',note:'',seconds:1,date:C.dateKey(),at:new Date().toISOString()}];
 assert.throws(()=>validate(s));
 s=setup();s.children[0].dob='2020-02-31';
 assert.throws(()=>validate(s));
 s=setup();s.children.push(structuredClone(s.children[0]));
 assert.throws(()=>validate(s));
 s=setup();C.recordSession(s.children[0],'math-1','trying');s.children[0].sessions[0].rating='passed';
 assert.throws(()=>validate(s));
});

test('cadangan menolak kode belajar palsu dan jenjang yang tidak cocok',()=>{
 let s=setup();s.access.code='HACK-1';
 assert.throws(()=>validate(s));
 s=setup();s.children[0].level='sd1';
 assert.throws(()=>validate(s),/Jenjang profil tidak sesuai/);
 s=setup();s.access.level='';
 assert.throws(()=>validate(s));
 s=setup();s.children[0].plan.days[2]={lessonId:'math-1',kind:'besok'};
 assert.throws(()=>validate(s));
});

test('draf sesi menyimpan jawaban, catatan, waktu, dan kesiapan bahan',()=>{
 const s=setup(),l=D.lessons.find(l=>l.id==='math-1');
 s.children[0].draft={id:'draft-test',lessonId:'math-1',seconds:31,answers:[null,1],note:'Ingin mengulang',rating:'',prepared:l.materials.map((_,i)=>i===0)};
 assert.deepEqual(validate(JSON.parse(JSON.stringify(s))).children[0].draft,s.children[0].draft);
});

test('draf lama tanpa kesiapan bahan mendapat nilai bawaan',()=>{
 const s=setup();
 s.children[0].draft={id:'draft-old',lessonId:'math-1',seconds:5,answers:[],note:'',rating:''};
 assert.deepEqual(validate(JSON.parse(JSON.stringify(s))).children[0].draft.prepared,[false,false,false]);
});

test('draf dengan jawaban di luar jangkauan pilihan ditolak',()=>{
 const s=setup();
 s.children[0].draft={id:'bad-draft',lessonId:'math-1',seconds:1,answers:[9],note:'',rating:'',prepared:[false,false,false]};
 assert.throws(()=>validate(s));
});

test('jawaban worksheet divalidasi per materi dan per kunci',()=>{
 let s=setup();s.children[0].worksheets={'math-1':{f1:'3',f12:'apel'}};
 assert.deepEqual(validate(s).children[0].worksheets,{'math-1':{f1:'3',f12:'apel'}});
 s=setup();s.children[0].worksheets={missing:{f1:'3'}};
 assert.throws(()=>validate(s));
 s=setup();s.children[0].worksheets={'math-1':{bad:'3'}};
 assert.throws(()=>validate(s));
 s=setup();s.children[0].worksheetInk='neon';
 assert.throws(()=>validate(s));
});

test('teks keluarga tetap inert saat ditampilkan',()=>{
 assert.equal(C.escapeHtml('<img src=x onerror="evil()">&'),'&lt;img src=x onerror=&quot;evil()&quot;&gt;&amp;');
});

test('setiap materi punya worksheet dengan kunci jawaban',()=>{
 const specs=require('../worksheets.js').specs;
 for(const l of D.lessons){
  assert.ok(specs[l.id],'worksheet hilang untuk '+l.id);
  assert.ok(specs[l.id].answers.length,'kunci jawaban hilang untuk '+l.id);
 }
});

test('halaman masuk memakai aset lokal relatif dan memuat seluruh modul',()=>{
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 for(const file of ['styles.css','worksheets.css','data.js','sd1-data.js','content.js','worksheets.js','core.js','app.js'])
  assert.ok(html.includes(`"${file}"`),'index.html belum memuat '+file);
 assert.ok(!/(?:src|href)="(?:https?:|\/)/.test(html));
});

test('fitur yang dihapus tidak lagi dirujuk aplikasi',()=>{
 const app=readFileSync(new URL('../app.js',import.meta.url),'utf8');
 for(const gone of ['journal','portfolio','scheduleOverrides','session-view','session-step','favorite'])
  assert.ok(!app.includes(gone),'app.js masih merujuk '+gone);
});
