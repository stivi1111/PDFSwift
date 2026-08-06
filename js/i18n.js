/**
 * PDFAxiom - 5-Language Internationalization (i18n) Engine
 * Languages: English (EN), Italian (IT), Spanish (ES), German (DE), Chinese (ZH)
 */

const translations = {
  en: {
    heroTitle: "All in One PDF Suite",
    heroDesc: "Convert PDF to Word, Word to PDF, Excel, PowerPoint, Merge, Split, Compress & Edit",
    heroSubtext: "100% free, unlimited use, no signup required.",
    navConvert: "Convert PDF",
    navMergeSplit: "Merge & Split",
    navCompress: "Compress PDF",
    navImages: "Image Tools",
    tabAll: "All Tools (24)",
    tabConvert: "Convert & Office",
    tabOrganize: "Merge & Organize",
    tabSecurity: "Security & Edit",
    dragTitle: "Drag & Drop files here",
    dragSub: "Unlimited files • No file size limits",
    backBtn: "Back to All Tools",
    processBtn: "Process PDF",
    readyTitle: "File is ready!",
    readySub: "Processed safely in your browser.",
    downloadBtn: "Download File",
    resetBtn: "Convert Another File",
    footerCopy: "© 2026 PDFAxiom. 100% Free Forever • No File Limits."
  },
  it: {
    heroTitle: "Suite PDF Tutto in Uno",
    heroDesc: "Converti PDF in Word, Word in PDF, Excel, PowerPoint, Unisci, Dividi, Comprimi e Modifica",
    heroSubtext: "100% gratuito, uso illimitato, nessuna registrazione richiesta.",
    navConvert: "Converti PDF",
    navMergeSplit: "Unisci e Dividi",
    navCompress: "Comprimi PDF",
    navImages: "Strumenti Immagini",
    tabAll: "Tutti i Tool (24)",
    tabConvert: "Conversione & Office",
    tabOrganize: "Unisci & Organizza",
    tabSecurity: "Sicurezza & Modifica",
    dragTitle: "Trascina qui i tuoi file",
    dragSub: "File illimitati • Nessun limite di dimensione",
    backBtn: "Torna a Tutti i Tool",
    processBtn: "Elabora PDF",
    readyTitle: "Il file è pronto!",
    readySub: "Elaborato in modo sicuro nel tuo browser.",
    downloadBtn: "Scarica File",
    resetBtn: "Converti un Altro File",
    footerCopy: "© 2026 PDFAxiom. 100% Gratuito per Sempre • Nessun Limite."
  },
  es: {
    heroTitle: "Suite PDF Todo en Uno",
    heroDesc: "Convierte PDF a Word, Word a PDF, Excel, PowerPoint, Une, Divide, Comprime y Edita",
    heroSubtext: "100% gratuito, uso ilimitado, sin registro.",
    navConvert: "Convertir PDF",
    navMergeSplit: "Unir y Dividir",
    navCompress: "Comprimir PDF",
    navImages: "Herramientas Imagen",
    tabAll: "Todas las Herramientas (24)",
    tabConvert: "Conversión y Office",
    tabOrganize: "Unir y Organizar",
    tabSecurity: "Seguridad y Edición",
    dragTitle: "Arrastra y suelta archivos aquí",
    dragSub: "Archivos ilimitados • Sin límites de tamaño",
    backBtn: "Volver a Todas las Herramientas",
    processBtn: "Procesar PDF",
    readyTitle: "¡El archivo está listo!",
    readySub: "Procesado de forma segura en tu navegador.",
    downloadBtn: "Descargar Archivo",
    resetBtn: "Convertir Otro Archivo",
    footerCopy: "© 2026 PDFAxiom. 100% Gratis para Siempre • Sin Límites."
  },
  de: {
    heroTitle: "Alles in Einem PDF Suite",
    heroDesc: "Konvertieren Sie PDF in Word, Word in PDF, Excel, PowerPoint, Zusammenfügen & Komprimieren",
    heroSubtext: "100% kostenlos, unbegrenzt nutzbar, keine Registrierung erforderlich.",
    navConvert: "PDF Konvertieren",
    navMergeSplit: "Zusammenfügen & Teilen",
    navCompress: "PDF Komprimieren",
    navImages: "Bild-Werkzeuge",
    tabAll: "Alle Werkzeuge (24)",
    tabConvert: "Konvertieren & Office",
    tabOrganize: "Organisieren & Teilen",
    tabSecurity: "Sicherheit & Bearbeiten",
    dragTitle: "Dateien hierhin ziehen",
    dragSub: "Unbegrenzte Dateien • Keine Größenbeschränkung",
    backBtn: "Zurück zu allen Werkzeugen",
    processBtn: "PDF Verarbeiten",
    readyTitle: "Datei ist fertig!",
    readySub: "Sicher im Browser verarbeitet.",
    downloadBtn: "Datei Herunterladen",
    resetBtn: "Weitere Datei Konvertieren",
    footerCopy: "© 2026 PDFAxiom. 100% Kostenlos für Immer • Keine Limits."
  },
  zh: {
    heroTitle: "全功能 PDF 工具箱",
    heroDesc: "转换 PDF 至 Word、Word 转 PDF、Excel、PowerPoint、合并、拆分与压缩",
    heroSubtext: "100% 免费，无限使用，无需注册。",
    navConvert: "转换 PDF",
    navMergeSplit: "合并与拆分",
    navCompress: "压缩 PDF",
    navImages: "图片工具",
    tabAll: "所有工具 (24)",
    tabConvert: "转换与 Office",
    tabOrganize: "合并与组织",
    tabSecurity: "安全与编辑",
    dragTitle: "拖放文件至此处",
    dragSub: "无文件数量与大小限制",
    backBtn: "返回所有工具",
    processBtn: "处理 PDF",
    readyTitle: "文件已就绪！",
    readySub: "在浏览器中安全处理。",
    downloadBtn: "下载文件",
    resetBtn: "转换其他文件",
    footerCopy: "© 2026 PDFAxiom. 永久免费 • 无限制。"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const currentLangText = document.getElementById('currentLangText');
  const langOptions = document.querySelectorAll('.lang-option');

  // Load saved language preference or default to 'en'
  let currentLang = localStorage.getItem('pdfaxiom_lang') || 'en';
  setLanguage(currentLang);

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = opt.getAttribute('data-lang');
      if (selectedLang && translations[selectedLang]) {
        setLanguage(selectedLang);
      }
    });
  });

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('pdfaxiom_lang', lang);
    if (currentLangText) currentLangText.textContent = lang.toUpperCase();

    // Active state in dropdown
    langOptions.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    const t = translations[lang] || translations.en;

    // Update Text Elements
    const heroH1 = document.querySelector('.hero h1');
    if (heroH1) heroH1.textContent = t.heroTitle;

    const heroP = document.querySelector('.hero p');
    if (heroP) heroP.textContent = t.heroDesc;

    const heroSub = document.querySelector('.hero-subtext');
    if (heroSub) heroSub.textContent = t.heroSubtext;

    // Navbar
    const navBtns = document.querySelectorAll('.header-nav .nav-btn span');
    if (navBtns[0]) navBtns[0].textContent = t.navConvert;
    if (navBtns[1]) navBtns[1].textContent = t.navMergeSplit;

    const compressNav = document.querySelector('.header-nav .nav-link-btn span');
    if (compressNav) compressNav.textContent = t.navCompress;

    if (navBtns[2]) navBtns[2].textContent = t.navImages;

    // Category Tabs
    const tabs = document.querySelectorAll('.category-tabs .tab-btn');
    if (tabs[0]) tabs[0].textContent = t.tabAll;
    if (tabs[1]) tabs[1].textContent = t.tabConvert;
    if (tabs[2]) tabs[2].textContent = t.tabOrganize;
    if (tabs[3]) tabs[3].textContent = t.tabSecurity;

    // Dropzone & Actions
    const dropH3 = document.querySelector('.dropzone-text h3');
    if (dropH3) dropH3.textContent = t.dragTitle;

    const dropP = document.querySelector('.dropzone-text p');
    if (dropP) dropP.textContent = t.dragSub;

    const backBtnText = document.querySelector('#backBtn span');
    if (backBtnText) backBtnText.textContent = t.backBtn;

    const processBtnText = document.getElementById('processBtnText');
    if (processBtnText) processBtnText.textContent = t.processBtn;

    const readyH3 = document.querySelector('#downloadBox h3');
    if (readyH3) readyH3.textContent = t.readyTitle;

    const readyP = document.querySelector('#downloadBox p');
    if (readyP) readyP.textContent = t.readySub;

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      const svg = downloadBtn.querySelector('svg');
      downloadBtn.innerHTML = '';
      if (svg) downloadBtn.appendChild(svg.cloneNode(true));
      downloadBtn.appendChild(document.createTextNode(` ${t.downloadBtn}`));
    }

    const resetBtn = document.getElementById('resetToolBtn');
    if (resetBtn) {
      const svg = resetBtn.querySelector('svg');
      resetBtn.innerHTML = '';
      if (svg) resetBtn.appendChild(svg.cloneNode(true));
      resetBtn.appendChild(document.createTextNode(` ${t.resetBtn}`));
    }

    const copyright = document.querySelector('.copyright');
    if (copyright) copyright.textContent = t.footerCopy;
  }
});
