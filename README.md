# Naira Agro – single-page site + backend contract

Frontend is complete. With `API_BASE: ''` (js/config.js) it runs in offline mode: built-in products, orders/contact go to WhatsApp.
To go live: build the 4 endpoints below, then set `API_BASE` (e.g. `'/api'` if you use Vercel serverless functions in an `/api` folder).

## Endpoints (JSON)

**GET /products** → `[{ id, slug, cat: "moringa|honey|bundles", name, badge, short, long, points: [..], img, variants: [{ w: "100g", p: 249, o: 320 }] }]`  (or `{ products: [...] }`)

**POST /contact**  `{ name, phone, message }` → `{ ok: true }`

**POST /orders**
```json
{ "customer": { "name", "phone", "email", "address", "city", "state", "pincode" },
  "payment": "cod | online", "notes": "",
  "items": [{ "slug": "moringa-powder", "weight": "100g", "qty": 2 }] }
```
→ `{ "orderId": "NA1001", "paymentUrl": "https://..." }`  (`paymentUrl` optional; if present the user is redirected there, else a thank-you message with the order id is shown inside the site)

**GET /orders/:id** → `{ orderId, status, total }`

On errors return a non-2xx status with `{ "message": "text shown to the user" }`.

## Important
- **Never trust prices from the browser.** The cart sends only slug, weight and qty; recalculate subtotal, shipping (FREE_SHIPPING_MIN / SHIPPING_FEE in config.js) and total on the server.
- Validate phone/pincode again server-side; add rate limiting on /contact and /orders.
- For online payment: create the gateway order in POST /orders and return its `paymentUrl`, then set `ONLINE_PAYMENT: true`.
- If the API is on another domain, enable CORS for your site.
- Before launch: replace `YOUR-DOMAIN.com` in sitemap.xml/robots.txt, and the placeholder phone/email in config.js.
