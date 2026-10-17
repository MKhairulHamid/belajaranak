(function(global){
'use strict';
const KEY='belajaranak:v2';
const PLAN_DAYS=30;
const dateKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const parseDate=(key)=>new Date(`${key}T12:00:00`);
const addDays=(key,n)=>{const d=parseDate(key);d.setDate(d.getDate()+n);return dateKey(d);};
const daysBetween=(from,to)=>Math.round((parseDate(to)-parseDate(from))/86400000);
const uid=()=>global.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const age=(dob,now=new Date())=>{const d=parseDate(dob);let a=now.getFullYear()-d.getFullYear();if(now.getMonth()<d.getMonth()||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()))a--;return a;};

/* Satu kode belajar membuka satu jenjang. Paket dijual per usia, jadi jenjang
   tidak dapat diganti dari dalam aplikasi. */
const LEVELS=['tkb','sd1'];
const levelName=level=>level==='sd1'?'Kelas 1 SD':'TK B';
const levelAges=level=>level==='sd1'?'7 tahun ke atas':'5–6 tahun';
const levelFromAge=years=>Number(years)>=7?'sd1':'tkb';
const CODE_PATTERN=/^(TKB|SD1)-?(\d{4})$/i;
function parseCode(input){
 const match=CODE_PATTERN.exec(String(input??'').trim());
 if(!match)return null;
 return {level:match[1].toLowerCase(),serial:match[2],code:`${match[1].toUpperCase()}-${match[2]}`};
}

/* Paket 30 hari: orang tua tidak perlu menyusun rencana sendiri. Urutan dibuat
   bergilir antar bidang agar satu minggu menyentuh banyak kemampuan. Bila materi
   satu jenjang kurang dari 30, sisa hari dipakai mengulang materi awal. */
function buildPlan(level,lessons,start=dateKey()){
 const pool=lessons.filter(l=>l.level===level);
 const byTopic=new Map();
 for(const l of [...pool].sort((a,b)=>a.order-b.order)){
  if(!byTopic.has(l.topic))byTopic.set(l.topic,[]);
  byTopic.get(l.topic).push(l.id);
 }
 const queues=[...byTopic.values()],sequence=[];
 for(let round=0;sequence.length<pool.length&&round<=pool.length;round++)
  for(const queue of queues)if(queue[round])sequence.push(queue[round]);
 const days=[];
 for(let i=0;i<PLAN_DAYS;i++){
  if(!sequence.length)break;
  if(i<sequence.length)days.push({lessonId:sequence[i],kind:'new'});
  else days.push({lessonId:sequence[(i-sequence.length)%sequence.length],kind:'review'});
 }
 return {start,days};
}
function planDayNumber(child,date=dateKey()){
 if(!child.plan)return 1;
 return Math.min(PLAN_DAYS,Math.max(1,daysBetween(child.plan.start,date)+1));
}
function planEntry(child,day=planDayNumber(child)){
 if(!child.plan)return null;
 return child.plan.days[Math.min(child.plan.days.length,Math.max(1,day))-1]||null;
}
function planProgress(child){
 const done=completed(child);
 const lessonIds=new Set((child.plan?.days||[]).map(d=>d.lessonId));
 const finished=[...lessonIds].filter(id=>done.has(id)).length;
 return {total:lessonIds.size,done:finished,percent:lessonIds.size?Math.round(finished/lessonIds.size*100):0};
}

function newChild(name='Aira',dob='2020-03-14',avatar='bunny',level='tkb',lessons=[]){
 const plan=lessons.length?buildPlan(level,lessons):null;
 return {id:uid(),name,dob,avatar,level,worksheets:{},worksheetInk:'color',sessions:[],draft:null,
  plan:plan&&plan.days.length?plan:null};
}
function initialState(){
 return {version:2,onboarded:false,activeChild:'',children:[],account:{name:'',email:''},
  access:{code:'',level:'',activatedAt:''},preferences:{reminders:true},guidesRead:[]};
}
const activeChild=s=>s.children.find(c=>c.id===s.activeChild)||s.children[0];

function latest(child,id){return child.sessions.filter(s=>s.lessonId===id).sort((a,b)=>b.at.localeCompare(a.at))[0];}
function completed(child){return new Set(child.sessions.map(s=>s.lessonId));}
function topicProgress(child,topicId,lessons){
 const ids=lessons.filter(l=>l.topic===topicId&&l.level===child.level).map(l=>l.id);
 const done=ids.filter(id=>latest(child,id));
 const independent=done.filter(id=>latest(child,id).rating==='independent');
 return {total:ids.length,done:done.length,independent:independent.length,
  percent:ids.length?Math.round(done.length/ids.length*100):0};
}
/* Materi yang belum teramati mandiri ditawarkan ulang setelah dua hari. */
function reviewDue(child,lessons,today=dateKey()){
 return lessons.filter(l=>{
  if(l.level!==child.level)return false;
  const s=latest(child,l.id);
  return Boolean(s)&&s.rating!=='independent'&&daysBetween(s.date,today)>=2;
 });
}
function recordSession(child,lessonId,rating,note='',seconds=0,now=new Date(),id=uid()){
 if(!['trying','supported','independent'].includes(rating))throw new Error('Pilih hasil pengamatan terlebih dahulu.');
 if(child.sessions.some(s=>s.id===id))return child;
 child.sessions.push({id,lessonId,rating,note:String(note).trim().slice(0,1500),
  seconds:Math.max(0,Math.round(seconds)),date:dateKey(now),at:now.toISOString()});
 child.draft=null;
 return child;
}

function validateState(input,lessons){
 const fail=(reason='Format cadangan tidak valid. Gunakan berkas cadangan dari Belajar Anak.')=>{throw new Error(reason);};
 if(!input||input.version!==2||!Array.isArray(input.children)||input.children.length>3)fail();
 const text=(x,n=100)=>typeof x==='string'&&x.length<=n;
 const validDate=x=>text(x,10)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!isNaN(parseDate(x))&&dateKey(parseDate(x))===x;
 const ids=new Set(lessons.map(l=>l.id));
 const validId=x=>text(x,80)&&/^[\w-]+$/.test(x);
 if(typeof input.onboarded!=='boolean'||!text(input.account?.name,60)||!text(input.account?.email,120))fail();
 if(typeof input.preferences?.reminders!=='boolean')fail();
 if(!Array.isArray(input.guidesRead)||input.guidesRead.some(x=>!['listen','mistakes','routine'].includes(x)))fail();
 const access=input.access||{};
 if(!text(access.code,16)||!(access.level===''||LEVELS.includes(access.level)))fail();
 if(!(access.activatedAt===''||validDate(access.activatedAt)))fail();
 if(access.code&&!parseCode(access.code))fail();
 if(input.onboarded&&(!access.level||!input.children.length))fail();
 const clean={version:2,onboarded:input.onboarded,activeChild:input.activeChild,children:[],
  account:{name:input.account.name,email:input.account.email},
  access:{code:access.code,level:access.level,activatedAt:access.activatedAt},
  preferences:{reminders:input.preferences.reminders},guidesRead:[...new Set(input.guidesRead)]};
 for(const c of input.children){
  if(!validId(c.id)||!text(c.name,32)||!c.name.trim()||!validDate(c.dob)||c.dob>dateKey()||age(c.dob)>18)fail();
  if(!['bunny','bear','fox','cat','frog'].includes(c.avatar)||!LEVELS.includes(c.level))fail();
  if(access.level&&c.level!==access.level)fail('Jenjang profil tidak sesuai kode belajar pada cadangan.');
  if(!Array.isArray(c.sessions)||c.sessions.length>3000)fail();
  if(!['color','outline'].includes(c.worksheetInk??'color'))fail();
  const worksheets={};
  if(c.worksheets!==undefined){
   if(!c.worksheets||typeof c.worksheets!=='object'||Array.isArray(c.worksheets))fail();
   if(Object.keys(c.worksheets).length>lessons.length)fail();
   for(const [id,answers] of Object.entries(c.worksheets)){
    if(!ids.has(id)||!answers||typeof answers!=='object'||Array.isArray(answers))fail();
    if(Object.keys(answers).length>200)fail();
    worksheets[id]={};
    for(const [key,value] of Object.entries(answers)){
     if(!/^f\d{1,3}$/.test(key)||!text(value,80))fail();
     worksheets[id][key]=value;
    }
   }
  }
  const sessions=c.sessions.map(s=>{
   if(!validId(s.id)||!ids.has(s.lessonId)||!['trying','supported','independent'].includes(s.rating))fail();
   if(!text(s.note,1500)||!validDate(s.date)||!text(s.at,30)||isNaN(new Date(s.at)))fail();
   if(!Number.isFinite(s.seconds)||s.seconds<0||s.seconds>86400)fail();
   return {id:s.id,lessonId:s.lessonId,rating:s.rating,note:s.note,seconds:s.seconds,date:s.date,at:s.at};
  });
  if(new Set(sessions.map(s=>s.id)).size!==sessions.length)fail();
  let plan=null;
  if(c.plan){
   if(!validDate(c.plan.start)||!Array.isArray(c.plan.days)||!c.plan.days.length||c.plan.days.length>PLAN_DAYS)fail();
   plan={start:c.plan.start,days:c.plan.days.map(d=>{
    if(!d||!ids.has(d.lessonId)||!['new','review'].includes(d.kind))fail();
    return {lessonId:d.lessonId,kind:d.kind};
   })};
  }
  let draft=null;
  if(c.draft){
   const d=c.draft,l=lessons.find(l=>l.id===d.lessonId);
   if(!validId(d.id)||!l||!Number.isFinite(d.seconds)||d.seconds<0||d.seconds>86400)fail();
   if(!Array.isArray(d.answers)||d.answers.length>l.questions.length)fail();
   d.answers.forEach((a,i)=>{if(a!==null&&(!Number.isInteger(a)||a<0||a>=l.questions[i].choices.length))fail();});
   if(!text(d.note,1500)||!['','trying','supported','independent'].includes(d.rating))fail();
   const prepared=d.prepared??l.materials.map(()=>false);
   if(!Array.isArray(prepared)||prepared.length!==l.materials.length||prepared.some(x=>typeof x!=='boolean'))fail();
   draft={id:d.id,lessonId:d.lessonId,seconds:d.seconds,answers:d.answers,note:d.note,rating:d.rating,prepared};
  }
  clean.children.push({id:c.id,name:c.name.trim(),dob:c.dob,avatar:c.avatar,level:c.level,
   worksheets,worksheetInk:c.worksheetInk??'color',sessions,plan,draft});
 }
 if(new Set(clean.children.map(c=>c.id)).size!==clean.children.length)fail();
 if(clean.children.length&&!clean.children.some(c=>c.id===clean.activeChild))fail();
 if(!clean.children.length&&clean.activeChild)fail();
 return clean;
}

const api={KEY,PLAN_DAYS,LEVELS,dateKey,parseDate,addDays,daysBetween,uid,escapeHtml,age,
 levelName,levelAges,levelFromAge,parseCode,buildPlan,planDayNumber,planEntry,planProgress,
 newChild,initialState,activeChild,latest,completed,topicProgress,reviewDue,recordSession,validateState};
global.BACore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
