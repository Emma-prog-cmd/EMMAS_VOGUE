const BASE = 'https://emma-prog-cmd.github.io/EMMA'S_VOGUE/images/';
const robes = [
  { id:'r1', name:'Robe Glamour', price:18000, img:'robe1.jpg' },
  { id:'r2', name:'Robe noire courte', price:28000, img:'robe2.jpg' },
  { id:'r3', name:'Robe blanche avec traîne', price:23000, img:'robe3.jpg' },
  { id:'r4', name:'Robe violette avec traîne', price:32000, img:'robe4.jpg' },
  { id:'r5', name:'Robe bleue marine avec fente', price:40000, img:'robe5.jpg' },
  { id:'r6', name:'Robe velours rouge', price:10000, img:'robe6.jpg' },
  { id:'r7', name:'Robe courte noire sexy', price:16000, img:'robe7.jpg' },
  { id:'r8', name:'Robe courte en Jean', price:33000, img:'robe8.jpg' },
];
const sacs = [
  { id:'s1', name:'Sac noir Louis-Vuitton', price:10000, img:'sac1.jpg' },
  { id:'s2', name:'Sac rose clair Dior', price:15000, img:'sac2.jpg' },
  { id:'s3', name:'Sac rouge Louis-Vuitton', price:20000, img:'sac3.jpg' },
  { id:'s4', name:'Sac rose Louis-Vuitton', price:19000, img:'sac4.jpg' },
  { id:'s5', name:'Sac marron avec nœud LV', price:35000, img:'sac5.jpg' },
  { id:'s6', name:'Sac beige avec nœud', price:22000, img:'sac6.jpg' },
  { id:'s7', name:'Sac marron', price:15000, img:'sac7.jpg' },
  { id:'s8', name:'Sac bleu nuit avec pochette', price:25000, img:'sac8.jpg' },
];
const talons = [
  { id:'t1', name:'Talon pointu en or', price:18000, img:'talon1.jpg' },
  { id:'t2', name:'Talon avec motif fleurs', price:25000, img:'talon2.jpg' },
  { id:'t3', name:'Talon avec nœud brillant', price:48000, img:'talon3.jpg' },
  { id:'t4', name:'Talon transparent', price:55000, img:'talon4.jpg' },
  { id:'t5', name:'Talon saumon chic', price:25000, img:'talon5.jpg' },
  { id:'t6', name:'Talon noir élégant', price:18000, img:'talon6.jpg' },
  { id:'t7', name:'Escarpins pointus rose clair', price:20000, img:'talon7.jpg' },
  { id:'t8', name:'Talon noir Louis-Vuitton', price:22000, img:'talon8.jpg' },
];
const bracelets = [
  { id:'b1', name:'Ensemble bracelet LV', price:20000, img:'bracelet1.jpg' },
  { id:'b2', name:'Ensemble chic avec montre', price:28000, img:'bracelet2.jpg' },
  { id:'b3', name:'Ensemble Chanel', price:33000, img:'bracelet3.jpg' },
  { id:'b4', name:'Ensemble bleu bracelet cœur', price:32000, img:'bracelet4.jpg' },
  { id:'b5', name:'Ensemble argent bracelet infini', price:40000, img:'bracelet5.jpg' },
  { id:'b6', name:'Ensemble Rolex rouge', price:10000, img:'bracelet6.jpg' },
  { id:'b7', name:'Ensemble six pièces', price:15000, img:'bracelet7.jpg' },
  { id:'b8', name:'Ensemble bracelet et montre', price:12000, img:'bracelet8.jpg' },
];

function fmt(n) { return n.toLocaleString('fr-FR') + ' FCFA'; }

function renderGrid(items, containerId) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = items.map(p => `
    <div class="product-card reveal">
      <div class="product-img-wrap">
        <img class="product-img" src="${BASE}${p.img}" alt="${p.name}" loading="lazy"/>
        <div class="card-overlay">
          <button class="add-btn" onclick="addToCart('${p.id}','${p.name}',${p.price},'${BASE}${p.img}')">
            Ajouter au panier
          </button>
        </div>
      </div>
      <div class="product-info">
        <p class="product-name">${p.name}</p>
        <p class="product-price">${fmt(p.price)}</p>
      </div>
      <button class="add-btn-static" onclick="addToCart('${p.id}','${p.name}',${p.price},'${BASE}${p.img}')">
        + Ajouter au panier
      </button>
    </div>
  `).join('');
}

renderGrid(robes, 'robesGrid');
renderGrid(sacs, 'sacsGrid');
renderGrid(talons, 'talonsGrid');
renderGrid(bracelets, 'braceletsGrid');

/* ── CART ── */
let cart = [];

function addToCart(id, name, price, img) {
  const ex = cart.find(i => i.id === id);
  if (ex) { ex.qty++; } else { cart.push({ id, name, price, img, qty: 1 }); }
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function renderCart() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = fmt(total);

  const box = document.getElementById('cartItems');
  if (cart.length === 0) {
    box.innerHTML = '<p class="cart-empty">Votre panier est vide.</p>';
    return;
  }
  box.innerHTML = cart.map(i => `
    <div class="cart-item">
      <img class="cart-item-img" src="${i.img}" alt="${i.name}"/>
      <div class="cart-item-info">
        <p class="cart-item-name">${i.name}</p>
        <p class="cart-item-price">${fmt(i.price)} × ${i.qty}</p>
        <button class="cart-item-remove" onclick="removeFromCart('${i.id}')">✕ Supprimer</button>
      </div>
    </div>
  `).join('');
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function checkoutWhatsapp() {
  if (cart.length === 0) return;
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const lines = cart.map(i => `• ${i.name} x${i.qty} — ${fmt(i.price * i.qty)}`).join('\n');
  const msg = `Bonjour Emma's Vogue 👋\n\nJe souhaite commander :\n\n${lines}\n\n*Total : ${fmt(total)}*`;
  window.open('https://wa.me/2290150509600?text=' + encodeURIComponent(msg), '_blank');
}

function sendContactWhatsapp() {
  const name = document.getElementById('contactNom').value.trim();
  const msg = document.getElementById('contactMsg').value.trim();
  const txt = `Bonjour Emma's Vogue 👋\n\nNom : ${name || '(non précisé)'}\n\n${msg || '(aucun message)'}`;
  window.open('https://wa.me/2290150509600?text=' + encodeURIComponent(txt), '_blank');
}

/* ── SCROLL ARROWS ── */
function scrollCards(btn, direction) {
  const track = btn.closest('.scroll-wrapper').querySelector('.product-track');
  track.scrollBy({ left: direction * 280, behavior: 'smooth' });
}

/* ── NAV SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── REVEAL OBSERVER ── */
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });

function observeReveal() {
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
observeReveal();
setTimeout(observeReveal, 200);
