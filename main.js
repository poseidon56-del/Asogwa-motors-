const SITE={name:"Asogwa Motors",phone:"+86 198 4948 9862",tel:"+8619849489862",wa:"8619849489862",
tiktok:"https://vm.tiktok.com/ZS9UuTVhGdN5t-SnSFh/",fb:"https://www.facebook.com/profile.php?id=61590741912426"};
const waLink=t=>`https://wa.me/${SITE.wa}?text=${encodeURIComponent(t)}`;
const WA_GENERAL=waLink("Hello Asogwa Motors, I visited your website and would like to know more about your available vehicles.");
(function(){
const page=document.body.dataset.page,L=[["index.html","Home","home"],["inventory.html","Browse Cars","inventory"],["about.html","About Us","about"],["contact.html","Contact","contact"]];
document.body.insertAdjacentHTML("afterbegin",`<a href="#main" style="position:absolute;left:-999px" onfocus="this.style.left='8px'">Skip to content</a>
<header><div class="wrap bar"><a class="brand" href="index.html">Asogwa <b>Motors</b></a><nav aria-label="Main">${L.map(l=>`<a href="${l[0]}"${l[2]===page?' aria-current="page"':""}>${l[1]}</a>`).join("")}<a class="btn" href="${WA_GENERAL}" target="_blank" rel="noopener">WhatsApp</a></nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer><div class="wrap two"><div><strong style="color:#fff">Asogwa Motors</strong><br>Tel/WhatsApp: <a href="tel:${SITE.tel}">${SITE.phone}</a></div><div><a href="${SITE.tiktok}" target="_blank" rel="noopener">TikTok</a> &nbsp; <a href="${SITE.fb}" target="_blank" rel="noopener">Facebook</a><br>Contact us for current vehicle availability.</div></div></footer>`);
document.querySelectorAll("[data-wa]").forEach(a=>{a.href=WA_GENERAL;a.target="_blank";a.rel="noopener"});
const f=document.getElementById("enquiry");if(!f)return;
const q=new URLSearchParams(location.search).get("vehicle");if(q)f.vehicle.value=q;
f.addEventListener("submit",async e=>{e.preventDefault();const o=document.getElementById("result");let ok=true;
const set=(n,m)=>{document.getElementById("e-"+n).textContent=m;if(m)ok=false};
const c=f.contact.value.trim();set("name",f.elements.name.value.trim().length<2?"Enter your name.":"");
set("contact",/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c)||/^\+?[\d\s()-]{7,}$/.test(c)?"":"Enter a valid phone number or email.");
set("message",f.message.value.trim().length<10?"Write at least 10 characters.":"");
if(!ok){o.className="msg bad";o.textContent="Please fix the highlighted fields.";return}
try{const r=await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(new FormData(f)).toString()});
if(!r.ok)throw 0;f.reset();o.className="msg good";o.textContent="Enquiry sent. We will reply using the details you gave."}
catch(_){o.className="msg bad";o.innerHTML=`Could not send the form. Please <a href="${WA_GENERAL}" target="_blank" rel="noopener">message us on WhatsApp</a> or call ${SITE.phone}.`}});
})();
