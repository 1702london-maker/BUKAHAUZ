// Bukahauz Cart — localStorage powered
const BK_CART_KEY = 'bk_cart';

function bkGetCart() {
  try { return JSON.parse(localStorage.getItem(BK_CART_KEY)) || []; }
  catch(e) { return []; }
}

function bkSaveCart(cart) {
  localStorage.setItem(BK_CART_KEY, JSON.stringify(cart));
  bkUpdateBadge();
}

function bkAddToCart(id, name, price, img, qty) {
  qty = qty || 1;
  var cart = bkGetCart();
  var existing = cart.find(function(i){ return i.id === id; });
  if (existing) { existing.qty += qty; }
  else { cart.push({ id: id, name: name, price: price, img: img, qty: qty }); }
  bkSaveCart(cart);
  bkShowToast(name + ' added to bag');
}

function bkRemoveFromCart(id) {
  var cart = bkGetCart().filter(function(i){ return i.id !== id; });
  bkSaveCart(cart);
}

function bkUpdateQty(id, qty) {
  var cart = bkGetCart();
  var item = cart.find(function(i){ return i.id === id; });
  if (item) { item.qty = Math.max(1, qty); bkSaveCart(cart); }
}

function bkCartTotal() {
  return bkGetCart().reduce(function(t,i){ return t + (parseFloat(i.price.replace(/[^0-9.]/g,'')) * i.qty); }, 0);
}

function bkCartCount() {
  return bkGetCart().reduce(function(t,i){ return t + i.qty; }, 0);
}

function bkUpdateBadge() {
  var count = bkCartCount();
  document.querySelectorAll('.bk-cart-badge').forEach(function(b){
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

function bkShowToast(msg) {
  var t = document.getElementById('bk-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'bk-toast';
    t.style.cssText = 'position:fixed;bottom:32px;right:32px;background:#466556;color:#fff;font-family:Inter,sans-serif;font-size:13px;font-weight:600;padding:14px 24px;z-index:9999;transform:translateY(80px);opacity:0;transition:all .3s ease;pointer-events:none;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateY(0)';
  t.style.opacity = '1';
  setTimeout(function(){ t.style.transform = 'translateY(80px)'; t.style.opacity = '0'; }, 2800);
}

// Init badge on load
document.addEventListener('DOMContentLoaded', bkUpdateBadge);
window.addEventListener('storage', bkUpdateBadge);
