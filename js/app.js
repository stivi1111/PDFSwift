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

  // Light / Dark Theme Controller (Default: Light Mode)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('pdfaxiom_theme') || 'light';

  // Instant Base64 Favicons for 0ms latency switching
  const favicons = {
    dark: "data:image/png;base64,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",
    light: "data:image/png;base64,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"
  };

  function updateFavicon(theme) {
    const favicon = document.getElementById('dynamicFavicon') || document.querySelector('link[rel="icon"]');
    if (favicon) {
      favicon.href = theme === 'light' ? favicons.light : favicons.dark;
    }
  }

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    updateFavicon('light');
  } else {
    document.documentElement.removeAttribute('data-theme');
    updateFavicon('dark');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      if (activeTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('pdfaxiom_theme', 'dark');
        updateFavicon('dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('pdfaxiom_theme', 'light');
        updateFavicon('light');
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
        const updateProgress = (pct) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = `Processing file... ${pct}%`;
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
          progressText.textContent = `Converting file ${i + 1} of ${totalFiles}: ${file.name}...`;

          const fileBlob = await runSingleToolAction(state.activeTool, file, null);
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const outName = `${baseName}${config.outputExt}`;
          const arrayBuffer = await fileBlob.arrayBuffer();
          zip.file(outName, arrayBuffer);
        }

        progressText.textContent = 'Packaging all converted files into ZIP archive...';
        state.processedBlob = await zip.generateAsync({ type: 'blob' });
        state.processedFilename = `PDFAxiom_Batch_Converted_${state.files.length}_Files.zip`;
      }

      progressBarFill.style.width = '100%';
      progressText.textContent = 'Done! All files ready for download.';

      setTimeout(() => {
        progressContainer.style.display = 'none';
        downloadBox.style.display = 'flex';
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
