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
    'pdf-to-md': 'pdf-to-markdown',
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
      return Promise.reject(new Error(
        `File troppo grande (${humanSize(file.size)}). Il limite è 100 MB.`
      ));
    }

    const form = new FormData();
    form.append('file', file, file.name);
    Object.entries(extraFields || {}).forEach(([k, v]) => form.append(k, v));

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${API_BASE}/v1/convert/${slug}`);
      xhr.responseType = 'blob';
      xhr.timeout = 180000;

      let ticker = null;
      const stopTicker = () => { if (ticker) { clearInterval(ticker); ticker = null; } };

      xhr.upload.onprogress = (e) => {
        if (!updateProgress || !e.lengthComputable) return;
        // L'upload occupa il primo 30% della barra, l'elaborazione il resto.
        updateProgress(Math.round((e.loaded / e.total) * 30), 'Caricamento file...');
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
          updateProgress(pct, `Conversione in corso... ${Math.round(elapsed)}s`);
        }, 500);
      };

      xhr.onload = async () => {
        stopTicker();
        if (xhr.status >= 200 && xhr.status < 300) {
          if (updateProgress) updateProgress(100, 'Completato');
          resolve(xhr.response);
          return;
        }
        reject(new Error(await readError(xhr)));
      };

      xhr.onerror = () => { stopTicker(); reject(new Error('Impossibile contattare il server di conversione.')); };
      xhr.ontimeout = () => { stopTicker(); reject(new Error('Il server ha impiegato troppo tempo. Riprova con un file più piccolo.')); };

      xhr.send(form);
    });
  }

  /** Il backend risponde con {"error": "..."} anche sugli errori: lo estraiamo. */
  async function readError(xhr) {
    const fallback = {
      413: 'File troppo grande. Il limite è 100 MB.',
      415: 'Il contenuto del file non corrisponde al formato atteso.',
      422: 'Conversione non riuscita: il file potrebbe essere danneggiato o protetto.',
      429: 'Troppe richieste. Attendi un minuto e riprova.',
      502: 'Servizio di conversione temporaneamente non disponibile.',
      504: 'Il server ha impiegato troppo tempo.'
    }[xhr.status] || `Errore del server (${xhr.status}).`;

    try {
      const text = await xhr.response.text();
      const parsed = JSON.parse(text);
      return parsed.error || fallback;
    } catch (e) {
      return fallback;
    }
  }

  return { convert, isServerTool, TOOL_SLUGS, API_BASE };
})();
