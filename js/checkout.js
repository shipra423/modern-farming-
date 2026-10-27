// Checkout modal (same page). Backend call goes through API.createOrder (js/api.js)
const totals = () => { const sub = cart.reduce((a, c) => a + c.price * c.qty, 0); const ship = !cart.length || sub >= NAIRA.FREE_SHIPPING_MIN ? 0 : NAIRA.SHIPPING_FEE; return { sub, ship, total: sub + ship }; };
function renderSummary() {
  const { sub, ship, total } = totals();
  $('#summary').innerHTML = cart.map(c => `<div class="flex justify-between text-sm"><span>${c.title} (${c.weight}) × ${c.qty}</span><b>₹${c.price * c.qty}</b></div>`).join('') +
    `<div class="border-t border-earth-200 pt-3 mt-3 space-y-1 text-sm"><div class="flex justify-between"><span>Subtotal</span><span>₹${sub}</span></div><div class="flex justify-between"><span>Delivery</span><span>${ship ? '₹' + ship : 'FREE'}</span></div><div class="flex justify-between font-serif text-xl font-bold pt-2"><span>Total</span><span>₹${total}</span></div></div>`;
}
function openCheckout() {
  if (!cart.length) return toast('Your cart is empty');
  toggleCart(false); renderSummary();
  $('#checkoutBody').classList.remove('hidden'); $('#checkoutDone').classList.add('hidden');
  const m = $('#checkoutModal'); m.classList.remove('hidden'); m.classList.add('flex'); document.body.style.overflow = 'hidden';
}
function closeCheckout() { const m = $('#checkoutModal'); m.classList.add('hidden'); m.classList.remove('flex'); document.body.style.overflow = ''; }
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCheckout(); });
if (NAIRA.ONLINE_PAYMENT) $('#onlineOpt').classList.remove('hidden');
$('#checkoutForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!cart.length) return toast('Your cart is empty');
  const f = Object.fromEntries(new FormData(e.target)), btn = $('button[type=submit]', e.target), { total } = totals();
  const customer = { name: f.name, phone: f.phone, email: f.email, address: f.address, city: f.city, state: f.state, pincode: f.pincode };
  if (!NAIRA.API_BASE) { // offline mode: send the order to WhatsApp
    let m = 'Hello Naira Agro! New order:\n\n' + cart.map((c, i) => `${i + 1}. ${c.title} (${c.weight}) x ${c.qty} = ₹${c.price * c.qty}`).join('\n');
    m += `\n\nTotal: ₹${total} (${f.payment === 'online' ? 'Online' : 'COD'})\n\n${f.name}, ${f.phone}\n${f.address}, ${f.city}, ${f.state} - ${f.pincode}`;
    return window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`, '_blank');
  }
  btn.disabled = true; btn.textContent = 'Placing order...';
  try {
    const res = await API.createOrder({ customer, payment: f.payment, notes: f.notes || '', items: cart.map(c => ({ slug: c.slug, weight: c.weight, qty: c.qty })) });
    cart = []; save(); renderCart(); e.target.reset();
    if (res.paymentUrl) return (location.href = res.paymentUrl);
    $('#doneId').textContent = res.orderId ? 'Order #' + res.orderId : '';
    $('#checkoutBody').classList.add('hidden'); $('#checkoutDone').classList.remove('hidden');
  } catch (err) { toast(err.message || 'Could not place order'); }
  btn.disabled = false; btn.textContent = 'Place Order';
});
