/**
 * Corrispondenza fra strumenti e indirizzi pubblici.
 *
 * Prima il sito era una pagina sola: aprire "PDF in Word" non cambiava
 * l'indirizzo, quindi non c'era niente da condividere ne' da indicizzare, e i
 * 24 strumenti contavano come una pagina sola per i motori di ricerca.
 *
 * Lo stesso elenco vive in build/strumenti.js, che genera le pagine. Se qui
 * si aggiunge uno strumento va aggiunto anche li'.
 */
window.PDFAxiomRotte = (() => {
  const PER_STRUMENTO = {
    'pdf-to-word':    'pdf-to-word',
    'word-to-pdf':    'word-to-pdf',
    'pdf-to-excel':   'pdf-to-excel',
    'excel-to-pdf':   'excel-to-pdf',
    'pdf-to-pptx':    'pdf-to-powerpoint',
    'pptx-to-pdf':    'powerpoint-to-pdf',
    'pdf-to-html':    'pdf-to-html',
    'html-to-pdf':    'html-to-pdf',
    'md-to-pdf':      'markdown-to-pdf',
    'compress':       'compress-pdf',
    'protect':        'protect-pdf',
    'unlock':         'unlock-pdf',
    'grayscale':      'grayscale-pdf',
    'ocr':            'ocr-pdf',
    'pdf-to-md':      'pdf-to-markdown',
    'merge':          'merge-pdf',
    'split':          'split-pdf',
    'pdf-to-img':     'pdf-to-jpg',
    'img-to-pdf':     'jpg-to-pdf',
    'rotate':         'rotate-pdf',
    'delete-pages':   'delete-pdf-pages',
    'page-numbers':   'add-page-numbers',
    'watermark':      'watermark-pdf',
    'extract-images': 'extract-images-from-pdf',
    'pdf-to-text':    'pdf-to-text',
  };

  const PER_SLUG = {};
  Object.entries(PER_STRUMENTO).forEach(([id, slug]) => { PER_SLUG[slug] = id; });

  // L'inglese sta nella radice, le altre lingue in una cartella propria.
  const LINGUE = ['it', 'es', 'de', 'zh', 'ro', 'hi', 'ru'];

  /** Il prefisso di lingua dell'indirizzo attuale: '' oppure '/it'. */
  function prefisso() {
    const primo = location.pathname.split('/')[1];
    return LINGUE.includes(primo) ? '/' + primo : '';
  }

  /** L'indirizzo della pagina di uno strumento, nella lingua corrente. */
  function indirizzo(idStrumento) {
    const slug = PER_STRUMENTO[idStrumento];
    return slug ? `${prefisso()}/${slug}/` : null;
  }

  /** La pagina iniziale della lingua corrente. */
  function casa() {
    return (prefisso() || '') + '/';
  }

  /** Quale strumento rappresenta un indirizzo, se ne rappresenta uno. */
  function strumentoDaIndirizzo(percorso) {
    const pezzi = percorso.split('/').filter(Boolean);
    if (pezzi.length && LINGUE.includes(pezzi[0])) pezzi.shift();
    return pezzi.length ? (PER_SLUG[pezzi[0]] || null) : null;
  }

  // Le pagine che esistono in una lingua sola (privacy e condizioni sono
  // scritte in inglese e italiano; le altre lingue rimandano all'inglese).
  const SOLO_DUE_LINGUE = ['privacy', 'terms'];

  /**
   * Lo stesso documento nell'altra lingua.
   *
   * Ogni lingua ha pagine proprie con il proprio testo, quindi cambiare
   * lingua vuol dire spostarsi: da /pdf-to-word/ a /it/pdf-to-word/. Prima si
   * limitava a riscrivere le voci gestite dal codice, e il testo della pagina
   * restava quello di partenza.
   */
  function stessaPaginaIn(lingua) {
    const pezzi = location.pathname.split('/').filter(Boolean);
    if (pezzi.length && LINGUE.includes(pezzi[0])) pezzi.shift();
    const coda = pezzi[0] || '';

    // Un indirizzo che non riconosciamo: si va alla pagina iniziale della
    // lingua scelta, che e' meglio di un 404.
    if (coda && !PER_SLUG[coda] && !SOLO_DUE_LINGUE.includes(coda)) {
      return lingua === 'en' ? '/' : `/${lingua}/`;
    }
    const effettiva = SOLO_DUE_LINGUE.includes(coda) && !['en', 'it'].includes(lingua)
      ? 'en' : lingua;
    const testa = effettiva === 'en' ? '' : `/${effettiva}`;
    return coda ? `${testa}/${coda}/` : `${testa}/`;
  }

  return { indirizzo, casa, strumentoDaIndirizzo, stessaPaginaIn, prefisso,
           PER_STRUMENTO, PER_SLUG, LINGUE };
})();
