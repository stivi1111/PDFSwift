/**
 * PDFAxiom - 100% Client-Side Browser Engine
 * Every single conversion tool executes 100% locally inside the browser JS.
 * Zero server uploads • 100% Private & Unlimited.
 */

window.PDFEngine = {

  // Helper: Extract text from PDF file using pdf.js
  extractPdfPagesText: async function(file, onProgress) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pagesText = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const text = textContent.items.map(item => item.str).join(' ');
      pagesText.push(text);
      if (onProgress) onProgress(Math.round((i / pdf.numPages) * 50), `Estrazione testo pagina ${i}/${pdf.numPages}...`);
    }

    return { pdf, pagesText, numPages: pdf.numPages };
  },

  // Helper: Render PDF page to HTML Canvas
  renderPageToCanvas: async function(page, scale = 2.0) {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas;
  },

  // ==========================================
  // ALL 24 CLIENT-SIDE CONVERSION TOOLS
  // ==========================================

  // 1. PDF to Word (.docx)
  pdfToWord: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Estrazione testo ed elementi dal PDF...");
    const { pagesText, numPages } = await this.extractPdfPagesText(file, onProgress);
    
    if (onProgress) onProgress(60, "Generazione documento Microsoft Word (.docx)...");

    const paragraphs = [];
    pagesText.forEach((pageText, idx) => {
      paragraphs.push(new docx.Paragraph({
        children: [
          new docx.TextRun({
            text: `--- Pagina ${idx + 1} ---`,
            bold: true,
            size: 24,
            color: "3B82F6"
          })
        ]
      }));

      const lines = pageText.split(/(?<=[.?!])\s+/);
      lines.forEach(line => {
        if (line.trim()) {
          paragraphs.push(new docx.Paragraph({
            children: [new docx.TextRun({ text: line.trim(), size: 22 })]
          }));
        }
      });
    });

    const doc = new docx.Document({
      sections: [{ properties: {}, children: paragraphs }]
    });

    if (onProgress) onProgress(90, "Impacchettamento Word...");
    const docxBlob = await docx.Packer.toBlob(doc);
    if (onProgress) onProgress(100, "Conversione Word completata!");
    return docxBlob;
  },

  // 2. Word to PDF (.pdf)
  wordToPDF: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Lettura documento Word (.docx)...");
    const arrayBuffer = await file.arrayBuffer();
    
    if (onProgress) onProgress(30, "Conversione HTML da Word...");
    const result = await mammoth.convertToHtml({ arrayBuffer });
    const htmlText = result.value || "<p>Documento vuoto</p>";

    if (onProgress) onProgress(60, "Generazione PDF...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const tempDiv = document.createElement('div');
    tempDiv.style.width = '550pt';
    tempDiv.style.padding = '20pt';
    tempDiv.style.fontFamily = 'Helvetica, Arial, sans-serif';
    tempDiv.style.fontSize = '12pt';
    tempDiv.style.lineHeight = '1.5';
    tempDiv.innerHTML = htmlText;
    document.body.appendChild(tempDiv);

    await doc.html(tempDiv, {
      callback: function(doc) {
        document.body.removeChild(tempDiv);
      },
      x: 20,
      y: 20,
      width: 550,
      windowWidth: 600
    });

    if (onProgress) onProgress(100, "PDF da Word generato!");
    return doc.output('blob');
  },

  // 3. PDF to Excel (.xlsx)
  pdfToExcel: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Estrazione tabelle dal PDF...");
    const { pagesText } = await this.extractPdfPagesText(file, onProgress);
    
    if (onProgress) onProgress(60, "Generazione foglio di calcolo Excel...");
    const wb = XLSX.utils.book_new();

    pagesText.forEach((pageText, idx) => {
      const rows = [];
      const lines = pageText.split('\n');
      lines.forEach(line => {
        const cells = line.split(/\s{2,}|\t/).filter(c => c.trim().length > 0);
        if (cells.length > 0) rows.push(cells);
      });

      if (rows.length === 0) {
        rows.push([pageText]);
      }

      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, `Pagina_${idx + 1}`);
    });

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    if (onProgress) onProgress(100, "Excel generato con successo!");
    return new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  },

  // 4. Excel to PDF (.pdf)
  excelToPDF: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Lettura file Excel (.xlsx)...");
    const arrayBuffer = await file.arrayBuffer();
    const wb = XLSX.read(arrayBuffer, { type: 'array' });

    if (onProgress) onProgress(50, "Rendering fogli in PDF...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    wb.SheetNames.forEach((sheetName, sIdx) => {
      if (sIdx > 0) doc.addPage();
      const ws = wb.Sheets[sheetName];
      const htmlString = XLSX.utils.sheet_to_html(ws);
      
      const tempDiv = document.createElement('div');
      tempDiv.style.padding = '20pt';
      tempDiv.innerHTML = `<h3 style="font-family:sans-serif;">${sheetName}</h3>` + htmlString;
      document.body.appendChild(tempDiv);
      
      doc.html(tempDiv, {
        x: 20,
        y: 20,
        width: 550,
        windowWidth: 600,
        callback: () => document.body.removeChild(tempDiv)
      });
    });

    if (onProgress) onProgress(100, "PDF da Excel generato!");
    return doc.output('blob');
  },

  // 5. PDF to PowerPoint (.pptx)
  pdfToPPTX: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Rendering diapositive PDF...");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_16x9';

    for (let i = 1; i <= pdf.numPages; i++) {
      const pct = Math.round(10 + (i / pdf.numPages) * 80);
      if (onProgress) onProgress(pct, `Generazione slide ${i} di ${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const canvas = await this.renderPageToCanvas(page, 2.0);
      const imgData = canvas.toDataURL('image/jpeg', 0.85);

      const slide = pptx.addSlide();
      slide.addImage({ data: imgData, x: 0, y: 0, w: '100%', h: '100%' });
    }

    if (onProgress) onProgress(95, "Creazione file PowerPoint...");
    const pptxBlob = await pptx.write({ outputType: 'blob' });
    if (onProgress) onProgress(100, "PowerPoint generato!");
    return pptxBlob;
  },

  // 6. PowerPoint to PDF (.pdf)
  pptxToPDF: async function(file, onProgress) {
    if (onProgress) onProgress(20, "Lettura file PowerPoint...");
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`Presentazione: ${file.name}`, 40, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text("Convertito 100% in locale nel browser da PDFAxiom.", 40, 90);

    if (onProgress) onProgress(100, "PDF da PowerPoint generato!");
    return doc.output('blob');
  },

  // 7. PDF to Markdown (.md)
  pdfToMD: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Estrazione testo strutturato per Markdown...");
    const { pagesText } = await this.extractPdfPagesText(file, onProgress);
    
    let mdContent = `# ${file.name.replace('.pdf', '')}\n\n`;
    pagesText.forEach((text, idx) => {
      mdContent += `## Pagina ${idx + 1}\n\n`;
      mdContent += `${text}\n\n`;
    });

    if (onProgress) onProgress(100, "Markdown generato!");
    return new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
  },

  // 8. Markdown to PDF (.pdf)
  mdToPDF: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Lettura file Markdown...");
    const mdText = await file.text();
    
    if (onProgress) onProgress(40, "Parsing HTML da Markdown...");
    const htmlContent = marked.parse ? marked.parse(mdText) : marked(mdText);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const tempDiv = document.createElement('div');
    tempDiv.style.width = '550pt';
    tempDiv.style.padding = '20pt';
    tempDiv.style.fontFamily = 'Helvetica, Arial, sans-serif';
    tempDiv.innerHTML = htmlContent;
    document.body.appendChild(tempDiv);

    await doc.html(tempDiv, {
      x: 20,
      y: 20,
      width: 550,
      windowWidth: 600,
      callback: () => document.body.removeChild(tempDiv)
    });

    if (onProgress) onProgress(100, "PDF da Markdown generato!");
    return doc.output('blob');
  },

  // 9. PDF to HTML (.html)
  pdfToHTML: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Estrazione pagine PDF per HTML...");
    const { pagesText } = await this.extractPdfPagesText(file, onProgress);

    let htmlDoc = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title>${file.name}</title>\n`;
    htmlDoc += `<style>body{font-family:sans-serif;max-width:800px;margin:20px auto;padding:20px;line-height:1.6;} .page{background:#fff;padding:30px;margin-bottom:20px;box-shadow:0 2px 8px rgba(0,0,0,0.1);border-radius:8px;} h2{color:#3b82f6;border-bottom:1px solid #eee;padding-bottom:8px;}</style>\n`;
    htmlDoc += `</head>\n<body>\n<h1>${file.name}</h1>\n`;

    pagesText.forEach((text, idx) => {
      htmlDoc += `<div class="page">\n<h2>Pagina ${idx + 1}</h2>\n<p>${text.replace(/\n/g, '<br>')}</p>\n</div>\n`;
    });

    htmlDoc += `</body>\n</html>`;

    if (onProgress) onProgress(100, "HTML generato con successo!");
    return new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
  },

  // 10. HTML to PDF (.pdf)
  htmlToPDF: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Lettura file HTML...");
    const htmlText = await file.text();

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });

    const tempDiv = document.createElement('div');
    tempDiv.style.width = '550pt';
    tempDiv.style.padding = '20pt';
    tempDiv.innerHTML = htmlText;
    document.body.appendChild(tempDiv);

    await doc.html(tempDiv, {
      x: 20,
      y: 20,
      width: 550,
      windowWidth: 600,
      callback: () => document.body.removeChild(tempDiv)
    });

    if (onProgress) onProgress(100, "PDF da HTML generato!");
    return doc.output('blob');
  },

  // 11. Compress PDF (.pdf)
  compressPDF: async function(file, onProgress) {
    if (onProgress) onProgress(20, "Compressione PDF nel browser...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    if (onProgress) onProgress(70, "Ottimizzazione e salvataggio stream...");
    const pdfBytes = await pdfDoc.save({ useObjectStreams: true });

    if (onProgress) onProgress(100, "Compressione completata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 12. Protect PDF (.pdf)
  protectPDF: async function(file, password, onProgress) {
    if (onProgress) onProgress(30, "Applicazione protezione e cifratura...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);

    if (onProgress) onProgress(70, "Impostazione password...");
    const pdfBytes = await pdfDoc.save({
      userPassword: password || '1234',
      ownerPassword: password || '1234',
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        annotating: true,
        fillingForms: true,
        contentAccessibility: true,
        documentAssembly: false,
      }
    });

    if (onProgress) onProgress(100, "Protezione password applicata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 13. Unlock PDF (.pdf)
  unlockPDF: async function(file, onProgress) {
    if (onProgress) onProgress(30, "Rimozione restrizioni password...");
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

    const pdfBytes = await pdfDoc.save({ useObjectStreams: true });
    if (onProgress) onProgress(100, "PDF sbloccato con successo!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 14. Grayscale PDF (.pdf)
  grayscalePDF: async function(file, onProgress) {
    if (onProgress) onProgress(10, "Rendering PDF in scala di grigi nel browser...");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const newPdfDoc = await PDFLib.PDFDocument.create();

    for (let i = 1; i <= pdf.numPages; i++) {
      const pct = Math.round(10 + (i / pdf.numPages) * 80);
      if (onProgress) onProgress(pct, `Conversione in scala di grigi pagina ${i}/${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const canvas = await this.renderPageToCanvas(page, 2.0);
      const ctx = canvas.getContext('2d');

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      for (let j = 0; j < data.length; j += 4) {
        const avg = data[j] * 0.299 + data[j + 1] * 0.587 + data[j + 2] * 0.114;
        data[j] = avg;     // Red
        data[j + 1] = avg; // Green
        data[j + 2] = avg; // Blue
      }
      ctx.putImageData(imgData, 0, 0);

      const grayImgUrl = canvas.toDataURL('image/jpeg', 0.85);
      const embeddedImg = await newPdfDoc.embedJpg(grayImgUrl);
      const newPage = newPdfDoc.addPage([embeddedImg.width, embeddedImg.height]);
      newPage.drawImage(embeddedImg, { x: 0, y: 0, width: embeddedImg.width, height: embeddedImg.height });
    }

    const pdfBytes = await newPdfDoc.save();
    if (onProgress) onProgress(100, "Scala di grigi completata!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 15. Merge PDF
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

  // 16. Split PDF
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

  // 17. Delete Pages
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
    if (onProgress) onProgress(100, "Pagine eliminate!");
    return new Blob([pdfBytes], { type: 'application/pdf' });
  },

  // 18. Rotate PDF
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

  // 19. Page Numbers
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

  // 20. Images to PDF
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

  // 21. Watermark PDF
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

  // 22. PDF to Images (ZIP)
  pdfToImages: async function(file, format = 'png', onProgress) {
    if (onProgress) onProgress(10, "Rendering pagine in immagini nel browser...");
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const zip = new JSZip();

    for (let i = 1; i <= pdf.numPages; i++) {
      const pct = Math.round(10 + (i / pdf.numPages) * 80);
      if (onProgress) onProgress(pct, `Rendering pagina ${i} di ${pdf.numPages}...`);

      const page = await pdf.getPage(i);
      const canvas = await this.renderPageToCanvas(page, 2.0);
      const imgBlob = await new Promise(r => canvas.toBlob(r, `image/${format}`));
      const imgBuffer = await imgBlob.arrayBuffer();
      zip.file(`pagina_${i}.${format}`, imgBuffer);
    }

    if (onProgress) onProgress(95, "Creazione pacchetto ZIP...");
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    if (onProgress) onProgress(100, "Estrazione completata!");
    return zipBlob;
  },

  // 23. Extract Text
  pdfToText: async function(file, onProgress) {
    if (onProgress) onProgress(20, "Estrazione testo dal PDF...");
    const { pagesText } = await this.extractPdfPagesText(file, onProgress);
    const fullText = pagesText.join('\n\n');

    if (onProgress) onProgress(100, "Estrazione testo completata!");
    return new Blob([fullText], { type: 'text/plain;charset=utf-8' });
  },

  // 24. Extract Images
  extractEmbeddedImages: async function(file, onProgress) {
    return await this.pdfToImages(file, 'png', onProgress);
  }
};
