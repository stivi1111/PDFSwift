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

// L'inglese vive nella radice del sito, le altre lingue in una cartella.
// LINGUE=en,it limita la generazione: comodo per provare una modifica al
// modello senza riscrivere duecento file.
const LINGUE = (process.env.LINGUE || 'en,it,es,de,zh,ro,hi,ru').split(',');
const contenuti = {};
LINGUE.forEach((l) => { contenuti[l] = require(`./contenuti/${l}`); });

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
  ['<script src="/js/rotte.js', 'manca il richiamo a rotte.js'],
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

/** L'elenco di collegamenti veri verso tutti gli strumenti. */
function indiceStrumenti(lingua, slugCorrente) {
  const c = contenuti[lingua];
  const voci = strumenti.map((s) => {
    const testo = esc(c.strumenti[s.slug].h1);
    const corrente = s.slug === slugCorrente ? ' aria-current="page"' : '';
    return `        <li><a href="${indirizzo(lingua, s.slug)}"${corrente}>${testo}</a></li>`;
  }).join('\n');

  return `    <nav class="seo-indice">
      <h2>${esc(c.etichette.altri)}</h2>
      <ul>
${voci}
      </ul>
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

    <h2>${esc(c.etichette.faq)}</h2>
    <div class="seo-faq">
${faq}
    </div>

${indiceStrumenti(lingua, voce.slug)}
  </section>
  ${CHIUDI}`;
}

/** Sulla pagina iniziale basta l'elenco: il testo di apertura c'e' gia'. */
function bloccoCasa(lingua) {
  return `${APRI}
  <section class="seo-blocco">
${indiceStrumenti(lingua, null)}
  </section>
  ${CHIUDI}`;
}

// -------------------------------------------------------------- intestazione

function hreflang(slug) {
  const righe = LINGUE.map((l) =>
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

function intestazione(lingua, voce) {
  const c = contenuti[lingua];
  const t = voce ? c.strumenti[voce.slug] : null;
  const slug = voce ? voce.slug : '';
  const url = assoluto(lingua, slug);

  const titolo = t ? `${t.titolo} | PDFAxiom` : 'PDFAXIOM';
  const descrizione = t ? t.descrizione : null;

  const pezzi = [];
  pezzi.push(`  <link rel="canonical" href="${url}">`);
  pezzi.push(hreflang(slug));
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
  pezzi.push(datiStrutturati(lingua, voce));

  return pezzi.join('\n');
}

// ------------------------------------------------------------------ pagina

function componi(lingua, voce) {
  const c = contenuti[lingua];
  const t = voce ? c.strumenti[voce.slug] : null;
  let html = modello;

  html = html.replace('<!DOCTYPE html>',
    '<!DOCTYPE html>\n<!-- Pagina generata da build/genera.js.\n' +
    '     Non modificarla a mano: le modifiche vanno in build/modello.html\n' +
    '     (struttura) o in build/contenuti/*.js (testi), poi si rilancia\n' +
    '     "node build/genera.js". -->');

  html = html.replace('<html lang="en"', `<html lang="${lingua}"`);

  if (t) {
    html = html.replace(/<title>[\s\S]*?<\/title>/,
      `<title>${esc(t.titolo)} | PDFAxiom</title>`);
    html = html.replace(/<meta name="description" content="[^"]*">/,
      `<meta name="description" content="${esc(t.descrizione)}">`);

    // Una pagina deve avere un solo h1, e su una pagina di strumento quell'h1
    // e' il nome dello strumento. Il titolo dell'intestazione scende di grado
    // (resta identico a vedersi: e' la stessa classe che lo compone).
    html = html.replace(/<h1>([\s\S]*?)<\/h1>/,
      '<p class="hero-titolo">$1</p>');
  }

  // L'intestazione va subito dopo la description, prima dei fogli di stile.
  html = html.replace(/(<meta name="description" content="[^"]*">)/,
    `$1\n${intestazione(lingua, voce)}`);

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

  // Quale strumento apre questa pagina, e in che lingua e' scritta.
  const dichiarazione = `  <script>window.PDFAXIOM_LANG=${JSON.stringify(lingua)};` +
    (voce ? `window.PDFAXIOM_TOOL=${JSON.stringify(voce.tool)};` : '') + `</script>\n`;
  html = html.replace('  <script src="/js/rotte.js', dichiarazione + '  <script src="/js/rotte.js');

  // Il contenuto leggibile va dopo lo spazio di lavoro, dove resta visibile
  // anche a strumento aperto.
  const blocco = voce ? bloccoStrumento(lingua, voce) : bloccoCasa(lingua);
  html = html.replace('</main>', `</main>\n\n  ${blocco}`);

  return html;
}

// ------------------------------------------------------------------ scrive

let scritte = 0;
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
