const TOOLS=[
['image-to-pdf','📸','Image to PDF','scan','#ec4899'],['id-card-scan','🪪','ID Card Scan','scan','#06b6d4'],['extract-text','🔤','Extract Text','scan','#14b8a6'],['passport-photo','🧑‍💼','Passport Photo','scan','#8b5cf6'],['timestamp-photo','🕒','Timestamp','scan','#f59e0b'],['qr-scanner','🔍','QR Scanner','scan','#84cc16'],
['image-to-pdf','🖼️','Import Images','import','#3b82f6'],['merge-pdf','📁','Import Files','import','#6366f1'],
['pdf-to-image','🖼️','PDF to Images','convert','#ef4444'],['pdf-to-long-image','📜','PDF to Long Image','convert','#a855f7'],['pdf-to-word','📘','To Word','convert','#2563eb'],['excel-csv','📊','To Excel / CSV','convert','#22c55e'],['pdf-to-ppt','🎞️','To PPT','convert','#f97316'],['images-to-ppt','🖥️','Images to PPT','convert','#ea580c'],['word-to-text','📃','Word to Text','convert','#0ea5e9'],['convert-image','🔄','Convert Image','convert','#06b6d4'],
['signature-maker','✍️','Sign','edit','#3b82f6'],['edit-pdf','🖊️','Edit PDF','edit','#6366f1'],['add-watermark','💧','Add Watermark','edit','#0ea5e9'],['merge-pdf','📎','Merge Files','edit','#8b5cf6'],['split-pdf','✂️','Extract PDF Pages','edit','#10b981'],['organize-pdf','🗂️','Reorder Pages','edit','#f59e0b'],['lock-file','🔒','Lock','edit','#14b8a6'],['unlock-file','🔓','Unlock','edit','#0ea5e9'],['compress-image','🗜️','Compress Image','edit','#f97316'],['compress-pdf','📉','Compress PDF','edit','#fb923c'],
['qr-generator','🔳','QR Generator','util','#a3e635'],['emi-calculator','🏦','EMI Calculator','util','#eab308'],['age-calculator','🎂','Age Calculator','util','#f43f5e'],['word-counter','📝','Word Counter','util','#14b8a6']];
const link=(t,c)=>'<a class="'+(c||'ic')+'" href="'+t[0]+'.html" style="--c:'+t[4]+'"><i>'+t[1]+'</i>'+(c==='row'?'<b>'+t[2]+'</b><span>›</span>':'<span>'+t[2]+'</span>')+'</a>';
function setTheme(t){document.documentElement.dataset.theme=t;try{localStorage.theme=t}catch(e){}}
function toggleTheme(){setTheme(document.documentElement.dataset.theme==='light'?'dark':'light')}
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
async function doInstall(){if(dp){dp.prompt();await dp.userChoice;dp=null}else alert('To install: open your browser menu and tap “Add to Home screen”.')}
addEventListener('click',e=>{const a=e.target.closest('a.ic,a.row');if(!a)return;try{const s=a.getAttribute('href'),R=JSON.parse(localStorage.recent||'[]');localStorage.recent=JSON.stringify([s,...R.filter(x=>x!==s)].slice(0,6))}catch(x){}});
if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
