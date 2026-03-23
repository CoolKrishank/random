/* ═══════════════════════════════════════════════
   AARAINA — Firebase Configuration
   Initialize Firebase Analytics on all pages.

   Auth is handled separately in login.html and
   admin.html via type="module" scripts so that
   auth state loads before the page paints.
   ═══════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBem7oxCbDk_IhkERg0gbGC6quP3Q5szXA",
  authDomain: "aarainasarees.firebaseapp.com",
  projectId: "aarainasarees",
  storageBucket: "aarainasarees.firebasestorage.app",
  messagingSenderId: "441710799102",
  appId: "1:441710799102:web:b0f554795a31b9b7529daf",
  measurementId: "G-4T8HSCX7LZ",
};

// Pinned to a stable, existing SDK version
const _FB_VERSION = "10.12.0";

const _initAnalytics = async () => {
  try {
    const { initializeApp, getApps } = await import(
      `https://www.gstatic.com/firebasejs/${_FB_VERSION}/firebase-app.js`
    );
    const { getAnalytics, isSupported } = await import(
      `https://www.gstatic.com/firebasejs/${_FB_VERSION}/firebase-analytics.js`
    );

    // Avoid duplicate-app error if a module script on the same page
    // already called initializeApp() (e.g. admin.html, login.html)
    const app =
      getApps().length === 0 ? initializeApp(FIREBASE_CONFIG) : getApps()[0];

    if (await isSupported()) {
      window.firebaseAnalytics = getAnalytics(app);
    }
    window.firebaseApp = app;
  } catch (err) {
    // Analytics is non-critical — fail silently in production
    console.warn("[Aaraina] Firebase analytics:", err.message);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _initAnalytics);
} else {
  _initAnalytics();
}
