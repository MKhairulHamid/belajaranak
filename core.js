(function(global){
'use strict';
const KEY='belajaranak:v1';
const dateKey=(date=new Date())=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
const parseDate=(key)=>new Date(`${key}T12:00:00`);
const addDays=(key,n)=>{const d=parseDate(key);d.setDate(d.getDate()+n);return dateKey(d);};
const weekStart=(date=new Date())=>{const d=new Date(date);d.setDate(d.getDate()-((d.getDay()+6)%7));return dateKey(d);};
const uid=()=>global.crypto?.randomUUID?.()||`id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
function newChild(name='Aira',dob='2020-03-14',avatar='bunny'){
 return {id:uid(),name,dob,avatar,focus:['math','bahasa','english'],style:'balanced',weeklyTarget:3,duration:20,days:[1,3,5],time:'16:00',pausedUntil:'',sessions:[],favorites:[],scheduleOverrides:{},journal:[],draft:null};
}
function initialState(){const child=newChild();return {version:1,activeChild:child.id,children:[child],account:{name:'Orang tua Aira',email:''},plan:{id:'lifetime',changedAt:dateKey()},preferences:{reminders:true},guidesRead:[]};}
const activeChild=s=>s.children.find(c=>c.id===s.activeChild)||s.children[0];
const escapeHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const age=(dob,now=new Date())=>{const d=parseDate(dob);let a=now.getFullYear()-d.getFullYear();if(now.getMonth()<d.getMonth()||(now.getMonth()===d.getMonth()&&now.getDate()<d.getDate()))a--;return a;};
function latest(child,id){return child.sessions.filter(s=>s.lessonId===id).sort((a,b)=>b.at.localeCompare(a.at))[0];}
const completed=child=>new Set(child.sessions.map(s=>s.lessonId));
function topicProgress(child,topicId,lessons){const ids=lessons.filter(l=>l.topic===topicId).map(l=>l.id);const done=ids.filter(id=>latest(child,id));const independent=done.filter(id=>latest(child,id).rating==='independent');return {total:ids.length,done:done.length,independent:independent.length,percent:Math.round(done.length/ids.length*100)||0};}
function weekSessions(child,date=new Date()){const start=weekStart(date),end=addDays(start,7);return child.sessions.filter(s=>s.date>=start&&s.date<end);}
function recommendations(child,lessons,today=dateKey()){
 const daysSince=s=>Math.floor((parseDate(today)-parseDate(s.date))/86400000);
 const due=lessons.filter(l=>{const s=latest(child,l.id);return s&&s.rating!=='independent'&&daysSince(s)>=2;});
 const fresh=lessons.filter(l=>!latest(child,l.id)).sort((a,b)=>a.order-b.order||((child.focus.includes(b.topic)?1:0)-(child.focus.includes(a.topic)?1:0))||lessons.indexOf(a)-lessons.indexOf(b));
 return [...due,...fresh,...lessons.filter(l=>!due.includes(l)&&!fresh.includes(l))];
}
function plannedLesson(child,date,lessons){if(child.scheduleOverrides[date])return lessons.find(l=>l.id===child.scheduleOverrides[date]);const upcoming=recommendations(child,lessons,dateKey());const start=weekStart(parseDate(date));let slot=0;for(let d=start;d<date;d=addDays(d,1)){if(child.days.includes(parseDate(d).getDay()))slot++;}return upcoming[slot%upcoming.length];}
function recordSession(child,lessonId,rating,note='',seconds=0,now=new Date(),id=uid()){
 if(!['trying','supported','independent'].includes(rating))throw new Error('Pilih hasil pengamatan terlebih dahulu.');
 if(child.sessions.some(s=>s.id===id))return child;
 child.sessions.push({id,lessonId,rating,note:String(note).trim().slice(0,1500),seconds:Math.max(0,Math.round(seconds)),date:dateKey(now),at:now.toISOString()});child.draft=null;return child;
}
function validateState(input,lessons,topics){
 const fail=()=>{throw new Error('Format cadangan tidak valid. Gunakan berkas cadangan dari Belajar Anak.');};
 if(!input||input.version!==1||!Array.isArray(input.children)||input.children.length<1||input.children.length>3)fail();
 const text=(x,n=100)=>typeof x==='string'&&x.length<=n;
 const validDate=x=>text(x,10)&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!isNaN(parseDate(x))&&dateKey(parseDate(x))===x;
 const ids=new Set(lessons.map(l=>l.id)),tids=new Set(topics.map(t=>t.id));
 const validId=x=>text(x,80)&&/^[\w-]+$/.test(x);
 const clean={version:1,activeChild:input.activeChild,children:[],account:input.account,plan:input.plan,preferences:input.preferences,guidesRead:input.guidesRead};
 if(!text(input.account?.name,60)||!text(input.account?.email,120)||!['lifetime','annual','monthly'].includes(input.plan?.id)||!validDate(input.plan.changedAt)||typeof input.preferences?.reminders!=='boolean'||!Array.isArray(input.guidesRead)||input.guidesRead.some(x=>!['listen','mistakes','routine'].includes(x)))fail();
 clean.account={name:input.account.name,email:input.account.email};clean.plan={id:input.plan.id,changedAt:input.plan.changedAt};clean.preferences={reminders:input.preferences.reminders};clean.guidesRead=[...new Set(input.guidesRead)];
 for(const c of input.children){
  if(!validId(c.id)||!text(c.name,32)||!c.name.trim()||!validDate(c.dob)||c.dob>dateKey()||age(c.dob)>18||!['bunny','bear','fox','cat','frog'].includes(c.avatar)||!Array.isArray(c.focus)||c.focus.length<1||c.focus.some(t=>!tids.has(t))||!['balanced','explore','structured'].includes(c.style)||![2,3,4,5,6,7].includes(c.weeklyTarget)||![10,15,20,30].includes(c.duration)||!Array.isArray(c.days)||!c.days.length||c.days.some(d=>!Number.isInteger(d)||d<0||d>6)||!text(c.time,5)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(c.time)||!(c.pausedUntil===''||validDate(c.pausedUntil)))fail();
  if(!Array.isArray(c.sessions)||c.sessions.length>3000||!Array.isArray(c.favorites)||c.favorites.some(id=>!ids.has(id))||!Array.isArray(c.journal)||c.journal.length>100||!c.scheduleOverrides||typeof c.scheduleOverrides!=='object'||Array.isArray(c.scheduleOverrides)||Object.keys(c.scheduleOverrides).length>730)fail();
  const sessions=c.sessions.map(s=>{if(!validId(s.id)||!ids.has(s.lessonId)||!['trying','supported','independent'].includes(s.rating)||!text(s.note,1500)||!validDate(s.date)||!text(s.at,30)||isNaN(new Date(s.at))||!Number.isFinite(s.seconds)||s.seconds<0||s.seconds>86400)fail();return {id:s.id,lessonId:s.lessonId,rating:s.rating,note:s.note,seconds:s.seconds,date:s.date,at:s.at};});
  if(new Set(sessions.map(s=>s.id)).size!==sessions.length)fail();
  const scheduleOverrides={};for(const [d,id] of Object.entries(c.scheduleOverrides)){if(!validDate(d)||!ids.has(id))fail();scheduleOverrides[d]=id;}
  const journal=c.journal.map(j=>{if(!validId(j.id)||!text(j.title,80)||!j.title.trim()||!text(j.note,1500)||!validDate(j.date)||!(j.image===''||(text(j.image,1100000)&&/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(j.image))))fail();return {id:j.id,title:j.title,note:j.note,date:j.date,image:j.image};});
  let draft=null;if(c.draft){const d=c.draft,l=lessons.find(l=>l.id===d.lessonId);if(!validId(d.id)||!l||!Number.isInteger(d.step)||d.step<0||d.step>3||!Number.isFinite(d.seconds)||d.seconds<0||d.seconds>86400||!Array.isArray(d.answers)||d.answers.length>l.questions.length||d.answers.some((a,i)=>a!==null&&(!Number.isInteger(a)||a<0||a>=l.questions[i].choices.length))||!text(d.note,1500)||!['','trying','supported','independent'].includes(d.rating))fail();draft={id:d.id,lessonId:d.lessonId,step:d.step,seconds:d.seconds,answers:d.answers,note:d.note,rating:d.rating};}
  clean.children.push({id:c.id,name:c.name.trim(),dob:c.dob,avatar:c.avatar,focus:[...new Set(c.focus)],style:c.style,weeklyTarget:c.weeklyTarget,duration:c.duration,days:[...new Set(c.days)].sort(),time:c.time,pausedUntil:c.pausedUntil,sessions,favorites:[...new Set(c.favorites)],journal,scheduleOverrides,draft});
 }
 if(new Set(clean.children.map(c=>c.id)).size!==clean.children.length||!clean.children.some(c=>c.id===clean.activeChild))fail();
 return clean;
}
const api={KEY,dateKey,parseDate,addDays,weekStart,uid,newChild,initialState,activeChild,escapeHtml,age,latest,completed,topicProgress,weekSessions,recommendations,plannedLesson,recordSession,validateState};
global.BACore=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
