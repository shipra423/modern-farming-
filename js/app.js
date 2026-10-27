const PHONE=NAIRA.PHONE, EMAIL=NAIRA.EMAIL;
let PRODUCTS=[
{slug:'moringa-powder',cat:'moringa',name:'Pure Organic Moringa Powder',badge:'Bestseller',
 short:'Rich in plant-based iron, antioxidants, amino acids and chlorophyll. Shade-dried, single origin.',
 long:'Gently shade-dried Moringa oleifera leaves, stone-ground into a vibrant green powder. Add to smoothies, water, rotis or soups.',
 points:['Single origin, no fillers','Shade-dried to protect nutrients','Packed in airtight jars'],
 img:'https://www.kohfoods.in/cdn/shop/files/BottleProductShots_2_3cbcf1b1-7610-4c1a-a8fa-a2c42ca848b0.png?v=1775126725',
 variants:[{w:'100g',p:249,o:320},{w:'250g',p:449,o:560},{w:'500g',p:799,o:999}]},
{slug:'wildflower-honey',cat:'honey',name:'Raw Wildflower Forest Honey',badge:'100% Raw',
 short:'Unpasteurized, pollen-rich honey harvested from natural bee boxes. Never heated.',
 long:'Cold-extracted, gently filtered honey that keeps its natural enzymes and pollen. It may crystallize in cold weather, which is natural.',
 points:['Never heated or blended','No added sugar or syrup','Glass jar packing'],
 img:'https://www.arrahmantraders.com/images/categories/category_honey_1776768705340.png',
 variants:[{w:'250g',p:379,o:450},{w:'500g',p:649,o:799},{w:'1kg',p:1199,o:1499}]},
{slug:'moringa-honey-duo',cat:'bundles',name:'Moringa & Forest Honey Duo',badge:'Save 25%',
 short:'Morning ritual combo: 250g Moringa Powder + 500g Raw Wildflower Honey.',
 long:'Our two bestsellers together at a combo price. Perfect as a gift or a starter pack.',
 points:['250g Moringa + 500g Honey','Combo savings','Gift-ready packing'],
 img:'https://purepansaar.com/cdn/shop/files/rn-image_picker_lib_temp_105e782d-b20c-4a8a-bff3-63599b7dde73.png?v=1758562529&width=1445',
 variants:[{w:'250g + 500g',p:899,o:1199}]}];

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const path=location.pathname.replace(/\/$/,'')||'/';
let cart=[];try{cart=JSON.parse(localStorage.getItem('naira_cart'))||[]}catch(e){}
const save=()=>{try{localStorage.setItem('naira_cart',JSON.stringify(cart))}catch(e){}};
const NAV=[['/#about','Our Roots'],['/#products','Farm Store'],['/#benefits','Health Benefits'],['/#farm-in-action','Farm in Action'],['/#why-naira','Why Naira'],['/#reviews','Reviews']];
const FB='https://placehold.co/400x350/1B4332/white?text=Naira+Agro';

// ---------- Layout (header, footer, cart, toast) ----------
$('#site-header').innerHTML=`
<div class="bg-forest-900 text-white text-xs py-2.5 px-4 text-center"><span class="bg-honey-500 text-forest-900 font-semibold px-2 py-0.5 rounded mr-2">NEW HARVEST</span>Raw Wildflower Honey & Fresh Moringa Powder · Free Delivery Over ₹499</div>
<header class="sticky top-0 z-40 bg-earth-50/90 backdrop-blur-md border-b border-earth-200">
 <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
  <a href="/#top" class="flex items-center gap-3"><div class="w-11 h-11 rounded-2xl bg-forest-700 flex items-center justify-center"><i data-lucide="sprout" class="w-6 h-6 text-leaf-400"></i></div>
   <div><div class="font-serif text-2xl font-bold leading-none">NAIRA AGRO</div><div class="text-[10px] uppercase font-bold tracking-widest text-leaf-600">Direct-to-Customer Organic</div></div></a>
  <nav class="hidden lg:flex items-center gap-7 text-sm font-medium">${NAV.map(([h,t])=>`<a href="${h}" class="navlink hover:text-forest-500 py-1">${t}</a>`).join('')}</nav>
  <div class="flex items-center gap-3">
   <button onclick="toggleCart()" aria-label="Cart" class="relative p-2.5 rounded-full bg-white border border-earth-200"><i data-lucide="shopping-bag" class="w-5 h-5"></i><span id="cartBadge" class="absolute -top-1 -right-1 bg-honey-500 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center scale-0 transition-transform">0</span></button>
   <a href="/#contact" class="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white text-sm font-medium">Contact Us</a>
   <button onclick="$('#mobMenu').classList.toggle('hidden')" aria-label="Menu" class="lg:hidden p-2"><i data-lucide="menu" class="w-6 h-6"></i></button>
  </div></div>
 <div id="mobMenu" class="hidden lg:hidden border-t border-earth-200 bg-white px-6 py-4 space-y-3">${NAV.concat([['/#contact','Contact Us']]).map(([h,t])=>`<a href="${h}" onclick="$('#mobMenu').classList.add('hidden')" class="block font-medium">${t}</a>`).join('')}</div>
</header>`;

