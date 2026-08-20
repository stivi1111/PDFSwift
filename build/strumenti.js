/**
 * I 24 strumenti, con l'indirizzo pubblico di ciascuno.
 *
 * Lo "slug" non coincide sempre con l'identificativo interno: l'indirizzo deve
 * somigliare a come la gente cerca ("pdf-to-jpg", non "pdf-to-img"), mentre
 * l'identificativo resta quello che app.js gia' usa.
 */
// Il "gruppo" serve all'elenco in fondo a ogni pagina: quattro colonne
// ordinate per famiglia, invece di ventiquattro righe tutte uguali che
// cominciano tutte con "Convert".
module.exports = [
  { slug: 'pdf-to-word',              tool: 'pdf-to-word',     motore: 'server',  gruppo: 'daPdf' },
  { slug: 'pdf-to-excel',             tool: 'pdf-to-excel',    motore: 'server',  gruppo: 'daPdf' },
  { slug: 'pdf-to-powerpoint',        tool: 'pdf-to-pptx',     motore: 'server',  gruppo: 'daPdf' },
  { slug: 'pdf-to-markdown',          tool: 'pdf-to-md',       motore: 'browser', gruppo: 'daPdf' },
  { slug: 'pdf-to-html',              tool: 'pdf-to-html',     motore: 'server',  gruppo: 'daPdf' },
  { slug: 'pdf-to-jpg',               tool: 'pdf-to-img',      motore: 'browser', gruppo: 'daPdf' },
  { slug: 'pdf-to-text',              tool: 'pdf-to-text',     motore: 'browser', gruppo: 'daPdf' },

  { slug: 'word-to-pdf',              tool: 'word-to-pdf',     motore: 'server',  gruppo: 'aPdf' },
  { slug: 'excel-to-pdf',             tool: 'excel-to-pdf',    motore: 'server',  gruppo: 'aPdf' },
  { slug: 'powerpoint-to-pdf',        tool: 'pptx-to-pdf',     motore: 'server',  gruppo: 'aPdf' },
  { slug: 'markdown-to-pdf',          tool: 'md-to-pdf',       motore: 'server',  gruppo: 'aPdf' },
  { slug: 'html-to-pdf',              tool: 'html-to-pdf',     motore: 'server',  gruppo: 'aPdf' },
  { slug: 'jpg-to-pdf',               tool: 'img-to-pdf',      motore: 'browser', gruppo: 'aPdf' },

  { slug: 'merge-pdf',                tool: 'merge',           motore: 'browser', gruppo: 'organizza' },
  { slug: 'split-pdf',                tool: 'split',           motore: 'browser', gruppo: 'organizza' },
  { slug: 'delete-pdf-pages',         tool: 'delete-pages',    motore: 'browser', gruppo: 'organizza' },
  { slug: 'rotate-pdf',               tool: 'rotate',          motore: 'browser', gruppo: 'organizza' },
  { slug: 'add-page-numbers',         tool: 'page-numbers',    motore: 'browser', gruppo: 'organizza' },
  { slug: 'extract-images-from-pdf',  tool: 'extract-images',  motore: 'browser', gruppo: 'organizza' },

  { slug: 'compress-pdf',             tool: 'compress',        motore: 'server',  gruppo: 'modifica' },
  { slug: 'protect-pdf',              tool: 'protect',         motore: 'server',  gruppo: 'modifica' },
  { slug: 'unlock-pdf',               tool: 'unlock',          motore: 'server',  gruppo: 'modifica' },
  { slug: 'watermark-pdf',            tool: 'watermark',       motore: 'browser', gruppo: 'modifica' },
  // Da scansione a PDF con il testo dentro. Sta fra gli strumenti di
  // modifica e non fra i convertitori perche' non cambia formato: il PDF
  // entra ed esce PDF, con in piu' un livello di testo invisibile.
  // Nascosto dal sito il 20 agosto 2026 finche' non e' pronto da pubblicare:
  // il servizio sulla VM resta in piedi e risponde, ma nessuna pagina lo
  // mostra. Per rimetterlo: togliere `nascosto` e rimettere 'ocr' in
  // js/rotte.js (la build lo pretende).
  { slug: 'ocr-pdf',                  tool: 'ocr',             motore: 'server',  gruppo: 'modifica', nascosto: true },
  { slug: 'grayscale-pdf',            tool: 'grayscale',       motore: 'server',  gruppo: 'modifica' },
];

// L'ordine delle quattro colonne.
module.exports.GRUPPI = ['daPdf', 'aPdf', 'organizza', 'modifica'];
