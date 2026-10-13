try{document.documentElement.dataset.theme=localStorage.theme||"dark"}catch(e){document.documentElement.dataset.theme="dark"}
const $=id=>document.getElementById(id);
const kb=n=>n>1048576?(n/1048576).toFixed(2)+' MB':Math.max(1,Math.round(n/1024))+' KB';
function li(ul,name){const l=document.createElement('li'),n=document.createElement('span'),s=document.createElement('span');n.className='nm';n.textContent=name;s.className='sz';l.append(n,s);ul.appendChild(l);return{l,s}}
function dlLink(b,name,label){const a=document.createElement('a');a.className='btn';a.textContent=label||'Download';a.href=URL.createObjectURL(b);a.download=name;return a}
function loadImg(f){return new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(f)})}
function toBlob(c,t,q){return new Promise(r=>c.toBlob(r,t,q))}
function orderList(ul,arr,again){ul.innerHTML='';arr.forEach((f,i)=>{const r=li(ul,(i+1)+'. '+f.name);r.s.textContent=kb(f.size);
[['↑',-1],['↓',1],['Remove',0]].forEach(([t,d])=>{const b=document.createElement('button');b.className='btn alt';b.textContent=t;
b.setAttribute('aria-label',(t==='Remove'?'Remove ':d<0?'Move up ':'Move down ')+f.name);
b.onclick=()=>{if(!d)arr.splice(i,1);else{const j=i+d;if(j<0||j>=arr.length)return;[arr[i],arr[j]]=[arr[j],arr[i]]}again()};r.l.appendChild(b)})})}
const EXT={'image/jpeg':'jpg','image/webp':'webp','image/png':'png'};
function imageTool(){
$('q').oninput=()=>$('qv').textContent=$('q').value;
$('f').onchange=async e=>{const ul=$('list');ul.innerHTML='';
for(const f of e.target.files){const r=li(ul,f.name);r.s.textContent='Working…';
try{const img=await loadImg(f);let w=img.naturalWidth,h=img.naturalHeight;const mw=parseInt($('maxw').value,10);
if(mw&&w>mw){h=Math.round(h*mw/w);w=mw}
const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d'),t=$('fmt').value;
if(t==='image/jpeg'){x.fillStyle='#fff';x.fillRect(0,0,w,h)}
x.drawImage(img,0,0,w,h);const b=await toBlob(c,t,$('q').value/100),p=Math.round((1-b.size/f.size)*100);
r.s.innerHTML=kb(f.size)+' → '+kb(b.size)+(p>0?' <span class="save">−'+p+'%</span>':'');
r.l.appendChild(dlLink(b,f.name.replace(/\.[^.]+$/,'')+'-new.'+EXT[t]))}
catch(err){r.s.textContent='Could not read this file.'}}}}
async function pdfjsLoad(buf){pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';return pdfjsLib.getDocument({data:buf.slice(0)}).promise}
async function pageCanvas(d,n,sc){const p=await d.getPage(n),v=p.getViewport({scale:sc}),c=document.createElement('canvas');c.width=v.width;c.height=v.height;await p.render({canvasContext:c.getContext('2d'),viewport:v}).promise;return c}
async function aesKey(pw,salt){const m=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveKey']);return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},m,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}

{const _c=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){if(!this.isConnected){this.style.display='none';document.body.appendChild(this);_c.call(this);setTimeout(()=>this.remove(),1500)}else _c.call(this)}}
(function(){
const H=document.querySelector('header'),P=document.querySelector('.panel');
if(H&&P&&H.querySelector('h1')){H.classList.add('bar2');const b=H.querySelector('.back');if(b){b.textContent='‹';b.setAttribute('aria-label','Back');if(b.getAttribute('href')==='index.html')b.href='tools.html'}const s=H.querySelector('.sub');if(s){s.className='hint';P.prepend(s)}}
function forward(inp,files){const dt=new DataTransfer();[...files].forEach(f=>dt.items.add(f));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}))}
function sheet(inp){const o=document.createElement('div');o.className='sht';o.innerHTML='<div><button data-c="1">📷 Take photo</button><button data-c="0">🖼️ Choose from gallery</button><button data-c="x">Cancel</button></div>';
o.onclick=e=>{const b=e.target.closest('button');if(e.target===o||(b&&b.dataset.c==='x')){o.remove();return}if(!b)return;const t=document.createElement('input');t.type='file';t.accept='image/*';if(inp.multiple)t.multiple=true;if(b.dataset.c==='1')t.setAttribute('capture','environment');t.onchange=()=>{if(t.files.length)forward(inp,t.files)};o.remove();t.click()};document.body.appendChild(o)}
document.querySelectorAll('label.drop').forEach(l=>{const inp=l.querySelector('input[type=file]');if(!inp)return;
l.addEventListener('click',e=>{if(e.target===inp||!/image/.test(inp.accept))return;e.preventDefault();sheet(inp)});
inp.addEventListener('change',()=>{const n=inp.files.length;if(!n)return;l.classList.add('has');let s=l.querySelector('.fn');if(!s){s=document.createElement('span');s.className='fn';l.appendChild(s)}s.textContent=n>1?n+' files selected':inp.files[0].name})})
})();
(function(){
const T={'compress-image':['🗜️','Compress Image','#f97316'],'convert-image':['🔄','Convert Image','#06b6d4'],'add-watermark':['💧','Add Watermark','#0ea5e9'],'merge-pdf':['📎','Merge PDF','#8b5cf6'],'split-pdf':['✂️','Split PDF','#10b981'],'image-to-pdf':['📸','Image to PDF','#ec4899'],'edit-pdf':['🖊️','Edit PDF','#6366f1'],'organize-pdf':['🗂️','Organize Pages','#f59e0b'],'pdf-to-image':['🖼️','PDF to Image','#ef4444'],'pdf-to-long-image':['📜','PDF to Long Image','#a855f7'],'compress-pdf':['📉','Compress PDF','#fb923c'],'lock-file':['🔒','Lock File','#14b8a6'],'unlock-file':['🔓','Unlock File','#0ea5e9'],'pdf-to-word':['📘','PDF to Word','#2563eb'],'pdf-to-ppt':['🎞️','PDF to PPT','#f97316'],'images-to-ppt':['🖥️','Images to PPT','#ea580c'],'excel-csv':['📊','Excel ↔ CSV','#22c55e'],'word-to-text':['📃','Word to Text','#0ea5e9'],'extract-text':['🔤','Extract Text','#14b8a6'],'id-card-scan':['🪪','ID Card Scan','#06b6d4'],'passport-photo':['🧑‍💼','Passport Photo','#8b5cf6'],'timestamp-photo':['🕒','Timestamp Photo','#f59e0b'],'signature-maker':['✍️','Signature Maker','#3b82f6'],'qr-generator':['🔳','QR Generator','#84cc16'],'qr-scanner':['🔍','QR Scanner','#84cc16'],'word-counter':['📝','Word Counter','#14b8a6']};
const R={'compress-image':'convert-image,image-to-pdf,add-watermark','convert-image':'compress-image,image-to-pdf,add-watermark','merge-pdf':'compress-pdf,split-pdf,lock-file','split-pdf':'merge-pdf,organize-pdf,compress-pdf','image-to-pdf':'compress-pdf,lock-file,merge-pdf','edit-pdf':'compress-pdf,lock-file,organize-pdf','organize-pdf':'merge-pdf,compress-pdf,lock-file','pdf-to-image':'pdf-to-long-image,compress-image,convert-image','pdf-to-long-image':'pdf-to-image,compress-image,image-to-pdf','compress-pdf':'merge-pdf,lock-file,split-pdf','lock-file':'unlock-file,compress-pdf,merge-pdf','unlock-file':'lock-file,edit-pdf,compress-pdf','pdf-to-word':'pdf-to-ppt,excel-csv,compress-pdf','pdf-to-ppt':'pdf-to-word,pdf-to-image,compress-pdf','images-to-ppt':'image-to-pdf,compress-image,pdf-to-ppt','excel-csv':'word-to-text,pdf-to-word,lock-file','word-to-text':'pdf-to-word,extract-text,word-counter','extract-text':'word-counter,pdf-to-word,qr-scanner','id-card-scan':'image-to-pdf,compress-pdf,lock-file','passport-photo':'compress-image,convert-image,image-to-pdf','timestamp-photo':'add-watermark,compress-image,convert-image','add-watermark':'timestamp-photo,compress-image,image-to-pdf','signature-maker':'edit-pdf,image-to-pdf,lock-file','qr-generator':'qr-scanner,add-watermark,image-to-pdf'};
const slug=location.pathname.split('/').pop().replace('.html',''),P=document.querySelector('.panel'),me=T[slug];
if(me){const s=document.documentElement.style;s.setProperty('--acc',me[2]);s.setProperty('--at','color-mix(in srgb,'+me[2]+' 72%,var(--ink))')}
if(P){const h=P.querySelector('.hint'),t='<div class="trust">🔒 Private: your files never leave this device</div>';h?h.insertAdjacentHTML('afterend',t):P.insertAdjacentHTML('afterbegin',t)}
const pb=document.createElement('div');pb.id='pb';pb.innerHTML='<i></i>';document.body.appendChild(pb);let pt;
const on=()=>{pb.classList.add('on');clearTimeout(pt);pt=setTimeout(off,15000)},off=()=>pb.classList.remove('on');
const AUTO='compress-image convert-image pdf-to-image pdf-to-long-image compress-pdf excel-csv pdf-to-ppt'.split(' '),BTN='merge-pdf image-to-pdf id-card-scan images-to-ppt lock-file unlock-file split-pdf organize-pdf edit-pdf qr-generator'.split(' ');
document.addEventListener('change',e=>{if(e.target.type==='file'&&AUTO.includes(slug))on()},true);document.addEventListener('click',e=>{if(BTN.includes(slug)&&e.target.closest&&e.target.closest('#go'))on()},true);
function next(){if(!P||document.querySelector('.next'))return;const ids=(R[slug]||'').split(',').filter(x=>T[x]);const d=document.createElement('div');d.className='next';
d.innerHTML='<h3>✅ Done! What next?</h3><div class="chips3">'+ids.map(x=>'<a href="'+x+'.html" style="--c:'+T[x][2]+'"><i>'+T[x][0]+'</i>'+T[x][1]+'</a>').join('')+'<button id="again">↻ Start over</button></div>';P.after(d);d.querySelector('#again').onclick=()=>location.reload();if(navigator.vibrate)navigator.vibrate(40);d.scrollIntoView({behavior:'smooth',block:'nearest'})}
new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes){if(n.nodeType!==1)continue;const a=n.matches('a.btn[download]')?n:n.querySelector('a.btn[download]');if(a){off();next();return}}}).observe(document.body,{childList:true,subtree:true});
function fwd(inp,files){const dt=new DataTransfer();[...files].slice(0,inp.multiple?99:1).forEach(f=>dt.items.add(f));inp.files=dt.files;inp.dispatchEvent(new Event('change',{bubbles:true}))}
document.querySelectorAll('label.drop').forEach(l=>{const inp=l.querySelector('input[type=file]');if(!inp)return;
['dragenter','dragover'].forEach(v=>l.addEventListener(v,e=>{e.preventDefault();l.classList.add('dz')}));l.addEventListener('dragleave',()=>l.classList.remove('dz'));
l.addEventListener('drop',e=>{e.preventDefault();l.classList.remove('dz');if(e.dataTransfer.files.length)fwd(inp,e.dataTransfer.files)});
inp.addEventListener('change',()=>{if(!inp.files.length)return;let s=l.querySelector('.strip');if(!s){s=document.createElement('div');s.className='strip';l.appendChild(s)}s.innerHTML='';[...inp.files].slice(0,8).forEach(f=>{if(/^image\//.test(f.type)){const i=new Image();i.src=URL.createObjectURL(f);i.alt='';s.appendChild(i)}else{const c=document.createElement('span');c.textContent=/pdf/.test(f.type)?'📄':'📁';s.appendChild(c)}})})});
})();
