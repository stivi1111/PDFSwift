/**
 * Genera una pagina per ogni strumento e per ogni lingua.
 *
 * Il sito era una pagina sola per 24 strumenti: per un motore di ricerca
 * significava una sola porta d'ingresso, e infatti non compariva da nessuna
 * parte. Qui index.html fa da modello e ne escono 24 pagine in inglese piu'
 * le stesse in altre sette lingue, ognuna con il proprio titolo, il proprio
 * testo e il proprio indirizzo.
 *
 *   node build/genera.js
 *
 * Il comando si puo' rilanciare quante volte si vuole: il blocco generato e'
 * delimitato da marcatori e viene sostituito, non accumulato.
 */
const fs = require('fs');
const path = require('path');

const RADICE = path.join(__dirname, '..');
const SITO = 'https://pdfaxiom.com';
const VERSIONE = '10.0';

const strumenti = require('./strumenti');
const brevi = require('./contenuti/brevi');
const legali = require('./contenuti/legali');

// Le pagine legali esistono in inglese e in italiano. Le altre lingue
// rimandano all'inglese: un'informativa tradotta male e' peggio di una in una
// lingua che il lettore capisce.
const LINGUE_LEGALI = ['en', 'it'];

// L'inglese vive nella radice del sito, le altre lingue in una cartella.
// LINGUE=en,it limita la generazione: comodo per provare una modifica al
// modello senza riscrivere duecento file.
const LINGUE = (process.env.LINGUE || 'en,it,es,de,zh,ro,hi,ru').split(',');
const contenuti = {};
LINGUE.forEach((l) => { contenuti[l] = require(`./contenuti/${l}`); });

/* L'elenco degli strumenti vive in due posti: qui, che genera le pagine, e
   js/rotte.js, che al clic sulla scheda porta all'indirizzo giusto. Aggiungere
   uno strumento e scordarsi il secondo da' una scheda che si clicca a vuoto,
   senza nessun errore da nessuna parte: e' successo con l'OCR. Questo controllo
   ferma la generazione invece di lasciar uscire una scheda morta. */
{
  const rotte = fs.readFileSync(path.join(__dirname, '..', 'js', 'rotte.js'), 'utf8');
  const blocco = rotte.slice(rotte.indexOf('PER_STRUMENTO = {'), rotte.indexOf('};', rotte.indexOf('PER_STRUMENTO = {')));
  const noti = new Map();
  blocco.replace(/'([^']+)':\s*'([^']+)'/g, (_, id, slug) => { noti.set(id, slug); return _; });
  strumenti.forEach((v) => {
    if (!noti.has(v.tool)) {
      throw new Error(`js/rotte.js non conosce lo strumento '${v.tool}': la sua scheda si cliccherebbe a vuoto`);
    }
    if (noti.get(v.tool) !== v.slug) {
      throw new Error(`js/rotte.js manda '${v.tool}' su '${noti.get(v.tool)}', qui e' '${v.slug}'`);
    }
  });
  noti.forEach((slug, id) => {
    if (!strumenti.some((v) => v.tool === id)) {
      throw new Error(`js/rotte.js conosce '${id}' ma build/strumenti.js no: porterebbe a una pagina che non esiste`);
    }
  });
}

/* Il numero dopo ?v= e' l'unica cosa che fa riscaricare uno script.
   /js/* e' servito con `immutable` per un anno (vedi _headers): chi e' gia'
   passato dal sito tiene la sua copia finche' l'indirizzo non cambia. Cambiare
   il file senza toccare la versione significa che il sito funziona per chi
   arriva nuovo e resta rotto per tutti gli altri, e da qui non si vede.
   Percio' l'impronta di ogni file versionato viene ricordata: se cambia il
   contenuto e non la versione, la generazione si ferma. */
{
  const crypto = require('crypto');
  const schedario = path.join(__dirname, 'impronte.json');
  const vecchie = fs.existsSync(schedario) ? JSON.parse(fs.readFileSync(schedario, 'utf8')) : {};
  const nuove = {};
  const modello = fs.readFileSync(path.join(__dirname, 'modello.html'), 'utf8');
  const riferimenti = modello.match(/\/(?:js|css)\/[a-z0-9.-]+\.(?:js|css)\?v=[0-9.]+/g) || [];
  const dimenticati = [];

  riferimenti.forEach((rif) => {
    const [file, versione] = rif.split('?v=');
    // i18n.js diventa i18n.<lingua>.js: si controlla l'originale, che e' la
    // fonte da cui gli altri sono scritti.
    const suDisco = path.join(__dirname, '..', file);
    if (!fs.existsSync(suDisco)) throw new Error(`${file} e' citato dal modello ma non esiste`);
    const impronta = crypto.createHash('md5').update(fs.readFileSync(suDisco)).digest('hex').slice(0, 12);
    nuove[file] = { versione, impronta };
    const prima = vecchie[file];
    if (prima && prima.impronta !== impronta && prima.versione === versione) {
      dimenticati.push(`${file} e' cambiato ma sta ancora a ?v=${versione}`);
    }
  });

  if (dimenticati.length) {
    throw new Error('versione da alzare in build/modello.html:\n  - ' + dimenticati.join('\n  - '));
  }
  fs.writeFileSync(schedario, JSON.stringify(nuove, null, 2) + '\n');
}

