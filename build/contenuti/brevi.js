/**
 * Nomi corti e titoli delle colonne per l'elenco in fondo a ogni pagina.
 *
 * I titoli lunghi delle pagine ("Convert a PDF to Greyscale") vanno bene in
 * cima a una pagina ma non in un elenco di ventiquattro voci, dove nove righe
 * di seguito comincerebbero con la stessa parola. Qui i nomi sono ridotti
 * all'osso: le conversioni diventano una freccia fra due formati, le
 * operazioni un verbo solo.
 *
 * I nomi dei formati (PDF, Word, Excel) non si traducono in nessuna lingua:
 * cambiano solo i verbi.
 */
module.exports = {
  en: {
    gruppi: { daPdf: 'Convert from PDF', aPdf: 'Convert to PDF', organizza: 'Organise', modifica: 'Edit & protect' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Text',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Images → PDF',
      'merge-pdf': 'Merge', 'split-pdf': 'Split', 'delete-pdf-pages': 'Delete pages',
      'rotate-pdf': 'Rotate', 'add-page-numbers': 'Page numbers',
      'extract-images-from-pdf': 'Extract images',
      'compress-pdf': 'Compress', 'protect-pdf': 'Password', 'unlock-pdf': 'Unlock',
      'watermark-pdf': 'Watermark', 'grayscale-pdf': 'Greyscale',
    },
  },

  it: {
    gruppi: { daPdf: 'Convertire da PDF', aPdf: 'Convertire in PDF', organizza: 'Organizzare', modifica: 'Modificare e proteggere' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Testo',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Immagini → PDF',
      'merge-pdf': 'Unire', 'split-pdf': 'Dividere', 'delete-pdf-pages': 'Togliere pagine',
      'rotate-pdf': 'Ruotare', 'add-page-numbers': 'Numeri di pagina',
      'extract-images-from-pdf': 'Estrarre immagini',
      'compress-pdf': 'Comprimere', 'protect-pdf': 'Password', 'unlock-pdf': 'Sbloccare',
      'watermark-pdf': 'Filigrana', 'grayscale-pdf': 'Scala di grigi',
    },
  },

  es: {
    gruppi: { daPdf: 'Convertir desde PDF', aPdf: 'Convertir a PDF', organizza: 'Organizar', modifica: 'Editar y proteger' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Texto',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Imágenes → PDF',
      'merge-pdf': 'Unir', 'split-pdf': 'Dividir', 'delete-pdf-pages': 'Quitar páginas',
      'rotate-pdf': 'Rotar', 'add-page-numbers': 'Números de página',
      'extract-images-from-pdf': 'Extraer imágenes',
      'compress-pdf': 'Comprimir', 'protect-pdf': 'Contraseña', 'unlock-pdf': 'Desbloquear',
      'watermark-pdf': 'Marca de agua', 'grayscale-pdf': 'Escala de grises',
    },
  },

  de: {
    gruppi: { daPdf: 'Aus PDF umwandeln', aPdf: 'In PDF umwandeln', organizza: 'Ordnen', modifica: 'Bearbeiten & schützen' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Text',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Bilder → PDF',
      'merge-pdf': 'Zusammenfügen', 'split-pdf': 'Teilen', 'delete-pdf-pages': 'Seiten löschen',
      'rotate-pdf': 'Drehen', 'add-page-numbers': 'Seitenzahlen',
      'extract-images-from-pdf': 'Bilder extrahieren',
      'compress-pdf': 'Verkleinern', 'protect-pdf': 'Passwort', 'unlock-pdf': 'Entsperren',
      'watermark-pdf': 'Wasserzeichen', 'grayscale-pdf': 'Graustufen',
    },
  },

  zh: {
    gruppi: { daPdf: '从 PDF 转换', aPdf: '转换为 PDF', organizza: '整理', modifica: '编辑与保护' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → 文本',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': '图片 → PDF',
      'merge-pdf': '合并', 'split-pdf': '拆分', 'delete-pdf-pages': '删除页面',
      'rotate-pdf': '旋转', 'add-page-numbers': '添加页码',
      'extract-images-from-pdf': '提取图片',
      'compress-pdf': '压缩', 'protect-pdf': '加密码', 'unlock-pdf': '解锁',
      'watermark-pdf': '加水印', 'grayscale-pdf': '转灰度',
    },
  },

  ro: {
    gruppi: { daPdf: 'Conversie din PDF', aPdf: 'Conversie în PDF', organizza: 'Organizare', modifica: 'Editare și protecție' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Text',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Imagini → PDF',
      'merge-pdf': 'Unire', 'split-pdf': 'Împărțire', 'delete-pdf-pages': 'Ștergere pagini',
      'rotate-pdf': 'Rotire', 'add-page-numbers': 'Numere de pagină',
      'extract-images-from-pdf': 'Extragere imagini',
      'compress-pdf': 'Comprimare', 'protect-pdf': 'Parolă', 'unlock-pdf': 'Deblocare',
      'watermark-pdf': 'Filigran', 'grayscale-pdf': 'Tonuri de gri',
    },
  },

  hi: {
    gruppi: { daPdf: 'PDF से बदलें', aPdf: 'PDF में बदलें', organizza: 'व्यवस्थित करें', modifica: 'संपादन और सुरक्षा' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → पाठ',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'चित्र → PDF',
      'merge-pdf': 'जोड़ें', 'split-pdf': 'बाँटें', 'delete-pdf-pages': 'पृष्ठ हटाएँ',
      'rotate-pdf': 'घुमाएँ', 'add-page-numbers': 'पृष्ठ संख्या',
      'extract-images-from-pdf': 'चित्र निकालें',
      'compress-pdf': 'आकार घटाएँ', 'protect-pdf': 'पासवर्ड', 'unlock-pdf': 'ताला खोलें',
      'watermark-pdf': 'जलचिह्न', 'grayscale-pdf': 'धूसर',
    },
  },

  ru: {
    gruppi: { daPdf: 'Конвертация из PDF', aPdf: 'Конвертация в PDF', organizza: 'Упорядочить', modifica: 'Правка и защита' },
    nomi: {
      'pdf-to-word': 'PDF → Word', 'pdf-to-excel': 'PDF → Excel',
      'pdf-to-powerpoint': 'PDF → PowerPoint', 'pdf-to-markdown': 'PDF → Markdown',
      'pdf-to-html': 'PDF → HTML', 'pdf-to-jpg': 'PDF → JPG', 'pdf-to-text': 'PDF → Текст',
      'word-to-pdf': 'Word → PDF', 'excel-to-pdf': 'Excel → PDF',
      'powerpoint-to-pdf': 'PowerPoint → PDF', 'markdown-to-pdf': 'Markdown → PDF',
      'html-to-pdf': 'HTML → PDF', 'jpg-to-pdf': 'Изображения → PDF',
      'merge-pdf': 'Объединить', 'split-pdf': 'Разделить', 'delete-pdf-pages': 'Удалить страницы',
      'rotate-pdf': 'Повернуть', 'add-page-numbers': 'Номера страниц',
      'extract-images-from-pdf': 'Извлечь изображения',
      'compress-pdf': 'Сжать', 'protect-pdf': 'Пароль', 'unlock-pdf': 'Снять защиту',
      'watermark-pdf': 'Водяной знак', 'grayscale-pdf': 'Оттенки серого',
    },
  },
};