$('#site-footer').innerHTML=`
<footer class="bg-forest-900 text-emerald-100/75 border-t border-forest-700"><div class="max-w-7xl mx-auto px-5 lg:px-8 pt-14 pb-8">
 <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10">
  <div><div class="font-serif text-2xl font-bold text-white mb-3">NAIRA AGRO</div><p class="text-sm leading-7">Farm-direct raw honey and organic moringa, packed and delivered with care.</p></div>
  <div><h3 class="text-sm font-bold uppercase tracking-widest text-white mb-4">Explore</h3><ul class="space-y-2 text-sm">${NAV.map(([h,t])=>`<li><a href="${h}" class="hover:text-leaf-400">${t}</a></li>`).join('')}</ul></div>
  <div><h3 class="text-sm font-bold uppercase tracking-widest text-white mb-4">Shop</h3><ul class="space-y-2 text-sm"><li><a href="/#products" class="hover:text-leaf-400">All Products</a></li><li><a href="/#contact" class="hover:text-leaf-400">Bulk Orders</a></li></ul></div>
  <div><h3 class="text-sm font-bold uppercase tracking-widest text-white mb-4">Get In Touch</h3><ul class="space-y-2 text-sm"><li><a href="tel:+${PHONE}" class="hover:text-leaf-400">+91 98765 43210</a></li><li><a href="mailto:${EMAIL}" class="hover:text-leaf-400">${EMAIL}</a></li><li><a href="https://wa.me/${PHONE}" target="_blank" rel="noopener" class="hover:text-leaf-400">WhatsApp us</a></li></ul></div>
 </div>
 <div class="pt-6 border-t border-forest-700 text-xs text-emerald-200/60 flex flex-wrap justify-between gap-3"><span>© ${new Date().getFullYear()} Naira Agro. All rights reserved.</span><a href="#top" onclick="scrollTo({top:0,behavior:'smooth'});return false">Back to Top ↑</a></div>
</div></footer>
<div id="cartDrawer" class="fixed inset-0 z-50 opacity-0 pointer-events-none transition-opacity duration-300">
 <div onclick="toggleCart()" class="absolute inset-0 bg-forest-950/60"></div>
 <div id="cartPanel" class="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col translate-x-full transition-transform duration-300">
  <div class="p-5 border-b border-earth-200 flex justify-between items-center bg-earth-50"><h3 class="font-serif text-lg font-bold">Your Farm Cart</h3><button onclick="toggleCart()" aria-label="Close"><i data-lucide="x" class="w-5 h-5"></i></button></div>
  <div class="px-5 py-3 bg-forest-50 border-b border-forest-100"><div id="shipText" class="text-xs font-semibold mb-1"></div><div class="w-full bg-forest-200/50 rounded-full h-2"><div id="shipBar" class="bg-leaf-500 h-2 rounded-full transition-all duration-500" style="width:0"></div></div></div>
  <div id="cartItems" class="flex-1 overflow-y-auto p-5 space-y-3"></div>
  <div class="p-5 border-t border-earth-200 bg-earth-50 space-y-3"><div class="flex justify-between items-baseline"><span class="font-bold">Total</span><span id="cartTotal" class="font-serif text-2xl font-bold">₹0</span></div>
   <button onclick="typeof openCheckout==='function'?openCheckout():location.href='/'" class="w-full py-3.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white font-bold text-sm">Proceed to Checkout</button><button onclick="checkout()" class="w-full py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm">Order via WhatsApp</button></div>
 </div></div>
<div id="toast" class="fixed bottom-6 right-6 z-50 bg-forest-900 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs translate-y-24 opacity-0 transition-all duration-300"></div>`;

