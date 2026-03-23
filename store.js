/* ═══════════════════════════════════════════════
   AARAINA — Shared Store (cart + wishlist)
   Uses localStorage with safe try/catch wrappers
   so private-browsing / full-storage never throws.
   ═══════════════════════════════════════════════ */

const Store = (() => {
  // ── SAFE STORAGE WRAPPERS ─────────────────────
  function safeGet(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch {
      return [];
    }
  }

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.warn("[Aaraina] localStorage write failed:", err.message);
      return false;
    }
  }

  // ── READ / WRITE ──────────────────────────────
  function getCart() {
    return safeGet("aaraina_cart");
  }

  function getWishlist() {
    return safeGet("aaraina_wishlist");
  }

  function saveCart(cart) {
    safeSet("aaraina_cart", cart);
    updateNavCounts();
  }

  function saveWishlist(wl) {
    safeSet("aaraina_wishlist", wl);
    updateNavCounts();
  }

  // ── CART ─────────────────────────────────────
  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    saveCart(cart);
    showToast("Added to cart");
  }

  function removeFromCart(id) {
    saveCart(getCart().filter((i) => i.id !== id));
  }

  function updateCartQty(id, delta) {
    const cart = getCart();
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
  }

  function clearCart() {
    saveCart([]);
  }

  function getCartTotal() {
    return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  function getCartCount() {
    return getCart().reduce((sum, i) => sum + i.qty, 0);
  }

  // ── WISHLIST ──────────────────────────────────
  function addToWishlist(product) {
    const wl = getWishlist();
    if (!wl.find((i) => i.id === product.id)) {
      wl.push(product);
      saveWishlist(wl);
      showToast("Saved to wishlist");
    }
  }

  function removeFromWishlist(id) {
    saveWishlist(getWishlist().filter((i) => i.id !== id));
  }

  function isInWishlist(id) {
    return !!getWishlist().find((i) => i.id === id);
  }

  function isInCart(id) {
    return !!getCart().find((i) => i.id === id);
  }

  // ── NAV COUNTS ───────────────────────────────
  function updateNavCounts() {
    const cartCount = getCartCount();
    const wlCount = getWishlist().length;

    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? "flex" : "none";
    });

    document.querySelectorAll(".wishlist-nav-icon").forEach((el) => {
      el.textContent = wlCount > 0 ? "\u2665" : "\u2661"; // ♥ / ♡
      el.style.color = wlCount > 0 ? "var(--gold)" : "";
    });
  }

  // ── TOAST ────────────────────────────────────
  function showToast(msg) {
    let toast = document.getElementById("storeToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "storeToast";
      toast.style.cssText = [
        "position:fixed",
        "bottom:28px",
        "left:50%",
        "transform:translateX(-50%) translateY(16px)",
        "background:var(--forest)",
        "color:white",
        "font-family:var(--font-label)",
        "font-size:0.68rem",
        "letter-spacing:2px",
        "text-transform:uppercase",
        "padding:13px 26px",
        "opacity:0",
        "transition:all 0.35s ease",
        "z-index:9999",
        "pointer-events:none",
        "white-space:nowrap",
      ].join(";");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateX(-50%) translateY(0)";
    });
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(-50%) translateY(16px)";
    }, 2500);
  }

  // ── FORMAT ───────────────────────────────────
  function formatINR(n) {
    return "\u20B9" + Number(n).toLocaleString("en-IN");
  }

  // ── INIT ─────────────────────────────────────
  function init() {
    document.addEventListener("DOMContentLoaded", () => {
      updateNavCounts();

      // Sync wishlist heart buttons & cart overlay text already in DOM
      document.querySelectorAll("[data-product-id]").forEach((el) => {
        const id = el.dataset.productId;
        const btn = el.querySelector(".card-wishlist");
        if (btn && isInWishlist(id)) {
          btn.textContent = "\u2665";
          btn.classList.add("liked");
        }
        const addBtn = el.querySelector(".card-overlay-btn, .add-to-cart-btn");
        if (addBtn && isInCart(id)) {
          addBtn.textContent = "\u2713 In Cart";
        }
      });
    });
  }

  init();

  return {
    addToCart,
    removeFromCart,
    updateCartQty,
    clearCart,
    getCart,
    getCartTotal,
    getCartCount,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    getWishlist,
    updateNavCounts,
    showToast,
    formatINR,
  };
})();
