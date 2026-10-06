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
