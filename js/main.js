/* ══════════════════════════════════════════
   PATITAS SUAVES — main.js
   Carrito, productos, filtros, toast, form
   ══════════════════════════════════════════ */

// ─── DATOS DE PRODUCTOS ─────────────────────────────────────────────────────
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Arnés chaleco con correa",
    desc: "Talle S, M o L · Varios colores · Para perros y gatos",
    precio: 9500,
    emoji: "🦺",
    categoria: "paseo",
    badge: "Más vendido",
  },
  {
    id: 2,
    nombre: "Cinturón seguridad auto",
    desc: "Elástico 45–74cm · Para viajes seguros",
    precio: 8500,
    emoji: "🚗",
    categoria: "paseo",
    badge: null,
  },
  {
    id: 3,
    nombre: "Collar nylon ajustable",
    desc: "Talle S, M, L · Muchos colores disponibles",
    precio: 4500,
    emoji: "🎀",
    categoria: "paseo",
    badge: null,
  },
  {
    id: 4,
    nombre: "Correa simple nylon 1,2m",
    desc: "Resistente · Varios colores · Cómodo agarre",
    precio: 5500,
    emoji: "🐕",
    categoria: "paseo",
    badge: null,
  },
  {
    id: 5,
    nombre: "Buzo capucha frisado",
    desc: "Talle XS–L · Súper abrigadito para el invierno",
    precio: 13500,
    emoji: "🧥",
    categoria: "ropa",
    badge: "Temporada",
  },
  {
    id: 6,
    nombre: "Chaleco teddy",
    desc: "Talle S, M, L · Marrón/beige · Muy suave",
    precio: 12000,
    emoji: "🧸",
    categoria: "ropa",
    badge: null,
  },
  {
    id: 7,
    nombre: "Chaleco polar",
    desc: "Azul y rosa · Ideal para perros medianos",
    precio: 11000,
    emoji: "💜",
    categoria: "ropa",
    badge: null,
  },
  {
    id: 8,
    nombre: "Chaqueta acolchada",
    desc: "Celeste y rosa · Talles S–L · Muy abrigada",
    precio: 22000,
    emoji: "🫧",
    categoria: "ropa",
    badge: null,
  },
  {
    id: 9,
    nombre: "Pelota con sonido",
    desc: "Colores pastel · Latex no tóxico · ¡Les encanta!",
    precio: 3500,
    emoji: "🎾",
    categoria: "juguetes",
    badge: "Más vendido",
  },
  {
    id: 10,
    nombre: "Peluche con hierba gatera",
    desc: "23cm · Diseño pez · Para gatos",
    precio: 6500,
    emoji: "🐟",
    categoria: "juguetes",
    badge: null,
  },
  {
    id: 11,
    nombre: "Juguete peluche con sonido",
    desc: "Pollito / zanahoria / corazón · Sorpresa!",
    precio: 5000,
    emoji: "🐥",
    categoria: "juguetes",
    badge: null,
  },
  {
    id: 12,
    nombre: "Bolsas sanitarias (pack)",
    desc: "8 rollos × 15 bolsas = 120 unidades",
    precio: 5500,
    emoji: "🧴",
    categoria: "higiene",
    badge: null,
  },
  {
    id: 13,
    nombre: "Guantes limpieza sin enjuague",
    desc: "Pack x6 · Suaves y eficientes",
    precio: 5500,
    emoji: "🧤",
    categoria: "higiene",
    badge: null,
  },
  {
    id: 14,
    nombre: "Arnés cinturón 2en1",
    desc: "Doble uso: paseo y seguridad en auto",
    precio: 10500,
    emoji: "🔗",
    categoria: "paseo",
    badge: null,
  },
];

// ─── ESTADO ──────────────────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("patitas_cart") || "[]");
let filtroActivo = "todos";

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n) =>
  "$" + n.toLocaleString("es-AR", { minimumFractionDigits: 0 });

function saveCart() {
  localStorage.setItem("patitas_cart", JSON.stringify(cart));
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}