const APRI = '<!-- PDFAXIOM:GENERATO -->';
const CHIUDI = '<!-- /PDFAXIOM:GENERATO -->';

// ---------------------------------------------------------------- utilita'

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** Toglie i tag: serve per i dati strutturati e per l'attributo description. */
const soloTesto = (s) => String(s).replace(/<[^>]+>/g, '');

const prefisso = (lingua) => (lingua === 'en' ? '' : `/${lingua}`);
const indirizzo = (lingua, slug) => `${prefisso(lingua)}/${slug || ''}${slug ? '/' : ''}` || '/';
const assoluto = (lingua, slug) => SITO + indirizzo(lingua, slug);

/** Dove finisce il file sul disco. */
function percorsoFile(lingua, slug) {
  const pezzi = [RADICE];
  if (lingua !== 'en') pezzi.push(lingua);
  if (slug) pezzi.push(slug);
  pezzi.push('index.html');
  return path.join(...pezzi);
}

// ---------------------------------------------------------------- modello

// Il modello e' un file a parte, non index.html: index.html e' un prodotto di
// questo comando come tutte le altre 199 pagine. Leggere l'output come modello
// significherebbe rigenerare partendo dai collegamenti gia' sostituiti, e le
// pagine in italiano finirebbero per puntare agli indirizzi inglesi.
const MODELLO = path.join(__dirname, 'modello.html');
const modello = fs.readFileSync(MODELLO, 'utf8');

const guasti = [
  ['</main>', 'manca la chiusura di <main>'],
  ['href="#" class="mega-item"', 'i collegamenti del menu sono gia\' stati sostituiti'],
  ['src="/js/rotte.js', 'manca il richiamo a rotte.js'],
  ['<script defer src="/js/', 'gli script nostri devono essere differiti'],
];
guasti.forEach(([atteso, problema]) => {
  if (!modello.includes(atteso)) {
    throw new Error(`build/modello.html non e' utilizzabile: ${problema}`);
  }
});
if (modello.includes(APRI) || modello.includes('rel="canonical"')) {
  throw new Error('build/modello.html contiene gia\' del generato: va ripulito');
}

// ------------------------------------------------------- pezzi della pagina

const ICONA_BROWSER =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/>' +
  '<path d="M8 21h8M12 17v4"/></svg>';
const ICONA_SERVER =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
  'stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/>' +
  '<rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>';

/** L'elenco di collegamenti veri verso tutti gli strumenti, in quattro colonne.
 *
 * Non e' decorazione: e' la strada che un motore di ricerca percorre per
 * arrivare alle altre 23 pagine, perche' le schede in cima sono div con un
 * gestore di click e nessun crawler le segue. Raggruppato per famiglia perche'
 * ventiquattro righe di fila che cominciano tutte con "Convert" non si leggono.
 */
function indiceStrumenti(lingua, slugCorrente) {
  const c = contenuti[lingua];
  const b = brevi[lingua];

  const colonne = strumenti.GRUPPI.map((gruppo) => {
    const voci = strumenti.filter((s) => s.gruppo === gruppo).map((s) => {
      const testo = esc(b.nomi[s.slug]);
      const corrente = s.slug === slugCorrente ? ' aria-current="page"' : '';
      return `          <li><a href="${indirizzo(lingua, s.slug)}"${corrente}>${testo}</a></li>`;
    }).join('\n');

    return `        <div class="seo-colonna">
          <h3>${esc(b.gruppi[gruppo])}</h3>
          <ul>
${voci}
          </ul>
        </div>`;
  }).join('\n');

  // Sta fuori dal blocco di lettura: quello e' largo 52rem perche' un
  // paragrafo piu' lungo non si legge, ma quattro colonne di collegamenti
  // hanno bisogno di respiro e in 52rem restano strizzate.
  return `  <nav class="seo-indice">
    <div class="seo-indice-dentro">
      <h2>${esc(c.etichette.altri)}</h2>
      <div class="seo-colonne">
${colonne}
      </div>
    </div>
  </nav>`;
}

