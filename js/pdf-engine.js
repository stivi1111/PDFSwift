/**
 * PDFAxiom - Hybrid Client-Server Engine
 * 10 Tools Client-Side (Browser JS) • 14 Heavy Tools Server-Side (AWS Microservices API)
 */

window.PDFEngine = {
  
  API_BASE_URL: 'https://3.254.61.27.sslip.io',

  /**
   * Universal Server API Handler for the 14 Server-Side Conversion Tools
   */
  callServerApi: async function(endpointSlug, formData, onProgress) {
    if (onProgress) onProgress(15, "Invio file al server in corso...");

    try {
      const response = await fetch(`${this.API_BASE_URL}/v1/convert/${endpointSlug}`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(`Errore Server (${response.status}): ${errorText || 'Conversione non riuscita'}`);
      }

      if (onProgress) onProgress(90, "Conversione completata! Download in corso...");
      const blob = await response.blob();
      if (onProgress) onProgress(100, "Completato!");
      return blob;
    } catch (err) {
      console.error(`Server API error for ${endpointSlug}:`, err);
      throw err;
    }
  },

  // ==========================================
  // SECTION 1: 14 SERVER-SIDE TOOLS
  // ==========================================

  // 1. PDF to Word
  pdfToWord: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('pdf-to-word', formData, onProgress);
  },

  // 2. PDF to Excel
  pdfToExcel: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('pdf-to-excel', formData, onProgress);
  },

  // 3. PDF to PowerPoint
  pdfToPPTX: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('pdf-to-powerpoint', formData, onProgress);
  },

  // 4. PDF to Markdown
  pdfToMD: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('pdf-to-markdown', formData, onProgress);
  },

  // 5. PDF to HTML
  pdfToHTML: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('pdf-to-html', formData, onProgress);
  },

  // 6. Word to PDF
  wordToPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('word-to-pdf', formData, onProgress);
  },

  // 7. Excel to PDF
  excelToPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('excel-to-pdf', formData, onProgress);
  },

  // 8. PowerPoint to PDF
  pptxToPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('powerpoint-to-pdf', formData, onProgress);
  },

  // 9. Markdown to PDF
  mdToPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('markdown-to-pdf', formData, onProgress);
  },

  // 10. HTML to PDF
  htmlToPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('html-to-pdf', formData, onProgress);
  },

  // 11. Compress PDF
  compressPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('compress-pdf', formData, onProgress);
  },

  // 12. Protect PDF
  protectPDF: async function(file, password, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password || '1234');
    formData.append('keyLength', '256');
    return await this.callServerApi('protect-pdf', formData, onProgress);
  },

  // 13. Unlock PDF
  unlockPDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('unlock-pdf', formData, onProgress);
  },

  // 14. Grayscale PDF
  grayscalePDF: async function(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    return await this.callServerApi('grayscale-pdf', formData, onProgress);
  },

  // ==========================================
  // SECTION 2: 10 CLIENT-SIDE BROWSER TOOLS (UNTOUCHED)
  // ==========================================

  // 1. Merge PDF
  mergePDFs: async function(files, onProgress) {
    if (onProgress) onProgress(10, "Unione PDF in corso nel browser...");
    const mergedPdf = await PDFLib.PDFDocument.create();

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const pct = Math.round(10 + ((i + 1) / files.length) * 80);
      if (onProgress) onProgress(pct, `Unione file ${i + 1} di ${files.length}...`);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    if (onProgress) onProgress(100, "Unione completata!");
    return new Blob([mergedBytes], { type: 'application/pdf' });
  },

  // 2. Split PDF
  splitPDF: async function(file, pageRangeStr, onProgress) {
    if (onProgress) onProgress(20, "Divisione pagine PDF...");
    const arrayBuffer = await file.arrayBuffer();
    const srcPdf = await PDFLib.PDFDocument.load(arrayBuffer);
    const newPdf = await PDFLib.PDFDocument.create();
    const totalPages = srcPdf.getPageCount();

    const pageIndices = [];
    if (!pageRangeStr || !pageRangeStr.trim()) {
      pageIndices.push(0);
    } else {
      const parts = pageRangeStr.split(',');
      parts.forEach(part => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n.trim()) - 1);
          for (let i = Math.max(0, start); i <= Math.min(totalPages - 1, end); i++) {
            pageIndices.push(i);
          }
        } else {
          const idx = parseInt(part.trim()) - 1;
          if (idx >= 0 && idx < totalPages) pageIndices.push(idx);
        }
      });
    }

    const copiedPages = await newPdf.copyPages(srcPdf, pageIndices.length ? pageIndices : [0]);
    copiedPages.forEach(p => newPdf.addPage(p));

    const pdfBytes = await newPdf.save();
    if (onProgress) onProgress(100, "Divisione completata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 3. Delete Pages
  deletePagesPDF: async function(file, pagesToDeleteStr, onProgress) {
    if (onProgress) onProgress(30, "Eliminazione pagine PDF...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    
    const toDelete = pagesToDeleteStr.split(',').map(s => parseInt(s.trim()) - 1).filter(n => !isNaN(n));
    toDelete.sort((a, b) => b - a).forEach(idx => {
      if (idx >= 0 && idx < pdfDoc.getPageCount()) {
        pdfDoc.removePage(idx);
      }
    });

    const pdfBytes = await pdfDoc.save();
    if (onProgress) onProgress(100, "Pagine me eliminate!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 4. Rotate PDF
  rotatePDF: async function(file, degrees = 90, onProgress) {
    if (onProgress) onProgress(30, "Rotazione pagine PDF...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const pages = pdfDoc.getPages();
    pages.forEach(p => p.setRotation(PDFLib.degrees(degrees)));

    const pdfBytes = await pdfDoc.save();
    if (onProgress) onProgress(100, "Rotazione completata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 5. Page Numbers
  pageNumbersPDF: async function(file, onProgress) {
    if (onProgress) onProgress(30, "Aggiunta numeri di pagina...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();

    pages.forEach((page, idx) => {
      const { width } = page.getSize();
      page.drawText(`${idx + 1} / ${pages.length}`, {
        x: width - 60,
        y: 20,
        size: 10,
        font: font,
        color: PDFLib.rgb(0.3, 0.3, 0.3)
      });
    });

    const pdfBytes = await pdfDoc.save();
    if (onProgress) onProgress(100, "Numeri di pagina aggiunti!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 6. Images to PDF
  imagesToPDF: async function(imageFiles, onProgress) {
    if (onProgress) onProgress(10, "Creazione PDF da immagini...");
    const pdfDoc = await PDFLib.PDFDocument.create();

    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const pct = Math.round(10 + ((i + 1) / imageFiles.length) * 80);
      if (onProgress) onProgress(pct, `Aggiunta immagine ${i + 1} di ${imageFiles.length}...`);

      const imgBytes = await file.arrayBuffer();
      let image;
      if (file.type.includes('png')) {
        image = await pdfDoc.embedPng(imgBytes);
      } else {
        image = await pdfDoc.embedJpg(imgBytes);
      }

      const page = pdfDoc.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    }

    const pdfBytes = await pdfDoc.save();
    if (onProgress) onProgress(100, "PDF creato con successo!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 7. Watermark PDF
  watermarkPDF: async function(file, watermarkText = 'CONFIDENTIAL', onProgress) {
    if (onProgress) onProgress(30, "Applicazione filigrana...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
    const font = await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold);
    
    pdfDoc.getPages().forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 4,
        y: height / 2,
        size: 40,
        font: font,
        color: PDFLib.rgb(0.8, 0.2, 0.2),
        opacity: 0.3,
        rotate: PDFLib.degrees(45)
      });
    });

    const pdfBytes = await pdfDoc.save();
    if (onProgress) onProgress(100, "Filigrana applicata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 8. PDF to Images (ZIP)
  pdfToImages: async function(file, format = 'png', onProgress) {
    if (onProgress) onProgress(10, "Rendering pagine in immagini nel browser...");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const zip = new JSZip();

    for (let i = 1; i <= pdf.numPages; i++) {
      const pct = Math.round(10 + (i / pdf.numPages) * 80);
      if (onProgress) onProgress(pct, `Rendering pagina ${i} di ${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport: viewport }).promise;

      const imgBlob = await new Promise(r => canvas.toBlob(r, `image/${format}`));
      const imgBuffer = await imgBlob.arrayBuffer();
      zip.file(`pagina_${i}.${format}`, imgBuffer);
    }

    if (onProgress) onProgress(95, "Creazione pacchetto ZIP...");
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    if (onProgress) onProgress(100, "Estrazione completata!");
    return zipBlob;
  },

  // 9. Extract Text
  pdfToText: async function(file, onProgress) {
    if (onProgress) onProgress(20, "Estrazione testo dal PDF...");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map(it => it.str).join(' ') + '\n\n';
    }

    if (onProgress) onProgress(100, "Estrazione testo completata!");
    return new Blob([fullText], { type: 'text/plain;charset=utf-8' });
  },

  // 10. Extract Images
  extractEmbeddedImages: async function(file, onProgress) {
    return await this.pdfToImages(file, 'png', onProgress);
  }
};
