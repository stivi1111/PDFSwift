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

  /* Le fasce orizzontali stanno nel flusso della pagina: se cambiano altezza,
     tutto quello che sta sotto si sposta. I due laterali no, sono posizionati
     in modo assoluto e non spingono niente, quindi si lasciano stare: la loro
     altezza di 600 px serve davvero, sono annunci a misura fissa. */
  const inFlusso = (c) => c.classList.contains('ad-banner-wrapper');

  /* Tiene la fascia schiacciata finche' un annuncio non c'e' davvero.

     Va scritto in riga e con important perche' lo script di AdSense scrive di
     suo, sempre in riga e sempre con important:

         height: auto !important; max-height: none !important;

     cioe' annulla di proposito qualunque limite messo da un foglio di stile.
     Lo fa appena prende in carico il riquadro, prima di sapere se un annuncio
     ce l'ha: la fascia si apriva a 282 px e si richiudeva due secondi dopo,
     quando si scopriva che annuncio non ce n'era. Due scossoni a pagina gia'
     letta, ed era tutto li' il "sito strano".

     La larghezza non si tocca: e' l'unica misura che AdSense guarda per queste
     fasce, che sono annunci a misura variabile. Schiacciarle in altezza non
     impedisce loro di riempirsi. */
  function schiaccia(c) {
    if (!inFlusso(c)) return;
    if (c.style.getPropertyValue('max-height') === '0px') return;
    c.style.setProperty('max-height', '0px', 'important');
    c.style.setProperty('min-height', '0px', 'important');
    c.style.setProperty('margin-top', '0px', 'important');
    c.style.setProperty('margin-bottom', '0px', 'important');
    c.style.setProperty('padding-top', '0px', 'important');
    c.style.setProperty('padding-bottom', '0px', 'important');
    c.style.setProperty('overflow', 'hidden', 'important');
  }

  /* Annuncio arrivato: la fascia riprende le misure che le danno le regole del
     foglio di stile, ognuna le sue. */
  function libera(c) {
    ['max-height', 'min-height', 'margin-top', 'margin-bottom',
     'padding-top', 'padding-bottom', 'overflow'].forEach((p) => {
      c.style.removeProperty(p);
    });
  }

  /* AdSense riscrive lo stile in riga quando gli pare, anche piu' volte. Si sta
     a guardare l'attributo style e si rimette il limite ogni volta che lo
     toglie, finche' un annuncio non arriva.

     Il controllo dentro schiaccia() evita il rimpallo: se il limite c'e' gia',
     non si riscrive niente e l'osservatore non riparte. */
  function sorveglia(c) {
    if (!inFlusso(c) || c.dataset.sorvegliata) return;
    c.dataset.sorvegliata = '1';
    new MutationObserver(() => {
      if (!c.classList.contains('annuncio-pieno')) schiaccia(c);
    }).observe(c, { attributes: true, attributeFilter: ['style'] });
  }

  /* data-ad-status arriva quando arriva: si sta a guardare mentre cambia. */
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
     ha risposto: passata l'attesa vale come un no. */
  function verdetto(scaduta) {
    document.querySelectorAll('ins.adsbygoogle').forEach((ins) => {
      const c = cornice(ins);
      if (!c) return;

      // Solo i riquadri per cui un annuncio e' stato davvero chiesto. Quello
      // dello scaricamento, per dire, compare a conversione finita: darlo per
      // vuoto adesso lo nasconderebbe per sempre.
      //
      // Vale come richiesta l'uno o l'altro dei due segni, e servono entrambi.
      // Il nostro copre il caso del blocco annunci: lo script di AdSense non
      // parte, data-adsbygoogle-status non arriva mai. Il loro copre il caso
      // opposto: la push puo' fallire, perche' AdSense solleva un errore
      // quando si spinge su un riquadro che ha gia' preso in carico da se',
      // e li' il nostro segno non viene messo pur essendo partita la richiesta.
      if (!ins.dataset.chiesto && !ins.getAttribute('data-adsbygoogle-status')) return;

      const stato = ins.getAttribute('data-ad-status');
      if (stato === 'filled') {
        c.classList.add('annuncio-pieno');
        c.classList.remove('senza-annuncio');
        c.style.removeProperty('display');
        libera(c);
      } else if (stato === 'unfilled' || scaduta) {
        c.classList.add('senza-annuncio');
        c.classList.remove('annuncio-pieno');
        // La fascia e' gia' schiacciata da prima: toglierla del tutto non
        // sposta piu' niente. I laterali invece vanno tolti ora, ma sono
        // fuori dal flusso e non spingono nessuno.
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
        const c = cornice(ad);
        if (c) { schiaccia(c); sorveglia(c); }

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
        // verdetto, cioe' schiacciato e invisibile.
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