/** Il blocco di contenuto della pagina di uno strumento. */
function bloccoStrumento(lingua, voce) {
  const c = contenuti[lingua];
  const t = c.strumenti[voce.slug];
  const suBrowser = voce.motore === 'browser';

  const passi = t.passi
    .map((p) => `        <li>${p}</li>`).join('\n');

  const faq = t.faq.map((f) => `        <details>
          <summary>${esc(f.d)}</summary>
          <p>${esc(f.r)}</p>
        </details>`).join('\n');

  return `${APRI}
  <section class="seo-blocco">
    <h1>${esc(t.h1)}</h1>
    <p class="seo-dove">${suBrowser ? ICONA_BROWSER : ICONA_SERVER} ${
      esc(suBrowser ? c.etichette.browserBadge : c.etichette.serverBadge)}</p>
    <p>${t.intro}</p>

    <h2>${esc(c.etichette.passi)}</h2>
    <ol class="seo-passi">
${passi}
    </ol>

    <div class="ad-banner-wrapper ad-banner-in-content" aria-label="Advertisement">
      <span class="ad-label" data-badge="pubblicita">ADVERTISEMENT</span>
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-2272593869740076"
           data-ad-slot="auto"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>

    <h2>${esc(c.etichette.faq)}</h2>
    <div class="seo-faq">
${faq}
    </div>
  </section>

${indiceStrumenti(lingua, voce.slug)}
  ${CHIUDI}`;
}

/** Sulla pagina iniziale basta l'elenco: il testo di apertura c'e' gia'. */
function bloccoCasa(lingua) {
  return `${APRI}
${indiceStrumenti(lingua, null)}
  ${CHIUDI}`;
}

/** Toglie dal modello i blocchi che vanno da apertura a chiusura.
 *
 * Serve alle pagine legali, dove la pubblicita non deve comparire: sei
 * riquadri sopra uninformativa sulla privacy sono la prima cosa che un
 * revisore di AdSense segna, e nemmeno rendono, perche chi apre quella
 * pagina cerca una risposta precisa e non un annuncio.
 *
 * Niente espressioni regolari: i blocchi non contengono altri tag dello
 * stesso tipo annidati, quindi la prima chiusura utile e sempre la loro.
 */
function togliBlocchi(html, apertura, chiusura) {
  let fuori = html;
  for (;;) {
    const i = fuori.indexOf(apertura);
    if (i < 0) break;
    const j = fuori.indexOf(chiusura, i);
    if (j < 0) break;
    fuori = fuori.slice(0, i).replace(/[ 	]+$/, "") + fuori.slice(j + chiusura.length);
  }
  return fuori;
}

/** Il testo di una pagina legale. */
function bloccoLegale(lingua, doc) {
  const sezioni = doc.sezioni.map((s) => `    <h2>${esc(s.t)}</h2>
${s.p.map((p) => `    <p>${p}</p>`).join('\n')}`).join('\n\n');

  return `${APRI}
  <section class="seo-blocco pagina-legale">
    <h1>${esc(doc.titolo)}</h1>
    <p class="legale-data">${esc(doc.aggiornato)}</p>

${sezioni}
  </section>
${indiceStrumenti(lingua, null)}
  ${CHIUDI}`;
}

// -------------------------------------------------------------- intestazione

function hreflang(slug, lingue) {
  const righe = (lingue || LINGUE).map((l) =>
    `  <link rel="alternate" hreflang="${l}" href="${assoluto(l, slug)}">`);
  righe.push(`  <link rel="alternate" hreflang="x-default" href="${assoluto('en', slug)}">`);
  return righe.join('\n');
}

