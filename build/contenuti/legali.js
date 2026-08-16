/**
 * Informativa sulla privacy e condizioni d'uso.
 *
 * Scritte descrivendo quello che il sito fa davvero, verificato nel codice:
 * undici strumenti girano nel browser e il file non parte mai; tredici passano
 * dal server, dove il gateway cancella il file appena la risposta e' stata
 * consegnata; le statistiche sono Umami installato da noi, che non usa cookie
 * e non conserva l'indirizzo IP.
 *
 * Servono comunque, a prescindere dalla pubblicita': un sito che elabora i
 * documenti delle persone senza dire cosa ne fa e' un problema di per se'.
 * AdSense poi le pretende esplicitamente.
 */
module.exports = {
  en: {
    privacy: {
      slug: 'privacy',
      titolo: 'Privacy Policy',
      descrizione: 'What happens to the files you upload to PDFAxiom, what we measure, and what we do not collect.',
      aggiornato: 'Last updated: 12 August 2026',
      sezioni: [
        {
          t: 'The short version',
          p: [
            'Eleven of our twenty-four tools run entirely inside your browser. For those, your file is never uploaded anywhere — it never leaves your device, and we could not see it even if we wanted to.',
            'The other thirteen need a server, because they use software that cannot run in a browser. Those files are sent to our server, converted, and <strong>deleted as soon as the result has been handed back to you</strong>. They are not stored, not backed up, not read, and not shared with anyone.',
            'We do not ask for an account, an email address, or a payment method. There is nothing to sign up for.',
          ],
        },
        {
          t: 'Which tools use the server',
          p: [
            'Sent to our server: PDF to Word, PDF to Excel, PDF to PowerPoint, PDF to HTML, Word to PDF, Excel to PDF, PowerPoint to PDF, Markdown to PDF, HTML to PDF, Compress, Password protect, Unlock, Greyscale.',
            'Stay in your browser: Merge, Split, Rotate, Delete pages, Page numbers, Watermark, Images to PDF, PDF to JPG, Extract images, PDF to text, PDF to Markdown.',
            'Each tool page states which of the two applies, at the top, before you upload anything.',
          ],
        },
        {
          t: 'How long files are kept',
          p: [
            'For as long as the conversion takes, and not a second longer. The file is written to a temporary folder, converted, returned to you, and removed. The same happens to the converted result once your download has completed.',
            'If a conversion fails or you close the browser halfway, anything left behind is removed automatically within the hour.',
            'We keep no copies. There is no archive to search, and no way for us to recover a file you have lost.',
          ],
        },
        {
          t: 'What we measure',
          p: [
            'We count visits using <strong>Umami</strong>, an analytics program we run on our own server rather than a service that sells data. It sets <strong>no cookies</strong> and stores <strong>no IP addresses</strong>.',
            'What is recorded for each visit: the page viewed, the site you came from, the country, the browser, the operating system, the screen size and the language. Nothing in that list identifies a person, and none of it is linked to the files you convert.',
            'We do not use Google Analytics, advertising trackers, or social network buttons.',
          ],
        },
        {
          t: 'Cookies',
          p: [
            'The site sets no cookies at all.',
            'It does use your browser\'s local storage to remember two preferences — the language you chose and whether you prefer the light or dark appearance. That information stays on your device, is never sent to us, and disappears when you clear your browser data.',
          ],
        },
        {
          t: 'Where the servers are',
          p: [
            'Our server is in Belgium, inside the European Union, and is operated by Google Cloud. Files sent for conversion are processed there and nowhere else.',
          ],
        },
        {
          t: 'Your rights',
          p: [
            'Because we hold no account, no email address and no stored files, there is in practice no personal data of yours for us to hand over, correct or delete — which is the strongest form of the guarantee the GDPR is meant to give you.',
            'If you believe we hold something about you regardless, write to <strong>pdfaxiom@gmail.com</strong> and we will answer.',
          ],
        },
        {
          t: 'Changes to this page',
          p: [
            'If what we do with your files changes, this page changes with it and the date at the top is updated. We will not quietly start keeping documents.',
          ],
        },
      ],
    },

    terms: {
      slug: 'terms',
      titolo: 'Terms of Use',
      descrizione: 'The rules for using PDFAxiom: what it costs, what the limits are, and what we do not promise.',
      aggiornato: 'Last updated: 12 August 2026',
      sezioni: [
        {
          t: 'What this service is',
          p: [
            'PDFAxiom is a set of free tools for converting and editing PDF files. There is no account, no subscription and no payment. You may use it for personal or commercial work alike.',
          ],
        },
        {
          t: 'Limits',
          p: [
            'Files may be up to <strong>100 MB</strong> each, and documents up to <strong>400 pages</strong>. Longer documents should be split first.',
            'There is a limit on how many conversions one connection may start per minute. It exists so that one person cannot make the service unusable for everyone else. If you hit it, wait a minute.',
            'These limits may change if the cost of running the service demands it.',
          ],
        },
        {
          t: 'What you may not do',
          p: [
            'Do not use the service to process material you have no right to process, or content that is illegal where you are.',
            'Do not attempt to script the service, overwhelm it, or circumvent the limits. It is paid for out of pocket and shared by everyone.',
          ],
        },
        {
          t: 'What we do not promise',
          p: [
            'The service is offered as it is, free of charge, with no guarantee that it will be available, that a conversion will succeed, or that the result will be perfect. Converting a PDF is guesswork by nature: a PDF describes how a page looks, not how it is structured, and some documents simply do not convert well.',
            '<strong>Always keep your original file.</strong> We cannot recover anything, because we keep nothing.',
            'We are not liable for losses arising from use of the service. If a converted document matters, check it before relying on it.',
          ],
        },
        {
          t: 'Scanned documents',
          p: [
            'There is no character recognition. A PDF that is a photograph of pages, with no text layer, contains nothing to extract: the tools will either say so or return the images alone. This is stated on every page it affects.',
          ],
        },
        {
          t: 'Contact',
          p: ['Questions, faults and complaints: <strong>pdfaxiom@gmail.com</strong>'],
        },
      ],
    },
  },

  it: {
    privacy: {
      slug: 'privacy',
      titolo: 'Informativa sulla privacy',
      descrizione: 'Cosa succede ai file che carichi su PDFAxiom, cosa misuriamo e cosa non raccogliamo.',
      aggiornato: 'Ultimo aggiornamento: 12 agosto 2026',
      sezioni: [
        {
          t: 'In breve',
          p: [
            'Undici dei nostri ventiquattro strumenti lavorano interamente dentro il tuo browser. Per quelli il file non viene caricato da nessuna parte: non lascia mai il tuo dispositivo, e non potremmo vederlo nemmeno volendo.',
            'Gli altri tredici hanno bisogno di un server, perché usano programmi che in un browser non possono girare. Quei file arrivano al nostro server, vengono convertiti e <strong>cancellati appena il risultato ti è stato consegnato</strong>. Non vengono conservati, non finiscono in nessuna copia di sicurezza, non vengono letti né condivisi con nessuno.',
            'Non chiediamo un account, un indirizzo di posta elettronica o un metodo di pagamento. Non c\'è niente a cui iscriversi.',
          ],
        },
        {
          t: 'Quali strumenti usano il server',
          p: [
            'Passano dal nostro server: PDF in Word, PDF in Excel, PDF in PowerPoint, PDF in HTML, Word in PDF, Excel in PDF, PowerPoint in PDF, Markdown in PDF, HTML in PDF, Comprimere, Proteggere con password, Sbloccare, Scala di grigi.',
            'Restano nel tuo browser: Unire, Dividere, Ruotare, Togliere pagine, Numeri di pagina, Filigrana, Immagini in PDF, PDF in JPG, Estrarre immagini, PDF in testo, PDF in Markdown.',
            'Ogni pagina dice quale dei due casi vale, in alto, prima che tu carichi qualsiasi cosa.',
          ],
        },
        {
          t: 'Quanto restano i file',
          p: [
            'Il tempo della conversione, e non un secondo di più. Il file viene scritto in una cartella temporanea, convertito, restituito e rimosso. Lo stesso accade al risultato una volta che lo scaricamento è finito.',
            'Se una conversione fallisce o chiudi il browser a metà, quello che resta viene rimosso automaticamente entro un\'ora.',
            'Non teniamo copie. Non esiste un archivio da consultare, e non abbiamo modo di recuperare un file che tu abbia perso.',
          ],
        },
        {
          t: 'Cosa misuriamo',
          p: [
            'Contiamo le visite con <strong>Umami</strong>, un programma di statistiche che facciamo girare su un server nostro invece di affidarci a un servizio che rivende i dati. Non usa <strong>nessun cookie</strong> e non conserva <strong>nessun indirizzo IP</strong>.',
            'Di ogni visita viene registrato: la pagina vista, il sito da cui si arriva, il paese, il browser, il sistema operativo, la dimensione dello schermo e la lingua. Niente in questo elenco identifica una persona, e niente di tutto ciò è collegato ai file che converti.',
            'Non usiamo Google Analytics, né tracciatori pubblicitari, né pulsanti dei social network.',
          ],
        },
        {
          t: 'Cookie',
          p: [
            'Il sito non usa alcun cookie.',
            'Usa invece la memoria locale del tuo browser per ricordare due preferenze: la lingua che hai scelto e se preferisci l\'aspetto chiaro o scuro. Quell\'informazione resta sul tuo dispositivo, non ci viene mai inviata, e sparisce quando cancelli i dati di navigazione.',
          ],
        },
        {
          t: 'Dove stanno i server',
          p: [
            'Il nostro server si trova in Belgio, dentro l\'Unione Europea, ed è gestito da Google Cloud. I file inviati per la conversione vengono elaborati lì e in nessun altro posto.',
          ],
        },
        {
          t: 'I tuoi diritti',
          p: [
            'Poiché non conserviamo account, indirizzi di posta né file, in pratica non esiste un dato personale tuo che possiamo consegnarti, correggere o cancellare — che è la forma più forte della garanzia che il GDPR vuole darti.',
            'Se ritieni comunque che abbiamo qualcosa che ti riguarda, scrivi a <strong>pdfaxiom@gmail.com</strong> e ti risponderemo.',
          ],
        },
        {
          t: 'Modifiche a questa pagina',
          p: [
            'Se cambia quello che facciamo con i tuoi file, cambia anche questa pagina e la data in cima viene aggiornata. Non cominceremo a conservare documenti in silenzio.',
          ],
        },
      ],
    },

    terms: {
      slug: 'terms',
      titolo: 'Condizioni d\'uso',
      descrizione: 'Le regole per usare PDFAxiom: quanto costa, quali sono i limiti e cosa non promettiamo.',
      aggiornato: 'Ultimo aggiornamento: 12 agosto 2026',
      sezioni: [
        {
          t: 'Che cos\'è questo servizio',
          p: [
            'PDFAxiom è un insieme di strumenti gratuiti per convertire e modificare file PDF. Non c\'è account, né abbonamento, né pagamento. Puoi usarlo tanto per lavoro personale quanto commerciale.',
          ],
        },
        {
          t: 'Limiti',
          p: [
            'I file possono arrivare a <strong>100 MB</strong> ciascuno e i documenti a <strong>400 pagine</strong>. I documenti più lunghi vanno divisi prima.',
            'C\'è un limite al numero di conversioni che una stessa connessione può avviare al minuto. Esiste perché una persona sola non possa rendere il servizio inutilizzabile per tutti gli altri. Se lo raggiungi, aspetta un minuto.',
            'Questi limiti possono cambiare se il costo di far funzionare il servizio lo richiede.',
          ],
        },
        {
          t: 'Cosa non puoi fare',
          p: [
            'Non usare il servizio per elaborare materiale che non hai il diritto di elaborare, o contenuti illegali dove ti trovi.',
            'Non tentare di automatizzare il servizio, di sovraccaricarlo o di aggirare i limiti. È pagato di tasca nostra ed è condiviso da tutti.',
          ],
        },
        {
          t: 'Cosa non promettiamo',
          p: [
            'Il servizio è offerto così com\'è, gratuitamente, senza garanzia che sia sempre disponibile, che una conversione riesca o che il risultato sia perfetto. Convertire un PDF è per natura un lavoro di interpretazione: un PDF descrive come appare una pagina, non com\'è strutturata, e certi documenti semplicemente non si convertono bene.',
            '<strong>Conserva sempre il file originale.</strong> Non possiamo recuperare nulla, perché non conserviamo nulla.',
            'Non rispondiamo di danni derivanti dall\'uso del servizio. Se un documento convertito è importante, controllalo prima di farci affidamento.',
          ],
        },
        {
          t: 'Documenti scansionati',
          p: [
            'Non facciamo riconoscimento dei caratteri. Un PDF che è una fotografia delle pagine, senza uno strato di testo, non contiene niente da estrarre: gli strumenti te lo diranno oppure restituiranno le sole immagini. È scritto su ogni pagina a cui la cosa si applica.',
          ],
        },
        {
          t: 'Contatti',
          p: ['Domande, guasti e segnalazioni: <strong>pdfaxiom@gmail.com</strong>'],
        },
      ],
    },
  },
};
