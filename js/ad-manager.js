/**
 * PDFAXIOM - Official Google AdSense Manager
 * Client ID: ca-pub-2272593869740076
 */
(function () {
  'use strict';

  // Quanto si aspetta una risposta di AdSense prima di dare il riquadro per
  // vuoto. Mentre laccount e in revisione la risposta non arriva affatto,
  // quindi senza un termine le cornici resterebbero li ad aspettare per
  // sempre.
  const ATTESA = 4000;

  const cornice = (ins) => ins.closest(".ad-banner-wrapper, .ad-skyscraper");

  /* Come e andata per ogni riquadro gia richiesto.

     AdSense scrive da se data-ad-status sul tag <ins>: "filled" se un
     annuncio ce, "unfilled" se ha risposto di no. Se non scrive niente,
     non ha risposto: passata lattesa vale come un no.

     Il riquadro vuoto si nasconde scrivendo display:none in riga. Da foglio
     di stile non si puo: lo script di AdSense mette height: auto !important
     dentro lattributo style della cornice, e in riga e important vince su
     tutto quello che sta in un foglio. */
  function verdetto(scaduta) {
    document.querySelectorAll("ins.adsbygoogle").forEach((ins) => {
      const c = cornice(ins);
      if (!c) return;

      // Solo i riquadri per cui un annuncio e stato davvero chiesto. Quello
      // dello scaricamento, per dire, compare a conversione finita: se lo
      // si desse per vuoto adesso resterebbe nascosto per sempre e non
      // riceverebbe mai un annuncio.
      //
      // Il segno se lo mette questo file, invece di guardare
      // data-adsbygoogle-status che scrive AdSense: se il loro script non
      // parte affatto, cosa che succede con un blocco annunci installato,
      // quellattributo non arriva mai e il riquadro resterebbe li a tenere
      // spazio vuoto per sempre.
      if (!ins.dataset.chiesto) return;

      const stato = ins.getAttribute("data-ad-status");
      if (stato === "filled") {
        c.classList.add("annuncio-pieno");
        c.classList.remove("senza-annuncio");
        c.style.removeProperty("display");
      } else if (stato === "unfilled" || scaduta) {
        c.classList.add("senza-annuncio");
        c.classList.remove("annuncio-pieno");
        c.style.setProperty("display", "none", "important");
      }
    });
  }

  function initAds() {
    try {
      document.querySelectorAll("ins.adsbygoogle").forEach((ad) => {
        if (ad.getAttribute("data-adsbygoogle-status")) return;

        // Un riquadro fuori pagina non va riempito: le regole di AdSense
        // vietano di caricare annunci in contenitori invisibili, e i due
        // laterali stanno a display:none sotto i 1280 pixel.
        //
        // Si guarda la larghezza e basta, non laltezza: le fasce
        // orizzontali sono annunci a misura variabile, partono alte zero ed
        // e AdSense a decidere quanto farle. Scartarle perche alte zero
        // voleva dire non chiedere mai un annuncio per nessuna di loro.
        if (!ad.offsetParent) return;
        if (ad.getBoundingClientRect().width < 1) return;

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        ad.dataset.chiesto = "1";

        // data-ad-status arriva quando arriva: si sta a guardare mentre
        // cambia. Un osservatore per riquadro, e solo la prima volta.
        if (!ad.dataset.osservato) {
          ad.dataset.osservato = "1";
          new MutationObserver(() => verdetto(false)).observe(ad, {
            attributes: true,
            attributeFilter: ["data-ad-status"]
          });
        }
      });

      // Passata lattesa si chiude il conto con quello che ce.
      setTimeout(() => verdetto(true), ATTESA);
    } catch (e) {
      // Un blocco annunci fa fallire tutto questo, ed e giusto cosi: il
      // sito deve continuare a funzionare lo stesso.
    }
  }

  // Chiamata quando compare il pannello di uno strumento o il riquadro di
  // scaricamento, cioe quando entrano in pagina riquadri prima nascosti.
  window.refreshToolAds = function () {
    setTimeout(initAds, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
