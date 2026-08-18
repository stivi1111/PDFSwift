/**
 * PDFAXIOM - Official Google AdSense Manager
 * Client ID: ca-pub-2272593869740076
 */
(function () {
  'use strict';

  // Quanto si aspetta una risposta di AdSense prima di dare il riquadro per
  // vuoto. Mentre l'account e' in revisione la risposta non arriva affatto,
  // quindi senza un termine le cornici resterebbero li' ad aspettare per
  // sempre.
  const ATTESA = 4000;

  const cornice = (ins) => ins.closest('.ad-banner-wrapper, .ad-skyscraper');

  /* data-ad-status arriva quando arriva: si sta a guardare mentre cambia.
     Un osservatore per riquadro, e solo la prima volta. */
  function osserva(ins) {
    if (ins.dataset.osservato) return;
    ins.dataset.osservato = '1';
    new MutationObserver(() => verdetto(false)).observe(ins, {
      attributes: true,
      attributeFilter: ['data-ad-status']
    });
  }

  /* Come e' andata per ogni riquadro per cui un annuncio e' stato chiesto.

     AdSense scrive da se' data-ad-status sul tag <ins>: "filled" se un
     annuncio c'e', "unfilled" se ha risposto di no. Se non scrive niente non
     ha risposto: passata l'attesa vale come un no.

     Il riquadro vuoto si nasconde scrivendo display:none in riga. Da foglio di
     stile non si puo': lo script di AdSense mette height: auto !important
     dentro l'attributo style della cornice, e in riga con important vince su
     qualunque cosa stia in un foglio. */
  function verdetto(scaduta) {
    document.querySelectorAll('ins.adsbygoogle').forEach((ins) => {
      const c = cornice(ins);
      if (!c) return;

      // Solo i riquadri per cui un annuncio e' stato davvero chiesto. Quello
      // dello scaricamento, per dire, compare a conversione finita: darlo per
      // vuoto adesso lo nasconderebbe per sempre.
      //
      // Vale come richiesta l'uno o l'altro dei due segni, e servono
      // entrambi.
      //
      // Il nostro copre il caso del blocco annunci: lo script di AdSense non
      // parte, data-adsbygoogle-status non arriva mai, e senza il nostro segno
      // il riquadro resterebbe li' a tenere spazio vuoto per sempre.
      //
      // Il loro copre il caso opposto: la push puo' fallire, perche' AdSense
      // solleva un errore quando si spinge su un riquadro che ha gia' preso in
      // carico per conto suo. Li' il nostro segno non viene messo, ma
      // l'annuncio e' stato chiesto lo stesso e il riquadro va giudicato.
      if (!ins.dataset.chiesto && !ins.getAttribute('data-adsbygoogle-status')) return;

      const stato = ins.getAttribute('data-ad-status');
      if (stato === 'filled') {
        c.classList.add('annuncio-pieno');
        c.classList.remove('senza-annuncio');
        c.style.removeProperty('display');
      } else if (stato === 'unfilled' || scaduta) {
        c.classList.add('senza-annuncio');
        c.classList.remove('annuncio-pieno');
        c.style.setProperty('display', 'none', 'important');
      }
    });
  }

  function initAds() {
    let ins;
    try {
      ins = document.querySelectorAll('ins.adsbygoogle');
    } catch (e) {
      return;
    }

    ins.forEach((ad) => {
      // Ogni riquadro per conto suo. Prima questo try stava fuori dal ciclo, e
      // bastava che una push fallisse perche' il ciclo morisse li': i riquadri
      // dopo quello non venivano mai richiesti. E le push falliscono davvero,
      // perche' lo script di AdSense solleva un errore quando trova un riquadro
      // che ha gia' preso in carico per conto suo.
      try {
        // Gia' preso in carico da AdSense: la richiesta e' partita lo stesso,
        // quindi il verdetto va dato anche a lui. Rifare la push qui e' proprio
        // il caso che solleva l'errore.
        if (ad.getAttribute('data-adsbygoogle-status')) {
          ad.dataset.chiesto = '1';
          osserva(ad);
          return;
        }

        // Un riquadro fuori pagina non va riempito: le regole di AdSense
        // vietano di caricare annunci in contenitori invisibili, e i due
        // laterali stanno a display:none sotto i 1280 pixel.
        //
        // Si guarda la larghezza e basta, non l'altezza: le fasce orizzontali
        // sono annunci a misura variabile, partono alte zero ed e' AdSense a
        // decidere quanto farle. Scartarle perche' alte zero voleva dire non
        // chiedere mai un annuncio per nessuna di loro.
        if (!ad.offsetParent) return;
        if (ad.getBoundingClientRect().width < 1) return;

        (window.adsbygoogle = window.adsbygoogle || []).push({});
        ad.dataset.chiesto = '1';
        osserva(ad);
      } catch (e) {
        // Un blocco annunci fa fallire la push, ed e' giusto cosi': il sito
        // deve funzionare lo stesso. Il riquadro resta senza segno e senza
        // verdetto, cioe' invisibile ma al suo posto.
      }
    });

    // Passata l'attesa si chiude il conto con quello che c'e'.
    setTimeout(() => verdetto(true), ATTESA);
  }

  // Chiamata quando compare il pannello di uno strumento o il riquadro di
  // scaricamento, cioe' quando entrano in pagina riquadri prima nascosti.
  window.refreshToolAds = function () {
    setTimeout(initAds, 300);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAds);
  } else {
    initAds();
  }
})();
