/**
 * PDFAxiom API client.
 *
 * I 14 strumenti elencati in TOOL_SLUGS vengono elaborati dal backend
 * (conversioni pesanti: LibreOffice, Ghostscript, Docling, Camelot).
 * Gli altri restano client-side in pdf-engine.js.
 */
const PDFAxiomAPI = (() => {
  const API_BASE = 'https://api.pdfaxiom.com';
  const MAX_BYTES = 100 * 1024 * 1024;

  // toolId usato dal sito -> slug dell'endpoint backend
  const TOOL_SLUGS = {
    'pdf-to-word': 'pdf-to-word',
    'pdf-to-excel': 'pdf-to-excel',
    'pdf-to-pptx': 'pdf-to-powerpoint',
    // 'pdf-to-md' resta client-side: il motore Docling occupava 2,8 GB di RAM
    // per questo solo strumento, ed era anche il più lento dei quattordici.
    'pdf-to-html': 'pdf-to-html',
    'word-to-pdf': 'word-to-pdf',
    'excel-to-pdf': 'excel-to-pdf',
    'pptx-to-pdf': 'powerpoint-to-pdf',
    'md-to-pdf': 'markdown-to-pdf',
    'html-to-pdf': 'html-to-pdf',
    'compress': 'compress-pdf',
    'protect': 'protect-pdf',
    'unlock': 'unlock-pdf',
    'grayscale': 'grayscale-pdf'
  };

  const isServerTool = (toolId) => Object.prototype.hasOwnProperty.call(TOOL_SLUGS, toolId);

  // Secondi attesi per MB, misurati sul backend con documenti reali.
  // Servono solo a far avanzare la barra a un ritmo credibile.
  const SECONDS_PER_MB = {
    'pdf-to-word': 7, 'pdf-to-markdown': 6, 'pdf-to-excel': 3,
    'pdf-to-pptx': 3, 'pdf-to-html': 2
  };

  /** Traduce nella lingua scelta dall'utente, con ripiego sull'inglese. */
  function t(chiave, valori) {
    return window.PDFAxiomI18n
      ? window.PDFAxiomI18n.t(chiave, valori)
      : chiave;
  }

  function humanSize(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function estimateSeconds(toolId, bytes) {
    const perMb = SECONDS_PER_MB[toolId] || 1.5;
    return Math.max(3, (bytes / (1024 * 1024)) * perMb);
  }

  /**
   * Invia il file al backend e restituisce il Blob convertito.
   * Usa XMLHttpRequest invece di fetch per avere l'avanzamento reale dell'upload.
   */
  function convert(toolId, file, updateProgress, extraFields) {
    const slug = TOOL_SLUGS[toolId];
    if (!slug) return Promise.reject(new Error(`Tool non gestito dal server: ${toolId}`));

    if (file.size > MAX_BYTES) {
      return Promise.reject(new Error(t('errTooBig', { size: humanSize(file.size) })));
    }

    const form = new FormData();
    form.append('file', file, file.name);
    Object.entries(extraFields || {}).forEach(([k, v]) => form.append(k, v));

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/v1/convert/${slug}`);
      xhr.responseType = 'blob';
      // Allineato al timeout del gateway (300s): se il browser mollasse prima,
      // il server continuerebbe a convertire per nulla, sottraendo CPU agli altri.
      xhr.timeout = 300000;

      let ticker = null;
      const stopTicker = () => { if (ticker) { clearInterval(ticker); ticker = null; } };

      xhr.upload.onprogress = (e) => {
        if (!updateProgress || !e.lengthComputable) return;
        // L'upload occupa il primo 30% della barra, l'elaborazione il resto.
        updateProgress(Math.round((e.loaded / e.total) * 30), t('uploading'));
      };

      // Il server non può comunicare il proprio avanzamento, quindi la barra
      // avanza per stima e mostra i secondi trascorsi: senza questo sembrerebbe
      // bloccata per tutta la durata della conversione.
      xhr.upload.onload = () => {
        if (!updateProgress) return;
        const started = Date.now();
        const estimate = estimateSeconds(toolId, file.size);
        ticker = setInterval(() => {
          const elapsed = (Date.now() - started) / 1000;
          // Asintotico: si avvicina al 95% senza mai raggiungerlo.
          const pct = 30 + Math.round(65 * (1 - Math.exp(-elapsed / estimate)));
          updateProgress(pct, t('processing', { s: Math.round(elapsed) }));
        }, 500);
      };

      xhr.onload = async () => {
        stopTicker();
        if (xhr.status >= 200 && xhr.status < 300) {
          if (updateProgress) updateProgress(100, t('done'));
          resolve(xhr.response);
          return;
        }
        reject(new Error(await readError(xhr)));
      };

      xhr.onerror = () => { stopTicker(); reject(new Error(t('errNetwork'))); };
      xhr.ontimeout = () => { stopTicker(); reject(new Error(t('errTimeout'))); };

      xhr.send(form);
    });
  }

  // Il backend risponde in italiano, perche' e' scritto in italiano. Ma il
  // sito parla otto lingue: a un tedesco non serve la frase italiana, serve
  // sapere QUALE errore e'. Per questo ogni risposta porta anche un codice,
  // e qui lo si traduce. Prima si mostrava il testo del server cosi' com'era,
  // e un russo leggeva "Nessuna tabella rilevata nel PDF".
  const PER_CODICE = {
    troppo_grande:       'errTooBig',
    file_vuoto:          'errFileVuoto',
    formato_errato:      'errFormat',
    password_mancante:   'errPassword',
    password_errata:     'errPasswordErrata',
    troppo_lento:        'errTimeout',
    non_raggiungibile:   'errUnavailable',
    troppe_pagine:       'errTroppePagine',
    pdf_illeggibile:     'errPdfIlleggibile',
    nessuna_tabella:     'errNessunaTabella',
    conversione_fallita: 'errFailed',
    strumento_ignoto:    'errFailed',
    livello_ignoto:      'errFailed',
  };

  /** Il messaggio da mostrare per una risposta di errore, nella lingua giusta. */
  async function readError(xhr) {
    const fallback = {
      413: t('errTooBig', { size: '' }),
      415: t('errFormat'),
      422: t('errFailed'),
      429: t('errRate'),
      502: t('errUnavailable'),
      504: t('errTimeout')
    }[xhr.status] || t('errServer', { code: xhr.status });

    try {
      const parsed = JSON.parse(await xhr.response.text());
      const chiave = PER_CODICE[parsed.codice];
      if (chiave) return t(chiave);
      // Nessun codice riconosciuto: meglio una frase generica nella lingua
      // dell'utente che una precisa in una lingua che non legge.
      return fallback;
    } catch (e) {
      return fallback;
    }
  }

  return { convert, isServerTool, TOOL_SLUGS, API_BASE };
})();
