/**
 * PDFCraft - Main Application Controller (Expanded 20+ Tools Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    activeTool: null,
    files: [],
    processedBlob: null,
    processedFilename: 'converted.pdf'
  };

  // DOM Elements
  const heroSection = document.getElementById('heroSection');
  const toolsGrid = document.getElementById('toolsGrid');
  const workspace = document.getElementById('toolWorkspace');
  const workspaceTitle = document.getElementById('workspaceTitle');
  const workspaceDesc = document.getElementById('workspaceDesc');
  const backBtn = document.getElementById('backBtn');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const filePreviewList = document.getElementById('filePreviewList');
  const toolSettings = document.getElementById('toolSettings');
  const processBtn = document.getElementById('processBtn');
  const processBtnText = document.getElementById('processBtnText');
  const progressContainer = document.getElementById('progressContainer');
  const progressBarFill = document.getElementById('progressBarFill');
  const progressText = document.getElementById('progressText');
  const downloadBox = document.getElementById('downloadBox');
  const downloadBtn = document.getElementById('downloadBtn');

  // Configure PDF.js Worker
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // Light / Dark Theme Controller
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  function updateFavicon(theme) {
    const favicon = document.getElementById('dynamicFavicon') || document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'light' ? 'assets/favicon-light-mode.png' : 'assets/favicon-dark-mode.png';
    }
  }

  function setTheme(theme) {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('pdfaxiom_theme', 'light');
      updateFavicon('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('pdfaxiom_theme', 'dark');
      updateFavicon('dark');
    }
  }

  // Initialize Saved Theme (Default: Dark Mode or saved preference)
  const savedTheme = localStorage.getItem('pdfaxiom_theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    });
  }

  // Mobile Menu Drawer Handler
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const headerNav = document.querySelector('.header-nav');
  if (mobileMenuBtn && headerNav) {
    function updateMobileBtnState(isOpen) {
      const currentLang = localStorage.getItem('pdfaxiom_lang') || 'en';
      const t = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : { mobileMenu: 'Tools', mobileClose: 'Close' };
      const closeText = t.mobileClose || 'Close';
      const menuText = t.mobileMenu || 'Tools';

      if (isOpen) {
        mobileMenuBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>${closeText}</span>`;
      } else {
        mobileMenuBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg><span>${menuText}</span>`;
      }
    }

    function closeAllMobileSubMenus() {
      document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('active'));
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('active'));
      const isActive = headerNav.classList.contains('active');
      if (isActive) {
        headerNav.classList.remove('active');
        closeAllMobileSubMenus();
        updateMobileBtnState(false);
      } else {
        headerNav.classList.add('active');
        updateMobileBtnState(true);
      }
    });

    document.addEventListener('click', (e) => {
      if (!headerNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        headerNav.classList.remove('active');
        closeAllMobileSubMenus();
        updateMobileBtnState(false);
      }
    });
  }

  // Universal Dropdown Controller (Support BOTH Hover and Click on PC, plus Language Dropdown)
  const allDropdownWrappers = document.querySelectorAll('.dropdown-wrapper');
  allDropdownWrappers.forEach(wrapper => {
    const btn = wrapper.querySelector('.nav-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // If opening language dropdown on mobile, close Tools drawer!
        if (wrapper.classList.contains('lang-dropdown-wrapper') && headerNav) {
          headerNav.classList.remove('active');
          if (typeof updateMobileBtnState === 'function') {
            updateMobileBtnState(false);
          }
        }

        const isSelfActive = wrapper.classList.contains('active');
        allDropdownWrappers.forEach(w => {
          if (w !== wrapper) w.classList.remove('active');
        });

        if (isSelfActive) {
          wrapper.classList.remove('active');
        } else {
          wrapper.classList.add('active');
        }
      });
    }

    // Hover support on PC/Desktop
    wrapper.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        wrapper.classList.add('active');
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        wrapper.classList.remove('active');
      }
    });

    // Auto-close menu when selecting a tool inside dropdown
    const megaItems = wrapper.querySelectorAll('.mega-item');
    megaItems.forEach(item => {
      item.addEventListener('click', () => {
        wrapper.classList.remove('active');
        if (headerNav) headerNav.classList.remove('active');
        if (mobileMenuBtn && typeof updateMobileBtnState === 'function') {
          updateMobileBtnState(false);
        }
      });
    });
  });

  // Tool Definitions Configuration (24 Tools)
  const toolsConfig = {
    'pdf-to-word': { title: 'PDF to Word Converter', desc: 'Convert PDF into editable Microsoft Word (.docx) format.', multiple: false, accept: '.pdf', btnText: 'Convert PDF to Word', outputExt: '.docx' },
    'word-to-pdf': { title: 'Word to PDF Converter', desc: 'Convert Microsoft Word (.docx / .doc) into clean PDF files.', multiple: false, accept: '.docx, .doc', btnText: 'Convert Word to PDF', outputExt: '.pdf' },
    'pdf-to-md': { title: 'PDF to Markdown (AI Ready)', desc: 'Convert PDF into clean Markdown (.md) for ChatGPT, Claude, and Notion.', multiple: false, accept: '.pdf', btnText: 'Convert PDF to Markdown', outputExt: '.md' },
    'md-to-pdf': { title: 'Markdown to PDF Converter', desc: 'Convert Markdown (.md) files into styled PDF documents.', multiple: false, accept: '.md, .markdown, .txt', btnText: 'Convert Markdown to PDF', outputExt: '.pdf' },
    'merge': { title: 'Merge PDF Files', desc: 'Combine multiple PDF documents into one single PDF file.', multiple: true, accept: '.pdf', btnText: 'Merge PDFs', outputExt: '.pdf' },
    'pdf-to-img': { title: 'PDF to JPG / PNG', desc: 'Convert every PDF page into high-res images (ZIP).', multiple: false, accept: '.pdf', btnText: 'Convert to Images', outputExt: '_images.zip' },
    'img-to-pdf': { title: 'Images to PDF', desc: 'Convert photos or scans into a clean PDF document.', multiple: true, accept: 'image/*', btnText: 'Create PDF', outputExt: '_from_images.pdf' },
    'compress': { title: 'Compress PDF', desc: 'Shrink PDF file size while preserving quality.', multiple: false, accept: '.pdf', btnText: 'Compress PDF', outputExt: '_compressed.pdf' },
    'split': { title: 'Split PDF Document', desc: 'Extract specific pages or page ranges from a PDF.', multiple: false, accept: '.pdf', btnText: 'Split PDF', outputExt: '.pdf', settingsHTML: `<div class="form-group"><label for="splitPages">Pages to Extract (e.g. 1-3, 5):</label><input type="text" id="splitPages" class="form-control" placeholder="e.g. 1-3, 5"></div>` },
    'pdf-to-excel': { title: 'PDF to Excel Converter', desc: 'Extract PDF tables into editable Excel (.xlsx).', multiple: false, accept: '.pdf', btnText: 'Convert to Excel', outputExt: '.xlsx' },
    'excel-to-pdf': { title: 'Excel to PDF Converter', desc: 'Convert Excel spreadsheets (.xlsx) into clean PDF.', multiple: false, accept: '.xlsx, .xls, .csv', btnText: 'Convert Excel to PDF', outputExt: '.pdf' },
    'pdf-to-pptx': { title: 'PDF to PowerPoint', desc: 'Turn PDF pages into PowerPoint slides (.pptx).', multiple: false, accept: '.pdf', btnText: 'Convert to PowerPoint', outputExt: '.pptx' },
    'pptx-to-pdf': { title: 'PowerPoint to PDF', desc: 'Convert PowerPoint (.pptx) into PDF format.', multiple: false, accept: '.pptx, .ppt', btnText: 'Convert PPTX to PDF', outputExt: '.pdf' },
    'page-numbers': { title: 'Add Page Numbers', desc: 'Add page numbers into PDF header or footer.', multiple: false, accept: '.pdf', btnText: 'Add Page Numbers', outputExt: '_numbered.pdf' },
    'rotate': { title: 'Rotate PDF Pages', desc: 'Rotate PDF pages by 90°, 180°, or 270°.', multiple: false, accept: '.pdf', btnText: 'Rotate PDF', outputExt: '_rotated.pdf' },
    'unlock': { title: 'Unlock PDF Restrictions', desc: 'Remove passwords and permissions from PDF.', multiple: false, accept: '.pdf', btnText: 'Unlock PDF', outputExt: '_unlocked.pdf' },
    'delete-pages': { title: 'Delete PDF Pages', desc: 'Remove specific unwanted pages from PDF.', multiple: false, accept: '.pdf', btnText: 'Delete Pages', outputExt: '_edited.pdf', settingsHTML: `<div class="form-group"><label for="delPages">Pages to Delete (e.g. 1, 3):</label><input type="text" id="delPages" class="form-control" placeholder="e.g. 1, 3"></div>` },
    'pdf-to-html': { title: 'PDF to HTML', desc: 'Convert PDF into clean web HTML code.', multiple: false, accept: '.pdf', btnText: 'Convert to HTML', outputExt: '.html' },
    'html-to-pdf': { title: 'HTML to PDF', desc: 'Convert HTML code or text into PDF.', multiple: false, accept: '.html, .txt', btnText: 'Convert HTML to PDF', outputExt: '.pdf' },
    'grayscale': { title: 'Grayscale PDF (Black & White)', desc: 'Convert colored PDF into ink-saving Black & White.', multiple: false, accept: '.pdf', btnText: 'Convert to Grayscale', outputExt: '_grayscale.pdf' },
    'extract-images': { title: 'Extract Embedded Images', desc: 'Extract all high-res photos inside a PDF into a ZIP.', multiple: false, accept: '.pdf', btnText: 'Extract Images', outputExt: '_extracted_images.zip' },
    'pdf-to-text': { title: 'Extract PDF Text', desc: 'Extract all readable text into a .txt file.', multiple: false, accept: '.pdf', btnText: 'Extract Text', outputExt: '_text.txt' },
    'protect': { title: 'Protect PDF with Password', desc: 'Encrypt PDF with user password.', multiple: false, accept: '.pdf', btnText: 'Protect PDF', outputExt: '_protected.pdf', settingsHTML: `<div class="form-group"><label for="pdfPassword">Set PDF Password:</label><input type="password" id="pdfPassword" class="form-control" placeholder="Enter password"></div>` },
    'watermark': { title: 'Add Watermark to PDF', desc: 'Overlay text watermark stamp across PDF pages.', multiple: false, accept: '.pdf', btnText: 'Add Watermark', outputExt: '_watermarked.pdf', settingsHTML: `<div class="form-group"><label for="watermarkText">Watermark Text:</label><input type="text" id="watermarkText" class="form-control" value="CONFIDENTIAL"></div>` }
  };

  // Category Filter Tabs
  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');
      document.querySelectorAll('.tool-card').forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Mega Menu & Navbar Link Click Events
  document.querySelectorAll('.mega-item, .nav-link-btn').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const toolId = item.getAttribute('data-tool');
      if (toolId) openToolWorkspace(toolId);
    });
  });

  // Tool Card Click Events
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
      const toolId = card.getAttribute('data-tool');
      openToolWorkspace(toolId);
    });
  });

  // Open Workspace View
  function openToolWorkspace(toolId) {
    const config = toolsConfig[toolId];
    if (!config) return;

    state.activeTool = toolId;
    state.files = [];
    state.processedBlob = null;

    workspaceTitle.textContent = config.title;
    workspaceDesc.textContent = config.desc;
    processBtnText.textContent = config.btnText;
    fileInput.multiple = config.multiple;
    fileInput.accept = config.accept;

    // Server-side privacy badge notice
    const serverTools = ['pdf-to-word', 'pdf-to-excel', 'pdf-to-pptx', 'pdf-to-md', 'pdf-to-html', 'word-to-pdf', 'excel-to-pdf', 'pptx-to-pdf', 'md-to-pdf', 'html-to-pdf', 'compress', 'protect', 'unlock', 'grayscale'];
    let privacyBadge = document.getElementById('privacyNoticeBadge');
    if (serverTools.includes(toolId)) {
      if (!privacyBadge) {
        privacyBadge = document.createElement('div');
        privacyBadge.id = 'privacyNoticeBadge';
        privacyBadge.className = 'privacy-notice-badge';
        privacyBadge.style.cssText = 'margin-top: 0.8rem; padding: 0.6rem 0.9rem; background: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 8px; font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.5rem;';
        workspaceDesc.parentNode.insertBefore(privacyBadge, workspaceDesc.nextSibling);
      }
      privacyBadge.innerHTML = `<span style="font-size: 1.1rem;">🔒</span><span><strong>Privacy & Sicurezza:</strong> Questo strumento elabora il file temporaneamente sui nostri server sicuri in UE e lo cancella automaticamente subito dopo la conversione. Nessun file viene conservato.</span>`;
      privacyBadge.style.display = 'flex';
    } else if (privacyBadge) {
      privacyBadge.style.display = 'none';
    }

    toolSettings.innerHTML = config.settingsHTML || '';
    toolSettings.style.display = config.settingsHTML ? 'block' : 'none';

    filePreviewList.innerHTML = '';
    downloadBox.style.display = 'none';
    progressContainer.style.display = 'none';
    processBtn.disabled = true;

    heroSection.style.display = 'none';
    document.querySelector('.category-tabs').style.display = 'none';
    toolsGrid.style.display = 'none';
    workspace.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Back Button Event & Logo Click to return Home
  const returnHome = () => {
    state.activeTool = null;
    state.files = [];
    workspace.style.display = 'none';
    heroSection.style.display = 'block';
    document.querySelector('.category-tabs').style.display = 'flex';
    toolsGrid.style.display = 'grid';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  backBtn.addEventListener('click', returnHome);
  document.querySelectorAll('.logo').forEach(logoEl => {
    logoEl.addEventListener('click', (e) => {
      e.preventDefault();
      returnHome();
    });
  });

  // Global Drag & Drop Handling across the ENTIRE Window / Page
  dropzone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    window.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    window.addEventListener(eventName, () => {
      dropzone.classList.add('drag-over');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    window.addEventListener(eventName, () => {
      dropzone.classList.remove('drag-over');
    });
  });

  window.addEventListener('drop', (e) => {
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!droppedFiles || droppedFiles.length === 0) return;

    // If on homepage view (no tool open), automatically open matching tool based on file extension
    if (toolWorkspace.style.display === 'none' || !state.activeTool) {
      const ext = droppedFiles[0].name.split('.').pop().toLowerCase();
      let targetTool = 'pdf-to-word';
      if (ext === 'docx' || ext === 'doc') targetTool = 'word-to-pdf';
      else if (ext === 'xlsx' || ext === 'xls') targetTool = 'excel-to-pdf';
      else if (ext === 'pptx' || ext === 'ppt') targetTool = 'pptx-to-pdf';
      else if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) targetTool = 'img-to-pdf';
      else if (ext === 'md') targetTool = 'md-to-pdf';
      else if (ext === 'html' || ext === 'htm') targetTool = 'html-to-pdf';
      else if (droppedFiles.length > 1 && ext === 'pdf') targetTool = 'merge';

      openToolWorkspace(targetTool);
    }

    handleFilesSelected(droppedFiles);
  });

  fileInput.addEventListener('change', (e) => {
    const selectedFiles = Array.from(e.target.files);
    handleFilesSelected(selectedFiles);
    fileInput.value = ''; // Reset input value so subsequent file selections always fire change event
  });

  function handleFilesSelected(newFiles) {
    const config = toolsConfig[state.activeTool];
    if (!config || !newFiles || newFiles.length === 0) return;

    // Accumulate newly selected files into state.files list
    state.files = [...state.files, ...newFiles];

    renderFilePreviews();
    processBtn.disabled = state.files.length === 0;
  }

  function renderFilePreviews() {
    filePreviewList.innerHTML = '';
    state.files.forEach((file, index) => {
      const card = document.createElement('div');
      card.className = 'file-preview-card';
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-file-btn';
      removeBtn.innerHTML = '&times;';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.files.splice(index, 1);
        renderFilePreviews();
        processBtn.disabled = state.files.length === 0;
      });

      const nameEl = document.createElement('div');
      nameEl.className = 'file-preview-name';
      nameEl.textContent = file.name;

      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        card.appendChild(img);
      } else {
        const iconDiv = document.createElement('div');
        iconDiv.style.fontSize = '2rem';
        iconDiv.style.color = 'var(--text-primary)';
        iconDiv.innerHTML = '📄';
        card.appendChild(iconDiv);
      }

      card.appendChild(removeBtn);
      card.appendChild(nameEl);
      filePreviewList.appendChild(card);
    });
  }

  // Execute single file conversion action
  async function runSingleToolAction(toolId, file, updateProgress) {
    switch (toolId) {
      case 'pdf-to-word': return await PDFEngine.pdfToWord(file, updateProgress);
      case 'word-to-pdf': return await PDFEngine.wordToPDF(file, updateProgress);
      case 'pdf-to-md': return await PDFEngine.pdfToMD(file, updateProgress);
      case 'md-to-pdf': return await PDFEngine.mdToPDF(file, updateProgress);
      case 'pdf-to-excel': return await PDFEngine.pdfToExcel(file, updateProgress);
      case 'excel-to-pdf': return await PDFEngine.excelToPDF(file, updateProgress);
      case 'pdf-to-pptx': return await PDFEngine.pdfToPPTX(file, updateProgress);
      case 'pptx-to-pdf': return await PDFEngine.pptxToPDF(file, updateProgress);
      case 'page-numbers': return await PDFEngine.pageNumbersPDF(file, updateProgress);
      case 'rotate': return await PDFEngine.rotatePDF(file, 90, updateProgress);
      case 'unlock': return await PDFEngine.unlockPDF(file, updateProgress);
      case 'delete-pages':
        const delStr = document.getElementById('delPages')?.value || '1';
        return await PDFEngine.deletePagesPDF(file, delStr, updateProgress);
      case 'pdf-to-html': return await PDFEngine.pdfToHTML(file, updateProgress);
      case 'html-to-pdf': return await PDFEngine.htmlToPDF(file, updateProgress);
      case 'grayscale': return await PDFEngine.grayscalePDF(file, updateProgress);
      case 'extract-images': return await PDFEngine.extractEmbeddedImages(file, updateProgress);
      case 'split':
        const pagesStr = document.getElementById('splitPages')?.value || '';
        return await PDFEngine.splitPDF(file, pagesStr, updateProgress);
      case 'compress': return await PDFEngine.compressPDF(file, updateProgress);
      case 'pdf-to-img': return await PDFEngine.pdfToImages(file, 'png', updateProgress);
      case 'pdf-to-text': return await PDFEngine.pdfToText(file, updateProgress);
      case 'protect':
        const pass = document.getElementById('pdfPassword')?.value;
        if (!pass) throw new Error("Please enter a password.");
        return await PDFEngine.protectPDF(file, pass, updateProgress);
      case 'watermark':
        const wmText = document.getElementById('watermarkText')?.value || 'CONFIDENTIAL';
        return await PDFEngine.watermarkPDF(file, wmText, updateProgress);
      default: throw new Error("Invalid tool selected.");
    }
  }

  // Process Tool Action Switcher (Supports Single & Batch Multi-File ZIP Downloads)
  processBtn.addEventListener('click', async () => {
    if (state.files.length === 0) return;

    processBtn.disabled = true;
    progressContainer.style.display = 'block';
    downloadBox.style.display = 'none';
    progressBarFill.style.width = '0%';
    progressText.textContent = 'Processing files client-side...';

    const config = toolsConfig[state.activeTool];

    try {
      if (state.activeTool === 'merge') {
        const updateProgress = (pct) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = `Merging PDF files... ${pct}%`;
        };
        state.processedBlob = await PDFEngine.mergePDFs(state.files, updateProgress);
        state.processedFilename = `merged_document.pdf`;
      } else if (state.activeTool === 'img-to-pdf') {
        const updateProgress = (pct) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = `Creating PDF from images... ${pct}%`;
        };
        state.processedBlob = await PDFEngine.imagesToPDF(state.files, updateProgress);
        state.processedFilename = `converted_from_images.pdf`;
      } else if (state.files.length === 1) {
        const file = state.files[0];
        const updateProgress = (pct, msg) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = msg ? `${msg} ${pct}%` : `Elaborazione file... ${pct}%`;
        };
        const baseName = file.name.replace(/\.[^/.]+$/, "");
        state.processedFilename = `${baseName}${config.outputExt}`;
        state.processedBlob = await runSingleToolAction(state.activeTool, file, updateProgress);
      } else {
        // Multi-File Batch Converter: Convert all files & package into single ZIP download
        const zip = new JSZip();
        const totalFiles = state.files.length;

        for (let i = 0; i < totalFiles; i++) {
          const file = state.files[i];
          const pct = Math.round(((i + 1) / totalFiles) * 100);
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = `Conversione file ${i + 1} di ${totalFiles}: ${file.name}...`;

          const fileBlob = await runSingleToolAction(state.activeTool, file, null);
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const outName = `${baseName}${config.outputExt}`;
          const arrayBuffer = await fileBlob.arrayBuffer();
          zip.file(outName, arrayBuffer);
        }

        progressText.textContent = 'Creazione pacchetto ZIP...';
        state.processedBlob = await zip.generateAsync({ type: 'blob' });
        state.processedFilename = `PDFAxiom_Batch_Converted_${state.files.length}_Files.zip`;
      }

      progressBarFill.style.width = '100%';
      progressText.textContent = 'Conversione completata con successo!';

      setTimeout(() => {
        progressContainer.style.display = 'none';
        downloadBox.style.display = 'flex';
        // Auto-trigger automatic browser file download
        if (downloadBtn) downloadBtn.click();
      }, 500);

    } catch (err) {
      alert(`Error: ${err.message || 'Failed to process files.'}`);
      progressContainer.style.display = 'none';
      processBtn.disabled = false;
    }
  });

  // Download Trigger
  downloadBtn.addEventListener('click', () => {
    if (!state.processedBlob) return;
    const url = URL.createObjectURL(state.processedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.processedFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // Reset Tool & Convert Another File Trigger
  const resetToolBtn = document.getElementById('resetToolBtn');
  if (resetToolBtn) {
    resetToolBtn.addEventListener('click', () => {
      state.files = [];
      state.processedBlob = null;
      state.processedFilename = '';
      downloadBox.style.display = 'none';
      progressContainer.style.display = 'none';
      fileInput.value = '';
      renderFilePreviews();
      processBtn.disabled = true;
    });
  }

  // About Us Modal Handler
  const aboutUsLink = document.getElementById('aboutUsLink');
  const aboutModal = document.getElementById('aboutModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  function openAboutModal() {
    if (aboutModal) aboutModal.classList.add('active');
  }

  function closeAboutModal() {
    if (aboutModal) aboutModal.classList.remove('active');
  }

  if (aboutUsLink) {
    aboutUsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openAboutModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeAboutModal);
  }

  if (aboutModal) {
    aboutModal.addEventListener('click', (e) => {
      if (e.target === aboutModal) closeAboutModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal && aboutModal.classList.contains('active')) {
      closeAboutModal();
    }
  });
});
