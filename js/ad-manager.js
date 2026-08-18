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

  /* Un riquadro si puo' chiedere solo se e' davvero in pagina e ha una
     larghezza. Le regole di AdSense vietano di caricare annunci dentro
     contenitori invisibili, e i due laterali stanno a display:none sotto i
     1280 pixel.

     Si guarda la larghezza e basta, non l'altezza: le fasce orizzontali sono
     annunci a misura variabile, partono alte zero ed e' AdSense a decidere
     quanto farle. Scartarle perche' alte zero voleva dire non chiedere mai un
     annuncio per nessuna di loro. */
  function richiedibile(ins) {
    if (!ins.offsetParent) return false;
    return ins.getBoundingClientRect().width >= 1;
  }

  /* Tiene la fascia schiacciata finche' un annuncio non c'e' davvero.

     Va scritto in riga e con important perche' lo script di AdSense scrive di
     suo, sempre in riga e sempre con important:

         height: auto !important; max-height: none !important;

     cioe' annulla di proposito qualunque limite messo da un foglio di stile.
     Lo fa appena prende in carico il riquadro, prima di sapere se un annuncio
     ce l'ha: la fascia si apriva a 282 px e si richiudeva due secondi dopo,
     quando si scopriva che annuncio non ce n'era.

     La larghezza non si tocca: e' l'unica misura che AdSense guarda per queste
     fasce. Schiacciarle in altezza non impedisce loro di riempirsi. */
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
      // opposto: la push puo' fallire, e li' il nostro segno non viene messo
      // pur essendo partita la richiesta.
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

  /* Chiede gli annunci.

     La parte delicata e' l'ordine. Una push non dice a quale riquadro si
     riferisce: lo script di AdSense prende il primo <ins> della pagina che non
     ha ancora lavorato e ci mette dentro quella richiesta. Sulle pagine degli
     strumenti i primi due <ins> del documento sono le fasce della pagina
     iniziale, che li' stanno a display:none, e sotto i 1280 pixel lo sono
     anche i due laterali.

     Chiedere per la fascia del pannello significava quindi consegnare la
     richiesta a un riquadro largo zero, e AdSense rispondeva con un errore:

         TagError: adsbygoogle.push() error: No slot size for availableWidth=0

     Due errori per ogni apertura di ogni pagina strumento, su qualunque
     schermo, e le richieste che finivano sul riquadro sbagliato.

     La soluzione e' togliere di mezzo i riquadri non richiedibili che stanno
     davanti a uno richiedibile: gli si scrive addosso data-adsbygoogle-status,
     che e' il segno con cui lo script di AdSense riconosce quelli gia'
     sbrigati, e la coda torna ad allinearsi. Si marcano solo quelli che
     precedono una richiesta vera: un riquadro ancora nascosto ma senza nessuno
     dopo di se' - quello dello scaricamento, per esempio - resta intatto e
     avra' la sua richiesta quando comparira'. */
  function initAds() {
    let elenco;
    try {
      elenco = Array.prototype.slice.call(document.querySelectorAll('ins.adsbygoogle'));
    } catch (e) {
      return;
    }

    const stato = elenco.map((ad) => {
      let buono = false;
      try { buono = richiedibile(ad); } catch (e) { buono = false; }

      // Un riquadro messo da parte prima, tornato in pagina adesso: gli si
      // toglie il segno e rientra in coda. Succede a quello dello
      // scaricamento, che compare solo a conversione finita.
      if (ad.dataset.saltato && buono) {
        ad.removeAttribute('data-adsbygoogle-status');
        delete ad.dataset.saltato;
      }

      return {
        ad: ad,
        sbrigato: !!ad.getAttribute('data-adsbygoogle-status') && !ad.dataset.saltato,
        buono: buono
      };
    });

    // Da destra a sinistra: ognuno sa se piu' avanti c'e' qualcosa da chiedere.
    let seguono = false;
    for (let i = stato.length - 1; i >= 0; i--) {
      stato[i].seguono = seguono;
      if (!stato[i].sbrigato && stato[i].buono) seguono = true;
    }

    stato.forEach((s) => {
      try {
        const c = cornice(s.ad);
        if (c) { schiaccia(c); sorveglia(c); }

        // Gia' preso in carico da AdSense: la richiesta e' partita lo stesso,
        // quindi il verdetto va dato anche a lui.
        if (s.sbrigato) {
          s.ad.dataset.chiesto = '1';
          osserva(s.ad);
          return;
        }

        if (s.buono) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          s.ad.dataset.chiesto = '1';
          osserva(s.ad);
          return;
        }

        // Non richiedibile ma davanti a uno che lo e': va tolto dalla coda,
        // altrimenti si prende lui la richiesta di quell'altro.
        //
        // Il valore e' "done" perche' e' quello che lo script di AdSense
        // riconosce: un valore inventato non lo faceva saltare. Il segno
        // nostro accanto serve a distinguerlo da un riquadro davvero
        // sbrigato, cosi' si puo' rimettere in coda se torna in pagina.
        if (s.seguono) {
          s.ad.setAttribute('data-adsbygoogle-status', 'done');
          s.ad.dataset.saltato = '1';
        }
      } catch (e) {
        // Un blocco annunci fa fallire la push, ed e' giusto cosi': il sito
        // deve funzionare lo stesso. Il riquadro resta senza segno e senza
        // verdetto, cioe' schiacciato e invisibile.
      }
    });

    // Passata l'attesa si chiude il conto con quello che c'e'.
    setTimeout(function () { verdetto(true); }, ATTESA);
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
