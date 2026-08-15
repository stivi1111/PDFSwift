/**
 * PDFAXIOM - Official Google AdSense Manager
 * Client ID: ca-pub-2272593869740076
 */
(function() {
  'use strict';

  function initAds() {
    try {
      const ads = document.querySelectorAll('ins.adsbygoogle');
      ads.forEach((ad) => {
        // Push only if not already loaded or processed
        if (!ad.getAttribute('data-adsbygoogle-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    } catch (e) {
      // Ignore adblocker or initialization errors
    }
  }

  function setupStickyAd() {
    const stickyBar = document.getElementById('stickyAdBar');
    const closeBtn = document.getElementById('closeStickyAdBtn');
    if (!stickyBar || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
      stickyBar.style.display = 'none';
      try {
        sessionStorage.setItem('pdfaxiom_sticky_ad_closed', '1');
      } catch (e) {}
    });

    try {
      if (sessionStorage.getItem('pdfaxiom_sticky_ad_closed') === '1') {
        stickyBar.style.display = 'none';
      }
    } catch (e) {}
  }

  // Expose global refresh function when tool workspace or download screen changes
  window.refreshToolAds = function() {
    setTimeout(initAds, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAds();
      setupStickyAd();
    });
  } else {
    initAds();
    setupStickyAd();
  }
})();
