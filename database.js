/* 3FS database bridge — local-first, Supabase-ready */
window.THREEFS_DB = window.THREEFS_DB || {provider:'supabase',url:'',anonKey:'',realtime:true};
(function(){
 const KEY='3fs_records_v4';
 const empty=()=>({enquiries:[],payments:[],projects:[],calendar:[],team:[]});
 function local(){try{return Object.assign(empty(),JSON.parse(localStorage.getItem(KEY)||'{}'));}catch(e){return empty();}}
 function save(db){localStorage.setItem(KEY,JSON.stringify(db));window.dispatchEvent(new CustomEvent('3fs:data-updated',{detail:db}));}
 async function remoteAdd(type,item){const c=window.THREEFS_DB;if(!c?.url||!c?.anonKey)return null;const url=c.url.replace(/\/$/,'')+'/rest/v1/'+encodeURIComponent(type);const r=await fetch(url,{method:'POST',headers:{apikey:c.anonKey,Authorization:'Bearer '+c.anonKey,'Content-Type':'application/json',Prefer:'return=representation'},body:JSON.stringify(item)});if(!r.ok)throw new Error('Supabase '+r.status);return (await r.json())[0]||item;}
 async function remoteRead(type){const c=window.THREEFS_DB;if(!c?.url||!c?.anonKey)return null;const url=c.url.replace(/\/$/,'')+'/rest/v1/'+encodeURIComponent(type)+'?select=*';const r=await fetch(url,{headers:{apikey:c.anonKey,Authorization:'Bearer '+c.anonKey}});if(!r.ok)throw new Error('Supabase '+r.status);return await r.json();}
 window.threefsDB={ready:()=>!!(window.THREEFS_DB?.url&&window.THREEFS_DB?.anonKey),status:()=>window.threefsDB.ready()?'Live Supabase database configured':'Local record mode — add Supabase URL + anon key in database.js for shared realtime data',add:async(type,item)=>{const record=Object.assign({},item,{id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),createdAt:new Date().toISOString()});const db=local();db[type]=(db[type]||[]).concat([record]);save(db);try{return await remoteAdd(type,record)||record}catch(e){console.warn(e);return record;}},all:type=>local()[type]||[],subscribe:fn=>{const h=e=>fn(e.detail);window.addEventListener('3fs:data-updated',h);return()=>window.removeEventListener('3fs:data-updated',h);},sync:async()=>{if(!window.threefsDB.ready())return;const db=local();for(const type of Object.keys(empty())){try{const rows=await remoteRead(type);if(Array.isArray(rows)){db[type]=rows;}}catch(e){console.warn('3FS sync',type,e)}}save(db);}};
 if(window.THREEFS_DB.realtime&&window.threefsDB.ready())setInterval(()=>window.threefsDB.sync(),15000);
})();
