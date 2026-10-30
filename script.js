const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 950));

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const tabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');
  });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  const filter = tab.dataset.filter;
  menuItems.forEach(item => item.classList.toggle('hidden', filter !== 'all' && item.dataset.category !== filter));
}));

let basket = [];
const cartPanel = document.getElementById('cartPanel');
const cartBackdrop = document.getElementById('cartBackdrop');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
function renderBasket() {
  cartCount.textContent = basket.length;
  if (!basket.length) cartItems.innerHTML = '<p>Your demo basket is empty.</p>';
  else cartItems.innerHTML = basket.map((item, index) => `<div class="cart-line"><span>${item.name}</span><span>$${item.price.toFixed(2)} <button aria-label="Remove ${item.name}" data-remove="${index}" style="border:0;background:none;color:#9b5c42;margin-left:8px">×</button></span></div>`).join('');
  cartTotal.textContent = '$' + basket.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  cartItems.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {
    basket.splice(Number(button.dataset.remove), 1);
    renderBasket();
  }));
}
document.querySelectorAll('.add-button').forEach(button => button.addEventListener('click', () => {
  basket.push({ name: button.dataset.item, price: Number(button.dataset.price) });
  renderBasket();
  showToast(`${button.dataset.item} added to your demo basket`);
}));
function openCart() { cartPanel.classList.add('open'); cartBackdrop.classList.add('show'); cartPanel.setAttribute('aria-hidden', 'false'); }
function closeCart() { cartPanel.classList.remove('open'); cartBackdrop.classList.remove('show'); cartPanel.setAttribute('aria-hidden', 'true'); }
document.getElementById('cartButton').addEventListener('click', openCart);
document.getElementById('closeCart').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeCart(); });

const newsletterForm = document.getElementById('newsletterForm');
newsletterForm.addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('emailInput');
  if (!email.checkValidity()) { email.reportValidity(); return; }
  document.getElementById('newsletterMessage').textContent = 'Thanks! This demo form is not connected to an email service yet.';
  email.value = '';
});

document.getElementById('year').textContent = new Date().getFullYear();
