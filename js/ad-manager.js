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
          // Un riquadro nascosto non va riempito: le regole di AdSense
          // vietano di caricare annunci in contenitori invisibili, e i due
          // laterali stanno a display:none sotto i 1280 pixel. Prima si
          // spingeva un annuncio in ognuno, visibile o no.
          const riquadro = ad.getBoundingClientRect();
          if (!ad.offsetParent || riquadro.width < 1 || riquadro.height < 1) return;
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      });
    } catch (e) {
      // Ignore adblocker or initialization errors
    }
  }

  // Expose global refresh function when tool workspace or download screen changes
  window.refreshToolAds = function() {
    setTimeout(initAds, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
