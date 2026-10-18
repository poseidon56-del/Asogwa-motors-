# Asogwa Motors website
**Deploy (Netlify):** drag this folder into app.netlify.com/drop (or connect a Git repo; no build command, publish directory `/`).
**Form:** `data-netlify="true"` is already set. After deploy, check Site > Forms > "enquiry" and enable email notifications (Forms > Form notifications). It only works on Netlify; locally the form shows a fallback error pointing to WhatsApp/phone.
**Add/update vehicles:** edit `INVENTORY` at top of `js/inventory.js`. Put photos in `images/` and list paths, e.g. `["images/am-001-front.jpg"]`. Set `demo:false` on real cars and delete the demo ones. Leave `price`/`mileage` as `null` to hide them; price filter and price sorting appear only when at least one vehicle has a price.
**Contact details:** change `SITE` at top of `js/main.js` and the footer/contact HTML text.
**Before launch:** replace YOUR-DOMAIN in `sitemap.xml` and `robots.txt`; remove the yellow demo notice in each page; supply address/hours for About page only if verified.
