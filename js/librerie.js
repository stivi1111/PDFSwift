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
  /* Le librerie stanno in casa nostra, non su cdnjs e unpkg.

     Tre motivi, in ordine di peso.

     Il primo e' che il worker di pdf.js deve stare sulla nostra stessa
     origine. Un browser non permette di far partire un worker da un altro
     dominio: pdf.js se ne accorge e ripiega sul "fake worker", cioe' esegue
     tutto sul filo principale della pagina. Funziona, ma mentre legge un PDF
     la pagina resta ferma. Da qui invece parte un worker vero, su un thread
     suo.

     Il secondo e' che una rete che blocca cdnjs o unpkg - succede spesso in
     ufficio - lasciava senza undici strumenti su ventiquattro, e senza un
     messaggio che spiegasse il perche'.

     Il terzo e' che il sito promette che il file non lascia il dispositivo.
     E' vero, il file non parte davvero; ma il browser contattava lo stesso
     due terzi estranei per andarlo a lavorare. Adesso no.

     Il numero di versione sta nel nome del file: cambiando versione cambia
     l'indirizzo, e la cache di un anno dichiarata in _headers resta
     corretta. */
  const FONTI = {
    'pdf-lib': '/js/lib/pdf-lib-1.17.1.min.js',
    'pdf.js':  '/js/lib/pdf-3.11.174.min.js',
    'jszip':   '/js/lib/jszip-3.10.1.min.js',
  };

  const WORKER_PDFJS = '/js/lib/pdf.worker-3.11.174.min.js';

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
