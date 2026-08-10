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

  function humanSize(bytes) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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

      xhr.upload.onprogress = (e) => {
        if (!updateProgress || !e.lengthComputable) return;
        // L'upload occupa la prima metà della barra, l'elaborazione la seconda.
        updateProgress(Math.round((e.loaded / e.total) * 50), 'Caricamento file...');
      };

      xhr.upload.onload = () => {
        if (updateProgress) updateProgress(50, 'Elaborazione sul server...');
      };

      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          if (updateProgress) updateProgress(100, 'Completato');
          resolve(xhr.response);
          return;
        }
        reject(new Error(await readError(xhr)));
      };

      xhr.onerror = () => reject(new Error('Impossibile contattare il server di conversione.'));
      xhr.ontimeout = () => reject(new Error('Il server ha impiegato troppo tempo. Riprova con un file più piccolo.'));

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
