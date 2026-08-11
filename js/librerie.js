/**
 * Carica le librerie PDF solo quando servono davvero.
 *
 * Prima la pagina ne scaricava nove, per 949 KB, a ogni visita: sei erano
 * rimaste li' dagli strumenti che oggi girano sul server e non venivano mai
 * eseguite, e le altre tre servivano solo a chi apriva uno degli undici
 * strumenti che lavorano nel browser. Chi arrivava per convertire un PDF in
 * Word — che si fa sul server — le scaricava tutte per niente.
 *
 * Adesso la prima apertura non scarica nessuna libreria: la prima che serve
 * viene presa quando l'utente preme il pulsante, e da li' in poi resta in
 * memoria per il resto della visita.
 */
window.PDFLibrerie = (() => {
  const FONTI = {
    'pdf-lib': 'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js',
    'pdf.js':  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
    'jszip':   'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js',
  };

  const WORKER_PDFJS =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

  // Di quali librerie ha bisogno ciascuno strumento che gira nel browser.
  // Gli strumenti assenti da questa mappa sono quelli elaborati dal server:
  // non hanno bisogno di nulla qui.
  const PER_STRUMENTO = {
    'merge':          ['pdf-lib'],
    'split':          ['pdf-lib'],
    'rotate':         ['pdf-lib'],
    'delete-pages':   ['pdf-lib'],
    'page-numbers':   ['pdf-lib'],
    'watermark':      ['pdf-lib'],
    'img-to-pdf':     ['pdf-lib'],
    'pdf-to-img':     ['pdf.js', 'jszip'],
    'extract-images': ['pdf.js', 'jszip'],
    'pdf-to-text':    ['pdf.js'],
    'pdf-to-md':      ['pdf.js'],
  };

  // Una promessa per libreria: se due strumenti chiedono la stessa cosa nella
  // stessa visita, lo scaricamento avviene una volta sola.
  const avviate = {};

  function carica(nome) {
    if (avviate[nome]) return avviate[nome];

    avviate[nome] = new Promise((risolvi, rifiuta) => {
      const url = FONTI[nome];
      if (!url) {
        rifiuta(new Error(`Libreria sconosciuta: ${nome}`));
        return;
      }
      const tag = document.createElement('script');
      tag.src = url;
      tag.async = true;
      tag.onload = () => {
        // pdf.js rifiuta di aprire un documento finche' non sa dove trovare
        // il proprio worker, e va detto dopo il caricamento, non prima.
        if (nome === 'pdf.js' && window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = WORKER_PDFJS;
        }
        risolvi();
      };
      tag.onerror = () => {
        // Senza questo, un secondo tentativo troverebbe una promessa gia'
        // fallita e non riproverebbe mai.
        delete avviate[nome];
        rifiuta(new Error(`Impossibile caricare ${nome}`));
      };
      document.head.appendChild(tag);
    });

    return avviate[nome];
  }

  /** Attende le librerie necessarie allo strumento indicato. */
  async function perStrumento(idStrumento) {
    const nomi = PER_STRUMENTO[idStrumento];
    if (!nomi || !nomi.length) return;
    await Promise.all(nomi.map(carica));
  }

  return { perStrumento, carica };
})();
