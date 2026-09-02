/* 3FS live-data bridge
   Set these values when you connect your real Supabase project.
   Until then the site safely uses localStorage for the trial.
*/
window.THREEFS_DB = {
  provider: 'supabase',
  url: '',
  anonKey: '',
  realtime: true
};

(function(){
  const KEY = '3fs_records_v2';
  function local(){ try{return JSON.parse(localStorage.getItem(KEY)||'{"enquiries":[],"payments":[],"projects":[],"calendar":[]}')}catch(e){return {enquiries:[],payments:[],projects:[],calendar:[]}} }
  function save(db){localStorage.setItem(KEY,JSON.stringify(db)); window.dispatchEvent(new CustomEvent('3fs:data-updated',{detail:db}));}
  window.threefsDB = {
    ready: ()=>!!(window.THREEFS_DB.url && window.THREEFS_DB.anonKey),
    status: ()=> window.THREEFS_DB.url && window.THREEFS_DB.anonKey ? 'Live database configured' : 'Trial mode — local browser storage',
    add: async(type,item)=>{const db=local(); db[type]=(db[type]||[]).concat([{...item,id:crypto.randomUUID?.()||String(Date.now()),createdAt:new Date().toISOString()}]); save(db); return db[type].at(-1)},
    all: (type)=>local()[type]||[],
    subscribe: (fn)=>{ const h=e=>fn(e.detail); window.addEventListener('3fs:data-updated',h); return ()=>window.removeEventListener('3fs:data-updated',h); }
  };
})();