function datiStrutturati(lingua, voce) {
  const c = contenuti[lingua];
  const t = voce ? c.strumenti[voce.slug] : null;
  const url = assoluto(lingua, voce ? voce.slug : '');

  const app = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t ? soloTesto(t.h1) : 'PDFAxiom',
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    description: t ? t.descrizione : soloTesto(c.etichette.altri),
    inLanguage: lingua,
    // Gratuito davvero: nessun piano a pagamento, nessuna registrazione.
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  };

  const blocchi = [app];

  if (t) {
    blocchi.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: t.faq.map((f) => ({
        '@type': 'Question',
        name: f.d,
        acceptedAnswer: { '@type': 'Answer', text: f.r },
      })),
    });
    blocchi.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: soloTesto(t.h1),
      step: t.passi.map((p, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        text: soloTesto(p),
      })),
    });
  }

  return blocchi
    .map((b) => `  <script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('\n');
}

function intestazione(lingua, voce, legale) {
  const c = contenuti[lingua];
  const t = voce ? c.strumenti[voce.slug] : null;
  const slug = legale ? legale.slug : (voce ? voce.slug : '');
  const url = assoluto(lingua, slug);

  // La home non ha ne' voce ne' documento legale: i suoi testi stanno in
  // "casa" dentro contenuti/<lingua>.js. Prima non c'erano e finiva per
  // ereditare titolo e descrizione inglesi del modello in tutte le lingue.
  const testa = legale || t || c.casa;
  const titolo = `${testa.titolo} | PDFAxiom`;
  const descrizione = testa.descrizione;

  const pezzi = [];
  pezzi.push(`  <link rel="canonical" href="${url}">`);
  pezzi.push(hreflang(slug, legale ? LINGUE_LEGALI : LINGUE));
  pezzi.push('');
  pezzi.push(`  <meta property="og:type" content="website">`);
  pezzi.push(`  <meta property="og:site_name" content="PDFAxiom">`);
  pezzi.push(`  <meta property="og:title" content="${esc(titolo)}">`);
  if (descrizione) {
    pezzi.push(`  <meta property="og:description" content="${esc(descrizione)}">`);
  }
  pezzi.push(`  <meta property="og:url" content="${url}">`);
  pezzi.push(`  <meta property="og:locale" content="${lingua}">`);
  pezzi.push(`  <meta property="og:image" content="${SITO}/assets/og-image.png">`);
  pezzi.push(`  <meta property="og:image:width" content="1200">`);
  pezzi.push(`  <meta property="og:image:height" content="630">`);
  pezzi.push(`  <meta name="twitter:card" content="summary_large_image">`);
  pezzi.push(`  <meta name="twitter:title" content="${esc(titolo)}">`);
  if (descrizione) {
    pezzi.push(`  <meta name="twitter:description" content="${esc(descrizione)}">`);
  }
  pezzi.push(`  <meta name="twitter:image" content="${SITO}/assets/og-image.png">`);
  pezzi.push('');
  // Una pagina legale non e' l'applicazione e non risponde a domande: non ha
  // dati strutturati da dichiarare.
  if (!legale) pezzi.push(datiStrutturati(lingua, voce));

  return pezzi.join('\n');
}

// ------------------------------------------------------------------ pagina


/* ---------------------------------------------------------------------
   Traduzione a tempo di compilazione

   Le pagine uscivano tutte con il testo inglese del modello, e i18n.js lo
   riscriveva nella lingua giusta a pagina gia' disegnata. Tre guai in uno:

   - chi apriva /it/ leggeva per quasi un secondo "Convert PDF", "All in
     One", ventiquattro schede in inglese, e poi vedeva tutto cambiare
     sotto gli occhi;
   - quel rifacimento cambiava la larghezza dei testi e faceva assestare
     la pagina di scatto (misurato: 0,0868 di indice dei salti);
   - Google riceveva un <h1> inglese su un indirizzo italiano.

   Adesso il testo giusto e' gia' nel file. i18n.js continua a fare il suo
   lavoro per chi cambia lingua dal menu, ma alla prima apertura non trova
   piu' niente da correggere.

   I dizionari si leggono da js/i18n.js, che resta l'unico posto dove le
   traduzioni stanno scritte. E' un file per il browser, non un modulo, e
   in fondo ha del codice che cerca "document": lo si esegue in una scatola
   con giusto quel tanto di finto browser da non farlo inciampare. */
const dizionari = (() => {
  const vm = require('vm');
  const finto = {
    addEventListener: () => {},
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    documentElement: { setAttribute: () => {} },
    body: { dataset: {}, classList: { add: () => {}, remove: () => {} } }
  };
  const scatola = {
    document: finto,
    localStorage: { getItem: () => null, setItem: () => {} },
    navigator: { language: 'en' },
    console
  };
  scatola.window = scatola;
  vm.createContext(scatola);
  const sorgente = fs.readFileSync(path.join(RADICE, 'js', 'i18n.js'), 'utf8') +
    ';globalThis.__dizionari = { translations, toolTranslations, toolButtons, uiMessages };';
  vm.runInContext(sorgente, scatola, { filename: 'i18n.js' });
  const d = scatola.__dizionari;
  if (!d || !d.translations || !d.toolTranslations || !d.toolButtons || !d.uiMessages) {
    throw new Error('js/i18n.js non ha restituito i dizionari');
  }
  return d;
})();

/* ---------------------------------------------------------------------
   Un dizionario per lingua, invece di otto per tutti

   js/i18n.js porta dentro le traduzioni di tutte e otto le lingue: 87 KB
   che ogni visitatore scaricava, leggeva e compilava per usarne un ottavo.
   Non e' solo peso in rete: 87 KB di codice da interpretare sono un blocco
   del filo principale che ritarda il primo disegno.

   Qui si scrive un file per lingua con dentro quella lingua e l'inglese,
   che serve da ripiego quando una voce manca, piu' il codice tale e quale.
   Ogni pagina carica il suo.

   La fonte resta js/i18n.js: si tocca solo quello, e questi si rifanno da
   se' a ogni generazione. */
function scriviDizionari() {
  const sorgente = fs.readFileSync(path.join(RADICE, 'js', 'i18n.js'), 'utf8');

  // Il file e' in due parti: prima i quattro dizionari, poi il codice che li
  // usa. Il taglio e' la riga in cui comincia il codice.
  const taglio = sorgente.indexOf('window.PDFAxiomI18n = {');
  if (taglio < 0) throw new Error('js/i18n.js: non trovo dove comincia il codice');
  const codice = sorgente.slice(taglio);

  ['translations', 'toolTranslations', 'toolButtons', 'uiMessages'].forEach((n) => {
    if (sorgente.indexOf('const ' + n + ' = {') > taglio) {
      throw new Error('js/i18n.js: ' + n + ' sta dopo il codice, il taglio non regge');
    }
  });

  const quattro = {
    translations: dizionari.translations,
    toolTranslations: dizionari.toolTranslations,
    toolButtons: dizionari.toolButtons,
    uiMessages: dizionari.uiMessages
  };

  let scritti = 0;
  let peso = 0;
  LINGUE.forEach((lingua) => {
    const righe = [
      '/* Generato da build/genera.js: le traduzioni per "' + lingua + '".',
      '   Non modificarlo a mano, le traduzioni stanno in js/i18n.js. */',
      "const LINGUE_PDFAXIOM = " + JSON.stringify(LINGUE) + ";",
      ''
    ];

    Object.keys(quattro).forEach((nome) => {
      const ridotto = {};
      // L'inglese entra sempre: il codice ci ricasca sopra quando una voce
      // manca nella lingua della pagina.
      if (quattro[nome].en) ridotto.en = quattro[nome].en;
      if (quattro[nome][lingua]) ridotto[lingua] = quattro[nome][lingua];
      righe.push('const ' + nome + ' = ' + JSON.stringify(ridotto) + ';');
    });

    righe.push('');
    const testo = righe.join('\n') + '\n' + codice;
    fs.writeFileSync(path.join(RADICE, 'js', 'i18n.' + lingua + '.js'), testo, 'utf8');
    scritti++;
    peso += testo.length;
  });

  return { scritti: scritti, medio: Math.round(peso / scritti / 1024) };
}

/* Sostituisce il testo di un elemento marcato, lasciando stare l'apertura
   del tag: cosi' classi, identificativi e attributi restano dove sono.
   Gli elementi marcati contengono solo testo, mai altri tag. */
function riempiMarcati(html, attributo, dizionario) {
  let fuori = html;
  let da = 0;
  for (;;) {
    const i = fuori.indexOf(attributo + '="', da);
    if (i < 0) break;
    const chiaveDa = i + attributo.length + 2;
    const chiaveA = fuori.indexOf('"', chiaveDa);
    if (chiaveA < 0) break;
    const chiave = fuori.slice(chiaveDa, chiaveA);
    const apre = fuori.indexOf('>', chiaveA);
    const chiude = fuori.indexOf('</', apre);
    if (apre < 0 || chiude < 0) { da = chiaveA; continue; }
    const testo = dizionario[chiave];
    if (testo === undefined || testo === null || testo === '') { da = chiaveA; continue; }
    const nuovo = esc(testo);
    fuori = fuori.slice(0, apre + 1) + nuovo + fuori.slice(chiude);
    da = apre + 1 + nuovo.length;
  }
  return fuori;
}

/* Il nome e la descrizione delle ventiquattro schede, e il nome negli
   elenchi a tendina del menu. */
function riempiStrumenti(html, lingua) {
  const nomi = dizionari.toolTranslations[lingua] || dizionari.toolTranslations.en;
  const nome = (id) => nomi[id] || dizionari.toolTranslations.en[id];
  let fuori = html;

  // schede della griglia
  const marca = 'class="tool-card" data-tool="';
  let da = 0;
  for (;;) {
    const i = fuori.indexOf(marca, da);
    if (i < 0) break;
    const idDa = i + marca.length;
    const idA = fuori.indexOf('"', idDa);
    const voce = nome(fuori.slice(idDa, idA));
    da = idA;
    if (!voce) continue;

    const h3 = fuori.indexOf('<h3>', idA);
    const h3fine = fuori.indexOf('</h3>', h3);
    if (h3 < 0 || h3fine < 0) continue;
    fuori = fuori.slice(0, h3 + 4) + esc(voce.title) + fuori.slice(h3fine);

    const p = fuori.indexOf('<p>', fuori.indexOf('</h3>', h3));
    const pfine = fuori.indexOf('</p>', p);
    if (p < 0 || pfine < 0) { da = h3; continue; }
    fuori = fuori.slice(0, p + 3) + esc(voce.desc) + fuori.slice(pfine);
    da = p;
  }

  // voci degli elenchi a tendina
  da = 0;
  for (;;) {
    const i = fuori.indexOf('class="mega-item" data-tool="', da);
    if (i < 0) break;
    const idDa = i + 'class="mega-item" data-tool="'.length;
    const idA = fuori.indexOf('"', idDa);
    const voce = nome(fuori.slice(idDa, idA));
    const apre = fuori.indexOf('>', idA);
    const chiude = fuori.indexOf('</a>', apre);
    da = idA;
    if (!voce || apre < 0 || chiude < 0) continue;
    fuori = fuori.slice(0, apre + 1) + esc(voce.title) + fuori.slice(chiude);
    da = apre;
  }

  return fuori;
}

/* Sostituisce il contenuto dell'elemento con quell'identificativo. */
function riempiPerId(html, id, testo) {
  const i = html.indexOf('id="' + id + '"');
  if (i < 0) return html;
  const apre = html.indexOf('>', i);
  const chiude = html.indexOf('</', apre);
  if (apre < 0 || chiude < 0) return html;
  return html.slice(0, apre + 1) + esc(testo) + html.slice(chiude);
}

function traduciStatico(html, lingua, voce) {
  const t = dizionari.translations[lingua] || dizionari.translations.en;
  const m = dizionari.uiMessages[lingua] || dizionari.uiMessages.en;
  let fuori = riempiMarcati(html, 'data-i18n', t);
  fuori = riempiMarcati(fuori, 'data-badge', m);
  fuori = riempiMarcati(fuori, 'data-piede', m);
  fuori = riempiStrumenti(fuori, lingua);

  /* Sulla pagina di uno strumento, il pannello nasce gia' intestato a lui.
     Questi tre pezzi li scriveva app.js dopo il disegno, e sono le scritte
     piu' grandi della pagina: cambiarle a cose fatte si vedeva eccome.
     Va dopo i marcati, altrimenti data-i18n="processBtn" rimetterebbe
     l'etichetta generica sopra quella dello strumento. */
  if (voce) {
    const nomi = dizionari.toolTranslations[lingua] || dizionari.toolTranslations.en;
    const pulsanti = dizionari.toolButtons[lingua] || dizionari.toolButtons.en;
    const suo = nomi[voce.tool] || dizionari.toolTranslations.en[voce.tool];
    const etichetta = pulsanti[voce.tool] || dizionari.toolButtons.en[voce.tool];
    if (suo) {
      fuori = riempiPerId(fuori, 'workspaceTitle', suo.title);
      fuori = riempiPerId(fuori, 'workspaceDesc', suo.desc);
    }
    if (etichetta) fuori = riempiPerId(fuori, 'processBtnText', etichetta);
  }

  return fuori;
}

function componi(lingua, voce, legale) {
  const c = contenuti[lingua];
  const t = voce ? c.strumenti[voce.slug] : null;
  let html = modello;

  html = html.replace('<!DOCTYPE html>',
    '<!DOCTYPE html>\n<!-- Pagina generata da build/genera.js.\n' +
    '     Non modificarla a mano: le modifiche vanno in build/modello.html\n' +
    '     (struttura) o in build/contenuti/*.js (testi), poi si rilancia\n' +
    '     "node build/genera.js". -->');

  html = html.replace('<html lang="en"', `<html lang="${lingua}"`);

  // Anche la home ha i suoi testi (in "casa"), quindi titolo e descrizione si
  // sostituiscono sempre: il modello non deve piu' sopravvivere da nessuna
  // parte.
  const testa = legale || t || c.casa;
  html = html.replace(/<title>[\s\S]*?<\/title>/,
    `<title>${esc(testa.titolo)} | PDFAxiom</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/,
    `<meta name="description" content="${esc(testa.descrizione)}">`);

  if (legale || t) {
    // Una pagina deve avere un solo h1, e qui quell'h1 e' il titolo della
    // pagina. Il titolo dell'intestazione scende di grado (resta identico a
    // vedersi: e' la stessa classe che lo compone). Sulla home invece l'h1
    // resta al suo posto: e' gia' il titolo della pagina.
    //
    // Gli attributi dell'h1 passano al p: dentro c'e' il data-i18n che dice
    // a traduciStatico quale testo scriverci. Prima questa espressione
    // pretendeva un <h1> nudo, e quando all'h1 e' stato aggiunto l'attributo
    // ha smesso di combaciare senza dire niente: ogni pagina di strumento e
    // ogni pagina legale si e' ritrovata con due h1, il primo dei quali era
    // il motto del sito. Il controllo qui sotto esiste per questo.
    html = html.replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/,
      '<p class="hero-titolo"$1>$2</p>');
  }

  // Sulle pagine legali non c'e' niente da convertire: via l'apertura, le
  // schede e lo spazio di lavoro, che qui sarebbero solo rumore.
  if (legale) {
    html = html.replace('<body>', '<body class="solo-testo">');

    // Sulle pagine legali non entra nulla di pubblicitario: ne i riquadri,
    // ne lo script che li riempie.
    html = togliBlocchi(html, '<div class="ad-banner-wrapper', '</div>');
    html = togliBlocchi(html, '<aside class="ad-skyscraper', '</aside>');
    html = togliBlocchi(html, '<!-- Google AdSense', '</script>');
  } else if (voce) {
    html = html.replace('<body>', '<body class="pagina-strumento">');

    /* La pagina di uno strumento nasce gia' aperta su quello strumento.

       Prima usciva identica alla pagina iniziale - apertura, schede,
       ventiquattro riquadri - e app.js, a pagina gia' disegnata,
       nascondeva tutto e apriva il pannello. Per quasi mezzo secondo chi
       apriva /it/rotate-pdf/ si trovava davanti la pagina iniziale, e poi
       la vedeva cambiare da sola. Ed era un salto vero, misurato: 0,09 di
       indice, il solo rimasto dopo aver sistemato le traduzioni.

       "display: block" va scritto per esteso: il foglio di stile ha una
       regola che cerca proprio questa scritta dentro l'attributo per dare
       aria al pannello, e app.js scrive la stessa cosa. Combaciando, al
       caricamento non cambia piu' niente. */
    const daChiudere = [
      ['<section id="heroSection" class="hero">',
       '<section id="heroSection" class="hero" style="display: none">'],
      ['<div class="category-tabs">',
       '<div class="category-tabs" style="display: none">'],
      ['<div id="toolsGrid" class="tools-grid">',
       '<div id="toolsGrid" class="tools-grid" style="display: none">'],
      ['<div id="toolWorkspace" class="tool-workspace">',
       '<div id="toolWorkspace" class="tool-workspace" style="display: block">']
    ];
    daChiudere.forEach(([da, a]) => {
      if (!html.includes(da)) throw new Error('modello cambiato, non trovo: ' + da);
      html = html.replace(da, a);
    });
  } else {
    html = html.replace('<body>', '<body class="pagina-home">');
  }

  // L'intestazione va subito dopo la description, prima dei fogli di stile.
  html = html.replace(/(<meta name="description" content="[^"]*">)/,
    `$1\n${intestazione(lingua, voce, legale)}`);

  // I collegamenti del menu diventano indirizzi veri: app.js continua a
  // intercettare il click, ma un motore di ricerca ora ha una strada da
  // percorrere invece di 24 ancore vuote.
  html = html.replace(/href="#" class="mega-item" data-tool="([\w-]+)"/g,
    (intero, idStrumento) => {
      const s = strumenti.find((x) => x.tool === idStrumento);
      return s
        ? `href="${indirizzo(lingua, s.slug)}" class="mega-item" data-tool="${idStrumento}"`
        : intero;
    });

  // Il logo riporta alla pagina iniziale della lingua giusta.
  html = html.replace('<a href="#" class="logo">',
    `<a href="${indirizzo(lingua, '')}" class="logo">`);

  // Privacy e condizioni esistono in inglese e italiano: chi legge in tedesco
  // o in russo viene mandato alla versione inglese, che e' l'unica che
  // possiamo garantire fedele.
  const linguaLegale = LINGUE_LEGALI.includes(lingua) ? lingua : 'en';
  ['about', 'privacy', 'terms'].forEach((quale) => {
    const doc = legali[linguaLegale][quale];
    html = html.replace(`href="/${quale}/"`,
      `href="${indirizzo(linguaLegale, doc.slug)}"`);
  });
  if (LINGUE_LEGALI.includes(lingua) && lingua !== 'en') {
    html = html.replace('>Privacy</a>', `>${esc(legali[lingua].privacy.titolo)}</a>`)
               .replace('>Terms</a>', `>${esc(legali[lingua].terms.titolo)}</a>`);
  }

  // Quale strumento apre questa pagina, e in che lingua e' scritta.
  const dichiarazione = `  <script>window.PDFAXIOM_LANG=${JSON.stringify(lingua)};` +
    (voce ? `window.PDFAXIOM_TOOL=${JSON.stringify(voce.tool)};` : '') + `</script>\n`;
  // L'aggancio prende solo l'indirizzo, non il tag intero: quando agli
  // script e' stato aggiunto "defer" questa riga ha smesso di combaciare e
  // la dichiarazione non veniva piu' inserita, senza che nessuno se ne
  // accorgesse. Senza quella riga app.js non sa quale strumento aprire, e
  // tutte e ventiquattro le pagine degli strumenti smettevano di accettare
  // i file. Il controllo in fondo a componi esiste perche' non si ripeta.
  const aggancio = '<script defer src="/js/rotte.js';
  if (!html.includes(aggancio)) {
    throw new Error('modello cambiato: non trovo dove mettere la dichiarazione');
  }
  html = html.replace(aggancio, dichiarazione + '  ' + aggancio);

  // Il contenuto leggibile va dopo lo spazio di lavoro, dove resta visibile
  // anche a strumento aperto.
  const blocco = legale ? bloccoLegale(lingua, legale)
    : (voce ? bloccoStrumento(lingua, voce) : bloccoCasa(lingua));
  html = html.replace('</main>', `</main>\n\n  ${blocco}`);

  // Ultimo passaggio: i testi dell'interfaccia nella lingua della pagina.
  // Va per ultimo, cosi' prende anche i pezzi aggiunti qui sopra.
  // Ogni pagina si porta il dizionario della sua lingua e basta.
  html = html.replace('/js/i18n.js?v=', `/js/i18n.${lingua}.js?v=`);

  html = traduciStatico(html, lingua, voce);

  /* Un titolo principale per pagina, non due.

     Non e' una regola di stile: e' il modo in cui un motore di ricerca
     capisce di cosa parla la pagina. Questo controllo ferma la generazione
     invece di lasciar uscire 206 pagine sbagliate, che era quello che era
     appena successo. */
  const dove = legale ? legale.slug : (voce ? voce.slug : 'pagina iniziale');

  const quantiH1 = (html.match(/<h1\b/g) || []).length;
  if (quantiH1 !== 1) {
    throw new Error(`${lingua}/${dove}: ${quantiH1} titoli h1, ne serve esattamente 1`);
  }

  /* La pagina deve dire a JavaScript in che lingua e' scritta e, se e' la
     pagina di uno strumento, quale strumento apre. Senza, app.js non apre
     niente e i file non vengono accettati: il sito sembra funzionare finche'
     non ci si prova davvero. */
  if (html.indexOf('window.PDFAXIOM_LANG=') < 0) {
    throw new Error(`${lingua}/${dove}: manca la dichiarazione della lingua`);
  }
  if (voce && html.indexOf('window.PDFAXIOM_TOOL=') < 0) {
    throw new Error(`${lingua}/${dove}: manca la dichiarazione dello strumento`);
  }

  /* E deve caricare il dizionario della sua lingua, non quello generale. */
  if (html.indexOf(`/js/i18n.${lingua}.js`) < 0) {
    throw new Error(`${lingua}/${dove}: non carica il proprio dizionario`);
  }

  return html;
}

