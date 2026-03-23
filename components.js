/* ═══════════════════════════════════════════════
   AARAINA — Shared Components
   Injects nav, footer & search overlay into every
   page. Owns all shared event listeners so they
   never get copy-pasted again.
   ═══════════════════════════════════════════════ */

(function () {
  /* ── Active-page detection ───────────────────
     Matches the current filename to a nav key so
     we can highlight the right link automatically. */
  const PAGE_MAP = {
    "index.html": "home",
    "": "home",
    "collections.html": "collections",
    "about.html": "about",
    "contact.html": "contact",
    "wishlist.html": "wishlist",
    "cart.html": "cart",
    "checkout.html": "checkout",
    "product.html": "collections",
    "account.html": "account",
    "login.html": "login",
  };
  const filename = window.location.pathname.split("/").pop() || "";
  const activePage = PAGE_MAP[filename] || "";

  function navLink(href, key, label) {
    const isActive = activePage === key ? ' class="nav-link active"' : ' class="nav-link"';
    return `<a href="${href}"${isActive}>${label}</a>`;
  }

  /* ── NAV HTML ────────────────────────────────── */
  const NAV_HTML = `
<div class="scroll-progress" id="scrollBar"></div>

<nav id="mainNav">
  <div class="nav-left">
    ${navLink("index.html", "home", "Home")}
    ${navLink("collections.html", "collections", "Shop &amp; Collections")}
  </div>
  <div class="nav-center">
    <a href="index.html">
      <img src="AARAINA.png" alt="Aaraina" class="logo" />
    </a>
  </div>
  <div class="nav-right">
    ${navLink("about.html", "about", "About")}
    ${navLink("contact.html", "contact", "Contact")}
    <div class="nav-icons">
      <button class="nav-icon" id="searchBtn" title="Search">&#x2315;</button>
      <button class="nav-icon wishlist-nav-icon" title="Wishlist"
        onclick="window.location='wishlist.html'">&#9825;</button>
      <button class="nav-icon" title="Cart"
        onclick="window.location='cart.html'">&#8853;
        <span class="cart-count" style="display:none">0</span>
      </button>
    </div>
  </div>
  <button class="hamburger" id="hamburger" aria-label="Open menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- Mobile overlay -->
<div class="nav-mobile-overlay" id="mobileNav" role="dialog" aria-label="Navigation menu">
  <button class="mobile-close" id="mobileClose" aria-label="Close menu">&#x2715;</button>
  <a href="index.html" class="nav-link">Home</a>
  <a href="collections.html" class="nav-link">Shop &amp; Collections</a>
  <a href="about.html" class="nav-link">About</a>
  <a href="contact.html" class="nav-link">Contact</a>
  <div class="nav-icons" style="margin-top:24px;justify-content:center;gap:24px">
    <button class="nav-icon wishlist-nav-icon" title="Wishlist"
      onclick="window.location='wishlist.html'">&#9825;</button>
    <button class="nav-icon" title="Cart"
      onclick="window.location='cart.html'">&#8853;
      <span class="cart-count" style="display:none">0</span>
    </button>
  </div>
</div>

<!-- Search overlay -->
<div class="search-overlay" id="searchOverlay" role="search">
  <button class="search-close" id="searchClose" aria-label="Close search">&#x2715;</button>
  <div class="search-inner">
    <span class="label-xs">Search</span>
    <input type="text" id="searchInput"
      placeholder="Search sarees, regions, weaves&hellip;"
      autocomplete="off" />
    <div class="search-suggestions">
      <a href="collections.html">Silk</a>
      <a href="collections.html">Bridal</a>
      <a href="collections.html">Cotton</a>
      <a href="collections.html">Festive</a>
      <a href="collections.html">Kanjivaram</a>
      <a href="collections.html">Chanderi</a>
    </div>
  </div>
</div>`;

  /* ── FOOTER HTML ─────────────────────────────── */
  const FOOTER_HTML = `
<footer class="footer">
  <div class="footer-top">
    <div class="footer-brand">
      <img src="AARAINA.png" alt="Aaraina" class="footer-logo" />
      <p>Celebrating the art of handwoven elegance across India.
         Ethically sourced, beautifully crafted.</p>
      <div class="footer-social">
        <a href="#" class="social-link" title="Instagram">IG</a>
        <a href="#" class="social-link" title="Pinterest">PT</a>
        <a href="#" class="social-link" title="WhatsApp">WA</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Explore</h4>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="collections.html">Collections</a></li>
        <li><a href="collections.html">Shop All</a></li>
        <li><a href="about.html">About Aaraina</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Help</h4>
      <ul>
        <li><a href="contact.html">Shipping Info</a></li>
        <li><a href="contact.html">Returns &amp; Exchanges</a></li>
        <li><a href="contact.html">Saree Care Guide</a></li>
        <li><a href="contact.html">Custom Orders</a></li>
        <li><a href="contact.html">FAQs</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <p><a href="mailto:info@aaraina.com">info@aaraina.com</a></p>
      <p>India</p>
      <p class="footer-hours">Mon &ndash; Sat, 10am &ndash; 6pm IST</p>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; 2026 Aaraina Sarees. All Rights Reserved.</p>
    <div>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
    </div>
  </div>
</footer>`;

  /* ── INJECT ──────────────────────────────────── */
  function inject() {
    // Nav placeholder — insert at top of <body>
    const navHolder = document.getElementById("nav-placeholder");
    if (navHolder) {
      navHolder.outerHTML = NAV_HTML;
    }

    // Footer placeholder
    const footerHolder = document.getElementById("footer-placeholder");
    if (footerHolder) {
      footerHolder.outerHTML = FOOTER_HTML;
    }

    // After injection, wire up all shared behaviour
    initShared();
  }

  /* ── SHARED BEHAVIOUR ────────────────────────── */
  function initShared() {
    const nav = document.getElementById("mainNav");
    const scrollBar = document.getElementById("scrollBar");
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");
    const mobileClose = document.getElementById("mobileClose");
    const searchBtn = document.getElementById("searchBtn");
    const searchOverlay = document.getElementById("searchOverlay");
    const searchClose = document.getElementById("searchClose");

    /* Scroll — progress bar + nav background */
    if (nav) {
      // Run once on load so the state is correct without scrolling
      const setScrollState = () => {
        const scrolled = window.scrollY > 10;
        nav.classList.toggle("scrolled", scrolled);
        if (scrollBar) {
          const docH =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          scrollBar.style.width =
            docH > 0 ? (window.scrollY / docH) * 100 + "%" : "0%";
        }
      };
      window.addEventListener("scroll", setScrollState, { passive: true });
      setScrollState();
    }

    /* Mobile hamburger */
    if (hamburger && mobileNav) {
      hamburger.addEventListener("click", () => {
        mobileNav.classList.add("open");
        hamburger.setAttribute("aria-label", "Close menu");
      });
    }
    if (mobileClose && mobileNav) {
      mobileClose.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        if (hamburger) hamburger.setAttribute("aria-label", "Open menu");
      });
      // Close on nav-link click
      mobileNav.querySelectorAll(".nav-link").forEach((l) =>
        l.addEventListener("click", () => mobileNav.classList.remove("open"))
      );
    }

    /* Search overlay */
    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener("click", () => {
        searchOverlay.classList.add("open");
        const input = document.getElementById("searchInput");
        if (input) setTimeout(() => input.focus(), 80);
      });
    }
    if (searchClose && searchOverlay) {
      searchClose.addEventListener("click", () =>
        searchOverlay.classList.remove("open")
      );
    }
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchOverlay) {
        searchOverlay.classList.remove("open");
      }
      if (e.key === "Escape" && mobileNav) {
        mobileNav.classList.remove("open");
      }
    });

    /* Fade-in on scroll */
    const faders = document.querySelectorAll(".fade-in");
    if (faders.length) {
      const observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.08 }
      );
      faders.forEach((el) => observer.observe(el));
    }

    /* Store nav counts (store.js must load before components.js) */
    if (window.Store) Store.updateNavCounts();
  }

  /* ── GLOBAL CARD HANDLERS ────────────────────
     Defined globally so inline onclick attrs work. */

  window.handleWish = function (e, btn, id, name, region, price, image) {
    e.preventDefault();
    e.stopPropagation();
    if (Store.isInWishlist(id)) {
      Store.removeFromWishlist(id);
      btn.textContent = "\u2661"; // ♡
      btn.classList.remove("liked");
      Store.showToast("Removed from wishlist");
    } else {
      Store.addToWishlist({ id, name, region, price, image });
      btn.textContent = "\u2665"; // ♥
      btn.classList.add("liked");
    }
  };

  window.handleCart = function (e, id, name, region, price, image) {
    e.preventDefault();
    e.stopPropagation();
    const card = e.target.closest("[data-product-id]");
    const variant = card
      ? (card.querySelector(".card-badge") || {}).textContent?.trim() || "Standard"
      : "Standard";
    Store.addToCart({ id, name, region, price, image, variant });
    const overlay = e.target;
    overlay.textContent = "\u2713 Added"; // ✓
    setTimeout(() => (overlay.textContent = "Add to Cart"), 2000);
  };

  window.handleNewsletter = function (e) {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    if (!btn) return;
    btn.textContent = "\u2713 Subscribed";
    setTimeout(() => {
      e.target.reset();
      btn.textContent = "Subscribe";
    }, 2500);
  };

  /* ── BOOT ────────────────────────────────────── */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