// ---------- Cart ----------
function toast(m){const t=$('#toast');t.textContent=m;t.classList.remove('translate-y-24','opacity-0');setTimeout(()=>t.classList.add('translate-y-24','opacity-0'),2500)}
function toggleCart(open){const d=$('#cartDrawer'),o=open??d.classList.contains('opacity-0');
 d.classList.toggle('opacity-0',!o);d.classList.toggle('pointer-events-none',!o);$('#cartPanel').classList.toggle('translate-x-full',!o)}
function addToCart(slug,i){const p=PRODUCTS.find(x=>x.slug===slug),v=p.variants[i];
 const e=cart.find(c=>c.slug===slug&&c.weight===v.w);e?e.qty++:cart.push({slug,title:p.name,weight:v.w,price:v.p,qty:1,img:p.img});
 save();renderCart();toast(`${p.name} (${v.w}) added`);toggleCart(true)}
function qty(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);save();renderCart()}
function renderCart(){const n=cart.reduce((a,c)=>a+c.qty,0),sub=cart.reduce((a,c)=>a+c.price*c.qty,0),b=$('#cartBadge');
 b.textContent=n;b.classList.toggle('scale-0',!n);b.classList.toggle('scale-100',!!n);
 $('#shipBar').style.width=Math.min(sub/NAIRA.FREE_SHIPPING_MIN*100,100)+'%';
 $('#shipText').textContent=sub>=NAIRA.FREE_SHIPPING_MIN?'🎉 You have unlocked FREE Delivery!':`Add ₹${NAIRA.FREE_SHIPPING_MIN-sub} more for Free Delivery`;
 $('#cartTotal').textContent='₹'+sub;
 $('#cartItems').innerHTML=cart.length?cart.map((c,i)=>`<div class="flex gap-3 p-3 bg-earth-50 rounded-2xl border border-earth-200"><img src="${c.img}" alt="" class="w-14 h-14 rounded-xl object-contain bg-white" onerror="this.src='${FB}'"><div class="flex-1 min-w-0"><h5 class="text-xs font-bold truncate">${c.title}</h5><p class="text-[11px]">${c.weight} • ₹${c.price}</p><div class="flex items-center gap-2 mt-1"><button onclick="qty(${i},-1)" class="w-6 h-6 rounded-md bg-white border border-earth-200 font-bold">-</button><span class="text-xs font-semibold">${c.qty}</span><button onclick="qty(${i},1)" class="w-6 h-6 rounded-md bg-white border border-earth-200 font-bold">+</button></div></div><div class="text-right"><b class="text-xs">₹${c.price*c.qty}</b><button onclick="qty(${i},-${c.qty})" class="block text-[10px] text-red-500 mt-2">Remove</button></div></div>`).join(''):'<p class="text-center py-12 text-sm text-forest-700">Your basket is empty.<br><a href="/#products" onclick="toggleCart(false)" class="underline font-semibold">Start shopping</a></p>'}
