/**
 * I 24 strumenti, con l'indirizzo pubblico di ciascuno.
 *
 * Lo "slug" non coincide sempre con l'identificativo interno: l'indirizzo deve
 * somigliare a come la gente cerca ("pdf-to-jpg", non "pdf-to-img"), mentre
 * l'identificativo resta quello che app.js gia' usa.
 */
module.exports = [
  { slug: 'pdf-to-word',              tool: 'pdf-to-word',     motore: 'server'  },
  { slug: 'word-to-pdf',              tool: 'word-to-pdf',     motore: 'server'  },
  { slug: 'pdf-to-excel',             tool: 'pdf-to-excel',    motore: 'server'  },
  { slug: 'excel-to-pdf',             tool: 'excel-to-pdf',    motore: 'server'  },
  { slug: 'pdf-to-powerpoint',        tool: 'pdf-to-pptx',     motore: 'server'  },
  { slug: 'powerpoint-to-pdf',        tool: 'pptx-to-pdf',     motore: 'server'  },
  { slug: 'pdf-to-html',              tool: 'pdf-to-html',     motore: 'server'  },
  { slug: 'html-to-pdf',              tool: 'html-to-pdf',     motore: 'server'  },
  { slug: 'markdown-to-pdf',          tool: 'md-to-pdf',       motore: 'server'  },
  { slug: 'compress-pdf',             tool: 'compress',        motore: 'server'  },
  { slug: 'protect-pdf',              tool: 'protect',         motore: 'server'  },
  { slug: 'unlock-pdf',               tool: 'unlock',          motore: 'server'  },
  { slug: 'grayscale-pdf',            tool: 'grayscale',       motore: 'server'  },
  { slug: 'pdf-to-markdown',          tool: 'pdf-to-md',       motore: 'browser' },
  { slug: 'merge-pdf',                tool: 'merge',           motore: 'browser' },
  { slug: 'split-pdf',                tool: 'split',           motore: 'browser' },
  { slug: 'pdf-to-jpg',               tool: 'pdf-to-img',      motore: 'browser' },
  { slug: 'jpg-to-pdf',               tool: 'img-to-pdf',      motore: 'browser' },
  { slug: 'rotate-pdf',               tool: 'rotate',          motore: 'browser' },
  { slug: 'delete-pdf-pages',         tool: 'delete-pages',    motore: 'browser' },
  { slug: 'add-page-numbers',         tool: 'page-numbers',    motore: 'browser' },
  { slug: 'watermark-pdf',            tool: 'watermark',       motore: 'browser' },
  { slug: 'extract-images-from-pdf',  tool: 'extract-images',  motore: 'browser' },
  { slug: 'pdf-to-text',              tool: 'pdf-to-text',     motore: 'browser' },
];
