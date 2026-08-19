/** Testi in italiano delle 24 pagine. Vedi en.js per il criterio. */
module.exports = {
  lingua: 'Italiano',

  casa: {
    titolo: 'Strumenti PDF gratuiti per convertire e comprimere',
    descrizione: 'Converti PDF in Word, Word in PDF, Excel, PowerPoint, unisci, dividi, comprimi e modifica i tuoi PDF. Gratis, senza registrazione, file cancellati subito dopo la conversione.',
  },

  etichette: {
    passi: 'Come si fa',
    faq: 'Domande frequenti',
    altri: 'Tutti i 24 strumenti PDF',
    apri: 'Apri lo strumento',
    browserBadge: 'Funziona nel tuo browser: il file non lascia il dispositivo',
    serverBadge: 'Elaborato sui nostri server e cancellato subito dopo',
  },

  strumenti: {
    'pdf-to-word': {
      titolo: 'Da PDF a Word — Gratis, senza registrazione',
      descrizione: 'Converti un PDF in un documento Word modificabile. Mantiene titoli, tabelle e immagini. Gratis, fino a 100 MB.',
      h1: 'Convertire PDF in Word',
      intro: 'Riporta un PDF a un file <strong>.docx</strong> modificabile, ricostruendo paragrafi, tabelle, titoli e immagini invece di incollare ogni pagina come una fotografia. Le testatine, i piè di pagina e la numerazione vengono riconosciuti e spostati nell\'intestazione del Word, invece di finire in mezzo al testo.',
      passi: [
        'Trascina il PDF da modificare, oppure clicca per sceglierlo dal dispositivo.',
        'Aspetta la conversione: un documento di 10 pagine richiede pochi secondi, un libro di 200 pagine circa un minuto.',
        'Scarica il .docx e aprilo con Word, Google Documenti, LibreOffice o Pages.',
      ],
      faq: [
        { d: 'L\'impaginazione sopravvive?', r: 'Testo, tabelle, titoli, elenchi e immagini passano. I grafici vettoriali complessi diventano immagini, perché in Word non sarebbero comunque modificabili.' },
        { d: 'Funziona con un PDF scansionato?', r: 'No. Se il PDF è una fotografia delle pagine senza uno strato di testo non c\'è nulla da estrarre e il Word conterrà solo le immagini. Non facciamo riconoscimento dei caratteri.' },
        { d: 'Quanto può essere grande il file?', r: 'Fino a 100 MB e fino a 400 pagine. Per libri più lunghi dividi prima il PDF e converti le parti.' },
      ],
    },

    'word-to-pdf': {
      titolo: 'Da Word a PDF — Gratis e fedele',
      descrizione: 'Converti .docx o .doc in un PDF pulito che si vede uguale ovunque. Gratis, senza registrazione, fino a 100 MB.',
      h1: 'Convertire Word in PDF',
      intro: 'Trasforma un documento Word in un PDF che si vede identico su qualsiasi dispositivo, che è poi il motivo per cui si manda un PDF invece di un .docx. Interruzioni di pagina, caratteri, tabelle e immagini restano dove li hai messi.',
      passi: [
        'Carica il file .docx o .doc.',
        'Il documento viene composto da LibreOffice, il programma che legge i file Word più fedelmente fuori da Microsoft Office.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'I caratteri restano quelli giusti?', r: 'I caratteri comuni sono installati sul nostro server e vengono resi esattamente. Un carattere molto insolito può essere sostituito, e questo può spostare leggermente l\'impaginazione: se conta, incorporalo nel .docx o usa caratteri standard.' },
        { d: 'L\'indice resta cliccabile?', r: 'Sì, i collegamenti interni e i segnalibri sopravvivono alla conversione.' },
        { d: 'Posso convertire un vecchio file .doc?', r: 'Sì, accettiamo sia il .docx moderno sia il vecchio formato .doc.' },
      ],
    },

    'pdf-to-excel': {
      titolo: 'Da PDF a Excel — Estrai tabelle in .xlsx gratis',
      descrizione: 'Estrai le tabelle da un PDF in un foglio Excel vero, con celle funzionanti. Gratis, senza registrazione.',
      h1: 'Convertire PDF in Excel',
      intro: 'Individua le tabelle dentro un PDF e le ricostruisce come celle vere di un foglio di calcolo, su cui puoi ordinare e calcolare: non una fotografia di una tabella. Ogni tabella trovata diventa un foglio del .xlsx.',
      passi: [
        'Carica il PDF che contiene le tabelle.',
        'Si provano due metodi: uno veloce che legge l\'allineamento del testo e uno più lento che segue i bordi disegnati. Si tiene il risultato più pulito.',
        'Scarica il .xlsx e aprilo con Excel, Numbers o Fogli Google.',
      ],
      faq: [
        { d: 'Cosa succede se dice che non ha trovato tabelle?', r: 'Succede quando nella pagina non c\'è una tabella che il riconoscitore sappia leggere, di solito una tabella senza righe disegnate e con spaziatura irregolare. Fallisce dichiarandolo, invece di consegnarti un file sfasato.' },
        { d: 'Le celle unite sopravvivono?', r: 'Di solito sì nelle tabelle con i bordi disegnati. Le tabelle senza bordi e con celle unite sono il caso più difficile e possono uscire appiattite.' },
        { d: 'Legge una tabella scansionata?', r: 'No. Una scansione non ha testo da estrarre, solo pixel.' },
      ],
    },

    'excel-to-pdf': {
      titolo: 'Da Excel a PDF — Gratis, mantiene la formattazione',
      descrizione: 'Converti .xlsx, .xls o .csv in un PDF pulito con la formattazione intatta. Gratis e senza registrazione.',
      h1: 'Convertire Excel in PDF',
      intro: 'Stampa il foglio di calcolo in PDF come uscirebbe da Excel, mantenendo formati numerici, colori, bordi e larghezza delle colonne. Utile quando devi mandare dei numeri che nessuno deve poter modificare per sbaglio.',
      passi: [
        'Carica il file .xlsx, .xls o .csv.',
        'Ogni foglio viene impaginato.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'Vengono inclusi tutti i fogli?', r: 'Sì, ogni foglio della cartella di lavoro viene reso nell\'ordine in cui si trova.' },
        { d: 'Le formule passano?', r: 'Passano i risultati. Un PDF non ha il concetto di formula, quindi quello che vedi è il valore calcolato.' },
        { d: 'Posso convertire un semplice CSV?', r: 'Sì, un CSV viene impaginato come una tabella semplice.' },
      ],
    },

    'pdf-to-powerpoint': {
      titolo: 'Da PDF a PowerPoint — Converti in .pptx gratis',
      descrizione: 'Trasforma le pagine di un PDF in diapositive PowerPoint modificabili. Gratis, fino a 100 MB.',
      h1: 'Convertire PDF in PowerPoint',
      intro: 'Trasforma ogni pagina di un PDF in una diapositiva di una presentazione .pptx, mantenendo il testo come caselle di testo vere invece di appiattirlo in un\'immagine: quello che c\'è scritto resta modificabile.',
      passi: [
        'Carica il PDF: funziona meglio con una presentazione esportata in PDF.',
        'Ogni pagina diventa una diapositiva.',
        'Scarica il .pptx e aprilo con PowerPoint, Keynote o Presentazioni Google.',
      ],
      faq: [
        { d: 'Posso modificare il testo dopo?', r: 'Sì. Il testo finisce in caselle modificabili, non incorporato in una fotografia.' },
        { d: 'Tornano le animazioni?', r: 'No. Un PDF non registra animazioni né transizioni: quell\'informazione è andata persa quando la presentazione è stata esportata.' },
        { d: 'E se il mio PDF non è una presentazione?', r: 'Funziona lo stesso, ma una pagina A4 verticale trasformata in una diapositiva orizzontale verrà male. Questo strumento è pensato per le presentazioni.' },
      ],
    },

    'powerpoint-to-pdf': {
      titolo: 'Da PowerPoint a PDF — Convertitore .pptx gratis',
      descrizione: 'Converti una presentazione PowerPoint in un PDF che chiunque può aprire. Gratis, fino a 100 MB.',
      h1: 'Convertire PowerPoint in PDF',
      intro: 'Trasforma una presentazione in un PDF che si apre allo stesso modo su qualsiasi dispositivo, senza caratteri mancanti e senza il rischio che qualcuno modifichi le tue diapositive.',
      passi: [
        'Carica il file .pptx o .ppt.',
        'Ogni diapositiva diventa una pagina del PDF.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'Vengono incluse le note del relatore?', r: 'No, solo le diapositive.' },
        { d: 'Cosa succede ai video nella presentazione?', r: 'Un PDF non può riprodurre video, quindi al loro posto resta un fotogramma fisso.' },
        { d: 'Le proporzioni restano le stesse?', r: 'Sì, una presentazione 16:9 produce pagine PDF 16:9.' },
      ],
    },

    'pdf-to-html': {
      titolo: 'Da PDF a HTML — Gratis, mantiene l\'impaginazione',
      descrizione: 'Trasforma un PDF in una pagina web identica all\'originale, caratteri e impaginazione inclusi. Gratis.',
      h1: 'Convertire PDF in HTML',
      intro: 'Produce un unico file HTML che riproduce il PDF pagina per pagina dentro un browser, incorporando caratteri e immagini perché il risultato si veda bene senza file di contorno.',
      passi: [
        'Carica il PDF.',
        'Le pagine vengono convertite in HTML con i caratteri incorporati.',
        'Scarica il file .html e aprilo con qualsiasi browser.',
      ],
      faq: [
        { d: 'L\'HTML è abbastanza pulito da modificarlo a mano?', r: 'Non proprio. La conversione punta a somigliare al PDF, quindi il testo è posizionato al millimetro invece che scritto come paragrafi semplici. È fatto per essere visto e pubblicato, non modificato a mano.' },
        { d: 'Perché il file è così grande?', r: 'Caratteri e immagini sono impacchettati dentro, così la pagina funziona da sola senza dipendere da nulla di esterno.' },
        { d: 'Posso metterlo su un sito?', r: 'Sì, è un file autonomo che puoi caricare dove vuoi.' },
      ],
    },

    'html-to-pdf': {
      titolo: 'Da HTML a PDF — Converti pagine web gratis',
      descrizione: 'Trasforma un file HTML in un PDF composto da un vero motore di browser. Gratis, senza registrazione.',
      h1: 'Convertire HTML in PDF',
      intro: 'Compone il tuo HTML con Chromium, il motore che sta dietro Chrome, così il PDF viene come la pagina si vede in un browser: fogli di stile, impaginazione e tutto il resto.',
      passi: [
        'Carica il file .html o .txt.',
        'La pagina viene composta e impaginata su formato A4.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'Applica il mio CSS?', r: 'Sì, gli stili contenuti nel file vengono applicati. Quelli caricati da un indirizzo esterno non vengono scaricati.' },
        { d: 'Il JavaScript viene eseguito?', r: 'Gli script dentro il file vengono eseguiti prima della cattura, quindi il contenuto generato al caricamento compare.' },
        { d: 'Posso convertire un sito dal suo indirizzo?', r: 'Non con questo strumento: salva prima la pagina come file HTML e caricala.' },
      ],
    },

    'markdown-to-pdf': {
      titolo: 'Da Markdown a PDF — Convertitore .md gratis',
      descrizione: 'Trasforma il Markdown in un PDF composto bene, con titoli, blocchi di codice e tabelle. Gratis.',
      h1: 'Convertire Markdown in PDF',
      intro: 'Prende un file Markdown e lo compone come un documento vero: titoli in una gerarchia sensata, blocchi di codice a spaziatura fissa, tabelle con i bordi, collegamenti che restano cliccabili.',
      passi: [
        'Carica il file .md, .markdown o .txt.',
        'Il Markdown viene convertito in un documento formattato e composto in PDF.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'Quale variante di Markdown è supportata?', r: 'Il Markdown standard più le estensioni comuni: tabelle, blocchi di codice delimitati, elenchi di cose da fare e testo barrato.' },
        { d: 'Le immagini funzionano?', r: 'Le immagini indicate con un indirizzo web vengono incluse. Quelle che puntano a file sul tuo computer non possono essere raggiunte.' },
        { d: 'Il codice è colorato?', r: 'I blocchi di codice usano un carattere a spaziatura fissa su sfondo tinto; la colorazione per linguaggio non viene applicata.' },
      ],
    },

    'compress-pdf': {
      titolo: 'Comprimere PDF — Riduci le dimensioni gratis',
      descrizione: 'Riduci un PDF con tre livelli di qualità, da leggero a massimo. Misurato: fino al 40% in meno. Gratis.',
      h1: 'Comprimere un PDF',
      intro: 'Riduce le dimensioni di un PDF ricodificando le immagini che contiene, con tre livelli così sei tu a scegliere il compromesso invece di subire quello che decide il programma.',
      passi: [
        'Carica il PDF da alleggerire.',
        'Scegli il livello: <strong>Leggera</strong> mantiene la qualità di stampa, <strong>Media</strong> è la scelta sensata, <strong>Massima</strong> produce il file più piccolo per schermo e posta elettronica.',
        'Scarica il PDF compresso.',
      ],
      faq: [
        { d: 'Quanto si riduce?', r: 'Misurato su un documento reale da 5 MB: circa 19% in meno con Leggera, 34% con Media, 40% con Massima. Un PDF fatto quasi solo di testo ha poco da comprimere, uno pieno di fotografie moltissimo.' },
        { d: 'Il testo diventa sfocato?', r: 'No. Testo e disegni vettoriali restano nitidi a ogni livello: vengono ricodificate solo le immagini.' },
        { d: 'Quale livello scelgo?', r: 'Media per quasi tutto. Leggera se il documento va in tipografia. Massima solo se deve stare sotto il limite di un allegato.' },
      ],
    },

    'protect-pdf': {
      titolo: 'Proteggere PDF con password — AES-256 gratis',
      descrizione: 'Blocca un PDF con una password e cifratura AES-256 vera. Gratis, il file viene cancellato subito dopo.',
      h1: 'Proteggere un PDF con password',
      intro: 'Cifra il PDF con <strong>AES-256</strong>, lo stesso standard usato per i documenti riservati: senza la password il file non si apre proprio. È cifratura vera, non un contrassegno che un lettore può ignorare.',
      passi: [
        'Carica il PDF da bloccare.',
        'Scrivi la password che servirà per aprirlo.',
        'Scarica il file protetto e comunica la password separatamente dal documento.',
      ],
      faq: [
        { d: 'È cifratura vera?', r: 'Sì, AES-256. Molti strumenti che lavorano nel browser si limitano a impostare un contrassegno "non stampare" che qualsiasi lettore può ignorare. Qui il file viene ricifrato, quindi il contenuto è illeggibile senza la password.' },
        { d: 'E se dimentico la password?', r: 'Nessuno può recuperarla, noi compresi. È il senso della cifratura: conservala in un posto sicuro.' },
        { d: 'Si può togliere in seguito?', r: 'Sì, con il nostro strumento Sblocca PDF, ma solo se conosci la password.' },
      ],
    },

    'unlock-pdf': {
      titolo: 'Sbloccare PDF — Togli password e restrizioni',
      descrizione: 'Rimuovi la password da un PDF tuo per poterlo stampare, copiare e modificare. Gratis, senza registrazione.',
      h1: 'Sbloccare un PDF',
      intro: 'Toglie la password e le restrizioni su stampa, copia e modifica da un PDF, restituendo un file normale che puoi usare liberamente. Devi conoscere la password attuale.',
      passi: [
        'Carica il PDF protetto.',
        'Inserisci la password attuale.',
        'Scarica il file sbloccato.',
      ],
      faq: [
        { d: 'Apre un PDF di cui non conosco la password?', r: 'No, e non è pensato per questo. Toglie la protezione da documenti che hai già il diritto di aprire.' },
        { d: 'Toglie anche i limiti di stampa e copia?', r: 'Sì. Una volta rimossa la cifratura se ne vanno anche i contrassegni sui permessi.' },
        { d: 'Il contenuto cambia?', r: 'No. Viene rimossa solo la protezione: pagine, testo e immagini restano intatti.' },
      ],
    },

    'ocr-pdf': {
      titolo: "OCR PDF — Rendi cercabile un PDF scansionato, gratis",
      descrizione: "Trasforma un PDF scansionato in uno in cui puoi cercare, selezionare e copiare. La pagina resta identica. Gratis, senza registrazione.",
      h1: "Rendere cercabile un PDF scansionato",
      intro: "Una pagina scansionata è una fotografia: i tuoi occhi la leggono, il computer ci vede solo pixel. Questo strumento legge la pagina e scrive il testo riconosciuto in modo invisibile sotto l'immagine, così il documento resta identico a vedersi ma diventa cercabile, selezionabile e copiabile. L'immagine originale conserva la sua risoluzione.",
      passi: [
        "Carica il PDF scansionato. Fino a 50 pagine.",
        "Ogni pagina viene raddrizzata, letta, e riceve un livello di testo invisibile sotto l'immagine originale.",
        "Scarica il PDF cercabile. Di solito pesa meno del file che hai caricato.",
      ],
      faq: [
        { d: "Cambia l'aspetto delle pagine?", r: "No. L'immagine resta alla sua risoluzione e il testo riconosciuto va sotto, dove non si vede. Quello che cambia è che Ctrl+F adesso trova." },
        { d: "Legge la scrittura a mano?", r: "Male, e preferiamo dirlo. Su pagine stampate recupera circa otto parole su dieci; su appunti scritti a mano produce per lo più parole senza senso. Se il tuo file è la foto di un quaderno, questo strumento ti deluderà." },
        { d: "E le formule con i pedici?", r: "I pedici sono la prima cosa che si perde. In un documento di matematica M con zero a pedice e M con \"el\" a pedice escono entrambi come una M semplice: il testo discorsivo si recupera, le formule no." },
        { d: "Il mio PDF ha già il testo dentro. Cosa succede?", r: "Niente, di proposito. Passare il riconoscimento sopra un testo già buono lo sostituirebbe con uno peggiore, quindi le pagine che contengono già testo vengono lasciate stare." },
      ],
    },
    'grayscale-pdf': {
      titolo: 'PDF in scala di grigi — Bianco e nero gratis',
      descrizione: 'Converti un PDF a colori in scala di grigi per risparmiare inchiostro. Il testo resta nitido. Gratis.',
      h1: 'Convertire un PDF in scala di grigi',
      intro: 'Converte tutti i colori del documento in sfumature di grigio, il che riduce il consumo di inchiostro colorato in stampa e rende più uniformi i documenti che sembrano scansionati. Il testo resta testo e resta nitido.',
      passi: [
        'Carica il PDF a colori.',
        'I colori vengono trasformati in grigio, mentre testo e forme vettoriali restano come sono.',
        'Scarica il PDF in scala di grigi.',
      ],
      faq: [
        { d: 'Trasforma le pagine in immagini?', r: 'No. È una scorciatoia comune in altri strumenti e rende il testo sfocato e non selezionabile. Qui il testo resta testo vero.' },
        { d: 'Posso riavere i colori?', r: 'Non dal file in scala di grigi: l\'informazione sul colore non c\'è più. Conserva l\'originale.' },
        { d: 'Il file diventa più piccolo?', r: 'Spesso un po\', perché il grigio occupa meno del colore, ma è un effetto collaterale, non lo scopo.' },
      ],
    },

    'pdf-to-markdown': {
      titolo: 'Da PDF a Markdown — .md gratis per AI e Notion',
      descrizione: 'Trasforma un PDF in Markdown pulito per ChatGPT, Claude, Obsidian o Notion. Funziona nel tuo browser.',
      h1: 'Convertire PDF in Markdown',
      intro: 'Estrae il testo di un PDF come Markdown pulito, che è il formato che i modelli linguistici e le applicazioni per appunti leggono meglio. Questo strumento funziona interamente dentro il tuo browser: il documento non lascia il computer.',
      passi: [
        'Trascina il PDF.',
        'Il testo viene estratto e strutturato con titoli e paragrafi Markdown.',
        'Scarica il file .md e incollalo dove ti serve.',
      ],
      faq: [
        { d: 'Perché il Markdown per gli strumenti di AI?', r: 'Porta con sé la struttura — titoli, elenchi, enfasi — in testo semplice, così il modello legge la forma del documento invece di un muro di parole indistinte.' },
        { d: 'Il mio file viene caricato da qualche parte?', r: 'No. Questo strumento lavora nel browser: non viene mandato nulla a nessuno.' },
        { d: 'Mantiene le immagini?', r: 'No, solo il testo. Il Markdown da solo non può contenere immagini incorporate.' },
      ],
    },

    'merge-pdf': {
      titolo: 'Unire PDF — Gratis, direttamente nel browser',
      descrizione: 'Unisci più PDF in uno solo, nell\'ordine che scegli. Funziona nel browser, i file non vengono caricati.',
      h1: 'Unire più file PDF',
      intro: 'Unisce più PDF in un unico documento, nell\'ordine in cui li aggiungi. Funziona interamente nel tuo browser, quindi i file non vengono caricati da nessuna parte: cosa che conta parecchio quando si tratta di contratti o referti medici.',
      passi: [
        'Seleziona o trascina tutti i PDF da unire.',
        'Vengono uniti nell\'ordine in cui compaiono nell\'elenco.',
        'Scarica il PDF unificato.',
      ],
      faq: [
        { d: 'I miei file vengono caricati su un server?', r: 'No. L\'unione avviene dentro il browser e i file restano sul tuo dispositivo.' },
        { d: 'Quanti posso unirne alla volta?', r: 'Tutti quelli che il tuo dispositivo riesce a tenere in memoria. Qualche decina di documenti normali non è un problema.' },
        { d: 'Segnalibri e collegamenti sopravvivono?', r: 'Il contenuto delle pagine e i collegamenti interni a ciascun documento vengono preservati.' },
      ],
    },

    'split-pdf': {
      titolo: 'Dividere PDF — Estrai pagine gratis nel browser',
      descrizione: 'Estrai pagine o intervalli da un PDF in un file nuovo. Funziona nel browser, non viene caricato nulla.',
      h1: 'Dividere un PDF',
      intro: 'Prende le pagine che indichi e le mette in un PDF nuovo, lasciando l\'originale intatto. Utile per tirare fuori un capitolo da un libro o una fattura sola da un blocco. Funziona nel tuo browser.',
      passi: [
        'Trascina il PDF.',
        'Scrivi le pagine che vuoi, per esempio <strong>1-3, 7, 12-15</strong>.',
        'Scarica il nuovo PDF con solo quelle pagine.',
      ],
      faq: [
        { d: 'Come si scrive l\'intervallo di pagine?', r: 'Intervalli con il trattino e pagine singole separate da virgole: 1-3, 7, 12-15.' },
        { d: 'Il documento viene caricato?', r: 'No, la divisione avviene nel tuo browser.' },
        { d: 'Posso dividerlo in tanti file in un colpo solo?', r: 'Questo strumento produce un file per esecuzione. Rilancialo con un intervallo diverso per ogni parte che ti serve.' },
      ],
    },

    'pdf-to-jpg': {
      titolo: 'Da PDF a JPG — Converti pagine in immagini gratis',
      descrizione: 'Trasforma ogni pagina di un PDF in un\'immagine ad alta risoluzione, dentro un file ZIP. Nel browser.',
      h1: 'Convertire PDF in JPG',
      intro: 'Trasforma ogni pagina del PDF in un\'immagine ad alta risoluzione e le impacchetta in un file ZIP. Comodo per diapositive, pubblicazioni sui social o ovunque un\'immagine sia più pratica di un documento. Funziona nel browser.',
      passi: [
        'Trascina il PDF.',
        'Ogni pagina viene disegnata ad alta risoluzione.',
        'Scarica il file ZIP con un\'immagine per pagina.',
      ],
      faq: [
        { d: 'Che risoluzione ottengo?', r: 'Le pagine vengono disegnate a circa il doppio della loro dimensione nominale, abbastanza nitide per lo schermo e per gran parte delle stampe.' },
        { d: 'Perché un file ZIP?', r: 'Un PDF di cento pagine significherebbe cento scaricamenti separati. Un archivio solo è più comodo.' },
        { d: 'Le pagine vengono caricate?', r: 'No, il disegno avviene nel tuo browser.' },
      ],
    },

    'jpg-to-pdf': {
      titolo: 'Da JPG a PDF — Immagini in PDF gratis nel browser',
      descrizione: 'Trasforma foto o scansioni in un unico PDF ordinato, un\'immagine per pagina. Funziona nel browser.',
      h1: 'Convertire immagini in PDF',
      intro: 'Mette le tue foto o scansioni in un unico PDF, un\'immagine per pagina, nell\'ordine in cui le aggiungi. Il motivo più comune è trasformare le foto di un documento fatte col telefono in qualcosa che si possa davvero mandare. Funziona nel browser.',
      passi: [
        'Seleziona tutte le immagini che vuoi, nell\'ordine in cui le vuoi.',
        'Ogni immagine diventa una pagina dimensionata su di essa.',
        'Scarica il PDF.',
      ],
      faq: [
        { d: 'Quali formati di immagine funzionano?', r: 'JPG, PNG e gli altri formati che il tuo browser sa mostrare.' },
        { d: 'Posso cambiare l\'ordine?', r: 'Le pagine seguono l\'ordine in cui i file compaiono nell\'elenco, quindi selezionali nell\'ordine che vuoi.' },
        { d: 'Le mie foto vengono caricate?', r: 'No. Tutto avviene sul tuo dispositivo.' },
      ],
    },

    'rotate-pdf': {
      titolo: 'Ruotare PDF — Correggi l\'orientamento gratis',
      descrizione: 'Ruota le pagine di un PDF di 90, 180 o 270 gradi e salva il risultato in modo permanente. Nel browser.',
      h1: 'Ruotare le pagine di un PDF',
      intro: 'Gira le pagine di un PDF e scrive il nuovo orientamento dentro il file, così si apre dritto ovunque — al contrario di quando lo ruoti nel visualizzatore, che di solito se ne dimentica appena chiudi.',
      passi: [
        'Trascina il PDF storto.',
        'Scegli di quanto girarlo: 90, 180 o 270 gradi.',
        'Scarica il PDF corretto.',
      ],
      faq: [
        { d: 'La rotazione è permanente?', r: 'Sì, viene scritta nel file stesso, non solo nel modo in cui un visualizzatore lo mostra.' },
        { d: 'Posso ruotare solo alcune pagine?', r: 'Questo strumento gira tutte le pagine della stessa quantità. Per orientamenti misti, dividi prima il documento.' },
        { d: 'Peggiora la qualità?', r: 'No. La rotazione cambia un attributo della pagina: non viene ricodificato nulla.' },
      ],
    },

    'delete-pdf-pages': {
      titolo: 'Eliminare pagine da un PDF — Gratis online',
      descrizione: 'Togli le pagine che non servono da un PDF e scarica il resto. Nel browser, non viene caricato nulla.',
      h1: 'Eliminare pagine da un PDF',
      intro: 'Rimuove le pagine che indichi e ti restituisce il resto come nuovo PDF. La pagina bianca in fondo a una scansione, la copertina che non vuoi, le pagine che appartengono a qualcun altro. Funziona nel browser.',
      passi: [
        'Trascina il PDF.',
        'Scrivi le pagine da togliere, per esempio <strong>1, 4, 9</strong>.',
        'Scarica il PDF senza quelle pagine.',
      ],
      faq: [
        { d: 'Come si indicano le pagine?', r: 'Numeri di pagina separati da virgole: 1, 4, 9.' },
        { d: 'L\'originale viene modificato?', r: 'No. Ottieni un file nuovo; quello sul tuo dispositivo resta intatto.' },
        { d: 'Viene caricato qualcosa?', r: 'No, questo strumento lavora interamente nel tuo browser.' },
      ],
    },

    'add-page-numbers': {
      titolo: 'Numerare le pagine di un PDF — Gratis online',
      descrizione: 'Aggiungi i numeri di pagina a un PDF che non li ha. Nel browser, non viene caricato nulla.',
      h1: 'Aggiungere i numeri di pagina a un PDF',
      intro: 'Stampa un numero su ogni pagina di un documento arrivato senza — cosa che diventa importante appena qualcuno deve fare riferimento a "pagina 12" in una riunione o in un atto.',
      passi: [
        'Trascina il PDF.',
        'I numeri vengono collocati in modo uniforme su ogni pagina.',
        'Scarica il PDF numerato.',
      ],
      faq: [
        { d: 'Dove finiscono i numeri?', r: 'Nel piè di pagina, in una posizione che sta lontana dai margini della maggior parte dei documenti.' },
        { d: 'Posso partire da un numero diverso da 1?', r: 'La numerazione parte dalla prima pagina del file. Per spostarla, dividi il documento e numera la parte che ti serve.' },
        { d: 'Viene caricato qualcosa?', r: 'No, la numerazione avviene nel tuo browser.' },
      ],
    },

    'watermark-pdf': {
      titolo: 'Filigrana su PDF — Timbro gratis online',
      descrizione: 'Stampa una scritta come BOZZA o RISERVATO su tutte le pagine. Nel browser, non viene caricato nulla.',
      h1: 'Aggiungere una filigrana a un PDF',
      intro: 'Stende una tua scritta su ogni pagina — <strong>BOZZA</strong>, <strong>RISERVATO</strong>, il nome di un cliente — così una copia che sfugge di mano è chiaramente marcata. Funziona nel browser.',
      passi: [
        'Trascina il PDF.',
        'Scrivi il testo da stampare sulle pagine.',
        'Scarica il PDF con la filigrana.',
      ],
      faq: [
        { d: 'Copre il testo sotto?', r: 'No, la scritta viene disegnata in modo leggero così il documento resta leggibile.' },
        { d: 'La filigrana si può togliere?', r: 'Diventa parte del contenuto della pagina, quindi non si può disattivare in un lettore. È un deterrente, non una cifratura: per quella usa Proteggi PDF.' },
        { d: 'Il documento viene caricato?', r: 'No, resta sul tuo dispositivo.' },
      ],
    },

    'extract-images-from-pdf': {
      titolo: 'Estrarre immagini da un PDF — Gratis, alta qualità',
      descrizione: 'Tira fuori ogni fotografia incorporata in un PDF alla qualità originale, dentro un file ZIP. Nel browser.',
      h1: 'Estrarre le immagini da un PDF',
      intro: 'Tira fuori le fotografie incorporate in un PDF alla loro risoluzione originale: le immagini vere, non fotografie delle pagine. Tutto viene impacchettato in un file ZIP.',
      passi: [
        'Trascina il PDF.',
        'Le immagini incorporate vengono individuate ed estratte a piena qualità.',
        'Scarica il file ZIP.',
      ],
      faq: [
        { d: 'In cosa è diverso da "PDF in JPG"?', r: '"PDF in JPG" fotografa ogni pagina così com\'è. Questo tira fuori i file immagine originali che erano stati inseriti nel documento, alla risoluzione con cui erano stati salvati.' },
        { d: 'E se non esce niente?', r: 'Allora il documento non contiene immagini incorporate: un PDF fatto solo di testo e disegni vettoriali non ne ha da estrarre.' },
        { d: 'Viene caricato qualcosa?', r: 'No, tutto avviene nel tuo browser.' },
      ],
    },

    'pdf-to-text': {
      titolo: 'Da PDF a testo — Estrai in .txt gratis',
      descrizione: 'Estrai tutto il testo leggibile di un PDF in un file .txt. Nel browser, non viene caricato nulla.',
      h1: 'Estrarre il testo da un PDF',
      intro: 'Tira fuori tutto il testo leggibile di un PDF in un file <strong>.txt</strong> semplice, senza formattazione tra i piedi. Utile per cercare, citare, o dare in pasto un documento a un altro programma.',
      passi: [
        'Trascina il PDF.',
        'Il testo di ogni pagina viene estratto nell\'ordine di lettura.',
        'Scarica il file .txt.',
      ],
      faq: [
        { d: 'La formattazione sopravvive?', r: 'No, ed è voluto: testo semplice significa niente caratteri, niente colonne, niente tabelle. Se vuoi la formattazione, usa "PDF in Word".' },
        { d: 'Legge un documento scansionato?', r: 'No. Una scansione è una fotografia del testo, e senza riconoscimento dei caratteri non c\'è nulla da estrarre. Non lo facciamo.' },
        { d: 'Il documento viene caricato?', r: 'No, l\'estrazione avviene nel tuo browser.' },
      ],
    },
  },
};
