// All backend calls live here. See README.md for the exact request/response shapes.
const API = {
  async req(path, opt = {}) {
    const r = await fetch(NAIRA.API_BASE + path, { headers: { 'Content-Type': 'application/json' }, ...opt });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.message || 'Request failed');
    return data;
  },
  products: () => API.req('/products'),
  contact: d => API.req('/contact', { method: 'POST', body: JSON.stringify(d) }),
  createOrder: d => API.req('/orders', { method: 'POST', body: JSON.stringify(d) }),
  getOrder: id => API.req('/orders/' + encodeURIComponent(id))
};
