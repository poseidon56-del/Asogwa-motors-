/* EDIT HERE: add real vehicles. Set demo:false for genuine listings. price/mileage may be null (hidden). images: paths in /images */
const INVENTORY=[
{id:"AM-001",make:"Toyota",model:"Camry",year:2018,price:null,currency:"",mileage:null,transmission:"Automatic",fuel:"Petrol",condition:"",color:"",description:"Demonstration listing. Replace with real vehicle details.",images:[],availability:"Available",demo:true},
{id:"AM-002",make:"Honda",model:"Accord",year:2016,price:null,currency:"",mileage:null,transmission:"Automatic",fuel:"Petrol",condition:"",color:"",description:"Demonstration listing. Replace with real vehicle details.",images:[],availability:"Available",demo:true},
{id:"AM-003",make:"Lexus",model:"RX 350",year:2020,price:null,currency:"",mileage:null,transmission:"Automatic",fuel:"Petrol",condition:"",color:"",description:"Demonstration listing. Replace with real vehicle details.",images:[],availability:"Reserved",demo:true}];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const name=v=>`${v.year} ${v.make} ${v.model}`;
const money=v=>v.price!=null?`${v.currency||""} ${Number(v.price).toLocaleString()}`.trim():"";
const vWa=v=>waLink(`Hello Asogwa Motors, I am interested in ${name(v)} (Ref: ${v.id}). Is it still available? Please share more details.`);
function card(v){const img=v.images[0]?`<img src="${esc(v.images[0])}" alt="${esc(name(v))}" loading="lazy">`:`<div class="ph" role="img" aria-label="Photo not yet supplied">Photo coming soon</div>`;
const m=[v.mileage!=null&&`${Number(v.mileage).toLocaleString()} km`,v.transmission,v.condition].filter(Boolean).join(", ");
return `<article class="card">${img}<div class="b">${v.demo?'<span class="tag demo">Demonstration listing</span>':""}<h3>${esc(name(v))}</h3>${money(v)?`<strong>${esc(money(v))}</strong>`:""}<p class="meta">${esc(m)}</p><span class="tag ${v.availability==="Available"?"ok":""}">${esc(v.availability)}</span><div class="row"><a class="btn sm" href="vehicle.html?id=${encodeURIComponent(v.id)}">View Details</a><a class="btn sm ghost" href="${vWa(v)}" target="_blank" rel="noopener">WhatsApp Enquiry</a></div></div></article>`}
const feat=document.getElementById("featured");if(feat)feat.innerHTML=INVENTORY.slice(0,3).map(card).join("");
const list=document.getElementById("list");
if(list){const hasP=INVENTORY.some(v=>v.price!=null),$=id=>document.getElementById(id);
const years=[...new Set(INVENTORY.map(v=>v.year))].sort((a,b)=>b-a);
$("year").innerHTML='<option value="">All years</option>'+years.map(y=>`<option>${y}</option>`).join("");
if(!hasP){$("maxp-w").hidden=true;$("sort").querySelectorAll(".p").forEach(o=>o.remove())}
const run=()=>{const s=$("q").value.toLowerCase().trim(),y=$("year").value,mp=Number($("maxp").value)||0;
let r=INVENTORY.filter(v=>(`${v.make} ${v.model}`).toLowerCase().includes(s)&&(!y||v.year==y)&&(!mp||(v.price!=null&&v.price<=mp)));
const o=$("sort").value;r.sort((a,b)=>o==="ya"?a.year-b.year:o==="pa"?(a.price??1e18)-(b.price??1e18):o==="pd"?(b.price??-1)-(a.price??-1):b.year-a.year);
$("count").textContent=`${r.length} vehicle${r.length===1?"":"s"} shown`;
list.innerHTML=r.length?r.map(card).join(""):'<p>No vehicles match your search. Clear a filter or <a href="contact.html">ask us about vehicles not yet listed</a>.</p>'};
["q","year","maxp","sort"].forEach(i=>$(i).addEventListener("input",run));
$("reset").addEventListener("click",()=>{["q","year","maxp"].forEach(i=>$(i).value="");$("sort").value="yd";run()});run()}
const det=document.getElementById("detail");
if(det){const v=INVENTORY.find(x=>x.id===new URLSearchParams(location.search).get("id"));
if(!v)det.innerHTML='<h1>Vehicle not found</h1><p><a href="inventory.html">Browse all cars</a></p>';
else{document.title=`${name(v)} | Asogwa Motors`;
const rows=[["Year",v.year],["Price",money(v)],["Mileage",v.mileage!=null&&`${Number(v.mileage).toLocaleString()} km`],["Transmission",v.transmission],["Fuel",v.fuel],["Condition",v.condition],["Colour",v.color],["Availability",v.availability],["Reference",v.id]].filter(r=>r[1]);
det.innerHTML=`${v.demo?'<p class="tag demo">Demonstration listing, not a real vehicle for sale</p>':""}<h1>${esc(name(v))}</h1><div class="gal">${v.images.length?v.images.map(i=>`<img src="${esc(i)}" alt="${esc(name(v))}" loading="lazy">`).join(""):'<div class="ph" role="img" aria-label="Photos not yet supplied">Photos coming soon</div>'}</div><dl class="spec" style="margin-top:24px">${rows.map(r=>`<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl><p>${esc(v.description)}</p><div class="row"><a class="btn" href="${vWa(v)}" target="_blank" rel="noopener">WhatsApp Enquiry</a><a class="btn ghost" href="tel:${SITE.tel}">Call ${SITE.phone}</a><a class="btn ghost" href="contact.html?vehicle=${encodeURIComponent(name(v))}">Send Enquiry Form</a></div>`}}
