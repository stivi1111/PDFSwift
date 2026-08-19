/* Generato da build/genera.js: le traduzioni per "ro".
   Non modificarlo a mano, le traduzioni stanno in js/i18n.js. */
const LINGUE_PDFAXIOM = ["en","it","es","de","zh","ro","hi","ru"];

const translations = {"en":{"heroTitle":"PDFAXIOM All in One","heroDesc":"Convert, edit, compress and secure your PDF files in seconds, no signup needed.","heroSubtext":"","navConvert":"Convert PDF","navMergeSplit":"Merge & Split","navEdit":"Edit & Security","navCompress":"Compress PDF","navImages":"Image Tools","mobileMenu":"Tools","mobileClose":"Close","tabAll":"All Tools","tabConvert":"Convert & Office","tabOrganize":"Merge & Organize","tabSecurity":"Security & Edit","dragTitle":"Drag & Drop files here","dragSub":"Multiple files • Up to 100 MB each","backBtn":"Back to All Tools","processBtn":"Process PDF","readyTitle":"File is ready!","readySub":"Your file is ready to download.","downloadBtn":"Download File","resetBtn":"Convert Another File","footerCopy":"© 2026 PDFAxiom. Free • No signup required.","extTitle":"PDFAxiom for Chrome","extSub":"Your tools one click away, in every tab.","extBtn":"Add to Chrome"},"ro":{"heroTitle":"PDFAXIOM Totul în Unul","heroDesc":"Convertește, editează, comprimă și securizează fișierele PDF în câteva secunde, fără înregistrare.","heroSubtext":"","navConvert":"Convertește PDF","navMergeSplit":"Unește & Divide","navEdit":"Editare & Securitate","navCompress":"Comprimă PDF","navImages":"Instrumente Imagini","mobileMenu":"Instrumente","mobileClose":"Închide","tabAll":"Toate Instrumentele","tabConvert":"Conversie & Office","tabOrganize":"Unește & Organizează","tabSecurity":"Securitate & Editare","dragTitle":"Trage și plasează fișierele aici","dragSub":"Mai multe fișiere • Până la 100 MB fiecare","backBtn":"Înapoi la toate instrumentele","processBtn":"Procesează PDF","readyTitle":"Fișierul este gata!","readySub":"Fișierul tău este gata de descărcare.","downloadBtn":"Descarcă Fișierul","resetBtn":"Convertește alt fișier","footerCopy":"© 2026 PDFAxiom. Gratuit • Fără înregistrare.","extTitle":"PDFAxiom pentru Chrome","extSub":"Instrumentele tale la un clic, în orice filă.","extBtn":"Adaugă în Chrome"}};
const toolTranslations = {"en":{"pdf-to-word":{"title":"PDF to Word","desc":"Convert PDF files to editable Word documents (.docx)."},"word-to-pdf":{"title":"Word to PDF","desc":"Convert Word documents (.docx) to PDF format."},"img-to-pdf":{"title":"Images to PDF","desc":"Convert JPG, PNG, WEBP images into a PDF document."},"pdf-to-img":{"title":"PDF to JPG / PNG","desc":"Extract PDF pages into high-resolution JPG or PNG images."},"merge":{"title":"Merge PDF","desc":"Combine multiple PDF files into one single document."},"compress":{"title":"Compress PDF","desc":"Reduce PDF file size while maintaining maximum quality."},"split":{"title":"Split PDF","desc":"Separate PDF pages or extract custom page ranges."},"delete-pages":{"title":"Delete Pages","desc":"Remove unwanted pages from a PDF document."},"pdf-to-excel":{"title":"PDF to Excel","desc":"Extract PDF tables into Excel (.xlsx / .csv)."},"excel-to-pdf":{"title":"Excel to PDF","desc":"Convert Excel spreadsheets (.xlsx) to PDF."},"pdf-to-pptx":{"title":"PDF to PowerPoint","desc":"Turn PDF pages into PowerPoint slides (.pptx)."},"pptx-to-pdf":{"title":"PowerPoint to PDF","desc":"Convert PowerPoint (.pptx) into PDF file."},"unlock":{"title":"Unlock PDF","desc":"Remove security passwords & restrictions from PDF."},"protect":{"title":"Protect PDF","desc":"Encrypt PDF with custom user password."},"rotate":{"title":"Rotate PDF","desc":"Rotate PDF pages 90°, 180°, or 270° degrees."},"page-numbers":{"title":"Page Numbers","desc":"Add page numbers into your PDF document header/footer."},"watermark":{"title":"Watermark PDF","desc":"Add custom text watermark across PDF pages."},"ocr":{"title":"OCR PDF","desc":"Make a scanned PDF searchable, selectable and copyable."},"grayscale":{"title":"Grayscale PDF","desc":"Convert colored PDF documents into Black & White."},"pdf-to-html":{"title":"PDF to HTML","desc":"Convert PDF documents into web-ready HTML code."},"html-to-pdf":{"title":"HTML to PDF","desc":"Convert web HTML text code into a PDF file."},"pdf-to-md":{"title":"PDF to Markdown","desc":"Convert PDF into clean Markdown (.md) for LLMs & Notion."},"md-to-pdf":{"title":"Markdown to PDF","desc":"Convert Markdown (.md) files into styled PDF documents."},"pdf-to-text":{"title":"Extract Text","desc":"Extract plain raw text (.txt) content from PDF."},"extract-images":{"title":"Extract Images","desc":"Extract all embedded image assets inside PDF."}},"ro":{"pdf-to-word":{"title":"PDF în Word","desc":"Convertește fișiere PDF în documente Word editabile (.docx)."},"word-to-pdf":{"title":"Word în PDF","desc":"Convertește documente Word (.docx) în format PDF."},"img-to-pdf":{"title":"Imagini în PDF","desc":"Convertește imagini JPG, PNG, WEBP într-un document PDF."},"pdf-to-img":{"title":"PDF în JPG / PNG","desc":"Extrage paginile PDF în imagini JPG sau PNG de înaltă rezoluție."},"merge":{"title":"Unește PDF","desc":"Combină mai multe fișiere PDF într-un singur document."},"compress":{"title":"Comprimă PDF","desc":"Reduce dimensiunea fișierului PDF păstrând calitatea maximă."},"split":{"title":"Divide PDF","desc":"Separă paginile PDF sau extrage intervale personalizate."},"delete-pages":{"title":"Șterge Pagini","desc":"Elimină paginile nedorite dintr-un document PDF."},"pdf-to-excel":{"title":"PDF în Excel","desc":"Extrage tabelele PDF în Excel (.xlsx / .csv)."},"excel-to-pdf":{"title":"Excel în PDF","desc":"Convertește foile de calcul Excel (.xlsx) în PDF."},"pdf-to-pptx":{"title":"PDF în PowerPoint","desc":"Transformă paginile PDF în diapoze PowerPoint (.pptx)."},"pptx-to-pdf":{"title":"PowerPoint în PDF","desc":"Convertește prezentările PowerPoint (.pptx) în PDF."},"unlock":{"title":"Deblochează PDF","desc":"Elimină parolele de securitate și restricțiile din PDF."},"protect":{"title":"Protejează PDF","desc":"Criptează PDF-ul cu o parolă personalizată."},"rotate":{"title":"Rotește PDF","desc":"Rotește paginile PDF cu 90°, 180° sau 270°."},"page-numbers":{"title":"Numere de Pagină","desc":"Adaugă numere de pagină în antet sau subsol."},"watermark":{"title":"Filigran PDF","desc":"Adaugă un filigran de text personalizat pe paginile PDF."},"ocr":{"title":"PDF căutabil (OCR)","desc":"Fă un PDF scanat căutabil, selectabil și copiabil."},"grayscale":{"title":"PDF Alb-Negru","desc":"Convertește PDF-urile color în Alb și Negru (Grayscale)."},"pdf-to-html":{"title":"PDF în HTML","desc":"Convertește documentele PDF în cod web HTML."},"html-to-pdf":{"title":"HTML în PDF","desc":"Convertește codul text HTML într-un fișier PDF."},"pdf-to-md":{"title":"PDF în Markdown","desc":"Convertește PDF în Markdown curat (.md) pentru AI & Notion."},"md-to-pdf":{"title":"Markdown în PDF","desc":"Convertește fișierele Markdown (.md) în PDF stilizat."},"pdf-to-text":{"title":"Extrage Text","desc":"Extrage conținutul de text brut (.txt) din PDF."},"extract-images":{"title":"Extrage Imagini","desc":"Extrage toate imaginile încorporate din PDF."}}};
const toolButtons = {"en":{"pdf-to-word":"Convert PDF to Word","word-to-pdf":"Convert Word to PDF","pdf-to-md":"Convert PDF to Markdown","md-to-pdf":"Convert Markdown to PDF","merge":"Merge PDFs","pdf-to-img":"Convert to Images","img-to-pdf":"Create PDF","compress":"Compress PDF","split":"Split PDF","pdf-to-excel":"Convert to Excel","excel-to-pdf":"Convert Excel to PDF","pdf-to-pptx":"Convert to PowerPoint","pptx-to-pdf":"Convert PowerPoint to PDF","page-numbers":"Add Page Numbers","rotate":"Rotate PDF","unlock":"Unlock PDF","delete-pages":"Delete Pages","pdf-to-html":"Convert to HTML","html-to-pdf":"Convert HTML to PDF","ocr":"Make Searchable","grayscale":"Convert to Grayscale","extract-images":"Extract Images","pdf-to-text":"Extract Text","protect":"Protect PDF","watermark":"Add Watermark"},"ro":{"pdf-to-word":"Convertește PDF în Word","word-to-pdf":"Convertește Word în PDF","pdf-to-md":"Convertește PDF în Markdown","md-to-pdf":"Convertește Markdown în PDF","merge":"Îmbină PDF-urile","pdf-to-img":"Convertește în imagini","img-to-pdf":"Creează PDF-ul","compress":"Comprimă PDF-ul","split":"Împarte PDF-ul","pdf-to-excel":"Convertește în Excel","excel-to-pdf":"Convertește Excel în PDF","pdf-to-pptx":"Convertește în PowerPoint","pptx-to-pdf":"Convertește PowerPoint în PDF","page-numbers":"Adaugă numerele paginilor","rotate":"Rotește PDF-ul","unlock":"Deblochează PDF-ul","delete-pages":"Șterge paginile","pdf-to-html":"Convertește în HTML","html-to-pdf":"Convertește HTML în PDF","ocr":"Fă căutabil","grayscale":"Convertește în alb-negru","extract-images":"Extrage imaginile","pdf-to-text":"Extrage textul","protect":"Protejează PDF-ul","watermark":"Adaugă filigranul"}};
const uiMessages = {"en":{"errGenerico":"Something went wrong. Please try again.","menuDaPdf":"CONVERT FROM PDF","menuAPdf":"CONVERT TO PDF","chiSiamo":"About Us","missioneTitolo":"Our Mission","missioneTesto":"PDFAxiom offers a free PDF suite, accessible from any device without registration.","privacyTitolo":"How we handle your files","privacyTesto":"Most tools process your documents directly in your browser: those files never leave your device. The heavier conversions (Word, Excel, PowerPoint, HTML, compression, protection) run on our servers: the file is processed and deleted immediately afterwards, never stored or shared.","contattiTitolo":"Contact &amp; Support","contattiTesto":"Have questions, suggestions, or requests? Write to us at {email}.","badgePopolare":"POPULAR","badgeOffice":"OFFICE","badgeSlides":"SLIDES","badgeAi":"AI READY","badgeImmagini":"IMAGES","pubblicita":"ADVERTISEMENT","pubblicitaBreve":"AD","piedeGratis":"Free • No signup required.","piedePrivacy":"Privacy","piedeTermini":"Terms","impCompressione":"Compression level","impLeggera":"Light","impLeggeraNota":"Keeps print quality","impMedia":"Balanced","impMediaNota":"Great for print &amp; sharing","impMassima":"Maximum","impMassimaNota":"Smallest file, screen &amp; email","impConsigliata":"Recommended","impPagineEstrai":"Pages to extract (e.g. 1-3, 5)","impPagineElimina":"Pages to delete (e.g. 1, 3)","impPasswordNuova":"Set PDF password","impPasswordAttuale":"Current PDF password","impPasswordSegno":"Enter password","impFiligrana":"Watermark text","rotLabel":"Rotation","rot90r":"90&deg; right","rot90rNota":"Quarter turn clockwise","rot180":"180&deg;","rot180Nota":"Upside down","rot90l":"90&deg; left","rot90lNota":"Quarter turn anticlockwise","numLabel":"Number format","numSolo":"Number only","numSoloNota":"1, 2, 3…","numTotale":"With total","numTotaleNota":"Shows how many","numTrattini":"Dashes","numTrattiniNota":"Classic book style","numEsteso":"Spelled out","numEstesoNota":"In English","uploading":"Uploading file...","processing":"Converting... {s}s","done":"Completed","processingFiles":"Processing files...","merging":"Merging PDF files... {s}%","fromImages":"Creating PDF from images... {s}%","batch":"Converting file {i} of {n}: {name}","zipping":"Creating ZIP package...","success":"Conversion completed successfully!","errTooBig":"File too large ({size}). The limit is 100 MB.","errNetwork":"Could not reach the conversion server.","errTimeout":"The server took too long. Try a smaller file.","errServer":"Server error ({code}).","errRate":"Too many requests. Wait a minute and try again.","errFormat":"The file content does not match the expected format.","errFailed":"Conversion failed: the file may be damaged or protected.","errUnavailable":"Conversion service temporarily unavailable.","errPassword":"Please enter a password.","errFileVuoto":"The file is empty.","errPasswordErrata":"Wrong password.","errTroppePagine":"The document is too long. The limit is 400 pages — split it first and convert the parts.","errPdfIlleggibile":"This PDF cannot be read. It may be damaged or password-protected.","errNessunaTabella":"No table was found in this PDF. Tables drawn without lines are the hardest to detect.","reading":"Reading the file...","working":"Processing...","generating":"Generating the document...","packaging":"Packaging the file...","completed":"Completed!","pageOf":"Page {i} of {n}...","fileOf":"File {i} of {n}..."},"ro":{"errGenerico":"Ceva nu a mers bine. Încearcă din nou.","menuDaPdf":"CONVERTEȘTE DIN PDF","menuAPdf":"CONVERTEȘTE ÎN PDF","chiSiamo":"Despre noi","missioneTitolo":"Misiunea noastră","missioneTesto":"PDFAxiom oferă o suită gratuită de instrumente PDF, accesibilă de pe orice dispozitiv și fără înregistrare.","privacyTitolo":"Cum tratam fișierele tale","privacyTesto":"Majoritatea instrumentelor procesează documentele direct în browserul tău: acele fișiere nu îți părăsesc niciodată dispozitivul. Conversiile mai grele (Word, Excel, PowerPoint, HTML, comprimare, protecție) rulează pe serverele noastre: fișierul este procesat și șters imediat după aceea, fără a fi păstrat sau partajat.","contattiTitolo":"Contact și asistență","contattiTesto":"Ai întrebări, sugestii sau solicitări? Scrie-ne la {email}.","badgePopolare":"POPULAR","badgeOffice":"OFFICE","badgeSlides":"DIAPOZITIVE","badgeAi":"PREGĂTIT PENTRU IA","badgeImmagini":"IMAGINI","pubblicita":"PUBLICITATE","pubblicitaBreve":"REC.","piedeGratis":"Gratuit • Fără înregistrare.","piedePrivacy":"Confidențialitate","piedeTermini":"Termeni","impCompressione":"Nivel de comprimare","impLeggera":"Ușoară","impLeggeraNota":"Păstrează calitatea la tipărire","impMedia":"Echilibrată","impMediaNota":"Bună pentru tipărit și trimis","impMassima":"Maximă","impMassimaNota":"Fișier cât mai mic, ecran și e-mail","impConsigliata":"Recomandată","impPagineEstrai":"Pagini de extras (ex. 1-3, 5)","impPagineElimina":"Pagini de șters (ex. 1, 3)","impPasswordNuova":"Setează parola PDF","impPasswordAttuale":"Parola actuală a PDF-ului","impPasswordSegno":"Introdu parola","impFiligrana":"Textul filigranului","rotLabel":"Rotire","rot90r":"90&deg; la dreapta","rot90rNota":"Un sfert de tură în sensul acelor","rot180":"180&deg;","rot180Nota":"Cu susul în jos","rot90l":"90&deg; la stânga","rot90lNota":"Un sfert de tură invers","numLabel":"Formatul numărului","numSolo":"Doar numărul","numSoloNota":"1, 2, 3…","numTotale":"Cu totalul","numTotaleNota":"Arată câte sunt","numTrattini":"Între liniuțe","numTrattiniNota":"Stil clasic de carte","numEsteso":"În cuvinte","numEstesoNota":"În engleză","uploading":"Se încarcă fișierul...","processing":"Se convertește... {s}s","done":"Finalizat","processingFiles":"Se procesează fișierele...","merging":"Se unesc PDF-urile... {s}%","fromImages":"Se creează PDF din imagini... {s}%","batch":"Se convertește fișierul {i} din {n}: {name}","zipping":"Se creează pachetul ZIP...","success":"Conversie finalizată cu succes!","errTooBig":"Fișier prea mare ({size}). Limita este 100 MB.","errNetwork":"Nu s-a putut contacta serverul de conversie.","errTimeout":"Serverul a durat prea mult. Încearcă un fișier mai mic.","errServer":"Eroare de server ({code}).","errRate":"Prea multe cereri. Așteaptă un minut și reîncearcă.","errFormat":"Conținutul fișierului nu corespunde formatului așteptat.","errFailed":"Conversie eșuată: fișierul poate fi deteriorat sau protejat.","errUnavailable":"Serviciul de conversie este temporar indisponibil.","errPassword":"Introdu o parolă.","errFileVuoto":"Fișierul este gol.","errPasswordErrata":"Parolă greșită.","errTroppePagine":"Documentul este prea lung. Limita este de 400 de pagini — împarte-l și convertește părțile.","errPdfIlleggibile":"Acest PDF nu poate fi citit. Poate fi deteriorat sau protejat cu parolă.","errNessunaTabella":"Nu s-a găsit niciun tabel în acest PDF. Tabelele fără linii desenate sunt cel mai greu de recunoscut.","reading":"Se citește fișierul...","working":"Se procesează...","generating":"Se generează documentul...","packaging":"Se creează fișierul...","completed":"Finalizat!","pageOf":"Pagina {i} din {n}...","fileOf":"Fișierul {i} din {n}..."}};