function checkout(){if(!cart.length)return toast('Your cart is empty');
 let m='Hello Naira Agro! I want to order:\n\n'+cart.map((c,i)=>`${i+1}. ${c.title} (${c.weight}) x ${c.qty} = ₹${c.price*c.qty}`).join('\n');
 m+=`\n\n*Total:* ₹${cart.reduce((a,c)=>a+c.price*c.qty,0)}\nPlease share payment details and dispatch estimate.`;
 window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`,'_blank')}

// ---------- Products ----------
async function loadProducts(){if(!NAIRA.API_BASE)return;try{const d=await API.products(),l=Array.isArray(d)?d:d.products;
 if(l&&l.length)PRODUCTS=l.map(p=>({badge:'',short:'',long:'',points:[],cat:'all',...p,slug:p.slug||p.id}))}catch(e){console.warn('API unavailable, using built-in products',e)}}
function card(p){const v=p.variants[0];return `<div class="pcard bg-white rounded-3xl p-5 border border-earth-200 shadow-sm hover:shadow-xl transition flex flex-col justify-between" data-slug="${p.slug}" data-cat="${p.cat}" data-i="0"><div>
 <div><div class="relative rounded-2xl bg-forest-50/70 aspect-[4/3] flex items-center justify-center p-6 mb-4"><span class="absolute top-3 left-3 bg-forest-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">${p.badge}</span><img src="${p.img}" alt="${p.name}" loading="lazy" class="max-h-48 object-contain" onerror="this.onerror=null;this.src='${FB}'"></div><h3 class="font-serif text-xl font-bold">${p.name}</h3></div>
 <p class="text-xs text-forest-800/70 mt-1">${p.short}</p>
 <div class="grid grid-cols-3 gap-2 mt-3">${p.variants.map((x,i)=>`<button type="button" data-v="${i}" class="vbtn ${i?'':'on'}">${x.w}</button>`).join('')}</div></div>
 <div class="pt-4 mt-4 border-t border-earth-100 flex items-center justify-between"><div class="flex items-baseline gap-1.5"><span class="price font-serif text-2xl font-bold">₹${v.p}</span><span class="old text-xs text-gray-400 line-through">₹${v.o}</span></div>
 <button class="add px-5 py-2.5 rounded-full bg-forest-700 hover:bg-forest-800 text-white text-sm font-medium">Add to Cart</button></div></div>`}
document.addEventListener('click',e=>{
 const vb=e.target.closest('.vbtn'),ad=e.target.closest('.add'),f=e.target.closest('[data-filter]');
 if(vb){const c=vb.closest('.pcard'),p=PRODUCTS.find(x=>x.slug===c.dataset.slug),v=p.variants[vb.dataset.v];
  c.dataset.i=vb.dataset.v;$$('.vbtn',c).forEach(b=>b.classList.toggle('on',b===vb));$('.price',c).textContent='₹'+v.p;$('.old',c).textContent='₹'+v.o}
 if(ad){const c=ad.closest('.pcard');addToCart(c.dataset.slug,+c.dataset.i)}
 if(f){$$('[data-filter]').forEach(b=>{const on=b===f;b.classList.toggle('bg-forest-700',on);b.classList.toggle('text-white',on);b.classList.toggle('bg-white',!on)});
  $$('.pcard').forEach(c=>c.style.display=(f.dataset.filter==='all'||c.dataset.cat===f.dataset.filter)?'':'none')}});
async function renderProducts(){await loadProducts();
$$('[data-products]').forEach(el=>el.innerHTML=PRODUCTS.map(card).join(''));
lucide.createIcons();}
renderProducts();
// ---------- Contact form ----------
const cf=$('#contactForm');
if(cf)cf.addEventListener('submit',async e=>{e.preventDefault();const [name,phone,message]=[...cf.elements].map(x=>x.value),btn=$('button',cf);
 if(!NAIRA.API_BASE){window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(`Hi Naira Agro, I'm ${name} (${phone}).\n${message}`)}`,'_blank');cf.reset();return toast('Opening WhatsApp...')}
 btn.disabled=true;try{await API.contact({name,phone,message});cf.reset();toast('Thank you! We will contact you shortly.')}catch(err){toast(err.message||'Could not send. Please try again.')}btn.disabled=false});

renderCart();lucide.createIcons();

// ---------- Highlight current section in navbar ----------
const secs=NAV.map(([h])=>$(h.slice(1))).filter(Boolean);
if(secs.length&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('.navlink').forEach(a=>a.classList.toggle('active-nav',a.getAttribute('href')==='/#'+e.target.id))}),{rootMargin:'-40% 0px -55% 0px'});secs.forEach(x=>io.observe(x))}