// ------------------------------------------------------------------ scrive

let scritte = 0;
const dizionariScritti = scriviDizionari();

const indirizzi = [];

LINGUE.forEach((lingua) => {
  // pagina iniziale della lingua
  const casa = percorsoFile(lingua, null);
  fs.mkdirSync(path.dirname(casa), { recursive: true });
  fs.writeFileSync(casa, componi(lingua, null), 'utf8');
  indirizzi.push({ url: assoluto(lingua, ''), priorita: lingua === 'en' ? '1.0' : '0.9' });
  scritte++;

  strumenti.forEach((voce) => {
    const dove = percorsoFile(lingua, voce.slug);
    fs.mkdirSync(path.dirname(dove), { recursive: true });
    fs.writeFileSync(dove, componi(lingua, voce), 'utf8');
    indirizzi.push({ url: assoluto(lingua, voce.slug), priorita: lingua === 'en' ? '0.9' : '0.7' });
    scritte++;
  });
});

// Informativa sulla privacy e condizioni d'uso, in inglese e in italiano.
LINGUE_LEGALI.forEach((lingua) => {
  ['about', 'privacy', 'terms'].forEach((quale) => {
    const doc = legali[lingua][quale];
    const dove = percorsoFile(lingua, doc.slug);
    fs.mkdirSync(path.dirname(dove), { recursive: true });
    fs.writeFileSync(dove, componi(lingua, null, doc), 'utf8');
    indirizzi.push({ url: assoluto(lingua, doc.slug), priorita: '0.3' });
    scritte++;
  });
});

// ----------------------------------------------------------------- sitemap

const oggi = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indirizzi.map(({ url, priorita }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${oggi}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorita}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(RADICE, 'sitemap.xml'), sitemap, 'utf8');

console.log(`pagine scritte:   ${scritte}`);
console.log(`lingue:           ${LINGUE.length}`);
console.log(`strumenti:        ${strumenti.length}`);
console.log(`indirizzi in sitemap: ${indirizzi.length}`);
