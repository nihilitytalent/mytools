const C='tools-v1';
const FILES=[
"./",
"style.css",
"common.js",
"manifest.webmanifest",
"icon-192.png",
"icon-512.png",
"index.html",
"compress-image.html",
"convert-image.html",
"add-watermark.html",
"merge-pdf.html",
"split-pdf.html",
"image-to-pdf.html",
"edit-pdf.html",
"organize-pdf.html",
"pdf-to-image.html",
"excel-csv.html",
"word-to-text.html",
"lock-file.html",
"unlock-file.html",
"emi-calculator.html",
"age-calculator.html",
"word-counter.html",
"privacy.html",
"about.html",
"contact.html",
"https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
"https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"
];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(C);await Promise.all(FILES.map(u=>c.add(u).catch(()=>{})));self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
if(e.request.method!=='GET')return;
const u=new URL(e.request.url);
if(u.origin!==location.origin&&u.hostname!=='cdnjs.cloudflare.com')return;
e.respondWith((async()=>{
const c=await caches.open(C),hit=await c.match(e.request,{ignoreSearch:true});
const net=fetch(e.request).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(e.request,r.clone());return r}).catch(()=>hit);
e.waitUntil(net.catch(()=>{}));
return hit||net})())});