window.PDFAxiomI18n = {
  get lang() {
    // Comanda la pagina, non la preferenza memorizzata: il testo di questa
    // pagina e' scritto dentro il file ed e' in una lingua sola. Se il
    // browser ricordasse "italiano" mentre siamo su /pdf-to-word/, i
    // messaggi di avanzamento uscirebbero in italiano sopra un testo inglese.
    return window.PDFAXIOM_LANG || localStorage.getItem('pdfaxiom_lang') || 'en';
  },
  t(chiave, valori) {
    const set = uiMessages[this.lang] || uiMessages.en;
    let testo = set[chiave] || uiMessages.en[chiave] || chiave;
    if (valori) {
      Object.entries(valori).forEach(([k, v]) => {
        testo = testo.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      });
    }
    return testo;
  },

  /* Nome, descrizione ed etichetta del pulsante di uno strumento, nella
     lingua della pagina.

     app.js li prendeva da toolsConfig, che pero' e' scritto in inglese e
     basta: su /it/rotate-pdf/ il titolo restava "Rotate PDF Pages" e il
     pulsante "Rotate PDF" mentre tutto il resto era in italiano. Le
     traduzioni c'erano gia' qui dentro, mancava solo chi le leggesse.

     Se una voce manca si torna all'inglese, che e' sempre completo. */
  strumento(id) {
    const nomi = toolTranslations[this.lang] || toolTranslations.en;
    const pulsanti = toolButtons[this.lang] || toolButtons.en;
    const voce = nomi[id] || toolTranslations.en[id];
    if (!voce) return null;
    return {
      title: voce.title,
      desc: voce.desc,
      btn: pulsanti[id] || toolButtons.en[id]
    };
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const currentLangText = document.getElementById('currentLangText');
  const langOptions = document.querySelectorAll('.lang-option');

  // La lingua e' quella della pagina su cui ci si trova, non quella
  // memorizzata: il testo scritto nel file non si puo' cambiare a posteriori,
  // e mescolare le due darebbe un'interfaccia italiana su contenuti inglesi.
  let currentLang = window.PDFAXIOM_LANG || localStorage.getItem('pdfaxiom_lang') || 'en';
  setLanguage(currentLang);

  langOptions.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = opt.getAttribute('data-lang');
      if (!selectedLang || LINGUE_PDFAXIOM.indexOf(selectedLang) < 0) return;

      // Ogni lingua ha pagine proprie, con il proprio testo scritto dentro.
      // Cambiare lingua vuol dire andarci: da /pdf-to-word/ a
      // /it/pdf-to-word/. Prima si riscrivevano solo le voci gestite dal
      // codice e il testo della pagina restava nella lingua di partenza.
      localStorage.setItem('pdfaxiom_lang', selectedLang);
      if (window.PDFAxiomRotte) {
        const dove = window.PDFAxiomRotte.stessaPaginaIn(selectedLang);
        if (dove !== location.pathname) { location.href = dove; return; }
      }

      setLanguage(selectedLang);
      const wrapper = opt.closest('.dropdown-wrapper');
      if (wrapper) wrapper.classList.remove('active');
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
    const toolsT = toolTranslations[lang] || toolTranslations.en;

    // Sulle pagine dei singoli strumenti cambiare lingua porta a un altro
    // indirizzo, quindi il pannello si ricostruisce da solo. Sulla pagina
    // iniziale no: chi trascina un file dentro apre il pannello li' dov'e',
    // e senza queste righe resterebbe nella lingua di prima.
    const apertoOra = document.body.dataset.strumentoAperto;
    if (apertoOra) {
      const nomeAperto = toolsT[apertoOra] || toolTranslations.en[apertoOra];
      const pulsantiOra = toolButtons[lang] || toolButtons.en;
      const titoloEl = document.getElementById('workspaceTitle');
      const sottoEl = document.getElementById('workspaceDesc');
      const azioneEl = document.getElementById('processBtnText');
      if (nomeAperto && titoloEl) titoloEl.textContent = nomeAperto.title;
      if (nomeAperto && sottoEl) sottoEl.textContent = nomeAperto.desc;
      if (azioneEl) {
        azioneEl.textContent = pulsantiOra[apertoOra] || toolButtons.en[apertoOra];
      }
    }

    // Update Text Elements
    // Sulle pagine dei singoli strumenti il titolo dell'intestazione non e'
    // un h1: l'unico h1 della pagina deve essere il nome dello strumento.
    const heroH1 = document.querySelector('.hero h1, .hero .hero-titolo');
    if (heroH1) heroH1.textContent = t.heroTitle;

    const heroP = document.querySelector('.hero p');
    if (heroP) heroP.textContent = t.heroDesc;

    const heroSub = document.querySelector('.hero-subtext');
    if (heroSub) {
      if (t.heroSubtext) {
        heroSub.textContent = t.heroSubtext;
        heroSub.style.display = 'block';
      } else {
        heroSub.style.display = 'none';
      }
    }

    // Update Mobile Menu Button Text (Tools / Close)
    const mobileMenuBtnSpan = document.querySelector('#mobileMenuBtn span');
    const headerNav = document.querySelector('.header-nav');
    if (mobileMenuBtnSpan && headerNav) {
      const isOpen = headerNav.classList.contains('active');
      mobileMenuBtnSpan.textContent = isOpen ? (t.mobileClose || "Close") : (t.mobileMenu || "Tools");
    }

    // Navbar (4 Uniform Category Dropdowns)
    const navBtns = document.querySelectorAll('.header-nav .nav-btn span');
    if (navBtns[0]) navBtns[0].textContent = t.navConvert;
    if (navBtns[1]) navBtns[1].textContent = t.navMergeSplit;
    if (navBtns[2]) navBtns[2].textContent = t.navImages;
    if (navBtns[3]) navBtns[3].textContent = t.navEdit || "Edit & Security";

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

    const footerCopy = document.querySelector('.copyright');
    if (footerCopy) footerCopy.textContent = t.footerCopy;

    const extTitle = document.getElementById('estensioneTitolo');
    if (extTitle) extTitle.textContent = t.extTitle;
    const extSub = document.getElementById('estensioneSotto');
    if (extSub) extSub.textContent = t.extSub;
    const extBtn = document.getElementById('estensioneAzione');
    if (extBtn) extBtn.textContent = t.extBtn;

    // Finestra "Chi siamo" e voci del piede.
    // Erano scritte con ternari lang === 'it', quindi esistevano in due lingue
    // e le altre sei leggevano inglese in mezzo a una pagina tradotta. Ora
    // passano dallo stesso dizionario di tutto il resto.
    const m = uiMessages[lang] || uiMessages.en;
    const testo = (id, chiave) => {
      const el = document.getElementById(id);
      if (el) el.textContent = m[chiave] || uiMessages.en[chiave];
    };

    testo('aboutUsLink', 'chiSiamo');

    // I testi della finestra "Chi siamo" stavano qui. La finestra non esiste
    // piu: quel contenuto e ora una pagina vera, /about/ e /it/chi-siamo/,
    // scritta a tempo di compilazione da build/contenuti/legali.js.
    // Etichette che restavano in inglese su qualsiasi pagina: i cartellini
    // delle schede, la dicitura sopra i riquadri pubblicitari, il piede.
    //
    // La chiave sta in un attributo e non si deduce dal testo: dedurla dal
    // testo funziona una volta sola, perche' al secondo cambio di lingua il
    // testo e' gia' tradotto e non corrisponde piu'.
    document.querySelectorAll('[data-badge], [data-piede]').forEach((e) => {
      const chiave = e.getAttribute('data-badge') || e.getAttribute('data-piede');
      const testo = m[chiave] || uiMessages.en[chiave];
      if (testo) e.textContent = testo;
    });

    // UPDATE ALL 24 TOOL CARDS DYNAMICALLY!
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
      const toolId = card.getAttribute('data-tool');
      if (toolId && toolsT[toolId]) {
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (h3) h3.textContent = toolsT[toolId].title;
        if (p) p.textContent = toolsT[toolId].desc;
      }
    });

    // UPDATE NAVBAR MEGA DROPDOWN ITEMS
    const megaItems = document.querySelectorAll('.mega-item[data-tool]');
    megaItems.forEach(item => {
      const toolId = item.getAttribute('data-tool');
      if (toolId && toolsT[toolId]) {
        item.textContent = toolsT[toolId].title;
      }
    });
  }
});