// ─── RENDERIZAR PRODUCTOS ────────────────────────────────────────────────────
function renderProductos() {
  const grid = document.getElementById("productosGrid");
  grid.innerHTML = "";

  const catLabels = {
    paseo: "Paseo y seguridad",
    ropa: "Ropa",
    juguetes: "Juguetes",
    higiene: "Higiene",
  };

  PRODUCTOS.forEach((p) => {
    const visible =
      filtroActivo === "todos" || p.categoria === filtroActivo;
    const card = document.createElement("article");
    card.className = "product-card" + (visible ? "" : " hidden");
    card.dataset.cat = p.categoria;

    card.innerHTML = `
      <div class="product-img">
        <span>${p.emoji}</span>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      </div>
      <div class="product-info">
        <p class="product-cat">${catLabels[p.categoria]}</p>
        <h3 class="product-name">${p.nombre}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">${fmt(p.precio)}</span>
          <button class="btn-add" data-id="${p.id}">+ Agregar</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  // Eventos de agregar al carrito
  grid.querySelectorAll(".btn-add").forEach((btn) => {
    btn.addEventListener("click", () => addToCart(parseInt(btn.dataset.id)));
  });
}

// ─── FILTROS ─────────────────────────────────────────────────────────────────
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) =>
        b.classList.remove("active")
      );
      btn.classList.add("active");
      filtroActivo = btn.dataset.filter;

      document.querySelectorAll(".product-card").forEach((card) => {
        const match =
          filtroActivo === "todos" ||
          card.dataset.cat === filtroActivo;
        card.classList.toggle("hidden", !match);
      });
    });
  });

  // Filtros desde categorías hero
  document.querySelectorAll(".cat-card").forEach((cat) => {
    cat.addEventListener("click", (e) => {
      const f = cat.dataset.filter;
      filtroActivo = f;
      document.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.toggle("active", b.dataset.filter === f);
      });
      document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.toggle("hidden", card.dataset.cat !== f);
      });
    });
  });
}

// ─── CARRITO ──────────────────────────────────────────────────────────────────
function addToCart(id) {
  const producto = PRODUCTOS.find((p) => p.id === id);
  if (!producto) return;

  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`🐾 ${producto.nombre} agregado al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
  renderCartItems();
}

function updateCartUI() {
  const total = cart.reduce((acc, i) => acc + i.qty, 0);
  const countEl = document.getElementById("cartCount");
  if (total > 0) {
    countEl.style.display = "flex";
    countEl.textContent = total;
  } else {
    countEl.style.display = "none";
  }
}

function renderCartItems() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="cart-empty">Tu carrito está vacío. ¡Agregá algún producto!</p>';
    footer.style.display = "none";
    return;
  }

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const p = PRODUCTOS.find((x) => x.id === item.id);
    if (!p) return;
    const subtotal = p.precio * item.qty;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span class="cart-item-emoji">${p.emoji}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${p.nombre} ${item.qty > 1 ? `× ${item.qty}` : ""}</p>
        <p class="cart-item-price">${fmt(subtotal)}</p>
      </div>
      <button class="cart-item-remove" data-id="${p.id}">✕</button>`;
    container.appendChild(div);
  });

  container.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(parseInt(btn.dataset.id)));
  });

  document.getElementById("cartTotal").textContent = fmt(total);
  footer.style.display = "block";

  // Armar mensaje de WhatsApp
  const lines = cart.map((i) => {
    const p = PRODUCTOS.find((x) => x.id === i.id);
    return `- ${p.nombre} × ${i.qty} = ${fmt(p.precio * i.qty)}`;
  });
  const msg = encodeURIComponent(
    `¡Hola Patitas Suaves! 🐾 Quiero hacer el siguiente pedido:\n\n${lines.join("\n")}\n\nTotal: ${fmt(total)}\n\n¿Cómo lo coordinamos?`
  );
  document.getElementById("cartWhatsapp").href = `https://wa.me/5492304555785?text=${msg}`;
}

function initCart() {
  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const cartOverlay = document.getElementById("cartOverlay");
  const cartClose = document.getElementById("cartClose");

  const openCart = () => {
    renderCartItems();
    cartModal.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeCart = () => {
    cartModal.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  cartBtn.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCart();
  });

  updateCartUI();
}

// ─── HAMBURGER ────────────────────────────────────────────────────────────────
function initHamburger() {
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("navLinks");
  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => nav.classList.remove("open"));
  });
}

// ─── FORMULARIO ───────────────────────────────────────────────────────────────
function initForm() {
  const form = document.getElementById("contactoForm");
  const success = document.getElementById("formSuccess");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    success.style.display = "block";
    form.reset();
    setTimeout(() => (success.style.display = "none"), 4000);
  });
}

// ─── SCROLL REVEAL SIMPLE ────────────────────────────────────────────────────
function initReveal() {
  if (!("IntersectionObserver" in window)) return;
  const els = document.querySelectorAll(
    ".cat-card, .product-card, .trust-item, .nosotros-card"
  );
  els.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .5s ease, transform .5s ease";
  });
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => {
            en.target.style.opacity = "1";
            en.target.style.transform = "translateY(0)";
          }, i * 60);
          obs.unobserve(en.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  els.forEach((el) => obs.observe(el));
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  initFilters();
  initCart();
  initHamburger();
  initForm();
  initReveal();
});
