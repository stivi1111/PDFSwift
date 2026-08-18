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

  // pdf.js non c'e' piu' al caricamento della pagina: viene preso da
  // js/librerie.js quando serve, ed e' li' che gli si dice dov'e' il worker.

  // Light / Dark Theme Controller
  const themeToggleBtn = document.getElementById('themeToggleBtn');

  function updateFavicon(theme) {
    const favicon = document.getElementById('dynamicFavicon') || document.querySelector('link[rel="icon"]');
    if (favicon) {
      // Percorso assoluto: da /pdf-to-word/ un "assets/..." relativo veniva
      // cercato in /pdf-to-word/assets/, che non esiste, e l'icona della
      // scheda spariva. Trovato nei 404 registrati da Netlify.
      favicon.href = theme === 'light'
        ? '/assets/favicon-light-mode.png'
        : '/assets/favicon-dark-mode.png';
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

  /** Etichetta tradotta, per i pannelli costruiti a mano qui sotto. */
  const et = (chiave) =>
    window.PDFAxiomI18n ? window.PDFAxiomI18n.t(chiave) : chiave;

  // Tool Definitions Configuration (24 Tools)
  const toolsConfig = {
    'pdf-to-word': { title: 'PDF to Word Converter', desc: 'Convert PDF into editable Microsoft Word (.docx) format.', multiple: false, accept: '.pdf', btnText: 'Convert PDF to Word', outputExt: '.docx' },
    'word-to-pdf': { title: 'Word to PDF Converter', desc: 'Convert Microsoft Word (.docx / .doc) into clean PDF files.', multiple: false, accept: '.docx, .doc', btnText: 'Convert Word to PDF', outputExt: '.pdf' },
    'pdf-to-md': { title: 'PDF to Markdown (AI Ready)', desc: 'Convert PDF into clean Markdown (.md) for ChatGPT, Claude, and Notion.', multiple: false, accept: '.pdf', btnText: 'Convert PDF to Markdown', outputExt: '.md' },
    'md-to-pdf': { title: 'Markdown to PDF Converter', desc: 'Convert Markdown (.md) files into styled PDF documents.', multiple: false, accept: '.md, .markdown, .txt', btnText: 'Convert Markdown to PDF', outputExt: '.pdf' },
    'merge': { title: 'Merge PDF Files', desc: 'Combine multiple PDF documents into one single PDF file.', multiple: true, accept: '.pdf', btnText: 'Merge PDFs', outputExt: '.pdf' },
    'pdf-to-img': { title: 'PDF to JPG / PNG', desc: 'Convert every PDF page into high-res images (ZIP).', multiple: false, accept: '.pdf', btnText: 'Convert to Images', outputExt: '_images.zip' },
    'img-to-pdf': { title: 'Images to PDF', desc: 'Convert photos or scans into a clean PDF document.', multiple: true, accept: 'image/*', btnText: 'Create PDF', outputExt: '_from_images.pdf' },
    'compress': { title: 'Compress PDF', desc: 'Shrink PDF file size while preserving quality.', multiple: false, accept: '.pdf', btnText: 'Compress PDF', outputExt: '_compressed.pdf', settingsHTML: () => `<div class="form-group"><label>${et('impCompressione')}</label><div class="compress-levels"><label class="compress-option" data-level="1"><input type="radio" name="compressLevel" value="leggera"><span class="compress-bars"><i></i><i></i><i></i></span><span class="compress-name">${et('impLeggera')}</span><span class="compress-note">${et('impLeggeraNota')}</span></label><label class="compress-option" data-level="2"><input type="radio" name="compressLevel" value="media" checked><span class="compress-tag">${et('impConsigliata')}</span><span class="compress-bars"><i></i><i></i><i></i></span><span class="compress-name">${et('impMedia')}</span><span class="compress-note">${et('impMediaNota')}</span></label><label class="compress-option" data-level="3"><input type="radio" name="compressLevel" value="massima"><span class="compress-bars"><i></i><i></i><i></i></span><span class="compress-name">${et('impMassima')}</span><span class="compress-note">${et('impMassimaNota')}</span></label></div></div>` },
    'split': { title: 'Split PDF Document', desc: 'Extract specific pages or page ranges from a PDF.', multiple: false, accept: '.pdf', btnText: 'Split PDF', outputExt: '.pdf', settingsHTML: () => `<div class="form-group"><label for="splitPages">${et('impPagineEstrai')}</label><input type="text" id="splitPages" class="form-control" placeholder="1-3, 5"></div>` },
    'pdf-to-excel': { title: 'PDF to Excel Converter', desc: 'Extract PDF tables into editable Excel (.xlsx).', multiple: false, accept: '.pdf', btnText: 'Convert to Excel', outputExt: '.xlsx' },
    'excel-to-pdf': { title: 'Excel to PDF Converter', desc: 'Convert Excel spreadsheets (.xlsx) into clean PDF.', multiple: false, accept: '.xlsx, .xls, .csv', btnText: 'Convert Excel to PDF', outputExt: '.pdf' },
    'pdf-to-pptx': { title: 'PDF to PowerPoint', desc: 'Turn PDF pages into PowerPoint slides (.pptx).', multiple: false, accept: '.pdf', btnText: 'Convert to PowerPoint', outputExt: '.pptx' },
    'pptx-to-pdf': { title: 'PowerPoint to PDF', desc: 'Convert PowerPoint (.pptx) into PDF format.', multiple: false, accept: '.pptx, .ppt', btnText: 'Convert PPTX to PDF', outputExt: '.pdf' },
    // I due pannelli qui sotto sono funzioni, non stringhe: si costruiscono
    // quando lo strumento viene aperto, cosi' le etichette escono nella lingua
    // della pagina. Gli altri restano stringhe fisse, com'erano.
    'page-numbers': { title: 'Add Page Numbers', desc: 'Add page numbers into PDF header or footer.', multiple: false, accept: '.pdf', btnText: 'Add Page Numbers', outputExt: '_numbered.pdf',
      settingsHTML: () => `<div class="form-group"><label>${et('numLabel')}</label><div class="opzioni quattro">${[
        ['solo', '1', 'numSolo', 'numSoloNota', ''],
        ['su-totale', '1 / 14', 'numTotale', 'numTotaleNota', ' checked'],
        ['trattini', '&ndash; 1 &ndash;', 'numTrattini', 'numTrattiniNota', ''],
        ['esteso', 'Page 1 of 14', 'numEsteso', 'numEstesoNota', '']
      ].map(([v, campione, nome, nota, sel]) =>
        `<label class="opzione"><input type="radio" name="pageNumFormat" value="${v}"${sel}><span class="opzione-segno"><span class="opzione-campione">${campione}</span></span><span class="opzione-nome">${et(nome)}</span><span class="opzione-nota">${et(nota)}</span></label>`
      ).join('')}</div></div>` },

    // Le frecce sono quelle sole: niente foglio disegnato attorno, che a
    // questa dimensione confondeva invece di aiutare.
    'rotate': { title: 'Rotate PDF Pages', desc: 'Rotate PDF pages by 90°, 180°, or 270°.', multiple: false, accept: '.pdf', btnText: 'Rotate PDF', outputExt: '_rotated.pdf',
      settingsHTML: () => `<div class="form-group"><label>${et('rotLabel')}</label><div class="opzioni">${[
        ['90', 'rot90r', 'rot90rNota', ' checked',
         '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>'],
        ['180', 'rot180', 'rot180Nota', '',
         '<path d="M21 12a9 9 0 0 1-15.36 6.36"/><path d="M3 12a9 9 0 0 1 15.36-6.36"/><path d="M21 3v6h-6"/><path d="M3 21v-6h6"/>'],
        ['270', 'rot90l', 'rot90lNota', '',
         '<path d="M3 12a9 9 0 1 0 2.64-6.36"/><path d="M3 3v6h6"/>']
      ].map(([v, nome, nota, sel, disegno]) =>
        `<label class="opzione"><input type="radio" name="rotateAngle" value="${v}"${sel}><span class="opzione-segno"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${disegno}</svg></span><span class="opzione-nome">${et(nome)}</span><span class="opzione-nota">${et(nota)}</span></label>`
      ).join('')}</div></div>` },
    'unlock': { title: 'Unlock PDF Restrictions', desc: 'Remove passwords and permissions from PDF.', multiple: false, accept: '.pdf', btnText: 'Unlock PDF', outputExt: '_unlocked.pdf', settingsHTML: () => `<div class="form-group"><label for="pdfPassword">${et('impPasswordAttuale')}</label><input type="password" id="pdfPassword" class="form-control" placeholder="${et('impPasswordSegno')}"></div>` },
    'delete-pages': { title: 'Delete PDF Pages', desc: 'Remove specific unwanted pages from PDF.', multiple: false, accept: '.pdf', btnText: 'Delete Pages', outputExt: '_edited.pdf', settingsHTML: () => `<div class="form-group"><label for="delPages">${et('impPagineElimina')}</label><input type="text" id="delPages" class="form-control" placeholder="1, 3"></div>` },
    'pdf-to-html': { title: 'PDF to HTML', desc: 'Convert PDF into clean web HTML code.', multiple: false, accept: '.pdf', btnText: 'Convert to HTML', outputExt: '.html' },
    'html-to-pdf': { title: 'HTML to PDF', desc: 'Convert HTML code or text into PDF.', multiple: false, accept: '.html, .txt', btnText: 'Convert HTML to PDF', outputExt: '.pdf' },
    'grayscale': { title: 'Grayscale PDF (Black & White)', desc: 'Convert colored PDF into ink-saving Black & White.', multiple: false, accept: '.pdf', btnText: 'Convert to Grayscale', outputExt: '_grayscale.pdf' },
    'extract-images': { title: 'Extract Embedded Images', desc: 'Extract all high-res photos inside a PDF into a ZIP.', multiple: false, accept: '.pdf', btnText: 'Extract Images', outputExt: '_extracted_images.zip' },
    'pdf-to-text': { title: 'Extract PDF Text', desc: 'Extract all readable text into a .txt file.', multiple: false, accept: '.pdf', btnText: 'Extract Text', outputExt: '_text.txt' },
    'protect': { title: 'Protect PDF with Password', desc: 'Encrypt PDF with user password.', multiple: false, accept: '.pdf', btnText: 'Protect PDF', outputExt: '_protected.pdf', settingsHTML: () => `<div class="form-group"><label for="pdfPassword">${et('impPasswordNuova')}</label><input type="password" id="pdfPassword" class="form-control" placeholder="${et('impPasswordSegno')}"></div>` },
    'watermark': { title: 'Add Watermark to PDF', desc: 'Overlay text watermark stamp across PDF pages.', multiple: false, accept: '.pdf', btnText: 'Add Watermark', outputExt: '_watermarked.pdf', settingsHTML: () => `<div class="form-group"><label for="watermarkText">${et('impFiligrana')}</label><input type="text" id="watermarkText" class="form-control" value="CONFIDENTIAL"></div>` }
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

  // Ogni strumento ha una pagina propria, con il proprio testo, titolo e
  // descrizione. Aprirlo cambiando solo l'indirizzo lasciava sotto il testo
  // della pagina di partenza: chi passava da "PDF in Word" a "PDF in JPG" si
  // ritrovava a leggere del Word. Qui i collegamenti tornano collegamenti.
  document.querySelectorAll('.mega-item, .nav-link-btn').forEach(item => {
    if (!item.getAttribute('data-tool')) return;
    item.addEventListener('click', () => {
      // Il menu si chiude comunque: la pagina sta per cambiare.
      document.querySelectorAll('.dropdown-wrapper.active')
        .forEach(d => d.classList.remove('active'));
    });
  });

  // Le schede della griglia sono div, non collegamenti: il salto lo fa il
  // codice. (I collegamenti veri per i motori di ricerca stanno in fondo.)
  document.querySelectorAll('.tool-card').forEach(card => {
    card.addEventListener('click', () => {
      const toolId = card.getAttribute('data-tool');
      const dove = window.PDFAxiomRotte && window.PDFAxiomRotte.indirizzo(toolId);
      if (dove) location.href = dove;
      else openToolWorkspace(toolId);
    });
  });

  // Open Workspace View
  function openToolWorkspace(toolId, silenzioso) {
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

    // Il pannello puo' essere una stringa fissa o una funzione: chi ha
    // etichette da tradurre lo costruisce ora, che e' quando la lingua della
    // pagina e' nota.
    const pannello = typeof config.settingsHTML === 'function'
      ? config.settingsHTML() : (config.settingsHTML || '');
    toolSettings.innerHTML = pannello;
    toolSettings.style.display = pannello ? 'block' : 'none';

    filePreviewList.innerHTML = '';
    downloadBox.style.display = 'none';
    progressContainer.style.display = 'none';
    processBtn.disabled = true;

    heroSection.style.display = 'none';
    const heroAd = document.querySelector('.ad-banner-hero');
    if (heroAd) heroAd.style.display = 'none';
    const catTabs = document.querySelector('.category-tabs');
    if (catTabs) catTabs.style.display = 'none';
    toolsGrid.style.display = 'none';
    const belowGridAd = document.querySelector('.ad-banner-below-grid');
    if (belowGridAd) belowGridAd.style.display = 'none';
    workspace.style.display = 'block';

    // Su "silenzioso" non si scorre: la pagina si e' appena aperta ed e' gia'
    // in cima. Non si tocca nemmeno l'indirizzo, perche' e' gia' quello giusto.
    if (!silenzioso) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Torna alla pagina iniziale della lingua in cui ci si trova.
  const returnHome = () => {
    location.href = window.PDFAxiomRotte ? window.PDFAxiomRotte.casa() : '/';
  };

  backBtn.addEventListener('click', returnHome);
  document.querySelectorAll('.logo').forEach(logoEl => {
    logoEl.addEventListener('click', (e) => {
      e.preventDefault();
      returnHome();
    });
  });

  // Ogni pagina generata dichiara quale strumento rappresenta: si apre subito
  // quello, senza scorrimento e senza toccare la cronologia. Il tasto
  // "indietro" del browser funziona da solo, perche' ogni strumento e' una
  // pagina vera e non una finta navigazione.
  if (window.PDFAXIOM_TOOL && toolsConfig[window.PDFAXIOM_TOOL]) {
    openToolWorkspace(window.PDFAXIOM_TOOL, true);
  }

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

  // Ogni anteprima di immagine crea un riferimento temporaneo al file, e il
  // browser tiene in memoria l'immagine finche' quel riferimento esiste.
  // Ridisegnando l'elenco (a ogni file aggiunto o tolto) se ne creavano di
  // nuovi senza mai liberare i vecchi: venti foto aggiunte una alla volta
  // lasciavano in memoria duecentodieci copie.
  let anteprime = [];

  function renderFilePreviews() {
    anteprime.forEach(URL.revokeObjectURL);
    anteprime = [];
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
        const riferimento = URL.createObjectURL(file);
        anteprime.push(riferimento);
        img.src = riferimento;
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

  // Questi due prendono piu' file ma ne producono uno solo: non passano dal
  // percorso che impacchetta i risultati in un archivio.
  const ESCLUSI_DA_ZIP = ['merge', 'img-to-pdf'];

  /** Traduce nella lingua scelta dall'utente, con ripiego sull'inglese. */
  const tr = (chiave, valori) =>
    window.PDFAxiomI18n ? window.PDFAxiomI18n.t(chiave, valori) : chiave;

  // Execute single file conversion action
  async function runSingleToolAction(toolId, file, updateProgress) {
    // I 14 strumenti pesanti sono elaborati dal backend (vedi js/api-client.js).
    // I restanti 10 girano client-side qui sotto, invariati.
    if (PDFAxiomAPI.isServerTool(toolId)) {
      const extra = {};
      if (toolId === 'protect' || toolId === 'unlock') {
        const pass = document.getElementById('pdfPassword')?.value;
        if (!pass) throw new Error(tr('errPassword'));
        extra.password = pass;
      }
      if (toolId === 'compress') {
        extra.livello = document.querySelector('input[name="compressLevel"]:checked')?.value || 'media';
      }
      return await PDFAxiomAPI.convert(toolId, file, updateProgress, extra);
    }

    switch (toolId) {
      case 'pdf-to-md': return await PDFEngine.pdfToMD(file, updateProgress);
      case 'page-numbers': {
        const formato = document.querySelector('input[name="pageNumFormat"]:checked')?.value || 'su-totale';
        return await PDFEngine.pageNumbersPDF(file, formato, updateProgress);
      }
      case 'rotate': {
        const gradi = parseInt(document.querySelector('input[name="rotateAngle"]:checked')?.value, 10) || 90;
        return await PDFEngine.rotatePDF(file, gradi, updateProgress);
      }
      case 'delete-pages':
        const delStr = document.getElementById('delPages')?.value || '1';
        return await PDFEngine.deletePagesPDF(file, delStr, updateProgress);
      case 'extract-images': return await PDFEngine.extractEmbeddedImages(file, updateProgress);
      case 'split':
        const pagesStr = document.getElementById('splitPages')?.value || '';
        return await PDFEngine.splitPDF(file, pagesStr, updateProgress);
      case 'pdf-to-img': return await PDFEngine.pdfToImages(file, 'png', updateProgress);
      case 'pdf-to-text': return await PDFEngine.pdfToText(file, updateProgress);
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
    progressText.textContent = tr('processingFiles');

    const config = toolsConfig[state.activeTool];

    try {
      // Gli strumenti che lavorano nel browser hanno bisogno di una libreria
      // che la pagina non scarica piu' all'apertura: si prende adesso, che e'
      // il momento in cui l'utente ha davvero deciso di usarla.
      await PDFLibrerie.perStrumento(state.activeTool);

      // Piu' file diventano un archivio ZIP, e questo vale anche per gli
      // strumenti che lavorano sul server, che di per se' non hanno bisogno di
      // nessuna libreria. Senza questa riga, trascinare tre PDF su "PDF in
      // Word" moriva con "JSZip is not defined".
      if (state.files.length > 1 && !ESCLUSI_DA_ZIP.includes(state.activeTool)) {
        await PDFLibrerie.carica('jszip');
      }

      if (state.activeTool === 'merge') {
        const updateProgress = (pct) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = tr('merging', { s: pct });
        };
        state.processedBlob = await PDFEngine.mergePDFs(state.files, updateProgress);
        state.processedFilename = `merged_document.pdf`;
      } else if (state.activeTool === 'img-to-pdf') {
        const updateProgress = (pct) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = tr('fromImages', { s: pct });
        };
        state.processedBlob = await PDFEngine.imagesToPDF(state.files, updateProgress);
        state.processedFilename = `converted_from_images.pdf`;
      } else if (state.files.length === 1) {
        const file = state.files[0];
        const updateProgress = (pct, msg) => {
          progressBarFill.style.width = `${pct}%`;
          progressText.textContent = msg || tr('processingFiles');
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
          progressText.textContent = tr('batch', { i: i + 1, n: totalFiles, name: file.name });

          const fileBlob = await runSingleToolAction(state.activeTool, file, null);
          const baseName = file.name.replace(/\.[^/.]+$/, "");
          const outName = `${baseName}${config.outputExt}`;
          const arrayBuffer = await fileBlob.arrayBuffer();
          zip.file(outName, arrayBuffer);
        }

        progressText.textContent = tr('zipping');
        state.processedBlob = await zip.generateAsync({ type: 'blob' });
        state.processedFilename = `PDFAxiom_Batch_Converted_${state.files.length}_Files.zip`;
      }

      progressBarFill.style.width = '100%';
      progressText.textContent = tr('success');

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

  // La pagina "Chi siamo" e una pagina vera, /about/ o /it/chi-siamo/.
  // Prima questo collegamento apriva una finestra e chiamava preventDefault:
  // il contenuto non era indicizzabile, non aveva un indirizzo proprio e per
  // un revisore non contava come pagina. Ora il collegamento porta dove dice.
});
