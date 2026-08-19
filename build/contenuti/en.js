/**
 * Testi in inglese delle 24 pagine.
 *
 * Ogni pagina dice cose che le altre non dicono: e' l'unico modo perche' un
 * motore di ricerca le consideri pagine distinte invece che copie. I limiti
 * reali (100 MB, niente riconoscimento del testo nelle scansioni) sono scritti
 * apposta: chi arriva sapendo cosa aspettarsi non se ne va deluso.
 */
module.exports = {
  lingua: 'English',

  // Testa della home. Il nome del sito da solo non lo cerca nessuno: qui
  // vanno le parole che la gente digita davvero.
  casa: {
    titolo: 'Free PDF Tools to Convert, Compress and Edit Online',
    descrizione: 'Convert PDF to Word, Word to PDF, Excel, PowerPoint, merge, split, compress and edit PDF files. Free, no signup, files deleted right after conversion.',
  },

  etichette: {
    passi: 'How to do it',
    faq: 'Common questions',
    altri: 'All 24 PDF tools',
    apri: 'Open the tool',
    browserBadge: 'Runs in your browser — the file never leaves your device',
    serverBadge: 'Processed on our server, then deleted right away',
  },

  strumenti: {
    'pdf-to-word': {
      titolo: 'PDF to Word Converter — Free, No Signup',
      descrizione: 'Turn a PDF into an editable Word document. Keeps headings, tables and images. Free, no account, up to 100 MB.',
      h1: 'Convert PDF to Word',
      intro: 'This turns a PDF back into an editable <strong>.docx</strong> file, rebuilding paragraphs, tables, headings and images rather than pasting each page in as a picture. Running headers, footers and page numbers are detected and moved into the Word header instead of being dumped into the middle of your text.',
      passi: [
        'Drop in the PDF you want to edit, or click to pick it from your device.',
        'Wait for the conversion — a 10-page document takes a handful of seconds, a 200-page book about a minute.',
        'Download the .docx and open it in Word, Google Docs, LibreOffice or Pages.',
      ],
      faq: [
        { d: 'Will the layout survive?', r: 'Text, tables, headings, lists and images come through. Complex vector charts are converted into images, because in Word they would not be editable anyway.' },
        { d: 'Does it work on a scanned PDF?', r: 'No. If the PDF is a photograph of pages with no text layer, there is nothing to extract and the Word file will contain only the images. We do not do character recognition.' },
        { d: 'How large a file can I send?', r: 'Up to 100 MB, and up to 400 pages. For longer books, split the PDF first and convert the parts.' },
      ],
    },

    'word-to-pdf': {
      titolo: 'Word to PDF Converter — Free and Accurate',
      descrizione: 'Convert .docx or .doc into a clean PDF that looks the same everywhere. Free, no signup, up to 100 MB.',
      h1: 'Convert Word to PDF',
      intro: 'Turns a Word document into a PDF that looks identical on every device, which is the whole point of sending a PDF instead of a .docx. Page breaks, fonts, tables and images stay where you put them.',
      passi: [
        'Upload your .docx or .doc file.',
        'The document is rendered by LibreOffice, the same engine that reads Word files most faithfully outside Microsoft Office.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Will my fonts look right?', r: 'Common fonts are installed on our server and render exactly. A very unusual font may be substituted, which can shift the layout slightly — embed it in the .docx or stick to standard faces if the layout is critical.' },
        { d: 'Does it keep the table of contents clickable?', r: 'Yes, internal links and bookmarks survive the conversion.' },
        { d: 'Can I convert an old .doc file?', r: 'Yes, both the modern .docx and the legacy .doc format are accepted.' },
      ],
    },

    'pdf-to-excel': {
      titolo: 'PDF to Excel — Extract Tables to .xlsx Free',
      descrizione: 'Pull tables out of a PDF into a real Excel spreadsheet with working cells. Free, no account needed.',
      h1: 'Convert PDF to Excel',
      intro: 'Finds the tables inside a PDF and rebuilds them as real spreadsheet cells you can sort and calculate with — not a picture of a table. Every table found becomes its own sheet in the .xlsx.',
      passi: [
        'Upload the PDF containing the tables.',
        'Two detection methods are tried: a fast one that reads the alignment of the text, and a slower one that follows the drawn borders. Whichever gives the cleaner result is kept.',
        'Download the .xlsx and open it in Excel, Numbers or Google Sheets.',
      ],
      faq: [
        { d: 'What if it says no table was found?', r: 'That happens when the page has no table our detector recognises — most often a table drawn without any lines and with irregular spacing. It fails honestly instead of handing you a mangled file.' },
        { d: 'Do merged cells survive?', r: 'Usually yes for tables with drawn borders. Borderless tables with merged cells are the hardest case and may come out flattened.' },
        { d: 'Will it read a scanned table?', r: 'No. A scan has no text to extract, only pixels.' },
      ],
    },

    'excel-to-pdf': {
      titolo: 'Excel to PDF Converter — Free, Keeps Formatting',
      descrizione: 'Turn .xlsx, .xls or .csv into a clean PDF with your formatting intact. Free and without registration.',
      h1: 'Convert Excel to PDF',
      intro: 'Prints your spreadsheet to PDF the way it would come out of Excel, keeping number formats, colours, borders and column widths. Useful when you need to send figures that nobody should be able to edit by accident.',
      passi: [
        'Upload the .xlsx, .xls or .csv file.',
        'Each sheet is laid out and paginated.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Are all sheets included?', r: 'Yes, every sheet in the workbook is rendered in order.' },
        { d: 'Do formulas come through?', r: 'The results do. A PDF has no concept of a formula, so what you see is the calculated value.' },
        { d: 'Can I convert a plain CSV?', r: 'Yes. A CSV is laid out as a simple table.' },
      ],
    },

    'pdf-to-powerpoint': {
      titolo: 'PDF to PowerPoint — Convert to .pptx Free',
      descrizione: 'Turn PDF pages into PowerPoint slides you can edit. Free, no signup, up to 100 MB.',
      h1: 'Convert PDF to PowerPoint',
      intro: 'Turns each page of a PDF into a slide in a .pptx presentation, with the text kept as real text boxes rather than flattened into an image, so you can still edit what is written.',
      passi: [
        'Upload the PDF — a deck that was exported to PDF works best.',
        'Each page becomes one slide.',
        'Download the .pptx and open it in PowerPoint, Keynote or Google Slides.',
      ],
      faq: [
        { d: 'Can I edit the text afterwards?', r: 'Yes. The text is placed in editable boxes, not baked into a picture.' },
        { d: 'Do animations come back?', r: 'No. A PDF does not record animations or transitions — that information was lost when the deck was exported.' },
        { d: 'What if my PDF is not a presentation?', r: 'It still works, but a portrait A4 page turned into a landscape slide will look odd. This tool is meant for decks.' },
      ],
    },

    'powerpoint-to-pdf': {
      titolo: 'PowerPoint to PDF — Free .pptx Converter',
      descrizione: 'Convert a PowerPoint presentation into a PDF anyone can open. Free, no account, up to 100 MB.',
      h1: 'Convert PowerPoint to PDF',
      intro: 'Turns a presentation into a PDF so it opens the same way on any device, with no missing fonts and no risk of someone editing your slides.',
      passi: [
        'Upload your .pptx or .ppt file.',
        'Each slide is rendered to one PDF page.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Are speaker notes included?', r: 'No, only the slides themselves.' },
        { d: 'What happens to videos in the deck?', r: 'A PDF cannot play video, so a still frame is kept in its place.' },
        { d: 'Do the slide dimensions stay the same?', r: 'Yes, a 16:9 deck produces 16:9 PDF pages.' },
      ],
    },

    'pdf-to-html': {
      titolo: 'PDF to HTML Converter — Free, Keeps the Layout',
      descrizione: 'Turn a PDF into a web page that looks like the original, fonts and layout included. Free, no signup.',
      h1: 'Convert PDF to HTML',
      intro: 'Produces a single HTML file that reproduces the PDF page for page in a browser, embedding the fonts and images so the result looks right without any extra files alongside it.',
      passi: [
        'Upload the PDF.',
        'The pages are converted into HTML with the fonts embedded.',
        'Download the .html file and open it in any browser.',
      ],
      faq: [
        { d: 'Is the HTML clean enough to edit by hand?', r: 'Not really. The conversion prioritises looking identical to the PDF, so text is positioned precisely rather than written as simple paragraphs. It is made for viewing and publishing, not for hand-editing.' },
        { d: 'Why is the file so big?', r: 'The fonts and images are packed inside it so the page works on its own, without depending on anything external.' },
        { d: 'Can I put it on a website?', r: 'Yes, it is a self-contained file you can upload anywhere.' },
      ],
    },

    'html-to-pdf': {
      titolo: 'HTML to PDF Converter — Free Web Page to PDF',
      descrizione: 'Turn an HTML file into a PDF rendered by a real browser engine. Free, no registration.',
      h1: 'Convert HTML to PDF',
      intro: 'Renders your HTML with Chromium, the engine behind Chrome, so the PDF looks the way the page looks in a browser — stylesheets, layout and all.',
      passi: [
        'Upload your .html or .txt file.',
        'The page is rendered and paginated onto A4.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Does it apply my CSS?', r: 'Yes, styles inside the file are applied. Styles loaded from an external address are not fetched.' },
        { d: 'Will JavaScript run?', r: 'Scripts inside the file execute before the page is captured, so content generated at load time appears.' },
        { d: 'Can I convert a live website by its address?', r: 'Not with this tool — save the page as an HTML file first and upload it.' },
      ],
    },

    'markdown-to-pdf': {
      titolo: 'Markdown to PDF — Free .md Converter',
      descrizione: 'Turn Markdown into a properly typeset PDF with headings, code blocks and tables. Free, no signup.',
      h1: 'Convert Markdown to PDF',
      intro: 'Takes a Markdown file and typesets it as a real document: headings in a proper hierarchy, code blocks in a monospace face, tables drawn with borders, links kept clickable.',
      passi: [
        'Upload your .md, .markdown or .txt file.',
        'The Markdown is converted to a styled document and rendered to PDF.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Which Markdown flavour is supported?', r: 'Standard Markdown plus the common extensions: tables, fenced code blocks, task lists and strikethrough.' },
        { d: 'Do images work?', r: 'Images referenced by a web address are included. Images pointing at files on your computer cannot be fetched.' },
        { d: 'Is the code syntax highlighted?', r: 'Code blocks are set in a monospace font on a tinted background; colour highlighting per language is not applied.' },
      ],
    },

    'compress-pdf': {
      titolo: 'Compress PDF — Reduce File Size Free',
      descrizione: 'Shrink a PDF with three quality levels, from light to maximum. Measured: up to 40% smaller. Free.',
      h1: 'Compress PDF',
      intro: 'Reduces the size of a PDF by re-encoding the images inside it, with three levels so you choose the trade-off yourself instead of accepting whatever the tool decides.',
      passi: [
        'Upload the PDF you want to shrink.',
        'Pick a level: <strong>Light</strong> keeps print quality, <strong>Balanced</strong> is the sensible default, <strong>Maximum</strong> makes the smallest file for screen and email.',
        'Download the compressed PDF.',
      ],
      faq: [
        { d: 'How much smaller does it get?', r: 'Measured on a real 5 MB document: about 19% smaller on Light, 34% on Balanced, 40% on Maximum. A PDF that is mostly text has little to squeeze; one full of photographs has a lot.' },
        { d: 'Does the text get blurry?', r: 'No. Text and vector drawings stay sharp at every level — only the images are re-encoded.' },
        { d: 'Which level should I pick?', r: 'Balanced for almost everything. Light if the document is going to a printer. Maximum only if it has to fit an email attachment limit.' },
      ],
    },

    'protect-pdf': {
      titolo: 'Protect PDF with Password — Free AES-256',
      descrizione: 'Lock a PDF with a password and real AES-256 encryption. Free, no account, file deleted after.',
      h1: 'Password Protect a PDF',
      intro: 'Encrypts the PDF with <strong>AES-256</strong>, the same standard used for classified documents, so the file cannot be opened at all without the password. This is genuine encryption, not a flag that a reader can ignore.',
      passi: [
        'Upload the PDF you want to lock.',
        'Type the password that will be needed to open it.',
        'Download the protected file and share the password separately from the document.',
      ],
      faq: [
        { d: 'Is this real encryption?', r: 'Yes — AES-256. Many browser-based tools only set a "do not print" flag that any reader can ignore. Ours re-encrypts the file so the content is unreadable without the password.' },
        { d: 'What if I forget the password?', r: 'Nobody can recover it, including us. That is the point of encryption. Keep it somewhere safe.' },
        { d: 'Can it be removed later?', r: 'Yes, with our Unlock PDF tool — but only if you know the password.' },
      ],
    },

    'unlock-pdf': {
      titolo: 'Unlock PDF — Remove Password and Restrictions',
      descrizione: 'Remove the password from a PDF you own so you can print, copy and edit it. Free, no signup.',
      h1: 'Unlock a PDF',
      intro: 'Removes the password and the restrictions on printing, copying and editing from a PDF, producing a normal file you can use freely. You need to know the current password.',
      passi: [
        'Upload the protected PDF.',
        'Enter its current password.',
        'Download the unlocked file.',
      ],
      faq: [
        { d: 'Can it open a PDF whose password I do not know?', r: 'No, and it is not meant to. This removes protection from documents you already have the right to open.' },
        { d: 'Does it remove printing and copying limits too?', r: 'Yes. Once the encryption is gone, the permission flags go with it.' },
        { d: 'Will the content change?', r: 'No. Only the protection layer is removed; pages, text and images are untouched.' },
      ],
    },

    'ocr-pdf': {
      titolo: "OCR PDF — Make a scanned PDF searchable, free",
      descrizione: "Turn a scanned PDF into one you can search, select and copy. The page looks identical. Free, no signup, no page watermark.",
      h1: "Make a scanned PDF searchable",
      intro: "A scanned page is a photograph: your eyes read it, your computer sees only pixels. This tool reads the page and writes the recognised text invisibly underneath the image, so the document looks exactly as before but you can search it, select it and copy from it. The original image keeps its resolution.",
      passi: [
        "Upload the scanned PDF. Up to 50 pages.",
        "Every page is straightened, read, and given an invisible text layer beneath the original image.",
        "Download the searchable PDF. It is usually smaller than the file you uploaded.",
      ],
      faq: [
        { d: "Does it change how the pages look?", r: "No. The image is kept at its original resolution and the recognised text goes underneath it, where you cannot see it. What changes is that Ctrl+F now finds things." },
        { d: "Does it read handwriting?", r: "Badly, and we would rather say so. On printed pages it recovers around eight words in ten; on handwritten notes it produces mostly nonsense. If your file is a photographed notebook, this tool will disappoint you." },
        { d: "What about formulas and subscripts?", r: "Subscripts are the first thing lost. In a maths document M subscript zero and M subscript el both come out as plain M, so the prose is recovered but the formulas are not." },
        { d: "My PDF already has text in it. What happens?", r: "Nothing, on purpose. Running recognition over a good text layer would replace it with a worse one, so pages that already contain text are left untouched." },
      ],
    },
    'grayscale-pdf': {
      titolo: 'Grayscale PDF — Convert to Black and White Free',
      descrizione: 'Turn a colour PDF into greyscale to save ink when printing. Text stays sharp. Free, no account.',
      h1: 'Convert a PDF to Greyscale',
      intro: 'Converts every colour in the document into shades of grey, which cuts colour ink use when printing and makes scanned-looking documents more consistent. The text stays as text and stays sharp.',
      passi: [
        'Upload the colour PDF.',
        'Colours are mapped to grey while text and vector shapes are preserved as they are.',
        'Download the greyscale PDF.',
      ],
      faq: [
        { d: 'Does it turn the pages into images?', r: 'No. This is a common shortcut in other tools and it makes text fuzzy and unselectable. Here the text stays real text.' },
        { d: 'Can I get the colours back?', r: 'Not from the greyscale file — the colour information is gone. Keep your original.' },
        { d: 'Will it make the file smaller?', r: 'Often slightly, since grey needs less data than colour, but that is a side effect rather than the goal.' },
      ],
    },

    'pdf-to-markdown': {
      titolo: 'PDF to Markdown — Free .md for AI and Notion',
      descrizione: 'Turn a PDF into clean Markdown for ChatGPT, Claude, Obsidian or Notion. Runs in your browser.',
      h1: 'Convert PDF to Markdown',
      intro: 'Extracts the text of a PDF as clean Markdown, which is the format language models and note apps read best. This one runs entirely inside your browser — the document never leaves your computer.',
      passi: [
        'Drop in the PDF.',
        'The text is extracted and structured with Markdown headings and paragraphs.',
        'Download the .md file and paste it wherever you need it.',
      ],
      faq: [
        { d: 'Why Markdown for AI tools?', r: 'It carries structure — headings, lists, emphasis — in plain text, so a model reads the shape of the document instead of an undifferentiated wall of words.' },
        { d: 'Does my file get uploaded?', r: 'No. This tool runs in your browser. Nothing is sent anywhere.' },
        { d: 'Does it keep images?', r: 'No, only the text. Markdown cannot carry embedded pictures on its own.' },
      ],
    },

    'merge-pdf': {
      titolo: 'Merge PDF — Combine Files Free, In Your Browser',
      descrizione: 'Join several PDFs into one, in the order you choose. Runs in your browser, files never uploaded.',
      h1: 'Merge PDF Files',
      intro: 'Joins several PDFs into a single document in the order you add them. It runs entirely in your browser, which means your files are never uploaded anywhere — worth knowing when the documents are contracts or medical records.',
      passi: [
        'Select or drop all the PDFs you want to join.',
        'They are merged in the order they appear in the list.',
        'Download the combined PDF.',
      ],
      faq: [
        { d: 'Are my files uploaded to a server?', r: 'No. Merging happens inside your browser and the files stay on your device.' },
        { d: 'How many can I merge at once?', r: 'As many as your device can hold in memory. Dozens of ordinary documents is not a problem.' },
        { d: 'Do bookmarks and links survive?', r: 'Page content and internal links within each document are preserved.' },
      ],
    },

    'split-pdf': {
      titolo: 'Split PDF — Extract Pages Free, In Your Browser',
      descrizione: 'Pull out specific pages or ranges from a PDF into a new file. Runs in your browser, nothing uploaded.',
      h1: 'Split a PDF',
      intro: 'Takes the pages you name and puts them into a new PDF, leaving the original untouched. Useful for pulling one chapter out of a book or a single invoice out of a batch. It runs in your browser.',
      passi: [
        'Drop in the PDF.',
        'Type the pages you want, like <strong>1-3, 7, 12-15</strong>.',
        'Download the new PDF with just those pages.',
      ],
      faq: [
        { d: 'How do I write the page range?', r: 'Ranges with a hyphen and single pages separated by commas: 1-3, 7, 12-15.' },
        { d: 'Is my document uploaded?', r: 'No, the split happens in your browser.' },
        { d: 'Can I split into many separate files at once?', r: 'This tool produces one file per run. Run it again with a different range for each part you need.' },
      ],
    },

    'pdf-to-jpg': {
      titolo: 'PDF to JPG — Convert Pages to Images Free',
      descrizione: 'Turn every PDF page into a high-resolution image, delivered as a ZIP. Runs in your browser.',
      h1: 'Convert PDF to JPG',
      intro: 'Renders every page of the PDF as a high-resolution image and packs them into a ZIP. Handy for slides, social posts or anywhere a picture is easier to use than a document. Runs in your browser.',
      passi: [
        'Drop in the PDF.',
        'Each page is rendered at high resolution.',
        'Download the ZIP containing one image per page.',
      ],
      faq: [
        { d: 'What resolution do I get?', r: 'Pages are rendered at roughly twice their nominal size, which is sharp enough for screens and for most printing.' },
        { d: 'Why a ZIP?', r: 'A hundred-page PDF would mean a hundred separate downloads. One archive is easier.' },
        { d: 'Are my pages uploaded?', r: 'No, the rendering happens in your browser.' },
      ],
    },

    'jpg-to-pdf': {
      titolo: 'JPG to PDF — Images to PDF Free, In Your Browser',
      descrizione: 'Turn photos or scans into a single tidy PDF, one image per page. Runs in your browser.',
      h1: 'Convert Images to PDF',
      intro: 'Puts your photos or scans into one PDF, one image per page, in the order you add them. The usual reason is turning phone photos of a document into something you can actually send. Runs in your browser.',
      passi: [
        'Select all the images you want, in the order you want them.',
        'Each image becomes a page sized to fit it.',
        'Download the PDF.',
      ],
      faq: [
        { d: 'Which image formats work?', r: 'JPG, PNG and the other formats your browser can display.' },
        { d: 'Can I change the order?', r: 'Pages follow the order the files appear in the list, so select them in the order you want.' },
        { d: 'Are my photos uploaded?', r: 'No. Everything happens on your device.' },
      ],
    },

    'rotate-pdf': {
      titolo: 'Rotate PDF — Fix Page Orientation Free',
      descrizione: 'Turn PDF pages by 90, 180 or 270 degrees and save the result permanently. Runs in your browser.',
      h1: 'Rotate PDF Pages',
      intro: 'Turns the pages of a PDF and saves the new orientation into the file, so it opens the right way up everywhere — unlike rotating it in a viewer, which usually forgets as soon as you close it.',
      passi: [
        'Drop in the PDF that is the wrong way round.',
        'Choose how far to turn it: 90, 180 or 270 degrees.',
        'Download the corrected PDF.',
      ],
      faq: [
        { d: 'Is the rotation permanent?', r: 'Yes, it is written into the file itself, not just into how one viewer displays it.' },
        { d: 'Can I rotate only some pages?', r: 'This tool turns every page by the same amount. For mixed orientations, split the document first.' },
        { d: 'Does it reduce the quality?', r: 'No. Rotation changes a page attribute; nothing is re-encoded.' },
      ],
    },

    'delete-pdf-pages': {
      titolo: 'Delete PDF Pages — Remove Pages Free Online',
      descrizione: 'Take unwanted pages out of a PDF and download the rest. Runs in your browser, nothing uploaded.',
      h1: 'Delete Pages from a PDF',
      intro: 'Removes the pages you name and gives you back the rest as a new PDF. The blank page at the end of a scan, the cover you do not want, the pages that belong to someone else. Runs in your browser.',
      passi: [
        'Drop in the PDF.',
        'Type the pages to remove, like <strong>1, 4, 9</strong>.',
        'Download the PDF without them.',
      ],
      faq: [
        { d: 'How do I name the pages?', r: 'Page numbers separated by commas: 1, 4, 9.' },
        { d: 'Is the original changed?', r: 'No. You get a new file; the one on your device is untouched.' },
        { d: 'Is anything uploaded?', r: 'No, this runs entirely in your browser.' },
      ],
    },

    'add-page-numbers': {
      titolo: 'Add Page Numbers to PDF — Free Online',
      descrizione: 'Stamp page numbers onto a PDF that does not have them. Runs in your browser, nothing uploaded.',
      h1: 'Add Page Numbers to a PDF',
      intro: 'Stamps a page number onto every page of a document that arrived without them — which matters as soon as anyone has to refer to "page 12" in a meeting or a court filing.',
      passi: [
        'Drop in the PDF.',
        'Numbers are placed consistently on each page.',
        'Download the numbered PDF.',
      ],
      faq: [
        { d: 'Where do the numbers go?', r: 'In the page footer, in a position that stays clear of most document margins.' },
        { d: 'Can I start from a number other than 1?', r: 'Numbering starts at the first page of the file. To offset it, split the document and number the part you need.' },
        { d: 'Is anything uploaded?', r: 'No, the stamping happens in your browser.' },
      ],
    },

    'watermark-pdf': {
      titolo: 'Add Watermark to PDF — Free Online Stamp',
      descrizione: 'Stamp text like DRAFT or CONFIDENTIAL across every page. Runs in your browser, nothing uploaded.',
      h1: 'Add a Watermark to a PDF',
      intro: 'Lays your own text across every page — <strong>DRAFT</strong>, <strong>CONFIDENTIAL</strong>, a client name — so a copy that escapes into the wild is obviously marked. Runs in your browser.',
      passi: [
        'Drop in the PDF.',
        'Type the text you want stamped across the pages.',
        'Download the watermarked PDF.',
      ],
      faq: [
        { d: 'Does it cover the text underneath?', r: 'No, the mark is drawn lightly across the page so the document stays readable.' },
        { d: 'Can the watermark be removed?', r: 'It becomes part of the page content, so it cannot be switched off in a reader. It is a deterrent, not encryption — for that, use Protect PDF.' },
        { d: 'Is my document uploaded?', r: 'No, it stays on your device.' },
      ],
    },

    'extract-images-from-pdf': {
      titolo: 'Extract Images from PDF — Free, Full Resolution',
      descrizione: 'Pull every embedded photo out of a PDF at original quality, as a ZIP. Runs in your browser.',
      h1: 'Extract Images from a PDF',
      intro: 'Pulls the pictures that are embedded in a PDF out at their original resolution — the real images, not screenshots of the pages. Everything is packed into a ZIP.',
      passi: [
        'Drop in the PDF.',
        'The embedded images are located and pulled out at full quality.',
        'Download the ZIP.',
      ],
      faq: [
        { d: 'How is this different from PDF to JPG?', r: 'PDF to JPG photographs each page as it looks. This pulls out the original picture files that were placed into the document, at the resolution they were saved at.' },
        { d: 'What if nothing comes out?', r: 'Then the document has no embedded images — a PDF made entirely of text and vector drawings has none to extract.' },
        { d: 'Is anything uploaded?', r: 'No, this runs in your browser.' },
      ],
    },

    'pdf-to-text': {
      titolo: 'PDF to Text — Extract Text to .txt Free',
      descrizione: 'Get all the readable text out of a PDF as a plain .txt file. Runs in your browser, nothing uploaded.',
      h1: 'Extract Text from a PDF',
      intro: 'Pulls all the readable text out of a PDF into a plain <strong>.txt</strong> file, with no formatting to get in the way. Useful for searching, quoting, or feeding a document into another program.',
      passi: [
        'Drop in the PDF.',
        'The text of every page is extracted in reading order.',
        'Download the .txt file.',
      ],
      faq: [
        { d: 'Does the formatting survive?', r: 'No, and that is intentional — plain text means no fonts, no columns, no tables. If you want the formatting, use PDF to Word.' },
        { d: 'Will it read a scanned document?', r: 'No. A scan is a picture of text, and there is nothing to extract without character recognition, which we do not do.' },
        { d: 'Is my document uploaded?', r: 'No, extraction happens in your browser.' },
      ],
    },
  },
};
